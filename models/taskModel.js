// Filename: models/taskModel.js
import { query } from "../config/db.js";

export const getAllTasks = async () => {
  try {
    const result = await query(
      "SELECT * FROM tasks WHERE completed = false AND deleted = false ORDER BY created_at DESC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getCompletedTasks = async () => {
  try {
    const result = await query(
      "SELECT * FROM tasks WHERE completed = true AND deleted = false ORDER BY created_at DESC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    throw error;
  }
};

export const getDeletedTasks = async () => {
  try {
    const result = await query(
      "SELECT * FROM tasks WHERE deleted = true ORDER BY created_at DESC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching deleted tasks:", error);
    throw error;
  }
};

export const createTask = async (title, description) => {
  try {
    const result = await query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const toggleTaskCompletion = async (id) => {
  try {
    const result = await query(
      "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
};

export const moveToTrash = async (id) => {
  try {
    const result = await query(
      "UPDATE tasks SET deleted = true WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error moving task to trash:", error);
    throw error;
  }
};

export const restoreFromTrash = async (id) => {
  try {
    const result = await query(
      "UPDATE tasks SET deleted = false WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error restoring task from trash:", error);
    throw error;
  }
};

export const deletePermanently = async (id) => {
  try {
    await query("DELETE FROM tasks WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error permanently deleting task:", error);
    throw error;
  }
};

export const searchTasks = async (searchTerm) => {
  try {
    const result = await query(
      `SELECT * FROM tasks 
       WHERE (LOWER(title) LIKE $1 OR LOWER(description) LIKE $1) 
       AND deleted = false 
       ORDER BY created_at DESC`,
      [`%${searchTerm.toLowerCase()}%`]
    );
    return result.rows;
  } catch (error) {
    console.error("Error searching tasks:", error);
    throw error;
  }
};