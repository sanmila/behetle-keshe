import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import { getDatabaseUrl, resolveSqliteFilePath } from "@/lib/runtime-config";

const dbPath = resolveSqliteFilePath(getDatabaseUrl());
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    nameRu: "Oversize Футболка", nameEn: "Oversized T-Shirt", slug: "oversized-t-shirt", price: 2990,
    category: "tops", tag: "new", color: "grey", colorRu: "Серый", colorEn: "Grey",
    descriptionRu: "Мягкая хлопковая футболка свободного кроя.",
    descriptionEn: "Soft cotton t-shirt with an oversized fit.",
    image: "/products/Product 01/Young_woman_wearing_202604080916.jpeg",
    images: "", sizes: "XS, S, M, L, XL", stockQty: 25,
  },
  {
    nameRu: "Классическая Футболка", nameEn: "Classic T-Shirt", slug: "classic-t-shirt", price: 2499,
    category: "tops", tag: "bestseller", color: "black", colorRu: "Чёрный", colorEn: "Black",
    descriptionRu: "Классическая футболка из органического хлопка.",
    descriptionEn: "Essential everyday tee in organic cotton.",
    image: "/products/Product 03/Woman_wearing_oversized_202604080931.jpeg",
    images: "", sizes: "XS, S, M, L, XL", stockQty: 30,
  },
  {
    nameRu: "Мягкий Топ", nameEn: "Soft Knit Top", slug: "soft-knit-top", price: 3999,
    category: "tops", color: "cream", colorRu: "Кремовый", colorEn: "Cream",
    descriptionRu: "Мягкий трикотажный топ с изысканной драпировкой.",
    descriptionEn: "Relaxed knit with a refined drape.",
    image: "/products/Product 01/Model_wearing_oversized_202604080917.jpeg",
    images: "", sizes: "XS, S, M, L", stockQty: 15,
  },
  {
    nameRu: "Льняной Топ", nameEn: "Linen Top", slug: "linen-top", price: 3699,
    category: "tops", color: "natural", colorRu: "Натуральный", colorEn: "Natural",
    descriptionRu: "Дышащий лён с непринуждённой элегантностью.",
    descriptionEn: "Breathable linen with a casual elegance.",
    image: "/products/product 06/Woman_wearing_t-shirt_202604080950.jpeg",
    images: "", sizes: "XS, S, M, L, XL", stockQty: 18,
  },
  {
    nameRu: "Хлопковый Crew", nameEn: "Cotton Crew", slug: "cotton-crew", price: 3299,
    category: "tops", tag: "new", color: "oatmeal", colorRu: "Овсяный", colorEn: "Oatmeal",
    descriptionRu: "Премиальный хлопок в вневременном crewneck.",
    descriptionEn: "Premium cotton in a timeless crewneck.",
    image: "/products/product 10/Woman_wearing_t-shirt_202604081022.jpeg",
    images: "", sizes: "XS, S, M, L, XL", stockQty: 20,
  },
  {
    nameRu: "Белый Essential", nameEn: "White Essential", slug: "white-essential", price: 2899,
    category: "tops", tag: "new", color: "white", colorRu: "Белый", colorEn: "White",
    descriptionRu: "Чистый белый essential с премиальной отделкой.",
    descriptionEn: "Clean white essential with premium finish.",
    image: "/products/product 15/Woman_wearing_white_202604081036.jpeg",
    images: "", sizes: "XS, S, M, L, XL", stockQty: 22,
  },
  {
    nameRu: "Минималистичный Топ", nameEn: "Minimal Top", slug: "minimal-top", price: 2999,
    category: "tops", color: "burgundy", colorRu: "Бордовый", colorEn: "Burgundy",
    descriptionRu: "Сдержанная элегантность в премиальном хлопке.",
    descriptionEn: "Understated elegance in premium cotton.",
    image: "/products/product 12/Woman_wearing_red_202604081029.jpeg",
    images: "", sizes: "XS, S, M, L", stockQty: 16,
  },
  {
    nameRu: "Шелковая Блузка", nameEn: "Silk Blouse", slug: "silk-blouse", price: 5499,
    category: "women", color: "ivory", colorRu: "Слоновая кость", colorEn: "Ivory",
    descriptionRu: "Роскошный шёлк с расслабленной силуэтом.",
    descriptionEn: "Luxurious silk with a relaxed silhouette.",
    image: "/products/product 09/Russian_woman_smiling_202604080958.jpeg",
    images: "", sizes: "XS, S, M, L", stockQty: 10,
  },
  {
    nameRu: "Oversize Fit", nameEn: "Oversized Fit", slug: "oversized-fit", price: 4999,
    category: "women", tag: "new", color: "white", colorRu: "Белый", colorEn: "White",
    descriptionRu: "Яркий oversize для безупречного стиля.",
    descriptionEn: "Statement oversized piece for effortless style.",
    image: "/products/Product 08/Woman_wearing_oversized_202604080952.jpeg",
    images: "", sizes: "XS, S, M, L, XL", stockQty: 12,
  },
  {
    nameRu: "Топ с V-вырезом", nameEn: "Wrap Top", slug: "wrap-top", price: 3899,
    category: "women", color: "red", colorRu: "Красный", colorEn: "Red",
    descriptionRu: "Элегантный топ с запахом в струящейся ткани.",
    descriptionEn: "Elegant wrap detail in flowing fabric.",
    image: "/products/product 11/Woman_wearing_red_202604081026.jpeg",
    images: "", sizes: "XS, S, M, L", stockQty: 14,
  },
];

async function main() {
  console.log("Seeding database...");

  const adminHash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@happy-man.ru" },
    update: {},
    create: {
      email: "admin@happy-man.ru", passwordHash: adminHash, name: "Admin", isAdmin: true,
    },
  });
  console.log("Admin user created: admin@happy-man.ru / admin123");

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products`);

  await prisma.setting.upsert({
    where: { key: "storeName" }, update: {}, create: { id: "storeName", key: "storeName", value: "HAPPY MAN" },
  });
  await prisma.setting.upsert({
    where: { key: "contactEmail" }, update: {}, create: { id: "contactEmail", key: "contactEmail", value: "hello@happy-man.ru" },
  });

  console.log("Done!");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
