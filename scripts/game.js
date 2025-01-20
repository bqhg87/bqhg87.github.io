const canvas = document.getElementById('game');
const c = canvas.getContext('2d');

// Image loading
const image = new Image();
const shroomsImage = new Image();
image.src = './assets/painting.png';
shroomsImage.src = './assets/shrooms.png';

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
  }
];

// Track number of loaded images
let imagesLoaded = 0;
const totalImages = objectsToDraw.length;

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

// Variables for dragging the canvas
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

// Current translation of the canvas (origin point)
let translationX = 0;
let translationY = 0;

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
    } else {
      // Log mouse position even when not dragging
      const mouseX = Math.floor((event.clientX - translationX) / globalScale);
      const mouseY = Math.floor((event.clientY - translationY) / globalScale);
      console.log(`Mouse coordinates: X: ${mouseX}, Y: ${mouseY}`);
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

  // Draw each object from the objectsToDraw array
  objectsToDraw.forEach(obj => {
    const { image, x, y } = obj;

    // Apply global scale to both size and position, considering the translation
    const scaledX = (x * globalScale) + translationX;
    const scaledY = (y * globalScale) + translationY;
    const scaledWidth = image.width * globalScale;
    const scaledHeight = image.height * globalScale;

    // Draw the image with the current translation (panned view)
    c.drawImage(image, scaledX, scaledY, scaledWidth, scaledHeight);
  });
}

// Resize canvas on window resize
window.addEventListener('resize', adjustForRetina);