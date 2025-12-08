// backend/src/config/database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',                 // để trống nếu bạn chưa đặt mật khẩu MySQL
  database: 'englishcomm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// In ra để biết kết nối thành công
pool.getConnection()
  .then(conn => {
    console.log('Kết nối MySQL thành công! Database: englishcomm');
    conn.release();
  })
  .catch(err => {
    console.error('Kết nối MySQL thất bại:', err.message);
  });

module.exports = pool;