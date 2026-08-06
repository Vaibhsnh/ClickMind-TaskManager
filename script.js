let setTheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
  }
};
setTheme();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function () {
    setTheme();
  });

const toggleTheme = document.querySelector(".theme-btn");

toggleTheme.addEventListener("click", function () {
  if (document.body.getAttribute("data-theme")=== "dark") {
    document.body.setAttribute("data-theme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
  }
});
