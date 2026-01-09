import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  getConversationTopics,
  createConversationTopic,
  updateConversationTopic,
  deleteConversationTopic,
  getSentencesByTopic,
  createSentence,
  updateSentence,
  deleteSentence
} from "../controllers/adminConversation.controller.js";

const router = express.Router();

/* ===== TOPICS ===== */
router.get("/topics", authMiddleware, adminMiddleware, getConversationTopics);
router.post("/topics", authMiddleware, adminMiddleware, createConversationTopic);
router.put("/topics/:id", authMiddleware, adminMiddleware, updateConversationTopic);
router.delete("/topics/:id", authMiddleware, adminMiddleware, deleteConversationTopic);

/* ===== SENTENCES ===== */
router.get("/topics/:topicId/sentences", authMiddleware, adminMiddleware, getSentencesByTopic);
router.post("/topics/:topicId/sentences", authMiddleware, adminMiddleware, createSentence);
router.put("/sentences/:id", authMiddleware, adminMiddleware, updateSentence);
router.delete("/sentences/:id", authMiddleware, adminMiddleware, deleteSentence);

export default router;
