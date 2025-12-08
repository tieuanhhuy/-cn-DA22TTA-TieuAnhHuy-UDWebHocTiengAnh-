// backend/src/routes/conversation.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Lấy danh sách chủ đề giao tiếp
router.get('/topics', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM conversation_topics ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy chi tiết 1 chủ đề + tất cả câu
router.get('/topic/:id', async (req, res) => {
  try {
    const [topic] = await pool.query('SELECT * FROM conversation_topics WHERE id = ?', [req.params.id]);
    const [sentences] = await pool.query('SELECT * FROM conversation_sentences WHERE topic_id = ? ORDER BY order_num', [req.params.id]);

    if (topic.length === 0) return res.status(404).json({ error: "Không tìm thấy chủ đề" });

    res.json({
      ...topic[0],
      transcript: sentences
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;