// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      {/* Nếu muốn trang 404 */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}