import express from "express";
const router = express.Router();
import {
  
} from "../controllers/subscriberController.js";
import { moveToTrash, toggleTaskId } from "../controllers/taskController.js";

router.get("/", getHome);

router.get("/add-task", getadd);

router.post("/toggle-task/:id", toggleTaskId);

router.get("/move-to-trash/:id", moveToTrash);

router.post("/restore-from-trash/:id", );

router.post("/delete-permanently/:id", );

router.get("/trash, ");

router.get("/completed", );

router.get("/search", );



export default router;
