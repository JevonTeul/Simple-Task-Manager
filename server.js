import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import taskRoutes from "./routes/taskRoutes.js";
import methodOverride from "./utils/methodOverride.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Static files
app.use(express.static(path.join(__dirname, "public")));

// 2. Body parsers (MUST come first)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Our custom method override
app.use(methodOverride);

// 4. Enhanced debug middleware
app.use((req, res, next) => {
  console.log('\n--- REQUEST DEBUG ---');
  console.log('Method:', req.method);
  if (req.originalMethod) {
    console.log('Original Method:', req.originalMethod);
  }
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  next();
});

// 5. View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 6. Routes
app.use("/", taskRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('ERROR:', err.stack);
  res.status(500).render("error", { 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

app.use((req, res) => {
  res.status(404).render("error", { 
    message: "404 Not Found",
    error: {}
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Custom method override middleware is active');
});