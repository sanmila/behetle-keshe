export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "order-001",
    orderNumber: "#00123",
    date: "2026-04-07T14:30:00Z",
    name: "Айгуль Гарипова",
    email: "aigul.garipova@mail.ru",
    phone: "+7 917 234-56-78",
    address: "ул. Ленина, д. 45, кв. 12",
    city: "Казань",
    state: "Татарстан",
    zip: "420000",
    country: "Россия",
    total: 5990,
    status: "new",
    items: [
      { productId: "1", name: "Oversize Футболка", image: "/products/Product 01/Young_woman_wearing_202604080916.jpeg", size: "M", color: "Белый", quantity: 1, price: 2990 },
      { productId: "3", name: "Льняные брюки", image: "/products/product 10/Woman_wearing_t-shirt_202604081022.jpeg", size: "S", color: "Бежевый", quantity: 1, price: 3000 },
    ],
  },
  {
    id: "order-002",
    orderNumber: "#00122",
    date: "2026-04-07T11:15:00Z",
    name: "Динар Шакиров",
    email: "d.shakirov@gmail.com",
    phone: "+7 952 876-34-12",
    address: "пр. Октября, д. 88",
    city: "Уфа",
    state: "Башкортостан",
    zip: "450001",
    country: "Россия",
    total: 2990,
    status: "new",
    items: [
      { productId: "5", name: "Хлопковая футболка", image: "/products/Product 03/Woman_with_long_dark_hair_202604080948.jpeg", size: "L", color: "Чёрный", quantity: 1, price: 2990 },
    ],
  },
  {
    id: "order-003",
    orderNumber: "#00121",
    date: "2026-04-06T09:00:00Z",
    name: "Эльвира Набиуллина",
    email: "e.nabiullina@inbox.ru",
    phone: "+7 901 345-67-89",
    address: "ул. Пушкина, д. 10, офис 204",
    city: "Москва",
    state: "Москва",
    zip: "101000",
    country: "Россия",
    total: 12990,
    status: "processing",
    items: [
      { productId: "2", name: "Джинсы Wide Leg", image: "/products/Product 02/photo_2026-04-08_08-59-49.jpg", size: "M", color: "Голубой", quantity: 1, price: 5990 },
      { productId: "7", name: "Бомбер женский", image: "/products/Product 04/photo_2026-04-08_09-00-10.jpg", size: "S", color: "Бордовый", quantity: 1, price: 7000 },
    ],
  },
  {
    id: "order-004",
    orderNumber: "#00120",
    date: "2026-04-05T16:45:00Z",
    name: "Ильдар Габдрахманов",
    email: "ildar.gabdr@mail.ru",
    phone: "+7 922 567-89-01",
    address: "наб. реки Фонтанки, д. 33",
    city: "Санкт-Петербург",
    state: "Санкт-Петербург",
    zip: "191023",
    country: "Россия",
    total: 8990,
    status: "processing",
    items: [
      { productId: "4", name: "Юбка миди", image: "/products/Product 05/photo_2026-04-08_09-00-23.jpg", size: "M", color: "Коричневый", quantity: 1, price: 3990 },
      { productId: "6", name: "Платье летнее", image: "/products/Product 06/photo_2026-04-08_09-01-01.jpg", size: "S", color: "Белый", quantity: 1, price: 5000 },
    ],
  },
  {
    id: "order-005",
    orderNumber: "#00119",
    date: "2026-04-04T13:20:00Z",
    name: "Рузиля Каримова",
    email: "ruzilya.k@ya.ru",
    phone: "+7 912 123-45-67",
    address: "ул. Вайнера, д. 15",
    city: "Екатеринбург",
    state: "Свердловская",
    zip: "620000",
    country: "Россия",
    total: 1990,
    status: "shipped",
    items: [
      { productId: "8", name: "Куртка демисезонная", image: "/products/Product 07/photo_2026-04-08_09-01-12.jpg", size: "M", color: "Бежевый", quantity: 1, price: 1990 },
    ],
  },
  {
    id: "order-006",
    orderNumber: "#00118",
    date: "2026-04-03T10:00:00Z",
    name: "Азат Сафиуллин",
    email: "azat.safiullin@gmail.com",
    phone: "+7 937 789-01-23",
    address: "ул. Комсомольская, д. 72",
    city: "Казань",
    state: "Татарстан",
    zip: "420111",
    country: "Россия",
    total: 15990,
    status: "shipped",
    items: [
      { productId: "9", name: "Брюки карго", image: "/products/Product 08/photo_2026-04-08_09-01-30.jpg", size: "L", color: "Хаки", quantity: 1, price: 5990 },
      { productId: "10", name: "Рубашка льняная", image: "/products/Product 09/photo_2026-04-08_09-02-01.jpg", size: "M", color: "Белый", quantity: 1, price: 4000 },
      { productId: "11", name: "Свитшот", image: "/products/Product 11/photo_2026-04-08_09-02-15.jpg", size: "XL", color: "Серый", quantity: 1, price: 6000 },
    ],
  },
  {
    id: "order-007",
    orderNumber: "#00117",
    date: "2026-04-02T08:30:00Z",
    name: "Лилия Фаттахова",
    email: "liliya.fattakhova@mail.ru",
    phone: "+7 905 234-56-78",
    address: "Тверская ул., д. 5, подъезд 3",
    city: "Москва",
    state: "Москва",
    zip: "125009",
    country: "Россия",
    total: 7490,
    status: "delivered",
    items: [
      { productId: "12", name: "Куртка-рубашка", image: "/products/Product 12/photo_2026-04-08_09-02-30.jpg", size: "M", color: "Тёмно-синий", quantity: 1, price: 7490 },
    ],
  },
  {
    id: "order-008",
    orderNumber: "#00116",
    date: "2026-04-01T15:00:00Z",
    name: "Тимур Ахметов",
    email: "timur.akhmetov@inbox.ru",
    phone: "+7 923 345-67-89",
    address: "Невский пр., д. 28, кв. 45",
    city: "Санкт-Петербург",
    state: "Санкт-Петербург",
    zip: "191186",
    country: "Россия",
    total: 4990,
    status: "cancelled",
    items: [
      { productId: "13", name: "Жилет утеплённый", image: "/products/Product 13/photo_2026-04-08_09-03-00.jpg", size: "L", color: "Чёрный", quantity: 1, price: 4990 },
    ],
  },
];

export const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  new:        { label: "Новый",        bg: "badge-new",        text: "" },
  processing: { label: "В обработке", bg: "badge-processing", text: "" },
  shipped:    { label: "Отправлен",    bg: "badge-shipped",    text: "" },
  delivered:  { label: "Доставлен",    bg: "badge-delivered",  text: "" },
  cancelled:  { label: "Отменён",      bg: "badge-cancelled",  text: "" },
};

// ─── Mock helpers (for dashboard) ─────────────────────────────────
export const mockOrders = MOCK_ORDERS;

export function getNewOrdersCount() {
  return MOCK_ORDERS.filter((o) => o.status === "new").length;
}

export function getRecentOrders(limit = 5): Order[] {
  return [...MOCK_ORDERS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getRevenueInLast7Days() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return MOCK_ORDERS
    .filter((o) => new Date(o.date) >= cutoff && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
}

export function getOrdersInLast7Days() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return MOCK_ORDERS.filter((o) => new Date(o.date) >= cutoff).length;
}
