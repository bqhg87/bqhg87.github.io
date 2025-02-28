document.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });
document.addEventListener('gesturestart', (event) => {
event.preventDefault();
});
document.addEventListener('gesturechange', (event) => {
event.preventDefault();
});
document.addEventListener('gestureend', (event) => {
event.preventDefault();
});
document.body.addEventListener('contextmenu', (event) => {
const selectedText = window.getSelection().toString();
const target = event.target;
if (target.tagName.toLowerCase() === 'a' || selectedText) {
  return; 
}
event.preventDefault();
});
document.getElementById("resetGame").addEventListener("click", function() {
const confirmation = confirm("Are you sure you would like to reset the game? This will reset all your progress.");
if (confirmation) {
    window.char.x = 40;
    window.char.y = -94;
    const charAppearance = JSON.parse(localStorage.getItem('charAppearance'));
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/");
    });
    if (charAppearance) {
        localStorage.setItem('charAppearance', JSON.stringify(charAppearance));
    }
    const initialCharMemory = JSON.parse(localStorage.getItem('charMemory') || '{}');
    initialCharMemory.x = 40;
    initialCharMemory.y = -94;
    localStorage.setItem('charMemory', JSON.stringify(initialCharMemory));
    location.reload(true);
}
});