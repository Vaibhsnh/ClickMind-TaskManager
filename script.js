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

let formHandler = () => {
  const modalOverlay = document.querySelector(".modal-overlay");
  let initializeFormModal = () => {
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
};
formHandler();
