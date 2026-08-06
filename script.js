let setThemeDarkorLight = () => {
  const logo = document.querySelector(".logo img");
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.setAttribute("data-theme", "dark");
    logo.setAttribute("src", "assets/logo/ClickMind_LightLogo.png");
  } else {
    document.body.setAttribute("data-theme", "light");
    logo.setAttribute("src", "assets/logo/ClickMind_DarkLogo.png");
  }
};
setThemeDarkorLight();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function () {
    setThemeDarkorLight();
  });

let toggleTheme = () => {
  const toggleTheme = document.querySelector(".theme-btn");
  const logo = document.querySelector(".logo img");

  toggleTheme.addEventListener("click", function () {
    if (document.body.getAttribute("data-theme") === "dark") {
      document.body.setAttribute("data-theme", "light");
      logo.setAttribute("src", "assets/logo/ClickMind_DarkLogo.png");
    } else {
      document.body.setAttribute("data-theme", "dark");
      logo.setAttribute("src", "assets/logo/ClickMind_LightLogo.png");
    }
  });
};

toggleTheme();