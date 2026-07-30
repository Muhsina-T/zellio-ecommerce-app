import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types/Product";

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (product: Product) => void;
};

export const WishlistContext =
  createContext<WishlistContextType | undefined>(undefined);

type Props = { children: ReactNode };

export default function WishlistProvider({ children }: Props) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("zellio_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("zellio_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addToWishlist(product: Product) {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }

  function removeFromWishlist(id: number) {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }

  function toggleWishlist(product: Product) {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
