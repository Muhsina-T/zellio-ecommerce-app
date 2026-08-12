import { createContext, useEffect, useState, type ReactNode } from "react";

import type { Product } from "../types/Product";
import type { CartItem } from "../types/Cart";

import api from "../api/api";
import useAuth from "../hooks/useAuth";

type CartContextType = {
  cart: CartItem[];

  addToCart: (product: Product, variantId: number) => Promise<void>;

  removeFromCart: (id: string) => Promise<void>;

  increase: (id: string) => Promise<void>;

  decrease: (id: string) => Promise<void>;

  clearCart: () => Promise<void>;

  total: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export default function CartProvider({ children }: Props) {
  const { user } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);

  async function fetchCart() {
    try {
      const res = await api.get("/cart");

      setCart(res.data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  useEffect(() => {
    if (user) {
      void fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  async function addToCart(
  product: Product,
  variantId: number
) {
  try {
    await api.post("/cart", {
      productId: product._id,
      variantId: variantId,
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
  (sum, item) => {
    const variant = item.product.variants?.find(
      (v) => v.id === item.variantId
    );

    return sum + (variant?.price || item.product.price) * item.quantity;
  },
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
