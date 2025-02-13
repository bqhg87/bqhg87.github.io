let currentCharMenuTitle = 'Body Settings';
const charMenuTitles = ['Body Settings', 'Wardrobe', 'Hats', 'Pets'];

function setCharMenuButtonSprite(buttonId, spriteX) {
    const button = document.getElementById(buttonId);
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    const spriteY = parseInt(button.dataset.spriteY) || 0;

    const backgroundPositionX = -spriteX * buttonWidth;
    const backgroundPositionY = -spriteY * buttonHeight;

    if (buttonId === 'charSettingsTitleLeft' || buttonId === 'charSettingsTitleRight') {
        button.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`;
        button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 2}px`;
    } else {    
        button.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`;
        button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 2}px`;
    }
}

let charAppearance;
function refreshCachedAppearance() {
    const cachedAppearance = JSON.parse(localStorage.getItem('charAppearance'));
    if (cachedAppearance) {
        charAppearance = cachedAppearance;
    }
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

    if (buttonId === 'charSettingsTitleLeft' || buttonId === 'charSettingsTitleRight') {
        button.addEventListener('click', () => {
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

            const bodySettings = document.getElementById('charBodySettings');
            const wardrobeSettings = document.getElementById('charWardrobeSettings');
            if (currentCharMenuTitle === "Body Settings") {
                bodySettings.classList.remove('hidden');
            } else {
                bodySettings.classList.add('hidden');
            }
            if (currentCharMenuTitle === "Wardrobe") {
                wardrobeSettings.classList.remove('hidden');
            } else {
                wardrobeSettings.classList.add('hidden');
            }
        });
    } else {
        if (button.id === "blushToggle") {
            button.addEventListener('click', () => {
                refreshCachedAppearance(); // Get the latest charAppearance
                if (charAppearance) {
                    if (charAppearance.blush) {
                        charAppearance.blush = false;
                    } else {
                        charAppearance.blush = true;
                    }
                    updateCharAppearance(charAppearance);
                } else {
                    console.error("charAppearance is not initialized!");
                }
            });
        }
        if (button.id === "glassesToggle") {
            button.addEventListener('click', () => {
                refreshCachedAppearance(); // Get the latest charAppearance
                if (charAppearance) {
                    if (charAppearance.glasses) {
                        charAppearance.glasses = false;
                    } else {
                        charAppearance.glasses = true;
                    }
                    updateCharAppearance(charAppearance);
                } else {
                    console.error("charAppearance is not initialized!");
                }
            });
        }
    }
}

function initializeCharMenuButtons() {
    const basicToggle = document.querySelectorAll('.basicToggle');
    const titleElement = document.getElementById('charSettingsTitle'); // Get title element

    titleElement.textContent = currentCharMenuTitle; // Set initial title text

    setCharMenuButtonSprite('charSettingsTitleLeft', 0);
    setCharMenuButtonSprite('charSettingsTitleRight', 0);

    addCharMenuButtonEventListeners('charSettingsTitleLeft');
    addCharMenuButtonEventListeners('charSettingsTitleRight');

    basicToggle.forEach(button => {
        setCharMenuButtonSprite(button.id, 0); // Set default sprite (normal state)
        addCharMenuButtonEventListeners(button.id); // Add event listeners for interaction
    });
}

function updateBasicButtons() {
    const basicToggle = document.querySelectorAll('.basicToggle');
    
    basicToggle.forEach(button => {
        if (button.id === "blushToggle") {
            if (charAppearance && typeof charAppearance.blush !== "undefined") {
                button.dataset.spriteY = charAppearance.blush ? 0 : 1;
                if (button.isHovered) {
                    setCharMenuButtonSprite(button.id, 1)
                } else {
                    setCharMenuButtonSprite(button.id, 0)
                }
            } else {
                console.warn("charAppearance or blush is not defined.");
            }
        }
        if (button.id === "glassesToggle") {
            if (charAppearance && typeof charAppearance.glasses !== "undefined") {
                button.dataset.spriteY = charAppearance.glasses ? 0 : 1;
                if (button.isHovered) {
                    setCharMenuButtonSprite(button.id, 1)
                } else {
                    setCharMenuButtonSprite(button.id, 0)
                }
            } else {
                console.warn("charAppearance or glasses is not defined.");
            }
        }
    });
}

function updateSkinToneSelector() {
    const skinToneSelectors = document.querySelectorAll('.skinToneSelector');

    if (charAppearance && charAppearance.skinTone !== undefined) {
        const selectedSkinTone = charAppearance.skinTone;

        skinToneSelectors.forEach(selector => {
            const tone = parseInt(selector.dataset.tone);
            if (tone === selectedSkinTone) {
                selector.classList.add('show');
            } else {
                selector.classList.remove('show');
            }
        });
    } else {
        // Handle the case where charAppearance or skinTone is not defined.
        // For example, you could default to a specific skin tone or hide all selectors.
        console.warn("charAppearance or skinTone is not defined.");
        skinToneSelectors.forEach((selector, index) => {
            if (index === 0) { // Default to the first skin tone
                selector.classList.add('show');
            } else {
                selector.classList.remove('show');
            }
        });

    }
}

// Add event listeners to skin tone selectors
function initializeSkinToneSelectors() {
    const skinToneSelectors = document.querySelectorAll('.skinToneSelector');
    const skinTonePalette = document.getElementById('skinTonePalette');

    skinToneSelectors.forEach(selector => {
        const tone = parseInt(selector.dataset.tone);

        selector.addEventListener('mouseover', () => {
            updateSkinTonePaletteSprite(tone + 1); // +1 because sprite 0 is all unhovered
        });

        selector.addEventListener('mouseout', () => {
            updateSkinTonePaletteSprite(0); // Back to all unhovered
        });

        selector.addEventListener('click', () => {
            const selectedTone = parseInt(selector.dataset.tone);

            refreshCachedAppearance(); // Get the latest charAppearance

            if (charAppearance) {
                charAppearance.skinTone = selectedTone;
                updateCharAppearance(charAppearance);

                //Optional: you might want to call a function here to update the character's visual representation.
                //For example, if you have a function called "applyCharacterAppearance()", you could call it here.
                //applyCharacterAppearance();
            } else {
                console.error("charAppearance is not initialized!");
            }
        });

        function updateSkinTonePaletteSprite(spriteIndex) {
            const paletteHeight = skinTonePalette.offsetHeight; // Get height of palette
            const spriteHeight = paletteHeight; // Calculate height of each sprite (9 sprites total)
            const backgroundPositionY = -spriteIndex * spriteHeight; // Calculate background position
            skinTonePalette.style.backgroundPositionY = `${backgroundPositionY}px`; // Update background position
        }
    
        // Set initial sprite (all unhovered)
        updateSkinTonePaletteSprite(0);
    });
}


window.updateDisplayedCharSettings = function() {
    refreshCachedAppearance();
    console.log(charAppearance);
    updateSkinToneSelector();
    updateBasicButtons();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCharMenuButtons();
    updateDisplayedCharSettings();
    initializeSkinToneSelectors(); // Initialize skin tone selector event listeners
});
