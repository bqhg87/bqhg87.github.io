let currentCharMenuTitle = 'Body Settings';
const charMenuTitles = ['Body Settings', 'Wardrobe', 'Hats', 'Pets'];

function setCharMenuButtonSprite(buttonId, spriteX) {
    const button = document.getElementById(buttonId);
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    const spriteY = parseInt(button.dataset.spriteY) || 0;

    const backgroundPositionX = -spriteX * buttonWidth;
    const backgroundPositionY = -spriteY * buttonHeight;

    button.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`;
    button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 2}px`;
}

function addCharMenuButtonEventListeners(buttonId) {
    const button = document.getElementById(buttonId);

    button.isHovered = false;

    button.addEventListener('mouseover', () => {
        button.isHovered = true;
        setCharMenuButtonSprite(buttonId, 1);
    });

    button.addEventListener('mousedown', () => {
        setCharMenuButtonSprite(buttonId, 2);
    });

    button.addEventListener('mouseout', () => {
        button.isHovered = false;
        setCharMenuButtonSprite(buttonId, 0);
    });

    button.addEventListener('mouseup', () => {  // Combined mouseup logic
        setCharMenuButtonSprite(buttonId, button.isHovered ? 1 : 0);
    });

    button.addEventListener('click', () => { // <---- Add click event listener
        const titleElement = document.getElementById('charSettingsTitle');
        const currentIndex = charMenuTitles.indexOf(currentCharMenuTitle);

        let newIndex;
        if (buttonId === 'charSettingsTitleLeft') {
            newIndex = (currentIndex - 1 + charMenuTitles.length) % charMenuTitles.length; // Cycle backwards
        } else if (buttonId === 'charSettingsTitleRight') {
            newIndex = (currentIndex + 1) % charMenuTitles.length; // Cycle forwards
        }

        currentCharMenuTitle = charMenuTitles[newIndex];
        titleElement.textContent = currentCharMenuTitle; // Update the displayed title

        // Optionally, update sprite based on hover state:
        setCharMenuButtonSprite(buttonId, button.isHovered ? 1 : 0);
    });
}

function initializeCharMenuButtons() {
    const charTitleLeft = document.getElementById('charSettingsTitleLeft');
    const charTitleRight = document.getElementById('charSettingsTitleRight');
    const titleElement = document.getElementById('charSettingsTitle'); // Get title element

    titleElement.textContent = currentCharMenuTitle; // Set initial title text

    setCharMenuButtonSprite('charSettingsTitleLeft', 0);
    setCharMenuButtonSprite('charSettingsTitleRight', 0);

    addCharMenuButtonEventListeners('charSettingsTitleLeft');
    addCharMenuButtonEventListeners('charSettingsTitleRight');
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCharMenuButtons();
});