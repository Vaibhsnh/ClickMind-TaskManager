let setTheme = () => {
  const logo = document.querySelector(".logo img");
  const themeIcon = document.querySelector(".theme-btn i");

  let applySystemTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.setAttribute("data-theme", "dark");
      logo.setAttribute("src", "assets/logo/ClickMind_LightLogo.png");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      document.body.setAttribute("data-theme", "light");
      logo.setAttribute("src", "assets/logo/ClickMind_DarkLogo.png");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  };

  if (localStorage.getItem("theme")) {
    document.body.setAttribute(
      "data-theme",
      `${localStorage.getItem("theme")}`,
    );
    if (document.body.getAttribute("data-theme") === "dark") {
      logo.setAttribute("src", "assets/logo/ClickMind_LightLogo.png");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      logo.setAttribute("src", "assets/logo/ClickMind_DarkLogo.png");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
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

        logo.setAttribute("src", "assets/logo/ClickMind_DarkLogo.png");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      } else {
        document.body.setAttribute("data-theme", "dark");

        localStorage.setItem("theme", "dark");

        logo.setAttribute("src", "assets/logo/ClickMind_LightLogo.png");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
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
