// frontend/src/pages/VocabularyTopics.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Topic {
  id: number;
  title: string;
  icon?: string | null;
  total_words?: number;
}


export default function VocabularyTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/vocabulary/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
          <p className="text-2xl text-purple-700">Đang tải chủ đề ...</p>
        </div>
      </>
    );
  }

  if (topics.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
          <p className="text-xl text-gray-600">Chưa có chủ đề nào!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-purple-700 mb-4">
            Chọn chủ đề học từ vựng
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Nhấn vào chủ đề bạn muốn học
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topics.map((t) => (
              <Link
                key={t.id}
                to={`/vocabulary/${t.id}`}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative w-full pt-[100%] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4 group-hover:shadow-pink-500/60">
                  <img
                    src={
                      t.icon
                        ? `http://localhost:5000/images/topics/${t.icon}`
                        : "/default-topic.png"
                    }
                    alt={t.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-left">
                  <p className="text-white text-2xl font-bold drop-shadow-lg">
                    {t.title}
                  </p>
                  <p className="text-white/90 text-sm mt-1">
                    {t.total_words} từ
                  </p>
                  <p className="text-white/80 text-xs mt-1">Nhấn để học</p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="mt-16 inline-block text-purple-600 hover:underline font-medium text-lg"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}