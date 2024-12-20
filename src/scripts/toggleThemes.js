// Define the elements that need to be styled based on the theme
const elementsToStyle = ['#startMenu', '#startMenuTitle', '#startMenuDescription', '#animatedText', '#topIslandUI', '#bottomIslandGuideUI', '#bottomIslandGuideText', '#bottomIslandButtonsUI', '.buttonText', 'input'];


// Function to apply the system theme
function applySystemTheme() {
  // Check the current system theme
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;

  // Apply the theme to all specified elements
  elementsToStyle.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      // Clean up existing classes
      el.classList.remove('lightMode', 'darkMode');
      if (isLightMode) {
        el.classList.add('lightMode'); // Apply light mode
      } else {
        el.classList.add('darkMode'); // Apply dark mode (if needed)
      }
    });
  });
}

// Ensure the DOM is fully loaded before applying the theme
document.addEventListener('DOMContentLoaded', () => {
  applySystemTheme();

  // Reapply theme after a short delay to catch late-rendered elements
  setTimeout(applySystemTheme, 100);
});

// Attach the function to the window object
window.applySystemTheme = applySystemTheme;

// Add an event listener for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', applySystemTheme);

// Watch for DOM changes to dynamically apply themes to new elements
const observer = new MutationObserver(() => {
  applySystemTheme();
});
observer.observe(document.body, { childList: true, subtree: true });