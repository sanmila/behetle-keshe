import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { normalizeCartItems } from "@/lib/product-images";
import { shouldUseSecureCookies } from "@/lib/request-cookie-security";

const CART_COOKIE = "cart_id";

async function getOrCreateCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  let cart = cartId ? await prisma.cart.findUnique({ where: { id: cartId } }).catch(() => null) : null;

  if (!cart) {
    cart = await prisma.cart.create({ data: {} });
  }

  return cart;
}

async function getCartWithItems(cartId: string) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: { include: { product: true } } },
  });
  return cart;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE)?.value;

    if (!cartId) {
      return NextResponse.json({ items: [] });
    }

    const cart = await getCartWithItems(cartId);
    return NextResponse.json({ items: normalizeCartItems(cart?.items ?? []) });
  } catch (err) {
    console.error("[GET /api/cart]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1 } = await req.json().catch(() => ({}));
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const cart = await getOrCreateCart();
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
        include: { product: true },
      });
    }

    const updatedCart = await getCartWithItems(cart.id);
    const response = NextResponse.json({ items: normalizeCartItems(updatedCart?.items ?? []) });

    // Set cart cookie
    response.cookies.set(CART_COOKIE, cart.id, {
      httpOnly: true,
      secure: shouldUseSecureCookies(req),
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[POST /api/cart]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
