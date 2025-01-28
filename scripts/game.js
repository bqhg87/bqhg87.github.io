const canvas = document.getElementById('game');
const c = canvas.getContext('2d');

window.delMeter = 64;

const charSheet = new Image();
const paintingImage = new Image();
const shroomsImage = new Image();
const chickenNPC = new Image();
const npcIndicators = new Image();
charSheet.src = './assets/char.png';
paintingImage.src = './assets/painting.png';
shroomsImage.src = './assets/shrooms.png';
chickenNPC.src = './assets/chicken.png';
npcIndicators.src = './assets/npcIndicators.png';

// List of objects to be drawn on the canvas (Replace with JSON and caching later)
const objectsToDraw = [
  {
    image: charSheet,
    x: -24,
    y: -24,
    frameX: 0,
    frameY: 0,
    frameWidth: 48,
    frameHeight: 48,
    zIndex: 2
  },
  {
    image: paintingImage,
    x: -22.5,
    y: 1,
    frameWidth: 15,
    frameHeight: 7,
    zIndex: 1
  },
  {
    image: shroomsImage,
    name: 'shrooms',
    x: 14,
    y: -40,
    frameWidth: 14,
    frameHeight: 11,
    zIndex: 1
  },
  {
    image: chickenNPC,
    name: 'chicken',
    x: 120,
    y: -14,
    frameX: 0,
    frameY: 0,
    frameWidth: 16,
    frameHeight: 16,
    zIndex: 1
  }
];
const char = objectsToDraw[0]; // Which one is the character to control?
const chicken = objectsToDraw[3];
const shrooms = objectsToDraw[2];

const npcIndicatorData = {
  chicken: { 
    spriteX: 1, 
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
    spriteX: 2, 
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
    console.log("All sprites loaded");
    adjustForRetina();  // Adjust for retina display and set canvas size
    chickenAnimate();
    draw();  // Draw the images once they're all loaded
  }
}

paintingImage.onload = onImageLoad;
shroomsImage.onload = onImageLoad;
chickenNPC.onload = onImageLoad;
charSheet.onload = onImageLoad;


/////////////////////
// CAMERA SETTINGS //
/////////////////////

let freeCam = false; // freeCam is mostly for use in programming
let lowCamera = false;

let centerOnLoad = false; // Initially not centered (Variable to track it only centers on load)
let globalScale = 4; // Set this scale globally, it will affect size and positioning
const dpr = window.devicePixelRatio || 1;

let translationX = 0;
let translationY = 0;


if (freeCam === true) {
    console.log('Camea type: Free');

    // Listen for mouse movement on the entire document to continue dragging
    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
    
        // Update the translation based on mouse movement
        translationX += dx;
        translationY += dy;
    
        // Update the start position for the next move
        dragStartX = event.clientX;
        dragStartY = event.clientY;
    
        draw(); // Redraw the canvas with new translation
        }
    });
} else {
    console.log('Camea type: Fixed');
}

// Detect scroll events to adjust global scale and keep zoom centered
canvas.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent page scrolling

    // Determine the zoom direction (up or down)
    let newScale = globalScale;
    if (event.deltaY < 0) {
    // Zoom in
    newScale = Math.min(globalScale + 1, globalScale); // Previously: newScale = Math.min(globalScale + 1, maxScale); 
    } else if (event.deltaY > 0) {
    // Zoom out
    newScale = Math.max(globalScale - 1, globalScale); // Previously: newScale = Math.max(globalScale - 1, minScale);
    }

    if (newScale !== globalScale) {
    // Calculate the zoom factor
    const zoomFactor = newScale / globalScale;

    // Find the current center of the canvas in the unscaled coordinate system
    const centerX = (event.clientX - translationX) / globalScale;
    const centerY = (event.clientY - translationY) / globalScale;

    // Update the global scale
    globalScale = newScale;

    // Calculate the new translation to keep the zoom centered
    translationX = event.clientX - centerX * globalScale;
    translationY = event.clientY - centerY * globalScale;

    // Redraw the canvas with new scale and translation
    draw();
    }
});

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

  draw(); // Redraw the canvas with the updated scale

  // If the zoom animation is not complete, request the next frame
  if (progress < 1) {
    requestAnimationFrame(animateZoom);
  } else {
    zoomingInProgress = false; // Animation is complete
    zoomStartTime = null; // Reset start time for the next animation
  }
}

let blockMotion;

window.addEventListener('openCharMenu', () => {
  updateCharDirection(Math.PI / 2);
  if (zoomingInProgress && zoomTargetScale === 4) {
    // If zooming is in progress and we're zooming out, reverse the zoom direction
    zoomStartScale = globalScale;
    zoomTargetScale = 6; // Zoom in
    zoomStartTime = null; // Reset start time to handle the smooth reverse
    setTimeout(() => {
      blockMotion = true;
    }, (zoomDuration))
  } else if (!zoomingInProgress) {
    // If no zooming is in progress, start the zoom-in transition
    zoomStartScale = globalScale;
    zoomTargetScale = 6; // Zoom in
    zoomingInProgress = true; // Set zooming in progress
    animateZoom();
    setTimeout(() => {
      blockMotion = true;
    }, (0)) // Will be better once i code the character movement better with decelertation
  }
});

window.addEventListener('closeCharMenu', () => {
  blockMotion = false;
  if (zoomingInProgress && zoomTargetScale === 6) {
    // If zooming is in progress and we're zooming in, reverse the zoom direction
    zoomStartScale = globalScale;
    zoomTargetScale = 4; // Zoom out
    zoomStartTime = null; // Reset start time to handle the smooth reverse
    setTimeout(() => {
      blockMotion = false;
    }, (0)) 
  } else if (!zoomingInProgress) {
    // If no zooming is in progress, start the zoom-out transition
    zoomStartScale = globalScale;
    zoomTargetScale = 4; // Zoom out
    zoomingInProgress = true; // Set zooming in progress
    animateZoom();
    setTimeout(() => {
      blockMotion = false;
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

function centerCamera() {
    // Ensure the character is always centered by adjusting translation
    const charWidth = char.frameWidth * globalScale;
    const charHeight = char.frameHeight * globalScale;
  
    // Calculate the center of the canvas in world coordinates
    const canvasCenterX = canvas.width / 2 / dpr;
    const canvasCenterY = canvas.height / 2 / dpr;
  
    if (lowCamera === true) {
      translationX = canvasCenterX - (char.x * globalScale + charWidth / 2 + 60); // needs some variable dependant on relative direction of char to npc
      translationY = canvasCenterY - (char.y * globalScale + charHeight / 2 - 200);
    } else {
      // Set translation such that the character is centered
      translationX = canvasCenterX - (char.x * globalScale + charWidth / 2);
      translationY = canvasCenterY - (char.y * globalScale + charHeight / 2);
    }
}


///////////////
// RENDERING //
///////////////

// Resize canvas on window resize
window.addEventListener('resize', adjustForRetina);

// Draw all objects
function draw() {
  // Clear the canvas
  c.clearRect(0, 0, canvas.width, canvas.height);

  // When freeCam is false, center the camera on the character
  if (!freeCam) {
    centerCamera();
  }

  // Sort objects by zIndex (ascending order)
  const sortedObjects = [...objectsToDraw].sort((a, b) => a.zIndex - b.zIndex);

  // Loop through each object in the sorted array
  sortedObjects.forEach(obj => {
    const { image, x, y, frameX, frameY, frameWidth, frameHeight } = obj;

    // Apply global scale to both size and position, considering the translation
    const scaledX = (x * globalScale) + translationX;
    const scaledY = (y * globalScale) + translationY;

    // If this object is the sprite frame, draw only the specific frame
    if (frameX !== undefined && frameY !== undefined) {
      c.drawImage(image, frameX * frameWidth, frameY * frameHeight, frameWidth, frameHeight,
                  scaledX, scaledY, frameWidth * globalScale, frameHeight * globalScale);
    } else {
      // Otherwise, draw the full image (like the paintings and shrooms)
      const scaledWidth = image.width * globalScale;
      const scaledHeight = image.height * globalScale;
      c.drawImage(image, scaledX, scaledY, scaledWidth, scaledHeight);
    }
  });

  // Draw NPC indicators with potential sinusoidal movement
  [npcIndicators].forEach(() => {
    [chicken, shrooms].forEach(npc => {
      const indicatorData = npcIndicatorData[npc.name];

      // Check if the indicator is visible
      if (indicatorData.visible) {
        const baseIndicatorX = ((npc.x + indicatorData.indicatorOffsetX) * globalScale) + translationX; // Apply X offset
        let baseIndicatorY = ((npc.y + indicatorData.indicatorOffsetY) * globalScale) + translationY; // Apply Y offset

        // If 'animate' is true, apply sinusoidal movement in the y direction
        if (indicatorData.animate) {
          const time = Date.now() / 1000; // Time in seconds (can be adjusted for speed)
          
          // Apply sinusoidal movement with custom offset
          baseIndicatorY += indicatorData.sinDistance * Math.sin(time * indicatorData.sinSpeed + indicatorData.sinOffset); // Apply sinOffset
        }

        // Extract the correct sprite from the npcIndicators sprite sheet
        const spriteX = indicatorData.spriteX * 4; // Each dot is 4px wide
        const spriteY = indicatorData.spriteY * 4; // Assuming 1 row for now (can expand later)

        // Draw the NPC indicator with the scaled size
        c.drawImage(npcIndicators, spriteX, spriteY, 4, 4, baseIndicatorX, baseIndicatorY, 4 * globalScale, 4 * globalScale);
      }
    });
  });
}


//////////
// NPCS //
//////////

let toggleNPCs = {}; // Store states for multiple NPCs
const npcUpdateEvent = new Event('npcUpdate');

function checkNPC(npc, char, distance) {
  const distanceToNPC = proximityQuery(char, npc);

  if (distanceToNPC <= distance && !toggleNPCs[npc.name]) {
    // If the NPC is close, show the indicator with spriteY = 1
    toggleNPCs[npc.name] = true;
    npcIndicatorData[npc.name].spriteY = 1;  // Change spriteY when near
    window.dispatchEvent(npcUpdateEvent);
  } 
  if (distanceToNPC > distance && toggleNPCs[npc.name]) {
    // If the NPC is far away, revert the indicator to spriteY = 0
    toggleNPCs[npc.name] = false;
    npcIndicatorData[npc.name].spriteY = 0;  // Revert spriteY when far
    window.dispatchEvent(npcUpdateEvent);
  }
}

function checkNPCs() {
  let npcs = [chicken, shrooms]; // Add more NPCs here
  let distances = [20, 20]; // Array of distances

  npcs.forEach((npc, index) => {
    let distanceToNPC = distances[index]; // Get the corresponding distance for each NPC
    checkNPC(npc, char, distanceToNPC);
  });
}

let npcMemory;

  
function proximityQuery(object1, object2) {
  // Find the center of object1
  const object1CenterX = object1.x + object1.frameWidth / 2;
  const object1CenterY = object1.y + object1.frameHeight / 2;

  // Find the center of object2
  const object2CenterX = object2.x + object2.frameWidth / 2;
  const object2CenterY = object2.y + object2.frameHeight / 2;

  // Calculate the distance using Pythagoras' theorem
  const dx = object2CenterX - object1CenterX;
  const dy = object2CenterY - object1CenterY;

  // Hypotenuse (distance between centers)
  return Math.sqrt(dx * dx + dy * dy);
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

  const charCenterX = char.x + 24;
  const charCenterY = char.y + 24;

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
  let maxSpeed = 1.1;
  if (keysPressed.length !== 0) {
    angle = updateCharAngle();
    keyDominance = true;
  } else if (blockMouse) {
    updateAnimation(0, true);
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

  if ((isDragging || keysPressed.length !== 0) && maxSpeed >= 0.125 && !blockMotion) {
    moving(true);
    charSpeed += charAcceleration;
    charSpeed = Math.min(charSpeed, maxSpeed);
    updateCharDirection(angle);
    updateAnimation(80, false);
  } else {
    moving(false);
    charSpeed -= charDeceleration;
    charSpeed = Math.max(charSpeed, 0);
    updateAnimation(0, true);
    if (isDragging) {
      updateCharDirection(angle);
    }
  }

  if (!(keyDominance && (hKeys === 0))) {
    char.x += (charSpeed * Math.cos(angle));
  }
  if (!(keyDominance && (vKeys === 0))) {
    char.y += (charSpeed * Math.sin(angle));
  }

  // Constrain position to units of 0.25
  char.x = Math.round(char.x * 8) / 8;
  char.y = Math.round(char.y * 8) / 8;

  checkNPCs();
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
  
  if (stop) {
    char.frameX = 0;
    return
  }

  if (now - lastUpdate >= speed) {
    char.frameX = (char.frameX + 1) % 4;
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
  if (angle >= 45 && angle <= 135) { // Down
    char.frameY = 0;
  } else if (angle <= -45 && angle >= -135) { // Up
    char.frameY = 1;
  } else if (angle >= 135 || angle <= -135) { // Left
    char.frameY = 2;
  } else if (angle >= -45 && angle <= 45) { // Right
    char.frameY = 3;
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
    return angleHistory
  } else {
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