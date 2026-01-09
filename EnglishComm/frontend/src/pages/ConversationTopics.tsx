import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Topic {
  id: number;
  title: string;
  description: string;
  youtube_url: string;
}

/**
 * MAP ICON + COLOR THEO ID
 * (giữ giao diện đẹp như bản hard-code)
 */
const uiMap = [
  {
    icon: "User",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "Utensils",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: "MapPin",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: "ShoppingBag",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "Hotel",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: "Plane",
    color: "from-teal-500 to-blue-500",
  },
];

export default function ConversationTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/conversation/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Luyện giao tiếp thực tế
            </h1>
            <p className="text-xl text-gray-600">
              Chọn tình huống → Học hội thoại
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-600">
              Đang tải chủ đề giao tiếp...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topics.map((topic, index) => {
                const ui = uiMap[index % uiMap.length];

                return (
                  <Link
                    key={topic.id}
                    to={`/conversation/${topic.id}`}
                    className="group relative block"
                  >
                    <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${ui.color} opacity-90`}
                      />
                      {/* Content */}
                      <div className="relative p-8 text-white">
                        <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">
                          {topic.title}
                        </h3>
                        <p className="text-white/90 mb-4 line-clamp-2">
                          {topic.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                            Hội thoại
                          </span>
                          <span className="text-lg group-hover:translate-x-2 transition-transform">
                            →
                          </span>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
