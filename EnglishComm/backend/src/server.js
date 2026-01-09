// src/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== STATIC FILES (AVATAR, IMAGE) =====
// avatar
app.use(
  "/avatars",
  express.static(path.join(__dirname, "../public/avatars"))
);

// topic images
app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images"))
);

// ===== START SERVER =====
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
