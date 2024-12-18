import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lookbook from "./components/Lookbook.jsx"; 
import ProductPage from "./components/ProductPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lookbook />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
