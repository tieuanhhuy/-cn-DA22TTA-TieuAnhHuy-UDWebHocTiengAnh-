import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { 
    getVocabularyQuestions, 
    getConversationQuestions, 
    submitPractice,   // Import hàm nộp bài
    getProgress,
    getPracticeDetail 
} from "../controllers/practice.controller.js";

const router = express.Router();

// 1. Lấy câu hỏi
router.get("/vocabulary/:topicId", authMiddleware, getVocabularyQuestions);
router.get("/conversation/:topicId", authMiddleware, getConversationQuestions);

// 2. Nộp bài (Quan trọng)
router.post("/submit", authMiddleware, submitPractice);

// 3. Xem lịch sử
router.get("/progress", authMiddleware, getProgress);
router.get("/review/:id", authMiddleware, getPracticeDetail);

export default router;