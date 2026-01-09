import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const learnTimeout = useRef<NodeJS.Timeout | null>(null);
  const userTimeout = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  // ✅ CHỈ LẤY USER TỪ LOCALSTORAGE (1 NGUỒN DUY NHẤT)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ===== LEARN HOVER =====
  const handleLearnEnter = () => {
    if (learnTimeout.current) clearTimeout(learnTimeout.current);
    setIsLearnOpen(true);
  };

  const handleLearnLeave = () => {
    learnTimeout.current = setTimeout(() => {
      setIsLearnOpen(false);
    }, 150);
  };

  // ===== USER HOVER =====
  const handleUserEnter = () => {
    if (userTimeout.current) clearTimeout(userTimeout.current);
    setIsUserOpen(true);
  };

  const handleUserLeave = () => {
    userTimeout.current = setTimeout(() => {
      setIsUserOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (learnTimeout.current) clearTimeout(learnTimeout.current);
      if (userTimeout.current) clearTimeout(userTimeout.current);
    };
  }, []);

  // ===== LOGOUT =====
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  // ===== AVATAR RENDER =====
  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={`http://localhost:5000/images/${user.avatar}`}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border shadow-md"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "http://localhost:5000/images/default-user.png";
          }}
        />
      );
    }

    // fallback: chữ cái đầu
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold shadow-md">
        {user?.username?.charAt(0)?.toUpperCase() || "U"}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          EnglishComm
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Trang chủ
          </Link>

          {/* LEARN DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={handleLearnEnter}
            onMouseLeave={handleLearnLeave}
          >
            <button className="flex items-center gap-1 text-gray-700 hover:text-purple-600 font-medium transition">
              Học tập
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isLearnOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute left-0 mt-0 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                isLearnOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              }`}
              style={{ top: "100%" }}
            >
              <Link
                to="/vocabulary-topics"
                className="block px-6 py-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition font-medium"
                onClick={() => setIsLearnOpen(false)}
              >
                Học từ vựng
              </Link>

              <Link
                to="/conversation-topics"
                className="block px-6 py-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition font-medium"
                onClick={() => setIsLearnOpen(false)}
              >
                Giao tiếp
              </Link>
            </div>
          </div>

          <Link to="/practice" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Luyện tập
          </Link>

          {/* THÊM PROGRESS VÀO ĐÂY */}
          <Link to="/progress" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Tiến độ
          </Link>

          <Link to="/about-us" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Về chúng tôi
          </Link>
        </div>

        {/* USER */}
        <div
          className="relative"
          onMouseEnter={handleUserEnter}
          onMouseLeave={handleUserLeave}
        >
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-gray-700 hover:text-purple-600 font-medium">
                Đăng nhập
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/auth" className="text-gray-700 hover:text-purple-600 font-medium">
                Đăng ký
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 cursor-pointer">
                {renderAvatar()}
                <span className="text-gray-700 font-medium">
                  {user.username}
                </span>
              </div>

              <div
                className={`absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                  isUserOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
              >
                <Link
                  to="/profile"
                  className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition"
                >
                  Hồ sơ
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition text-purple-600 font-medium"
                  >
                    Admin
                  </Link>
                )}

                <hr />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}