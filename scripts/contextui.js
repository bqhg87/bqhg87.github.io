const topContextWrapper = document.getElementById('topContextWrapper');
const topContextLabel = document.getElementById('topContextLabel');
const topContextImage = document.getElementById('topContextImage');
let resetTimeout = 0
window.broadcastTopContextMessage = function(message, time, image) {
    resetTimeout += 1;
    if (image) {
        topContextLabel.classList.add('withImage')
        topContextImage.classList.add('show')
        const foundItem = window.defaultInventory.find(obj => obj.item === image);
        if (foundItem) { 
            topContextImage.style.backgroundImage = "url('./assets/items.png')";
            topContextImage.style.backgroundSize = "calc(var(--pixelScale) * 16 * 3) calc(var(--pixelScale) * 16 * 8)";
            topContextImage.style.width = "calc(var(--pixelScale) * 16)";
            topContextImage.style.height = "calc(var(--pixelScale) * 16)";
            topContextImage.style.backgroundPositionY = `${(-foundItem.spriteY * 16 * 2.5)}px`;
        } else if (image === 'task') {
            topContextImage.style.backgroundImage = "url('./assets/footButtons.png')";
            topContextImage.style.backgroundSize = "calc(var(--pixelScale) * 18 * 3) calc(var(--pixelScale) * 20 * 6)";
            topContextImage.style.width = "calc(var(--pixelScale) * 18)";
            topContextImage.style.height = "calc(var(--pixelScale) * 20)";
            topContextImage.style.backgroundPositionY = "calc(var(--pixelScale) * -40)";
            topContextImage.style.backgroundPositionX = `-2.5px`;
        }
    } else {
        topContextLabel.classList.remove('withImage')
        topContextImage.classList.remove('show')
    }
    topContextWrapper.classList.add('show');
    updateHeadButtonsVisibility();
    topContextLabel.textContent = message;
    setTimeout(() => {
        if (resetTimeout <= 1) {
            topContextWrapper.classList.remove('show');
            updateHeadButtonsVisibility();
        }
        resetTimeout -= 1;
    }, time)
}
const bottomContextWrapper = document.getElementById('bottomContextWrapper');
const bottomContextImage = document.getElementById('bottomContextImage');
let bottomResetTimeout = 0;
window.broadcastBottomContextMessage = function(image, time) {
    bottomResetTimeout += 1;
    if (image) {
        bottomContextImage.classList.add('show');
        const foundItem = window.defaultInventory.find(obj => obj.item === image);
        if (foundItem) { 
            bottomContextImage.style.backgroundImage = "url('./assets/items.png')";
            bottomContextImage.style.backgroundSize = "calc(var(--pixelScale) * 16 * 3) calc(var(--pixelScale) * 16 * 8)";
            bottomContextImage.style.width = "calc(var(--pixelScale) * 16)";
            bottomContextImage.style.height = "calc(var(--pixelScale) * 16)";
            bottomContextImage.style.backgroundPositionY = `${(-foundItem.spriteY * 16 * 2.5)}px`;
        }
    } else {
        bottomContextImage.classList.remove('show');
    }
    bottomContextWrapper.classList.add('show');
    setTimeout(() => {
        if (bottomResetTimeout <= 1) {
            bottomContextWrapper.classList.remove('show');
        }
        bottomResetTimeout -= 1;
    }, time);
};