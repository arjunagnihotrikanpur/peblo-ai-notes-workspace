import Note from "../models/Note.js";
import { generateNoteInsights } from "../services/aiService.js";
import { nanoid } from "nanoid";
import asyncHandler from "express-async-handler";

// CREATE NOTE
export const createNote = asyncHandler(async (req, res) => {
  const note = await Note.create({
    user: req.user._id,
    title: req.body.title || "Untitled Note",
    content: req.body.content || "",
    tags: req.body.tags || [],
  });

  res.status(201).json(note);
});

// GET ALL USER NOTES
export const getNotes = asyncHandler(async (req, res) => {
  const { search, tag, sort } = req.query;

  let query = {
    user: req.user._id,
    archived: false,
  };

  // SEARCH
  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        content: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // TAG FILTER
  if (tag) {
    query.tags = tag;
  }

  // SORTING
  let sortOption = {
    updatedAt: -1,
  };

  if (sort === "oldest") {
    sortOption = {
      updatedAt: 1,
    };
  }

  if (sort === "title") {
    sortOption = {
      title: 1,
    };
  }

  const notes = await Note.find(query).sort(sortOption);

  res.json(notes);
});

// GET SINGLE NOTE
export const getSingleNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.json(note);
});

// UPDATE NOTE
export const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  note.tags = req.body.tags || note.tags;

  const updatedNote = await note.save();

  res.json(updatedNote);
});

// ARCHIVE NOTE
export const archiveNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  note.archived = true;

  await note.save();

  res.json({
    message: "Note archived",
  });
});

// AI SUMMARY
export const generateAISummary = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  const aiResult = await generateNoteInsights(note.content);

  note.aiSummary = aiResult.summary;

  note.aiActionItems = aiResult.action_items;

  note.aiSuggestedTitle = aiResult.suggested_title;

  await note.save();

  res.json({
    message: "AI insights generated",
    summary: note.aiSummary,
    action_items: note.aiActionItems,
    suggested_title: note.aiSuggestedTitle,
  });
});

// Public sharing feature controller
export const generateShareLink = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  note.isPublic = true;

  note.shareId = nanoid(10);

  await note.save();

  res.json({
    message: "Share link generated",
    shareId: note.shareId,
    publicUrl: `/shared/${note.shareId}`,
  });
});

export const getSharedNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    shareId: req.params.shareId,
    isPublic: true,
  }).select("-user");

  if (!note) {
    return res.status(404).json({
      message: "Shared note not found",
    });
  }

  res.json(note);
});
