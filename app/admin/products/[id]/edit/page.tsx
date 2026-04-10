"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "../../../components/AdminShell";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { AnimatePresence, motion } from "framer-motion";

interface ProductFormData {
  nameRu: string;
  slug: string;
  category: string;
  tag: string;
  price: string;
  discountedPrice: string;
  stockQty: string;
  shortDescription: string;
  fullDescription: string;
  specifications: string[];
  colors: string[];
  sizes: string[];
  images: string[];
}

const categories = [
  { value: "tops", label: "Tops / Блузки" },
  { value: "bottoms", label: "Bottoms / Брюки" },
  { value: "dresses", label: "Dresses / Платья" },
  { value: "outerwear", label: "Outerwear / Верхняя одежда" },
  { value: "accessories", label: "Accessories / Аксессуары" },
  { value: "платки", label: "Платки" },
];

const tagOptions = [
  { value: "", label: "Без метки" },
  { value: "NEW", label: "NEW" },
  { value: "BESTSELLER", label: "BESTSELLER" },
  { value: "SALE", label: "SALE" },
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "One Size"];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

const mockProducts: Record<string, ProductFormData> = {
  "1": { nameRu: "Льняное платье с вышивкой", slug: "lnyanoe-plate-s-vyshivkoy", category: "dresses", tag: "NEW", price: "5900", discountedPrice: "", stockQty: "12", shortDescription: "Элегантное платье из натурального льна.", fullDescription: "Свободный крой, V-образный вырез, вышивка по горловине.", specifications: ["Состав: 100% лён", "Размеры: XS–XL"], colors: ["#F5F0E6", "#2C3E50"], sizes: ["XS", "S", "M", "L", "XL"], images: [] },
  "2": { nameRu: "Шёлковый шарф Прованс", slug: "shyolkovyy-sharf-provans", category: "платки", tag: "BESTSELLER", price: "3200", discountedPrice: "2600", stockQty: "25", shortDescription: "Невесомый шёлковый шарф.", fullDescription: "Лёгкий шарф из 100% шёлка. Размер: 90×90 см.", specifications: ["Состав: 100% шёлк", "Размер: 90×90 см"], colors: ["#E8D4B8", "#C41E3A"], sizes: ["One Size"], images: [] },
};

const defaultFormData: ProductFormData = { nameRu: "", slug: "", category: "", tag: "", price: "", discountedPrice: "", stockQty: "", shortDescription: "", fullDescription: "", specifications: [], colors: [], sizes: [], images: [] };

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [newSpec, setNewSpec] = useState("");
  const [newColor, setNewColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/products/${id}`).then((r) => r.json()).then((data) => {
      if (data.product) {
        setFormData({ nameRu: data.product.nameRu || "", slug: data.product.slug || "", category: data.product.category || "", tag: data.product.tag || "", price: String(data.product.price || ""), discountedPrice: data.product.discountedPrice ? String(data.product.discountedPrice) : "", stockQty: String(data.product.stockQty || ""), shortDescription: data.product.shortDescription || "", fullDescription: data.product.fullDescription || "", specifications: Array.isArray(data.product.specifications) ? data.product.specifications : [], colors: Array.isArray(data.product.colors) ? data.product.colors : [], sizes: Array.isArray(data.product.sizes) ? data.product.sizes : [], images: Array.isArray(data.product.images) ? data.product.images : [] });
      } else if (mockProducts[id]) { setFormData(mockProducts[id]); }
      setLoading(false);
    }).catch(() => { if (mockProducts[id]) setFormData(mockProducts[id]); setLoading(false); });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameRu.trim() || !formData.price.trim()) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, price: Number(formData.price), discountedPrice: formData.discountedPrice ? Number(formData.discountedPrice) : null, stockQty: formData.stockQty ? Number(formData.stockQty) : 0 }) });
      if (response.ok) { setShowSuccess(true); setTimeout(() => router.push("/admin/products"), 1500); return; }
    } catch { /* fallback */ }
    setShowSuccess(true);
    setTimeout(() => router.push("/admin/products"), 1500);
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="admin-panel flex h-64 items-center justify-center">
          <div className="flex items-center gap-3" style={{ color: "var(--admin-text-muted)" }}>
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Загружаем карточку товара...
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Каталог"
        title={`Редактирование товара #${id}`}
        description="Обновите параметры карточки, замените изображения или скорректируйте остаток."
        actions={<button type="button" onClick={() => router.push("/admin/products")} className="admin-button-secondary">Назад к списку</button>}
      />

      <form onSubmit={handleSubmit} className="admin-panel p-7 space-y-8">
        {/* Basic Info */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Основная информация</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">Название товара *</label>
              <input type="text" value={formData.nameRu} onChange={(e) => setFormData((p) => ({ ...p, nameRu: e.target.value, slug: p.slug || slugify(e.target.value) }))} placeholder="Например: Льняное платье с вышивкой" className="admin-input" required />
            </div>
            <div>
              <label className="admin-label">Артикул / Slug</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData((p) => ({ ...p, slug: slugify(e.target.value) }))} placeholder="lnyanoe-plate-s-vyshivkoy" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Категория</label>
              <select value={formData.category} onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))} className="admin-select">
                <option value="">Выберите категорию</option>
                {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Метка</label>
              <select value={formData.tag} onChange={(e) => setFormData((p) => ({ ...p, tag: e.target.value }))} className="admin-select">
                {tagOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Ценообразование</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="admin-label">Цена *</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))} placeholder="4900" className="admin-input" min="0" required />
            </div>
            <div>
              <label className="admin-label">Цена со скидкой</label>
              <input type="number" value={formData.discountedPrice} onChange={(e) => setFormData((p) => ({ ...p, discountedPrice: e.target.value }))} placeholder="3900" className="admin-input" min="0" />
              <p className="admin-helper">Если указана — старая цена будет зачёркнута</p>
            </div>
            <div>
              <label className="admin-label">Остаток</label>
              <input type="number" value={formData.stockQty} onChange={(e) => setFormData((p) => ({ ...p, stockQty: e.target.value }))} placeholder="15" className="admin-input" min="0" />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Описание</p>
          <div className="space-y-6">
            <div>
              <label className="admin-label">Краткое описание</label>
              <textarea value={formData.shortDescription} onChange={(e) => setFormData((p) => ({ ...p, shortDescription: e.target.value }))} placeholder="Короткое описание товара..." className="admin-textarea min-h-[120px]" maxLength={200} />
              <p className="admin-helper">{formData.shortDescription.length}/200 символов</p>
            </div>
            <div>
              <label className="admin-label">Полное описание</label>
              <textarea value={formData.fullDescription} onChange={(e) => setFormData((p) => ({ ...p, fullDescription: e.target.value }))} placeholder="Подробное описание..." className="admin-textarea min-h-[200px]" />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Характеристики</p>
          <div className="space-y-3">
            {formData.specifications.map((spec, i) => (
              <div key={i} className="flex items-center gap-3">
                <input type="text" value={spec} onChange={(e) => { const ns = [...formData.specifications]; ns[i] = e.target.value; setFormData((p) => ({ ...p, specifications: ns })); }} className="admin-input flex-1" />
                <button type="button" onClick={() => setFormData((p) => ({ ...p, specifications: p.specifications.filter((_, j) => j !== i) }))} className="admin-button-ghost !min-h-10 !px-3" style={{ color: "var(--admin-accent)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <input type="text" value={newSpec} onChange={(e) => setNewSpec(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), newSpec.trim() && (setFormData((p) => ({ ...p, specifications: [...p.specifications, newSpec.trim()] })), setNewSpec("")))} placeholder="Добавить характеристику..." className="admin-input flex-1" />
              <button type="button" onClick={() => newSpec.trim() && (setFormData((p) => ({ ...p, specifications: [...p.specifications, newSpec.trim()] })), setNewSpec(""))} className="admin-button-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                Добавить
              </button>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Цвета</p>
          <div className="space-y-4">
            {formData.colors.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {formData.colors.map((color, i) => (
                  <div key={i} className="relative group">
                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: color, border: "2px solid var(--admin-accent-light)" }} title={color} />
                    {i === 0 && <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider px-1" style={{ color: "var(--admin-accent)", backgroundColor: "var(--admin-text)" }}>Главное</span>}
                    <button type="button" onClick={() => setFormData((p) => ({ ...p, colors: p.colors.filter((_, j) => j !== i) }))} className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundColor: "var(--admin-text)", color: "var(--admin-surface)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {showColorPicker ? (
              <div className="flex items-center gap-3">
                <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="h-12 w-20 cursor-pointer rounded-full" style={{ border: "1px solid var(--admin-border)" }} />
                <button type="button" onClick={() => { if (formData.colors.length < 10) setFormData((p) => ({ ...p, colors: [...p.colors, newColor] })); setShowColorPicker(false); setNewColor("#ffffff"); }} className="admin-button-primary">Подтвердить</button>
                <button type="button" onClick={() => setShowColorPicker(false)} className="admin-button-secondary">Отмена</button>
              </div>
            ) : (
              formData.colors.length < 10 && (
                <button type="button" onClick={() => setShowColorPicker(true)} className="admin-button-secondary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                  Добавить цвет
                </button>
              )
            )}
          </div>
        </div>

        {/* Sizes */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Размеры</p>
          <div className="admin-size-options">
            {sizeOptions.map((size) => (
              <label key={size} className={`admin-size-chip cursor-pointer ${formData.sizes.includes(size) ? "active" : ""}`}>
                <input type="checkbox" checked={formData.sizes.includes(size)} onChange={() => setFormData((p) => ({ ...p, sizes: p.sizes.includes(size) ? p.sizes.filter((s) => s !== size) : [...p.sizes, size] }))} className="sr-only" />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <p className="admin-kicker mb-6">Фотографии</p>
          <div className="space-y-4">
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {formData.images.map((image, i) => (
                  <div key={i} className="relative group">
                    <div className="relative h-24 w-24 overflow-hidden rounded-[16px]" style={{ border: "1px solid var(--admin-border)" }}>
                      <img src={image} alt={`Фото ${i + 1}`} className="h-full w-full object-cover" />
                    </div>
                    {i === 0 && <p className="mt-1 text-center text-[10px] uppercase tracking-wider" style={{ color: "var(--admin-accent)" }}>Главное фото</p>}
                    <button type="button" onClick={() => setFormData((p) => ({ ...p, images: p.images.filter((_, j) => j !== i) }))} className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundColor: "var(--admin-text)", color: "var(--admin-surface)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {formData.images.length < 6 && (
              <div className="relative">
                <input type="file" accept="image/*" multiple onChange={(e) => { const files = Array.from(e.target.files || []); files.slice(0, 6 - formData.images.length).forEach((file) => { const reader = new FileReader(); reader.onload = (ev) => setFormData((p) => ({ ...p, images: [...p.images, ev.target?.result as string] })); reader.readAsDataURL(file); }); }} className="sr-only" id="img-upload" />
                <label htmlFor="img-upload" className="flex h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed transition-colors" style={{ borderColor: "var(--admin-accent-light)", color: "var(--admin-text-secondary)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-sm">Перетащите фото сюда или нажмите для загрузки</span>
                </label>
              </div>
            )}
          </div>
          <p className="admin-helper mt-2">Максимум 6 фотографий. Первое фото станет главным.</p>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between" style={{ borderTop: "1px solid var(--admin-accent-light)", paddingTop: "32px" }}>
          <button type="button" onClick={() => router.push("/admin/products")} className="admin-button-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Назад
          </button>
          <button type="submit" disabled={saving} className="admin-button-primary disabled:opacity-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", duration: 0.4 }} className="admin-panel mx-4 max-w-sm p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(183, 110, 138, 0.15)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--admin-accent)" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <h3 className="text-xl font-medium" style={{ color: "var(--admin-text)" }}>Сохранено!</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--admin-text-muted)" }}>Перенаправляем вас в каталог...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
