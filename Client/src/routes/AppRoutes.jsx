import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Reservation from "../pages/Reservation";
import About from "../pages/About";

import Success from "../pages/Success";
import Failed from "../pages/Failed";

import Dashboard from "../pages/Admin/Dashboard";
import Orders from "../pages/Admin/Orders";
import Analytics from "../pages/Admin/Analytics";
import AdminReservation from "../pages/Admin/Reservation";
import KitchenDashboard from "../pages/Admin/KitchenDashboard";
import RiderDashboard from "../pages/Admin/RiderDashboard";

import Products from "../pages/Admin/Products";

import Login from "../pages/Admin/Login";
import Register from "../pages/Admin/Register";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reserve" element={<Reservation />} />
          <Route path="/about" element={<About />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="reservation" element={<AdminReservation />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="orders" element={<Orders />} />
          <Route path="kitchen" element={<KitchenDashboard />} />
          <Route path="rider" element={<RiderDashboard />} />
        </Route>

        {/* AUTH */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}