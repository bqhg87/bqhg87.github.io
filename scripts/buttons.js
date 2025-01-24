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

// Function to handle button click, toggle visibility, and manage state
function handleButtonClick(buttonId) {
  const buttons = document.querySelectorAll('.headButton');
  const clickedButton = document.getElementById(buttonId);
  const sideMenuWrapper = document.getElementById('sideMenuWrapper'); // Get the sideMenuWrapper element
  const meterWrapper = document.getElementById('meterWrapper'); // Get the meterWrapper element
  
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
      meterWrapper.classList.remove('show'); // Hide the meterWrapper if sideMenu is shown
    }
    
    // Handle meterToggle logic for meterWrapper
    if (buttonId === 'meterToggle') {
      meterWrapper.classList.add('show'); // Show the meterWrapper
      sideMenuWrapper.classList.remove('show'); // Hide the sideMenu if meterWrapper is shown
    }
  } else {
    // If it's toggled, hide the menu and show all buttons again
    buttons.forEach(button => {
      button.classList.remove('hidden'); // Show all buttons
    });
    
    // Hide the side menu and meter wrapper if they're visible
    if (sideMenuWrapper.classList.contains('show')) {
      sideMenuWrapper.classList.remove('show'); // Hide the side menu
    }
    if (meterWrapper.classList.contains('show')) {
      meterWrapper.classList.remove('show'); // Hide the meter wrapper
    }
  }

  // If a different button (not menuToggle or meterToggle) is toggled, hide both the side menu and meter wrapper
  if (buttonId !== 'menuToggle' && buttonId !== 'meterToggle') {
    if (sideMenuWrapper.classList.contains('show')) {
      sideMenuWrapper.classList.remove('show'); // Hide the side menu
    }
    if (meterWrapper.classList.contains('show')) {
      meterWrapper.classList.remove('show'); // Hide the meter wrapper
    }
  }
}

// Event listener function to handle sprite changes based on interaction
function addButtonEventListeners(buttonId) {
  const button = document.getElementById(buttonId);
  
  button.addEventListener('mouseover', () => {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 1, spriteY); // Hover state (spriteX = 1)
  });

  button.addEventListener('mousedown', () => {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 2, spriteY); // Active state (spriteX = 2)
  });

  button.addEventListener('mouseout', () => {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 0, spriteY); // Normal state (spriteX = 0)
  });

  button.addEventListener('mouseup', () => {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 1, spriteY); // Hover state (spriteX = 1)
  });
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

// Initialize buttons and toggle functionality when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeButtons();  // Initialize all buttons with sprites
  addToggleListeners();  // Add toggle event to each button
});