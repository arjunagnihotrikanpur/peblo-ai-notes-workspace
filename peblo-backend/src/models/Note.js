import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Note",
    },

    content: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    archived: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    shareId: {
      type: String,
      default: null,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    aiActionItems: [
      {
        type: String,
      },
    ],

    aiSuggestedTitle: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.index({
  title: "text",
  content: "text",
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
