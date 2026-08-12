import type { Product } from "./Product";

export interface OrderItem {
  product: Product;
  variantId: number;
  storage: string;
  color: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
}
export interface Address {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  _id?: string;
  id?: string;

  orderNumber: string;

  items: OrderItem[];

  total: number;

  address: Address;

  payment: {
    method: string;
    status: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  } | string;

  status:
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";

  date: string;

  canReturn: boolean;

  createdAt?: string;
  updatedAt?: string;

  deliveredDate?: string;
}