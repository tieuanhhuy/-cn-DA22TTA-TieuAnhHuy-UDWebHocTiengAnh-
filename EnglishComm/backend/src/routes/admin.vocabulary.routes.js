import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import topicUpload from "../middleware/topicUpload.js";

import {
  getTopicsWithCount,
  createTopic,
  updateTopic,
  deleteTopic
} from "../controllers/adminVocabulary.controller.js";

const router = express.Router();

/* ===== GET ALL TOPICS ===== */
router.get(
  "/topics",
  authMiddleware,
  adminMiddleware,
  getTopicsWithCount
);

/* ===== CREATE ===== */
router.post(
  "/topics",
  authMiddleware,
  adminMiddleware,
  topicUpload.single("icon"),
  createTopic
);

/* ===== UPDATE ===== */
router.put(
  "/topics/:id",
  authMiddleware,
  adminMiddleware,
  topicUpload.single("icon"),
  updateTopic
);

/* ===== DELETE ===== */
router.delete(
  "/topics/:id",
  authMiddleware,
  adminMiddleware,
  deleteTopic
);

export default router;
