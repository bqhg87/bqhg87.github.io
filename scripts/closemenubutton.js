window.setCloseMenuButtonSprite = function(buttonId, spriteX, spriteY) {
    const button = document.getElementById(buttonId);
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    const backgroundPositionX = -spriteX * buttonWidth; 
    const backgroundPositionY = -spriteY * buttonHeight; 
    button.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`;
    button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 1}px`;  
}
function addCloseMenuButtonEventListeners(buttonId) {
    const button = document.getElementById(buttonId);
    button.isHovered = false;
    button.addEventListener('mouseover', () => {
        button.isHovered = true;
        setCloseMenuButtonSprite(buttonId, 1, 0); 
    });
    button.addEventListener('mousedown', () => {
        setCloseMenuButtonSprite(buttonId, 2, 0); 
    });
    button.addEventListener('mouseout', () => {
        button.isHovered = false;
        setCloseMenuButtonSprite(buttonId, 0, 0); 
    });
}
function initializeCloseMenuButton() {
    const articleButton = document.getElementById('closeArticle');
    const meterButton = document.getElementById('closeMeter');
    const inventoryButton = document.getElementById('closeInventory');
    const tasksButton = document.getElementById('closeTasks');
    setCloseMenuButtonSprite('closeArticle', 0, 0); 
    setCloseMenuButtonSprite('closeMeter', 0, 0); 
    setCloseMenuButtonSprite('closeInventory', 0, 0); 
    setCloseMenuButtonSprite('closeTasks', 0, 0); 
    addCloseMenuButtonEventListeners('closeArticle');
    articleButton.addEventListener('click', () => {closeArticle();});
    addCloseMenuButtonEventListeners('closeMeter');
    meterButton.addEventListener('click', () => {closeMeter();});
    addCloseMenuButtonEventListeners('closeInventory');
    inventoryButton.addEventListener('click', () => {closeInventory();});
    addCloseMenuButtonEventListeners('closeTasks');
    tasksButton.addEventListener('click', () => {closeTasks();});
}
window.refreshCloseMenuButtons = function() {
    setCloseMenuButtonSprite('closeArticle', 0, 0); 
    setCloseMenuButtonSprite('closeMeter', 0, 0); 
    setCloseMenuButtonSprite('closeInventory', 0, 0); 
    setCloseMenuButtonSprite('closeTasks', 0, 0); 
}
document.addEventListener('DOMContentLoaded', () => {
    initializeCloseMenuButton();  
});
window.checkArticleOverflow = function() {
    const article = document.querySelector('.article');
    const closeButton = document.getElementById('closeArticle');
    if (article.scrollHeight > article.clientHeight) {
        closeButton.style.marginRight = '35px';
    } else {
        closeButton.style.marginRight = '27.5px';  
    }
}
window.addEventListener('load', checkArticleOverflow);
window.addEventListener('resize', checkArticleOverflow);