import { createContext, useEffect, useState, type ReactNode } from "react";

import type { Product } from "../types/Product";
import type { CartItem } from "../types/Cart";



type CartContextType = {
  cart: CartItem[];

  addToCart: (product: Product) => void;

  removeFromCart: (id: number) => void;

  increase: (id: number) => void;

  decrease: (id: number) => void;

  total: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export default function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("zellio_cart");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("zellio_cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,

        {
          product,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  }

  function increase(id: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decrease(id: number) {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      }),
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,

    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,

        addToCart,

        removeFromCart,

        increase,

        decrease,

        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

