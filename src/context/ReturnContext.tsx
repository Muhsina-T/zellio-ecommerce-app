import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { ReturnRequest } from "../types/Return";

import {
  getReturns,
  saveReturns,
} from "../services/return";

type ReturnContextType = {
  returns: ReturnRequest[];

  requestReturn: (
    data: ReturnRequest
  ) => void;

  updateReturnStatus: (
    id: string,
    status: ReturnRequest["status"]
  ) => void;
};

export const ReturnContext =
  createContext<
    ReturnContextType | undefined
  >(undefined);

type Props = {
  children: ReactNode;
};

export default function ReturnProvider({
  children,
}: Props) {

  const [returns, setReturns] =
    useState<ReturnRequest[]>(
      getReturns()
    );

  useEffect(() => {

    saveReturns(returns);

  }, [returns]);

  function requestReturn(
    data: ReturnRequest
  ) {

    setReturns(prev => [
      ...prev,
      data,
    ]);

  }

  function updateReturnStatus(
    id: string,
    status: ReturnRequest["status"]
  ) {

    setReturns(prev =>

      prev.map(item =>

        item.id === id
          ? {
              ...item,
              status,
            }
          : item

      )

    );

  }

  return (

    <ReturnContext.Provider
      value={{
        returns,
        requestReturn,
        updateReturnStatus,
      }}
    >

      {children}

    </ReturnContext.Provider>

  );
}