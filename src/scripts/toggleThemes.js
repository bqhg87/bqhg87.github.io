const elementsToStyle = ['startMenu', 'startMenuTitle', 'startMenuDescription'];

function applySystemTheme() {
  const isLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  elementsToStyle.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (isLightMode) {
        el.classList.add('lightMode');  // Add the 'lightMode' class if in light mode
      } else {
        el.classList.remove('lightMode');  // Remove the 'lightMode' class if not in light mode
      }
    }
  });
}

// Event listener
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', applySystemTheme);

// Apply the theme on page load
applySystemTheme();