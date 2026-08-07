import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import useAuth from "../hooks/useAuth";

import type { Order } from "../types/Order";

import {
  saveOrder,
  getOrders,
  updateOrderStatus,
} from "../services/order";

export type OrderContextType = {
  orders: Order[];

  createOrder: (order: Order) => Promise<Order | undefined>;

  updateStatus: (
    id: string,
    status: Order["status"]
  ) => Promise<void>;

  updateOrder: (
    id: string,
    updates: Partial<Order>
  ) => Promise<void>;
};

export const OrderContext =
  createContext<OrderContextType | undefined>(undefined);

export default function OrderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const storageKey = user ? `zellio_orders_${user._id || user.id}` : null;

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!storageKey) {
      setOrders([]);
      return;
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setOrders(JSON.parse(saved) as Order[]);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    void fetchOrders();
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;

    localStorage.setItem(storageKey, JSON.stringify(orders));
  }, [storageKey, orders]);

  async function fetchOrders() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createOrder(order: Order): Promise<Order | undefined> {
    try {
      const createdOrder = await saveOrder(order);

      setOrders((prev) => [
        createdOrder,
        ...prev,
      ]);
      return createdOrder;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStatus(
    id: string,
    status: Order["status"]
  ) {
    try {
      await updateOrderStatus(id, status);

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateOrder(
    id: string,
    updates: Partial<Order>
  ) {
    try {
      // If you later create a full update endpoint,
      // replace this with updateOrder(id, updates)
      await updateOrderStatus(
        id,
        updates.status as Order["status"]
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateStatus,
        updateOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}