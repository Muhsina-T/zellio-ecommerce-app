import type { Order } from "./Order";

export interface ReturnRequest {
  id: string;

  orderId: string;

  order: Order;

  // optional: which product in the order is being returned
  productId?: number;
  quantity?: number;

  reason: string;

  requestDate: string;

  status:
    | "Pending"
    | "Approved"
    | "Rejected"
    | "Completed";
}