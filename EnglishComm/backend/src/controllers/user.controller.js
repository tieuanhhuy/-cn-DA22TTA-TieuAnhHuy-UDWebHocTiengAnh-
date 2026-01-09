import bcrypt from "bcrypt";
import { db } from "../config/db.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, password } = req.body;

    // avatar mới nếu có upload
    const avatar = req.file ? req.file.filename : null;

    let passwordChanged = false;

    // ===== UPDATE PASSWORD (NẾU CÓ) =====
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, userId]
      );
      passwordChanged = true;
    }

    // ===== UPDATE USERNAME + AVATAR =====
    if (avatar) {
      await db.query(
        "UPDATE users SET username = ?, avatar = ? WHERE id = ?",
        [username, avatar, userId]
      );
    } else {
      await db.query(
        "UPDATE users SET username = ? WHERE id = ?",
        [username, userId]
      );
    }

    // ===== LẤY USER MỚI NHẤT TỪ DB (BẮT BUỘC) =====
    const [rows] = await db.query(
      "SELECT id, username, email, avatar, role, points, level FROM users WHERE id = ?",
      [userId]
    );

    res.json({
      message: "Profile updated successfully",
      passwordChanged,
      user: rows[0], // 👈 avatar MỚI nằm ở đây
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update profile failed" });
  }
};
