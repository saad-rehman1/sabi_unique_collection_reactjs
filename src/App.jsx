import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Layout from "./Layouts/Layout";
import LattestCollection from "./Components/LattestCollection";
import ProductDetail from "./Components/ProductDeltail"; 
import Cart from "./Pages/Cart"
import Wishlist from "./Pages/Wishlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/lattest-collection" element={<Layout><LattestCollection /></Layout>} />
      <Route path="/product/:slug" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/cart" element={ <Layout><Cart /></Layout>} />
        <Route path="/wishlist" element={ <Layout><Wishlist /></Layout>} />

    </Routes>
  );
}

export default App;
