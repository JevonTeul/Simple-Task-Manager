import { getAllSignups, addSignup } from "../models/subscriberModel.js";

export const getHome = (req, res) => {
    res.render('index', { tasks });
  };

export const addtask = (req, res) => {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).send('Title is required');
    }
    const newTask = {
      id: idCounter++,
      title,
      description: description || '',
      completed: false,
    };
    tasks.push(newTask);
    res.redirect('/');
  };

export const toggleTaskId = (req, res) => {
    const taskId = parseInt(req.params.id);
  
    // Check if the task is in the active tasks array
    let taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      const [task] = tasks.splice(taskIndex, 1); 
      task.completed = true;
      completedTasks.push(task); 
    } else {
      
      taskIndex = completedTasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        const [task] = completedTasks.splice(taskIndex, 1); 
        task.completed = false;
        tasks.push(task); 
      } else {
        return res.status(404).send('Task not found');
      }
    }
  
    res.redirect('/');
  };


  export const moveToTrash = (req, res) => {
    const taskId = parseInt(req.params.id);
  
    
    let taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      const [task] = tasks.splice(taskIndex, 1); 
      trash.push(task); 
    } else {
      
      taskIndex = completedTasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        const [task] = completedTasks.splice(taskIndex, 1); 
        trash.push(task); 
      } else {
        return res.status(404).send('Task not found');
      }
    }
  
    res.redirect('/');
  };

export const restoreFromTrash = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = trash.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).send('Task not found in trash');
    }
    const [task] = trash.splice(taskIndex, 1); 
    if (task.completed) {
      completedTasks.push(task); 
    } else {
      tasks.push(task); 
    }
    res.redirect('/trash');
  };


  export const 
  