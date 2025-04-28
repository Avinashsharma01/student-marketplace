import express from "express";
import { sendMessage, getMessages, markAsRead } from "../controllers/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All message routes are protected (require authentication)
router.post("/send", protect, sendMessage);
router.get("/", protect, getMessages);
router.put("/:id/read", protect, markAsRead);

export default router; 