import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth-server";

export async function GET() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if (!authToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const session = verifyToken(authToken);
  if (!session?.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const [orderCount, pendingOrders, revenue7d, productCount, customerCount, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.order.aggregate({
      where: {
        createdAt: { gte: last7Days },
        status: { not: "cancelled" },
      },
      _sum: { totalAmount: true },
    }),
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { items: true } }),
  ]);

  return NextResponse.json({
    orders: orderCount,
    pendingOrders,
    revenue7d: Number(revenue7d._sum.totalAmount || 0),
    products: productCount,
    customers: customerCount,
    recentOrders,
  });
}
