const grid = document.getElementById('grid');
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let waves = [];

// Returns the size of the tile based on the screen width
function getSquareSize() {
   const width = window.innerWidth;
   if (width < 1400) return 60;
   if (width < 1800) return 80;
   return 100;
}

// Wave parameters: speed, decay, initial visibility
function getWaveParams() {
   const width = window.innerWidth;
   if (width < 1400) return { speed: 3, fade: 0.0007, startAlpha: 0.15 };
   if (width < 1800) return { speed: 3.5, fade: 0.0007, startAlpha: 0.15 };
   return { speed: 4, fade: 0.0007, startAlpha: 0.15 };
}

// Creates a grid of squares
function createGrid() {
   const squareSize = getSquareSize();
   const cols = Math.ceil(window.innerWidth / squareSize);
   const rows = Math.ceil(window.innerHeight / squareSize);

   grid.innerHTML = '';
   grid.style.gridTemplateColumns = `repeat(${cols}, ${squareSize}px)`;
   grid.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;

   for (let i = 0; i < cols * rows; i++) {
      const div = document.createElement('div');
      div.classList.add('square');
      grid.appendChild(div);
   }
}

// Sets the canvas size
function resizeCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
}

// Draws and updates waves
function drawWaves() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   const { speed, fade } = getWaveParams();

   waves.forEach((wave, index) => {
      const gradient = ctx.createRadialGradient(wave.x, wave.y, wave.radius * 0.5, wave.x, wave.y, wave.radius);

      gradient.addColorStop(0, `rgba(51, 56, 122, ${wave.alpha})`);
      gradient.addColorStop(1, `rgba(51, 56, 122, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      wave.radius += speed;
      wave.alpha -= fade;

      if (wave.alpha <= 0) {
         waves.splice(index, 1);
      }
   });

   requestAnimationFrame(drawWaves);
}

// Mouse movement response - adding a wave
function handleMouseMove(e) {
   const { startAlpha } = getWaveParams();
   waves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      alpha: startAlpha,
   });
}

// Reaction to window size change
function handleResize() {
   createGrid();
   resizeCanvas();
}

// Initialization
createGrid();
resizeCanvas();
drawWaves();

document.body.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);
