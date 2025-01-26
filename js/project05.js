const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const brushSizeInput = document.getElementById("brush-size");
const brushColorInput = document.getElementById("brush-color");
const canvasColorInput = document.getElementById("canvas-color");
const undoButton = document.getElementById("undo-button");
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");

// Set initial canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Variables for drawing
let drawing = false;
let brushSize = parseInt(brushSizeInput.value);
let brushColor = brushColorInput.value;
let canvasColor = canvasColorInput.value;
const paths = []; // Stores the drawing paths for undo functionality
let currentPath = [];

// Initialize the canvas with a background color
function initializeCanvas() {
  ctx.fillStyle = canvasColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Start drawing
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  currentPath = []; // Start a new path
  draw(e);
});

// Stop drawing
canvas.addEventListener("mouseup", () => {
  drawing = false;
  if (currentPath.length > 0) paths.push([...currentPath]); // Save the current path
  currentPath = [];
  ctx.beginPath();
});

// Draw on canvas
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  draw(e);
});

// Drawing function
function draw(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = brushColor;

  if (currentPath.length === 0) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    const lastPoint = currentPath[currentPath.length - 1];
    ctx.moveTo(lastPoint.x, lastPoint.y);
  }

  ctx.lineTo(x, y);
  ctx.stroke();

  currentPath.push({ x, y, color: brushColor, size: brushSize });
}

// Redraw all paths after undo or background change
function redrawPaths() {
  paths.forEach((path) => {
    ctx.beginPath();
    path.forEach((point, index) => {
      ctx.lineWidth = point.size;
      ctx.strokeStyle = point.color;

      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }

      ctx.stroke();
    });
  });
}

// Undo the last stroke
undoButton.addEventListener("click", () => {
  if (paths.length > 0) {
    paths.pop(); // Remove the last path
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear canvas
    redrawPaths(); // Redraw remaining paths
  }
});

// Clear the canvas
clearButton.addEventListener("click", () => {
  paths.length = 0; // Clear all saved paths
  ctx.fillStyle = canvasColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Reset canvas background
});

// Change brush size
brushSizeInput.addEventListener("input", () => {
  brushSize = parseInt(brushSizeInput.value);
});

// Change brush color
brushColorInput.addEventListener("input", () => {
  brushColor = brushColorInput.value;
});

// Change canvas background color
canvasColorInput.addEventListener("input", () => {
  canvasColor = canvasColorInput.value;
  ctx.fillStyle = canvasColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Redraw background
  redrawPaths(); // Redraw all saved paths
});

// Save the canvas as an image
saveButton.addEventListener("click", () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "drawing.png";
  link.click();
});

// Initialize canvas on load
initializeCanvas();
