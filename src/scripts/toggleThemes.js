// Define the elements that need to be styled based on the theme
const elementsToStyle = ['startMenu', 'startMenuTitle', 'startMenuDescription', 'animatedText', 'topIslandUI', 'bottomIslandGuideUI', 'bottomIslandGuideText'];

// Define the applySystemTheme function
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

// Attach the function to the window object to make it global
window.applySystemTheme = applySystemTheme;

// Add an event listener to automatically apply the theme when the system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', applySystemTheme);

// Apply the theme on page load
applySystemTheme();