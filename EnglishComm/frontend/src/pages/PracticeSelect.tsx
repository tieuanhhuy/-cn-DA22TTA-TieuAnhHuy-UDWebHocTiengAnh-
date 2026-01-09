import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PracticeSelect() {
  return (
    <>
      <Navbar />
      {/* 1. Nền Gradient thống nhất với trang chủ */}
      <div className="min-h-screen bg-gradient-to-br from-[#b2d1ef] to-[#f0eaf6] pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* 2. Header Section - Tiêu đề lớn và mô tả */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 pb-2 leading-tight">
            Khu vực luyện tập
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mt-6 font-medium leading-relaxed">
              Chọn kỹ năng bạn muốn thử thách hôm nay. Thực hành thường xuyên là chìa khóa để thành thạo!
            </p>
          </div>

          {/* 3. Grid Cards - Các thẻ chọn bài tập */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 or md:gap-12">
            
            {/* --- Card 1: Từ vựng (Tone Tím/Hồng) --- */}
            <Link
              to="/practice/vocabulary"
              className="group relative block h-full"
            >
              {/* Lớp nền Glassmorphism */}
              <div className="h-full bg-white/40 backdrop-blur-2xl rounded-[40px] p-10 border border-white/60 shadow-2xl shadow-purple-500/10 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:shadow-purple-500/30 overflow-hidden relative">
                
                {/* Hiệu ứng ánh sáng nền khi hover */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Wrapper */}
                  <div className="w-24 h-24 mb-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/40 text-white transform group-hover:rotate-6 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>

                  <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                    Từ vựng
                  </h2>
                  <p className="text-xl text-gray-700 mb-8 flex-grow">
                    Mở rộng vốn từ và kiểm tra trí nhớ của bạn qua các chủ đề đa dạng.
                  </p>

                  {/* Nút giả & Mũi tên */}
                  <div className="flex items-center text-purple-600 font-bold text-xl">
                    Bắt đầu ngay
                    <span className="ml-3 text-3xl transform transition-all duration-300 group-hover:translate-x-3">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* --- Card 2: Giao tiếp (Tone Xanh/Cyan - để tạo điểm nhấn nhưng vẫn hài hòa) --- */}
            <Link
              to="/practice/conversation"
              className="group relative block h-full"
            >
              {/* Lớp nền Glassmorphism */}
              <div className="h-full bg-white/40 backdrop-blur-2xl rounded-[40px] p-10 border border-white/60 shadow-2xl shadow-blue-500/10 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:shadow-blue-500/30 overflow-hidden relative">
                
                {/* Hiệu ứng ánh sáng nền khi hover */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Wrapper */}
                  <div className="w-24 h-24 mb-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/40 text-white transform group-hover:-rotate-6 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>

                  <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                    Giao tiếp
                  </h2>
                  <p className="text-xl text-gray-700 mb-8 flex-grow">
                    Luyện tập các mẫu câu giao tiếp thực tế.
                  </p>

                  {/* Nút giả & Mũi tên */}
                  <div className="flex items-center text-blue-600 font-bold text-xl">
                    Bắt đầu ngay
                    <span className="ml-3 text-3xl transform transition-all duration-300 group-hover:translate-x-3">→</span>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}