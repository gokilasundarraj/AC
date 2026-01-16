import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import MainHome from "./pages/main/MainHome";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import ProductList from "./pages/user/ProductList";
import ServiceList from "./pages/user/ServiceList";
import ServiceCart from "./pages/user/ServiceCart";
import ServiceOrder from "./pages/user/ServiceOrder";
import ServiceHistory from "./pages/user/ServiceHistory";
import ProductHistory from "./pages/user/ProductHistory";
import ServiceManagement from "./pages/admin/ServiceManagement";
import ServiceTechnicianWorkStatus from "./pages/service/ServiceTechnicianWorkStatus";
import ServicePending from "./pages/service/ServicePending";
import ServiceCompleted from "./pages/service/ServiceCompleted";
import ProductPending from "./pages/product/productPending";
import ProductCompleted from "./pages/product/productCompleted";
import UserHome from "./pages/user/UserHome";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import ProductManagement from "./pages/admin/ProductManagement";
import ProductDetails from "./pages/user/ProductDetails";
import ServiceDetails from "./pages/user/ServiceDetails";
import ProductCart from "./pages/user/ProductCart";
import ProductOrder from "./pages/user/ProductOrder";
import AdminHistoryProducts from "./pages/admin/ProductHistory";
import AdminHistoryServices from "./pages/admin/ServiceHistory";
import ServiceTechnicianHome from "./pages/service/ServiceTechnicianHome";
import ProductDeliverymanHome from "./pages/product/ProductDeliverymanHome";
import ServiceTechnicianLogin from "./pages/service/ServiceTechnicianLogin";
import ProductDeliverymanLogin from "./pages/product/ProductDeliverymanLogin";
import UserDetails from "./pages/admin/UserDetails";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>

      <Routes>
       
        <Route path="/" element={<MainHome />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/service-cart" element={<ServiceCart />} />
        <Route path="/service-order" element={<ServiceOrder />} />
        <Route path="/service-history" element={<ServiceHistory />} />
        <Route path="/product-history" element={<ProductHistory />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/service-management" element={<ServiceManagement />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/service-work-status" element={<ServiceTechnicianWorkStatus />} />
        <Route path="/service-pending" element={<ServicePending />} />
        <Route path="/service-completed" element={<ServiceCompleted />} />
        <Route path="/product-pending" element={<ProductPending />} />
        <Route path="/product-completed" element={<ProductCompleted />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/cart" element={<ProductCart />} />
        <Route path="/order" element={<ProductOrder />} />
        <Route path="/admin/product-history" element={<AdminHistoryProducts />} />
        <Route path="/admin/service-history" element={<AdminHistoryServices />} />
        <Route path="/service-technician/home" element={<ServiceTechnicianHome />} />
        <Route path="/product-delivery/home" element={<ProductDeliverymanHome />} />
        <Route path="/service-technician/login" element={<ServiceTechnicianLogin />} />
        <Route path="/product-delivery/login" element={<ProductDeliverymanLogin />} />
        <Route path="/admin/user/:name" element={<UserDetails/>}/>

      </Routes>
    
    </Router>
  );
}

export default App;
