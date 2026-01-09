import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
  getWordsByTopic,
  createWord,
  updateWord,
  deleteWord,
  bulkCreateWords
} from "../controllers/adminWord.controller.js";

const router = express.Router();

/**
 * ===============================
 * ADMIN WORD MANAGEMENT
 * ===============================
 */

// 📌 LẤY DANH SÁCH TỪ THEO CHỦ ĐỀ
// GET /api/admin/word/topic/:topicId
router.get(
  "/topic/:topicId",
  authMiddleware,
  adminMiddleware,
  getWordsByTopic
);

// ➕ THÊM 1 TỪ
// POST /api/admin/word/topic/:topicId
router.post(
  "/topic/:topicId",
  authMiddleware,
  adminMiddleware,
  createWord
);

// 🚀 BULK INSERT (NHIỀU TỪ)
// POST /api/admin/word/bulk/:topicId
router.post(
  "/bulk/:topicId",
  authMiddleware,
  adminMiddleware,
  bulkCreateWords
);

// ✏️ SỬA TỪ
// PUT /api/admin/word/:id
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateWord
);

// ❌ XOÁ TỪ
// DELETE /api/admin/word/:id
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteWord
);

export default router;
