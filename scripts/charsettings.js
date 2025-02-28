window.currentCharMenuTitle = 'Body Settings';
const charMenuTitles = ['Body Settings', 'Wardrobe'];
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
    } else if (button.classList.contains('charSelectorArrow')) {
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
    button.addEventListener('mouseup', () => {  
        updateDisplayedCharSettings();
        setCharMenuButtonSprite(buttonId, button.isHovered ? 1 : 0);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Shift') {shiftHeld = true;}
        if (event.key === 'Control' || event.key === 'Meta') {ctrlHeld = true; cmdHeld = true;}
    });
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
                newIndex = (currentIndex - 1 + charMenuTitles.length) % charMenuTitles.length; 
            } else if (buttonId === 'charSettingsTitleRight') {
                newIndex = (currentIndex + 1) % charMenuTitles.length; 
            }
            window.currentCharMenuTitle = charMenuTitles[newIndex];
            titleElement.textContent = currentCharMenuTitle; 
            refreshVisibleCharMenus();
            updateArrowPairVisibility();
        });
    } else if (button.id === "hairToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                charAppearance.hairType = (charAppearance.hairType + 1) % 14;
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    } else if (button.id === "eyesToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
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
    } else if (button.id === "topToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                charAppearance.topType = (charAppearance.topType + 1) % 10;
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    } else if (button.id === "bottomToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                charAppearance.bottomType = (charAppearance.bottomType + 1) % 10;
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    }   else if (button.id === "blushToggle") {
            button.addEventListener('click', () => {
                refreshCachedAppearance(); 
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
    }   else if (button.id === "beardToggle") {
            button.addEventListener('click', () => {
                refreshCachedAppearance(); 
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
    }   else if (button.id === "glassesToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance(); 
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
    }   else if (button.id === "hairLeftToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                const hairs = Object.keys(window.hair);
                let currentIndex = hairs.indexOf(charAppearance.hair);
                let prevIndex = (currentIndex - 1 + hairs.length) % hairs.length;
                charAppearance.hair = hairs[prevIndex];
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    }   else if (button.id === "hairRightToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                const hairs = Object.keys(window.hair);
                let currentIndex = hairs.indexOf(charAppearance.hair);
                let nextIndex = (currentIndex + 1) % hairs.length;
                charAppearance.hair = hairs[nextIndex];
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    }   else if (button.id === "topsLeftToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                const tops = Object.keys(window.tops);
                let currentIndex = tops.indexOf(charAppearance.clothingTop);
                let prevIndex = (currentIndex - 1 + tops.length) % tops.length;
                charAppearance.clothingTop = tops[prevIndex];
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    }   else if (button.id === "topsRightToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                const tops = Object.keys(window.tops);
                let currentIndex = tops.indexOf(charAppearance.clothingTop);
                let nextIndex = (currentIndex + 1) % tops.length;
                charAppearance.clothingTop = tops[nextIndex];
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    }   else if (button.id === "bottomsLeftToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                const bottoms = Object.keys(window.bottoms);
                let currentIndex = bottoms.indexOf(charAppearance.clothingBottom);
                let prevIndex = (currentIndex - 1 + bottoms.length) % bottoms.length;
                charAppearance.clothingBottom = bottoms[prevIndex];
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    }   else if (button.id === "bottomsRightToggle") {
        button.addEventListener('click', () => {
            refreshCachedAppearance();
            if (charAppearance) {
                const bottoms = Object.keys(window.bottoms);
                let currentIndex = bottoms.indexOf(charAppearance.clothingBottom);
                let nextIndex = (currentIndex + 1) % bottoms.length;
                charAppearance.clothingBottom = bottoms[nextIndex];
                updateCharAppearance(charAppearance);
            } else {
                console.error("charAppearance is not initialized!");
            }
        });
    }
}
window.refreshVisibleCharMenus = function() {
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
}
function initializeCharMenuButtons() {
    const basicToggle = document.querySelectorAll('.basicToggle');
    const charSelectorArrows = document.querySelectorAll('.charSelectorArrow');
    const titleElement = document.getElementById('charSettingsTitle'); 
    titleElement.textContent = currentCharMenuTitle; 
    setCharMenuButtonSprite('charSettingsTitleLeft', 0);
    setCharMenuButtonSprite('charSettingsTitleRight', 0);
    addCharMenuButtonEventListeners('charSettingsTitleLeft');
    addCharMenuButtonEventListeners('charSettingsTitleRight');
    setCharMenuButtonSprite('autoEyesToggle', 0);
    addCharMenuButtonEventListeners('autoEyesToggle');
    addCharMenuButtonEventListeners('hairToggle');
    addCharMenuButtonEventListeners('eyesToggle');
    addCharMenuButtonEventListeners('topToggle');
    addCharMenuButtonEventListeners('bottomToggle');
    addCharMenuButtonEventListeners('shoeToggle');
    basicToggle.forEach(button => {
        setCharMenuButtonSprite(button.id, 0); 
        addCharMenuButtonEventListeners(button.id); 
    });
    charSelectorArrows.forEach(button => {
        const isLeft = button.classList.contains('Left');
        const spriteY = isLeft ? 0 : 1;
        button.dataset.spriteY = spriteY; 
        setCharMenuButtonSprite(button.id, 0); 
        addCharMenuButtonEventListeners(button.id);
    });
}
window.refreshAllCharButtons = function() {
    setCharMenuButtonSprite('charSettingsTitleLeft', 0);
    setCharMenuButtonSprite('charSettingsTitleRight', 0);
    setCharMenuButtonSprite('autoEyesToggle', 0);
    const basicToggle = document.querySelectorAll('.basicToggle');
    const charSelectorArrows = document.querySelectorAll('.charSelectorArrow');
    basicToggle.forEach(button => {
        setCharMenuButtonSprite(button.id, 0); 
    });
    charSelectorArrows.forEach(button => {
        setCharMenuButtonSprite(button.id, 0); 
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
function updateSelectorColor(selector, bgColor, fgColor) {
    let bgElements, fgElements;
    if (selector === 'hair') {
        bgElements = document.querySelectorAll('.cls-b-hair');
        fgElements = document.querySelectorAll('.cls-f-hair');
    } else if (selector === 'eyes') {
        bgElements = document.querySelectorAll('.cls-b-eyes');
        fgElements = document.querySelectorAll('.cls-f-eyes');
    } else if (selector === 'top') {
        bgElements = document.querySelectorAll('.cls-b-top');
        fgElements = document.querySelectorAll('.cls-f-top');
    } else if (selector === 'bottom') {
        bgElements = document.querySelectorAll('.cls-b-bottom');
        fgElements = document.querySelectorAll('.cls-f-bottom');
    } else if (selector === 'shoe') {
        bgElements = document.querySelectorAll('.cls-b-shoe');
        fgElements = document.querySelectorAll('.cls-f-shoe');
    }
    if (!bgElements || !fgElements) {
        console.warn(`Invalid selector: ${selector}`);
        return;
    }
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
    const topToggle = document.getElementById('topToggle');
    const bottomToggle = document.getElementById('bottomToggle');
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
    const clothingColors = [
        { bg: "#4c464b", fg: "#413b40", bgHover: "#413b40", fgHover: "#332e32" },
        { bg: "#4b6275", fg: "#435361", bgHover: "#435361", fgHover: "#323942" },
        { bg: "#6283a4", fg: "#637499", bgHover: "#637499", fgHover: "#3e4457" },
        { bg: "#654530", fg: "#583d2b", bgHover: "#583d2b", fgHover: "#443424" },
        { bg: "#406158", fg: "#385252", bgHover: "#385252", fgHover: "#333e42" },
        { bg: "#7d945f", fg: "#758658", bgHover: "#758658", fgHover: "#585c40" },
        { bg: "#c8616b", fg: "#b05b6a", bgHover: "#b05b6a", fgHover: "#8c4d61" },
        { bg: "#745c96", fg: "#5c5178", bgHover: "#5c5178", fgHover: "#423e57" },
        { bg: "#b35249", fg: "#a14343", bgHover: "#a14343", fgHover: "#783a3d" },
        { bg: "#c5b6a0", fg: "#9c8d83", bgHover: "#9c8d83", fgHover: "#615a55" },
    ];
    const skirtColors = [
        { bg: "#413b40", fg: "#363235", bgHover: "#363235", fgHover: "#332e32" },
        { bg: "#3e4957", fg: "#353f4a", bgHover: "#353f4a", fgHover: "#323942" },
        { bg: "#505d7a", fg: "#454e66", bgHover: "#454e66", fgHover: "#3e4457" },
        { bg: "#4a3428", fg: "#402d25", bgHover: "#402d25", fgHover: "#33251f" },
        { bg: "#324345", fg: "#2a3638", bgHover: "#2a3638", fgHover: "#222a2b" },
        { bg: "#596b49", fg: "#42543b", bgHover: "#42543b", fgHover: "#3d4230" },
        { bg: "#85485c", fg: "#6b3b4b", bgHover: "#6b3b4b", fgHover: "#52303b" },
        { bg: "#45415e", fg: "#3a354a", bgHover: "#3a354a", fgHover: "#2b2b3b" },
        { bg: "#823c42", fg: "#66343e", bgHover: "#66343e", fgHover: "#592c2e" },
        { bg: "#4a4a4f", fg: "#3c3b3f", bgHover: "#3c3b3f", fgHover: "#37373a" },
    ];
    const hairColor = hairColors[charAppearance.hairType] || hairColors[0];
    updateSelectorColor('hair', hairToggle.isHovered ? hairColor.bgHover : hairColor.bg, hairToggle.isHovered ? hairColor.fgHover : hairColor.fg);
    const eyeColor = eyeColors[charAppearance.eyes] || eyeColors[0];
    updateSelectorColor('eyes', eyesToggle.isHovered ? eyeColor.bgHover : eyeColor.bg, eyesToggle.isHovered ? eyeColor.fgHover : eyeColor.fg);
    const topColor = clothingColors[charAppearance.topType] || clothingColors[0];
    updateSelectorColor('top', topToggle.isHovered ? topColor.bgHover : topColor.bg, topToggle.isHovered ? topColor.fgHover : topColor.fg);
    let bottomColor;
    if (charAppearance.clothingBottom === 'skirt') {
        bottomColor = skirtColors[charAppearance.bottomType] || skirtColors[0];
    } else {
        bottomColor = clothingColors[charAppearance.bottomType] || clothingColors[0];
    }
    updateSelectorColor('bottom', bottomToggle.isHovered ? bottomColor.bgHover : bottomColor.bg, bottomColor.isHovered ? bottomColor.fgHover : bottomColor.fg);
    const autoEyesToggle = document.getElementById('autoEyesToggle');
    const manualEyesToggle = document.getElementById('eyesColorToggle');
    if (!(charAppearance.eyes === 8)) {
        autoEyesToggle.classList.remove('show');
        manualEyesToggle.classList.remove('hidden');
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
        console.warn("charAppearance or skinTone is not defined.");
        skinToneSelectors.forEach((selector, index) => {
            if (index === 0) { 
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
    let isDragging = false; 
    function updateSkinTonePaletteSprite(spriteIndex) {
        const paletteHeight = skinTonePalette.offsetHeight; 
        const spriteHeight = paletteHeight; 
        const backgroundPositionY = -spriteIndex * spriteHeight; 
        skinTonePalette.style.backgroundPositionY = `${backgroundPositionY}px`; 
    }
    function setSkinTone(tone) {
        refreshCachedAppearance(); 
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
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    updateSkinTonePaletteSprite(0);
}
window.updateDisplayedCharSettings = function() {
    refreshCachedAppearance();
    updateSkinToneSelector();
    updateBasicButtons();
    updateSelectorColors();
}
document.addEventListener('DOMContentLoaded', () => {
    initializeCharMenuButtons();
    updateDisplayedCharSettings();
    initializeSkinToneSelectors(); 
    refreshVisibleCharMenus();
});