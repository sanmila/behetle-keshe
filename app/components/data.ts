export type Category = "all" | "new" | "tops" | "outerwear" | "bottoms" | "accessories" | "women" | "men";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Exclude<Category, "all">;
  tag?: "new" | "bestseller" | "sale";
  image: string;
  color: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Oversized T-Shirt",
    price: 29.99,
    category: "tops",
    tag: "new",
    image: "/products/Product 01/Young_woman_wearing_202604080916.jpeg",
    color: "Grey",
    description: "Premium oversized fit in soft cotton jersey",
  },
  {
    id: 2,
    name: "Relaxed T-Shirt",
    price: 34.99,
    category: "tops",
    image: "/products/product 02/Young_woman_in_202604080925.jpeg",
    color: "White",
    description: "Relaxed cut with a lived-in feel",
  },
  {
    id: 3,
    name: "Classic T-Shirt",
    price: 24.99,
    category: "tops",
    tag: "bestseller",
    image: "/products/Product 03/Woman_wearing_oversized_202604080931.jpeg",
    color: "Black",
    description: "Essential everyday tee in organic cotton",
  },
  {
    id: 4,
    name: "Soft Knit Top",
    price: 39.99,
    category: "tops",
    image: "/products/Product 01/Model_wearing_oversized_202604080917.jpeg",
    color: "Cream",
    description: "Relaxed knit with a refined drape",
  },
  {
    id: 5,
    name: "Oversized Blouse",
    price: 44.99,
    category: "tops",
    image: "/products/product 05/Woman_wearing_oversized_202604080945.jpeg",
    color: "Beige",
    description: "Flowing silhouette in natural fibres",
  },
  {
    id: 6,
    name: "Linen Top",
    price: 36.99,
    category: "tops",
    image: "/products/product 06/Woman_wearing_t-shirt_202604080950.jpeg",
    color: "Natural",
    description: "Breathable linen with a casual elegance",
  },
  {
    id: 7,
    name: "Oversized Fit",
    price: 49.99,
    category: "women",
    tag: "new",
    image: "/products/Product 08/Woman_wearing_oversized_202604080952.jpeg",
    color: "White",
    description: "Statement oversized piece for effortless style",
  },
  {
    id: 8,
    name: "Essential Tee",
    price: 27.99,
    category: "tops",
    image: "/products/Product 03/Woman_wearing_t-shirt_202604080931.jpeg",
    color: "Charcoal",
    description: "The wardrobe staple, perfected",
  },
  {
    id: 9,
    name: "Silk Blouse",
    price: 54.99,
    category: "women",
    image: "/products/product 09/Russian_woman_smiling_202604080958.jpeg",
    color: "Ivory",
    description: "Luxurious silk with a relaxed silhouette",
  },
  {
    id: 10,
    name: "Cotton Crew",
    price: 32.99,
    category: "tops",
    tag: "new",
    image: "/products/product 10/Woman_wearing_t-shirt_202604081022.jpeg",
    color: "Oatmeal",
    description: "Premium cotton in a timeless crewneck",
  },
  {
    id: 11,
    name: "Wrap Top",
    price: 38.99,
    category: "women",
    image: "/products/product 11/Woman_wearing_red_202604081026.jpeg",
    color: "Red",
    description: "Elegant wrap detail in flowing fabric",
  },
  {
    id: 12,
    name: "Minimal Top",
    price: 29.99,
    category: "tops",
    image: "/products/product 12/Woman_wearing_red_202604081029.jpeg",
    color: "Burgundy",
    description: "Understated elegance in premium cotton",
  },
  {
    id: 13,
    name: "Ribbed Top",
    price: 26.99,
    category: "tops",
    image: "/products/Product 13/Woman_wearing_black_202604081032.jpeg",
    color: "Black",
    description: "Fitted ribbed style with subtle texture",
  },
  {
    id: 14,
    name: "Cotton Jersey",
    price: 31.99,
    category: "tops",
    image: "/products/Product 14/Russian_woman_in_202604081035.jpeg",
    color: "Navy",
    description: "Soft jersey with excellent drape",
  },
  {
    id: 15,
    name: "White Essential",
    price: 28.99,
    category: "tops",
    tag: "new",
    image: "/products/product 15/Woman_wearing_white_202604081036.jpeg",
    color: "White",
    description: "Clean white essential with premium finish",
  },
];

export const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Tops", value: "tops" },
  { label: "Women", value: "women" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Accessories", value: "accessories" },
];
