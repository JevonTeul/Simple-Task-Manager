// Filename: server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add JSON parsing middleware

// Serve static files from public directory
app.use(express.static(new URL("./public", import.meta.url).pathname));

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", new URL("./views", import.meta.url).pathname);

// Custom logging middleware
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};
app.use(loggingMiddleware);

// Routes middleware
app.use("/", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", { 
    message: "404 Not Found",
    error: {}
  });
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Task Manager running at http://localhost:${PORT}/`);
});