const canvas = document.getElementById('game');
const c = canvas.getContext('2d');

// Image loading
const image = new Image();
const shroomsImage = new Image();
image.src = './assets/painting.png';
shroomsImage.src = './assets/shrooms.png';

// Global scale factor for all objects
const globalScale = 20; // Set this scale globally, it will affect size and positioning

// List of objects to be drawn on the canvas
const objectsToDraw = [
  {
    image: image,
    x: 3,
    y: 2
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

// Check mouse position while dragging
canvas.addEventListener('mousemove', (event) => {
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
canvas.addEventListener('mouseup', () => {
  isDragging = false;
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

    // Apply global scale to both size and position
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