import express from "express"
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// In-memory task storage
let tasks = []; 
let completedTasks = [];
let trash = []; 
let idCounter = 1;

// Routes

// GET / - Display the main page with tasks and a form
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

// POST /add-task - Add a new task
app.post('/add-task', (req, res) => {
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
});

// Toggle the completed status of a task
app.post('/toggle-task/:id', (req, res) => {
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
});

// Move a task to the trash
app.post('/move-to-trash/:id', (req, res) => {
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
});

// Restore a task from the trash
app.post('/restore-from-trash/:id', (req, res) => {
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
});

// Permanently delete a task from the trash
app.post('/delete-permanently/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  trash = trash.filter((t) => t.id !== taskId); 
  res.redirect('/trash');
});

// GET /trash - Display the trash
app.get('/trash', (req, res) => {
  res.render('trash', { trash });
});

// GET /completed - Display completed tasks
app.get('/completed', (req, res) => {
  res.render('completed', { completedTasks });
});

// GET /search - Search for tasks by title or description
app.get('/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query) || 
      task.description.toLowerCase().includes(query)
  );
  res.render('index', { tasks: filteredTasks }); 
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});