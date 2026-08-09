let currentFilter = {
  type: "all",
  value: "all",
};

let editingTaskId = null;

let setTheme = () => {
  const logo = document.querySelector(".logo img");
  const themeIcon = document.querySelector(".theme-btn i");

  let darkThemeProp = () => {
    logo.setAttribute("src", "assets/logo/ClickMind_LightLogo.png");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  };

  let lightThemeProp = () => {
    logo.setAttribute("src", "assets/logo/ClickMind_DarkLogo.png");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  };

  let applySystemTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.setAttribute("data-theme", "dark");
      darkThemeProp();
    } else {
      document.body.setAttribute("data-theme", "light");
      lightThemeProp();
    }
  };

  if (localStorage.getItem("theme")) {
    document.body.setAttribute(
      "data-theme",
      `${localStorage.getItem("theme")}`,
    );
    if (document.body.getAttribute("data-theme") === "dark") {
      darkThemeProp();
    } else {
      lightThemeProp();
    }
  } else {
    applySystemTheme();
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      if (!localStorage.getItem("theme")) {
        applySystemTheme();
      }
    });

  let toggleTheme = () => {
    const toggleTheme = document.querySelector(".theme-btn");

    toggleTheme.addEventListener("click", function () {
      if (document.body.getAttribute("data-theme") === "dark") {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        lightThemeProp();
      } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        darkThemeProp();
      }
    });
  };

  toggleTheme();
};
setTheme();

let initializeSidebar = () => {
  const menuBtn = document.querySelector(".menu-btn");
  const sideBar = document.querySelector(".sidebar");
  menuBtn.addEventListener("click", function () {
    sideBar.classList.toggle("active");
  });
  window.addEventListener("click", function (evt) {
    if (
      sideBar.classList.contains("active") &&
      !sideBar.contains(evt.target) &&
      !menuBtn.contains(evt.target)
    ) {
      sideBar.classList.remove("active");
    }
  });

  window.addEventListener("scroll", function () {
    if (sideBar.classList.contains("active")) {
      sideBar.classList.remove("active");
    }
  });
};
initializeSidebar();

const modalOverlay = document.querySelector(".modal-overlay");
const taskForm = document.querySelector(".task-form");
let initializeFormModal = () => {
  taskForm.reset();

  // Remove previously selected category
  const activeProjectOption = document.querySelector(".project-option.active");

  if (activeProjectOption) {
    activeProjectOption.classList.remove("active");
  }

  // Remove previously selected status
  const activeStatusOption = document.querySelector(".status-option.active");

  if (activeStatusOption) {
    activeStatusOption.classList.remove("active");
  }
  modalOverlay.style.display = "flex";
};

let removeFormModal = () => {
  modalOverlay.style.display = "none";
};

let activeForm = () => {
  const addNewTask = document.querySelectorAll(".add-new-task-btn");

  addNewTask.forEach((button) => {
    button.addEventListener("click", () => {
      initializeFormModal();
    });
  });
};
activeForm();

let closeActiveForm = () => {
  const closeForm = document.querySelectorAll(".close-form");

  closeForm.forEach((button) => {
    button.addEventListener("click", () => {
      removeFormModal();
    });
  });
};
closeActiveForm();

let deleteTask = (taskId) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== Number(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskStats();
  showFilteredTasks(currentFilter.type, currentFilter.value);
};

let toggleTaskStatus = (taskId) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.map((task) => {
    if (task.id === Number(taskId)) {
      if (task.status === "pending") {
        task.status = "in-progress";
      } else if (task.status === "in-progress") {
        task.status = "completed";
      } else {
        task.status = "pending";
      }
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskStats();
  showFilteredTasks(currentFilter.type, currentFilter.value);
};

let openEditForm = (task) => {
  const taskNameInput = document.querySelector(".task-name-input");

  const projectCategory = document.querySelector(".project-options");

  const projectStatus = document.querySelector(".status-options");

  const saveTaskBtn = document.querySelector(".save-btn");

  // Tell the form that we are editing
  editingTaskId = task.id;

  // Fill task name
  taskNameInput.value = task.taskName;

  // Remove previous selections
  projectCategory.querySelectorAll(".project-option").forEach((button) => {
    button.classList.remove("active");
  });

  projectStatus.querySelectorAll(".status-option").forEach((button) => {
    button.classList.remove("active");
  });

  // Select category
  const categoryButton =
    task.category === "task-library"
      ? projectCategory.querySelector(".task-library")
      : projectCategory.querySelector(".challenges");

  categoryButton.classList.add("active");

  // Select status
  let statusButton;

  if (task.status === "pending") {
    statusButton = projectStatus.querySelector(".pending");
  } else if (task.status === "in-progress") {
    statusButton = projectStatus.querySelector(".progress");
  } else {
    statusButton = projectStatus.querySelector(".completed");
  }

  statusButton.classList.add("active");

  // Change button text
  saveTaskBtn.textContent = "Update Task";

  // Open modal
  modalOverlay.style.display = "flex";
};

// Create and append a task card
let renderTaskCard = (task) => {
  const scheduledList = document.querySelector(".schedule-list");
  const taskCard = document.createElement("div");

  taskCard.classList.add("task-card");
  taskCard.setAttribute("data-status", task.status);
  taskCard.setAttribute("data-id", task.id);

  let categoryName;
  if (task.category === "task-library") {
    categoryName = "Task Library";
  } else {
    categoryName = "Challenges";
  }

  let statusName;
  if (task.status === "pending") {
    statusName = "Pending";
  } else if (task.status === "in-progress") {
    statusName = "In Progress";
  } else {
    statusName = "Completed";
  }

  taskCard.innerHTML = `
    <div class="task-header">

      <p class="task-project">
        Project : <span>${categoryName}</span>
      </p>

      <div class="task-actions">

        <button class="status-btn ${task.status}">
          <span class="status-dot"></span>
          <span class="status-text">${statusName}</span>
        </button>

        <button class="icon-btn edit-btn">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button class="icon-btn complete-btn">
          <i class="fa-regular fa-square"></i>
        </button>

        <button class="icon-btn delete-btn">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>

    </div>

    <h3 class="task-title">${task.taskName}</h3>
  `;

  scheduledList.prepend(taskCard);

  const editBtn = taskCard.querySelector(".edit-btn");

  editBtn.addEventListener("click", () => {
    openEditForm(task);
  });

  const completeBtn = taskCard.querySelector(".complete-btn");

  completeBtn.addEventListener("click", () => {
    toggleTaskStatus(task.id);
  });

  const deleteBtn = taskCard.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
  });
};

let updateTaskStats = () => {
  // Get tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // TOTAL TASKS

  const totalTasks = tasks.length;

  // TASK LIBRARY

  const libraryTasks = tasks.filter((task) => task.category === "task-library");
  const libraryTotal = libraryTasks.length;
  const libraryCompleted = libraryTasks.filter(
    (task) => task.status === "completed",
  ).length;

  // CHALLENGES

  const challengeTasks = tasks.filter((task) => task.category === "challenges");
  const challengeTotal = challengeTasks.length;
  const challengeCompleted = challengeTasks.filter(
    (task) => task.status === "completed",
  ).length;

  // STATUS COUNTS
  const pendingTotal = tasks.filter((task) => task.status === "pending").length;

  const inProgressTotal = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const completedTotal = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  // PROGRESS PERCENTAGES

  const libraryProgressPercentage =
    libraryTotal === 0 ? 0 : (libraryCompleted / libraryTotal) * 100;

  const challengeProgressPercentage =
    challengeTotal === 0 ? 0 : (challengeCompleted / challengeTotal) * 100;

  // HTML ELEMENTS

  const totalTasksCount = document.querySelector(".total-tasks-count"); //t
  const statsProgressCount = document.querySelector(".stats-progress-count"); //t
  const statsCompletedCount = document.querySelector(".stats-completed-count"); //t
  const allTasksCount = document.querySelector(".all-tasks-count"); //t
  const libraryCount = document.querySelector(".task-library-count"); //t
  const challengesCount = document.querySelector(".challenges-count"); //t
  const pendingCount = document.querySelector(".pending-count"); //t
  const statsPendingCount = document.querySelector(".stats-pending-count"); //t
  const inProgressCount = document.querySelector(".in-progress-count"); //t
  const doneCount = document.querySelector(".done-count"); //t
  const libraryTotalCount = document.querySelector(".library-total-count"); //t
  const libraryCompletedCount = document.querySelector(
    ".library-completed-count",
  ); //t
  const challengeTotalCount = document.querySelector(".challenges-total-count"); //t
  const challengeCompletedCount = document.querySelector(
    ".challenges-completed-count",
  ); //t
  const libraryProgress = document.querySelector(".library-progress"); //t
  const challengeProgress = document.querySelector(".challenges-progress"); //t

  // UPDATE COUNTS

  totalTasksCount.textContent = totalTasks;
  statsProgressCount.textContent = inProgressTotal;
  statsCompletedCount.textContent = completedTotal;
  allTasksCount.textContent = totalTasks;
  libraryCount.textContent = libraryTotal;
  challengesCount.textContent = challengeTotal;
  pendingCount.textContent = pendingTotal;
  statsPendingCount.textContent = pendingTotal;
  inProgressCount.textContent = inProgressTotal;
  doneCount.textContent = completedTotal;
  libraryTotalCount.textContent = libraryTotal;
  libraryCompletedCount.textContent = libraryCompleted;
  challengeTotalCount.textContent = challengeTotal;
  challengeCompletedCount.textContent = challengeCompleted;

  // UPDATE PROGRESS BARS

  libraryProgress.style.width = `${libraryProgressPercentage}%`;
  challengeProgress.style.width = `${challengeProgressPercentage}%`;
};

let showFilteredTasks = (filterType, filterValue) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const scheduleList = document.querySelector(".schedule-list");
  const scheduledTitle = document.querySelector(".scheduled-title");

  let filteredTasks = [];

  if (filterType === "all") {
    filteredTasks = tasks;

    scheduledTitle.textContent = `Scheduled (${filteredTasks.length})`;
  } else if (filterType === "category") {
    filteredTasks = tasks.filter((task) => task.category === filterValue);

    const categoryName =
      filterValue === "task-library" ? "Task Library" : "Challenges";

    scheduledTitle.textContent = `Scheduled → ${categoryName} (${filteredTasks.length})`;
  } else if (filterType === "status") {
    filteredTasks = tasks.filter((task) => task.status === filterValue);

    const statusName =
      filterValue === "pending"
        ? "Pending"
        : filterValue === "in-progress"
          ? "In Progress"
          : "Completed";

    scheduledTitle.textContent = `Scheduled → ${statusName} (${filteredTasks.length})`;
  }

  scheduleList.innerHTML = "";
  filteredTasks.forEach((task) => {
    renderTaskCard(task);
  });
};

let loadTasks = () => {
  updateTaskStats();
  showFilteredTasks("all", "all");
};
loadTasks();

let initializeSidebarFilters = () => {
  const sidebarFilters = document.querySelectorAll(".sidebar-filter");

  sidebarFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const filterType = filter.dataset.filterType;
      const filterValue = filter.dataset.filter;

      currentFilter.type = filterType;
      currentFilter.value = filterValue;

      console.log("Clicked:", filter);
      console.log("Filter Type:", filterType);
      console.log("Filter Value:", filterValue);
      console.log("Current Filter:", currentFilter);

      showFilteredTasks(filterType, filterValue);
    });
  });
};
initializeSidebarFilters();

let initializeProjectCards = () => {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;

      currentFilter.type = "category";
      currentFilter.value = category;

      showFilteredTasks("category", category);
    });
  });
};
initializeProjectCards();

let formHandler = () => {
  const taskNameInput = document.querySelector(".task-name-input");
  const taskNameRegex =
    /^(?=.*[a-zA-Z])[a-zA-Z0-9][a-zA-Z0-9\s'.,!?()_-]{2,99}$/;
  const errorMessage = document.querySelectorAll(".form-error");

  const projectCategory = document.querySelector(".project-options");
  const projectStatus = document.querySelector(".status-options");

  projectCategory.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".project-option");
    const activeButton = projectCategory.querySelector(
      ".project-option.active",
    );

    if (!activeButton) {
      clickedButton.classList.add("active");
    } else {
      activeButton.classList.remove("active");
      clickedButton.classList.add("active");
    }
  });

  projectStatus.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".status-option");
    const activeButton = projectStatus.querySelector(".status-option.active");

    if (!activeButton) {
      clickedButton.classList.add("active");
    } else {
      activeButton.classList.remove("active");
      clickedButton.classList.add("active");
    }
  });

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = taskNameInput.value;
    let taskNameIsvalid = taskNameRegex.test(taskName);

    const prjCategorySelected = document.querySelector(
      ".project-option.active",
    );

    const prjStatusSelected = document.querySelector(".status-option.active");

    if (!taskNameIsvalid || !taskName.trim()) {
      errorMessage[0].style.display = "initial";
    } else {
      errorMessage[0].style.display = "none";
    }

    if (!prjCategorySelected) {
      errorMessage[1].style.display = "initial";
    } else {
      errorMessage[1].style.display = "none";
    }

    if (!prjStatusSelected) {
      errorMessage[2].style.display = "initial";
    } else {
      errorMessage[2].style.display = "none";
    }

    if (
      taskNameIsvalid &&
      taskName.trim() &&
      prjCategorySelected &&
      prjStatusSelected
    ) {
      const task = {
        id: Date.now(),
        taskName: taskName.trim(),
        category: prjCategorySelected.classList.contains("task-library")
          ? "task-library"
          : "challenges",
        status: prjStatusSelected.classList.contains("pending")
          ? "pending"
          : prjStatusSelected.classList.contains("progress")
            ? "in-progress"
            : "completed",
      };

      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      if (editingTaskId === null) {
        // CREATE NEW TASK

        const task = {
          id: Date.now(),
          taskName: taskName.trim(),

          category: prjCategorySelected.classList.contains("task-library")
            ? "task-library"
            : "challenges",

          status: prjStatusSelected.classList.contains("pending")
            ? "pending"
            : prjStatusSelected.classList.contains("progress")
              ? "in-progress"
              : "completed",
        };

        tasks.push(task);
      } else {
        // UPDATE EXISTING TASK

        tasks = tasks.map((task) => {
          if (task.id === editingTaskId) {
            return {
              ...task,

              taskName: taskName.trim(),

              category: prjCategorySelected.classList.contains("task-library")
                ? "task-library"
                : "challenges",

              status: prjStatusSelected.classList.contains("pending")
                ? "pending"
                : prjStatusSelected.classList.contains("progress")
                  ? "in-progress"
                  : "completed",
            };
          }

          return task;
        });
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
      updateTaskStats();
      showFilteredTasks(currentFilter.type, currentFilter.value);
      removeFormModal();
    }
  });
};
formHandler();
