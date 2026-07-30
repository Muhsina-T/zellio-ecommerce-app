import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";


import App from "./App";

import "./index.css";

import AuthProvider from "./context/AuthContext";

import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";

import OrderProvider from "./context/OrderContext";

import ProductProvider from "./context/ProductContext";

import ReturnProvider from "./context/ReturnContext";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <ProductProvider>
                <ReturnProvider>
                <App />

               <Toaster
  position="top-right"
  toastOptions={{
    duration: 2000,
    style: {
      background: "#FFFFFF",
      color: "#13160F",
      border: "1px solid #E5E5DD",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      fontWeight: 500,
    },

    success: {
      iconTheme: {
        primary: "#5C8A05",
        secondary: "#FFFFFF",
      },
    },

    error: {
      iconTheme: {
        primary: "#dc2626",
        secondary: "#FFFFFF",
      },
    },
  }}
/>
                </ReturnProvider>
              </ProductProvider>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
