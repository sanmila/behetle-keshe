import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { normalizeProductImage, normalizeProductRecords } from "@/lib/product-images";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  const where: Record<string, unknown> = {};
  if (slug) {
    where.slug = slug;
  } else if (category && category !== "all") {
    if (category === "new") {
      where.tag = "new";
    } else {
      where.category = category;
    }
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products: normalizeProductRecords(products) });
}

export async function POST(req: NextRequest) {
  const { verifyToken } = await import("@/lib/auth-server");
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const session = verifyToken(token);
  if (!session?.isAdmin) return NextResponse.json({ error: "Admin only" }, { status: 403 });

  try {
    const body = await req.json();
    const { nameRu, nameEn, price, category, tag, color, colorRu, colorEn, descriptionRu, descriptionEn, image, sizes, stockQty } = body;
    const slug = nameRu.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
    const product = await prisma.product.create({
      data: {
        nameRu, nameEn, slug, price: Number(price), category, tag: tag || null,
        color, colorRu, colorEn, descriptionRu, descriptionEn,
        image: normalizeProductImage(image),
        images: "", sizes: sizes ? (Array.isArray(sizes) ? sizes.join(", ") : sizes) : "",
        stockQty: Number(stockQty) || 0,
      },
    });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
