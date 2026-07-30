import { createContext, useState, type ReactNode } from "react";

import type { Order } from "../types/Order";

import { saveOrder, getOrders } from "../services/order";

export type OrderContextType = {
  orders: Order[];

  createOrder: (order: Order) => void;

  updateStatus: (id: string, status: Order["status"]) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export default function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    return getOrders();
  });

  function createOrder(order: Order) {
    saveOrder(order);

    setOrders((prev) => [
      ...prev,
      order,
    ]);
  }

  function updateStatus(id: string, status: Order["status"]) {
    const updated = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            status,
            deliveredDate: status === "Delivered" ? new Date().toISOString() : undefined,
          }
        : order
    );

    setOrders(updated);

    localStorage.setItem("zellio_orders", JSON.stringify(updated));
  }

  function updateOrder(id: string, updates: Partial<Order>) {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, ...updates } : order
    );

    setOrders(updated);

    localStorage.setItem("zellio_orders", JSON.stringify(updated));
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
