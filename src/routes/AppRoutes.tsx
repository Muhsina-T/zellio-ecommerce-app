import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Home from "../pages/Home";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import Product from "../pages/Product";

import Cart from "../pages/Cart";

import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";

import Orders from "../pages/Orders";

import Dashboard from "../pages/admin/Dashboard";

import Products from "../pages/admin/Products";

import AdminOrders from "../pages/admin/Orders";

import Returns from "../pages/Returns";

import Wishlist from "../pages/Wishlist";

import AdminReturns from "../pages/admin/Returns";

import Analytics from "../pages/admin/Analytics";

import PrivacyPolicy from "../pages/PrivacyPolicy";

import Profile from "../pages/Profile";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route 
  path="/profile" 
  element={<Profile />} 
/>

      {/* User Protected */}
      
        <Route
          path="/"
          element={
              <Home />
          }
        />
      

      <Route element={<Layout />}>
        <Route
          path="/product/:id"
          element={
              <Product />
          }
        />
      </Route>
      <Route element={<Layout />}>
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route element={<Layout />}>
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route element={<Layout />}>
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <Products />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        }
      />
    <Route element={<Layout />}>
      <Route
        path="/returns"
        element={
          <ProtectedRoute>
            <Returns />
          </ProtectedRoute>
        }
      />
      </Route>

      <Route
        path="/admin/returns"
        element={
          <AdminRoute>
            <AdminReturns />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        }
      />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
