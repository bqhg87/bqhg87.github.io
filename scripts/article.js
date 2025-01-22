const articleBG = document.getElementById('articleBG');
const dpr = window.devicePixelRatio || 1;

// Create the canvas element and append it to the div
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none'; // Prevents blocking interaction
articleBG.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Disable image smoothing to prevent blurry pixels
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;

// Variables for customization
const pixelScale = 2; // Size of each "pixel"
const cornerMatrix = [
  // 7x7 matrix: 0 = transparent, 1 = edge (red), 2 = fill (blue)
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 2],
  [0, 0, 1, 0, 1, 2, 2],
  [1, 0, 0, 1, 2, 2, 2],
  [1, 0, 1, 2, 2, 2, 2],
  [0, 1, 2, 2, 2, 2, 2],
];

// Function to rotate the matrix by 90 degrees clockwise
function rotateMatrix(matrix) {
  const size = matrix.length;
  const rotated = Array(size).fill().map(() => Array(size).fill(0));
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      rotated[x][size - 1 - y] = matrix[y][x];
    }
  }
  return rotated;
}

// Function to draw the matrix pattern in the corners
function drawCorners() {
  const rect = articleBG.getBoundingClientRect(); // Get the current size of the div
  canvas.width = rect.width;
  canvas.height = rect.height;

  const width = rect.width / dpr;
  const height = rect.height / dpr;

  const cornerSize = cornerMatrix.length * pixelScale;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.scale(dpr, dpr);

  // Helper function to draw a corner matrix
  function drawMatrix(matrix, offsetX, offsetY) {
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        const pixelX = Math.floor(offsetX + x * pixelScale); // Ensure pixel alignment
        const pixelY = Math.floor(offsetY + y * pixelScale); // Ensure pixel alignment

        if (cell === 1) {
          ctx.fillStyle = '#FF0000'; // Red for edge
        } else if (cell === 2) {
          ctx.fillStyle = '#0000FF'; // Blue for fill
        } else {
          return; // Transparent, skip drawing
        }

        ctx.fillRect(pixelX, pixelY, pixelScale, pixelScale);
      });
    });
  }

  // Draw each corner with the correct rotation and position
  drawMatrix(cornerMatrix, 0, 0); // Top-left (no rotation)
  drawMatrix(rotateMatrix(cornerMatrix), (width - cornerSize), 0); // Top-right (90° rotation)
  drawMatrix(rotateMatrix(rotateMatrix(cornerMatrix)), width - cornerSize, height - cornerSize); // Bottom-left (270° rotation)
  drawMatrix(rotateMatrix(rotateMatrix(rotateMatrix(cornerMatrix))), 0, height - cornerSize); // Bottom-right (180° rotation)
}

window.addEventListener('resize', drawCorners);

// Draw the initial pattern
drawCorners();
