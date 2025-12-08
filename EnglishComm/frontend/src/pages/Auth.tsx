// src/pages/Auth.tsx
import { useState } from "react";

type Tab = "register" | "login";

export default function Auth() {
  const [activeTab, setActiveTab] = useState<Tab>("register");

  // Register state
  const [regName, setRegName] = useState("");
  const [regDay, setRegDay] = useState("");
  const [regMonth, setRegMonth] = useState("");
  const [regYear, setRegYear] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", { regName, regDay, regMonth, regYear, regEmail, regPassword });
    // Gọi API đăng ký ở đây
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { loginEmail, loginPassword, rememberMe });
    // Gọi API đăng nhập ở đây
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen flex font-inter">
      {/* Left: Gradient Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-500 to-blue-400 flex-col justify-between p-12 text-white">
        <div>
          <h1 className="text-6xl font-bold tracking-tight">EnglishComm</h1>
          <p className="text-3xl mt-20 leading-relaxed">
            Học tiếng Anh - tự tin kết nối
          </p>
          <p className="text-xl mt-8 opacity-90">
            Từng bước chạm đến tiếng Anh lưu loát
          </p>
        </div>
        <footer className="text-sm opacity-70">
          © 2025 EnglishComm. All rights reserved.
        </footer>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex space-x-8 mb-10">
            <button
              onClick={() => setActiveTab("register")}
              className={`text-2xl font-semibold pb-2 border-b-2 transition-all ${
                activeTab === "register"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab("login")}
              className={`text-2xl font-semibold pb-2 border-b-2 transition-all ${
                activeTab === "login"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Log in
            </button>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-6 hover:bg-gray-100 transition">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="text-gray-700 font-medium">Log in with Google</span>
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">or</span>
            </div>
          </div>

          {/* === FORM ĐĂNG KÝ === */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Birth</label>
                <div className="grid grid-cols-3 gap-3">
                  <select value={regDay} onChange={(e) => setRegDay(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Date</option>
                    {days.map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>
                  <select value={regMonth} onChange={(e) => setRegMonth(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Month</option>
                    {months.map((m) => (<option key={m} value={m}>{m}</option>))}
                  </select>
                  <select value={regYear} onChange={(e) => setRegYear(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Year</option>
                    {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Example@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition mt-10">
                Register
              </button>
            </form>
          )}

          {/* === FORM ĐĂNG NHẬP === */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Example@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition mt-10">
                Log in
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}