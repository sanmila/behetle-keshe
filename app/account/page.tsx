"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface User { id: string; email: string; name: string; isAdmin: boolean; }
interface Order {
  id: string; orderNumber: string; totalAmount: string;
  status: string; createdAt: string;
  items: { productName: string; quantity: number; priceAtPurchase: string }[];
}

export default function AccountPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"orders" | "info">("orders");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setUser(d.user);
          fetch("/api/orders").then((r) => r.json()).then((d) => setOrders(d.orders || []));
        }
        setLoading(false);
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    const data = await res.json();
    if (data.user) {
      setUser(data.user);
      if (data.user.isAdmin) router.push("/admin");
    } else {
      setError(data.error || "Login failed");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.user) {
      setUser(data.user);
    } else {
      setError(data.error || "Registration failed");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOrders([]);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F5]">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[#8A7D70]">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFF8F5]">
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <motion.div
            className="w-full max-w-md p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl font-light text-center mb-2">
              {mode === "login" ? t.account.login : t.account.register}
            </h1>
            <p className="text-center text-[#8A7D70] text-sm mb-8">
              {mode === "login" ? t.account.noAccount : t.account.hasAccount}
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-[#E8635A] ml-1 hover:underline"
              >
                {" "}{mode === "login" ? t.account.register : t.account.login}
              </button>
            </p>
            <form
              onSubmit={mode === "login" ? handleLogin : handleRegister}
              className="space-y-4"
            >
              {mode === "register" && (
                <input
                  type="text"
                  placeholder={t.account.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-b border-[#F0E6EC] py-3 text-sm focus:outline-none focus:border-[#F8C8DC]"
                />
              )}
              <input
                type="email"
                placeholder={t.account.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border-b border-[#F0E6EC] py-3 text-sm focus:outline-none focus:border-[#F8C8DC]"
              />
              <input
                type="password"
                placeholder={t.account.password}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border-b border-[#F0E6EC] py-3 text-sm focus:outline-none focus:border-[#F8C8DC]"
              />
              {error && <p className="text-[#E8635A] text-xs">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#F8C8DC] text-[#2D2620] py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#D4A0B8] transition-colors mt-4"
              >
                {mode === "login" ? t.account.login : t.account.register}
              </button>
            </form>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const statusLabels: Record<string, string> = t.admin.status as Record<string, string>;

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-4xl font-light">{user.name}</h1>
              <p className="text-sm text-[#8A7D70]">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="border border-[#F0E6EC] px-5 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#F0E6EC] transition-colors"
            >
              {t.account.logout}
            </button>
          </div>

          <div className="flex gap-6 border-b border-[#F0E6EC] mb-8">
            <button
              onClick={() => setTab("orders")}
              className={`pb-3 text-xs tracking-[0.2em] uppercase border-b-2 transition-all ${
                tab === "orders"
                  ? "border-[#F8C8DC] text-[#2D2620]"
                  : "border-transparent text-[#8A7D70]"
              }`}
            >
              {t.account.orderHistory}
            </button>
          </div>

          {tab === "orders" && (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[#8A7D70]">{t.account.noOrders}</p>
                  <button
                    onClick={() => router.push("/")}
                    className="mt-4 text-xs text-[#E8635A] underline"
                  >
                    {t.cart.continueShopping}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-[#F0E6EC] p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-sm">{order.orderNumber}</p>
                          <p className="text-xs text-[#8A7D70]">
                            {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                          </p>
                        </div>
                        <span className={`text-[9px] tracking-[0.15em] uppercase px-2 py-1 ${
                          order.status === "delivered" ? "bg-[#F8C8DC] text-[#2D2620]" : "bg-[#F0E6EC] text-[#8A7D70]"
                        }`}>
                          {statusLabels[order.status] || order.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs text-[#8A7D70]">
                            <span>{item.productName} ×{item.quantity}</span>
                            <span>{formatPrice(Number(item.priceAtPurchase) * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#F0E6EC]">
                        <span className="text-xs text-[#8A7D70]">
                          {t.cart.subtotal}
                        </span>
                        <span className="font-display text-lg">{formatPrice(Number(order.totalAmount))}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
