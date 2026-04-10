import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth-server";
import { normalizeProductImage, normalizeProductRecords } from "@/lib/product-images";

async function checkAdmin() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if (!authToken) return false;
  const session = verifyToken(authToken);
  return session?.isAdmin === true;
}

export async function GET(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { nameRu: { contains: search, mode: "insensitive" } },
      { nameEn: { contains: search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products: normalizeProductRecords(products) });
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { nameRu, nameEn, price, category, tag, color, colorRu, colorEn, descriptionRu, descriptionEn, image, sizes, stockQty } = body;
    const slug = (nameRu || nameEn).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
    const product = await prisma.product.create({
      data: {
        nameRu, nameEn, slug, price: Number(price), category,
        tag: tag || null, color, colorRu, colorEn,
        descriptionRu, descriptionEn, image: normalizeProductImage(image),
        sizes: Array.isArray(sizes) ? sizes.join(", ") : (sizes ? sizes.split(",").map((s: string) => s.trim()) : ""),
        images: "", stockQty: Number(stockQty) || 0,
      },
    });
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
