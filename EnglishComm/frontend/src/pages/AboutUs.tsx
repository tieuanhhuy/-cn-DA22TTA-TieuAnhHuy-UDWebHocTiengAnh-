// src/pages/AboutUs.tsx
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const features = [
    {
      icon: "📚",
      title: "Học từ vựng theo chủ đề",
      description: "Hệ thống từ vựng phong phú, được phân loại theo các chủ đề thực tế trong cuộc sống",
      link: "/vocabulary-topics"
    },
    {
      icon: "💬",
      title: "Luyện giao tiếp",
      description: "Các mẫu câu giao tiếp thông dụng kèm video hướng dẫn chi tiết từ người bản xứ",
      link: "/conversation-topics"
    },
    {
      icon: "🎯",
      title: "Luyện tập thực hành",
      description: "Bài tập đa dạng giúp củng cố kiến thức và theo dõi tiến độ học tập của bạn",
      link: "/practice"
    },
    {
      icon: "🎮",
      title: "Học qua flashcard",
      description: "Phương pháp flashcard 3D sinh động giúp ghi nhớ từ vựng hiệu quả và lâu dài",
      link: "/vocabulary-topics"
    },
    {
      icon: "📊",
      title: "Theo dõi tiến độ",
      description: "Hệ thống điểm số, level và streak giúp bạn duy trì động lực học tập mỗi ngày",
      link: "/progress"
    },
    {
      icon: "🌟",
      title: "Miễn phí 100%",
      description: "Tất cả tài liệu và bài học đều hoàn toàn miễn phí, không giới hạn truy cập",
      link: null
    }
  ];

  const teamMembers = [
    {
      name: "Tiêu Anh Huy",
      role: "Founder & Developer",
      avatar: "https://ui-avatars.com/api/?name=Tieu+Anh+Huy&background=8b5cf6&color=fff&size=200",
      description: "Sinh viên năm cuối chuyên ngành Công nghệ thông tin"
    },
  ];

  const stats = [
    { number: "1000+", label: "Từ vựng" },
    { number: "20+", label: "Chủ đề" },
    { number: "100+", label: "Mẫu câu giao tiếp" },
    { number: "500+", label: "Người dùng" }
  ];

  return (
    <>
      <Navbar />
      
      {/* WRAPPER CHÍNH VỚI BACKGROUND PATTERN */}
      <div className="min-h-screen relative bg-gradient-to-br from-fuchsia-50 via-pink to-purple-200 overflow-hidden font-sans">
        
        {/* --- BACKGROUND DECORATION (Hiệu ứng nền loang màu) --- */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            {/* Blob tím bên trái */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
            {/* Blob hồng bên phải */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
            {/* Blob xanh ở giữa dưới */}
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
            
            {/* Dot Pattern (Chấm bi mờ) */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_2px)] [background-size:24px_24px] opacity-40"></div>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative z-10 pt-40 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-600 text-sm font-bold tracking-wide mb-6 border border-purple-200 shadow-sm">
               WELCOME TO ENGLISHCOMM
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Học Tiếng Anh <br className="hidden md:block"/>
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Kết Nối Tương Lai
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Nền tảng học giao tiếp trực tuyến miễn phí, giúp bạn phá bỏ rào cản ngôn ngữ và tự tin hội nhập.
            </p>
          </div>
        </section>

        {/* --- MISSION SECTION (Glassmorphism) --- */}
        <section className="relative z-10 py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-8 md:p-14 relative overflow-hidden">
              {/* Decorative quote icon */}
              <div className="absolute top-4 right-8 text-9xl text-purple-100 font-serif opacity-50 select-none">"</div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    🚀 Sứ mệnh của chúng tôi
                </h2>
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                    <p>
                        EnglishComm được xây dựng với mục tiêu <strong className="text-purple-600 bg-purple-50 px-2 py-1 rounded">bình dân hóa việc học tiếng Anh</strong>. Chúng tôi tin rằng ngôn ngữ là cầu nối, và ai cũng xứng đáng có cơ hội bước ra thế giới.
                    </p>
                    <p>
                        Với giao diện thân thiện, nội dung chất lượng và hoàn toàn miễn phí, EnglishComm mong muốn trở thành người bạn đồng hành đáng tin cậy trên hành trình chinh phục tri thức của bạn.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- STATS SECTION (Gradient Bar) --- */}
        <section className="relative z-10 py-30 mt-10">
          <div className="absolute inset-0 bg-slate-900 transform -skew-y-3 origin-bottom-right shadow-2xl z-0"></div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 font-medium tracking-wide uppercase text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="relative z-10 py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">Tính năng nổi bật</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const isClickable = !!feature.link;
                const Wrapper = isClickable ? Link : 'div';
                
                return (
                    // @ts-ignore
                  <Wrapper 
                    key={index}
                    to={feature.link || '#'}
                    className={`bg-white rounded-2xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 hover:border-purple-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group relative overflow-hidden ${!isClickable ? 'cursor-default' : ''}`}
                  >
                    {/* Hover Decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-purple-100"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-white group-hover:shadow-md transition-colors">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-slate-500 leading-relaxed mb-4">
                            {feature.description}
                        </p>
                        
                        {isClickable && (
                        <div className="flex items-center text-purple-600 font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Trải nghiệm ngay <span className="ml-2 text-lg">→</span>
                        </div>
                        )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- TECH SECTION (Dark Mode Contrast) --- */}
        <section className="relative z-10 py-20 bg-slate-900 text-white clip-path-slant">
             {/* Background Grid Pattern for Tech */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
             
             <div className="max-w-6xl mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Powering EnglishComm
                    <span className="block text-lg font-normal text-slate-400 mt-2">Công nghệ hiện đại cho trải nghiệm mượt mà</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: "⚛️", name: "React", desc: "Frontend" },
                        { icon: "🟢", name: "Node.js", desc: "Backend" },
                        { icon: "🐬", name: "MySQL", desc: "Database" },
                        { icon: "🎨", name: "Tailwind", desc: "UI Design" },
                    ].map((tech, idx) => (
                        <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-2xl text-center hover:bg-slate-800 transition-colors">
                            <div className="text-4xl mb-3">{tech.icon}</div>
                            <div className="font-bold text-lg">{tech.name}</div>
                            <div className="text-slate-400 text-sm">{tech.desc}</div>
                        </div>
                    ))}
                </div>
             </div>
        </section>

        {/* --- TEAM SECTION --- */}
        <section className="relative z-10 py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">Đội ngũ phát triển</h2>
            <div className="flex justify-center">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-xl max-w-sm text-center border border-slate-100 hover:border-purple-200 transition-all duration-500 hover:shadow-2xl group"
                >
                  <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-32 h-32 rounded-full relative z-10 border-4 border-white object-cover"
                      />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-4 uppercase text-xs tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-slate-500 leading-relaxed italic">
                    "{member.description}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="relative z-10 py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
             <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
                  Sẵn sàng chinh phục Tiếng Anh?
                </h2>
                <p className="text-lg md:text-xl mb-10 text-purple-100 relative z-10">
                  Tham gia cộng đồng hơn 500+ người dùng và bắt đầu hành trình của bạn ngay hôm nay.
                </p>
                <Link 
                  to="/vocabulary-topics"
                  className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-lg relative z-10"
                >
                  Bắt đầu học ngay 🚀
                </Link>
             </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="relative z-10 py-10 px-6 bg-slate-900 text-slate-400 text-center border-t border-slate-800">
            <div className="flex justify-center items-center gap-6 mb-8">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <a href="https://github.com/tieuanhhuy/-cn-DA22TTA-TieuAnhHuy-UDWebHocTiengAnh-.git" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    GitHub
                </a>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <span className="hover:text-white cursor-pointer"> SDT: 0794 755 447</span>
            </div>
            <p className="text-sm">
                © 2025 EnglishComm. Made by Tiêu Anh Huy ❤️
            </p>
            <p className="text-xs mt-2 text-slate-600">
                Đồ án chuyên ngành - Đại học Trà Vinh
            </p>
        </footer>

      </div>
    </>
  );
}