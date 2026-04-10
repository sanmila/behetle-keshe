import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth-server";
import { normalizeProductImage, normalizeProductRecord } from "@/lib/product-images";

async function checkAdmin() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if (!authToken) return false;
  const session = verifyToken(authToken);
  return session?.isAdmin === true;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product: normalizeProductRecord(product) });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const body = await req.json();
    const { nameRu, nameEn, price, category, tag, color, colorRu, colorEn, descriptionRu, descriptionEn, image, sizes, stockQty } = body;
    const product = await prisma.product.update({
      where: { id },
      data: {
        nameRu, nameEn, price: Number(price), category,
        tag: tag || null, color, colorRu, colorEn,
        descriptionRu, descriptionEn, image: normalizeProductImage(image),
        sizes: Array.isArray(sizes) ? sizes.join(", ") : (sizes ? sizes.split(",").map((s: string) => s.trim()) : ""),
        images: "", stockQty: Number(stockQty) || 0,
      },
    });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.product.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ success: true });
}
