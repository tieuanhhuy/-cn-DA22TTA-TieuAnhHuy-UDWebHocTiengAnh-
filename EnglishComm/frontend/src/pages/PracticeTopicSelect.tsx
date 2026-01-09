import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";


interface Topic {
  id: number;
  title: string;
  description?: string;
  image?: string;
}

export default function PracticeTopicSelect() {
  const { type } = useParams(); 
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  const isVocab = type === "vocabulary";
  const pageTitle = isVocab ? "Luyện tập Từ vựng" : "Luyện tập Hội thoại";

  useEffect(() => {
    setLoading(true);
    fetch(
      isVocab
        ? "http://localhost:5000/api/vocabulary/topics"
        : "http://localhost:5000/api/conversation/topics"
    )
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải chủ đề:", err);
        setLoading(false);
      });
  }, [type, isVocab]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-sans text-gray-800 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-purple-700 mb-4 drop-shadow-sm">
              {pageTitle}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Chọn chủ đề và bài kiểm tra để bắt đầu hành trình chinh phục ngôn ngữ ngay hôm nay.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-2xl text-purple-700 animate-pulse">
                Đang tải chủ đề ...
              </p>
            </div>
          ) : (
            /* Topics Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topics.map((t) => (
                <div
                  key={t.id}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 border border-purple-100 overflow-hidden hover:-translate-y-2 relative"
                >
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="p-8 relative z-10">
                    {/* Title & Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors line-clamp-2">
                          {t.title}
                        </h3>
                        {t.description && (
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{t.description}</p>
                        )}
                      </div>
                      
                      {/* Icon Tím */}
                      <div className="p-3 rounded-2xl bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>

                    <div className="w-full h-px bg-purple-100 mb-6" />

                    <p className="text-sm text-gray-500 mb-4 font-medium">
                      Chọn bài tập:
                    </p>

                    {/* Test Buttons Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((n) => (
                        <Link
                          key={n}
                          to={`/practice/${type}/${t.id}`} 
                          className="flex flex-col items-center justify-center py-3 px-2 rounded-2xl border border-purple-100 bg-purple-50 text-purple-700 
                                     transition-all duration-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-lg hover:scale-105"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">
                            Bài
                          </span>
                          <span className="text-xl font-black">{n}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && topics.length === 0 && (
            <div className="text-center py-20 bg-white/50 rounded-3xl backdrop-blur-sm">
              <p className="text-gray-500 text-xl">
                Chưa có chủ đề nào trong danh mục này.
              </p>
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-medium text-lg hover:underline transition-all"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}