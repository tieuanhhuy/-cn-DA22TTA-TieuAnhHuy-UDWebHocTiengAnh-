import { db } from "../config/db.js";

/* ===== LẤY CHỦ ĐỀ CHO TRANG HỌC ===== */
export const getVocabularyTopics = async (req, res) => {
  const [rows] = await db.query(`
    SELECT t.id, t.title, t.icon,
           COUNT(tw.word_id) AS total_words
    FROM vocabulary_topics t
    LEFT JOIN topic_word tw ON t.id = tw.topic_id
    GROUP BY t.id
    ORDER BY t.id ASC
  `);

  res.json(rows);
};

/* ===== LẤY TỪ CHO TRANG HỌC ===== */
export const getWordsByTopic = async (req, res) => {
  const { topicId } = req.params;

  const [rows] = await db.query(
    `
    SELECT w.id, w.word, w.meaning_vi, w.example_en
    FROM vocabulary_words w
    JOIN topic_word tw ON w.id = tw.word_id
    WHERE tw.topic_id = ?
    ORDER BY w.id ASC
    `,
    [topicId]
  );

  res.json(rows);
};
