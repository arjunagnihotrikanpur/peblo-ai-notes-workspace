import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";

export const getDashboardStats = asyncHandler(async (req, res) => {
  // TOTAL NOTES
  const totalNotes = await Note.countDocuments({
    user: req.user._id,
    archived: false,
  });

  // RECENT NOTES
  const recentNotes = await Note.find({
    user: req.user._id,
    archived: false,
  })
    .sort({ updatedAt: -1 })
    .limit(5);

  // MOST USED TAGS
  const tagsAggregation = await Note.aggregate([
    {
      $match: {
        user: req.user._id,
        archived: false,
      },
    },

    {
      $unwind: "$tags",
    },

    {
      $group: {
        _id: "$tags",
        count: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        count: -1,
      },
    },

    {
      $limit: 5,
    },
  ]);

  // AI USAGE COUNT
  const aiUsageCount = await Note.countDocuments({
    user: req.user._id,

    aiSummary: {
      $ne: "",
    },
  });

  // WEEKLY ACTIVITY
  const oneWeekAgo = new Date();

  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const weeklyActivity = await Note.countDocuments({
    user: req.user._id,

    updatedAt: {
      $gte: oneWeekAgo,
    },
  });

  res.json({
    totalNotes,
    recentNotes,
    mostUsedTags: tagsAggregation,
    aiUsageCount,
    weeklyActivity,
  });
});
