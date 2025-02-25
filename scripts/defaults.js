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
  const selectedText = window.getSelection().toString();
  const target = event.target;

  // Allow context menu if the target is an <a> element or if there is selected text
  if (target.tagName.toLowerCase() === 'a' || selectedText) {
    return; // Don't prevent the default context menu
  }

  // Prevent the default context menu if no text is selected and it's not an <a> element
  event.preventDefault();
});