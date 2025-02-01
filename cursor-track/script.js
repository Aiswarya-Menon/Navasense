const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let tracking = false;
let lastPosition = { x: -1, y: -1 };

// Start tracking when Ctrl + S is pressed (starts from current cursor position)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault(); // Prevent the default browser action for Ctrl + S
    if (!tracking) {
      tracking = true;
      console.log("Tracking Started");
    }
  }

  // Stop tracking and save image when Ctrl + X is pressed
  if (e.ctrlKey && e.key === 'x') {
    e.preventDefault(); // Prevent the default browser action for Ctrl + X
    if (tracking) {
      tracking = false;

      // Save the canvas as an image
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'canvas_image.png';
      link.click();

      console.log("Tracking Stopped and Image Saved");
    }
  }
});

// When mouse moves on the canvas, track the cursor if tracking is active
canvas.addEventListener('mousemove', (e) => {
  if (tracking) {
    const { x, y } = getCursorPos(e);
    if (lastPosition.x !== -1 && lastPosition.y !== -1) {
      // Draw a line from the last position to the current one
      ctx.strokeStyle = 'red'; // Set the stroke color to red
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastPosition = { x, y };
  }
});

// Convert mouse event to canvas coordinates
function getCursorPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
