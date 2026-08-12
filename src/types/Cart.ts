import type { Product } from "./Product";

export interface CartItem {
  _id?: string;

  product: Product;

  variantId: number;

  quantity: number;
}