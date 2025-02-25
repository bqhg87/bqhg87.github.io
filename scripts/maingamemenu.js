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

    if (buttonId === "inventoryToggle") {
        button.addEventListener('click', () => {
            openInventory();
            handleButtonClick("mainGameMenuToggle", true);
            const inventoryLabel = document.getElementById('inventoryLabel')
            inventoryLabel.classList.remove('show');
            setCloseMenuButtonSprite("closeInventory", 0, 0);
            document.body.style.cursor = "default";
        })
    }
    if (buttonId === "tasksToggle") {
        button.addEventListener('click', () => {
            openTasks();
            handleButtonClick("mainGameMenuToggle", true);
            const tasksLabel = document.getElementById('tasksLabel')
            tasksLabel.classList.remove('show');
            setCloseMenuButtonSprite("closeTasks", 0, 0);
            document.body.style.cursor = "default";
        })
    }
}

document.addEventListener('keydown', function(event) {
    if (checkAnyButtonsToggled() || window.dialogueToggled) {return}

    if (event.key === 'I' || event.key === 'i') {
        if (window.isInventoryOpen) {
            closeInventory();
        } else {
            openInventory();
        }
    }
    if (event.key === 'T' || event.key === 't') {
        if (window.isTasksOpen) {
            closeTasks();
        } else {
            openTasks();
        }
    }
});

window.isInventoryOpen;

window.openInventory = function() {
    window.isInventoryOpen = true;
    const inventoryWrapper = document.getElementById('inventoryWrapper');
    const dialogueContextWrapper = document.getElementById('dialogueContextWrapper')

    inventoryWrapper.classList.add('show');
    setTimeout(() => {
        inventoryWrapper.classList.add('fade-in');
        refreshCloseMenuButtons();
        dialogueContextWrapper.classList.add('hidden');
    }, 10)
}

window.closeInventory = function() {
    window.isInventoryOpen = false;
    const inventoryWrapper = document.getElementById('inventoryWrapper');
    dialogueContextWrapper.classList.remove('hidden');
    checkNPCs();

    inventoryWrapper.classList.remove('fade-in');
    setTimeout(() => {
        inventoryWrapper.classList.remove('show');
    }, 200);
}


window.isTasksOpen;

window.openTasks = function() {
    window.isTasksOpen = true;
    const tasksWrapper = document.getElementById('tasksWrapper');
    const closeTaskButton = document.getElementById('closeTasks');

    closeTaskButton.classList.remove('inactive')

    tasksWrapper.classList.add('show');
    setTimeout(() => {
        tasksWrapper.classList.add('fade-in');
        setCloseMenuButtonSprite('closeTasks', 0, 0);
    }, 10)
}

window.closeTasks = function() {
    window.isTasksOpen = false;
    const tasksWrapper = document.getElementById('tasksWrapper');
    const closeTaskButton = document.getElementById('closeTasks');

    tasksWrapper.classList.remove('fade-in');
    closeTaskButton.classList.add('inactive')
    setTimeout(() => {
        tasksWrapper.classList.remove('show');
    }, 200);
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