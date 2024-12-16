const startMenu = document.getElementById("startMenu");

// Set the startMenuPassed variable to false on first load or reset
function resetStartMenu() {
    localStorage.setItem('startMenuPassed', 'true'); //OVERRIDE
    if (localStorage.getItem('startMenuPassed') === null) {
        localStorage.setItem('startMenuPassed', 'false'); // If not set, init as false
    }
}
  
function initStartMenu() {
    resetStartMenu();
    if (localStorage.getItem('startMenuPassed') === 'false') {
        startMenu.classList.add("init");
    } else {
        startMenu.classList.remove("init");
    }
}

function passStartMenu() {
    localStorage.setItem('startMenuPassed', 'true');
    initStartMenu();
}

resetStartMenu();
initStartMenu();

console.log('startMenuPassed:', localStorage.getItem('startMenuPassed'));