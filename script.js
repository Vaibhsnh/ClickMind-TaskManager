let setTheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
  }
};
setTheme();