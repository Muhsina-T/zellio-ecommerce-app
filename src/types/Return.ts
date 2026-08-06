import type { Order } from "./Order";
import type { Product } from "./Product";

export interface ReturnRequest {
  _id: string;

  user: string;

  order: Order;

  product: Product;

  reason: string;

  status:
    | "Pending"
    | "Approved"
    | "Rejected";

  createdAt: string;

  updatedAt: string;
}