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
      setTimeout(() => {
        closeGuide(guideType, fade);
      }, 3000); // Close the guide after 3 seconds
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

// Make the functions global
window.openGuide = openGuide;
window.closeGuide = closeGuide;