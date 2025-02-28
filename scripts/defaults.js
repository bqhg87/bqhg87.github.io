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

document.getElementById("resetGame").addEventListener("click", function() {
  const confirmation = confirm("Are you sure you would like to reset the game? This will reset all your progress.");
  
  if (confirmation) {
      window.char.x = 40;
      window.char.y = -94;
      // Retain charAppearance before clearing
      const charAppearance = JSON.parse(localStorage.getItem('charAppearance'));

      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Clear cookies (optional)
      document.cookie.split(";").forEach(cookie => {
          document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/");
      });

      // Restore charAppearance after clearing
      if (charAppearance) {
          localStorage.setItem('charAppearance', JSON.stringify(charAppearance));
      }

      // Ensure charMemory is reset with new values
      const initialCharMemory = JSON.parse(localStorage.getItem('charMemory') || '{}');
      initialCharMemory.x = 40;
      initialCharMemory.y = -94;
      localStorage.setItem('charMemory', JSON.stringify(initialCharMemory));

      // Force a hard refresh (bypasses cache)
      location.reload(true);
  }
});