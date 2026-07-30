import type { CartItem } from "./Cart";


export interface Address {

  id: string;

  type: "Home" | "Work";

  name: string;

  phone: string;

  address: string;

}


export interface Order {

  // Internal ID (used for logic/localStorage)
  id: string;

  // Customer visible order number
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

  deliveredDate?: string;

}