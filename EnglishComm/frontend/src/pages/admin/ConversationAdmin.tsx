import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API = "http://localhost:5000/api/admin/conversation";

interface Topic {
  id: number;
  title: string;
  description: string;
  youtube_url: string;
  total_sentences: number; // Đảm bảo API trả về trường này (hoặc 0)
}

export default function ConversationAdmin() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===== FORM STATE ===== */
  // Create
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newYoutube, setNewYoutube] = useState("");

  // Edit
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editYoutube, setEditYoutube] = useState("");

  /* ================= FETCH ================= */
  const fetchTopics = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/topics`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setTopics(data);
    } catch (err) {
      console.error(err);
      alert("Lỗi tải danh sách chủ đề");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  /* ================= CREATE ================= */
  const createTopic = async () => {
    if (!newTitle.trim()) return alert("Vui lòng nhập tên chủ đề");

    await fetch(`${API}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDesc,
        youtube_url: newYoutube,
      }),
    });

    // Reset form
    setNewTitle("");
    setNewDesc("");
    setNewYoutube("");
    fetchTopics();
  };

  /* ================= UPDATE ================= */
  const updateTopic = async (id: number) => {
    await fetch(`${API}/topics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDesc,
        youtube_url: editYoutube,
      }),
    });

    setEditId(null);
    fetchTopics();
  };

  /* ================= DELETE ================= */
  const deleteTopic = async (id: number) => {
    if (!confirm("Xóa chủ đề này sẽ xóa hết các mẫu câu bên trong. Tiếp tục?"))
      return;

    await fetch(`${API}/topics/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
            💬 Quản lý chủ đề Giao tiếp
          </h1>
          <Link
            to="/admin/dashboard"
            className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
          >
            ← Quay lại
          </Link>
        </div>

        {/* ===== ADD FORM ===== */}
        <div className="bg-white p-6 rounded-xl shadow mb-10 border border-gray-100">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span>➕</span> Thêm chủ đề mới
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Tên chủ đề
              </label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="VD: Greeting, Shopping..."
                className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                YouTube URL (Video mẫu)
              </label>
              <input
                value={newYoutube}
                onChange={(e) => setNewYoutube(e.target.value)}
                placeholder="https://youtu.be/..."
                className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Mô tả ngắn
              </label>
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Mô tả nội dung bài học..."
                className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>

          <button
            onClick={createTopic}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition shadow-md font-medium"
          >
            Thêm chủ đề
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-sm">
              <tr>
                <th className="p-4 w-16 text-center">ID</th>
                <th className="p-4 w-1/4">Tên chủ đề</th>
                <th className="p-4">Mô tả / Video</th>
                <th className="p-4 w-32 text-center">Mẫu câu</th>
                <th className="p-4 w-48 text-right">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <div className="animate-pulse">Đang tải dữ liệu...</div>
                  </td>
                </tr>
              ) : topics.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                    Chưa có chủ đề giao tiếp nào.
                  </td>
                </tr>
              ) : (
                topics.map((t) => (
                  <tr key={t.id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4 text-center text-gray-400 font-mono text-sm">
                      {t.id}
                    </td>

                    {editId === t.id ? (
                      /* CHẾ ĐỘ SỬA */
                      <>
                        <td className="p-4" colSpan={2}>
                          <div className="grid gap-3">
                            <input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="border border-blue-300 px-3 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Tên chủ đề"
                              autoFocus
                            />
                            <input
                              value={editYoutube}
                              onChange={(e) => setEditYoutube(e.target.value)}
                              className="border border-blue-300 px-3 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Youtube URL"
                            />
                            <input
                              value={editDesc}
                              onChange={(e) => setEditDesc(e.target.value)}
                              className="border border-blue-300 px-3 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Mô tả"
                            />
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          {/* Không sửa số câu ở đây */}
                          <span className="text-gray-400">-</span>
                        </td>
                        <td className="p-4 text-right align-top">
                          <div className="flex flex-col gap-2 items-end">
                            <button
                              onClick={() => updateTopic(t.id)}
                              className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded hover:bg-green-100 transition"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="text-gray-500 hover:text-gray-700 bg-gray-50 px-3 py-1 rounded hover:bg-gray-100 transition"
                            >
                              Hủy
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      /* CHẾ ĐỘ XEM */
                      <>
                        <td className="p-4">
                          <Link
                            to={`/admin/conversation/${t.id}`}
                            className="text-blue-600 font-bold text-lg hover:underline block mb-1"
                          >
                            {t.title}
                          </Link>
                          <p className="text-xs text-gray-400">
                            Nhấn tên để quản lý mẫu câu
                          </p>
                        </td>

                        <td className="p-4">
                          <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                            {t.description || "Không có mô tả"}
                          </p>
                          {t.youtube_url && (
                            <a
                              href={t.youtube_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-red-500 text-xs flex items-center gap-1 hover:underline font-medium"
                            >
                              <span className="text-lg">▶</span> Xem video mẫu
                            </a>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                            {t.total_sentences || 0} câu
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => {
                                setEditId(t.id);
                                setEditTitle(t.title);
                                setEditDesc(t.description || "");
                                setEditYoutube(t.youtube_url || "");
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
                          </div>
                        </td>
                      </>
                    )}
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