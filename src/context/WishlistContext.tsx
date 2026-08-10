import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/Product";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

type WishlistContextType = {
  wishlist: Product[];

  addToWishlist: (product: Product) => Promise<void>;

  removeFromWishlist: (id: string) => Promise<void>;

  toggleWishlist: (product: Product) => Promise<void>;
};

export const WishlistContext =
  createContext<WishlistContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export default function WishlistProvider({ children }: Props) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState<Product[]>([]);

  async function fetchWishlist() {
    try {
      const userId = user?._id || user?.id;

      if (!userId) {
        setWishlist([]);
        return;
      }

      const res = await api.get(`/wishlist/${userId}`);

      setWishlist(res.data.products || []);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    }
  }

  useEffect(() => {
    if (user) {
      void fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  async function addToWishlist(product: Product) {
    try {
      if (!user?._id && !user?.id) return;

      await api.post("/wishlist", {
        productId: product._id,
      });

      await fetchWishlist();
    } catch (error) {
      console.error("Add wishlist error:", error);
    }
  }

  async function removeFromWishlist(id: string) {
    try {
      if (!user?._id && !user?.id) return;

      await api.delete(`/wishlist/${id}`);

      await fetchWishlist();
    } catch (error) {
      console.error("Remove wishlist error:", error);
    }
  }

  async function toggleWishlist(product: Product) {
    const exists = wishlist.some(
      (item) => item._id === product._id
    );

    if (exists) {
      await removeFromWishlist(product._id || "");
    } else {
      await addToWishlist(product);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}