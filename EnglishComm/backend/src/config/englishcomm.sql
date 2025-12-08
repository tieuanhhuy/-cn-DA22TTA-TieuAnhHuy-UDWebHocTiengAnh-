-- Tạo database
DROP DATABASE IF EXISTS englishcomm;
CREATE DATABASE IF NOT EXISTS englishcomm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE englishcomm;

-- 1. Người dùng
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(500) DEFAULT 'default-avatar.png',
  points INT DEFAULT 0,
  level INT DEFAULT 1,
  streak INT DEFAULT 0,
  last_active DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Chủ đề từ vựng
CREATE TABLE vocabulary_topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  total_words INT DEFAULT 0
);

-- 3. Từ vựng
CREATE TABLE vocabulary_words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic_id INT,
  english VARCHAR(255) NOT NULL,
  vietnamese VARCHAR(255) NOT NULL,
  pronunciation VARCHAR(255),
  example_en TEXT,
  example_vi TEXT,
  image VARCHAR(500),
  audio_url VARCHAR(500),
  FOREIGN KEY (topic_id) REFERENCES vocabulary_topics(id) ON DELETE CASCADE
);

-- 4. Chủ đề giao tiếp
CREATE TABLE conversation_topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  youtube_url VARCHAR(500),
  total_sentences INT DEFAULT 0
);

-- 5. Câu giao tiếp
CREATE TABLE conversation_sentences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic_id INT,
  english TEXT NOT NULL,
  vietnamese TEXT NOT NULL,
  grammar_note TEXT,
  keywords JSON,
  order_num INT DEFAULT 0,
  FOREIGN KEY (topic_id) REFERENCES conversation_topics(id) ON DELETE CASCADE
);

-- 6. Tiến độ học từ vựng của user
CREATE TABLE user_vocabulary_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  word_id INT,
  learned BOOLEAN DEFAULT FALSE,
  correct_count INT DEFAULT 0,
  wrong_count INT DEFAULT 0,
  last_review DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (word_id) REFERENCES vocabulary_words(id) ON DELETE CASCADE
);

-- 7. Tiến độ học giao tiếp của user
CREATE TABLE user_conversation_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  topic_id INT,
  completed_sentences INT DEFAULT 0,
  total_score INT DEFAULT 0,
  best_score INT DEFAULT 0,
  attempts INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  last_practice TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (topic_id) REFERENCES conversation_topics(id) ON DELETE CASCADE
);

-- 8. Lịch sử làm bài Practice (có số câu đúng/sai)
CREATE TABLE practice_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  type ENUM('vocabulary', 'conversation') NOT NULL,
  topic_id INT NULL,
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  wrong_answers INT NOT NULL,
  score INT NOT NULL,
  practiced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 9. Người dùng gửi góp ý / báo lỗi
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

-- 10. Thông báo nhắc học
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('reminder', 'streak', 'new_content', 'other') DEFAULT 'reminder',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- DỮ LIỆU MẪU (test ngay)
INSERT INTO users (username, email, password, points) VALUES
('lisa123', 'lisa@gmail.com', '123456', 1200),
('john', 'john@gmail.com', '123456', 850);

INSERT INTO vocabulary_topics (title, description, icon, total_words) VALUES
('Du lịch', 'Từ vựng du lịch cơ bản', 'traveling.png', 4),
('Dịch vụ', 'Từ vựng liên quan đến trao đổi mua bán', 'services.png', 2);

INSERT INTO conversation_topics (title, description, youtube_url, total_sentences) VALUES
('Giới thiệu bản thân', 'Học giới thiệu tên, tuổi, quê quán', 'https://youtu.be/BFhYKuT1Gvw', 5);