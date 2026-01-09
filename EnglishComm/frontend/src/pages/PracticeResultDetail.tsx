import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface QuestionSnapshot {
  id: number;
  question: string;
  options: string[];
  userAnswerIndex: number;
  correctAnswer: string;
  isUserCorrect: boolean;
}

interface ResultDetailData {
  id: number;
  score: number;
  correct_count: number;
  total_questions: number;
  created_at: string;
  details: string; // JSON string từ DB
}

export default function PracticeResultDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ResultDetailData | null>(null);
  const [questions, setQuestions] = useState<QuestionSnapshot[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/practice/history/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        // Parse JSON chuỗi details thành mảng câu hỏi
        if (resData.details) {
            const parsed = typeof resData.details === 'string' 
                ? JSON.parse(resData.details) 
                : resData.details;
            setQuestions(parsed);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="pt-24 text-center font-bold text-purple-600">Đang tải chi tiết...</div>;
  if (!data || !questions.length) return <div className="pt-24 text-center">Không tìm thấy dữ liệu.</div>;

  const q = questions[current];

  // Logic tô màu đáp án
  const getOptionClass = (opt: string, index: number) => {
      const isSelected = index === q.userAnswerIndex;
      const isCorrect = opt === q.correctAnswer;

      if (isCorrect) return "bg-green-100 border-green-500 text-green-800 font-bold shadow-md"; // Đáp án đúng luôn xanh
      if (isSelected && !q.isUserCorrect) return "bg-red-100 border-red-500 text-red-800 shadow-md"; // Chọn sai thì đỏ
      
      return "bg-white border-gray-100 opacity-50 grayscale"; // Các câu không chọn
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-[#b2d1ef] to-[#f0eaf6] pt-24 pb-12 flex flex-col items-center px-4">
        
        {/* HEADER KẾT QUẢ TỔNG QUAN */}
        <div className="w-full max-w-4xl mb-6 bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center border-l-8 border-purple-500">
             <div>
                <h2 className="text-xl font-bold text-gray-800">Xem lại bài làm</h2>
                <p className="text-gray-500 text-sm">Ngày làm: {new Date(data.created_at).toLocaleString('vi-VN')}</p>
             </div>
             <div className="text-right">
                <p className="text-4xl font-black text-purple-600">{data.score}<span className="text-xl text-gray-400">/10</span></p>
                <p className="text-xs text-green-600 font-bold">Đúng {data.correct_count}/{data.total_questions}</p>
             </div>
        </div>

        {/* KHUNG CÂU HỎI */}
        <div className="w-full max-w-4xl">
          <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Header câu hỏi */}
            <div className={`p-5 flex justify-between items-center text-white font-bold ${q.isUserCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
               <span>Câu {current + 1} / {questions.length}</span>
               <span>{q.isUserCorrect ? "ĐÚNG ✓" : "SAI ✕"}</span>
            </div>

            <div className="p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">{q.question}</h1>

              <div className="space-y-3">
                {q.options.map((opt, idx) => (
                  <div key={idx} 
                    className={`w-full text-left p-4 rounded-xl border-2 flex items-center ${getOptionClass(opt, idx)}`}>
                    
                    <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-bold bg-white/50">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-lg font-medium">{opt}</span>
                    
                    {/* Icon chỉ dẫn thêm */}
                    {opt === q.correctAnswer && <span className="ml-auto text-green-700 font-bold">✔ Đúng</span>}
                    {idx === q.userAnswerIndex && !q.isUserCorrect && <span className="ml-auto text-red-700 font-bold">✘ Bạn chọn</span>}
                  </div>
                ))}
              </div>

              {!q.isUserCorrect && (
                  <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200">
                      <strong>💡 Đáp án đúng là:</strong> {q.correctAnswer}
                  </div>
              )}
            </div>

            {/* Footer điều hướng */}
            <div className="p-4 bg-gray-50 flex justify-between">
              <button disabled={current === 0} onClick={() => setCurrent(c => c - 1)} className="px-5 py-2 bg-white border rounded-full hover:bg-gray-100 disabled:opacity-50">← Trước</button>
              
              <button onClick={() => navigate('/progress')} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300">
                  Thoát
              </button>

              <button disabled={current === questions.length - 1} onClick={() => setCurrent(c => c + 1)} className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50">Sau →</button>
            </div>
          </div>
        </div>

        {/* MAP CÂU HỎI */}
        <div className="w-full max-w-4xl mt-6 flex justify-center flex-wrap gap-2">
            {questions.map((qs, idx) => (
                <button 
                    key={idx} 
                    onClick={() => setCurrent(idx)}
                    className={`w-10 h-10 rounded-lg font-bold border transition ${
                        current === idx ? "ring-2 ring-purple-500 scale-110" : ""
                    } ${
                        qs.isUserCorrect ? "bg-green-500 text-white border-green-600" : "bg-red-500 text-white border-red-600"
                    }`}
                >
                    {idx + 1}
                </button>
            ))}
        </div>

      </div>
    </>
  );
}