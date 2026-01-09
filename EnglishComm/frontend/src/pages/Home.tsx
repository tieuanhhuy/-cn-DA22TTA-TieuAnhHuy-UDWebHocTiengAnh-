// src/pages/Home.tsx
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const topics = [
    { title: "Du lịch\nTraveling", img: "traveling.png" },
    { title: "Dịch vụ\nServices", img: "services.png" },
    { title: "Tiệc\nParty", img: "party.png" },
    { title: "Ẩm thực\nFood", img: "food.png" },
  ];

  const activities = [
    { 
      title: "Từ vựng\nVocabulary", 
      link: "/vocabulary-topics", 
      icon: "📚",
      gradient: "from-cyan-400 to-blue-500",
      shadow: "shadow-cyan-500/40",
      desc: "Mở rộng vốn từ"
    },
    { 
      title: "Luyện tập\nPractice", 
      link: "/practice", 
      icon: "🎯",
      gradient: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/40",
      desc: "Kiểm tra kiến thức"
    },
    { 
      title: "Tiến độ\nProgress", 
      link: "/progress", 
      icon: "📊",
      gradient: "from-orange-400 to-red-500",
      shadow: "shadow-orange-500/40",
      desc: "Theo dõi kết quả"
    },
  ];

  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={
            user?.avatar
              ? `http://localhost:5000/images/${user.avatar}`
              : "http://localhost:5000/images/default-user.png"
          }
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "http://localhost:5000/images/default-user.png";
          }}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
        />
      );
    }
    return (
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow-lg border-2 border-white">
        {user?.username?.charAt(0)?.toUpperCase() || "U"}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#b2d1ef] to-[#f0eaf6] pt-20 flex flex-col justify-between">
        
        <div>
            
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="bg-gradient-to-br from-[#A6C0FE]/80 to-[#F68084]/80 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white/30 relative overflow-hidden">
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">

                  {user?.username && (
                    <div className="flex items-center gap-4 mb-6">
                      {renderAvatar()}
                      <p className="text-xl text-white font-semibold drop-shadow-lg">
                        Xin chào, {user.username} 👋
                      </p>
                    </div>
                  )}

                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
                    Chào mừng bạn đến với <br/> EnglishComm
                  </h1>
                  <p className="text-xl md:text-2xl text-white/95 mb-10 font-medium drop-shadow-lg max-w-2xl">
                    Nền tảng học tiếng Anh giao tiếp hiện đại, giúp bạn tự tin kết nối với thế giới!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <p className="text-lg text-white bg-white/20 px-8 py-4 rounded-full backdrop-blur-md shadow-lg border border-white/20">
                      Bắt đầu hành trình ngay
                    </p>
                    <a
                      href="/vocabulary-topics"
                      className="bg-black text-white px-10 py-5 rounded-full font-extrabold text-lg hover:bg-gray-200 hover:text-black transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105 active:scale-95"
                    >
                      START NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= TOPICS SECTION ================= */}
            <div className="max-w-7xl mx-auto px-6 py-12">
              {/* ✨ TIÊU ĐỀ ĐƯỢC LÀM MỚI ✨ */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
                <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-md px-2 py-2 pr-8 rounded-full border border-white/40 shadow-lg">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-inner text-purple-600">
                    🌏
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md tracking-wide">
                      Chủ đề phổ biến
                    </h2>
                  </div>
                </div>

                <div className="hidden md:block h-1 flex-grow mx-8 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {topics.map((topic, i) => (
                  <Link
                    key={i}
                    to={`/vocabulary/${i + 1}`}
                    className="relative group block"
                  >
                    <div className="relative w-full pt-[100%] rounded-3xl overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-2xl border-4 border-white/20">
                      <img
                        src={`/topics/${topic.img}`}
                        alt={topic.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
                        <p className="text-xl md:text-2xl font-bold text-white whitespace-pre-line leading-tight drop-shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {topic.title}
                        </p>
                        <div className="h-1 w-12 bg-white rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ================= ACTIVITIES SECTION ================= */}
            <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
              

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
                <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-md px-2 py-2 pr-8 rounded-full border border-white/40 shadow-lg">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-inner text-purple-600">
                    ⚡
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md tracking-wide">
                      Hoạt động học tập
                    </h2>
                  </div>
                </div>

                <div className="hidden md:block h-1 flex-grow mx-8 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activities.map((act, idx) => (
                  <Link
                    key={idx}
                    to={act.link}
                    className={`
                      relative group overflow-hidden rounded-[2rem] p-8 h-64 flex flex-col justify-between
                      bg-gradient-to-br ${act.gradient}
                      shadow-lg ${act.shadow}
                      hover:shadow-2xl hover:scale-[1.03] transition-all duration-300
                      border border-white/10
                    `}
                  >

                    <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-black/10 rounded-full blur-xl"></div>


                    <div className="relative z-10 flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-sm text-4xl group-hover:scale-110 transition-transform">
                        {act.icon}
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                        Explore
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                      <p className="text-white/90 text-sm font-medium mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        {act.desc}
                      </p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-extrabold text-white whitespace-pre-line leading-tight drop-shadow-sm">
                          {act.title}
                        </h3>
                        <span className="text-3xl text-white transform group-hover:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
        </div>
        
        <Footer />
        
      </div>
    </>
  );
}