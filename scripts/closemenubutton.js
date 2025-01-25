// General function to set the sprite for the closeMenuButton
function setCloseMenuButtonSprite(buttonId, spriteX, spriteY) {
    const button = document.getElementById(buttonId);
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    
    // Adjust for retina scaling (assuming 2x scaling for retina displays)
    const scaleFactor = window.devicePixelRatio || 1;
    
    const backgroundPositionX = -spriteX * buttonWidth / scaleFactor; // Negative offset for X-axis
    const backgroundPositionY = -spriteY * buttonHeight / scaleFactor; // Negative offset for Y-axis
    
    button.style.backgroundPosition = `${backgroundPositionX * 2}px ${backgroundPositionY}px`;
    button.style.backgroundSize = `${buttonWidth * 3 / 2 * scaleFactor}px ${buttonHeight / 2 * scaleFactor}px`; // Scale the sprite to fit the button
}

// Function to handle sprite changes for the closeMenuButton (regular, hover, active)
function addCloseMenuButtonEventListeners(buttonId) {
    const button = document.getElementById(buttonId);
  
    // Track whether the button is being hovered over
    button.isHovered = false;
  
    button.addEventListener('mouseover', () => {
        button.isHovered = true;
        setCloseMenuButtonSprite(buttonId, 1, 0); // Hover state (spriteX = 1)
    });
  
    button.addEventListener('mousedown', () => {
        setCloseMenuButtonSprite(buttonId, 2, 0); // Active state (spriteX = 2)
    });
  
    button.addEventListener('mouseout', () => {
        button.isHovered = false;
        setCloseMenuButtonSprite(buttonId, 0, 0); // Regular state (spriteX = 0)
    });
  
    button.addEventListener('mouseup', () => {
        setCloseMenuButtonSprite(buttonId, 1, 0); // Hover state (spriteX = 1)
    });
  
    // Add click event to call closeArticle function
    button.addEventListener('click', closeArticle); // Call closeArticle when button is clicked
}

// Function to initialize the closeMenuButton sprite
function initializeCloseMenuButton() {
    const button = document.getElementById('closeArticle');
    
    // Set initial state to regular (spriteX = 0, spriteY = 0)
    setCloseMenuButtonSprite('closeArticle', 0, 0); // Regular state
    
    // Add event listeners for the hover/active states
    addCloseMenuButtonEventListeners('closeArticle');
}

// Initialize the closeMenuButton on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCloseMenuButton();  // Initialize close menu button with sprite handling
});

// Function to check if the article has overflowed
window.checkArticleOverflow = function() {
    const article = document.querySelector('.article');
    const closeButton = document.querySelector('.closeMenuButton');
  
    // Check if the article has vertical overflow
    if (article.scrollHeight > article.clientHeight) {
        // If overflowing, change the margin-right of the closeMenuButton
        closeButton.style.marginRight = '35px';
    } else {
        // If not overflowing, reset the margin-right
        closeButton.style.marginRight = '27.5px';  // Or whatever the default is
    }
}

// Call the function on page load and window resize
window.addEventListener('load', checkArticleOverflow);
window.addEventListener('resize', checkArticleOverflow);
  
checkArticleOverflow();