
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import CreateProduct from "./page/CreateProduct";
import Inventario from "./page/Inventario";
import EditVariant from "./page/EditVariant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/editVariant" element={<EditVariant />} />
      </Routes>
    </Router>
  );
}

export default App;
