window.console.info("Booting HarmOS...");

const canvas = document.getElementById('game');
const c = canvas.getContext('2d');
window.delMeter = 64;
window.gamemode = "restore";

const charSheet = new Image();
const shroomsImage = new Image();
const chickenNPC = new Image();
const npcIndicators = new Image();
const mapGuide = new Image();
const groundImage = new Image();
charSheet.src = './assets/char/base.png';
shroomsImage.src = './assets/shrooms.png';
chickenNPC.src = './assets/chicken.png';
npcIndicators.src = './assets/npcIndicators.png';
groundImage.src = './assets/ground.png';

const objectsToDraw = [
  {
    image: charSheet,
    x: -24,
    y: -24,
    frameX: 0,
    frameY: 0,
    frameWidth: 32,
    frameHeight: 32,
    feet: 5,
    zIndex: 2,

    skinTone: 0, // (0-7)
    blush: false,
    hair: 'braids',
    hairType: 3, // (0-13)
    clothingTop: 'skull',
    topType: 9, // (0-9)
    clothingBottom: 'skirt',
    bottomType: 9, // (0-9)
    shadow: false,
  },
  {
    image: shroomsImage,
    name: 'shrooms',
    properName: 'Mr. Lvndquist',
    x: 14,
    y: -40,
    frameWidth: 14,
    frameHeight: 11,
    feet: 2,
    zIndex: 1
  },
  {
    image: chickenNPC,
    name: 'chicken',
    properName: 'Chicken',
    x: 120,
    y: -14,
    frameX: 0,
    frameY: 0,
    frameWidth: 16,
    frameHeight: 16,
    feet: 2,
    zIndex: 1
  },
  {
    image: groundImage,
    x: -1144,
    y: -1064,
    zIndex: -1000
  },
];
const char = objectsToDraw[0]; // this is the character
const shrooms = objectsToDraw[1];
const chicken = objectsToDraw[2];

const npcIndicatorData = { 
  chicken: { 
    spriteX: 0, 
    spriteY: 0,
    indicatorOffsetX: 5,  // Offset in X direction (right)
    indicatorOffsetY: -5,  // Offset in Y direction (above)
    animate: true,  // Enable sinusoidal animation for chicken indicator
    sinDistance: 5, // Max movement in the y-direction (pixels)
    sinSpeed: 4.6,    // Speed of the oscillation (higher value = faster oscillation)
    sinOffset: 0,    // Offset for starting point of sine wave
    visible: true     // Set visibility property
  },
  shrooms: { 
    spriteX: 0, 
    spriteY: 0,
    indicatorOffsetX: 4.5,  // Offset in X direction (left)
    indicatorOffsetY: -8,  // Offset in Y direction (above)
    animate: true,  // Disable sinusoidal animation for shrooms indicator
    sinDistance: 5.1, // Max movement in the y-direction (pixels)
    sinSpeed: 4.4,    // Speed of the oscillation
    sinOffset: 20,   // Offset for starting point of sine wave (e.g., starts 45° offset)
    visible: true     // Set visibility property
  }
};

// Track number of loaded images
let imagesLoaded = 0;
const totalImages = objectsToDraw.length; // Update to include charSheet

// Check if the images load correctly
function onImageLoad() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    adjustForRetina();  // Adjust for retina display and set canvas size
    chickenAnimate();
    draw();  // Draw the images once they're all loaded
  }
}

shroomsImage.onload = onImageLoad;
chickenNPC.onload = onImageLoad;
charSheet.onload = onImageLoad;
groundImage.onload = onImageLoad;

///////////////////
// CHAR SETTINGS //
///////////////////

const shadow = new Image();
shadow.src = './assets/char/shadow.png';
const blush = new Image();
blush.src = './assets/char/blush.png';

let tops = {
  floral: new Image(),
  basic: new Image(),
  skull: new Image(),
};
tops.floral.src = './assets/char/floral.png';
tops.basic.src = './assets/char/basic.png';
tops.skull.src = './assets/char/skull.png';

let bottoms = {
  trousers: new Image(),
  skirt: new Image(),
};
bottoms.trousers.src = './assets/char/trousers.png';
bottoms.skirt.src = './assets/char/skirt.png';

let hair = {
  bob: new Image(),
  braids: new Image(),
  buzzcut: new Image(),
};
hair.bob.src = './assets/char/bob.png';
hair.braids.src = './assets/char/braids.png';
hair.buzzcut.src = './assets/char/buzzcut.png';



///////////////
// RENDERING //
///////////////

// Resize canvas on window resize
window.addEventListener('resize', adjustForRetina);

function drawCharacterWithClothing() {
  const { x, y, frameWidth, frameHeight, scale = 1 } = char;

  const scaledX = (x * scale * globalScale) + translationX;
  const scaledY = (y * scale * globalScale) + translationY;
  const scaledWidth = frameWidth * scale * globalScale;
  const scaledHeight = frameHeight * scale * globalScale;

  const skinToneOffsetX = char.skinTone * 8;
  const topOffsetX = char.topType * 8;
  const bottomOffsetX = char.bottomType * 8;
  const hairOffsetX = char.hairType * 8;

  // Draw character shadow
  if (char.shadow) {
    c.drawImage(shadow, 0, 0, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  // Draw base character
  c.drawImage(charSheet, (char.frameX + skinToneOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  if (char.blush) {
    c.drawImage(blush, (char.frameX + skinToneOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  let selectedTop = tops[char.clothingTop]; // Get the top image
  if (selectedTop) {
      c.drawImage(selectedTop, (char.frameX + topOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight
    );
  }

  let selectedBottom = bottoms[char.clothingBottom]; // Get the top image
  if (selectedBottom) {
      c.drawImage(selectedBottom, (char.frameX + bottomOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight
    );
  }

  let selectedHair = hair[char.hair]; // Get the top image
  if (selectedHair) {
      c.drawImage(selectedHair, (char.frameX + hairOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight
    );
  }
}
// Draw all objects
function draw() {
  // Clear the canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  centerCamera();

  // Continue drawing other objects (like shrooms, chicken, etc.)
  const sortedObjects = [...objectsToDraw].sort((a, b) => {
    const charFeet = char.y + char.frameHeight - char.feet; // Character's feet position

    const aFeet = a.y + a.frameHeight - a.feet; // Object a's feet position
    const bFeet = b.y + b.frameHeight - b.feet; // Object b's feet position

    if (charFeet < aFeet) {
      return 1; // A should be behind the character
    }

    if (charFeet < bFeet) {
      return -1; // B should be behind the character
    }

    return a.zIndex - b.zIndex;
  });

  sortedObjects.forEach(obj => {
    if (obj === char) {
      drawCharacterWithClothing(); // Draw the character with clothing
    } else {
      const { image, x, y, frameX, frameY, frameWidth, frameHeight, opacity = 1, scale = 1 } = obj;

      const scaledX = (x * scale * globalScale) + translationX;
      const scaledY = (y * scale * globalScale) + translationY;
      const scaledWidth = frameWidth * scale * globalScale;
      const scaledHeight = frameHeight * scale * globalScale;

      c.globalAlpha = opacity;

      if (frameX !== undefined && frameY !== undefined) {
        c.drawImage(image, frameX * frameWidth, frameY * frameHeight, frameWidth, frameHeight,
                    scaledX, scaledY, scaledWidth, scaledHeight);
      } else {
        const scaledImgWidth = image.width * scale * globalScale;
        const scaledImgHeight = image.height * scale * globalScale;
        c.drawImage(image, scaledX, scaledY, scaledImgWidth, scaledImgHeight);
      }

      c.globalAlpha = 1;
    }
  });

  // Draw NPC indicators
  [npcIndicators].forEach(() => {
    [chicken, shrooms].forEach(npc => {
      const indicatorData = npcIndicatorData[npc.name];

      if (indicatorData.visible) {
        const baseIndicatorX = ((npc.x + indicatorData.indicatorOffsetX) * globalScale) + translationX;
        let baseIndicatorY = ((npc.y + indicatorData.indicatorOffsetY) * globalScale) + translationY;

        if (indicatorData.animate) {
          const time = Date.now() / 1000;
          baseIndicatorY += indicatorData.sinDistance * Math.sin(time * indicatorData.sinSpeed + indicatorData.sinOffset);
        }

        const spriteX = indicatorData.spriteX * 4;
        const spriteY = indicatorData.spriteY * 4;

        c.drawImage(npcIndicators, spriteX, spriteY, 4, 4, baseIndicatorX, baseIndicatorY, 4 * globalScale, 4 * globalScale);
      }
    });
  });
}

////////////
// CAMERA //
////////////

let lowCamera = false;

let centerOnLoad = false; // Initially not centered (Variable to track it only centers on load)
let globalScale = 4; // Set this scale globally, it will affect size and positioning
const dpr = window.devicePixelRatio || 1;

let translationX = 0;
let translationY = 0;

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
let zoomStartTime = null;
let zoomStartScale = globalScale;
let zoomTargetScale = globalScale;
let zoomDuration = 500; // Duration for zoom animation in milliseconds
let zoomProgress = 0; // Progress of zoom (0 to 1)

let zoomingInProgress = false; // Flag to check if zooming is currently in progress

function animateZoom() {
  const currentTime = Date.now();
  
  // If no start time, initialize it
  if (!zoomStartTime) zoomStartTime = currentTime;

  const elapsedTime = currentTime - zoomStartTime;
  const progress = Math.min(elapsedTime / zoomDuration, 1); // Progress ranges from 0 to 1

  // Apply easing function to smooth the transition
  const easedProgress = easeInOut(progress);

  // Update the global scale based on the easing progress
  globalScale = zoomStartScale + (zoomTargetScale - zoomStartScale) * easedProgress;
  lerpLowCamera = lowCameraOffsetHistory + (lowCameraOffset - lowCameraOffsetHistory) * easedProgress;

  draw(); // Redraw the canvas with the updated scale

  // If the zoom animation is not complete, request the next frame
  if (progress < 1) {
    requestAnimationFrame(animateZoom);
  } else {
    zoomingInProgress = false; // Animation is complete
    zoomStartTime = null; // Reset start time for the next animation
    lowCameraOffsetHistory = lowCameraOffset;
  }
}

let blockMotion;
let blockDirectionUpdate = false;
let blockSpaceDialogueToggle = false;

window.addEventListener('openCharMenu', () => {
  lowCamera = false;
  blockSpaceDialogueToggle = true;
  updateLowCamera();
  updateCharDirection(Math.PI / 2);
  if (zoomingInProgress && zoomTargetScale === 4) {
    // If zooming is in progress and we're zooming out, reverse the zoom direction
    zoomStartScale = globalScale;
    zoomTargetScale = 6; // Zoom in
    zoomStartTime = null; // Reset start time to handle the smooth reverse
    setTimeout(() => {
      blockMotion = true;
      blockDirectionUpdate = true;
      bottomLabelWrapper.classList.remove('show');
      dialogueToggle.classList.remove('show');
    }, (zoomDuration))
  } else if (!zoomingInProgress) {
    // If no zooming is in progress, start the zoom-in transition
    zoomStartScale = globalScale;
    zoomTargetScale = 6; // Zoom in
    zoomingInProgress = true; // Set zooming in progress
    animateZoom();
    setTimeout(() => {
      blockMotion = true;
      blockDirectionUpdate = true;
      bottomLabelWrapper.classList.remove('show');
      dialogueToggle.classList.remove('show');
    }, (0)) // Will be better once i code the character movement better with decelertation
  }
});

window.addEventListener('closeCharMenu', () => {
  refreshCheckNPC();
  checkNPCs();
  blockMotion = false;
  blockSpaceDialogueToggle = false;
  if (zoomingInProgress && zoomTargetScale === 6) {
    // If zooming is in progress and we're zooming in, reverse the zoom direction
    zoomStartScale = globalScale;
    zoomTargetScale = 4; // Zoom out
    zoomStartTime = null; // Reset start time to handle the smooth reverse
    setTimeout(() => {
      blockMotion = false;
      blockDirectionUpdate = false;
    }, (0)) 
  } else if (!zoomingInProgress) {
    // If no zooming is in progress, start the zoom-out transition
    zoomStartScale = globalScale;
    zoomTargetScale = 4; // Zoom out
    zoomingInProgress = true; // Set zooming in progress
    animateZoom();
    setTimeout(() => {
      blockMotion = false;
      blockDirectionUpdate = false;
    }, (zoomDuration))
  }
});

// Adjust canvas for Retina scaling and fit the viewport
function adjustForRetina() {

  // Set canvas size to match the window's inner width and height
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  // Set CSS size to match the canvas size (so it scales appropriately)
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  // Scale the drawing context to match the device pixel ratio
  c.scale(dpr, dpr);

  if (!centerOnLoad) {
    centerCamera();
    centerOnLoad = true;
  }

  // Disable image smoothing for sharp rendering
  c.imageSmoothingEnabled = false;

  draw();  // Redraw images after resizing
}

let lerpLowCamera = 0;
let lowCameraOffset = 0;
let lowCameraOffsetHistory = 0;

function centerCamera() {
    // Ensure the character is always centered by adjusting translation
    const charWidth = (char.frameWidth) * globalScale;
    const charHeight = (char.frameHeight) * globalScale;
  
    // Calculate the center of the canvas in world coordinates
    const canvasCenterX = canvas.width / 2 / dpr;
    const canvasCenterY = canvas.height / 2 / dpr;
  
    translationX = canvasCenterX - (round(char.x, 8) * globalScale + charWidth / 2) + 4;
    if (!zoomingInProgress) {
      lerpLowCamera = lowCameraOffset
    }
    translationY = canvasCenterY - (round(char.y, 8) * globalScale + charHeight / 2 - lerpLowCamera);
}

function updateLowCamera() {
  const dialogueHeight = dialogueWrapper.offsetHeight; // Get the height of the dialogue element
  const windowHeight = window.innerHeight;

  const lowAngleAdjust = window.lowAngleAdjust;
  const wholeHeight = 100.5 - lowAngleAdjust * 4 * 2.5;

  if (!lowCamera) {
    lowCameraOffset = 0;
  } else if ((dialogueHeight + wholeHeight) >= (windowHeight * 0.3)) {
    lowCameraOffset = (dialogueHeight + wholeHeight - 38) / 2;
  } else {
    lowCameraOffset = (wholeHeight + 56) / 2;
  }

  window.lowCameraOffset = lowCameraOffset;
  centerCamera();
}

function handleLowCameraResize() {

}

window.addEventListener('resize', updateLowCamera);
window.addEventListener('typeLetter', updateLowCamera);
window.addEventListener('dialogueLoaded', updateLowCamera);


//////////
// NPCS //
//////////

let toggleNPCs = {}; // Store states for multiple NPCs
const npcUpdateEvent = new Event('npcUpdate');
let dialogueToggled = false;
window.dialogueToggled = dialogueToggled;
const distances = [20, 20]; // Add more NPCs' distances here
const npcs = [chicken, shrooms]; // Add more NPCs here

const bottomLabel = document.getElementById('bottomLabel');
const bottomLabelWrapper = document.getElementById('bottomLabelWrapper');
const dialogueToggle = document.getElementById('dialogueToggle');

function checkNPC(npc, char, distance) {
  const distanceToNPC = proximityQuery(char, npc);
  const isNear = distanceToNPC <= distance;
  const wasNear = toggleNPCs[npc.name];

  if (isNear && !wasNear) {
    toggleNPCs[npc.name] = true;
    npcIndicatorData[npc.name].spriteY = 1;  // Change spriteY when near
    bottomLabel.textContent = `Talk to ${npc.properName}`;
    bottomLabelWrapper.classList.add('show');
    dialogueToggle.classList.add('show');
    npcMemory = npc;
  } else if (!isNear && wasNear) {
    toggleNPCs[npc.name] = false;
    npcIndicatorData[npc.name].spriteY = 0;  // Revert spriteY when far
    bottomLabelWrapper.classList.remove('show');
    dialogueToggle.classList.remove('show');
  }

  if (isNear !== wasNear) {
    window.dispatchEvent(npcUpdateEvent);
  }
}

function refreshCheckNPC() {
  if (!npcMemory) {return}
  const npc = npcMemory;
  toggleNPCs[npc.name] = false;
}

function checkNPCs() {
  npcs.forEach((npc, index) => checkNPC(npc, char, distances[index]));
}

let spaceHeld = false; // Flag to track whether Space is held

function spaceDialogueToggle(event) {
  if (event.code !== "Space" || spaceHeld || blockSpaceDialogueToggle) return; // Prevent repeated triggers

  spaceHeld = true; // Set flag to prevent retriggering

  if (window.isTextAnimating) {
    skipDialogue();
    return;
  }

  loadDialogue("concept", 1, npcMemory.name); // LOAD STORY

  handleStartEndDialogue();
}

// Reset the flag when the key is released
function resetSpaceHeld(event) {
  if (event.code === "Space") {
    spaceHeld = false;
  }
}

window.addEventListener("keydown", spaceDialogueToggle);
window.addEventListener("keyup", resetSpaceHeld); // Listen for key release

window.toggleDialogueOpen = function () {
  loadDialogue("concept", 1, npcMemory.name); // LOAD STORY
  handleStartEndDialogue();
}

function clickDialogueToggle() {
  if (!dialogueToggled) {return}
  if (window.isTextAnimating) {
    skipDialogue();
    return
  };

  loadDialogue("concept", 1, npcMemory.name); // LOAD STORY

  for (let npcName in toggleNPCs) {
    if (toggleNPCs[npcName]) {
      if (window.finalPart === true) {
        window.finalPart = false;
        window.currentPart = 1;
        endDialogue(npcName);
      }
      break;
    }
  }
}
canvas.addEventListener("mousedown", clickDialogueToggle);
canvas.addEventListener("touchstart", clickDialogueToggle);

window.handleStartEndDialogue = function() {
  for (let npcName in toggleNPCs) {
    if (toggleNPCs[npcName]) {
      if (window.finalPart === false) {
        startDialogue(npcName);
      } else {
        window.finalPart = false;
        window.currentPart = 1;
        endDialogue(npcName);
      }
      break;
    }
  }
}

let npcMemory = false;

function startDialogue(npcName) {
  const npc = objectsToDraw.find(obj => obj.name === npcName);
  npcMemory = npc;
  const dialogueWrapper = document.getElementById('dialogueWrapper');
  bottomLabelWrapper.classList.remove('show');
  dialogueToggle.classList.remove('show');
  dialogueWrapper.classList.add('show');
  npcIndicatorData[npc.name].spriteX = -1;
  //loadDialogue("concept", 1, npcName);
  lowCameraOffsetHistory = lowCameraOffset;
  const direction = snapToValidDirection(directionQuery(char, npc));
  window.npcRelativeDirection = direction;
  teleportToNPC(npc, direction);
  blockDirectionUpdate = true;
  handleZoom(5);
  dialogueEnding = false;
  window.dialogueEnding = dialogueEnding;
  dialogueToggled = true;
  window.dialogueToggled = dialogueToggled;
  if (lowCamera === false) {
    lowCamera = true;
  }
}

let dialogueEnding = false;
window.dialogueEnding = dialogueEnding;

function endDialogue(npcName) {
  window.currentPart = 1;
  const npc = objectsToDraw.find(obj => obj.name === npcName);
  const dialogueWrapper = document.getElementById('dialogueWrapper');
  bottomLabelWrapper.classList.add('show');
  dialogueToggle.classList.add('show');
  dialogueWrapper.classList.remove('show');
  npcIndicatorData[npc.name].spriteX = 2;
  blockDirectionUpdate = false;
  lowCameraOffsetHistory = lowCameraOffset;
  handleZoom(4);
  lowCamera = false;
  dialogueEnding = true;
  window.dialogueEnding = dialogueEnding;
  dialogueToggled = false;
  window.dialogueToggled = dialogueToggled;
}

window.breakDialogue = function() {
  window.currentPart = 1;
  const npc = npcMemory;
  npcIndicatorData[npc.name].spriteX = 2;
  const dialogueWrapper = document.getElementById('dialogueWrapper');
  bottomLabelWrapper.classList.add('show');
  dialogueToggle.classList.add('show');
  dialogueWrapper.classList.remove('show');
  lowCamera = false;
  blockDirectionUpdate = false;
  lowCameraOffsetHistory = lowCameraOffset;
  dialogueEnding = true;
  window.dialogueEnding = dialogueEnding;
  dialogueToggled = false;
  window.dialogueToggled = dialogueToggled;
}

function handleZoom(targetScale) {
  if (zoomingInProgress) {
    zoomTargetScale = targetScale;
    zoomStartScale = globalScale;
    zoomStartTime = null;
  } else {
    zoomStartScale = globalScale;
    zoomTargetScale = targetScale;
    zoomingInProgress = true;
    animateZoom();
  }

  setTimeout(() => blockMotion = (targetScale === 5), zoomDuration);
}

function teleportToNPC(npc, direction) {
  const teleportDistance = 3.5;
  const angleRad = direction * (Math.PI / 180);
  char.x = (npc.x + npc.frameWidth / 2) + Math.cos(angleRad) * teleportDistance * 5 - char.frameWidth / 2;
  char.y = (npc.y + npc.frameHeight / 2) - Math.sin(angleRad) * teleportDistance * 5 - char.frameHeight / 2;
  updateCharDirection(Math.PI / 2); // Look down
  draw();
}

function snapToValidDirection(direction) {
  const validRanges = [
    { min: 150, max: 180 },
    { min: -180, max: -150 },
    { min: -30, max: 30 }
  ];

  // Check if direction is already in a valid range
  for (const range of validRanges) {
    if (direction >= range.min && direction <= range.max) {
      return direction; // Keep it as is
    }
  }

  // If not in a valid range, snap to the closest boundary
  let closestAngle = direction;
  let minDiff = Infinity;

  for (const range of validRanges) {
    for (const boundary of [range.min, range.max]) {
      const diff = Math.abs(direction - boundary);
      if (diff < minDiff) {
        minDiff = diff;
        closestAngle = boundary;
      }
    }
  }
  
  return closestAngle;
}

function proximityQuery(object1, object2) {
  const dx = object2.x + object2.frameWidth / 2 - (object1.x + object1.frameWidth / 2);
  const dy = object2.y + object2.frameHeight / 2 - (object1.y + object1.frameHeight / 2);
  return Math.sqrt(dx * dx + dy * dy);
}

function directionQuery(object1, object2) {
  const dx = object2.x + object2.frameWidth / 2 - (object1.x + object1.frameWidth / 2);
  const dy = object2.y + object2.frameHeight / 2 - (object1.y + object1.frameHeight / 2);
  return Math.atan2(dy, -dx) * (180 / Math.PI); // Convert to degrees
}


//////////////
// MOVEMENT //
//////////////

let mouseRadius = 0;
let mouseAngle = 0;

let stoppedMoving = true;

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

let keysPressed = [];

document.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd' || event.key === 'W' || event.key === 'A' || event.key === 'S' || event.key === 'D' || event.shiftKey && event.key === 'W' || event.shiftKey && event.key === 'A' || event.shiftKey && event.key === 'S' || event.shiftKey && event.key === 'D' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    if (!keysPressed.includes(event.key)) {
      keysPressed.push(event.key);
    }
  }
  if (event.getModifierState('CapsLock') || event.shiftKey) {
    keysPressed = keysPressed.filter(word => !['w', 'a', 's', 'd'].includes(word));
  } else if (!event.shiftKey) {
    keysPressed = keysPressed.filter(word => !['W', 'A', 'S', 'D'].includes(word));
  }
})
document.addEventListener('keyup', (event) => {
  keysPressed = keysPressed.filter(word => word !== event.key);
  updateCharAngle();
})

canvas.addEventListener('mousedown', (event) => {
  if (event.button === 0) { // Left clicks only
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  }
});
canvas.addEventListener('touchstart', (event) => {
  event.preventDefault(); // Prevent default to avoid issues with scrolling or zooming
  isDragging = true;
  dragStartX = event.touches[0].clientX; // First touch point
  dragStartY = event.touches[0].clientY;
});
document.addEventListener('mouseup', () => {
  isDragging = false;
  blockMouse = false;
});
document.addEventListener('touchend', () => {
  isDragging = false;
});

canvas.addEventListener('mousemove', (event) => {updateMouseData(event)});
canvas.addEventListener('touchmove', (event) => {
  event.preventDefault(); // Prevent scrolling / zooming during touchmove
  updateMouseData(event);
});

function updateMouseData(event) {
  let mouseXInGameCoords, mouseYInGameCoords;
  
  if (event.type === "mousemove") {
    mouseXInGameCoords = (event.clientX - translationX) / globalScale;
    mouseYInGameCoords = (event.clientY - translationY) / globalScale;
  } else if (event.type === "touchmove" || event.type === "touchstart") {
    mouseXInGameCoords = (event.touches[0].clientX - translationX) / globalScale;
    mouseYInGameCoords = (event.touches[0].clientY - translationY) / globalScale;
  }

  const charCenterX = char.x + 15.5;
  const charCenterY = char.y + 19;

  const dx = mouseXInGameCoords - charCenterX;
  const dy = mouseYInGameCoords - charCenterY;
 
  mouseRadius = Math.sqrt(dx * dx + dy * dy);
  mouseAngle = Math.atan2(dy, dx);
}

let angle = 0;
let keyDominance;
let blockMouse = false;
let charSpeed = 0;

function updateCharMovement() {
  if (blockDirectionUpdate) {
    char.frameX = 0;
    updateCharDirection(Math.PI / 2); // Look down
    return;
  }
  let maxSpeed = 1.1;
  if (keysPressed.length !== 0) {
    angle = updateCharAngle();
    keyDominance = true;
  } else if (blockMouse) {
    updateAnimation(80, true);
    return
  } else if (isDragging) {
    maxSpeed = limitCharMovement(mouseRadius, maxSpeed); // Adjust the 2nd argument to change the maximum speed
    angle = mouseAngle // limitAngle(mouseAngle, 8);
    keyDominance = false;
  }
  if (keyDominance && isDragging) {
    confirmBlockMouse(100);
  }
  const charAcceleration = 0.1;
  const charDeceleration = 0.25;

  let animationSpeed = 80 / (Math.max(0.6, maxSpeed) / 1.1)

  if ((isDragging || keysPressed.length !== 0) && maxSpeed >= 0.125 && !blockMotion) {
    moving(true);
    charSpeed += charAcceleration;
    charSpeed = Math.min(charSpeed, maxSpeed);
    updateCharDirection(angle);
    updateAnimation(animationSpeed, false);
  } else {
    moving(false);
    charSpeed -= charDeceleration;
    charSpeed = Math.max(charSpeed, 0);
    updateAnimation(animationSpeed, true);
    if (isDragging) {
      updateCharDirection(angle);
    }
  }

  if (!(keyDominance && (hKeys === 0))) {
    if ( !(((char.x <= -1700) && ((charSpeed * Math.cos(angle)) <= 0)) || (((char.x >= 1700) && ((charSpeed * Math.cos(angle)) >= 0)))) ) {
      char.x += (charSpeed * Math.cos(angle));
    }
  }
  if (!(keyDominance && (vKeys === 0))) {
    if ( !(((char.y <= -1400) && ((charSpeed * Math.sin(angle)) <= 0)) || (((char.y >= 1500) && ((charSpeed * Math.sin(angle)) >= 0)))) ) {
      char.y += (charSpeed * Math.sin(angle));
    }
  }

  // Constrain position to units of 0.25
  char.x = round(char.x, 100);
  char.y = round(char.y, 100);

  checkNPCs();
}

function round(input, div) {
  return Math.round(input * div) / div;
}

function confirmBlockMouse(time) {
  setTimeout(() => {
    if (keyDominance && isDragging) {
      blockMouse = true;
    }
  }, time);
}

function moving(isMoving) {
  if (isMoving === true) {
    stoppedMoving = false;
    window.stoppedMoving = stoppedMoving;
    let meterWrapper = document.getElementById('meterWrapper');
    let articleWrapper = document.getElementById('articleWrapper');
    let autoCloseInProgress = window.autoCloseInProgress;
    if ((meterWrapper.classList.contains('show') || articleWrapper.classList.contains('show')) && !autoCloseInProgress) {
      const autoCloseEvent = new Event('autoClose');
      window.dispatchEvent(autoCloseEvent);
    }
  } else {
    stoppedMoving = true;
    window.stoppedMoving = stoppedMoving;
  }
}

function limitAngle(angle, divisions) {
  const choppedPi = Math.PI / divisions;
  return Math.round(angle / choppedPi) * choppedPi;
}

let lastUpdate = 0;

function updateAnimation(speed, stop) {
  const now = performance.now();

  if (now - lastUpdate >= speed) {
    if (stop) {
      if (char.frameX === 0 || char.frameX === 1 || char.frameX === 4 || char.frameX === 5) {
        char.frameX = 0; // Instantly reset to 0
      } else {
        char.frameX = (char.frameX + 1) % 8; // Continue animating
        if (char.frameX === 0 || char.frameX === 4) {
          char.frameX = 0; // Stop once we reach 0 or 4
          return;
        }
      }
    } else {
      // Normal animation loop
      char.frameX = (char.frameX + 1) % 8;
    }
    lastUpdate = now;
  }
}

function limitCharMovement(radius, maxSpeed) {
  let maxRadius = 60;
  let minRadius = 30;

  const leastVPDimension = Math.min(window.innerWidth, window.innerHeight);
  if (leastVPDimension <= 320) {
    maxRadius = minRadius;
  } else if (!(leastVPDimension >= 1000)) {
    maxRadius = minRadius + (maxRadius - minRadius) * ((leastVPDimension - 320) / (1000 - 320));
  }

  let limitFactor = Math.min(radius / maxRadius, 1);
  let limitedMaxSpeed = maxSpeed * limitFactor;
  return limitedMaxSpeed;
}

function updateCharDirection(angle) {
  angle = angle * (180 / Math.PI); // Convert to degrees
  if (angle <= -67.5 && angle >= -112.5) { // N
    char.frameY = 1;
  } else if (angle >= -157.5 && angle <= -112.5) { // NW
    char.frameY = 7;
  } else if (angle >= -67.5 && angle <= -22.5) { // NE
    char.frameY = 6;
  } else if (angle >= 157.5 || angle <= -157.5) { // W
    char.frameY = 5;
  } else if (angle >= -22.5 && angle <= 22.5) { // E
    char.frameY = 4;
  } else if (angle >= 22.5 && angle <= 67.5) { // SE
    char.frameY = 3;
  } else if (angle >= 67.5 && angle <= 112.5) { // S
    char.frameY = 0;
  } else if (angle >= 112.5 && angle <= 157.5) { // SW
    char.frameY = 2;
  }
}

let vKeys = 0;
let hKeys = 0;
let angleHistory = 0;

function updateCharAngle() {
  const keyAcceleration = 0.1;
  const keyDeceleration = 0.2;
  let vBoth = false;
  let hBoth = false;
  let anyV = false;
  let anyH = false;

  if ((keysPressed.includes('w') || keysPressed.includes('W') || keysPressed.includes('ArrowUp')) && !((keysPressed.includes('s') || keysPressed.includes('S') || keysPressed.includes('ArrowDown')))) {
    if (vKeys < 0) {
      charSpeed = 0;
      vKeys = 0
    }
    anyV = true;
    vKeys = Math.min(vKeys + keyAcceleration, 1); // Up Exclusive
  } else if (!(keysPressed.includes('w') || keysPressed.includes('W') || keysPressed.includes('ArrowUp')) && ((keysPressed.includes('s') || keysPressed.includes('S') || keysPressed.includes('ArrowDown')))) {
    if (vKeys > 0) {
      charSpeed = 0;
      vKeys = 0
    }
    anyV = true
    vKeys = Math.max(vKeys - keyAcceleration, -1); // Down Exclusive
  } else {
    if (vKeys > 0) {
      vKeys = Math.max(vKeys - keyDeceleration, 0);
    } else if (vKeys < 0) {
      vKeys = Math.min(vKeys + keyDeceleration, 0);
    }
  }
  if ((keysPressed.includes('w') || keysPressed.includes('W') || keysPressed.includes('ArrowUp')) && ((keysPressed.includes('s') || keysPressed.includes('S') || keysPressed.includes('ArrowDown')))) {
    vBoth = true;
    anyV = true;
  }

  if ((keysPressed.includes('d') || keysPressed.includes('D') || keysPressed.includes('ArrowRight')) && !(keysPressed.includes('a') || keysPressed.includes('A') || keysPressed.includes('ArrowLeft'))) {
    if (hKeys < 0) {
      charSpeed = 0;
      hKeys = 0
    }
    anyH = true;
    hKeys = Math.min(hKeys + keyAcceleration, 1); // Right Exclusive
  } else if (!(keysPressed.includes('d') || keysPressed.includes('D') || keysPressed.includes('ArrowRight')) && (keysPressed.includes('a') || keysPressed.includes('A') || keysPressed.includes('ArrowLeft'))) {
    if (hKeys > 0) {
      charSpeed = 0;
      hKeys = 0
    }
    anyH = true;
    hKeys = Math.max(hKeys - keyAcceleration, -1); // Left Exclusive
  } else {
    if (hKeys > 0) {
      hKeys = Math.max(hKeys - keyDeceleration, 0);
    } else if (hKeys < 0) {
      hKeys = Math.min(hKeys + keyDeceleration, 0);
    }
  }
  if ((keysPressed.includes('d') || keysPressed.includes('D') || keysPressed.includes('ArrowRight')) && (keysPressed.includes('a') || keysPressed.includes('A') || keysPressed.includes('ArrowLeft'))) {
    hBoth = true;
    anyH = true;
  }

  if (keysPressed.length === 0) {
    vKeys = 0;
    hKeys = 0;
  }

  if ((vBoth && hBoth) || (vBoth && !anyH) || (hBoth && !anyV)) {
    charSpeed = 0;
    blockMotion = true;
    return angleHistory
  } else {
    blockMotion = false;
    angleHistory = Math.atan2(-vKeys, hKeys);
    return angleHistory;
  }
}

let chickenInterval;
function chickenAnimate() {
  if (chickenInterval) return;

  chickenInterval = setInterval(() => {
    // Increment frameX and loop back to 0 after the last frame
    chicken.frameX = (chicken.frameX + 1) % 2;
    draw(); // Redraw the image with the updated frameX
  }, 1000);
}

window.onload = function () {
  (function updateCharMovementLoop() {
    updateCharMovement();
    requestAnimationFrame(updateCharMovementLoop); // Schedule the next frame
    draw();
  })(); // Immediately invoke the function
};