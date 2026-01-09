import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API = "http://localhost:5000/api/admin/conversation";

interface Sentence {
  id: number;
  english: string;
  vietnamese: string;
  grammar_note?: string;
  order_num: number;
}

export default function ConversationSentencesAdmin() {
  const { topicId } = useParams();
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===== ADD ===== */
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [grammar, setGrammar] = useState("");

  /* ===== EDIT ===== */
  const [editId, setEditId] = useState<number | null>(null);
  const [editEnglish, setEditEnglish] = useState("");
  const [editVietnamese, setEditVietnamese] = useState("");
  const [editGrammar, setEditGrammar] = useState("");

  /* ================= FETCH ================= */
  const fetchSentences = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API}/topics/${topicId}/sentences`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSentences(await res.json());
    } catch (err) {
      console.error(err);
      alert("Không tải được mẫu câu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentences();
  }, [topicId]);

  /* ================= CREATE ================= */
  const createSentence = async () => {
    if (!english.trim() || !vietnamese.trim()) {
      alert("Nhập đủ câu tiếng Anh và nghĩa");
      return;
    }

    await fetch(
      `${API}/topics/${topicId}/sentences`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          english,
          vietnamese,
          grammar_note: grammar,
        }),
      }
    );

    setEnglish("");
    setVietnamese("");
    setGrammar("");
    fetchSentences();
  };

  /* ================= UPDATE ================= */
  const updateSentence = async (id: number) => {
    await fetch(
      `${API}/sentences/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          english: editEnglish,
          vietnamese: editVietnamese,
          grammar_note: editGrammar,
        }),
      }
    );

    setEditId(null);
    fetchSentences();
  };

  /* ================= DELETE ================= */
  const deleteSentence = async (id: number) => {
    if (!confirm("Xóa mẫu câu này?")) return;

    await fetch(
      `${API}/sentences/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchSentences();
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 p-10 max-w-6xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            🎧 Quản lý mẫu câu – Chủ đề #{topicId}
          </h1>
          <Link
            to="/admin/conversation"
            className="text-blue-600 hover:underline"
          >
            ← Quay lại chủ đề
          </Link>
        </div>

        {/* ===== ADD FORM ===== */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">
            ➕ Thêm mẫu câu hội thoại
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              placeholder="Câu tiếng Anh"
              className="border px-4 py-2 rounded"
            />
            <input
              value={vietnamese}
              onChange={(e) => setVietnamese(e.target.value)}
              placeholder="Nghĩa tiếng Việt"
              className="border px-4 py-2 rounded"
            />
            <input
              value={grammar}
              onChange={(e) => setGrammar(e.target.value)}
              placeholder="Ghi chú ngữ pháp (optional)"
              className="border px-4 py-2 rounded"
            />
          </div>

          <button
            onClick={createSentence}
            className="mt-4 bg-black text-white px-6 py-2 rounded"
          >
            Thêm câu
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded-xl shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">#</th>
                <th className="p-4">English</th>
                <th className="p-4">Vietnamese</th>
                <th className="p-4">Grammar</th>
                <th className="p-4 text-right">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center">
                    Đang tải...
                  </td>
                </tr>
              ) : sentences.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Chưa có mẫu câu
                  </td>
                </tr>
              ) : (
                sentences.map((s) => (
                  <tr key={s.id} className="border-t">
                    {editId === s.id ? (
                      <>
                        <td className="p-4">{s.order_num}</td>
                        <td className="p-4">
                          <input
                            value={editEnglish}
                            onChange={(e) =>
                              setEditEnglish(e.target.value)
                            }
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editVietnamese}
                            onChange={(e) =>
                              setEditVietnamese(e.target.value)
                            }
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editGrammar}
                            onChange={(e) =>
                              setEditGrammar(e.target.value)
                            }
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="p-4 text-right space-x-3">
                          <button
                            onClick={() => updateSentence(s.id)}
                            className="text-green-600"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="text-gray-500"
                          >
                            Hủy
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4">{s.order_num}</td>
                        <td className="p-4 font-medium">{s.english}</td>
                        <td className="p-4">{s.vietnamese}</td>
                        <td className="p-4 text-purple-600 italic">
                          {s.grammar_note || "-"}
                        </td>
                        <td className="p-4 text-right space-x-3">
                          <button
                            onClick={() => {
                              setEditId(s.id);
                              setEditEnglish(s.english);
                              setEditVietnamese(s.vietnamese);
                              setEditGrammar(s.grammar_note || "");
                            }}
                            className="text-blue-600"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => deleteSentence(s.id)}
                            className="text-red-500"
                          >
                            Xóa
                          </button>
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
