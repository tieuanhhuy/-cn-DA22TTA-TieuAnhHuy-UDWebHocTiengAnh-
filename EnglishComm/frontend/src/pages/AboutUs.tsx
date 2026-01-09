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
      link: "/vocabulary-topics" // Dẫn về trang chủ đề từ vựng để bắt đầu
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
      link: null // Không có link
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
    { number: "50+", label: "Chủ đề" },
    { number: "100+", label: "Mẫu câu giao tiếp" },
    { number: "500+", label: "Người dùng" }
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
              About EnglishComm
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nền tảng học tiếng Anh giao tiếp trực tuyến, giúp bạn tự tin kết nối với thế giới
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Sứ mệnh của chúng tôi</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                EnglishComm được xây dựng với mục tiêu <strong className="text-purple-600">giúp người Việt học tiếng Anh giao tiếp một cách dễ dàng và hiệu quả</strong>. Chúng tôi tin rằng mỗi người đều có thể thành thạo tiếng Anh nếu có phương pháp học phù hợp.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Với giao diện thân thiện, nội dung chất lượng và hoàn toàn miễn phí, EnglishComm mong muốn trở thành người bạn đồng hành đáng tin cậy trên hành trình chinh phục tiếng Anh của bạn.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-pink-500">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg md:text-xl opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - ĐÃ CHỈNH SỬA */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
              Tính năng nổi bật
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                // Style chung cho cả thẻ Link và div
                const cardClass = "bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block h-full border border-transparent hover:border-purple-100";
                
                const content = (
                  <>
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    
                    {feature.link && (
                      <div className="mt-4 text-purple-600 font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Khám phá ngay <span>→</span>
                      </div>
                    )}
                  </>
                );

                return feature.link ? (
                  <Link 
                    key={index}
                    to={feature.link}
                    className={`${cardClass} cursor-pointer group`}
                  >
                    {content}
                  </Link>
                ) : (
                  <div 
                    key={index}
                    className={`${cardClass} cursor-default`}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Đội ngũ phát triển
            </h2>
            <p className="text-center text-gray-600 mb-16 text-lg">
              Những người đam mê công nghệ và giáo dục
            </p>
            <div className="flex justify-center">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 pt-20 rounded-3xl p-10 shadow-xl max-w-sm"
                >
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto mb-6 shadow-lg"
                  />
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-semibold text-center mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
              Công nghệ sử dụng
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-5xl mb-4">⚛️</div>
                <h3 className="text-xl font-bold text-gray-800">React</h3>
                <p className="text-gray-600 mt-2">Frontend Framework</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-5xl mb-4">🟢</div>
                <h3 className="text-xl font-bold text-gray-800">Node.js</h3>
                <p className="text-gray-600 mt-2">Backend Runtime</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-5xl mb-4">🐬</div>
                <h3 className="text-xl font-bold text-gray-800">MySQL</h3>
                <p className="text-gray-600 mt-2">Database</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-gray-800">Tailwind CSS</h3>
                <p className="text-gray-600 mt-2">Styling</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-500">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bắt đầu hành trình học tiếng Anh ngay hôm nay!
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Hoàn toàn miễn phí - Không cần thẻ tín dụng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/vocabulary-topics"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition"
              >
                Khám phá bài học
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Bạn có câu hỏi, góp ý hoặc phát hiện lỗi? Hãy cho chúng tôi biết!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <p className="font-medium text-gray-700">SDT: <span className="text-purple-600 font-bold">0794755447</span></p>
              <a 
                href="https://github.com/tieuanhhuy/-cn-DA22TTA-TieuAnhHuy-UDWebHocTiengAnh-.git"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-purple-600 hover:text-purple-700 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-lg font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-gray-900 text-white text-center">
          <p className="text-lg">
            © 2025 EnglishComm. Made with ❤️ by Tiêu Anh Huy
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Đồ án chuyên ngành - Trường Đại học Trà Vinh
          </p>
        </footer>
      </div>
    </>
  );
}