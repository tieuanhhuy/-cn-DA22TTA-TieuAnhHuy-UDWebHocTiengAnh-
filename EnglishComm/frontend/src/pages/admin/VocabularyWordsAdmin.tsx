import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API = "http://localhost:5000/api/admin/word";

interface Word {
  id: number;
  word: string;
  meaning_vi: string;
  example_en: string;
}

export default function VocabularyWordsAdmin() {
  const { topicId } = useParams();
  const [words, setWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ===== ADD FORM ===== */
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  /* ===== EDIT ===== */
  const [editId, setEditId] = useState<number | null>(null);
  const [editWord, setEditWord] = useState("");
  const [editMeaning, setEditMeaning] = useState("");
  const [editExample, setEditExample] = useState("");

  /* ================= FETCH WORDS ================= */
  const fetchWords = async () => {
    setLoading(true);
    const res = await fetch(`${API}/topic/${topicId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setWords(data);
    setFilteredWords(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWords();
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
          <h1 className="text-3xl font-bold">
            📘 Quản lý từ vựng – Chủ đề #{topicId}
          </h1>
          <Link
            to="/admin/vocabulary"
            className="text-blue-600 hover:underline"
          >
            ← Quay lại chủ đề
          </Link>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Tìm từ / nghĩa / ví dụ..."
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
          />
        </div>

        {/* ===== ADD WORD ===== */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">➕ Thêm từ mới</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Từ vựng"
              className="border px-4 py-2 rounded"
            />
            <input
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="Nghĩa tiếng Việt"
              className="border px-4 py-2 rounded"
            />
            <input
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Ví dụ (optional)"
              className="border px-4 py-2 rounded"
            />
          </div>

          <button
            onClick={createWord}
            className="mt-4 bg-black text-white px-6 py-2 rounded"
          >
            Thêm từ
          </button>
        </div>

        {/* ===== WORD LIST ===== */}
        <div className="bg-white rounded-xl shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">ID</th>
                <th className="p-4">Từ</th>
                <th className="p-4">Nghĩa</th>
                <th className="p-4">Ví dụ</th>
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
              ) : filteredWords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Không tìm thấy từ nào
                  </td>
                </tr>
              ) : (
                filteredWords.map((w) => (
                  <tr key={w.id} className="border-t">
                    {editId === w.id ? (
                      <>
                        <td className="p-4">{w.id}</td>
                        <td className="p-4">
                          <input
                            value={editWord}
                            onChange={(e) => setEditWord(e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editMeaning}
                            onChange={(e) => setEditMeaning(e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editExample}
                            onChange={(e) => setEditExample(e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="p-4 text-right space-x-3">
                          <button
                            onClick={() => updateWord(w.id)}
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
                        <td className="p-4">{w.id}</td>
                        <td className="p-4 font-medium">{w.word}</td>
                        <td className="p-4">{w.meaning_vi}</td>
                        <td className="p-4 text-gray-600">
                          {w.example_en || "-"}
                        </td>
                        <td className="p-4 text-right space-x-3">
                          <button
                            onClick={() => {
                              setEditId(w.id);
                              setEditWord(w.word);
                              setEditMeaning(w.meaning_vi);
                              setEditExample(w.example_en || "");
                            }}
                            className="text-blue-600"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => deleteWord(w.id)}
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
