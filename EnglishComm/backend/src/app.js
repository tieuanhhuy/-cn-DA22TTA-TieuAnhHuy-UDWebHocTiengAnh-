import express from "express";
import cors from "cors";

// Import các routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import vocabularyRoutes from "./routes/vocabulary.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import adminVocabularyRoutes from "./routes/admin.vocabulary.routes.js";
import adminWordRoutes from "./routes/adminWord.routes.js";
import adminConversationRoutes from "./routes/adminConversation.routes.js";

// Import Practice Routes (Quan trọng)
import practiceRoutes from "./routes/practice.routes.js"; 

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/admin/vocabulary", adminVocabularyRoutes);
app.use("/api/admin/word", adminWordRoutes);
app.use("/api/admin/conversation", adminConversationRoutes);

// Đăng ký route practice vào đường dẫn /api/practice
app.use("/api/practice", practiceRoutes);

app.get("/", (req, res) => {
  res.send("EnglishComm API is running");
});

export default app;