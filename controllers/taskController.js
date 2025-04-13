// Filename: controllers/taskController.js
import { 
  getAllTasks,
  getCompletedTasks,
  getDeletedTasks,
  createTask,
  toggleTaskCompletion as dbToggleTaskCompletion,
  moveToTrash as dbMoveToTrash,
  restoreFromTrash as dbRestoreFromTrash,
  deletePermanently as dbDeletePermanently,
  searchTasks,
  updateTaskFields
} from "../models/taskModel.js";

// Helper function for validation
const validateTaskInput = (title, description) => {
  const errors = [];
  
  if (!title || title.trim().length < 3 || title.length > 100) {
    errors.push("Title must be between 3 and 100 characters");
  }
  
  if (description && description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }
  
  return errors;
};

export const getHome = async (req, res) => {
  try {
    const filter = req.query.filter;
    let tasks;
    
    if (filter) {
      tasks = await getFilteredTasks(filter);
    } else {
      tasks = await getAllTasks();
    }
    
    res.render('index', { 
      tasks,
      filter,
      searchQuery: req.query.query || '', // Add this line
      success: req.query.success,
      error: req.query.error,
      formData: {}
    });
  } catch (err) {
    console.error("Error in getHome:", err);
    res.status(500).render('error', { 
      message: 'Failed to load tasks',
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};

export const addTask = async (req, res) => {
  const { title, description, priority } = req.body;
  
  // Server-side validation
  const validationErrors = validateTaskInput(title, description);
  
  if (validationErrors.length > 0) {
    try {
      const tasks = await getAllTasks();
      return res.render('index', {
        tasks,
        error: validationErrors.join(', '),
        formData: { title, description, priority },
        filter: req.query.filter,
        searchQuery: req.query.query
      });
    } catch (err) {
      console.error("Error in addTask validation:", err);
      return res.status(500).render('error', {
        message: 'Failed to validate task',
        error: process.env.NODE_ENV === "development" ? err : {}
      });
    }
  }
  
  try {
    await createTask(title.trim(), description?.trim(), priority);
    res.redirect('/?success=Task added successfully');
  } catch (err) {
    console.error("Error in addTask:", err);
    res.status(500).render('error', { 
      message: 'Failed to add task',
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};

export const toggleTaskCompletion = async (req, res) => {
  try {
      await dbToggleTaskCompletion(req.params.id);
      res.redirect(req.get('referer') || '/'); 
  } catch (err) {
      console.error("Error in toggleTaskCompletion:", err);
      res.status(500).render('error', { 
          message: 'Failed to update task status',
          error: process.env.NODE_ENV === "development" ? err : {}
      });
  }
};

export const deleteTask = async (req, res) => {
  try {
      await dbMoveToTrash(req.params.id);
      res.redirect(req.get('referer') || '/');  
  } catch (err) {
      console.error("Error in deleteTask:", err);
      res.status(500).render('error', { 
          message: 'Failed to delete task',
          error: process.env.NODE_ENV === "development" ? err : {}
      });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority } = req.body;
  
  // Server-side validation
  const validationErrors = validateTaskInput(title, description);
  
  if (validationErrors.length > 0) {
    try {
      const tasks = await getAllTasks();
      return res.render('index', {
        tasks,
        error: validationErrors.join(', '),
        formData: { title, description, priority }
      });
    } catch (err) {
      console.error("Error in updateTask validation:", err);
      return res.status(500).render('error', {
        message: 'Failed to validate task update',
        error: process.env.NODE_ENV === "development" ? err : {}
      });
    }
  }
  
  try {
    await updateTaskFields(id, title.trim(), description?.trim(), priority);
    res.redirect('/');
  } catch (err) {
    console.error("Error in updateTask:", err);
    res.status(500).render('error', { 
      message: 'Failed to update task',
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};

export const restoreFromTrash = async (req, res) => {
  try {
    await dbRestoreFromTrash(req.params.id);
    res.redirect('/trash');
  } catch (err) {
    console.error("Error in restoreFromTrash:", err);
    res.status(404).render('error', { 
      message: 'Task not found in trash',
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};

export const deletePermanently = async (req, res) => {
  try {
    await dbDeletePermanently(req.params.id);
    res.redirect('/trash');
  } catch (err) {
    console.error("Error in deletePermanently:", err);
    res.status(404).render('error', { 
      message: 'Task not found in trash',
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};

export const trash = async (req, res) => {
  try {
    const trash = await getDeletedTasks();
    res.render('trash', { 
      trash,
      success: req.query.success,
      error: req.query.error
    });
  } catch (err) {
    console.error("Error in trash:", err);
    res.status(500).render('error', { 
      message: 'Failed to load trash',
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};

export const completed = async (req, res) => {
  try {
    const completedTasks = await getCompletedTasks();
    res.render('completed', { 
      completedTasks,
      success: req.query.success,
      error: req.query.error
    });
  } catch (err) {
    console.error("Error in completed:", err);
    res.status(500).render('error', { 
      message: 'Failed to load completed tasks',
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};

export const search = async (req, res) => {
  const query = req.query.query?.trim();
  
  if (!query || query.length < 2) {
    return res.redirect('/?error=Search term must be at least 2 characters');
  }
  
  try {
    const tasks = await searchTasks(query);
    res.render('index', { 
      tasks,
      searchQuery: query, // This is already correct
      formData: {},
      filter: null,
      success: null,
      error: null
    });
  } catch (err) {
    console.error("Error in search:", err);
    res.status(500).render('error', { 
      message: 'Search failed',
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};