import { createContext, useEffect, useState, type ReactNode } from "react";
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
  const storageKey = user ? `zellio_wishlist_${user._id || user.id}` : null;

  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    if (!storageKey) {
      setWishlist([]);
      return;
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setWishlist(JSON.parse(saved) as Product[]);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    void fetchWishlist();
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;

    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [storageKey, wishlist]);




  async function fetchWishlist() {
    try {
      const userId = user?._id || user?.id;

      if (!userId) return;

      const res = await api.get(`/wishlist/${userId}`);

      setWishlist(res.data.products || []);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    }
  }




  async function addToWishlist(product: Product) {

    try {

      if (!user?.id && !user?._id) return;

      await api.post("/wishlist", {
        productId: product._id,
      });


      await fetchWishlist();


    } catch (error) {

      console.error(
        "Add wishlist error:",
        error
      );

    }

  }





  async function removeFromWishlist(id: string) {

    try {

      if (!user?.id && !user?._id) return;

      await api.delete(`/wishlist/${id}`);


      await fetchWishlist();


    } catch (error) {

      console.error(
        "Remove wishlist error:",
        error
      );

    }

  }





  async function toggleWishlist(product: Product) {

    const exists = wishlist.some(
      item => item._id === product._id
    );


    if (exists) {

      await removeFromWishlist(
        product._id || ""
      );

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
        toggleWishlist
      }}

    >

      {children}

    </WishlistContext.Provider>

  );

}