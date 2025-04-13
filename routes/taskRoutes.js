// Filename: routes/taskRoutes.js
import express from "express";
const router = express.Router();
import {
  getHome,
  addTask,
  toggleTaskCompletion,
  deleteTask,
  updateTask,
  trash,
  completed,
  search,
  restoreFromTrash,
  deletePermanently
} from "../controllers/taskController.js";

// Display routes
router.get("/", getHome);
router.get("/trash", trash);
router.get("/completed", completed);
router.get("/search", search);

// Action routes - Updated to match requirements
router.post("/tasks", addTask);              
router.patch("/tasks/:id", toggleTaskCompletion);  
router.delete("/tasks/:id", deleteTask);     
router.put("/tasks/:id", updateTask);        

// Keep these as they are (not in requirements but useful)
router.post("/restore-from-trash/:id", restoreFromTrash);
router.post("/delete-permanently/:id", deletePermanently);

export default router;