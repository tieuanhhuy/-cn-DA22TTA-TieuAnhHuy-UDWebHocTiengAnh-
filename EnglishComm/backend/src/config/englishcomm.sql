-- ===============================
-- DATABASE: ENGLISHCOMM
-- ===============================
DROP DATABASE IF EXISTS englishcomm;
CREATE DATABASE englishcomm
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE englishcomm;

-- ===============================
-- 1. USERS
-- ===============================
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  avatar VARCHAR(255) DEFAULT 'default-avatar.png',
  points INT DEFAULT 0,
  level INT DEFAULT 1,
  streak INT DEFAULT 0,
  last_active DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@englishcomm.com', '$2b$10$hashdemo', 'admin');

-- ===============================
-- 2. VOCABULARY TOPICS
-- ===============================
CREATE TABLE vocabulary_topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 3. VOCABULARY WORDS
-- ===============================
CREATE TABLE vocabulary_words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word VARCHAR(100) NOT NULL UNIQUE,
  meaning_vi VARCHAR(255) NOT NULL,
  example_en VARCHAR(255),
  phonetic VARCHAR(100) NULL,      -- cache IPA (optional)
  audio_url VARCHAR(255) NULL,     -- cache audio (optional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 4. TOPIC - WORD RELATION (M:N)
-- ===============================
CREATE TABLE topic_word (
  topic_id INT NOT NULL,
  word_id INT NOT NULL,
  PRIMARY KEY (topic_id, word_id),
  FOREIGN KEY (topic_id) REFERENCES vocabulary_topics(id) ON DELETE CASCADE,
  FOREIGN KEY (word_id) REFERENCES vocabulary_words(id) ON DELETE CASCADE
);

-- ===============================
-- 5. CONVERSATION TOPICS
-- ===============================
CREATE TABLE conversation_topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  youtube_url VARCHAR(500),
  total_sentences INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 6. CONVERSATION SENTENCES
-- ===============================
CREATE TABLE conversation_sentences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic_id INT NOT NULL,
  english TEXT NOT NULL,
  vietnamese TEXT NOT NULL,
  grammar_note TEXT,
  keywords JSON,
  order_num INT DEFAULT 0,
  FOREIGN KEY (topic_id) REFERENCES conversation_topics(id) ON DELETE CASCADE
);

-- ===============================
-- 7. USER VOCABULARY PROGRESS
-- ===============================
CREATE TABLE user_vocabulary_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  word_id INT NOT NULL,
  learned BOOLEAN DEFAULT FALSE,
  correct_count INT DEFAULT 0,
  wrong_count INT DEFAULT 0,
  last_review DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (word_id) REFERENCES vocabulary_words(id) ON DELETE CASCADE
);

-- ===============================
-- 8. USER CONVERSATION PROGRESS
-- ===============================
CREATE TABLE user_conversation_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  topic_id INT NOT NULL,
  completed_sentences INT DEFAULT 0,
  total_score INT DEFAULT 0,
  best_score INT DEFAULT 0,
  attempts INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  last_practice TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (topic_id) REFERENCES conversation_topics(id) ON DELETE CASCADE
);

-- ===============================
-- 9. PRACTICE HISTORY
-- ===============================
CREATE TABLE practice_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('vocabulary', 'conversation') NOT NULL,
  topic_id INT NULL,
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  wrong_answers INT NOT NULL,
  score INT NOT NULL,
  practiced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===============================
-- 10. FEEDBACK
-- ===============================
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  name VARCHAR(100),
  email VARCHAR(100),
  message TEXT NOT NULL,
  type ENUM('bug', 'suggestion', 'content_error', 'other') DEFAULT 'suggestion',
  status ENUM('new', 'reading', 'resolved') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ===============================
-- 11. NOTIFICATIONS
-- ===============================
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('reminder', 'streak', 'new_content', 'other') DEFAULT 'reminder',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE practice_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('vocabulary', 'conversation') NOT NULL,
  topic_id INT NOT NULL,
  score INT DEFAULT 0,            -- Điểm số (ví dụ: 8/10)
  total_questions INT DEFAULT 0,  -- Tổng số câu
  correct_count INT DEFAULT 0,    -- Số câu đúng
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Conversation Topics
INSERT INTO conversation_topics (title, description, youtube_url, total_sentences) VALUES
('Giới thiệu bản thân', 'Học giới thiệu tên, tuổi, quê quán',
 'https://youtu.be/BFhYKuT1Gvw', 5);

