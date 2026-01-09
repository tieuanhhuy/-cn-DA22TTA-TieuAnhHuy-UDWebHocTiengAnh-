import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Sentence {
  english: string;
  vietnamese: string;
  grammar_note?: string;
  order_num: number;
}

interface Lesson {
  id: string;
  title: string;
  youtube_url: string;
  transcript: Sentence[];
}

export default function ConversationDetail() {
  const { topicId } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/conversation/topics/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [topicId]);

  const getYoutubeId = (url: string) => {
    if (!url) return "";
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    return match ? match[1] : "";
  };

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 text-center text-gray-600">
          Đang tải bài học...
        </div>
      </>
    );
  }

  /* ===== NOT FOUND ===== */
  if (!lesson) {
    return (
      <>
        <Navbar />
        <div className="pt-24 text-center text-red-500">
          Không tìm thấy bài học
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pt-24">
        <div className="max-w-5xl mx-auto px-6">

          {/* ===== HEADER ===== */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {lesson.title}
            </h1>
            <Link
              to="/conversation-topics"
              className="text-purple-600 hover:underline"
            >
              ← Quay lại
            </Link>
          </div>

          {/* ===== VIDEO (LUÔN HIỆN) ===== */}
          <div className="aspect-video mb-10 rounded-2xl overflow-hidden shadow-xl bg-black">
            {lesson.youtube_url ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(
                  lesson.youtube_url
                )}`}
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                Không có video cho chủ đề này
              </div>
            )}
          </div>

          {/* ===== SENTENCES ===== */}
          {lesson.transcript.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
              Chủ đề này chưa có câu hội thoại.
            </div>
          ) : (
            <div className="space-y-4">
              {lesson.transcript.map((s) => (
                <div
                  key={s.order_num}
                  className="p-5 bg-white rounded-xl shadow flex justify-between gap-6"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {s.english}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {s.vietnamese}
                    </p>
                    {s.grammar_note && (
                      <p className="text-sm text-purple-600 italic mt-2">
                        Ngữ pháp: {s.grammar_note}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => speak(s.english)}
                    className="shrink-0 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition"
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ===== FOOTER ===== */}
          <div className="text-center mt-12 pb-12">
            <Link
              to="/conversation-topics"
              className="text-purple-600 hover:underline"
            >
              ← Quay lại danh sách chủ đề
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
