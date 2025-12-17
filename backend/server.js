import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import suggestionsRoutes from "./routes/suggestions.js";
import hospitalsRoutes from "./routes/hospitals.js"; // Import new hospitals route
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

// Middleware
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? true
//         : ["http://localhost:5173", "http://localhost:5174"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://checking-frontend-17g6iyxiw-anirudhvasudev23s-projects.vercel.app",
            "https://checking-frontend.vercel.app", // Add your production domain
            /\.vercel\.app$/, // Allow all Vercel preview deployments
          ]
        : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/suggestions", suggestionsRoutes);
app.use("/api/hospitals", hospitalsRoutes); // Use new hospitals route

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle SPA routing - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
} else {
  // 404 handler for development
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});