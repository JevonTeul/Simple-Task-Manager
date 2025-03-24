# Task Management Web App

A simple task management web application built with **Node.js**, **Express**, **EJS**, and **CSS**. This app allows users to manage tasks, mark them as completed, move them to a trash system, and restore or permanently delete them.

---

## **Features**

1. **Add Tasks**: Add new tasks with a title and optional description.
2. **Toggle Completion**: Mark tasks as completed or incomplete.
3. **Move to Trash**: Move tasks to a trash system.
4. **Restore from Trash**: Restore tasks from the trash.
5. **Permanently Delete**: Permanently delete tasks from the trash.
6. **View Completed Tasks**: View a list of completed tasks.
7. **Search Tasks**: Search for tasks by title or description (server-side).

---

## **Technologies Used**

- **Backend**: Node.js, Express
- **Frontend**: EJS (for server-side rendering), HTML, CSS
- **Styling**: Custom CSS with a playful and colorful design
- **Data Storage**: In-memory arrays (no database)

---

## **Setup Instructions**

### **Prerequisites**
- Node.js installed on your machine.
- A terminal or command prompt

---

### **Steps to Run the App**

1. **Install dependencies**
- npm install express ejs

2. **Start the Server**
- node server.js

3. **Open Browser**
- Open your browser and go to http://localhost:3000

---

## Project Structure
task-management-app/
├── views/                # EJS templates
│   ├── index.ejs         # Main page with task list and forms
│   ├── trash.ejs         # Trash page
│   └── completed.ejs     # Completed tasks page
├── public/               # Static files (CSS)
│   └── styles.css        # Custom CSS for styling
├── server.js             # Main server file
└── README.md             # Project documentation


**Link to Demo Video**
- https://youtu.be/kT5WPWrHvqk
