import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Tab = "register" | "login";
const API_URL = "http://localhost:5000";

export default function Auth() {
  const [activeTab, setActiveTab] = useState<Tab>("register");
  const navigate = useNavigate();

  // ================= REGISTER STATE =================
  const [regName, setRegName] = useState("");
  const [regDay, setRegDay] = useState("");
  const [regMonth, setRegMonth] = useState("");
  const [regYear, setRegYear] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regAvatar, setRegAvatar] = useState<File | null>(null);

  // ================= LOGIN STATE =================
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ================= MESSAGE =================
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ================= REGISTER =================
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("username", regName);
      formData.append("email", regEmail);
      formData.append("password", regPassword);
      if (regAvatar) formData.append("avatar", regAvatar);

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Đăng ký thất bại");
        return;
      }

      setSuccessMessage("🎉 Đăng ký thành công! Vui lòng đăng nhập.");
      setTimeout(() => {
        setActiveTab("login");
        setSuccessMessage("");
      }, 1500);
    } catch {
      setErrorMessage("Không thể kết nối tới server");
    }
  };

  // ================= LOGIN =================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Đăng nhập thất bại");
        return;
      }

      // ✅ CHỈ LƯU TOKEN + USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
      setSuccessMessage("🎉 Đăng nhập thành công!");
      setTimeout(() => navigate("/"), 1000);
    } catch {
      setErrorMessage("Không thể kết nối tới server");
    }
  };

  // ================= DATE OPTIONS =================
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  
  const inputClass = "w-full border border-gray-300 px-4 py-3 rounded transition-all duration-200 hover:border-blue-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100";
  const selectClass = "border border-gray-300 px-4 py-3 rounded transition-all duration-200 hover:border-blue-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen flex font-inter">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-500 to-blue-400 flex-col justify-between p-12 text-white">
        <div>
          <h1 className="text-6xl font-bold tracking-tight">EnglishComm</h1>
          <p className="text-3xl mt-20">Học tiếng Anh - tự tin kết nối</p>
        </div>
        <footer className="text-sm opacity-70">
          © 2025 EnglishComm. All rights reserved.
        </footer>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm"> 
          {/* TABS */}
          <div className="flex space-x-8 mb-10 border-b border-gray-200 pb-2"> 
            <button
              onClick={() => setActiveTab("register")}
              className={`text-2xl font-semibold pb-2 border-b-2 transition-colors duration-200 -mb-2.5 ${
                activeTab === "register"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-400 border-transparent hover:text-blue-500"
              }`}
            >
              Đăng ký
            </button>
            <button
              onClick={() => setActiveTab("login")}
              className={`text-2xl font-semibold pb-2 border-b-2 transition-colors duration-200 -mb-2.5 ${
                activeTab === "login"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-400 border-transparent hover:text-blue-500"
              }`}
            >
              Đăng nhập
            </button>
          </div>

          {/* MESSAGE */}
          {successMessage && (
            <div className="mb-6 bg-green-100 text-green-700 p-3 rounded border border-green-200 animate-pulse">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-6 bg-red-100 text-red-700 p-3 rounded border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* REGISTER */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-6 animate-fade-in-up"> 
              <input 
                className={inputClass} 
                placeholder="Họ và tên" 
                value={regName} 
                onChange={(e) => setRegName(e.target.value)} 
              />

              <div className="grid grid-cols-3 gap-3">
                <select className={selectClass} value={regDay} onChange={(e) => setRegDay(e.target.value)} required>
                  <option value="">Ngày</option>
                  {days.map(d => <option key={d}>{d}</option>)}
                </select>
                <select className={selectClass} value={regMonth} onChange={(e) => setRegMonth(e.target.value)} required>
                  <option value="">Tháng</option>
                  {months.map(m => <option key={m}>{m}</option>)}
                </select>
                <select className={selectClass} value={regYear} onChange={(e) => setRegYear(e.target.value)} required>
                  <option value="">Năm</option>
                  {years.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>

              <div className="flex gap-3">
                <input 
                  readOnly 
                  value={regAvatar ? regAvatar.name : ""} 
                  placeholder="Chọn ảnh đại diện" 
                  className={`flex-1 bg-gray-50 cursor-default ${inputClass} focus:ring-0`} 
                />
                <label className="px-5 py-3 bg-black text-white rounded cursor-pointer transition-colors duration-200 hover:bg-gray-800 active:scale-95 flex items-center justify-center">
                  Chọn
                  <input type="file" accept="image/*" hidden onChange={(e) => setRegAvatar(e.target.files?.[0] || null)} />
                </label>
              </div>

              <input 
                className={inputClass} 
                placeholder="Email" 
                type="email" 
                value={regEmail} 
                onChange={(e) => setRegEmail(e.target.value)} 
              />
              <input 
                className={inputClass} 
                placeholder="Mật khẩu" 
                type="password" 
                value={regPassword} 
                onChange={(e) => setRegPassword(e.target.value)} 
              />

              <button className="w-full bg-black text-white py-4 rounded font-semibold transition-all duration-200 hover:bg-gray-800 hover:shadow-lg active:scale-[0.99]">
                Đăng ký
              </button>
            </form>
          )}

          {/* LOGIN */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-6 animate-fade-in-up">
              <input 
                className={inputClass} 
                placeholder="Email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
              />
              <input 
                className={inputClass} 
                placeholder="Mật khẩu" 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
              />

              <button className="w-full bg-black text-white py-4 rounded font-semibold transition-all duration-200 hover:bg-gray-800 hover:shadow-lg active:scale-[0.99]">
                Đăng nhập
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}