import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import type { OrderContextType } from "../context/OrderContext";

export default function useOrder(): OrderContextType {
  const context = useContext(OrderContext) as OrderContextType | undefined;

  if (!context) {
    throw new Error("useOrder must be inside OrderProvider");
  }

  return context;
}
