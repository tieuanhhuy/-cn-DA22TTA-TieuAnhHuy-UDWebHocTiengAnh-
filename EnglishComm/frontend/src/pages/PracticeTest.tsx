import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface ResultData {
    score: number;
    total: number;
    correctCount: number;
    detailResult: any[];
}

export default function PracticeTest() {
  const { type, topicId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // State kết quả
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  /* ===== FETCH API ===== */
  useEffect(() => {
    setLoading(true);
    setIsSubmitted(false);
    setResultData(null);
    setAnswers([]);

    fetch(`http://localhost:5000/api/practice/${type}/${topicId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
            setQuestions(data);
            setAnswers(Array(data.length).fill(null));
        } else {
            setQuestions([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [type, topicId]);

  /* ===== LOGIC CHỌN ĐÁP ÁN ===== */
  const chooseAnswer = (index: number) => {
    if (isSubmitted) return;
    const a = [...answers];
    a[current] = index;
    setAnswers(a);
  };

  const clearAnswer = () => {
    if (isSubmitted) return;
    const a = [...answers];
    a[current] = null;
    setAnswers(a);
  };

  const toggleFlag = () => {
    setFlagged((prev) =>
      prev.includes(current) ? prev.filter((i) => i !== current) : [...prev, current]
    );
  };

  /* ===== NỘP BÀI ===== */
  const submitTest = async () => {
    const unanswered = answers.filter((a) => a === null).length;
    if (!confirm(unanswered > 0 ? `Còn ${unanswered} câu chưa làm. Nộp bài?` : "Chắc chắn nộp bài?")) return;

    try {
      const res = await fetch("http://localhost:5000/api/practice/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          type,
          topicId,
          answers,
          questions,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResultData(data);
        setIsSubmitted(true);
        setCurrent(0);
        window.scrollTo(0, 0);
      } else {
        alert("Lỗi server: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối!");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-purple-600">Đang tải...</div>;
  
  // DÒNG NÀY KIỂM TRA DỮ LIỆU
  if (!questions.length) return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-500 mb-4">Chưa có dữ liệu câu hỏi cho chủ đề này.</p>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-500 text-white rounded">Quay lại</button>
      </div>
    </>
  );

  const q = questions[current];
  const hasAnswer = answers[current] !== null;

  // Tô màu đáp án
  const getOptionClass = (i: number) => {
      if (!isSubmitted) {
          return answers[current] === i 
            ? "border-purple-500 bg-purple-50 shadow-md ring-1 ring-purple-200" 
            : "border-gray-100 bg-white hover:border-pink-300 hover:bg-pink-50";
      }
      const detail = resultData?.detailResult?.[current];
      const isUserSelected = answers[current] === i;
      const isCorrectOption = q.options[i] === detail?.correctAnswer;

      if (isCorrectOption) return "bg-green-100 border-green-500 text-green-800 font-bold";
      if (isUserSelected && !detail?.isCorrect) return "bg-red-100 border-red-500 text-red-800";
      return "bg-white border-gray-100 opacity-50";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-[#b2d1ef] to-[#f0eaf6] pt-24 pb-12 flex flex-col items-center px-4">
        
        {isSubmitted && resultData && (
          <div className="w-full max-w-4xl mb-6 bg-white rounded-3xl shadow-xl p-6 border-l-8 border-purple-500 flex justify-between items-center animate-bounce-in">
             <div><h2 className="text-2xl font-bold">Kết quả</h2></div>
             <div className="text-right">
                <p className="text-5xl font-black text-purple-600">{resultData.score}<span className="text-2xl text-gray-400">/10</span></p>
                <p className="text-sm text-green-600 font-bold">Đúng {resultData.correctCount}/{resultData.total}</p>
             </div>
          </div>
        )}

        <div className="w-full max-w-4xl">
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden relative">
            
            <div className={`p-6 flex justify-between items-center text-white shadow-lg ${isSubmitted ? 'bg-gray-700' : 'bg-linear-to-r from-purple-500 to-pink-500'}`}>
              <h2 className="text-xl font-bold"><span className="bg-white/20 px-3 py-1 rounded-lg">Câu {current + 1}</span> / {questions.length}</h2>
            </div>

            <div className="p-8 md:p-10">
              {/* Hiển thị câu hỏi (Tiếng Việt) */}
              <h1 className="text-2xl font-bold text-gray-800 mb-8">{q.question}</h1>

              <div className="space-y-4">
                {q.options.map((o, i) => (
                  <button key={i} onClick={() => chooseAnswer(i)} disabled={isSubmitted} 
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center ${getOptionClass(i)}`}>
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mr-4 font-bold ${isSubmitted ? 'border-transparent' : 'border-gray-300'}`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    {/* Hiển thị đáp án (Tiếng Anh) */}
                    <span className="text-lg font-medium">{o}</span>
                  </button>
                ))}
              </div>

              {isSubmitted && !resultData?.detailResult?.[current]?.isCorrect && (
                  <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200">
                      <strong>💡 Đáp án đúng:</strong> {resultData?.detailResult?.[current]?.correctAnswer}
                  </div>
              )}
            </div>

            <div className="p-6 bg-gray-50/80 border-t border-gray-100 flex justify-between items-center">
              <button disabled={current === 0} onClick={() => setCurrent(c => c - 1)} className="px-5 py-2 bg-white border rounded-full">← Trước</button>
              
              {!isSubmitted && (
                 <div className="flex gap-2">
                    <button onClick={clearAnswer} disabled={!hasAnswer} className="px-4 py-2 text-red-500 border border-red-200 rounded-full">✕ Xóa</button>
                    <button onClick={toggleFlag} className="px-4 py-2 text-yellow-600 border border-yellow-400 rounded-full">{flagged.includes(current) ? "Bỏ cờ" : "Cờ"}</button>
                 </div>
              )}

              {current === questions.length - 1 ? (
                !isSubmitted ? (
                    <button onClick={submitTest} className="bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-600">Nộp bài ✓</button>
                ) : (
                    <button onClick={() => navigate('/progress')} className="bg-purple-600 text-white px-6 py-2 rounded-full shadow">Thoát</button>
                )
              ) : (
                <button onClick={() => setCurrent(c => c + 1)} className="bg-purple-500 text-white px-6 py-2 rounded-full shadow">Sau →</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}