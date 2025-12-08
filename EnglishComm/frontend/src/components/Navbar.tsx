// src/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hover mượt với delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLearnOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsLearnOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          EnglishComm
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Home
          </Link>

          {/* Learn Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 text-gray-700 hover:text-purple-600 font-medium transition">
              Learn
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isLearnOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown - DÍNH SÁT, KHÔNG KHOẢNG TRỐNG */}
            <div
              className={`absolute left-0 mt-0 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                isLearnOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              }`}
              style={{ top: "100%" }}
            >
              {/* HỌC TỪ VỰNG */}
              <Link
                to="/vocabulary-topics"
                className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition font-medium"
                onClick={() => setIsLearnOpen(false)} // Đóng dropdown khi click
              >
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Học từ vựng</span>
              </Link>

              {/* GIAO TIẾP */}
              <Link
                to="/conversation-topics"
                className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition font-medium"
                onClick={() => setIsLearnOpen(false)}
              >
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Giao tiếp</span>
              </Link>
            </div>
          </div>

          <Link to="/practice" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Practice
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium transition">
            About us
          </Link>
        </div>

        {/* Auth + Avatar */}
        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Log in
          </Link>
          <span className="text-gray-400">|</span>
          <Link to="/auth" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Register
          </Link>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}