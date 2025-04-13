# Task Management Web App
A clean and minimalistic task manager built with Node.js, Express, EJS, and PostgreSQL. Users can create tasks with priorities, mark them as complete, move them to trash, restore, permanently delete, and search—all in a simple and colorful UI.

---

## **Features**

1. **Add Tasks**: Add new tasks with a title and optional description.
2. **Toggle Completion**: Mark tasks as completed or incomplete.
3. **Move to Trash**: Move tasks to a trash system.
4. **Restore from Trash**: Restore tasks from the trash.
5. **Permanently Delete**: Permanently delete tasks from the trash.
6. **View Completed Tasks**: View a list of completed tasks.
7. **Search Tasks**: Search for tasks by title or description (server-side).
8. **Priority on Tasks**: Sort or visually distinguish tasks by priority

---

## **Technologies Used**

- **Backend**: Node.js, Express
- **Frontend**: EJS (for server-side rendering), HTML, CSS
- **Styling**: Custom CSS with a playful and colorful design
- **Data Storage**: PostgreSQL database

---

## **Setup Instructions**

### **Prerequisites**
- Node.js installed on your machine.
- A terminal or command prompt

### **Steps to Run the App**

1. **Required npm packages (installed via npm install):**

    - express – Web framework
    - ejs – Templating engine
    - pg – PostgreSQL client for Node.js
    - method-override – Enables HTTP verbs like PUT and DELETE in forms
    - dotenv – Loads environment variables from .env file
    - nodemon – Development tool that auto-restarts the server on file changes (optional for dev)

    -use can install them with `npm install express ejs pg method-override dotenv`, 
    `npm install -g nodemon`

2. **Creating the Database**:

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK (priority IN ('High', 'Medium', 'Low')) DEFAULT 'Medium',
  completed BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

3. **env file structure**
DB_HOST=localhost
DB_USER=task_manager
DB_PASSWORD=task101
DB_NAME=task_manager
DB_PORT=5432


4. **Start the Server**
- `npm start` after installing all dependencies

3. **Open Browser**
- Open your browser and go to http://localhost:3000

---

## Project Structure
task-management-app/
├── config/
│   └── db.js                # PostgreSQL database connection
├── controllers/
│   └── taskController.js    # Task logic/handlers
├── models/
│   └── taskModel.js         # Database queries and logic
├── public/
│   └── styles.css           # Custom styling
├── routes/
│   └── taskRoutes.js        # App routes
├── utils/
│   └── methodOverride.js    # Middleware to support PUT/DELETE via POST
├── views/
│   ├── partials/            # Header and footer partials
│   │   ├── footer.ejs
│   │   └── header.ejs
│   ├── completed.ejs        # Completed tasks view
│   ├── error.ejs            # Error page
│   ├── index.ejs            # Main task view
│   └── trash.ejs            # Trash view
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js                # Main server entry point



**Link to Demo Video**
- 
