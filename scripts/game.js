const canvas = document.getElementById('game');
const c = canvas.getContext('2d');

// Image loading
const image = new Image();
const shroomsImage = new Image();
const spriteSheet = new Image();
image.src = './assets/painting.png';
shroomsImage.src = './assets/shrooms.png';
spriteSheet.src = './assets/char.png';

// Initial Global scale factor for all objects
let globalScale = 20; // Set this scale globally, it will affect size and positioning
const minScale = 10; // Minimum scale limit
const maxScale = 100; // Maximum scale limit

// List of objects to be drawn on the canvas
const objectsToDraw = [
  {
    image: image,
    x: 2,
    y: 1
  },
  {
    image: shroomsImage,
    x: 14,
    y: 8
  },
  // Add an object for the sprite frame (frame [0,0])
  {
    image: spriteSheet,
    x: 8,
    y: 4,
    frameX: 0,
    frameY: 0,
    frameWidth: 48,
    frameHeight: 48
  }
];

// Track number of loaded images
let imagesLoaded = 0;
const totalImages = objectsToDraw.length; // Update to include spriteSheet

// Check if the images load correctly
function onImageLoad() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    console.log("All images loaded");
    adjustForRetina();  // Adjust for retina display and set canvas size
    draw();  // Draw the images once they're all loaded
  }
}

image.onload = onImageLoad;
shroomsImage.onload = onImageLoad;
spriteSheet.onload = onImageLoad;

// Variables for dragging the canvas
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

// Current translation of the canvas (origin point)
let translationX = 0;
let translationY = 0;

// Char speed variable (frameX cycle speed)
let charSpeed = 7; // Adjust for how fast you want to cycle through frames

// Key states for movement and frame cycling
let keysPressed = {};

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

// Detect scroll events to adjust global scale and keep zoom centered
canvas.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent page scrolling
  
    // Determine the zoom direction (up or down)
    let newScale = globalScale;
    if (event.deltaY < 0) {
      // Zoom in
      newScale = Math.min(globalScale + 5, maxScale);
    } else if (event.deltaY > 0) {
      // Zoom out
      newScale = Math.max(globalScale - 5, minScale);
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
  const dpr = window.devicePixelRatio || 1;

  // Set canvas size to match the window's inner width and height
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  // Set CSS size to match the canvas size (so it scales appropriately)
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  // Scale the drawing context to match the device pixel ratio
  c.scale(dpr, dpr);

  // Disable image smoothing for sharp rendering
  c.imageSmoothingEnabled = false;

  console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
  
  draw();  // Redraw images after resizing
}

// Draw all objects
function draw() {
  // Clear the canvas
  c.clearRect(0, 0, canvas.width, canvas.height);

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

// Resize canvas on window resize
window.addEventListener('resize', adjustForRetina);

// Keydown event listener
document.addEventListener('keydown', (event) => {
    const char = objectsToDraw[2]; // The sprite character
  
    // Adjust the position and frameY based on the key pressed
    if (event.key === 's' || event.key === 'ArrowDown') {
      char.frameY = 0; // Move down
      char.y += 1;     // Move sprite down (increase y)
    } else if (event.key === 'w' || event.key === 'ArrowUp') {
      char.frameY = 1; // Move up
      char.y -= 1;     // Move sprite up (decrease y)
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {
      char.frameY = 2; // Move left
      char.x -= 1;     // Move sprite left (decrease x)
    } else if (event.key === 'd' || event.key === 'ArrowRight') {
      char.frameY = 3; // Move right
      char.x += 1;     // Move sprite right (increase x)
    }
  
    keysPressed[event.key] = true; // Mark the key as pressed
    cycleFrameX(); // Continue cycling frameX if any key is pressed
  });
  
  // Keyup event listener
  document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false; // Mark the key as released
  
    // If no direction keys are pressed, stop cycling and reset frameX
    if (!Object.values(keysPressed).includes(true)) {
      objectsToDraw[2].frameX = 0;
      stopCyclingFrameX(); // Stop cycling
    }
  });
  
  // Function to cycle frameX based on charSpeed
  let frameCycleInterval;
  function cycleFrameX() {
    const char = objectsToDraw[2]; // The sprite character
  
    // If cycling is already happening, do nothing
    if (frameCycleInterval) {
      return;
    }
  
    // Start cycling if any direction key is pressed
    if (Object.values(keysPressed).includes(true)) {
      frameCycleInterval = setInterval(() => {
        char.frameX = (char.frameX + 1) % 4; // Cycle through frames 0-3
        draw(); // Redraw the image with the new frameX
      }, 1000 / charSpeed); // Speed based on charSpeed
    }
  }
  
  // Stop cycling frameX
  function stopCyclingFrameX() {
    clearInterval(frameCycleInterval);
    frameCycleInterval = null;
    draw(); // Ensure to redraw the image when stopping cycling
  }