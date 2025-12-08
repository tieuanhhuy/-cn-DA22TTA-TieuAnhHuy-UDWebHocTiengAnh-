// frontend/src/pages/ConversationTopics.tsx
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  wordsCount: number;
}

const topics: Topic[] = [
  {
    id: "1",
    title: "Giới thiệu bản thân",
    description: "Học cách chào hỏi, giới thiệu tên, tuổi, nghề nghiệp",
    icon: "User",
    color: "from-blue-500 to-cyan-500",
    wordsCount: 12
  },
  {
    id: "2",
    title: "Đặt bàn nhà hàng",
    description: "Đặt món, gọi phục vụ, thanh toán hóa đơn",
    icon: "Utensils",
    color: "from-orange-500 to-red-500",
    wordsCount: 15
  },
  {
    id: "3",
    title: "Hỏi đường",
    description: "Hỏi địa chỉ, chỉ đường, đi taxi, tàu",
    icon: "MapPin",
    color: "from-green-500 to-emerald-500",
    wordsCount: 10
  },
  {
    id: "4",
    title: "Mua sắm",
    description: "Hỏi giá, mặc thử đồ, thanh toán, đổi trả",
    icon: "ShoppingBag",
    color: "from-purple-500 to-pink-500",
    wordsCount: 18
  },
  {
    id: "5",
    title: "Đặt phòng khách sạn",
    description: "Check-in, yêu cầu phòng, gọi dịch vụ",
    icon: "Hotel",
    color: "from-indigo-500 to-purple-500",
    wordsCount: 14
  },
  {
    id: "6",
    title: "Tại sân bay",
    description: "Check-in hành lý, qua an ninh, lên máy bay",
    icon: "Plane",
    color: "from-teal-500 to-blue-500",
    wordsCount: 16
  }
];

export default function ConversationTopics() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Luyện Giao Tiếp Thực Tế
            </h1>
            <p className="text-xl text-gray-600">
              Chọn tình huống → Học hội thoại 
            </p>
          </div>

          {/* Topic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                to={`/conversation/${topic.id}`}
                className="group relative block"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-90`} />
                  
                  {/* Icon */}
                  <div className="absolute top-6 right-6 text-white/20 text-6xl">
                    {topic.icon === "User" && "Person"}
                    {topic.icon === "Utensils" && "Utensils"}
                    {topic.icon === "MapPin" && "Map Pin"}
                    {topic.icon === "ShoppingBag" && "Shopping Bag"}
                    {topic.icon === "Hotel" && "Hotel"}
                    {topic.icon === "Plane" && "Plane"}
                  </div>

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
                        {topic.wordsCount} cụm từ
                      </span>
                      <span className="text-lg group-hover:translate-x-2 transition-transform">
                        Right Arrow
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
            >
              Left Arrow Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}