import { db } from "../config/db.js";

export const bulkCreateWords = async (req, res) => {
  const { topicId } = req.params;
  const { words } = req.body;

  if (!Array.isArray(words) || words.length === 0) {
    return res.status(400).json({ message: "Danh sách từ không hợp lệ" });
  }

  try {
    for (const w of words) {
      // 1. insert từ
      const [result] = await db.query(
        `INSERT INTO vocabulary_words (word, meaning_vi, example_en)
         VALUES (?, ?, ?)`,
        [w.word, w.meaning_vi, w.example_en || null]
      );

      const wordId = result.insertId;

      // 2. map với topic
      await db.query(
        `INSERT INTO topic_word (topic_id, word_id)
         VALUES (?, ?)`,
        [topicId, wordId]
      );
    }

    res.json({ message: "Bulk insert success", total: words.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= GET WORDS BY TOPIC ================= */
export const getWordsByTopic = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Load words failed" });
  }
};

/* ================= CREATE WORD ================= */
export const createWord = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { word, meaning_vi, example_en } = req.body;

    // 1️⃣ thêm từ
    const [result] = await db.query(
      `
      INSERT INTO vocabulary_words (word, meaning_vi, example_en)
      VALUES (?, ?, ?)
      `,
      [word, meaning_vi, example_en]
    );

    const wordId = result.insertId;

    // 2️⃣ gán từ vào chủ đề
    await db.query(
      `
      INSERT INTO topic_word (topic_id, word_id)
      VALUES (?, ?)
      `,
      [topicId, wordId]
    );

    res.json({ message: "Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create word failed" });
  }
};

/* ================= UPDATE WORD ================= */
export const updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { word, meaning_vi, example_en } = req.body;

    await db.query(
      `
      UPDATE vocabulary_words
      SET word = ?, meaning_vi = ?, example_en = ?
      WHERE id = ?
      `,
      [word, meaning_vi, example_en, id]
    );

    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================= DELETE WORD ================= */
export const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(`DELETE FROM topic_word WHERE word_id = ?`, [id]);
    await db.query(`DELETE FROM vocabulary_words WHERE id = ?`, [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};
