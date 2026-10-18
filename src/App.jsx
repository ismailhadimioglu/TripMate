import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import TripDetail from "./Pages/TripDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trip/:id" element={<TripDetail />} />
    </Routes>
  );
}

export default App;