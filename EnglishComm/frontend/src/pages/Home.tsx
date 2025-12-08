// src/pages/Home.tsx
import Navbar from "../components/Navbar";

export default function Home() {
  const topics = [
    { title: "Du lịch\nTraveling", img: "traveling.png" },
    { title: "Dịch vụ\nServices", img: "services.png" },
    { title: "Tiệc\nParty", img: "party.png" },
    { title: "Ẩm thực\nFood", img: "food.png" }, 
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#b2d1ef] to-[#f0eaf6] pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* HERO SECTION – MÀU MỚI A6C0FE → F68084 */}
          <div className="bg-gradient-to-br from-[#A6C0FE]/80 to-[#F68084]/80 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white/30">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
              Hello, Chào mừng bạn đến với EnglishComm
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-10 font-medium drop-shadow-lg">
              Nâng cao kỹ năng giao tiếp tiếng Anh của mình ngay hôm nay!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <p className="text-lg text-white bg-white/30 px-8 py-4 rounded-full backdrop-blur-md shadow-lg">
                Bắt đầu hành trình học tập của bạn
              </p>
              <a
                href="/auth"
                className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105"
              >
                START
              </a>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Bạn muốn học gì nhỉ?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topics.map((topic, i) => (
              <div
                key={i}
                className="relative group cursor-pointer"
              >
                {/* ÉP CỨNG VUÔNG 1:1 + BO GÓC CHUẨN FIGMA */}
                <div className="relative w-full pt-[100%] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                  <img
                    src={`/topics/${topic.img}`}
                    alt={topic.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  {/* Chữ trắng */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 pb-7">
                    <p className="text-xl md:text-2xl font-bold text-white whitespace-pre-line leading-tight drop-shadow-lg">
                      {topic.title}
                    </p>
                  </div>
                  {/* Hiệu ứng sáng khi hover */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities Section  */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Hoạt động</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Từ vựng\nVocabulary", "Luyện tập\nPractice", "Tiến độ\nProgress"].map((text, i) => (
              <div key={i} className="relative w-full pt-[60%] rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <p className="text-cyan-400 text-2xl font-bold whitespace-pre-line text-center px-6">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Button */}
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition z-50">
          <span className="text-3xl">→</span>
        </button>
      </div>
    </>
  );
}