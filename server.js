// Filename: server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Get the current module's directory path
const modulePath = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files using relative path from project root
app.use(express.static(new URL("./public", import.meta.url).pathname));

// Set view engine and views directory using import.meta.url
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

app.use((req, res) => {
  res.status(404).render("error", { message: "404 Not Found" });
});

// Server startup
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Task Manager running at http://localhost:${PORT}/`);
});