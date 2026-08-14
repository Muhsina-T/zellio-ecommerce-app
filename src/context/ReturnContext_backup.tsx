import { createContext, useEffect, useState, type ReactNode } from "react";

import api from "../api/api";

import type { ReturnRequest } from "../types/Return";

import useAuth from "../hooks/useAuth";

type ReturnContextType = {
  returns: ReturnRequest[];

  requestReturn: (data: {
    order: string;
    product: string;
    reason: string;
    status?: ReturnRequest["status"];
  }) => Promise<ReturnRequest>;

  updateReturnStatus: (
    id: string,
    status: ReturnRequest["status"],
  ) => Promise<void>;

  deleteReturn: (id: string) => Promise<void>;
};

export const ReturnContext = createContext<ReturnContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export default function ReturnProvider({ children }: Props) {
  const { user } = useAuth();

  const [returns, setReturns] = useState<ReturnRequest[]>([]);

  useEffect(() => {
    if (user) {
      void fetchReturns();
    }
  }, [user?._id]);

  async function fetchReturns() {
    try {
      const userId = user?._id || user?.id;

      if (!userId) return;

      const res = await api.get(
        user?.role === "admin" ? "/returns" : `/returns/user/${userId}`,
      );

      setReturns(res.data);
    } catch (error) {
      console.error("Failed to fetch returns:", error);
    }
  }

  async function requestReturn(data: {
    order: string;
    product: string;
    reason: string;
    status?: ReturnRequest["status"];
  }) {
    try {
      const res = await api.post("/returns", data);

      setReturns((prev) => [res.data, ...prev]);

      return res.data;
    } catch (error) {
      console.error("Return request failed:", error);
    }
  }

  async function updateReturnStatus(
    id: string,
    status: ReturnRequest["status"],
  ) {
    try {
      const res = await api.put(`/returns/${id}`, {
        status,
      });

      setReturns((prev) =>
        prev.map((item) => (item._id === id ? res.data : item)),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteReturn(id: string) {
    try {
      await api.delete(`/returns/${id}`);

      setReturns((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ReturnContext.Provider
      value={{
        returns,
        requestReturn,
        updateReturnStatus,
        deleteReturn,
      }}
    >
      {children}
    </ReturnContext.Provider>
  );
}
