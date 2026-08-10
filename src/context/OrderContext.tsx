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

  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrders() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user) {
      void fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  async function createOrder(
    order: Order
  ): Promise<Order | undefined> {
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

      await fetchOrders();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateOrder(
    id: string,
    updates: Partial<Order>
  ) {
    try {
      await updateOrderStatus(
        id,
        updates.status as Order["status"]
      );

      await fetchOrders();
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