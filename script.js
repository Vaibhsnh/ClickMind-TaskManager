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
};

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
    console.log(taskName);

    const prjCategorySelected = document.querySelector(
      ".project-option.active",
    );
    console.log("ProjectCategory->", prjCategorySelected);

    const prjStatusSelected = document.querySelector(".status-option.active");
    console.log("ProjectStatus->", prjStatusSelected);

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
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTaskCard(task);
      console.log(tasks);
      removeFormModal();
    }
  });
};
formHandler();
