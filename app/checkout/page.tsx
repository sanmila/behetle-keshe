"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const { t, lang } = useI18n();
  const { items, refresh, loading, hydrated } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", state: "", zip: "", country: "Россия",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!hydrated) {
      void refresh();
    }
  }, [hydrated, refresh]);

  const subtotal = items.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = lang === "ru" ? "Обязательно" : "Required";
    if (!form.email.includes("@")) e.email = lang === "ru" ? "Введите email" : "Valid email required";
    if (!form.address.trim()) e.address = lang === "ru" ? "Обязательно" : "Required";
    if (!form.city.trim()) e.city = lang === "ru" ? "Обязательно" : "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handlePay = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, totalAmount: subtotal }),
    });
    const data = await res.json();
    if (data.orderNumber) {
      await refresh();
      setOrderNumber(data.orderNumber);
      setStep(3);
    }
  };

  if (!hydrated || (loading && items.length === 0 && step < 3)) {
    return (
      <div className="min-h-screen bg-[#FFF8F5]">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
          <p className="text-[#8A7D70]">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step < 3) {
    return (
      <div className="min-h-screen bg-[#FFF8F5]">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
          <p className="text-[#8A7D70]">{lang === "ru" ? "Корзина пуста" : "Your cart is empty"}</p>
          <button onClick={() => router.push("/")} className="text-xs text-[#E8635A] underline">
            {t.cart.continueShopping}
          </button>
        </div>
      </div>
    );
  }

  const steps = [t.checkout.shipping, t.checkout.payment, t.checkout.confirmation];

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      <Navbar />
      <div className="pt-40 pb-20">
        <div className="max-w-[900px] mx-auto px-6">
          <h1 className="font-display text-4xl font-light text-[#2D2620] mb-12 text-center">
            {t.checkout.title}
          </h1>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-0 mb-12">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className={`flex flex-col items-center gap-1`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    step > i + 1 ? "bg-[#E8635A] text-white" :
                    step === i + 1 ? "bg-[#F8C8DC] text-[#2D2620]" :
                    "bg-[#F0E6EC] text-[#8A7D70]"
                  }`}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className={`text-[9px] tracking-wider uppercase ${step === i + 1 ? "text-[#2D2620]" : "text-[#8A7D70]"}`}>
                    {label}
                  </span>
                </div>
                {i < 2 && <div className={`w-16 md:w-24 h-px mx-2 mb-5 ${step > i + 1 ? "bg-[#E8635A]" : "bg-[#F0E6EC]"}`}/>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form
                    key="step1"
                    onSubmit={handleStep1}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    {[
                      { key: "name", label: t.checkout.name },
                      { key: "email", label: t.checkout.email },
                      { key: "address", label: t.checkout.address },
                      { key: "city", label: t.checkout.city },
                      { key: "state", label: t.checkout.state },
                      { key: "zip", label: t.checkout.zip },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <input
                          type={key === "email" ? "email" : "text"}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          placeholder={label}
                          className="w-full border-b border-[#F0E6EC] py-3 text-sm bg-transparent focus:outline-none focus:border-[#F8C8DC] transition-colors"
                        />
                        {errors[key] && <p className="text-[#E8635A] text-xs mt-1">{errors[key]}</p>}
                      </div>
                    ))}
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      placeholder={t.checkout.country}
                      className="w-full border-b border-[#F0E6EC] py-3 text-sm bg-transparent focus:outline-none focus:border-[#F8C8DC] transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#F8C8DC] text-[#2D2620] py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#D4A0B8] transition-colors mt-4"
                    >
                      {t.checkout.continue}
                    </button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-display text-2xl font-light mb-6">{t.checkout.payment}</h3>
                    <div className="border border-[#F0E6EC] p-6 mb-6">
                      <p className="text-xs text-[#8A7D70] mb-4">
                        {lang === "ru" ? "Тестовая оплата — нажмите 'Оплатить' для подтверждения" : "Test payment — click 'Pay Now' to confirm"}
                      </p>
                      <div className="space-y-3">
                        <input
                          placeholder="4242 4242 4242 4242"
                          className="w-full border border-[#F0E6EC] py-3 px-4 text-sm focus:outline-none focus:border-[#F8C8DC]"
                          defaultValue="4242 4242 4242 4242"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="MM/YY" className="border border-[#F0E6EC] py-3 px-4 text-sm focus:outline-none focus:border-[#F8C8DC]" defaultValue="12/28"/>
                          <input placeholder="CVC" className="border border-[#F0E6EC] py-3 px-4 text-sm focus:outline-none focus:border-[#F8C8DC]" defaultValue="123"/>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3 border border-[#F0E6EC] text-xs tracking-[0.15em] uppercase hover:bg-[#F0E6EC] transition-colors"
                      >
                        {t.checkout.back}
                      </button>
                      <button
                        onClick={handlePay}
                        className="flex-1 bg-[#F8C8DC] text-[#2D2620] py-3 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#D4A0B8] transition-colors"
                      >
                        {t.checkout.payNow}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-[#F8C8DC] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D2620" strokeWidth="2">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                    <h2 className="font-display text-4xl font-light text-[#2D2620] mb-3">
                      {t.checkout.orderPlaced}
                    </h2>
                    <p className="text-[#8A7D70] text-sm mb-2">
                      {t.checkout.orderNumber}: <span className="font-medium text-[#2D2620]">{orderNumber}</span>
                    </p>
                    <p className="text-sm text-[#8A7D70] max-w-sm mx-auto">{t.checkout.thankYou}</p>
                    <button
                      onClick={() => router.push("/")}
                      className="mt-8 border border-[#F0E6EC] px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#F0E6EC] transition-colors"
                    >
                      {t.cart.continueShopping}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            {step < 3 && (
              <div className="bg-[#F0E6EC] p-6 h-fit">
                <h3 className="font-display text-xl font-light mb-5">
                  {lang === "ru" ? "Ваш заказ" : "Your Order"}
                </h3>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.nameRu} className="w-14 h-16 object-cover"/>
                      <div>
                        <p className="text-sm font-medium">{item.product.nameRu}</p>
                        <p className="text-xs text-[#8A7D70]">×{item.quantity}</p>
                      </div>
                      <span className="ml-auto text-sm">{formatPrice(Number(item.product.price) * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#D4A0B8]/30 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8A7D70]">{t.cart.subtotal}</span>
                    <span className="font-display text-lg">{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
