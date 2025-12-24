
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";
import path from "path"

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Apply rate limiter middleware
app.use(apiRateLimiter);

// Enable CORS for frontend


if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Routes
app.use("/api/notes", notesRoutes);
app.use(express.static(path.join(__dirname,"../frontend")))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend")));

  app.get("*" , (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "App.jsx"));
  });
}
// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
