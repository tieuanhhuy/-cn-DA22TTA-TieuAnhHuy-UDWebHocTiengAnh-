import express from "express";
import {
  getConversationTopics,
  getConversationDetail
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/topics", getConversationTopics);
router.get("/topics/:topicId", getConversationDetail);

export default router;
