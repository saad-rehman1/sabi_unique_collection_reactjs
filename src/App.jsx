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
    </Routes>
  );
}

export default App;
