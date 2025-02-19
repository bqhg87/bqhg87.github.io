const mainGameMenu = document.getElementById('mainGameMenuWrapper');
const mainGameMenuToggle = document.getElementById('mainGameMenuToggle');
const mainGameMenuSubWrapper = document.getElementById('mainGameMenuSubWrapper');

window.addEventListener('buttonClick', () => {
    if ((mainGameMenuToggle.dataset.toggled === 'true')) {
        mainGameMenuSubWrapper.classList.add('show');
        mainGameMenuToggle.classList.add('toggled');
    } else {
        mainGameMenuSubWrapper.classList.remove('show');
        mainGameMenuToggle.classList.remove('toggled');
    }
})

function setButtonSprite(buttonId, spriteX) {
    const button = document.getElementById(buttonId);
  
    const backgroundPositionX = -5 * 2.5 - 45 * spriteX; // Negative offset for X-axis
  
    button.style.backgroundPositionX = `${backgroundPositionX}px`;
}

function initialiseButtons() {
    const buttons = document.querySelectorAll('.mainGameMenuSubToggle');

    buttons.forEach(button => {
        setButtonSprite(button.id, 0); // Set default sprite (normal state)
        addButtonEventListeners(button.id); // Add event listeners for interaction
    });
}

function addButtonEventListeners(buttonId) {
    const button = document.getElementById(buttonId);
  
    // Track whether the button is being hovered over
    button.isHovered = false;

    button.addEventListener('mouseenter', () => {
        button.isHovered = true;
        setButtonSprite(button.id, 1);
    })
    button.addEventListener('mouseleave', () => {
        button.isHovered = false;
        setButtonSprite(button.id, 0);
    })
    button.addEventListener('mousedown', () => {
        setButtonSprite(button.id, 2);
    })
    button.addEventListener('mouseup', () => {
        if (button.isHovered) {
            setButtonSprite(button.id, 1);
        } else {
            setButtonSprite(button.id, 0);
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initialiseButtons();
})