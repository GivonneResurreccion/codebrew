import './App.css';
import LandingPage from "./pages/landing";
import Pos from "./pages/pos"; 
import Dashboard from "./pages/salesinventory"; 
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pos" element={<Pos />} /> 
      <Route path="/salesinventory" element={<Dashboard />} /> 
    </Routes>
  );
}

export default App;