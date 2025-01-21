console.log('Booting harmOS...');

const canvas = document.getElementById('game');
const c = canvas.getContext('2d');

const paintingImage = new Image();
const shroomsImage = new Image();
const charSheet = new Image();
paintingImage.src = './assets/painting.png';
shroomsImage.src = './assets/shrooms.png';
charSheet.src = './assets/char.png';

// List of objects to be drawn on the canvas (Replace with JSON and caching later)
const objectsToDraw = [
  {
    image: paintingImage,
    x: 2,
    y: 1
  },
  {
    image: shroomsImage,
    x: 14,
    y: 8
  },
  {
    image: charSheet,
    x: -24,
    y: -24,
    frameX: 0,
    frameY: 0,
    frameWidth: 48,
    frameHeight: 48
  }
];

// Track number of loaded images
let imagesLoaded = 0;
const totalImages = objectsToDraw.length; // Update to include charSheet

// Check if the images load correctly
function onImageLoad() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    console.log("All images loaded");
    adjustForRetina();  // Adjust for retina display and set canvas size
    draw();  // Draw the images once they're all loaded
  }
}

paintingImage.onload = onImageLoad;
shroomsImage.onload = onImageLoad;
charSheet.onload = onImageLoad;




/////////////////////
// CAMERA SETTINGS //
/////////////////////

let freeCam = false; // freeCam is mostly for use in programming

let centerOnLoad = false; // Initially not centered (Variable to track it only centers on load)
let globalScale = 10; // Set this scale globally, it will affect size and positioning
const minScale = 5; // Minimum scale limit
const maxScale = 20; // Maximum scale limit
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
    newScale = Math.min(globalScale + 1, maxScale);
    } else if (event.deltaY > 0) {
    // Zoom out
    newScale = Math.max(globalScale - 1, minScale);
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
  
    // Set translation such that the character is centered
    translationX = canvasCenterX - (char.x * globalScale + charWidth / 2);
    translationY = canvasCenterY - (char.y * globalScale + charHeight / 2);
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

  // Loop through each object in objectsToDraw
  objectsToDraw.forEach(obj => {
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

const char = objectsToDraw[2]; // The sprite character
let charDirectionHistory = [];
let keysPressed = [];

document.addEventListener('keydown', (event) => {
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
    charMove()
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
    console.log(charDirection)
}
  
// Set the animation speed (lower value = faster animation)
const charAnimateSpeed = 100; // In milliseconds, adjust as needed
const charAcceleration = 0.666666666666666;
const charStepMax = 2;
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

let frameMoveInterval;
function charMove() {
    if (frameMoveInterval) return;

    frameMoveInterval = setInterval(() => {
        if (charStep < charStepMax) {
            charStep += charAcceleration;
        }

        if (charDirection == 'down') {char.y += charStep;}
        if (charDirection == 'up') {char.y -= charStep;}
        if (charDirection == 'left') {char.x -= charStep;}
        if (charDirection == 'right') {char.x += charStep;}
        draw();
    }, charStepInterval); // Use charAnimateSpeed for animation timing
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