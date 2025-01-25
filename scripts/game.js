const canvas = document.getElementById('game');
const c = canvas.getContext('2d');

window.delMeter = 64;

const paintingImage = new Image();
const shroomsImage = new Image();
const charSheet = new Image();
const chickenNPC = new Image();
paintingImage.src = './assets/painting.png';
shroomsImage.src = './assets/shrooms.png';
chickenNPC.src = './assets/chicken.png';
charSheet.src = './assets/char.png';

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

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let translationX = 0;
let translationY = 0;


if (freeCam === true) {
    console.log('Camea type: Free');

    // Check mouse position for drag start
    canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    });

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

    // Stop dragging on mouse up
    document.addEventListener('mouseup', () => {
    isDragging = false;
    });
} else {
    console.log('Camea type: Fixed');

    // window.addEventListener('resize', function() { centerCamera(); });
    // window.addEventListener('gesturestart', function(event) { event.preventDefault(); }); // Disable pinch zoom gestures (for touch devices)
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

let blockTravel;
let blockMotion;

function freezeDirection(direction, motionAllowed) {
  charDirectionHistory.push(direction);
  updateCharDirection();
  charDirectionHistory = [];
  updateCharDirection();
  blockTravel = true;
  if (!motionAllowed) {
    blockMotion = true;
  }
}

window.addEventListener('openCharMenu', () => {
  freezeDirection('down', false)
  if (zoomingInProgress && zoomTargetScale === 4) {
    // If zooming is in progress and we're zooming out, reverse the zoom direction
    zoomStartScale = globalScale;
    zoomTargetScale = 6; // Zoom in
    zoomStartTime = null; // Reset start time to handle the smooth reverse
    setTimeout(() => {
      allowMove = false;
    }, (zoomDuration))
  } else if (!zoomingInProgress) {
    // If no zooming is in progress, start the zoom-in transition
    zoomStartScale = globalScale;
    zoomTargetScale = 6; // Zoom in
    zoomingInProgress = true; // Set zooming in progress
    animateZoom();
    setTimeout(() => {
      allowMove = false;
    }, (0)) // Will be better once i code the character movement better with decelertation
  }
});

window.addEventListener('closeCharMenu', () => {
  blockTravel = false;
  blockMotion = false;
  if (zoomingInProgress && zoomTargetScale === 6) {
    // If zooming is in progress and we're zooming in, reverse the zoom direction
    zoomStartScale = globalScale;
    zoomTargetScale = 4; // Zoom out
    zoomStartTime = null; // Reset start time to handle the smooth reverse
    setTimeout(() => {
      allowMove = true;
    }, (0)) 
  } else if (!zoomingInProgress) {
    // If no zooming is in progress, start the zoom-out transition
    zoomStartScale = globalScale;
    zoomTargetScale = 4; // Zoom out
    zoomingInProgress = true; // Set zooming in progress
    animateZoom();
    setTimeout(() => {
      allowMove = true;
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
}


let charDirectionHistory = [];
let keysPressed = [];

document.addEventListener('keydown', (event) => {
  if (blockTravel) {
    if (!blockMotion) {cycleFrameX();}
    return
  }

  if (event.key === 's' || event.key === 'ArrowDown') {
      if (!charDirectionHistory.includes('down')) { 
          charDirectionHistory.push('down');
          charStep = 0;
      }
  } else if (event.key === 'w' || event.key === 'ArrowUp') {
      if (!charDirectionHistory.includes('up')) { 
          charDirectionHistory.push('up'); 
          charStep = 0;
      }
  } else if (event.key === 'a' || event.key === 'ArrowLeft') {
      if (!charDirectionHistory.includes('left')) { 
          charDirectionHistory.push('left'); 
          charStep = 0;
      }
  } else if (event.key === 'd' || event.key === 'ArrowRight') {
      if (!charDirectionHistory.includes('right')) { 
          charDirectionHistory.push('right'); 
          charStep = 0;
      }
  } else {
      return
  }

  if (!keysPressed.includes(event.key)) {
      keysPressed.push(event.key);
  };

  cycleFrameX(); // Continue cycling frameX if any direction key is pressed
  charMove();
  updateCharDirection();
});


// Keyup event listener
document.addEventListener('keyup', (event) => {
    keysPressed = keysPressed.filter(word => word !== event.key);

    // Remove direction from charDirectionHistory on keyup
    if (keysPressed.includes('s') === false && keysPressed.includes('ArrowDown') === false) {
        charDirectionHistory = charDirectionHistory.filter(word => word !== 'down');
    } if (keysPressed.includes('w') === false && keysPressed.includes('ArrowUp') === false) {
        charDirectionHistory = charDirectionHistory.filter(word => word !== 'up');
    } if (keysPressed.includes('a') === false && keysPressed.includes('ArrowLeft') === false) {
        charDirectionHistory = charDirectionHistory.filter(word => word !== 'left');
    } if (keysPressed.includes('d') === false && keysPressed.includes('ArrowRight') === false) {
        charDirectionHistory = charDirectionHistory.filter(word => word !== 'right');
    }

    // Reset frameX if no direction keys are pressed
    if (charDirectionHistory.length === 0) {
        objectsToDraw[2].frameX = 0;
        stopCyclingFrameX(); // Stop cycling when no keys are pressed
    }

    updateCharDirection()
});

let charDirection = '';

function updateCharDirection() {
    if (charDirectionHistory[charDirectionHistory.length - 1] === 'down') {
        char.frameY = 0;
        charDirection = 'down';
    } else if (charDirectionHistory[charDirectionHistory.length - 1] === 'up') {
        char.frameY = 1;
        charDirection = 'up';
    } else if (charDirectionHistory[charDirectionHistory.length - 1] === 'left') {
        char.frameY = 2;
        charDirection = 'left';
    } else if (charDirectionHistory[charDirectionHistory.length - 1] === 'right') {
        char.frameY = 3;
        charDirection = 'right';
    } else {
        charDirection = '';
    }
}
  
// Set the animation speed (lower value = faster animation)
const charAnimateSpeed = 100; // In milliseconds, adjust as needed
let charAcceleration = 0.5;
const charStepMax = 2.5;
let charStep = 0;
const charStepInterval = 35;

// Function to cycle frameX based on charAnimateSpeed
let frameCycleInterval;
function cycleFrameX() {
  // If cycling is already happening, do nothing
  if (frameCycleInterval) return;

  // Start cycling
  frameCycleInterval = setInterval(() => {
    // Increment frameX and loop back to 0 after 3
    char.frameX = (char.frameX + 1) % 4;
    draw(); // Redraw the image with the updated frameX
  }, charAnimateSpeed); // Use charAnimateSpeed for animation timing
}

let chickenInterval;
function chickenAnimate() {
  if (chickenInterval) return;

  chickenInterval = setInterval(() => {
    // Increment frameX and loop back to 0 after the last frame
    chicken.frameX = (chicken.frameX + 1) % 2;
    draw(); // Redraw the image with the updated frameX
  }, 1000); // Use charAnimateSpeed for animation timing
}

let frameMoveInterval;
let stoppedMoving = true;
let allowMove = true;

function charMove() {
    if (frameMoveInterval) return;

    frameMoveInterval = setInterval(() => {

      if (allowMove === true) {
        if (charStep < charStepMax) {
            charStep += charAcceleration;
        }

        if (charDirection == 'down') {char.y += charStep; moved();}
        else if (charDirection == 'up') {char.y -= charStep; moved();}
        else if (charDirection == 'left') {char.x -= charStep; moved();}
        else if (charDirection == 'right') {char.x += charStep; moved();}
        else {
          stoppedMoving = true;
          window.stoppedMoving = stoppedMoving;
        }
        draw();
      }
    }, charStepInterval); // Use charAnimateSpeed for animation timing
}

let toggleNPCs = {}; // Store states for multiple NPCs
const npcUpdateEvent = new Event('npcUpdate');

function checkNPC(npc, char, distance) {
  const distanceToNPC = proximityQuery(char, npc);

  if ((distanceToNPC <= distance) && (!toggleNPCs[npc.name])) {
    toggleNPCs[npc.name] = true;
    window.dispatchEvent(npcUpdateEvent);
  } 
  if ((distanceToNPC > distance) && (toggleNPCs[npc.name])) {
    toggleNPCs[npc.name] = false;
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

window.addEventListener('npcUpdate', () => {
  const activeNPCs = Object.entries(toggleNPCs).filter(([key, value]) => value);
  const numActive = activeNPCs.length;

  if (numActive === 1) {
    // If exactly one NPC is true, handle the exclusive case
    const [npc] = activeNPCs;
    console.log(`hi ${npc[0]}`); // npc[0] is the key (e.g., 'chicken' or 'shrooms')
  } else if (numActive === 0) {
    // If no NPCs are true
    console.log('bai');
  }
});


function moved() {
  stoppedMoving = false;
  window.stoppedMoving = stoppedMoving
  let meterWrapper = document.getElementById('meterWrapper');
  let articleWrapper = document.getElementById('articleWrapper');
  let autoCloseInProgress = window.autoCloseInProgress;
  if ((meterWrapper.classList.contains('show') || articleWrapper.classList.contains('show')) && !autoCloseInProgress) {
    const autoCloseEvent = new Event('autoClose');
    window.dispatchEvent(autoCloseEvent);
  }
  checkNPCs();
}

// Stop cycling frameX
function stopCyclingFrameX() {
    if (frameCycleInterval) {
      let keyPressDetected = false;
  
      // Define the event listener
      const keyListener = (event) => {
        const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"];
        if (keys.includes(event.key)) {
          keyPressDetected = true;
        }
      };
  
      // Add the event listener
      window.addEventListener("keydown", keyListener);
  
      // Delay clearing the interval by the same animation speed
      setTimeout(() => {
        // If a keypress was detected, exit early
        if (keyPressDetected) {
          window.removeEventListener("keydown", keyListener);
          return;
        }
  
        clearInterval(frameCycleInterval);
        frameCycleInterval = null;
        char.frameX = 0; // Reset to the first frame
        draw(); // Redraw the image after resetting
  
        // Remove the event listener after completing
        window.removeEventListener("keydown", keyListener);
      }, charAnimateSpeed);
    }
  }
  
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
  
  