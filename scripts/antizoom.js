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