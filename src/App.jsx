import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Layout from "./Layouts/Layout";
import LattestCollection from "./Components/LattestCollection";
import ProductDetail from "./Components/ProductDeltail"; 
import Cart from "./Pages/Cart"
import Wishlist from "./Pages/Wishlist";
import Register from "./Pages/register";
import Login from "./Pages/login";
import ForgotPassword from "./Pages/Forgetpassword";
import OtpVerification from "./Pages/optVerification";
import ResetPassword from "./Pages/Resetpassword";
import DashboardLayout from "./Pages/Dashboard/dashboard";
import Account from "./Pages/Dashboard/Account";
import AddressBook from "./Pages/Dashboard/Addressbook";
import Orders from "./Pages/Dashboard/Oders";
import HelpSupport from "./Pages/Dashboard/HelpandSuppot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/lattest-collection" element={<Layout><LattestCollection /></Layout>} />
      <Route path="/product/:slug" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/cart" element={ <Layout><Cart /></Layout>} />
        <Route path="/wishlist" element={ <Layout><Wishlist /></Layout>} />
        <Route path="/register" element={ <Layout><Register /></Layout>} />
        <Route path="/login" element={ <Layout><Login /></Layout>} />
         <Route path="/forgot-password" element={ <Layout><ForgotPassword/></Layout>} />
         <Route path="/otp-verification" element={ <Layout><OtpVerification/></Layout>} />
          <Route path="/reset-password" element={ <Layout><ResetPassword/></Layout>} />
                  <Route path="/login" element={<Login />} />
        
        <Route path="/profile" element={<Layout><DashboardLayout /></Layout>}>
          <Route path="account" element={<Account />} />
          <Route path="password" element={<ForgotPassword />} />
          <Route path="address-book" element={<AddressBook/>} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="help-support" element={<HelpSupport />} />
         
        </Route>f

    </Routes>
  );
}

export default App;
