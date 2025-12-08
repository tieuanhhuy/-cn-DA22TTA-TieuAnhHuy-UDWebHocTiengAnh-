// backend/src/test-mysql.js
const mysql = require('mysql2/promise');

async function testConnection() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',            // để trống nếu chưa đặt mật khẩu
      database: 'englishcomm'
    });

    console.log('Kết nối MySQL thành công!');
    console.log('Database: englishcomm\n');

    // Đếm người dùng
    const [users] = await connection.query('SELECT COUNT(*) as total FROM users');
    console.log(`Người dùng: ${users[0].total} người`);

    // Đếm chủ đề từ vựng
    const [vocabTopics] = await connection.query('SELECT COUNT(*) as total FROM vocabulary_topics');
    console.log(`Chủ đề từ vựng: ${vocabTopics[0].total} chủ đề`);

    // Đếm chủ đề giao tiếp
    const [convTopics] = await connection.query('SELECT COUNT(*) as total FROM conversation_topics');
    console.log(`Chủ đề giao tiếp: ${convTopics[0].total} chủ đề`);

    console.log('\nTất cả kiểm tra xong – Database sẵn sàng 100%!');

  } catch (err) {
    console.error('Kết nối thất bại:', err.message);
  } finally {
    if (connection) await connection.end();
  }
}

//CHẠY HÀM
testConnection();