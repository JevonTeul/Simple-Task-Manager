// Filename: routes/taskRoutes.js
import express from "express";
const router = express.Router();
import {
  getHome,
  addTask,
  toggleTaskId,
  moveToTrash,
  restoreFromTrash,
  deletePermanently,
  trash,
  completed,
  search
} from "../controllers/taskController.js";

// Display routes
router.get("/", getHome);
router.get("/trash", trash);
router.get("/completed", completed);
router.get("/search", search);

// Action routes
router.post("/add-task", addTask);
router.post("/toggle-task/:id", toggleTaskId);
router.post("/move-to-trash/:id", moveToTrash);
router.post("/restore-from-trash/:id", restoreFromTrash);
router.post("/delete-permanently/:id", deletePermanently);

export default router;