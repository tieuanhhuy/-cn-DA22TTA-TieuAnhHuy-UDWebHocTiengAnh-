import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Word {
  id: number;
  word: string;
  meaning_vi: string;
  example_en: string;
  phonetic?: string | null;
  audio_url?: string | null;
}

export default function VocabularyDetail() {
  const { topicId } = useParams();
  const [words, setWords] = useState<Word[]>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/vocabulary/topics/${topicId}/words`)
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [topicId]);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
          <p className="text-xl text-gray-600">Đang tải từ vựng...</p>
        </div>
      </>
    );
  }

  if (words.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
          <p className="text-xl text-gray-600">Chủ đề này chưa có từ vựng.</p>
        </div>
      </>
    );
  }

  const currentWord = words[current];

  // A → Z
  const sortedWords = [...words].sort((a, b) =>
    a.word.localeCompare(b.word)
  );

  // 🔍 FILTER (chỉ ảnh hưởng danh sách)
  const filteredWords = search
    ? sortedWords.filter(
        (w) =>
          w.word.toLowerCase().includes(search.toLowerCase()) ||
          w.meaning_vi.toLowerCase().includes(search.toLowerCase())
      )
    : sortedWords;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-purple-700">
              Học từ vựng
            </h1>
            <Link
              to="/vocabulary-topics"
              className="bg-white px-6 py-3 rounded-xl shadow hover:shadow-md transition"
            >
              Các chủ đề
            </Link>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Tiến trình</span>
              <span>
                {current + 1} / {words.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                style={{
                  width: `${((current + 1) / words.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div className="perspective-1000 mb-10">
            <div
              className={`relative w-full h-96 cursor-pointer preserve-3d transition-transform duration-700 ${
                flipped ? "rotate-y-180" : ""
              }`}
              onClick={() => setFlipped(!flipped)}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl p-10 flex flex-col justify-center items-center">
                <h2 className="text-6xl font-bold text-gray-800 mb-4">
                  {currentWord.word}
                </h2>
                {currentWord.phonetic && (
                  <p className="text-xl text-gray-500">
                    {currentWord.phonetic}
                  </p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentWord.word);
                  }}
                  className="mt-8 bg-purple-100 px-6 py-3 rounded-xl hover:bg-purple-200 transition"
                >
                  🔊 Phát âm
                </button>
                <p className="mt-6 text-sm text-gray-400">
                  Nhấn để xem nghĩa
                </p>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-10 flex flex-col justify-center items-center text-white">
                <p className="text-4xl font-bold mb-4">
                  {currentWord.meaning_vi}
                </p>
                <p className="text-lg italic text-white/90 text-center px-6">
                  "{currentWord.example_en}"
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentWord.word);
                  }}
                  className="mt-8 bg-white/20 px-6 py-3 rounded-xl backdrop-blur hover:bg-white/30 transition"
                >
                  🔊 Nghe lại
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mb-12">
            <button
              disabled={current === 0}
              onClick={() => {
                setCurrent(current - 1);
                setFlipped(false);
              }}
              className="px-8 py-4 bg-gray-200 rounded-xl disabled:opacity-50"
            >
              Trước
            </button>
            <button
              disabled={current === words.length - 1}
              onClick={() => {
                setCurrent(current + 1);
                setFlipped(false);
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl disabled:opacity-50"
            >
              Tiếp theo
            </button>
          </div>

          {/* 🔍 SEARCH BAR */}
          <div className="mb-8">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Tìm từ hoặc nghĩa..."
              className="w-full border px-4 py-3 rounded-xl"
            />
          </div>

          {/* Word list */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">
              Danh sách từ (A → Z)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredWords.map((w) => (
                <div
                  key={w.id}
                  onClick={() => {
                    const index = words.findIndex(
                      (x) => x.id === w.id
                    );
                    setCurrent(index);
                    setFlipped(false);
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer ${
                    w.id === currentWord.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">{w.word}</p>
                      <p className="text-sm text-gray-500">
                        {w.meaning_vi}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(w.word);
                      }}
                      className="text-purple-600"
                    >
                      🔊
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/vocabulary-topics"
              className="text-purple-600 hover:underline"
            >
              ← Quay lại chủ đề
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </>
  );
}
