// backend/src/routes/vocabulary.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// API lấy tất cả chủ đề từ vựng
router.get('/topics', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vocabulary_topics ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('Lỗi:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

module.exports = router;