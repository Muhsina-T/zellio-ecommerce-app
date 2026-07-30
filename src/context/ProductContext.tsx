import { createContext, useEffect, useState, type ReactNode } from "react";

import type { Product } from "../types/Product";

import { mobiles } from "../data/mobiles";

type ProductContextType = {
  products: Product[];

  addProduct: (product: Product) => void;

  updateProduct: (product: Product) => void;

  deleteProduct: (id: number) => void;

  

  decreaseStock: (
    productId: number,
    quantity: number
  ) => void;
};



export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export default function ProductProvider({ children }: Props) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("zellio_products");

    return saved ? JSON.parse(saved) : mobiles;
  });

  useEffect(() => {
    localStorage.setItem("zellio_products", JSON.stringify(products));
  }, [products]);

  function addProduct(product: Product) {
  setProducts((prev) => [...prev, product]);
}

function updateProduct(product: Product) {
  setProducts((prev) =>
    prev.map((item) => (item.id === product.id ? product : item))
  );
}

function deleteProduct(id: number) {
  setProducts((prev) => prev.filter((item) => item.id !== id));
}

function decreaseStock(productId: number, quantity: number) {
  setProducts((prev) =>
    prev.map((product) =>
      product.id === productId
        ? {
            ...product,
            stock: Math.max(0, product.stock - quantity),
          }
        : product
    )
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
}}
    >
      {children}
    </ProductContext.Provider>
  );
}
