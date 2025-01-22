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
  
  // Check if the clicked button is already toggled (i.e., active)
  const isToggled = clickedButton.dataset.toggled === 'true';

  buttons.forEach(button => {
    if (button.id === buttonId) {
      // Toggle the clicked button's state
      clickedButton.dataset.toggled = isToggled ? 'false' : 'true';
      
      // Specific behavior for menuToggle
      if (buttonId === "menuToggle") {
        if (!isToggled) {
          sideMenuWrapper.classList.add('show'); // Show the sideMenuWrapper
        } else {
          sideMenuWrapper.classList.remove('show'); // Hide the sideMenuWrapper
        }
        setButtonSprite(buttonId, 1, isToggled ? button.dataset.spriteY : 1); // Toggle sprite state
      } else {
        setButtonSprite(buttonId, 1, isToggled ? button.dataset.spriteY : 1); // Toggle sprite state
      }
    } else {
      // Hide all other buttons when the clicked button is toggled
      button.classList.toggle('hidden', !isToggled); // Show other buttons if the button is untoggled
    }
  });
}

// Event listener function to handle sprite changes based on interaction
function addButtonEventListeners(buttonId) {
  const button = document.getElementById(buttonId);
  
  button.addEventListener('mouseover', () => {
    // Check if the button is toggled, if not use hover state spriteX = 1
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 1, spriteY); // Hover state (spriteX = 1)
  });

  button.addEventListener('mousedown', () => {
    // Check if the button is toggled, if not use active state spriteX = 2
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 2, spriteY); // Active state (spriteX = 2)
  });

  button.addEventListener('mouseout', () => {
    // Check if the button is toggled and revert to default state
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 0, spriteY); // Normal state (spriteX = 0)
  });

  button.addEventListener('mouseup', () => {
    // Check if the button is toggled, if not use hover state spriteX = 1
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

// Event listener for the "menuToggle" and other buttons to handle toggle action
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


// Disable zooming via mouse wheel or trackpad
window.addEventListener('wheel', (e) => {
  if (e.ctrlKey || e.metaKey) {  // Check if the user is using Ctrl or Meta key (which indicates zoom intent)
    e.preventDefault();
  }
}, { passive: false });
