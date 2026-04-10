import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth-server";
import { normalizeProductImage } from "@/lib/product-images";

const CART_COOKIE = "cart_id";

function generateOrderNumber() {
  return "HM-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const session = authToken ? verifyToken(authToken) : null;
  if (!session) {
    return NextResponse.json({ orders: [] });
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
  return NextResponse.json({ orders });
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    const session = authToken ? verifyToken(authToken) : null;
    const cartId = cookieStore.get(CART_COOKIE)?.value;

    const body = await req.json();
    const { name, email, address, city, state, zip, country, totalAmount } = body;

    if (!name || !email || !address || !city || !totalAmount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!cartId) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    });

    const cartItems = cart?.items ?? [];
    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session?.userId,
        email,
        name,
        shippingAddress: address,
        city,
        state: state || "",
        zip: zip || "",
        country: country || "Россия",
        totalAmount: Number(totalAmount),
        status: "pending",
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            productName: item.product.nameRu,
            productImage: normalizeProductImage(item.product.image),
            quantity: item.quantity,
            priceAtPurchase: Number(item.product.price),
          })),
        },
      },
    });

    await prisma.cartItem.deleteMany({ where: { cartId } });

    const response = NextResponse.json({ orderNumber: order.orderNumber, orderId: order.id });
    response.cookies.set(CART_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 });
  }
}
