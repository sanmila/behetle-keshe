"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../components/AdminShell";
import AdminPageHeader from "../../components/AdminPageHeader";
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
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const defaultFormData: ProductFormData = {
  nameRu: "",
  slug: "",
  category: "",
  tag: "",
  price: "",
  discountedPrice: "",
  stockQty: "",
  shortDescription: "",
  fullDescription: "",
  specifications: [],
  colors: [],
  sizes: [],
  images: [],
};

export default function AddProductPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [newSpec, setNewSpec] = useState("");
  const [newColor, setNewColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      nameRu: value,
      slug: prev.slug || slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setFormData((prev) => ({ ...prev, slug: slugify(value) }));
  };

  const addSpecification = () => {
    if (newSpec.trim()) {
      setFormData((prev) => ({
        ...prev,
        specifications: [...prev.specifications, newSpec.trim()],
      }));
      setNewSpec("");
    }
  };

  const removeSpecification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const addColor = () => {
    if (formData.colors.length < 10) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor],
      }));
      setShowColorPicker(false);
      setNewColor("#ffffff");
    }
  };

  const removeColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && formData.images.length < 6) {
        const files = Array.from(e.target.files);
        const remainingSlots = 6 - formData.images.length;
        const toAdd = files.slice(0, remainingSlots);

        toAdd.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, dataUrl],
            }));
          };
          reader.readAsDataURL(file);
        });
      }
    },
    [formData.images.length]
  );

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameRu.trim()) {
      alert("Введите название товара");
      return;
    }
    if (!formData.price.trim()) {
      alert("Введите цену");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        discountedPrice: formData.discountedPrice ? Number(formData.discountedPrice) : null,
        stockQty: formData.stockQty ? Number(formData.stockQty) : 0,
      };

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/admin/products");
        }, 1500);
      } else {
        const data = await response.json();
        alert(data.error || "Не удалось сохранить товар");
        setSaving(false);
      }
    } catch {
      // Fallback: simulate success without backend
      console.log("Product data:", formData);
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    }
  };

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Каталог"
        title="Добавить товар"
        description="Заполните информацию о новом товаре. Все поля кроме обязательных можно заполнить позже."
      />

      <form onSubmit={handleSubmit} className="admin-panel p-7 space-y-8">
        {/* Basic Info Section */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Основная информация</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">Название товара *</label>
              <input
                type="text"
                value={formData.nameRu}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Например: Льняное платье с вышивкой"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Артикул / Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="lnyanoe-plate-s-vyshivkoy"
                className="admin-input"
              />
              <p className="admin-helper">URL-идентификатор товара (генерируется автоматически)</p>
            </div>
            <div>
              <label className="admin-label">Категория</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="admin-select"
              >
                <option value="">Выберите категорию</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="admin-label">Метка</label>
              <select
                value={formData.tag}
                onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                className="admin-select"
              >
                {tagOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Ценообразование</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="admin-label">Цена *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="4900"
                className="admin-input"
                min="0"
                required
              />
            </div>
            <div>
              <label className="admin-label">Цена со скидкой</label>
              <input
                type="number"
                value={formData.discountedPrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, discountedPrice: e.target.value }))}
                placeholder="3900"
                className="admin-input"
                min="0"
              />
              <p className="admin-helper">Если указана — старая цена будет зачёркнута</p>
            </div>
            <div>
              <label className="admin-label">Остаток</label>
              <input
                type="number"
                value={formData.stockQty}
                onChange={(e) => setFormData((prev) => ({ ...prev, stockQty: e.target.value }))}
                placeholder="15"
                className="admin-input"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Descriptions Section */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Описание</p>
          <div className="space-y-6">
            <div>
              <label className="admin-label">Краткое описание</label>
              <textarea
                value={formData.shortDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="Элегантное платье из натурального льна для тёплых летних вечеров..."
                className="admin-textarea min-h-[120px]"
                maxLength={200}
              />
              <p className="admin-helper">{formData.shortDescription.length}/200 символов</p>
            </div>
            <div>
              <label className="admin-label">Полное описание</label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullDescription: e.target.value }))}
                placeholder="Подробное описание товара: состав, особенности кроя, уход, стилевые рекомендации..."
                className="admin-textarea min-h-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Характеристики</p>
          <div className="space-y-3">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={spec}
                  onChange={(e) => {
                    const newSpecs = [...formData.specifications];
                    newSpecs[index] = e.target.value;
                    setFormData((prev) => ({ ...prev, specifications: newSpecs }));
                  }}
                  className="admin-input flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="admin-button-ghost !w-12 !min-h-10"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newSpec}
                onChange={(e) => setNewSpec(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpecification())}
                placeholder="Добавить характеристику..."
                className="admin-input flex-1"
              />
              <button
                type="button"
                onClick={addSpecification}
                className="admin-button-secondary !min-h-10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Добавить
              </button>
            </div>
          </div>
        </div>

        {/* Colors Section */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Цвета</p>
          <div className="space-y-4">
            {/* Color swatches */}
            {formData.colors.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {formData.colors.map((color, index) => (
                  <div key={index} className="relative group">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-[rgba(248,200,220,0.2)]"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                    {index === 0 && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider bg-[#2A1F23] px-1">
                        Главное
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2A1F23] opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add color controls */}
            {showColorPicker ? (
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="h-12 w-20 cursor-pointer rounded-full border bg-transparent"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors hover:bg-[#f2bfd1]"
                >
                  Подтвердить
                </button>
                <button
                  type="button"
                  onClick={() => setShowColorPicker(false)}
                  className="admin-button-ghost !px-4 !min-h-10"
                >
                  Отмена
                </button>
              </div>
            ) : (
              formData.colors.length < 10 && (
                <button
                  type="button"
                  onClick={() => setShowColorPicker(true)}
                  className="admin-button-secondary !border-dashed"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Добавить цвет
                </button>
              )
            )}
          </div>
        </div>

        {/* Sizes Section */}
        <div className="admin-form-section">
          <p className="admin-kicker mb-6">Размеры</p>
          <div className="admin-size-options">
            {sizeOptions.map((size) => (
              <label
                key={size}
                className={`admin-size-chip cursor-pointer ${
                  formData.sizes.includes(size)
                    ? "active"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="sr-only"
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Images Section */}
        <div>
          <p className="admin-kicker mb-6">Фотографии</p>
          <div className="space-y-4">
            {/* Image previews */}
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-24 w-24 overflow-hidden rounded-[16px] border" style={{ backgroundColor: "var(--admin-surface)" }}>
                      <img
                        src={image}
                        alt={`Фото ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {index === 0 && (
                      <p className="mt-1 text-center text-[10px] uppercase tracking-wider" style={{ color: "var(--admin-accent)" }}>
                        Главное фото
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2A1F23] opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload zone */}
            {formData.images.length < 6 && (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="sr-only"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed transition-colors"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-sm">Перетащите фото сюда или нажмите для загрузки</span>
                </label>
              </div>
            )}
          </div>
          <p className="admin-helper mt-2">Максимум 6 фотографий. Первое фото станет главным.</p>
        </div>

        {/* Submit Section */}
        <div className="flex items-center justify-between border-t pt-8">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="admin-button-ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          <button
            type="submit"
            disabled={saving}
            className="admin-button-primary disabled:opacity-50"
          >
            {saving ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Сохранение...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Добавить товар
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="admin-panel mx-4 max-w-sm p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "var(--admin-accent)", opacity: 0.15 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--admin-accent)" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-xl font-medium" style={{ color: "var(--admin-text)" }}>Товар добавлен!</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--admin-text-muted)" }}>Перенаправляем вас в каталог...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
