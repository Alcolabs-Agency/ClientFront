import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./page/Home";
import CreateProduct from "./page/CreateProduct";
import Inventario from "./page/Inventario";
import EditVariant from "./page/EditVariant";
import EditVariableTabs from "./page/EditVariableTabs";
import PaymentOptions from "./page/PaymentOptions";
import NavBar from "./components/NavBar";


function App() {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (product) => {
    const existingItem = bagItems.find((item) => item.id === product.id);
    if (existingItem) {
      setBagItems(
        bagItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setBagItems([...bagItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setBagItems(bagItems.filter((item) => item.id !== id));
    } else {
      setBagItems(
        bagItems.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  // Función para vaciar el carrito
  const clearBag = () => {
    setBagItems([]);
};
  return (
    <Router>
      {/*
      <NavBar />
     */}

      <Routes>
      <Route
          path="/"
          element={<Home bagItems={bagItems} addToBag={addToBag} updateQuantity={updateQuantity} />}
        />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/editVariant" element={<EditVariant />} />
        <Route path="/EditVariableTabs" element={<EditVariableTabs />} />
        <Route path="/PaymentOptions" element={<PaymentOptions />} />
      </Routes>
    </Router>
  );
}

export default App;
