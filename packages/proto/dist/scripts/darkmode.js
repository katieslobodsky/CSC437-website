// scripts/darkmode.js

// Selectors
const checkbox = document.getElementById("theme-checkbox");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  if (checkbox) checkbox.checked = true;
} else {
  body.classList.remove("dark-mode");
  if (checkbox) checkbox.checked = false;
}

// Relay event function
function relayDarkModeEvent(event) {
  event.stopPropagation();

  const dark = event.target.checked;
  const toggleEvent = new CustomEvent("darkmode:toggle", {
    bubbles: true,
    detail: { darkMode: dark },
  });

  event.currentTarget.dispatchEvent(toggleEvent);
}

// Attach listener to <label> or checkbox container
if (checkbox) {
  const label = checkbox.closest("label") || checkbox;
  label.onchange = relayDarkModeEvent;
}

// Listen for the custom darkmode event on the body
body.addEventListener("darkmode:toggle", (event) => {
  const dark = event.detail.darkMode;
  body.classList.toggle("dark-mode", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
});
