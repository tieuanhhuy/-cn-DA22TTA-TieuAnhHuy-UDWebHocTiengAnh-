import { db } from "../config/db.js";

/* ===== GET ALL CONVERSATION TOPICS ===== */
export const getConversationTopics = async (req, res) => {
  const [rows] = await db.query(`
    SELECT 
      id, title, description, youtube_url, total_sentences
    FROM conversation_topics
    ORDER BY id
  `);
  res.json(rows);
};

/* ===== GET SENTENCES BY TOPIC ===== */
export const getConversationDetail = async (req, res) => {
  const { topicId } = req.params;

  const [sentences] = await db.query(
    `
    SELECT 
      english,
      vietnamese,
      grammar_note,
      order_num
    FROM conversation_sentences
    WHERE topic_id = ?
    ORDER BY order_num
    `,
    [topicId]
  );

  const [[topic]] = await db.query(
    `SELECT title, youtube_url FROM conversation_topics WHERE id = ?`,
    [topicId]
  );

  res.json({
    id: topicId,
    title: topic.title,
    youtube_url: topic.youtube_url,
    transcript: sentences
  });
};
