function setButtonSprite(buttonId, spriteX, spriteY) {
  const button = document.getElementById(buttonId);
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;
  const backgroundPositionX = -spriteX * buttonWidth; 
  const backgroundPositionY = -spriteY * buttonHeight; 
  if (buttonId === 'randomiseCharToggle') {
    button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 1}px`;  
  } else if (button.classList.contains('mainGameMenu')) {
    button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 6}px`;
  } else {
    button.style.backgroundSize = `${buttonWidth * 3}px ${buttonHeight * 7}px`;  
  }
  button.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`;
}
let autoCloseInProgress = false
let buttonClickedDuringTimeout = true
window.autoCloseInProgress = autoCloseInProgress
window.addEventListener('autoClose', () => {
  window.autoCloseInProgress = autoCloseInProgress
  if (autoCloseInProgress) {
    return;
  } else if (!autoCloseInProgress) {
    autoCloseInProgress = true;
    buttonClickedDuringTimeout = false;
    autoClose(2000);
  }
});
window.autoClose = function(time, bypassArticleOpenCheck = false) {
  autoCloseInProgress = true;
  setTimeout(() => {
    if ((buttonClickedDuringTimeout || stoppedMoving) && !window.bypassMovementCheck) {
      autoCloseInProgress = false;
      window.autoCloseInProgress = autoCloseInProgress;
      return;
    } else {
      let meterWrapper = document.getElementById('meterWrapper');
      let menuWrapper = document.getElementById('sideMenuWrapper');
      let articleWrapper = document.getElementById('articleWrapper');
      const mainGameMenuToggle = document.getElementById('mainGameMenuToggle');
      if ((mainGameMenuToggle.dataset.toggled === 'true')) {
        handleButtonClick('mainGameMenuToggle')
      }
      closeTasks();
      closeInventory();
      if (meterWrapper.classList.contains('show')) {
        handleButtonClick('meterToggle');
        checkButtonHover('meterToggle');
      } else if (articleWrapper.classList.contains('show') || (bypassArticleOpenCheck && menuWrapper.classList.contains('show'))) {
        handleButtonClick('menuToggle');
        checkButtonHover('menuToggle');
      }
      setTimeout(() => {
        autoCloseInProgress = false;
        window.bypassMovementCheck = false;
        window.autoCloseInProgress = autoCloseInProgress;
      }, 200);
    }
  }, time);
}
window.closeMeter = function() {
  handleButtonClick('meterToggle');
  checkButtonHover('meterToggle');
}
let lastClickedButton = null;
let prev = false;
window.blockButtonClick = false;
window.handleButtonClick = function(buttonId, preventCloseMainGameMenus = false) {
  buttonClickedDuringTimeout = true;
  if (window.blockButtonClick) {
    return
  }
  if (!preventCloseMainGameMenus) {
    closeInventory();
    closeTasks();
  }
  if (buttonId === "randomiseCharToggle") {
    randomiseCharAppearance();
    return
  }
  if (buttonId === "learnMoreToggle") {
    const menuToggle = document.getElementById('menuToggle');
    menuToggle.dataset.toggled = 'false';
    handleButtonClick('menuToggle');
    refreshAllButtons();
    loadArticle(window.currentLearnMoreArticle);
    return
  }
  const buttons = document.querySelectorAll('.headButton, #mainGameMenuToggle');
  const clickedButton = document.getElementById(buttonId);
  const sideMenuWrapper = document.getElementById('sideMenuWrapper'); 
  const meterWrapper = document.getElementById('meterWrapper'); 
  const articleWrapper = document.getElementById('articleWrapper'); 
  const dialogueContextWrapper = document.getElementById('dialogueContextWrapper');
  const charSettingsWrapper = document.getElementById('charSettingsWrapper');
  const openCharMenuEvent = new Event('openCharMenu');
  const closeCharMenuEvent = new Event('closeCharMenu');
  if (buttonId === "mainGameMenuToggle" && charSettingsWrapper.classList.contains('show')) {
    return
  }
  if (!(lastClickedButton === 'charToggle') && (buttonId === 'charToggle') && (prev === false)) {
    prev = true;
    window.dispatchEvent(openCharMenuEvent);
  } else if ((lastClickedButton === 'charToggle') && !(buttonId === 'charToggle') && (prev === true)) {
    prev = false;
    window.dispatchEvent(closeCharMenuEvent);
  } else if ((lastClickedButton === 'charToggle') && (buttonId === 'charToggle') && (prev === false)) {
    prev = true;
    window.dispatchEvent(openCharMenuEvent);
  } else if (buttonId === 'charToggle') {
    prev = false;
    window.dispatchEvent(closeCharMenuEvent);
  }
  if (buttonId === 'charToggle' & window.dialogueToggled) {
    breakDialogue();
  }
  if (buttonId === 'dialogueToggle') {
    toggleDialogueOpen();
    return
  }
  const isToggled = clickedButton.dataset.toggled === 'true';
  buttons.forEach(button => {
    button.dataset.toggled = 'false'; 
    setButtonSprite(button.id, 0, button.dataset.spriteY); 
    if (!(buttonId === 'mainGameMenuToggle')) {
      button.classList.add('hidden'); 
    } else {
      button.classList.remove('hidden');
    }
  });
  if (!isToggled) {
    clickedButton.dataset.toggled = 'true';
    setButtonSprite(buttonId, 1, 1); 
    clickedButton.classList.remove('hidden'); 
    if (buttonId === 'menuToggle') {
      sideMenuWrapper.classList.add('show'); 
      dialogueContextWrapper.classList.add('hidden');
      meterWrapper.classList.add('fade-out');
      setTimeout(() => {
        meterWrapper.classList.remove('show', 'fade-out'); 
      }, 200);
    } else {
      dialogueContextWrapper.classList.remove('hidden');
    }
    if (buttonId === 'meterToggle') {
      meterWrapper.classList.add('show'); 
      sideMenuWrapper.classList.add('fade-out');
      articleWrapper.classList.add('fade-out');
      const indicator = document.getElementById('meterIndicator');
      indicator.style.visibility = 'hidden';
      setTimeout(() => {
      sideMenuWrapper.classList.remove('show', 'fade-out'); 
      articleWrapper.classList.remove('show', 'fade-out');
      closeArticle();
      }, 200);
    } else {
      const indicator = document.getElementById('meterIndicator');
      indicator.style.visibility = 'visible';
    }
  } else {
    if (sideMenuWrapper.classList.contains('show')) {
      sideMenuWrapper.classList.add('fade-out'); 
    }
    if (meterWrapper.classList.contains('show')) {
      meterWrapper.classList.add('fade-out'); 
    }
    if (buttonId === 'menuToggle' && articleWrapper.classList.contains('show')) {
      articleWrapper.classList.add('fade-out'); 
      const mainGameMenu = document.getElementById('mainGameMenuWrapper');
      mainGameMenu.classList.remove('hidden');
    }
    const indicator = document.getElementById('meterIndicator');
    indicator.style.visibility = 'visible';
    buttons.forEach(button => {
      button.classList.remove('hidden'); 
    });
    dialogueContextWrapper.classList.remove('hidden');
    const button = document.getElementById(buttonId);
    checkButtonHover(buttonId);
    setTimeout(() => {
      sideMenuWrapper.classList.remove('show', 'fade-out');
      meterWrapper.classList.remove('show', 'fade-out');
      articleWrapper.classList.remove('show', 'fade-out');
      updateFootButtonsVisibility();
      updateHeadButtonsVisibility();
      closeArticle();
    }, 200);
  }
  const buttonClickedEvent = new Event('buttonClick');
  window.dispatchEvent(buttonClickedEvent);  
  if (buttonId !== 'menuToggle' && buttonId !== 'meterToggle') {
    if (sideMenuWrapper.classList.contains('show')) {
      sideMenuWrapper.classList.add('fade-out'); 
    }
    if (meterWrapper.classList.contains('show')) {
      meterWrapper.classList.add('fade-out'); 
    }
    if (articleWrapper.classList.contains('show')) {
      articleWrapper.classList.add('fade-out'); 
      const mainGameMenu = document.getElementById('mainGameMenuWrapper');
      mainGameMenu.classList.remove('hidden');
    }
    setTimeout(() => {
      sideMenuWrapper.classList.remove('show', 'fade-out');
      meterWrapper.classList.remove('show', 'fade-out');
      articleWrapper.classList.remove('show', 'fade-out');
      closeArticle();
    }, 200);
  }
  updateHeadButtonsVisibility();
  updateFootButtonsVisibility();
  lastClickedButton = buttonId;
}
window.closeArticle = function() {
  const articleWrapper = document.getElementById('articleWrapper');
  const params = new URLSearchParams(window.location.search);
  if (params.has('article')) {
    params.delete('article');
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  }
  if (articleWrapper.classList.contains('show')) {
    articleWrapper.classList.add('fade-out'); 
    setTimeout(() => {
      articleWrapper.classList.remove('show', 'fade-out'); 
      updateFootButtonsVisibility();
      updateHeadButtonsVisibility();
    }, 200);
  }
  const menuButton = document.getElementById('menuToggle');
  const isToggled = menuButton.dataset.toggled === 'true';
  const sideMenuWrapper = document.getElementById('sideMenuWrapper');
  if (!sideMenuWrapper.classList.contains('show') && isToggled) {
    sideMenuWrapper.classList.add('show');
  }
}
let leftCheck = false;
let downCheck = false;
const dpr = window.devicePixelRatio || 1;
let indicatorUp = -9 / 6;
let indicatorDown = 3;
const indicator = document.getElementById('meterIndicator');
indicator.style.top = indicatorUp;
function addButtonEventListeners(buttonId) {
  const button = document.getElementById(buttonId);
  button.isHovered = false;
  button.addEventListener('mouseenter', () => {
    checkButtonHover(buttonId);
    if (leftCheck && downCheck) {
      const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
      setButtonSprite(buttonId, 2, spriteY); 
      if (buttonId === "meterToggle") {
        const indicator = document.getElementById('meterIndicator');
        indicator.style.top = indicatorDown;
        indicator.style.opacity = 1;
      }
    } else {
      button.isHovered = true;
      const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
      setButtonSprite(buttonId, 1, spriteY); 
      if (buttonId === "meterToggle") {
        const indicator = document.getElementById('meterIndicator');
        indicator.style.opacity = 1;
      }
    }
    leftCheck = false;
  });
  button.addEventListener('mousedown', () => {
    downCheck = true;
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 2, spriteY); 
    if (buttonId === "meterToggle") {
      const indicator = document.getElementById('meterIndicator');
      indicator.style.top = indicatorDown;
    }
  });
  button.addEventListener('mouseleave', () => {
    leftCheck = true;
    button.isHovered = false;
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 0, spriteY); 
    const indicator = document.getElementById('meterIndicator');
    indicator.style.top = indicatorUp;
    indicator.style.opacity = 0.7;
  });
  button.addEventListener('mouseup', () => {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 1, spriteY); 
    const indicator = document.getElementById('meterIndicator');
    indicator.style.top = indicatorUp;
  });
  document.addEventListener('mouseup', () => {
    downCheck = false;
    leftCheck = false;
  })
}
window.checkButtonHover = function(buttonId) {
  const button = document.getElementById(buttonId);
  if (button && button.isHovered) {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 1, spriteY); 
    const indicator = document.getElementById('meterIndicator');
    indicator.style.opacity = 1;
  } else {
    const spriteY = button.dataset.toggled === 'true' ? 1 : button.dataset.spriteY;
    setButtonSprite(buttonId, 0, spriteY); 
    const indicator = document.getElementById('meterIndicator');
    indicator.style.opacity = 0.7;
    indicator.style.top = indicatorUp;
  }
}
window.checkAnyButtonsToggled = function() {
  const buttons = document.querySelectorAll('.headButton, .footButton, .mainGameMenu');
  for (let button of buttons) {
    if (button.dataset.toggled === "true") {
      return true;
    }
  }
  return false;
}
function initialiseButtons() {
  const buttons = document.querySelectorAll('.headButton, .footButton, .mainGameMenu');
  buttons.forEach(button => {
    button.dataset.toggled = 'false'; 
    setButtonSprite(button.id, 0, button.dataset.spriteY); 
    button.classList.remove('hidden'); 
    addButtonEventListeners(button.id); 
  });
}
function addToggleListeners() {
  const buttons = document.querySelectorAll('.headButton, .footButton, #mainGameMenuToggle');
  buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.id)); 
  });
}
window.updateFootButtonsVisibility = function() {
  const mainGameMenu = document.getElementById('mainGameMenuWrapper');
  const sideMenuWrapper = document.getElementById('sideMenuWrapper');
  const articleWrapper = document.getElementById('articleWrapper');
  const charSettingsWrapper = document.getElementById('charSettingsWrapper');
  const dialogueToggle = document.getElementById('dialogueToggle');
  const learnMoreToggle = document.getElementById('learnMoreToggle');
  if (!dialogueToggle.classList.contains('hidden')) {
    if ((window.innerWidth <= 481 && (dialogueToggle.classList.contains('show')) )) {
      mainGameMenu.classList.add('hidden');
    } else if ((window.innerWidth <= 383 && (sideMenuWrapper.classList.contains('show')) || charSettingsWrapper.classList.contains('show')) || articleWrapper.classList.contains('show')) {
      mainGameMenu.classList.add('hidden');
      learnMoreToggle.classList.remove('show');
    } else {
      if (window.learnMoreVisible === true) {
        learnMoreToggle.classList.add('show');
      }
      if (window.dialogueToggled) {
        mainGameMenu.classList.add('hidden');
      } else if (!window.dialogueToggled) {
        mainGameMenu.classList.remove('hidden');
      }
    }
  }
  if (window.learnMoreVisible === false) {
    learnMoreToggle.classList.remove('show');
  }
  if (articleWrapper.classList.contains('show')) {
    document.getElementById('dialogueContextWrapper').classList.add('hidden')
  } else {
    document.getElementById('dialogueContextWrapper').classList.remove('hidden')
  }
}
window.updateHeadButtonsVisibility = function() {
  const articleWrapper = document.getElementById('articleWrapper');
  const meterWrapper = document.getElementById('meterWrapper');
  const topContextWrapper = document.getElementById('topContextWrapper');
  if (window.innerWidth <= 618 && articleWrapper.classList.contains('show')) {
    document.body.classList.add('article-open');
  } else {
    document.body.classList.remove('article-open');
  }
  if (window.innerWidth <= 738 && (meterWrapper.classList.contains('show') || topContextWrapper.classList.contains('show'))) {
    document.body.classList.add('meter-open');
  } else {
    document.body.classList.remove('meter-open');
  }
};
function handleInitialArticleLoad() {
  const params = new URLSearchParams(window.location.search);
  const article = params.get('article'); 
  if (article) {
    handleButtonClick('menuToggle'); 
    checkButtonHover('menuToggle')
  }
}
window.addEventListener('resize', updateHeadButtonsVisibility);
window.addEventListener('resize', updateFootButtonsVisibility);
window.addEventListener('toggleCharMenu', () => {
  handleButtonClick('charToggle');
});
window.refreshAllButtons = function() {
  const buttons = document.querySelectorAll('.headButton, .footButton, .mainGameMenu');
  buttons.forEach(button => {
    checkButtonHover(button.id);
  });
}
document.addEventListener('keydown', function(event) {
  if (event.key === 'C' || event.key === 'c') {
    handleButtonClick("charToggle")
  }
  if (event.key === 'M' || event.key === 'm') {
    handleButtonClick("meterToggle")
  }
});
document.addEventListener('DOMContentLoaded', () => {
  initialiseButtons();  
  addToggleListeners();  
  handleInitialArticleLoad(); 
  refreshAllButtons();
});