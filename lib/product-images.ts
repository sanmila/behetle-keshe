const IMAGE_PATH_CORRECTIONS: Record<string, string> = {
  "/products/product 11/Woman_wearing_red_202604080926.jpeg": "/products/product 11/Woman_wearing_red_202604081026.jpeg",
  "/products/product 11/Young_woman_wearing_202604080926.jpeg": "/products/product 11/Young_woman_wearing_202604081026.jpeg",
  "/products/product 12/Woman_wearing_red_202604080929.jpeg": "/products/product 12/Woman_wearing_red_202604081029.jpeg",
};

export function normalizeProductImage(image?: string | null) {
  if (!image) return image ?? "";
  return IMAGE_PATH_CORRECTIONS[image] ?? image;
}

export function normalizeProductRecord<T extends { image: string }>(product: T): T {
  return {
    ...product,
    image: normalizeProductImage(product.image),
  };
}

export function normalizeProductRecords<T extends { image: string }>(products: T[]): T[] {
  return products.map(normalizeProductRecord);
}

export function normalizeCartItems<T extends { product: { image: string } }>(items: T[]): T[] {
  return items.map((item) => ({
    ...item,
    product: {
      ...item.product,
      image: normalizeProductImage(item.product.image),
    },
  }));
}
