import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API = "http://localhost:5000/api/admin/vocabulary";

interface Topic {
  id: number;
  title: string;
  total_words: number;
  icon?: string | null;
}

export default function VocabularyAdmin() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  // ===== CREATE =====
  const [newTitle, setNewTitle] = useState("");
  const [icon, setIcon] = useState<File | null>(null);

  // ===== EDIT =====
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editIcon, setEditIcon] = useState<File | null>(null);

  /* ================= FETCH TOPICS ================= */
  const fetchTopics = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/topics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTopics(data);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách chủ đề");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || user.role !== "admin") {
      alert("Bạn không có quyền truy cập");
      window.location.href = "/";
      return;
    }
    fetchTopics();
  }, []);

  /* ================= CREATE ================= */
  const createTopic = async () => {
    if (!newTitle.trim()) {
      alert("Vui lòng nhập tên chủ đề");
      return;
    }

    const formData = new FormData();
    formData.append("title", newTitle);
    if (icon) formData.append("icon", icon);

    await fetch(`${API}/topics`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    setNewTitle("");
    setIcon(null);
    fetchTopics();
  };

  /* ================= UPDATE ================= */
  const updateTopic = async (id: number) => {
    if (!editTitle.trim()) {
      alert("Chưa nhập tên chủ đề");
      return;
    }

    const formData = new FormData();
    formData.append("title", editTitle);
    if (editIcon) formData.append("icon", editIcon);

    await fetch(`${API}/topics/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    setEditId(null);
    setEditIcon(null);
    fetchTopics();
  };

  /* ================= DELETE ================= */
  const deleteTopic = async (id: number) => {
    if (!confirm("Xóa chủ đề này sẽ xóa toàn bộ từ vựng liên quan. Tiếp tục?"))
      return;

    await fetch(`${API}/topics/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchTopics();
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 p-10 max-w-6xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            📚 Quản lý chủ đề từ vựng
          </h1>
          <Link
            to="/admin/dashboard"
            className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
          >
            ← Quay lại
          </Link>
        </div>

        {/* ===== ADD TOPIC FORM ===== */}
        <div className="bg-white p-6 rounded-xl shadow mb-10 border border-gray-100">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span>➕</span> Thêm chủ đề mới
          </h2>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Tên chủ đề
              </label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ví dụ: Animals, Food, Travel..."
                className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Ảnh minh họa
              </label>
              <label className="cursor-pointer flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50 bg-white transition border-dashed border-gray-300 text-gray-500">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setIcon(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <span>📂 {icon ? icon.name : "Chọn file ảnh"}</span>
              </label>
            </div>

            <button
              onClick={createTopic}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition shadow-md font-medium h-[42px]"
            >
              Thêm chủ đề
            </button>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-sm">
              <tr>
                <th className="p-4 w-20 text-center">ID</th>
                <th className="p-4">Thông tin chủ đề</th>
                <th className="p-4 w-32 text-center">Số từ</th>
                <th className="p-4 w-48 text-right">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    <div className="animate-pulse">Đang tải dữ liệu...</div>
                  </td>
                </tr>
              ) : topics.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 italic">
                    Chưa có chủ đề nào. Hãy thêm mới!
                  </td>
                </tr>
              ) : (
                topics.map((t) => (
                  <tr key={t.id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4 text-center text-gray-400 font-mono text-sm">
                      {t.id}
                    </td>

                    <td className="p-4">
                      {editId === t.id ? (
                        /* CHẾ ĐỘ SỬA */
                        <div className="flex flex-col gap-2">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="border border-blue-300 px-3 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                            autoFocus
                          />
                          <label className="cursor-pointer text-sm flex items-center gap-2 text-gray-600">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setEditIcon(e.target.files?.[0] || null)
                              }
                              className="hidden"
                            />
                            <span className="bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                              📷 {editIcon ? editIcon.name : "Đổi ảnh khác"}
                            </span>
                          </label>
                        </div>
                      ) : (
                        /* CHẾ ĐỘ XEM */
                        <Link
                          to={`/admin/vocabulary/${t.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div>
                             <p className="text-blue-600 font-bold text-lg group-hover:underline">
                                {t.title}
                             </p>
                             <p className="text-xs text-gray-400">Nhấn để quản lý từ vựng</p>
                          </div>
                        </Link>
                      )}
                    </td>

                    <td className="p-4 text-center">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                            {t.total_words} từ
                        </span>
                    </td>

                    {/* ===== ACTIONS ===== */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {editId === t.id ? (
                          <>
                            <button
                              onClick={() => updateTopic(t.id)}
                              className="text-green-600 font-medium hover:text-green-800 bg-green-50 px-3 py-1 rounded transition"
                            >
                              Lưu
                            </button>

                            <button
                              onClick={() => {
                                setEditId(null);
                                setEditIcon(null);
                              }}
                              className="text-gray-500 hover:text-gray-700 px-3 py-1 hover:bg-gray-100 rounded transition"
                            >
                              Hủy
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditId(t.id);
                                setEditTitle(t.title);
                              }}
                              className="text-blue-600 hover:text-blue-800 font-medium transition"
                            >
                              Sửa
                            </button>

                            <button
                              onClick={() => deleteTopic(t.id)}
                              className="text-red-500 hover:text-red-700 font-medium transition"
                            >
                              Xóa
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}