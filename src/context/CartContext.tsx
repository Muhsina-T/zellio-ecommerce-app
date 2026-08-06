import { createContext, useEffect, useState, type ReactNode } from "react";

import type { Product } from "../types/Product";
import type { CartItem } from "../types/Cart";

import api from "../api/api";
import useAuth from "../hooks/useAuth";

type CartContextType = {
  cart: CartItem[];

  addToCart: (product: Product) => Promise<void>;

  removeFromCart: (id: string) => Promise<void>;

  increase: (id: string) => Promise<void>;

  decrease: (id: string) => Promise<void>;

  clearCart: () => Promise<void>;

  total: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export default function CartProvider({ children }: Props) {
  const { user } = useAuth();
  const storageKey = user ? `zellio_cart_${user._id || user.id}` : null;

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!storageKey) {
      setCart([]);
      return;
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCart(JSON.parse(saved) as CartItem[]);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    void fetchCart();
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;

    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [storageKey, cart]);

  async function fetchCart() {
    try {
      const res = await api.get("/cart");

      setCart(res.data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  async function addToCart(product: Product) {
    try {
      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function removeFromCart(id: string) {
    try {
      await api.delete(`/cart/${id}`);

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function increase(id: string) {
    try {
      await api.put(`/cart/${id}`, {
        action: "increase",
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function decrease(id: string) {
    try {
      await api.put(`/cart/${id}`, {
        action: "decrease",
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function clearCart() {
    try {
      await api.delete("/cart/clear");
      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}