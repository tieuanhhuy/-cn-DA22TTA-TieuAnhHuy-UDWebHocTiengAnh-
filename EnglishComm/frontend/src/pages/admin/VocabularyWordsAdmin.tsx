import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API = "http://localhost:5000/api/admin/word";
const TOPIC_API = "http://localhost:5000/api/vocabulary/topics"; // API lấy danh sách chủ đề

interface Word {
  id: number;
  word: string;
  meaning_vi: string;
  example_en: string;
}

// Interface cho Topic để TypeScript không báo lỗi
interface Topic {
  id: number;
  title: string;
}

export default function VocabularyWordsAdmin() {
  const { topicId } = useParams();
  const [words, setWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // State lưu tên chủ đề
  const [topicTitle, setTopicTitle] = useState("");

  /* ===== ADD FORM ===== */
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  /* ===== EDIT ===== */
  const [editId, setEditId] = useState<number | null>(null);
  const [editWord, setEditWord] = useState("");
  const [editMeaning, setEditMeaning] = useState("");
  const [editExample, setEditExample] = useState("");

  /* ================= FETCH DATA ================= */
  
  // 1. Lấy danh sách từ vựng
  const fetchWords = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/topic/${topicId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setWords(data);
      setFilteredWords(data);
    } catch (error) {
      console.error("Lỗi tải từ vựng:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Lấy tên chủ đề (SỬA LẠI LOGIC: Lấy tất cả rồi tìm)
  const fetchTopicInfo = async () => {
    try {
      // Gọi API lấy danh sách tất cả chủ đề
      const res = await fetch(TOPIC_API); 
      const data: Topic[] = await res.json();
      
      // Tìm chủ đề có ID trùng với topicId trên URL
      // Lưu ý: topicId là string, t.id là number nên dùng dấu == để so sánh
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
      fetchWords();
      fetchTopicInfo(); // Gọi hàm lấy tên chủ đề
    }
  }, [topicId]);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const keyword = search.toLowerCase();

    const result = words.filter(
      (w) =>
        w.word.toLowerCase().includes(keyword) ||
        w.meaning_vi.toLowerCase().includes(keyword) ||
        (w.example_en || "").toLowerCase().includes(keyword)
    );

    setFilteredWords(result);
  }, [search, words]);

  /* ================= CREATE ================= */
  const createWord = async () => {
    if (!word || !meaning) {
      alert("Nhập đầy đủ từ và nghĩa");
      return;
    }

    await fetch(`${API}/topic/${topicId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        word,
        meaning_vi: meaning,
        example_en: example,
      }),
    });

    setWord("");
    setMeaning("");
    setExample("");
    fetchWords();
  };

  /* ================= UPDATE ================= */
  const updateWord = async (id: number) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        word: editWord,
        meaning_vi: editMeaning,
        example_en: editExample,
      }),
    });

    setEditId(null);
    fetchWords();
  };

  /* ================= DELETE ================= */
  const deleteWord = async (id: number) => {
    if (!confirm("Xóa từ này?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchWords();
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 p-10 max-w-6xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* Nếu có topicTitle thì hiện tên, chưa load xong thì hiện ID */}
            📘 Quản lý từ vựng – <span className="text-purple-600">{topicTitle || `Chủ đề #${topicId}`}</span>
          </h1>
          <Link
            to="/admin/vocabulary"
            className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
          >
            ← Quay lại
          </Link>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Tìm từ / nghĩa / ví dụ..."
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* ===== ADD WORD ===== */}
        <div className="bg-white p-6 rounded-xl shadow mb-10 border border-gray-100">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span>➕</span> Thêm từ mới
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Từ vựng (English)"
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="Nghĩa tiếng Việt"
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Ví dụ (Example sentence)"
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <button
            onClick={createWord}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors font-medium shadow-md"
          >
            Thêm từ
          </button>
        </div>

        {/* ===== WORD LIST ===== */}
        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-sm">
              <tr>
                <th className="p-4 w-16">ID</th>
                <th className="p-4 w-1/4">Từ vựng</th>
                <th className="p-4 w-1/4">Nghĩa</th>
                <th className="p-4">Ví dụ</th>
                <th className="p-4 text-right w-32">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <div className="animate-pulse">Đang tải dữ liệu...</div>
                  </td>
                </tr>
              ) : filteredWords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                    Không tìm thấy từ nào trong chủ đề này.
                  </td>
                </tr>
              ) : (
                filteredWords.map((w) => (
                  <tr key={w.id} className="hover:bg-blue-50 transition-colors">
                    {editId === w.id ? (
                      <>
                        <td className="p-4 text-gray-500">{w.id}</td>
                        <td className="p-4">
                          <input
                            value={editWord}
                            onChange={(e) => setEditWord(e.target.value)}
                            className="border border-blue-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                            autoFocus
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editMeaning}
                            onChange={(e) => setEditMeaning(e.target.value)}
                            className="border border-blue-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editExample}
                            onChange={(e) => setEditExample(e.target.value)}
                            className="border border-blue-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => updateWord(w.id)}
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
                      <>
                        <td className="p-4 text-gray-400 font-mono text-sm">{w.id}</td>
                        <td className="p-4 font-bold text-gray-800 text-lg">{w.word}</td>
                        <td className="p-4 text-gray-700">{w.meaning_vi}</td>
                        <td className="p-4 text-gray-500 italic">
                          {w.example_en || "-"}
                        </td>
                        <td className="p-4 text-right space-x-3 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditId(w.id);
                              setEditWord(w.word);
                              setEditMeaning(w.meaning_vi);
                              setEditExample(w.example_en || "");
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => deleteWord(w.id)}
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