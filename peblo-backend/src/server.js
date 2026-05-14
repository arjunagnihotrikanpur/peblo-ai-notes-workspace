import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI missing");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET missing");
}

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Middleware
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Peblo Backend Running",
  });
});

// Error Handling Middleware Routes
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
