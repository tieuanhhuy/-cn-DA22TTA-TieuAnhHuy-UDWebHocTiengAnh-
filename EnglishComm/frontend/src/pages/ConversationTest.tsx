// frontend/src/pages/ConversationTest.tsx
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const sentences = [
  "Hi, my name is Lisa.",
  "I'm from Hanoi.",
  "Nice to meet you."
];

export default function ConversationTest() {
  const [current, setCurrent] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
    recorder.onstop = () => compareSpeech(new Blob(audioChunksRef.current));

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const compareSpeech = (blob: Blob) => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    const reader = new FileReader();
    reader.onload = () => {
      recognition.onresult = (e: any) => {
        const spoken = e.results[0][0].transcript.toLowerCase();
        const expected = sentences[current].toLowerCase();
        const accuracy = Math.round(
          (spoken.split(' ').filter((w: string) => expected.includes(w)).length / expected.split(' ').length) * 100
        );
        setScore(accuracy);
      };
      recognition.start();
    };
    reader.readAsDataURL(blob);
  };

  const next = () => {
    if (current < sentences.length - 1) {
      setCurrent(current + 1);
      setScore(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-8">Nói theo câu sau:</h2>
            <p className="text-2xl font-medium text-purple-700 mb-10">
              "{sentences[current]}"
            </p>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-12 py-6 rounded-full text-xl font-bold transition-all ${
                isRecording ? "bg-red-500 text-white animate-pulse" : "bg-green-500 text-white"
              }`}
            >
              {isRecording ? "Recording..." : "Microphone Bắt đầu ghi âm"}
            </button>

            {score !== null && (
              <div className="mt-8">
                <p className={`text-3xl font-bold ${score >= 80 ? "text-green-600" : "text-yellow-600"}`}>
                  Điểm: {score}/100
                </p>
                <button
                  onClick={next}
                  className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-full"
                >
                  {current < sentences.length - 1 ? "Câu tiếp" : "Hoàn thành"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}