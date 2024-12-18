const GuideUI = document.getElementById('bottomIslandGuideUI');
const GuideText = document.getElementById('bottomIslandGuideText');

// Function to detect input type and set the appropriate guide text
function updateGuide(guideType) {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const hasKeyboard = 'onkeydown' in window;

  if (guideType === 'continue') {
    if (isTouchDevice) {
      GuideText.textContent = 'Swipe to continue...';
    } else if (hasKeyboard) {
      GuideText.textContent = 'Press space to continue...';
    } else {
      GuideText.textContent = 'Click anywhere to continue...';
    }
  }

  if (guideType === 'controls') {
    if (isTouchDevice) {
      GuideText.textContent = 'Swipe to move';
    } else if (hasKeyboard) {
      GuideText.textContent = 'Use WASD or arrow keys to move';
    } else {
      GuideText.textContent = 'Drag your cursor to move';
    }
  }
}

// Function to open the guide with optional fade effect
function openGuide(guideType, fade = false) {
    updateGuide(guideType); // Update the guide text based on the type
    
    // Set display:flex and optionally fade in
    if (fade) {
      GuideUI.style.opacity = 0; // Start with 0 opacity
      GuideUI.style.display = 'flex';
      const fadeIn = setInterval(() => {
        let currentOpacity = parseFloat(GuideUI.style.opacity);
        if (currentOpacity < 1) {
          GuideUI.style.opacity = (currentOpacity + 0.1).toFixed(1); // Gradually increase opacity
        } else {
          clearInterval(fadeIn); // Stop once fully visible
        }
      }, 30); // Fade in over 500ms (10 steps of 50ms each)
    } else {
      GuideUI.style.opacity = 1; // Set opacity to 1 directly
      GuideUI.style.display = 'flex';
    }
  
    // If the guideType is 'controls', close the guide after 3 seconds
    if (guideType === 'controls') {
        setupCloseGuide(guideType, fade);
    }
  }

// Function to close the guide with optional fade effect
function closeGuide(guideType, fade = false) {
  if (fade) {
    const fadeOut = setInterval(() => {
      let currentOpacity = parseFloat(GuideUI.style.opacity);
      if (currentOpacity > 0) {
        GuideUI.style.opacity = (currentOpacity - 0.1).toFixed(1); // Gradually decrease opacity
      } else {
        clearInterval(fadeOut); // Stop once fully hidden
        GuideUI.style.display = 'none'; // Set display:none after fading out
      }
    }, 30); // Fade out over 500ms (10 steps of 50ms each)
  } else {
    GuideUI.style.opacity = 0; // Set opacity to 0 directly
    GuideUI.style.display = 'none';
  }
}

// Function to close the guide when a key is pressed or swipe is detected
function setupCloseGuide(guideType, fade) {
    // Flag to prevent multiple calls
    let guideClosed = false;
  
    // Function to call closeGuide
    function closeGuideOnAction() {
      if (guideClosed) return;
      guideClosed = true; // Prevent further calls
  
      setTimeout(() => {
        closeGuide(guideType, fade);
      }, 1000); // Close the guide after 3 seconds
  
      // Remove event listeners to avoid multiple triggers
      document.removeEventListener("keydown", keyListener);
      document.removeEventListener("mousedown", mouseDownListener);
      document.removeEventListener("touchstart", touchStartListener);
      document.removeEventListener("touchmove", touchMoveListener);
    }
  
    // Listen for key press (WASD or arrow keys)
    function keyListener(event) {
      if (event.code === "KeyW" || event.code === "KeyA" || event.code === "KeyS" || event.code === "KeyD" || 
          event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "ArrowLeft" || event.code === "ArrowRight") {
        closeGuideOnAction();
      }
    }
  
    // Listen for mouse drag (mousedown or touch swipe)
    let touchStartX = 0;
    let touchStartY = 0;
    function mouseDownListener() {
      closeGuideOnAction();
    }
  
    function touchStartListener(event) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }
  
    function touchMoveListener(event) {
      const touchEndX = event.touches[0].clientX;
      const touchEndY = event.touches[0].clientY;
  
      // Detect swipe (movement threshold can be adjusted)
      if (Math.abs(touchEndX - touchStartX) > 30 || Math.abs(touchEndY - touchStartY) > 30) {
        closeGuideOnAction();
      }
    }
  
    // Attach event listeners for the above actions
    document.addEventListener("keydown", keyListener);
    document.addEventListener("mousedown", mouseDownListener);
    document.addEventListener("touchstart", touchStartListener);
    document.addEventListener("touchmove", touchMoveListener);
  }

// Make the functions global
window.openGuide = openGuide;
window.closeGuide = closeGuide;