const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let tracking = false;
let lastPosition = { x: -1, y: -1 };

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    if (!tracking) {
      tracking = true;
      console.log("Tracking Started");
    }
  }
  if (e.ctrlKey && e.key === 'x') {
    e.preventDefault();
    if (tracking) {
      tracking = false;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'canvas_image.png';
      link.click();
      console.log("Tracking Stopped and Image Saved");
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (tracking) {
    const { x, y } = getCursorPos(e);
    if (lastPosition.x !== -1 && lastPosition.y !== -1) {
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastPosition = { x, y };
  }
});

function getCursorPos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

document.getElementById('save-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  if (username) {
    alert(`Username saved: ${username}`);
  }
});
