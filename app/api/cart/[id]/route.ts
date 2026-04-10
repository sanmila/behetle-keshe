import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { normalizeCartItems } from "@/lib/product-images";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { quantity } = await req.json().catch(() => ({ quantity: 1 }));
    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity) || nextQuantity < 0) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    // If quantity is 0, delete the item
    if (nextQuantity === 0) {
      await prisma.cartItem.delete({ where: { id } }).catch(() => {});
      return NextResponse.json({ success: true });
    }

    const item = await prisma.cartItem.update({
      where: { id },
      data: { quantity: nextQuantity },
      include: { product: true },
    });
    return NextResponse.json({ item: normalizeCartItems([item])[0] });
  } catch (err) {
    console.error("[PUT /api/cart/[id]]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.cartItem.delete({ where: { id } }).catch(() => {});
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/cart/[id]]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
