import { db } from "../config/db.js";

/* ================= GET TOPICS + COUNT WORDS ================= */
export const getTopicsWithCount = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        t.id,
        t.title,
        t.icon,
        COUNT(tw.word_id) AS total_words
      FROM vocabulary_topics t
      LEFT JOIN topic_word tw ON t.id = tw.topic_id
      GROUP BY t.id
      ORDER BY t.id DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CREATE TOPIC ================= */
export const createTopic = async (req, res) => {
  try {
    const { title } = req.body;
    const icon = req.file ? req.file.filename : null;

    if (!title) {
      return res.status(400).json({ message: "Thiếu tên chủ đề" });
    }

    await db.query(
      "INSERT INTO vocabulary_topics (title, icon) VALUES (?, ?)",
      [title, icon]
    );

    res.json({ message: "Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE TOPIC ================= */
export const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const icon = req.file ? req.file.filename : null;

    if (icon) {
      await db.query(
        "UPDATE vocabulary_topics SET title=?, icon=? WHERE id=?",
        [title, icon, id]
      );
    } else {
      await db.query(
        "UPDATE vocabulary_topics SET title=? WHERE id=?",
        [title, id]
      );
    }

    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE TOPIC ================= */
export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM vocabulary_topics WHERE id=?", [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
