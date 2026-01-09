import { db } from "../config/db.js";

/* ===================================================
   1. LẤY CÂU HỎI TỪ VỰNG (Giữ nguyên logic cũ)
   - Hỏi: Tiếng Anh (Word)
   - Đáp án: Tiếng Việt (Meaning)
=================================================== */
export const getVocabularyQuestions = async (req, res) => {
  const { topicId } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT w.id, w.word, w.meaning_vi 
      FROM vocabulary_words w 
      JOIN topic_word tw ON w.id = tw.word_id 
      WHERE tw.topic_id = ? ORDER BY RAND() LIMIT 10
    `, [topicId]);

    if (rows.length === 0) return res.json([]);

    const [allMeanings] = await db.query(`SELECT meaning_vi FROM vocabulary_words`);

    const questions = rows.map(q => {
      const wrong = allMeanings.map(m => m.meaning_vi).filter(m => m !== q.meaning_vi).sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [...wrong, q.meaning_vi].sort(() => Math.random() - 0.5);
      return { id: q.id, question: q.word, options };
    });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi lấy câu hỏi từ vựng" });
  }
};

/* ===================================================
   2. LẤY CÂU HỎI GIAO TIẾP (QUAN TRỌNG: ĐÃ SỬA)
   - Nguồn: Bảng conversation_sentences (Do Admin nhập)
   - Hỏi: TIẾNG VIỆT (cột vietnamese)
   - Đáp án: TIẾNG ANH (cột english)
=================================================== */
export const getConversationQuestions = async (req, res) => {
  const { topicId } = req.params;

  try {
    // 1. Lấy 10 câu ngẫu nhiên thuộc chủ đề này
    const [sentences] = await db.query(
      `SELECT id, english, vietnamese FROM conversation_sentences WHERE topic_id = ? ORDER BY RAND() LIMIT 10`,
      [topicId]
    );

    if (sentences.length === 0) return res.json([]);

    // 2. Lấy TOÀN BỘ câu Tiếng Anh trong database để làm "đáp án nhiễu"
    const [allEnglish] = await db.query(`SELECT english FROM conversation_sentences`);

    const questions = sentences.map(s => {
      // Tìm 3 câu tiếng Anh khác để làm đáp án sai
      const wrong = allEnglish
        .map(e => e.english)
        .filter(e => e !== s.english) // Loại bỏ câu đúng
        .sort(() => 0.5 - Math.random()) 
        .slice(0, 3);

      // Gộp đáp án đúng (Tiếng Anh) và 3 đáp án sai
      const options = [...wrong, s.english].sort(() => 0.5 - Math.random());

      return {
        id: s.id,
        question: s.vietnamese, // <--- CÂU HỎI HIỂN THỊ: TIẾNG VIỆT
        options: options        // <--- LỰA CHỌN: TIẾNG ANH
      };
    });

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi lấy câu hỏi giao tiếp" });
  }
};

/* ===================================================
   3. NỘP BÀI & CHẤM ĐIỂM (LOGIC CHUẨN)
=================================================== */
export const submitPractice = async (req, res) => {
  const { type, topicId, answers, questions } = req.body; 

  if (!questions || !answers) return res.status(400).json({ message: "Dữ liệu không hợp lệ" });

  let correctCount = 0;
  let detailResult = [];

  try {
    for (let i = 0; i < questions.length; i++) {
      const qId = questions[i].id;
      const userAnsIndex = answers[i]; 
      
      let isCorrect = false;
      let correctAnswerText = "";

      // --- 1. LẤY ĐÁP ÁN ĐÚNG TỪ DB ĐỂ SO SÁNH ---
      if (type === 'vocabulary') {
          // Từ vựng: So sánh với nghĩa Tiếng Việt
          const [rows] = await db.query(`SELECT meaning_vi FROM vocabulary_words WHERE id = ?`, [qId]);
          if (rows.length > 0) correctAnswerText = rows[0].meaning_vi;
      } else {
          // Giao tiếp: SO SÁNH VỚI CÂU TIẾNG ANH (Vì người dùng chọn tiếng Anh)
          const [rows] = await db.query(`SELECT english FROM conversation_sentences WHERE id = ?`, [qId]);
          if (rows.length > 0) correctAnswerText = rows[0].english; 
      }

      // --- 2. SO SÁNH ---
      const userAnsText = questions[i].options[userAnsIndex];
      
      if (userAnsText === correctAnswerText) {
          isCorrect = true;
          correctCount++;
      }
      
      // --- 3. LƯU KẾT QUẢ ---
      questions[i].correctAnswer = correctAnswerText; 
      questions[i].userAnswerIndex = userAnsIndex;
      questions[i].isUserCorrect = isCorrect;

      detailResult.push({
          questionIndex: i,
          isCorrect,
          correctAnswer: correctAnswerText,
          userSelected: userAnsText || "Chưa chọn"
      });
    }

    const total = questions.length;
    const score = total > 0 ? Math.round((correctCount / total) * 10) : 0;
    const snapshotData = JSON.stringify(questions);

    // Lưu vào bảng practice_results
    await db.query(
      `INSERT INTO practice_results (user_id, type, topic_id, score, total_questions, correct_count, details) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, type, topicId, score, total, correctCount, snapshotData]
    );

    res.json({ score, total, correctCount, detailResult });

  } catch (error) {
    console.error("Lỗi nộp bài:", error);
    res.status(500).json({ message: "Lỗi server khi nộp bài" });
  }
};

/* ===== 4. LẤY TIẾN ĐỘ (Không đổi) ===== */
export const getProgress = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, 
              CASE 
                  WHEN p.type = 'vocabulary' THEN vt.title 
                  WHEN p.type = 'conversation' THEN ct.title 
              END as topic_title
       FROM practice_results p
       LEFT JOIN vocabulary_topics vt ON p.type = 'vocabulary' AND p.topic_id = vt.id
       LEFT JOIN conversation_topics ct ON p.type = 'conversation' AND p.topic_id = ct.id
       WHERE p.user_id = ?
       ORDER BY p.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi lấy tiến độ" });
  }
};

/* ===== 5. LẤY CHI TIẾT BÀI LÀM (Không đổi) ===== */
export const getPracticeDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`SELECT * FROM practice_results WHERE id = ? AND user_id = ?`, [id, req.user.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Không tìm thấy bài làm" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};