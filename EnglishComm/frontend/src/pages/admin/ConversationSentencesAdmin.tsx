import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API = "http://localhost:5000/api/admin/conversation";
const TOPIC_API = "http://localhost:5000/api/conversation/topics"; // API lấy danh sách chủ đề giao tiếp

interface Sentence {
  id: number;
  english: string;
  vietnamese: string;
  grammar_note?: string;
  order_num: number;
}

// Interface cho Topic
interface Topic {
  id: number;
  title: string;
}

export default function ConversationSentencesAdmin() {
  const { topicId } = useParams();
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(true);

  // State lưu tên chủ đề
  const [topicTitle, setTopicTitle] = useState("");

  /* ===== ADD ===== */
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [grammar, setGrammar] = useState("");

  /* ===== EDIT ===== */
  const [editId, setEditId] = useState<number | null>(null);
  const [editEnglish, setEditEnglish] = useState("");
  const [editVietnamese, setEditVietnamese] = useState("");
  const [editGrammar, setEditGrammar] = useState("");

  /* ================= FETCH DATA ================= */
  
  // 1. Lấy danh sách câu
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

  // 2. Lấy tên chủ đề (MỚI THÊM)
  const fetchTopicInfo = async () => {
    try {
      const res = await fetch(TOPIC_API);
      const data: Topic[] = await res.json();
      
      // Tìm chủ đề có ID trùng với topicId
      const currentTopic = data.find((t) => t.id == Number(topicId));
      
      if (currentTopic) {
        setTopicTitle(currentTopic.title);
      }
    } catch (error) {
      console.error("Lỗi tải thông tin chủ đề:", error);
    }
  };

  useEffect(() => {
    if (topicId) {
        fetchSentences();
        fetchTopicInfo(); // Gọi hàm lấy tên
    }
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
          <h1 className="text-3xl font-bold text-gray-800">
            {/* SỬA HIỂN THỊ TÊN CHỦ ĐỀ */}
            🎧 Quản lý mẫu câu – <span className="text-purple-600">{topicTitle || `Chủ đề #${topicId}`}</span>
          </h1>
          <Link
            to="/admin/conversation"
            className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
          >
            ← Quay lại
          </Link>
        </div>

        {/* ===== ADD FORM ===== */}
        <div className="bg-white p-6 rounded-xl shadow mb-10 border border-gray-100">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span>➕</span> Thêm mẫu câu hội thoại
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              placeholder="Câu tiếng Anh"
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              value={vietnamese}
              onChange={(e) => setVietnamese(e.target.value)}
              placeholder="Nghĩa tiếng Việt"
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              value={grammar}
              onChange={(e) => setGrammar(e.target.value)}
              placeholder="Ghi chú ngữ pháp (optional)"
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <button
            onClick={createSentence}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition shadow-md font-medium"
          >
            Thêm câu
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-sm">
              <tr>
                <th className="p-4 w-16">ID</th>
                <th className="p-4 w-1/3">Câu tiếng Anh</th>
                <th className="p-4 w-1/4">Nghĩa tiếng Việt</th>
                <th className="p-4">Ngữ pháp</th>
                <th className="p-4 text-right w-32">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <div className="animate-pulse">Đang tải...</div>
                  </td>
                </tr>
              ) : sentences.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                    Chưa có mẫu câu nào trong chủ đề này.
                  </td>
                </tr>
              ) : (
                sentences.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50 transition-colors">
                    {editId === s.id ? (
                      /* ===== CHẾ ĐỘ SỬA ===== */
                      <>
                        <td className="p-4 text-gray-500 font-mono">{s.id}</td>
                        <td className="p-4">
                          <input
                            value={editEnglish}
                            onChange={(e) => setEditEnglish(e.target.value)}
                            className="border border-blue-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                            autoFocus
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editVietnamese}
                            onChange={(e) => setEditVietnamese(e.target.value)}
                            className="border border-blue-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editGrammar}
                            onChange={(e) => setEditGrammar(e.target.value)}
                            className="border border-blue-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => updateSentence(s.id)}
                            className="text-green-600 font-medium hover:text-green-800"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Hủy
                          </button>
                        </td>
                      </>
                    ) : (
                      /* ===== CHẾ ĐỘ XEM ===== */
                      <>
                        <td className="p-4 text-gray-400 font-mono text-sm">{s.id}</td>
                        <td className="p-4 font-medium text-gray-800">{s.english}</td>
                        <td className="p-4 text-gray-700">{s.vietnamese}</td>
                        <td className="p-4 text-purple-600 italic text-sm">
                          {s.grammar_note || "-"}
                        </td>
                        <td className="p-4 text-right space-x-3 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditId(s.id);
                              setEditEnglish(s.english);
                              setEditVietnamese(s.vietnamese);
                              setEditGrammar(s.grammar_note || "");
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => deleteSentence(s.id)}
                            className="text-red-500 hover:text-red-700 font-medium transition-colors"
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