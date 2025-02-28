const dialogueWrapper = document.getElementById('dialogueWrapper');
const dialogue = document.getElementById('dialogue');
function updateTopPosition() {
    if (!window.dialogueEnding) {
        const height = dialogueWrapper.offsetHeight; 
        const windowHeight = window.innerHeight; 
        let lowCameraOffset = window.lowCameraOffset;
        const direction = window.npcRelativeDirection;
        const angleRad = direction * (Math.PI / 180);
        const angleAdjustFactor = (Math.sin(angleRad) * 2);
        window.lowAngleAdjust = angleAdjustFactor;
        dialogueWrapper.style.top = `${(windowHeight / 2) + (lowCameraOffset) - height - 2.5 * (36 - angleAdjustFactor * 4)}px`; 
    }
}
updateTopPosition();
window.addEventListener('resize', updateTopPosition);
window.addEventListener('typeLetter', updateTopPosition);
window.addEventListener('dialogueLoaded', updateTopPosition);
function updateDropdownPosition() {
    const dropdown = document.querySelector('.dropdown');
    const direction = window.npcRelativeDirection;
    let polarity = -1;
    if (Math.abs(direction) >= 90) {
        polarity = 1;
    }
    const angleRad = direction * (Math.PI / 180);
    const angleAdjustFactor = Math.abs(((Math.sin(angleRad) * 2)));
    if (dialogue && dropdown) {
        if (!window.isNpcSpeaking) {
            dropdown.style.left = `${dialogue.offsetWidth / 2 - 6 * 2.5}px`; 
        } else if ((dialogue.offsetWidth <= 210) & (polarity === 1)) {
            dropdown.style.left = `auto`;
            dropdown.style.right = `${3 * 2.5}px`;
        } else if ((dialogue.offsetWidth <= 226) & (polarity === -1)) {
                dropdown.style.left = `${3 * 2.5}px`;
                dropdown.style.right = `auto`;
        } else {
            dropdown.style.left = `${(dialogue.offsetWidth / 2 - 8 * 2.5 + (36 + -2 * angleAdjustFactor) * 2.5 * polarity)}px`; 
        }
    }
  }
window.addEventListener('resize', updateDropdownPosition);
window.addEventListener('typeLetter', updateDropdownPosition);
window.addEventListener('dialogueLoaded', updateDropdownPosition);