import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface HistoryItem {
  id: number;
  type: 'vocabulary' | 'conversation';
  topic_id: number;
  topic_title: string;
  score: number;
  total_questions: number;
  correct_count: number;
  created_at: string;
}

export default function Progress() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy lịch sử
  useEffect(() => {
    fetch("http://localhost:5000/api/practice/progress", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải lịch sử:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      {/* Nền gradient đồng bộ với toàn app */}
      <div className="min-h-screen bg-gradient-to-br from-[#b2d1ef] to-[#f0eaf6] pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 drop-shadow-sm">
              Lịch sử luyện tập
            </h1>
            <p className="text-gray-600 text-lg">
              Theo dõi sự tiến bộ của bạn qua từng bài kiểm tra.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p className="text-purple-600 font-medium animate-pulse">Đang tải dữ liệu...</p>
            </div>
          ) : history.length === 0 ? (
            /* Empty State */
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 text-center shadow-xl border border-white/50">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Chưa có bài kiểm tra nào</h3>
              <p className="text-gray-500 mb-8">Bạn hãy làm bài kiểm tra đầu tiên để ghi lại thành tích nhé!</p>
              <Link
                to="/practice"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition transform"
              >
                Bắt đầu luyện tập ngay
              </Link>
            </div>
          ) : (
            /* Table Data */
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-gray-700 uppercase text-xs font-bold tracking-wider">
                      <th className="p-5 border-b border-purple-100">Thời gian</th>
                      <th className="p-5 border-b border-purple-100">Loại bài</th>
                      <th className="p-5 border-b border-purple-100">Chủ đề</th>
                      <th className="p-5 border-b border-purple-100 text-center">Điểm số</th>
                      <th className="p-5 border-b border-purple-100 text-center">Kết quả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {history.map((item, index) => (
                      <tr 
                        key={item.id || index} 
                        className="hover:bg-purple-50/50 transition duration-200 group"
                      >
                        {/* Cột Thời gian */}
                        <td className="p-5 text-gray-600 text-sm whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString('vi-VN')}
                          <br />
                          <span className="text-xs text-gray-400">
                            {new Date(item.created_at).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </td>

                        {/* Cột Loại bài */}
                        <td className="p-5">
                          <span 
                            className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm inline-flex items-center gap-1
                              ${item.type === 'vocabulary' 
                                ? 'bg-purple-100 text-purple-700 border-purple-200' 
                                : 'bg-blue-100 text-blue-700 border-blue-200'
                              }`}
                          >
                            {item.type === 'vocabulary' ? '📖 Từ vựng' : '💬 Giao tiếp'}
                          </span>
                        </td>

                        {/* Cột Chủ đề */}
                        <td className="p-5">
                          <p className="font-bold text-gray-800 group-hover:text-purple-700 transition">
                            {item.topic_title || `Chủ đề #${item.topic_id}`}
                          </p>
                        </td>

                        {/* Cột Điểm số */}
                        <td className="p-5 text-center">
                          <div className={`inline-block px-3 py-1 rounded-lg font-black text-lg border-2
                            ${item.score >= 8 
                              ? 'border-green-200 bg-green-50 text-green-600' 
                              : item.score >= 5 
                                ? 'border-yellow-200 bg-yellow-50 text-yellow-600' 
                                : 'border-red-200 bg-red-50 text-red-500'
                            }`}
                          >
                            {item.score}
                          </div>
                        </td>

                        {/* Cột Kết quả chi tiết */}
                        <td className="p-5 text-center">
                          <p className="text-sm font-medium text-gray-600">
                            <span className="text-green-600 font-bold">{item.correct_count}</span>
                            <span className="text-gray-400 mx-1">/</span>
                            <span>{item.total_questions}</span>
                            <span className="text-xs text-gray-400 ml-1">đúng</span>
                          </p>
                          {/* Progress bar nhỏ */}
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full mx-auto mt-2 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                              style={{ width: `${(item.correct_count / item.total_questions) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Nút quay lại */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-500 hover:text-purple-600 font-medium transition hover:underline">
              ← Quay lại trang chủ
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}