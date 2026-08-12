import api from "../api/api";
import type { Order } from "../types/Order";


// Get logged-in user's orders
export async function getOrders(): Promise<Order[]> {
  try {
    const res = await api.get("/orders");
    
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
}


// Create order
export async function saveOrder(order: Order): Promise<Order> {
  try {
    const res = await api.post("/orders", order);

    return res.data;
  } catch (error) {
    throw new Error("Failed to place order");
  }
}


// Update order status
export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<Order> {

  const res = await api.put(`/orders/${id}`, {
    status,
  });

  return res.data;
}


// Delete order
export async function deleteOrder(id: string): Promise<void> {
  await api.delete(`/orders/${id}`);
}