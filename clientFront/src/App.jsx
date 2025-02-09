import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import CreateProduct from "./page/CreateProduct";
import Inventario from "./page/Inventario";
import EditVariant from "./page/EditVariant";
import EditVariableTabs from "./page/EditVariableTabs";
import PaymentOptions from "./page/PaymentOptions";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      {/*
      <NavBar />
     */}

      <Routes>
        <Route path="/" element={<Home />} />
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
