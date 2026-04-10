"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (data.user?.isAdmin) {
      router.push("/admin");
      return;
    }

    setError(data.error || "Доступ запрещен");
    setLoading(false);
  };

  return (
    <div className="admin-login-root">
      <div className="admin-login-card">
        {/* Features */}
        <div className="admin-login-features">
          <p className="admin-kicker !mb-3">Back office</p>
          <h1 className="admin-login-headline">Чистая панель управления для ежедневной работы с магазином.</h1>
          <p className="admin-login-subtext">Управляйте каталогом, заказами и настройками в едином пространстве с акцентом на читабельность и скорость действий.</p>
          <div
            className="rounded-[28px] p-6"
            style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-surface-alt)" }}
          >
            <img src="/logo.png" alt="Бахетле кеше" className="admin-login-logo" />
            <div className="admin-login-features-grid">
              <div className="admin-login-feature-card">
                <p className="admin-login-feature-label">Каталог</p>
                <p className="admin-login-feature-text">Быстрое редактирование карточек и остатков.</p>
              </div>
              <div className="admin-login-feature-card">
                <p className="admin-login-feature-label">Заказы</p>
                <p className="admin-login-feature-text">Статусы, детали клиента и контроль оплаты.</p>
              </div>
              <div className="admin-login-feature-card">
                <p className="admin-login-feature-label">Настройки</p>
                <p className="admin-login-feature-text">Контакты и параметры магазина в одном месте.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="admin-login-form-wrap">
          <p className="admin-kicker !mb-3">Вход</p>
          <h2 className="admin-login-title">Доступ в admin</h2>
          <p className="admin-login-subtitle">Введите учетные данные администратора, чтобы открыть внутреннюю панель магазина.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="admin-label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Пароль</label>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                className="admin-input"
                required
              />
            </div>
            {error ? <p className="text-sm" style={{ color: "var(--admin-urgent)" }}>{error}</p> : null}
            <button type="submit" disabled={loading} className="admin-button-primary w-full disabled:opacity-50">
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
