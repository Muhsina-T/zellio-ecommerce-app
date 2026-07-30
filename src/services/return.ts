import type { ReturnRequest } from "../types/Return";

const RETURN_KEY = "zellio_returns";

export function getReturns(): ReturnRequest[] {
  const data = localStorage.getItem(RETURN_KEY);

  return data ? JSON.parse(data) : [];
}

export function saveReturns(
  returns: ReturnRequest[]
) {
  localStorage.setItem(
    RETURN_KEY,
    JSON.stringify(returns)
  );
}