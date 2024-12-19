// Define the elements that need to be styled based on the theme
const elementsToStyle = ['#startMenu', '#startMenuTitle', '#startMenuDescription', '#animatedText', '#topIslandUI', '#bottomIslandGuideUI', '#bottomIslandGuideText', '#bottomIslandButtonsUI', '.buttonText'];

// Define the applySystemTheme function
function applySystemTheme() {
  // Check the current system theme
  const isLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  // Loop through all selectors and apply the appropriate class
  elementsToStyle.forEach(selector => {
    const elements = document.querySelectorAll(selector); // Handle both IDs and classes
    elements.forEach(el => {
      if (isLightMode) {
        el.classList.add('lightMode'); // Add the 'lightMode' class if in light mode
      } else {
        el.classList.remove('lightMode'); // Remove the 'lightMode' class if not in light mode
      }
    });
  });
}

// Ensure the DOM is fully loaded before applying the theme
document.addEventListener('DOMContentLoaded', () => {
  applySystemTheme();
});

// Attach the function to the window object to make it global
window.applySystemTheme = applySystemTheme;

// Add an event listener to automatically apply the theme when the system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', applySystemTheme);