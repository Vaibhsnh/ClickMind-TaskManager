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
  applySystemTheme();

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      applySystemTheme();
    });

  let toggleTheme = () => {
    const toggleTheme = document.querySelector(".theme-btn");

    toggleTheme.addEventListener("click", function () {
      if (document.body.getAttribute("data-theme") === "dark") {
        document.body.setAttribute("data-theme", "light");
        logo.setAttribute("src", "assets/logo/ClickMind_DarkLogo.png");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      } else {
        document.body.setAttribute("data-theme", "dark");
        logo.setAttribute("src", "assets/logo/ClickMind_LightLogo.png");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }
    });
  };

  toggleTheme();
};

setTheme();