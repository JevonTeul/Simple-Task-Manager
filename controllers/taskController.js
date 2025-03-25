// Filename: controllers/taskController.js
import { 
  getAllTasks,
  getCompletedTasks,
  getDeletedTasks,
  createTask,
  toggleTaskCompletion,
  moveToTrash as dbMoveToTrash,
  restoreFromTrash as dbRestoreFromTrash,
  deletePermanently as dbDeletePermanently,
  searchTasks
} from "../models/taskModel.js";

export const getHome = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.render('index', { tasks });
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to load tasks' });
  }
};

export const addTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).send('Title is required');
  }
  
  try {
    await createTask(title, description);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to add task' });
  }
};

export const toggleTaskId = async (req, res) => {
  try {
    await toggleTaskCompletion(req.params.id);
    res.redirect('back');
  } catch (err) {
    res.status(404).send('Task not found');
  }
};

export const moveToTrash = async (req, res) => {
  try {
    await dbMoveToTrash(req.params.id);
    res.redirect('back');
  } catch (err) {
    res.status(404).send('Task not found');
  }
};

export const restoreFromTrash = async (req, res) => {
  try {
    await dbRestoreFromTrash(req.params.id);
    res.redirect('/trash');
  } catch (err) {
    res.status(404).send('Task not found in trash');
  }
};

export const deletePermanently = async (req, res) => {
  try {
    await dbDeletePermanently(req.params.id);
    res.redirect('/trash');
  } catch (err) {
    res.status(404).send('Task not found in trash');
  }
};

export const trash = async (req, res) => {
  try {
    const trash = await getDeletedTasks();
    res.render('trash', { trash });
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to load trash' });
  }
};

export const completed = async (req, res) => {
  try {
    const completedTasks = await getCompletedTasks();
    res.render('completed', { completedTasks });
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to load completed tasks' });
  }
};

export const search = async (req, res) => {
  try {
    const tasks = await searchTasks(req.query.query);
    res.render('index', { tasks });
  } catch (err) {
    res.status(500).render('error', { message: 'Search failed' });
  }
};