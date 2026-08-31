import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pedido from "./pages/Pedido";
import Factura from "./pages/Factura";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pedido />} />
        <Route path="/factura" element={<Factura />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 