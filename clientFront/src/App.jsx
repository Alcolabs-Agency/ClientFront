import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createProduct" element={<CreateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
