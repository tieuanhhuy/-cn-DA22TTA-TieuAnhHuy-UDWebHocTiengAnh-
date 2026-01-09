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
        <h1 className="text-3xl font-bold mb-8">
          📚 Quản lý chủ đề từ vựng
        </h1>

        {/* ===== ADD TOPIC ===== */}
        <div className="flex items-center gap-4 mb-10">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Tên chủ đề mới"
            className="border px-4 py-2 rounded w-72"
          />

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIcon(e.target.files?.[0] || null)}
              className="hidden"
            />
            <span className="px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100">
              {icon ? icon.name : "Chọn ảnh"}
            </span>
          </label>

          <button
            onClick={createTopic}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Thêm chủ đề
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 w-20 text-center">ID</th>
                <th className="p-4">Tên chủ đề</th>
                <th className="p-4 w-32 text-center">Số từ</th>
                <th className="p-4 w-48 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : topics.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    Chưa có chủ đề nào
                  </td>
                </tr>
              ) : (
                topics.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="p-4 text-center">{t.id}</td>

                    <td className="p-4">
                      {editId === t.id ? (
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="border px-3 py-1 rounded w-full"
                        />
                      ) : (
                        <Link
                          to={`/admin/vocabulary/${t.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {t.title}
                        </Link>
                      )}
                    </td>

                    <td className="p-4 text-center">{t.total_words}</td>

                    {/* ===== ACTIONS ===== */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                        {editId === t.id ? (
                          <>
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  setEditIcon(
                                    e.target.files?.[0] || null
                                  )
                                }
                                className="hidden"
                              />
                              <span className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                                Ảnh
                              </span>
                            </label>

                            <button
                              onClick={() => updateTopic(t.id)}
                              className="text-green-600 text-sm font-medium"
                            >
                              Lưu
                            </button>

                            <button
                              onClick={() => {
                                setEditId(null);
                                setEditIcon(null);
                              }}
                              className="text-gray-500 text-sm"
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
                              className="text-blue-600 text-sm hover:underline"
                            >
                              Sửa
                            </button>

                            <button
                              onClick={() => deleteTopic(t.id)}
                              className="text-red-500 text-sm hover:underline"
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
