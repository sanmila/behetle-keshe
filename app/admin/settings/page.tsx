"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminShell from "../components/AdminShell";

interface Settings {
  storeName: string;
  contactEmail: string;
  storeDescription?: string;
  socialInstagram?: string;
  socialTelegram?: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({ storeName: "HAPPY MAN", contactEmail: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (!data.settings) return;
        const map: Record<string, string> = {};
        data.settings.forEach((item: { key: string; value: string }) => {
          map[item.key] = item.value;
        });
        setSettings({
          storeName: map.storeName || "HAPPY MAN",
          contactEmail: map.contactEmail || "",
          storeDescription: map.storeDescription || "",
          socialInstagram: map.socialInstagram || "",
          socialTelegram: map.socialTelegram || "",
        });
      });
  }, []);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminShell contentClassName="max-w-[1180px]">
      <AdminPageHeader
        eyebrow="Конфигурация"
        title="Настройки магазина"
        description="Редактируйте название бренда, контактные данные и социальные ссылки в одном аккуратном блоке управления."
      />

      <form onSubmit={handleSave} className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.15fr)_360px]">
        <section className="admin-panel p-7">
          <div className="admin-settings-intro mb-5">
            <p className="admin-kicker">Основная информация</p>
            <p className="admin-form-section-description">Эти данные используются в основных блоках витрины, служебных сообщениях и общем описании бренда.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="admin-field md:col-span-2">
              <label className="admin-label">Название магазина</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(event) => setSettings({ ...settings, storeName: event.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-field md:col-span-2">
              <label className="admin-label">Контактный email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(event) => setSettings({ ...settings, contactEmail: event.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-field md:col-span-2">
              <label className="admin-label">Описание бренда</label>
              <textarea
                rows={5}
                value={settings.storeDescription || ""}
                onChange={(event) => setSettings({ ...settings, storeDescription: event.target.value })}
                className="admin-textarea resize-none"
              />
              <p className="admin-helper">Этот текст можно использовать в футере, письмах и служебных блоках.</p>
            </div>
          </div>
        </section>

        <section className="admin-panel p-7 admin-settings-sidebar">
          <div className="admin-settings-intro">
            <p className="admin-kicker">Социальные каналы</p>
            <p className="admin-form-section-description">Укажите актуальные ссылки, которые увидят покупатели на сайте и в коммуникациях.</p>
          </div>
          <div className="space-y-5">
            <div className="admin-field">
              <label className="admin-label">Instagram</label>
              <input
                type="text"
                value={settings.socialInstagram || ""}
                onChange={(event) => setSettings({ ...settings, socialInstagram: event.target.value })}
                className="admin-input"
                placeholder="@happy.man"
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Telegram</label>
              <input
                type="text"
                value={settings.socialTelegram || ""}
                onChange={(event) => setSettings({ ...settings, socialTelegram: event.target.value })}
                className="admin-input"
                placeholder="@happy_man_store"
              />
            </div>
          </div>

          <div className="admin-settings-note">
            <p className="admin-settings-note-title">Где это отображается</p>
            <p className="admin-settings-note-copy">Сохраняйте только проверенные контакты. Они используются в ключевых точках бренда.</p>
            <div className="admin-settings-note-list">
              <p className="admin-settings-note-item">Футер и социальные иконки на витрине</p>
              <p className="admin-settings-note-item">Контактные блоки и административные подсказки</p>
              <p className="admin-settings-note-item">Будущие рассылки и служебные уведомления</p>
            </div>
          </div>

          <div className="admin-settings-actions">
            <button type="submit" disabled={saving} className="admin-button-primary disabled:opacity-50 w-full justify-center">
              {saving ? "Сохранение..." : "Сохранить"}
            </button>
            {saved ? <span className="text-sm" style={{ color: "var(--admin-accent)" }}>Изменения сохранены</span> : null}
          </div>
        </section>
      </form>
    </AdminShell>
  );
}
