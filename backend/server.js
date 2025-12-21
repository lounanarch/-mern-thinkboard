
import express from "express";
import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { apiRateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiter
app.use(apiRateLimiter);

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api/notes", notesRoutes);

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

