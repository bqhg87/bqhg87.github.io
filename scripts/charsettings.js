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
        button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 3}px`;
    }
}

let charAppearance;
function refreshCachedAppearance() {
    const cachedAppearance = JSON.parse(localStorage.getItem('charAppearance'));
    if (cachedAppearance) {
        charAppearance = cachedAppearance;
    }
}

let shiftHeld = false;
let ctrlHeld = false;
let cmdHeld = false;

function addCharMenuButtonEventListeners(buttonId) {
    const button = document.getElementById(buttonId);

    button.isHovered = false;

    button.addEventListener('mouseover', () => {
        button.isHovered = true;
        updateDisplayedCharSettings();
        setCharMenuButtonSprite(buttonId, 1);
    });

    button.addEventListener('mousedown', () => {
        updateDisplayedCharSettings();
        setCharMenuButtonSprite(buttonId, 2);
    });

    button.addEventListener('mouseout', () => {
        button.isHovered = false;
        updateDisplayedCharSettings();
        setCharMenuButtonSprite(buttonId, 0);
    });

    button.addEventListener('mouseup', () => {  // Combined mouseup logic
        updateDisplayedCharSettings();
        setCharMenuButtonSprite(buttonId, button.isHovered ? 1 : 0);
    });

    // Listen for shift key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Shift') {shiftHeld = true;}
        if (event.key === 'Control' || event.key === 'Meta') {ctrlHeld = true; cmdHeld = true;}
    });

    // Listen for shift key release
    document.addEventListener('keyup', (event) => {
        if (event.key === 'Shift') {shiftHeld = false;}
        if (event.key === 'Control' || event.key === 'Meta') {ctrlHeld = false; cmdHeld = false;}
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
    } else if (button.id === "hairToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                //console.log(charAppearance);
                charAppearance.hairType = (charAppearance.hairType + 1) % 13;
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    } else if (button.id === "eyesToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                //console.log(charAppearance);
                if (shiftHeld || ctrlHeld || cmdHeld) {
                    charAppearance.eyes = 8;
                } else {
                    charAppearance.eyes = (charAppearance.eyes + 1) % 9;
                }
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
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
        if (button.id === "beardToggle") {
            button.addEventListener('click', () => {
                refreshCachedAppearance(); // Get the latest charAppearance
                if (charAppearance) {
                    if (charAppearance.beard) {
                        charAppearance.beard = false;
                    } else {
                        charAppearance.beard = true;
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

    setCharMenuButtonSprite('autoEyesToggle', 0);
    addCharMenuButtonEventListeners('autoEyesToggle');

    addCharMenuButtonEventListeners('hairToggle');
    addCharMenuButtonEventListeners('eyesToggle');

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
        if (button.id === "beardToggle") {
            if (charAppearance && typeof charAppearance.beard !== "undefined") {
                button.dataset.spriteY = charAppearance.beard ? 0 : 1;
                if (button.isHovered) {
                    setCharMenuButtonSprite(button.id, 1)
                } else {
                    setCharMenuButtonSprite(button.id, 0)
                }
            } else {
                console.warn("charAppearance or beard is not defined.");
            }
        }
    });
}

function updateSelectorColor(selector, bgColor, fgColor) {
    let bgElements, fgElements;

    if (selector === 'hair') {
        bgElements = document.querySelectorAll('.cls-b-hair');
        fgElements = document.querySelectorAll('.cls-f-hair');
    } else if (selector === 'eyes') {
        bgElements = document.querySelectorAll('.cls-b-eyes');
        fgElements = document.querySelectorAll('.cls-f-eyes');
    }

    if (!bgElements || !fgElements) {
        console.warn(`Invalid selector: ${selector}`);
        return;
    }

    // Update the fill color of all elements with the selected class
    bgElements.forEach(element => {
        element.style.fill = bgColor;
    });

    fgElements.forEach(element => {
        element.style.fill = fgColor;
    });
}

function updateSelectorColors() {
    const hairToggle = document.getElementById('hairToggle');
    const eyesToggle = document.getElementById('eyesToggle');

    const hairColors = [
        { bg: "#463533", fg: "#3d2e2e", bgHover: "#3d2e2e", fgHover: "#312627" },
        { bg: "#b0815a", fg: "#946950", bgHover: "#946950", fgHover: "#6b493d" },
        { bg: "#634440", fg: "#553a3a", bgHover: "#553a3a", fgHover: "#402e30" },
        { bg: "#8a5a55", fg: "#754d4b", bgHover: "#754d4b", fgHover: "#543a3a" },
        { bg: "#a1624f", fg: "#875448", bgHover: "#875448", fgHover: "#5c3b36" },
        { bg: "#2a5c4e", fg: "#274f49", bgHover: "#274f49", fgHover: "#203a3b" },
        { bg: "#457a45", fg: "#3c6342", bgHover: "#3c6342", fgHover: "#2e4739" },
        { bg: "#736a67", fg: "#625a58", bgHover: "#625a58", fgHover: "#454140" },
        { bg: "#7e638f", fg: "#645473", bgHover: "#645473", fgHover: "#443e4f" },
        { bg: "#49486e", fg: "#433e5c", bgHover: "#433e5c", fgHover: "#363045" },
        { bg: "#bf6b75", fg: "#a35d6b", bgHover: "#a35d6b", fgHover: "#6b414c" },
        { bg: "#564778", fg: "#463f66", bgHover: "#463f66", fgHover: "#363247" },
        { bg: "#914646", fg: "#783e45", bgHover: "#783e45", fgHover: "#61353d" },
        { bg: "#4a7378", fg: "#436069", bgHover: "#436069", fgHover: "#37464f" },
    ];

    const eyeColors = [
        { bg: "#66835c", fg: "#5b6c4f", bgHover: "#5b6c4f", fgHover: "#4b5641" },
        { bg: "#44573d", fg: "#3a4734", bgHover: "#3a4734", fgHover: "#313a2c" },
        { bg: "#5c7483", fg: "#4a5c64", bgHover: "#4a5c64", fgHover: "#3c4b4f" },
        { bg: "#3d4b57", fg: "#344048", bgHover: "#344048", fgHover: "#2d363b" },
        { bg: "#a27b5e", fg: "#816150", bgHover: "#816150", fgHover: "#6b5146" },
        { bg: "#4d302b", fg: "#3e2926", bgHover: "#3e2926", fgHover: "#352421" },
        { bg: "#352421", fg: "#281d1b", bgHover: "#281d1b", fgHover: "#211818" },
        { bg: "#a12610", fg: "#85221b", bgHover: "#85221b", fgHover: "#6c1f1d" },
    ];

    const hairColor = hairColors[charAppearance.hairType] || hairColors[0];
    updateSelectorColor('hair', hairToggle.isHovered ? hairColor.bgHover : hairColor.bg, hairToggle.isHovered ? hairColor.fgHover : hairColor.fg);

    const autoEyesToggle = document.getElementById('autoEyesToggle');
    const manualEyesToggle = document.getElementById('eyesColorToggle');
    if (!(charAppearance.eyes === 8)) {
        autoEyesToggle.classList.remove('show');
        manualEyesToggle.classList.remove('hidden');
        const eyeColor = eyeColors[charAppearance.eyes] || eyeColors[0];
        updateSelectorColor('eyes', eyesToggle.isHovered ? eyeColor.bgHover : eyeColor.bg, eyesToggle.isHovered ? eyeColor.fgHover : eyeColor.fg);    
    } else {
        autoEyesToggle.classList.add('show');
        manualEyesToggle.classList.add('hidden');
    }
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

function initializeSkinToneSelectors() {
    const skinToneSelectors = document.querySelectorAll('.skinToneSelector');
    const skinTonePalette = document.getElementById('skinTonePalette');

    let isDragging = false; // Track if the user is dragging

    function updateSkinTonePaletteSprite(spriteIndex) {
        const paletteHeight = skinTonePalette.offsetHeight; // Get height of palette
        const spriteHeight = paletteHeight; // Calculate height of each sprite (9 sprites total)
        const backgroundPositionY = -spriteIndex * spriteHeight; // Calculate background position
        skinTonePalette.style.backgroundPositionY = `${backgroundPositionY}px`; // Update background position
    }

    function setSkinTone(tone) {
        refreshCachedAppearance(); // Get the latest charAppearance
        if (charAppearance) {
            charAppearance.skinTone = tone;
            updateCharAppearance(charAppearance);
        } else {
            console.error("charAppearance is not initialized!");
        }
    }

    skinToneSelectors.forEach(selector => {
        const tone = parseInt(selector.dataset.tone);

        selector.addEventListener('mouseover', () => {
            updateSkinTonePaletteSprite(tone + 1);
            if (isDragging) {
                setSkinTone(tone);
            }
        });

        selector.addEventListener('mouseout', () => {
            updateSkinTonePaletteSprite(0);
        });

        selector.addEventListener('mousedown', () => {
            isDragging = true;
            setSkinTone(tone);
        });

        selector.addEventListener('click', () => {
            setSkinTone(tone);
        });
    });

    // Stop dragging when mouse is released anywhere on the page
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Set initial sprite (all unhovered)
    updateSkinTonePaletteSprite(0);
}


window.updateDisplayedCharSettings = function() {
    refreshCachedAppearance();
    //console.log(charAppearance);
    updateSkinToneSelector();
    updateBasicButtons();
    updateSelectorColors();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCharMenuButtons();
    updateDisplayedCharSettings();
    initializeSkinToneSelectors(); // Initialize skin tone selector event listeners
});
