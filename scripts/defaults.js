// Prevent pinch-to-zoom and trackpad zoom
document.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  }, { passive: false });
  
// Prevent gesture-based zooming (e.g., on MacOS)
document.addEventListener('gesturestart', (event) => {
  event.preventDefault();
});

document.addEventListener('gesturechange', (event) => {
  event.preventDefault();
});

document.addEventListener('gestureend', (event) => {
  event.preventDefault();
});

document.body.addEventListener('contextmenu', (event) => {
  // Check if there is selected text
  const selectedText = window.getSelection().toString();
  if (!selectedText) {
    // Prevent the default context menu if no text is selected
    event.preventDefault();
  }
});