const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return savedTheme || (prefersDark ? "dark" : "light");
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-theme", theme);
};

export { getInitialTheme, applyTheme };