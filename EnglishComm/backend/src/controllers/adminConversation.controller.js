import { db } from "../config/db.js";

/* ===== TOPICS ===== */
export const getConversationTopics = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, title, description, youtube_url FROM conversation_topics ORDER BY id DESC"
  );
  res.json(rows);
};

export const createConversationTopic = async (req, res) => {
  const { title, description, youtube_url } = req.body;
  await db.query(
    "INSERT INTO conversation_topics (title, description, youtube_url) VALUES (?,?,?)",
    [title, description, youtube_url]
  );
  res.json({ message: "Created" });
};

export const updateConversationTopic = async (req, res) => {
  const { id } = req.params;
  const { title, description, youtube_url } = req.body;
  await db.query(
    "UPDATE conversation_topics SET title=?, description=?, youtube_url=? WHERE id=?",
    [title, description, youtube_url, id]
  );
  res.json({ message: "Updated" });
};

export const deleteConversationTopic = async (req, res) => {
  await db.query("DELETE FROM conversation_topics WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
};

/* ===== SENTENCES ===== */
export const getSentencesByTopic = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, english, vietnamese, grammar_note, order_num FROM conversation_sentences WHERE topic_id=? ORDER BY order_num",
    [req.params.topicId]
  );
  res.json(rows);
};

export const createSentence = async (req, res) => {
  const { english, vietnamese, grammar_note } = req.body;
  await db.query(
    "INSERT INTO conversation_sentences (topic_id, english, vietnamese, grammar_note) VALUES (?,?,?,?)",
    [req.params.topicId, english, vietnamese, grammar_note]
  );
  res.json({ message: "Created" });
};

export const updateSentence = async (req, res) => {
  const { english, vietnamese, grammar_note } = req.body;
  await db.query(
    "UPDATE conversation_sentences SET english=?, vietnamese=?, grammar_note=? WHERE id=?",
    [english, vietnamese, grammar_note, req.params.id]
  );
  res.json({ message: "Updated" });
};

export const deleteSentence = async (req, res) => {
  await db.query("DELETE FROM conversation_sentences WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
};
