import express from "express";
import {
  getVocabularyTopics,
  getWordsByTopic
} from "../controllers/vocabulary.controller.js";

const router = express.Router();

router.get("/topics", getVocabularyTopics);
router.get("/topics/:topicId/words", getWordsByTopic);

export default router;

