// General function to set the sprite for any button
function setButtonSprite(buttonId, spriteX, spriteY) {
  const button = document.getElementById(buttonId);
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;
  
  const backgroundPositionX = -spriteX * buttonWidth; // Negative offset for X-axis
  const backgroundPositionY = -spriteY * buttonHeight; // Negative offset for Y-axis
  
  button.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`;
  button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 6}px`;  // Scale the sprite to fit the button
}

let autoCloseInProgress = false
let buttonClickedDuringTimeout = true
window.autoCloseInProgress = autoCloseInProgress

window.addEventListener('autoClose', () => {
  window.autoCloseInProgress = autoCloseInProgress

  if (autoCloseInProgress) {
    return;
  } else if (!autoCloseInProgress) {
    autoCloseInProgress = true;
    buttonClickedDuringTimeout = false;
    autoClose(2000);
  }
});

function autoClose(time) {
  autoCloseInProgress = true;
  setTimeout(() => {
    if (buttonClickedDuringTimeout || stoppedMoving) {
      autoCloseInProgress = false;
      window.autoCloseInProgress = autoCloseInProgress;
      return;
    } else {
      console.log('Menus closed due to movement');
      let meterWrapper = document.getElementById('meterWrapper');
      let articleWrapper = document.getElementById('articleWrapper');
      if (meterWrapper.classList.contains('show')) {
        handleButtonClick('meterToggle');
        checkButtonHover('meterToggle');
      } else if (articleWrapper.classList.contains('show')) {
        handleButtonClick('menuToggle');
        checkButtonHover('menuToggle');
      }
      setTimeout(() => {
        autoCloseInProgress = false;
        window.autoCloseInProgress = autoCloseInProgress;
      }, 200);
    }
  }, time);
}

let lastClickedButton = null;
let prev = false;

// Function to handle button click, toggle visibility, and manage state
function handleButtonClick(buttonId) {
  buttonClickedDuringTimeout = true

  const buttons = document.querySelectorAll('.headButton');
  const clickedButton = document.getElementById(buttonId);
  const sideMenuWrapper = document.getElementById('sideMenuWrapper'); // Get the sideMenuWrapper element
  const meterWrapper = document.getElementById('meterWrapper'); // Get the meterWrapper element
  const articleWrapper = document.getElementById('articleWrapper'); // Get the articleWrapper element

  const openCharMenuEvent = new Event('openCharMenu');
  const closeCharMenuEvent = new Event('closeCharMenu');
  
  if (!(lastClickedButton === 'charToggle') && (buttonId === 'charToggle') && (prev === false)) {
    prev = true;
    window.dispatchEvent(openCharMenuEvent);
  } else if ((lastClickedButton === 'charToggle') && !(buttonId === 'charToggle') && (prev === true)) {
    prev = false;
    window.dispatchEvent(closeCharMenuEvent);
  } else if ((lastClickedButton === 'charToggle') && (buttonId === 'charToggle') && (prev === false)) {
    prev = true;
    window.dispatchEvent(openCharMenuEvent);
  } else if (buttonId === 'charToggle') {
    prev = false;
    window.dispatchEvent(closeCharMenuEvent);
  }

  // If the clicked button is already toggled, untoggle it and hide all menus
  const isToggled = clickedButton.dataset.toggled === 'true';

  // Untoggle all buttons and reset sprites, hide all buttons
  buttons.forEach(button => {
    button.dataset.toggled = 'false'; // Untoggle all buttons
    setButtonSprite(button.id, 0, button.dataset.spriteY); // Reset all buttons' sprites
    button.classList.add('hidden'); // Hide all buttons
  });

  // If the clicked button wasn't toggled, toggle it and show it
  if (!isToggled) {
    clickedButton.dataset.toggled = 'true';
    setButtonSprite(buttonId, 1, 1); // Set sprite to spriteY=1 for toggled state
    clickedButton.classList.remove('hidden'); // Make the clicked button visible
    
    // Handle menuToggle logic for sideMenuWrapper
    if (buttonId === 'menuToggle') {
      sideMenuWrapper.classList.add('show'); // Show the side menu
      meterWrapper.classList.add('fade-out');
      setTimeout(() => {
        meterWrapper.classList.remove('show', 'fade-out'); // Hide the meterWrapper if sideMenu is shown
      }, 200);
    }
    
    if (buttonId === 'meterToggle') {
      meterWrapper.classList.add('show'); // Show the meterWrapper
      sideMenuWrapper.classList.add('fade-out');
      articleWrapper.classList.add('fade-out');
      setTimeout(() => {
      sideMenuWrapper.classList.remove('show', 'fade-out'); // Hide the sideMenu if meterWrapper is shown
      articleWrapper.classList.remove('show', 'fade-out');
      closeArticle();
      }, 200);
    } 
  } else {
    // Fade out the elements instead of removing them immediately
    if (sideMenuWrapper.classList.contains('show')) {
      sideMenuWrapper.classList.add('fade-out'); // Add fade-out class
    }
    if (meterWrapper.classList.contains('show')) {
      meterWrapper.classList.add('fade-out'); // Add fade-out class
    }

    // Close the articleWrapper if the menu is untoggled, and fade it out
    if (buttonId === 'menuToggle' && articleWrapper.classList.contains('show')) {
      articleWrapper.classList.add('fade-out'); // Add fade-out class immediately
    }

    buttons.forEach(button => {
      button.classList.remove('hidden'); // Show all buttons
    });

    const button = document.getElementById(buttonId);
    checkButtonHover(buttonId);

    // After fade-out, hide all elements and show buttons again
    setTimeout(() => {
      sideMenuWrapper.classList.remove('show', 'fade-out');
      meterWrapper.classList.remove('show', 'fade-out');
      articleWrapper.classList.remove('show', 'fade-out');
      closeArticle();
    }, 200);
  }

  // If a different button (not menuToggle or meterToggle) is toggled, hide both the side menu and meter wrapper
  if (buttonId !== 'menuToggle' && buttonId !== 'meterToggle') {
    if (sideMenuWrapper.classList.contains('show')) {
      sideMenuWrapper.classList.add('fade-out'); // Hide the side menu
    }
    if (meterWrapper.classList.contains('show')) {
      meterWrapper.classList.add('fade-out'); // Hide the meter wrapper
    }
    if (articleWrapper.classList.contains('show')) {
      articleWrapper.classList.add('fade-out'); // Hide the article wrapper if it's visible
    }
    setTimeout(() => {
      sideMenuWrapper.classList.remove('show', 'fade-out');
      meterWrapper.classList.remove('show', 'fade-out');
      articleWrapper.classList.remove('show', 'fade-out');
      closeArticle();
    }, 200);
  }

  lastClickedButton = buttonId;
}

// Function to handle closing the article and reverting the URL
function closeArticle() {
  const articleWrapper = document.getElementById('articleWrapper');
  const params = new URLSearchParams(window.location.search);

  // Remove 'article' from the URL
  if (params.has('article')) {
    params.delete('article');
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  }

  // Trigger fade-out animation
  if (articleWrapper.classList.contains('show')) {
    articleWrapper.classList.add('fade-out'); // Add fade-out class

    // Wait for the transition to finish before fully hiding
    articleWrapper.addEventListener(
      'transitionend',
      () => {
        articleWrapper.classList.remove('show', 'fade-out'); // Remove show and fade-out
        articleWrapper.removeEventListener('transitionend', arguments.callee); // Prevent multiple triggers
      },
      { once: true }
    );
  }
}

// Event listener function to handle sprite changes based on interaction
function addButtonEventListeners(buttonId) {
  const button = document.getElementById(buttonId);

  // Track whether the button is being hovered over
  button.isHovered = false;

  button.addEventListener('mouseover', () => {
    button.isHovered = true;
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 1, spriteY); // Hover state (spriteX = 1)
  });

  button.addEventListener('mousedown', () => {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 2, spriteY); // Active state (spriteX = 2)
  });

  button.addEventListener('mouseout', () => {
    button.isHovered = false;
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 0, spriteY); // Normal state (spriteX = 0)
  });

  button.addEventListener('mouseup', () => {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 1, spriteY); // Hover state (spriteX = 1)
  });
}

// Function to check if the mouse is hovering over a specific button
function checkButtonHover(buttonId) {
  const button = document.getElementById(buttonId);
  
  if (button && button.isHovered) {
    // The mouse is hovering over the button, update styles accordingly
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 1, spriteY); // Update hover state sprite
  } else {
    // The mouse is not hovering over the button, update to normal state
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 0, spriteY); // Normal state sprite
  }
}

// Initialize sprites for each button and add the click event listener
function initializeButtons() {
  const buttons = document.querySelectorAll('.headButton');
  
  buttons.forEach(button => {
    button.dataset.toggled = 'false'; // Set initial toggled state to false
    setButtonSprite(button.id, 0, button.dataset.spriteY); // Set default sprite (normal state)
    button.classList.remove('hidden'); // Make sure buttons are visible initially
    addButtonEventListeners(button.id); // Add event listeners for interaction
  });
}

// Event listener for the "menuToggle", "meterToggle", and other buttons to handle toggle action
function addToggleListeners() {
  const buttons = document.querySelectorAll('.headButton');
  buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.id)); // Toggle state on click
  });
}

// Function to check if article is open and viewport width is <= 618px
window.updateHeadButtonsVisibility = function() {
  const articleWrapper = document.getElementById('articleWrapper');

  if (window.innerWidth <= 618 && articleWrapper.classList.contains('show')) {
    document.body.classList.add('article-open');
  } else {
    document.body.classList.remove('article-open');
  }
};

// Check if the page loads with an article and toggle menuToggle if necessary
function handleInitialArticleLoad() {
  const params = new URLSearchParams(window.location.search);
  const article = params.get('article'); // Extract article parameter from the URL
  
  if (article) {
    handleButtonClick('menuToggle'); // Automatically toggle the menuToggle button
    checkButtonHover('menuToggle')
  }
}

// Listen to window resize events to update visibility
window.addEventListener('resize', updateHeadButtonsVisibility);

// Initialize buttons and toggle functionality when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeButtons();  // Initialize all buttons with sprites
  addToggleListeners();  // Add toggle event to each button
  handleInitialArticleLoad(); // Automatically toggle menu if an article is present in the URL
});