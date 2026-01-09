import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/vocabulary"
            className="p-6 bg-white rounded-xl shadow hover:scale-105 transition"
          >
            📚 Quản lý chủ đề từ vựng
          </Link>

          <Link
            to="/admin/conversation"
            className="p-6 bg-white rounded-xl shadow hover:scale-105 transition"
          >
            💬 Quản lý chủ đề giao tiếp
          </Link>
        </div>
      </div>
    </>
  );
}
