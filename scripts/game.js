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
    x: 1,
    y: 3,
    zIndex: 1
  },
  {
    image: shroomsImage,
    x: 12,
    y: 8,
    zIndex: 2
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
  // Clear the canvas only for the newly resized part
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Sort objects by zIndex so that higher zIndex values are drawn last (on top)
  objectsToDraw.sort((a, b) => a.zIndex - b.zIndex);

  // Draw each object from the objectsToDraw array
  objectsToDraw.forEach(obj => {
    const { image, x, y } = obj;
    // Apply global scale to both size and position
    const scaledX = x * globalScale;
    const scaledY = y * globalScale;
    const scaledWidth = image.width * globalScale;
    const scaledHeight = image.height * globalScale;

    c.drawImage(image, scaledX, scaledY, scaledWidth, scaledHeight);
  });
}

// Resize canvas on window resize
window.addEventListener('resize', adjustForRetina);

// Mouse position tracking
canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX / globalScale;
    const mouseY = event.clientY / globalScale;
  
    // Log the mouse coordinates adjusted for globalScale
    console.log(`Mouse coordinates (scaled): x = ${Math.floor(mouseX)}, y = ${Math.floor(mouseY)}`);
  });