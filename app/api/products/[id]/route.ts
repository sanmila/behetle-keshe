import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { normalizeProductRecord } from "@/lib/product-images";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product: normalizeProductRecord(product) });
}
