import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      
      {/* Thêm pt-24 để tránh bị Navbar che, thêm màu nền xám nhạt cho sang */}
      <div className="min-h-screen pt-24 px-4 pb-12 bg-gray-50 font-sans">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              🛠️ Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Quản lý nội dung hệ thống học tiếng Anh
            </p>
          </div>

          {/* Grid Menu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Từ vựng */}
            <Link
              to="/admin/vocabulary"
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                Quản lý Từ vựng
              </h2>
              <p className="text-gray-500">
                Thêm, sửa, xóa các chủ đề từ vựng (Flashcard) và danh sách từ chi tiết.
              </p>
            </Link>

            {/* Card 2: Giao tiếp */}
            <Link
              to="/admin/conversation"
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                💬
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                Quản lý Giao tiếp
              </h2>
              <p className="text-gray-500">
                Quản lý các bài học hội thoại, video Youtube và các mẫu câu giao tiếp.
              </p>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}