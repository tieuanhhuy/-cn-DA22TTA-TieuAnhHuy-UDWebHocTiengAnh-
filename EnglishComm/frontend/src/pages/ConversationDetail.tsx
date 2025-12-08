// frontend/src/pages/ConversationDetail.tsx
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Sentence {
  english: string;
  vietnamese: string;
  grammar?: string;
}

interface Lesson {
  id: string;
  title: string;
  youtube_url: string;
  transcript: Sentence[];
  tips: string[];
}

const lessons: Record<string, Lesson> = {
  "1": {
    id: "1",
    title: "Giới thiệu bản thân - Sarah từ London",
    youtube_url: "https://youtu.be/BFhYKuT1Gvw",
    transcript: [
      { english: "Hi, my name is Sarah.", vietnamese: "Xin chào, tôi tên là Sarah.", grammar: "Câu giới thiệu tên: Hi, my name is + tên" },
      { english: "I'm 22 years old and I'm from London.", vietnamese: "Tôi 22 tuổi và tôi đến từ London.", grammar: "Tuổi + 'and I'm from' + nơi" },
      { english: "I study computer science at university.", vietnamese: "Tôi học khoa học máy tính ở đại học.", grammar: "Hiện tại đơn: I + V(s/es)" },
      { english: "In my free time, I like reading books and playing tennis.", vietnamese: "Vào thời gian rảnh, tôi thích đọc sách và chơi quần vợt.", grammar: "Cụm 'In my free time' + like + V-ing" },
      { english: "Nice to meet you!", vietnamese: "Rất vui được gặp bạn!", grammar: "Câu chào kết thúc lịch sự" },
    ],
    tips: ["Nói chậm, rõ tên và tuổi", "Mỉm cười khi nói 'Nice to meet you'", "Luyện 3 lần mỗi câu"]
  }
};

export default function ConversationDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const lesson = topicId ? lessons[topicId] : null;

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : "";
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      compareSpeech(audioBlob);
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const compareSpeech = async (blob: Blob) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      const audioUrl = reader.result as string;
      const audio = new Audio(audioUrl);
      
      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript.toLowerCase();
        const expected = lesson?.transcript[currentSentence].english.toLowerCase() || "";
        const score = calculateAccuracy(spoken, expected);
        setScore(score);
      };

      recognition.onerror = () => setScore(50);
      recognition.start();
    };
    reader.readAsDataURL(blob);
  };

  const calculateAccuracy = (spoken: string, expected: string) => {
    const words1 = spoken.split(' ');
    const words2 = expected.split(' ');
    let correct = 0;
    words1.forEach(word => {
      if (words2.includes(word)) correct++;
    });
    return Math.round((correct / words2.length) * 100);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  if (!lesson) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 text-center">
          <p className="text-2xl text-red-600">Không tìm thấy bài học!</p>
          <Link to="/conversation-topics" className="text-purple-600">Quay lại</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            {lesson.title}
          </h1>

          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl mb-8">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${getYoutubeId(lesson.youtube_url)}`}
              title="Lesson Video"
              allowFullScreen
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Hội thoại mẫu</h2>
            <div className="space-y-6">
              {lesson.transcript.map((sent, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    idx === currentSentence ? "border-purple-500 bg-purple-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-800">{sent.english}</p>
                      <p className="text-gray-600 mt-1">{sent.vietnamese}</p>
                      {sent.grammar && (
                        <p className="text-sm text-purple-600 mt-2 italic">Ngữ pháp: {sent.grammar}</p>
                      )}
                    </div>
                    <button
                      onClick={() => speak(sent.english)}
                      className="ml-4 p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition"
                    >
                      Speaker
                    </button>
                  </div>

                  {idx === currentSentence && (
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`px-5 py-2 rounded-full font-medium transition ${
                          isRecording
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {isRecording ? "Recording..." : "Microphone Start"}
                      </button>
                      {score !== null && (
                        <span className={`font-bold text-lg ${
                          score >= 85 ? "text-green-600" : score >= 70 ? "text-yellow-600" : "text-red-600"
                        }`}>
                          Điểm: {score}/100
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentSentence(Math.max(0, currentSentence - 1))}
                disabled={currentSentence === 0}
                className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentSentence(Math.min(lesson.transcript.length - 1, currentSentence + 1))}
                disabled={currentSentence === lesson.transcript.length - 1}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-3">Mẹo giao tiếp</h3>
            <ul className="space-y-2">
              {lesson.tips.map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-purple-600">Check</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-10">
            <Link to="/conversation-topics" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800">
              Left Arrow Quay lại danh sách chủ đề
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}