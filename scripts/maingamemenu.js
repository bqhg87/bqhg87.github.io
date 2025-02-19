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
        updateLabel(buttonId)
    })
    button.addEventListener('mouseleave', () => {
        button.isHovered = false;
        setButtonSprite(button.id, 0);
        updateLabel(buttonId)
    })
    button.addEventListener('mousedown', () => {
        setButtonSprite(button.id, 2);
        updateLabel(buttonId)
    })
    button.addEventListener('mouseup', () => {
        if (button.isHovered) {
            setButtonSprite(button.id, 1);
        } else {
            setButtonSprite(button.id, 0);
        }
        updateLabel(buttonId)
    })
}

function updateLabel(buttonId) {
    const button = document.getElementById(buttonId);
    const inventoryLabel = document.getElementById('inventoryLabel');
    const settingsLabel = document.getElementById('settingsLabel');
    const tasksLabel = document.getElementById('tasksLabel');
    const achievementsLabel = document.getElementById('achievementsLabel');

        if (button.id === "inventoryToggle") {
            if (button.isHovered) {
                inventoryLabel.classList.add('show')
            } else {
                inventoryLabel.classList.remove('show')
            }
        } else if (button.id === "settingsToggle") {
            if (button.isHovered) {
                settingsLabel.classList.add('show')
            } else {
                settingsLabel.classList.remove('show')
            }
        } else if (button.id === "tasksToggle") {
            if (button.isHovered) {
                tasksLabel.classList.add('show')
            } else {
                tasksLabel.classList.remove('show')
            }
        } else if (button.id === "achievementsToggle") {
            if (button.isHovered) {
                achievementsLabel.classList.add('show')
            } else {
                achievementsLabel.classList.remove('show')
            }
        }
}

document.addEventListener('DOMContentLoaded', () => {
    initialiseButtons();
})