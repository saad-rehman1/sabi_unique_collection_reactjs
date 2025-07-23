import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Layout from "./Layouts/Layout";
import LattestCollection from "./Components/LattestCollection";
import ProductDetail from "./Components/ProductDeltail"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/lattest-collection" element={<Layout><LattestCollection /></Layout>} />
      <Route path="/product/:slug" element={<Layout><ProductDetail /></Layout>} />

    </Routes>
  );
}

export default App;
