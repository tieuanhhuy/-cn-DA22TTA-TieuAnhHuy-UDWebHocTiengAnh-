import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API = "http://localhost:5000/api/admin/conversation";

interface Topic {
  id: number;
  title: string;
  description: string;
  youtube_url: string;
}

export default function ConversationAdmin() {
  const [topics, setTopics] = useState<Topic[]>([]);

  /* ===== CREATE ===== */
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [youtube, setYoutube] = useState("");

  /* ===== EDIT ===== */
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editYoutube, setEditYoutube] = useState("");

  /* ===== FETCH ===== */
  const fetchTopics = async () => {
    const res = await fetch(`${API}/topics`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setTopics(data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  /* ===== CREATE ===== */
  const createTopic = async () => {
    if (!title.trim()) {
      alert("Nhập tên chủ đề");
      return;
    }

    await fetch(`${API}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        description: desc,
        youtube_url: youtube,
      }),
    });

    setTitle("");
    setDesc("");
    setYoutube("");
    fetchTopics();
  };

  /* ===== UPDATE ===== */
  const updateTopic = async (id: number) => {
    if (!editTitle.trim()) {
      alert("Chưa nhập tên");
      return;
    }

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

  /* ===== DELETE ===== */
  const deleteTopic = async (id: number) => {
    if (!confirm("Xóa chủ đề giao tiếp này?")) return;

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
        <h1 className="text-3xl font-bold mb-6">
          🎤 Quản lý chủ đề giao tiếp
        </h1>

        {/* ===== ADD ===== */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <input
            placeholder="Tên chủ đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            placeholder="Mô tả"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            placeholder="Youtube URL"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <button
            onClick={createTopic}
            className="bg-black text-white rounded"
          >
            Thêm
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 w-16">ID</th>
              <th className="p-3">Tên chủ đề</th>
              <th className="p-3 w-48">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {topics.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.id}</td>

                <td className="p-3">
                  {editId === t.id ? (
                    <div className="space-y-2">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                        placeholder="Tên chủ đề"
                      />
                      <input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                        placeholder="Mô tả"
                      />
                      <input
                        value={editYoutube}
                        onChange={(e) => setEditYoutube(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                        placeholder="Youtube URL"
                      />
                    </div>
                  ) : (
                    <Link
                      to={`/admin/conversation/${t.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {t.title}
                    </Link>
                  )}
                </td>

                <td className="p-3 space-x-3">
                  {editId === t.id ? (
                    <>
                      <button
                        onClick={() => updateTopic(t.id)}
                        className="text-green-600 font-medium"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-gray-500"
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
                          setEditDesc(t.description);
                          setEditYoutube(t.youtube_url);
                        }}
                        className="text-blue-600"
                      >
                        Sửa
                      </button>

                      <button
                        onClick={() => deleteTopic(t.id)}
                        className="text-red-500"
                      >
                        Xóa
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
