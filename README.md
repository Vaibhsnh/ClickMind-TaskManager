# 🧠 ClickMind

### Personal Productivity & Task Management Dashboard

> A modern, responsive productivity and task management dashboard built with HTML, CSS and JavaScript. ClickMind allows users to create, organize, filter, edit,
> update and delete tasks while dynamically tracking task statistics, project progress and task status.

---

## 📸 Preview

## Light-Mode
<img width="1536" height="1024" alt="d25dc835-6e19-47af-9248-3839fa484b4c" src="https://github.com/user-attachments/assets/c6fffc50-8fa0-4a12-8663-256f7721c98f" />

## Dark-Mode
<img width="1536" height="1024" alt="6b4c5873-6186-4bd7-a50d-ed20fcdb3965" src="https://github.com/user-attachments/assets/5bb280bf-3d75-42e2-b9bf-d42cfebdb3f8" />

---
---

## 🚀 Live Demo

🔗 **Live Website**

 https://vaibhsnh.github.io/ClickMind-TaskManager/
---

## 📌 Overview

**ClickMind** is a frontend-based productivity dashboard designed to help users organize their daily tasks and monitor their progress through a clean and
interactive interface.

The application provides a centralized dashboard where users can:

- Create tasks
- Edit existing tasks
- Delete tasks
- Change task status
- Organize tasks into projects
- Filter tasks
- Track task statistics
- Monitor project completion
- Persist data using LocalStorage
- Switch between light and dark mode
- Use the application across desktop, tablet and mobile devices

The project was developed using **HTML5, CSS3 and Vanilla JavaScript**, with a strong focus on understanding DOM manipulation, browser rendering concepts,
event handling, event delegation and frontend state management.

---

# 🎯 Project Objective

The primary objective of ClickMind was to build a functional productivity application while understanding the fundamental concepts involved in frontend
development.

The project focuses on:

- Building a real-world interactive UI.
- Understanding how browsers process HTML and CSS.
- Working with the DOM.
- Dynamically generating UI components.
- Implementing CRUD operations.
- Using LocalStorage for data persistence.
- Handling user events.
- Understanding event propagation.
- Implementing event delegation.
- Creating responsive layouts.
- Maintaining synchronized application state.
- Building reusable JavaScript functions.

---

# ✨ Features

## 📝 Task Creation

Users can create a new task using the task creation form.

Each task contains:

- Task name
- Project category
- Task status
- Unique ID

### Available Categories

- Task Library
- Challenges

### Available Statuses

- Pending
- In Progress
- Completed

The form also validates the user's input before allowing the task to be created.

---

# ✏️ Edit Task

Users can edit an existing task using the edit button on the task card.

When the edit button is clicked:

1. The selected task is identified.
2. The task form opens.
3. Existing task information is populated.
4. The user can modify the information.
5. The existing task object is updated.
6. Updated data is stored in LocalStorage.
7. Statistics are recalculated.
8. Project progress is recalculated.
9. The current Scheduled view is refreshed.

Editing does not create a new task or generate a new task ID.

---

# 🔄 Task Status Management

Each task can have one of three statuses:

```text
Pending
   ↓
In Progress
   ↓
Completed
```

---

The task status can be changed through the task card.

Whenever the status changes, ClickMind dynamically updates:

Sidebar counts
Dashboard statistics
Project task counts
Completed task counts
Project progress
Scheduled task list
Status colors

The visual appearance of a task card also changes according to its current status.

---

# 🗑️ Delete Task

Users can delete tasks directly from the task card using the delete button.

When a task is deleted, ClickMind automatically updates the LocalStorage data, task statistics, project counts, project progress, and the currently displayed Scheduled section.

---

# 📂 Project Categories

ClickMind currently provides two project categories:

### 🩷 Task Library

A personal workspace for general productivity, learning activities, and everyday tasks.

### 💛 Challenges

A dedicated space for challenges, experiments, and goal-oriented tasks.

---

# 📊 Dynamic Statistics

ClickMind dynamically calculates and displays:

- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Project-wise task counts
- Project-wise completed task counts

All statistics are derived from the current task data stored in LocalStorage.

---

# 📈 Project Progress

Each project has its own progress indicator based on the ratio of completed tasks to total tasks belonging to that project.

The progress bar dynamically updates whenever a task is created, edited, deleted, or its status changes.

---

# 🔎 Task Filtering

ClickMind allows users to filter tasks through the sidebar and project cards.

Users can filter tasks by:

- All Tasks
- Pending
- In Progress
- Completed
- Task Library
- Challenges

The Scheduled section dynamically displays only the tasks matching the selected filter.

---

# 🗓️ Scheduled Section

The Scheduled section displays tasks according to the currently selected view.

Its heading and count dynamically change based on the selected project or task filter, while the default view displays all available tasks.

---

# 💾 LocalStorage Persistence

ClickMind uses the browser's LocalStorage API to persist task data.

This allows tasks to remain available after refreshing or reopening the page without requiring a backend database.

---

# 🖱️ Event Handling

JavaScript event listeners are used throughout ClickMind to handle user interactions such as creating, editing, deleting, filtering, and updating tasks.

These events connect user actions with the application's dynamic UI and task-management logic.

---

# 🧠 Web Fundamentals & Event Concepts

Understanding how browsers process webpages and how JavaScript handles events is an important part of frontend development.

## 1. Parsing

Parsing is the process through which the browser reads and interprets HTML and CSS source code to create structures that can be processed and rendered.

It converts the written source into a form the browser can understand.

---

## 2. Tokenization

Tokenization is the process of breaking source code into meaningful units called tokens.

These tokens are then used by the browser during parsing to understand the structure of the document.

---

## 3. DOM Tree

The DOM (Document Object Model) Tree is a hierarchical representation of the HTML document created by the browser.

It allows JavaScript to access, modify, create, and remove elements dynamically.

---

## 4. CSSOM Tree

The CSSOM (CSS Object Model) Tree represents the CSS rules processed by the browser.

It provides the styling information required to determine how HTML elements should appear on the page.

---

## 5. Render Tree

The Render Tree is created using information from the DOM Tree and CSSOM Tree.

It contains the visual information required by the browser to calculate layout and render the webpage.

---

## 6. Event Bubbling

Event Bubbling is the process in which an event propagates from the target element upward through its parent elements.

It is commonly useful for handling events on child elements through their parent containers.

---

## 7. Event Capturing

Event Capturing is the opposite direction of event propagation, where an event travels from the parent hierarchy toward the target element.

It occurs before the target phase and can be used when the order of event handling needs to be controlled.

---

## 8. Event Delegation

Event Delegation is a technique where an event listener is attached to a parent element instead of individual child elements.

It is especially useful for dynamically generated elements and works primarily through event bubbling.

---

# 🔀 Event Bubbling vs Event Capturing

| Event Bubbling | Event Capturing |
|---|---|
| Event travels from the target toward its parents. | Event travels from the parents toward the target. |
| Works during the bubbling phase. | Works during the capturing phase. |
| Commonly used with Event Delegation. | Useful when event execution order needs to be controlled. |

---
---

# 🛠️ Technical Implementation

ClickMind is built using a simple frontend architecture where task data is managed through JavaScript and persisted using LocalStorage.

The application dynamically renders the interface based on the current task data and user interactions.

---

## 🔄 CRUD Operations

ClickMind implements all four fundamental CRUD operations:

- **Create** — Add new tasks.
- **Read** — Retrieve tasks from LocalStorage.
- **Update** — Edit task information and change status.
- **Delete** — Remove tasks from the application.

---

## 🧠 Task Data Structure

Each task is represented as a JavaScript object containing the information required to render and manage it.

The main properties include:

- Unique task ID
- Task name
- Project category
- Task status

This structure allows the application to consistently manage tasks throughout the dashboard.

---

## 🔁 Dynamic UI Updates

Whenever task data changes, ClickMind updates the relevant parts of the interface automatically.

This includes:

- Task cards
- Sidebar counts
- Dashboard statistics
- Project counts
- Progress indicators
- Scheduled section

---

## 🧮 Array Methods

JavaScript array methods are used to efficiently manage task data.

- `filter()` is used for filtering and removing tasks.
- `map()` is used for updating existing tasks.
- `forEach()` is used for iterating through tasks during rendering.

---

## 🧩 DOM Manipulation

JavaScript dynamically interacts with the DOM to create and update task cards and dashboard information.

This allows the interface to respond immediately to user actions without requiring a page reload.

---

## 💾 Data Persistence

LocalStorage provides persistent client-side storage for task information.

Task data is converted to JSON before storage and parsed back into JavaScript objects when the application loads.

---

## 📱 Responsive Design

ClickMind is designed to provide a consistent experience across:

- Desktop
- Tablet
- Mobile

The layout adapts to different screen sizes using responsive CSS techniques and media queries.

---

## 🌙 Theme System

ClickMind supports both light and dark modes.

The theme system changes the visual appearance of the dashboard while maintaining the same underlying structure and functionality.

---

## 📅 Dynamic Date

The dashboard displays the current date dynamically using JavaScript rather than relying on a hard-coded date.

This ensures that the displayed date remains accurate as time progresses.

---

---

# 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

### Browser APIs

- DOM API
- LocalStorage API

### UI Resources

- Font Awesome
- CSS Variables
- Responsive CSS
- Custom assets

---

# 📁 Project Structure

```text
ClickMind/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── logo/
│   ├── videos/
│   
│
└── README.md

```

# 🌟 Project Highlights

### Functionality

- ✅ Create Tasks
- ✅ Edit Tasks
- ✅ Delete Tasks
- ✅ Update Task Status
- ✅ Filter Tasks
- ✅ Persistent LocalStorage Data
- ✅ Dynamic Task Statistics
- ✅ Dynamic Project Counts
- ✅ Dynamic Project Progress
- ✅ Dynamic Scheduled Views

### User Interface

- ✅ Modern Productivity Dashboard
- ✅ Responsive Desktop Layout
- ✅ Responsive Tablet Layout
- ✅ Responsive Mobile Layout
- ✅ Light Mode
- ✅ Dark Mode
- ✅ Status-Based Task Colors
- ✅ Rounded Task Cards
- ✅ Interactive UI Controls
- ✅ Dynamic Current Date
- ✅ Empty-State Task Layout

### JavaScript Concepts

- ✅ DOM Manipulation
- ✅ Dynamic Rendering
- ✅ LocalStorage
- ✅ JSON
- ✅ CRUD Operations
- ✅ Array Methods
- ✅ Event Handling
- ✅ Event Bubbling
- ✅ Event Capturing
- ✅ Event Delegation
- ✅ State Management
- ✅ Form Validation

---

# 🧠 Key Development Takeaways

Building ClickMind helped me understand that a functional frontend application requires more than creating a visually appealing interface.

The task data, application logic, and UI must remain synchronized whenever the user performs an action.

This project also helped connect browser fundamentals such as the DOM, CSSOM, rendering, and event propagation with practical JavaScript development.

---

# 🚧 Future Vision

ClickMind can eventually evolve from a browser-based productivity dashboard into a complete productivity platform.

Future versions could introduce:

- User authentication
- Cloud-based task storage
- Backend APIs
- MongoDB integration
- Multi-device synchronization
- Custom projects
- Task priorities
- Due dates
- Reminders
- Calendar integration
- Productivity analytics
- Notifications
- Collaborative task management
- Real-time synchronization
- Progressive Web App support

---

# 👨‍💻 Author

## Vaibhav Sinha

**MERN Stack Developer**

I enjoy building modern web applications that combine:

- Clean architecture
- Thoughtful UI
- Real-world usability
- Responsive design
- Interactive experiences

---

# ⭐ Feedback & Support

If you find ClickMind interesting, consider giving the repository a ⭐.

Feedback, suggestions, and improvements are always welcome.

---

# 📄 License

This project was created for educational, learning, and portfolio purposes.
