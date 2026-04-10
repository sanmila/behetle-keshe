export function formatPrice(price: number): string {
  return `₽${Math.round(price).toLocaleString("ru-RU").replace(",", " ")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
