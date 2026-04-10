"use client";

import { create } from "zustand";
import { toast } from "sonner";

interface CartProduct {
  id: string;
  nameRu: string;
  nameEn: string;
  price: number;
  image: string;
  stockQty: number;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: CartProduct;
}

interface CartStore {
  items: CartItem[];
  count: number;
  subtotal: number;
  loading: boolean;
  hydrated: boolean;
  error: string | null;
  add: (productId: string, quantity?: number) => Promise<void>;
  update: (id: string, quantity: number) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  count: 0,
  subtotal: 0,
  loading: false,
  hydrated: false,
  error: null,

  refresh: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items: CartItem[] = data.items || [];
      const count = items.reduce((sum, i) => sum + i.quantity, 0);
      const subtotal = items.reduce((sum, i) => sum + (i.product.price || 0) * i.quantity, 0);
      set({ items, count, subtotal, loading: false, hydrated: true, error: null });
    } catch (err) {
      set({ loading: false, hydrated: true, error: err instanceof Error ? err.message : "Failed to load cart" });
    }
  },

  add: async (productId: string, quantity = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to add item" }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      // API returns { items: [...] } — update state directly instead of refetching
      const data = await res.json();
      const items: CartItem[] = data.items || [];
      const count = items.reduce((sum, i) => sum + i.quantity, 0);
      const subtotal = items.reduce((sum, i) => sum + (i.product.price || 0) * i.quantity, 0);
      set({ items, count, subtotal, loading: false, hydrated: true, error: null });
      toast.success("Товар добавлен в корзину");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to add to cart";
      set({ loading: false, hydrated: true, error: msg });
      toast.error(msg);
    }
  },

  update: async (id: string, quantity: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await get().refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update cart";
      set({ loading: false, error: msg });
      toast.error(msg);
    }
  },

  remove: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await get().refresh();
      toast.success("Товар удалён из корзины");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to remove item";
      set({ loading: false, error: msg });
      toast.error(msg);
    }
  },

  clearError: () => set({ error: null }),
}));

// Selector helpers
export const selectItems = (s: CartStore) => s.items;
export const selectCount = (s: CartStore) => s.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectSubtotal = (s: CartStore) => s.items.reduce((sum, i) => sum + (i.product.price || 0) * i.quantity, 0);
