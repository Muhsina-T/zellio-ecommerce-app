import type { CartItem } from "./Cart";

export interface Address {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  _id?: string;
  id?: string;

  orderNumber: string;

  items: CartItem[];

  total: number;

  address: Address;

  payment: string;

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