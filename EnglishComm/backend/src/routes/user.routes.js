import express from "express";
import { updateProfile } from "../controllers/user.controller.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.put(
  "/profile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);

export default router;
