import { createContext, useEffect, useState, type ReactNode } from "react";

import type { Product } from "../types/Product";

import { mobiles } from "../data/mobiles";

import api from "../api/api";

type ProductContextType = {
  products: Product[];

  addProduct: (product: Product) => Promise<void>;

  updateProduct: (product: Product) => Promise<void>;

  deleteProduct: (id: string) => Promise<void>;

  decreaseStock: (productId: string, quantity: number) => void;

  searchProducts: (search: string) => Promise<void>;
};

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export default function ProductProvider({ children }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/products");

      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);

      setProducts(mobiles);
    }
  }

  async function searchProducts(search: string) {
    try {
      const res = await api.get("/products", {
        params: {
          search,
        },
      });

      setProducts(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }

  async function addProduct(product: Product) {
    try {
      const res = await api.post("/products", product);
      setProducts((prev) => [...prev, res.data]);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateProduct(product: Product) {
    try {
      const res = await api.put(`/products/${product._id}`, product);

      setProducts((prev) =>
        prev.map((item) => (item._id === res.data._id ? res.data : item)),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id: string) {
    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  function decreaseStock(productId: string, quantity: number) {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === productId
          ? {
              ...product,
              stock: Math.max(0, product.stock - quantity),
            }
          : product,
      ),
    );
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        decreaseStock,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
