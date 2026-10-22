import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EntradaForm from "./pages/EntradaForm.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
    <div className="container mx-auto px-10">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/entradas/new" element={<EntradaForm />} />
        <Route path="/tareas/:id" element={<EntradaForm />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
