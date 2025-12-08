// src/pages/VocabularyDetail.tsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Word {
  word: string;
  pronounce: string;
  meaning: string;
  example: string;
}

const vocabData: Record<string, Word[]> = {
  "1": [
    { word: "Airport", pronounce: "/ˈɛərˌpɔrt/", meaning: "Sân bay", example: "The airport is very busy today." },
    { word: "Passport", pronounce: "/ˈpæsˌpɔrt/", meaning: "Hộ chiếu", example: "Don't forget your passport!" },
    { word: "Luggage", pronounce: "/ˈlʌɡɪdʒ/", meaning: "Hành lý", example: "Where is the luggage claim?" },
    { word: "Ticket", pronounce: "/ˈtɪkɪt/", meaning: "Vé", example: "I lost my plane ticket." },
  ],
  "2": [
    { word: "Reception", pronounce: "/rɪˈsɛpʃən/", meaning: "Lễ tân", example: "Please go to the reception desk." },
    { word: "Room", pronounce: "/ruːm/", meaning: "Phòng", example: "Your room is on the third floor." },
  ],
  "3": [
    { word: "Party", pronounce: "/ˈpɑːrti/", meaning: "Bữa tiệc", example: "The party starts at 8 PM." },
    { word: "Guest", pronounce: "/ɡɛst/", meaning: "Khách mời", example: "There are 50 guests coming." },
  ],
  "4": [
    { word: "Delicious", pronounce: "/dɪˈlɪʃəs/", meaning: "Ngon", example: "This cake is delicious!" },
    { word: "Spicy", pronounce: "/ˈspaɪsi/", meaning: "Cay", example: "I love spicy food." },
  ],
};

const topicNames: Record<string, string> = {
  "1": "Du lịch", "2": "Dịch vụ", "3": "Tiệc tùng", "4": "Ẩm thực"
};

export default function VocabularyDetail() {
  const { topicId } = useParams();
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const words = vocabData[topicId!] || [];
  const currentWord = words[current];
  const topicName = topicNames[topicId!] || "Chủ đề";

  // Sắp xếp theo ABC
  const sortedWords = [...words].sort((a, b) => a.word.localeCompare(b.word));

  // Phát âm
  const speak = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (words.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
          <p className="text-xl text-gray-600">Không có từ vựng cho chủ đề này.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-purple-700">{topicName}</h1>
              <p className="text-lg text-gray-600 mt-2">Học từ vựng qua flashcard</p>
            </div>
            <Link to="/vocabulary-topics" className="bg-white px-6 py-3 rounded-xl shadow hover:shadow-md transition">
              Các chủ đề
            </Link>
          </div>

          {/* Tiến độ */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Tiến độ</span>
              <span>{current + 1} / {words.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard 3D */}
          <div className="perspective-1000 mb-16">
            <div
              className={`relative w-full h-96 cursor-pointer preserve-3d transition-transform duration-600 ${flipped ? 'rotate-y-180' : ''}`}
              onClick={() => setFlipped(!flipped)}
            >
              {/* Mặt trước */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl p-10 flex flex-col justify-center items-center">
                <h2 className="text-6xl font-bold text-gray-800 mb-4">{currentWord.word}</h2>
                <p className="text-2xl text-gray-500">{currentWord.pronounce}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(currentWord.word); }}
                  className="mt-8 flex items-center gap-2 bg-purple-100 px-6 py-3 rounded-xl hover:bg-purple-200 transition"
                >
                  <span className="text-2xl">Speaker</span> Phát âm
                </button>
                <p className="mt-6 text-sm text-gray-400">Nhấn để lật thẻ</p>
              </div>

              {/* Mặt sau */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-10 flex flex-col justify-center items-center text-white">
                <p className="text-4xl font-bold mb-4">{currentWord.meaning}</p>
                <p className="text-lg italic text-white/90 px-6 text-center">"{currentWord.example}"</p>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(currentWord.word); }}
                  className="mt-8 flex items-center gap-2 bg-white/20 px-6 py-3 rounded-xl backdrop-blur hover:bg-white/30 transition"
                >
                  <span className="text-2xl">Speaker</span> Nghe lại
                </button>
              </div>
            </div>
          </div>

          {/* Nút điều hướng */}
          <div className="flex justify-between mb-16">
            <button
              onClick={() => { setCurrent(Math.max(0, current - 1)); setFlipped(false); }}
              disabled={current === 0}
              className="px-8 py-4 bg-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-300 transition font-medium"
            >
              Trước
            </button>
            <button
              onClick={() => { setCurrent(Math.min(words.length - 1, current + 1)); setFlipped(false); }}
              disabled={current === words.length - 1}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl disabled:opacity-50 hover:shadow-xl transition font-medium"
            >
              {current === words.length - 1 ? "Hoàn thành" : "Tiếp theo"}
            </button>
          </div>

          {/* Danh sách từ vựng theo ABC */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Tất cả từ vựng (A → Z)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedWords.map((w, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    w.word === currentWord.word ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg text-gray-800">{w.word}</p>
                      <p className="text-sm text-gray-500">{w.pronounce}</p>
                      <p className="text-sm text-purple-600 mt-1">{w.meaning}</p>
                    </div>
                    <button
                      onClick={() => speak(w.word)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      Speaker
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ĐÃ SỬA: Dùng <style> thường thay vì <style jsx> */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </>
  );
}