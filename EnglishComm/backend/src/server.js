// backend/src/server.js
const express = require('express');
const cors = require('cors');

require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const vocabularyRoutes = require('./routes/vocabulary');
const conversationRoutes = require('./routes/conversation');

app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/conversation', conversationRoutes);

// Test
app.get('/', (req, res) => {
  res.json({
    message: "EnglishComm Backend chạy mượt!",
    apis: [
      "/api/vocabulary/topics",
      "/api/conversation/topics",
      "/api/conversation/topic/1"
    ]
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server chạy tại: http://localhost:${PORT}`);
});