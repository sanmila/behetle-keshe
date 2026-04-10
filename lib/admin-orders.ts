export type AdminOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface AdminOrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  total: number;
  date: string;
  status: AdminOrderStatus;
  items: AdminOrderItem[];
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const ADMIN_STATUS_CONFIG: Record<AdminOrderStatus, { label: string; bg: string; text: string }> = {
  pending: { label: "Новый", bg: "badge-new", text: "" },
  processing: { label: "В обработке", bg: "badge-processing", text: "" },
  shipped: { label: "Отправлен", bg: "badge-shipped", text: "" },
  delivered: { label: "Доставлен", bg: "badge-delivered", text: "" },
  cancelled: { label: "Отменён", bg: "badge-cancelled", text: "" },
};

export function normalizeAdminOrderStatus(status: string): AdminOrderStatus {
  switch (status) {
    case "processing":
    case "shipped":
    case "delivered":
    case "cancelled":
      return status;
    case "new":
    case "pending":
    default:
      return "pending";
  }
}

interface SourceOrder {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  shippingAddress: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  totalAmount: number;
  status: string;
  createdAt: string | Date;
  items: Array<{
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    priceAtPurchase: number;
  }>;
}

export function mapOrderForAdmin(order: SourceOrder): AdminOrder {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    name: order.name,
    email: order.email,
    phone: "—",
    total: Number(order.totalAmount),
    date: new Date(order.createdAt).toISOString(),
    status: normalizeAdminOrderStatus(order.status),
    items: order.items.map((item) => ({
      productId: item.productId,
      name: item.productName,
      image: item.productImage,
      size: "—",
      color: "—",
      price: Number(item.priceAtPurchase),
      quantity: item.quantity,
    })),
    address: order.shippingAddress,
    city: order.city,
    state: order.state,
    zip: order.zip,
    country: order.country,
  };
}
