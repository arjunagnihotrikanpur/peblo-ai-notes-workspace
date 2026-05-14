import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  archiveNote,
  generateAISummary,
  generateShareLink,
  getSharedNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", protect, createNote);

router.get("/", protect, getNotes);

router.post("/:id/ai", protect, generateAISummary);

router.post("/:id/share", protect, generateShareLink);

router.get("/shared/:shareId", getSharedNote);

router.get("/:id", protect, getSingleNote);

router.patch("/:id", protect, updateNote);

router.delete("/:id", protect, archiveNote);

export default router;
