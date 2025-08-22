import './App.css';
import LandingPage from "./pages/landing";
import Pos from "./pages/pos"; // Make sure the path to your POS component is correct
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pos" element={<Pos />} /> 
    </Routes>
  );
}

export default App;