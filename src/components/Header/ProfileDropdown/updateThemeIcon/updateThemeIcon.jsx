// HTML должен включать элемент для значка темы, например:
// <button id="theme-toggle-button" aria-label="Change theme">
//   <span id="theme-icon"></span>
// </button>

// Функция для смены значка темы в зависимости от выбранной темы
function updateThemeIcon(currentTheme) {
  const themeIcon = document.getElementById("theme-icon");

  // Очистить текущий значок
  themeIcon.innerHTML = "";

  // Установить новый значок в зависимости от темы
  switch (currentTheme) {
    case "dark":
      themeIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a9 9 0 1 0 9 9c0-.5-.05-.99-.14-1.47a1 1 0 0 0-1.28-.78A7 7 0 1 1 13.25 4.4a1 1 0 0 0 .78-1.28A9.04 9.04 0 0 0 12 2z"/>
        </svg>`;
      break;
    case "light":
      themeIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm6 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-1.06 7.06a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 0 1-1.41-1.41l1.42-1.42a1 1 0 0 1 1.41 0zm-9.88 0a1 1 0 0 1 1.41 0l1.42 1.42a1 1 0 0 1-1.41 1.41l-1.42-1.42a1 1 0 0 1 0-1.41zM4 13H2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm18 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zM6.34 6.34a1 1 0 0 1 1.41 0l1.42 1.42a1 1 0 0 1-1.41 1.41L6.34 7.75a1 1 0 0 1 0-1.41zm11.32 0a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 0 1-1.41-1.41l1.42-1.42a1 1 0 0 1 1.41 0z"/>
        </svg>`;
      break;
    case "system":
      themeIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zM12 7a5 5 0 0 0-4 8h8a5 5 0 0 0-4-8z"/>
        </svg>`;
      break;
    default:
      console.error("Unknown theme: " + currentTheme);
  }
}

// Функция для переключения темы
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  let newTheme;

  if (currentTheme === "light") {
    newTheme = "dark";
  } else if (currentTheme === "dark") {
    newTheme = "system";
  } else {
    newTheme = "light";
  }

  body.setAttribute("data-theme", newTheme);
  updateThemeIcon(newTheme);
}

// Установить начальную тему (по умолчанию system)
const initialTheme = document.body.getAttribute("data-theme") || "system";
document.body.setAttribute("data-theme", initialTheme);
updateThemeIcon(initialTheme);

// Назначить обработчик события кнопке переключения темы
document.getElementById("theme-toggle-button").addEventListener("click", toggleTheme);
