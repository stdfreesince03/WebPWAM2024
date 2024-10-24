const canvas = document.getElementById('jumpCanvas');
const ctx = canvas.getContext('2d');

// Set up the canvas for higher DPI
function setHighDPI(canvas, context, scaleFactor = 2) {
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;

    canvas.width = originalWidth * scaleFactor;
    canvas.height = originalHeight * scaleFactor;
    canvas.style.width = `${originalWidth}px`;
    canvas.style.height = `${originalHeight}px`;

    context.scale(scaleFactor, scaleFactor);
    recalculateLedgePositions();
}

// Variables for ledges
let ledgeWidth1, ledgeX1, ledgeHeight1, ledgeY1;
let ledgeWidth2, ledgeX2, ledgeHeight2, ledgeY2;

// Recalculate ledge positions after scaling
function recalculateLedgePositions() {
    ledgeWidth1 = canvas.width * 0.35 / 2;
    ledgeX1 = 0;
    ledgeHeight1 = canvas.height * 0.5 / 2;
    ledgeY1 = canvas.height / 2 - ledgeHeight1;

    ledgeWidth2 = canvas.width * 0.3 / 2;
    ledgeX2 = canvas.width * 0.7 / 2;
    ledgeHeight2 = canvas.height * 0.3 / 2;
    ledgeY2 = canvas.height / 2 - ledgeHeight2;
}

// Initialize the canvas with higher DPI
setHighDPI(canvas, ctx);

// Get controls
const carSelect = document.getElementById('carSelect');
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');
const carName = document.getElementById('carName');
const carImage = document.getElementById('carImage');
const startButton = document.getElementById('startButton');

// Create modal elements
const modal = document.createElement('div');
modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    z-index: 1000;
    display: none;
    text-align: center;
`;

const modalOverlay = document.createElement('div');
modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: none;
`;

const modalContent = document.createElement('div');
modalContent.innerHTML = `
    <h2 style="margin-bottom: 20px; color: #333;">Game Over</h2>
    <p id="modalMessage" style="margin-bottom: 20px; font-size: 16px;"></p>
    <button id="restartButton" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
        Restart Game
    </button>
`;

modal.appendChild(modalContent);
document.body.appendChild(modalOverlay);
document.body.appendChild(modal);

// Car options with images and masses
const cars = [
    { name: 'Car 1', mass: 1000, image: 'car_1.png', jumpForce: 12 },
    { name: 'Car 2', mass: 1200, image: 'car_2.png', jumpForce: 11 },
    { name: 'Car 3', mass: 1400, image: 'car_3.png', jumpForce: 10 },
    { name: 'Car 4', mass: 1600, image: 'car_4.png', jumpForce: 9 },
    { name: 'Car 5', mass: 1800, image: 'car_5.png', jumpForce: 8 },
    { name: 'Car 6', mass: 2000, image: 'car_6.png', jumpForce: 7 }
];

// Physics constants
const GRAVITY = 9.81;
const TIME_STEP = 1/60;
const FRICTION = 0.98;
const RESTITUTION = 0.5;

// Game state
let gameState = {
    speed: 0,
    selectedCar: cars[0],
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    isJumping: false,
    phase: 'ready', // 'ready', 'approach', 'jump', 'landing', 'driving', 'finished'
    lastTimestamp: 0,
    carSize: { width: 0, height: 0 },
    initialSpeed: 0 // Store initial speed for consistent movement
};

// Car image handling
let carImg = new Image();

function preloadCarImage() {
    carImg.src = `./images/${gameState.selectedCar.image}`;
    carImg.onload = () => {
        gameState.carSize = {
            width: canvas.width * 0.05,
            height: canvas.height * 0.05
        };
        positionCarOnLedge();
        drawScene();
    };
}

// Drawing functions
function drawGrassyLedge() {
    ctx.fillStyle = '#228B22';
    ctx.fillRect(ledgeX1, ledgeY1, ledgeWidth1, ledgeHeight1);
    ctx.fillRect(ledgeX2, ledgeY2, ledgeWidth2, ledgeHeight2);
}

function drawCar(x, y) {
    ctx.drawImage(carImg, x, y, gameState.carSize.width, gameState.carSize.height);
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrassyLedge();

    // Only draw car if it's within canvas bounds
    if (gameState.position.x < canvas.width) {
        drawCar(gameState.position.x, gameState.position.y);
    } else if (gameState.phase !== 'finished') {
        // Car has left the canvas
        showGameOverModal('Success! Car made it through! Play again?');
    }
}

// Physics and game logic
function updatePhysics(deltaTime) {
    switch(gameState.phase) {
        case 'approach':
            gameState.position.x += gameState.speed * deltaTime;
            if (gameState.position.x >= ledgeWidth1 - gameState.carSize.width) {
                gameState.phase = 'jump';
                initiateJump();
            }
            break;

        case 'jump':
            gameState.position.x += gameState.velocity.x * deltaTime;
            gameState.position.y += gameState.velocity.y * deltaTime;
            gameState.velocity.y += GRAVITY * deltaTime;
            checkCollisions();
            break;

        case 'landing':
        case 'driving':
            // Use the initial speed for consistent movement
            gameState.position.x += gameState.initialSpeed * deltaTime;
            break;
    }
}

function checkCollisions() {
    const carBottom = gameState.position.y + gameState.carSize.height;
    const carRight = gameState.position.x + gameState.carSize.width;

    // Check for landing on second ledge
    if (gameState.position.x >= ledgeX2 &&
        carRight <= ledgeX2 + ledgeWidth2 &&
        carBottom >= ledgeY2 &&
        gameState.velocity.y > 0) {

        gameState.position.y = ledgeY2 - gameState.carSize.height;
        gameState.velocity.y = 0;
        gameState.velocity.x = gameState.initialSpeed; // Maintain initial speed
        gameState.phase = 'driving';
    }

    // Check for side collision with second ledge
    if (carRight >= ledgeX2 &&
        gameState.position.x < ledgeX2 &&
        carBottom > ledgeY2) {

        gameState.position.x = ledgeX2 - gameState.carSize.width;
        gameState.velocity.x *= -RESTITUTION;
        gameState.velocity.y *= RESTITUTION;
    }

    // Check for falling off
    if (carBottom > canvas.height) {
        showGameOverModal('Car crashed! Try again?');
    }
}

function initiateJump() {
    const jumpAngle = Math.PI / 4; // 45 degrees
    const jumpSpeed = gameState.selectedCar.jumpForce;

    gameState.velocity.x = gameState.speed;
    gameState.velocity.y = -jumpSpeed * Math.sin(jumpAngle);
}

// Modal handling
function showGameOverModal(message) {
    gameState.phase = 'finished';
    gameState.isJumping = false;
    document.getElementById('modalMessage').textContent = message;
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
}

function hideGameOverModal() {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
}

function restartGame() {
    hideGameOverModal();
    speedSlider.disabled = false;
    carSelect.disabled = false;
    positionCarOnLedge();
    gameState.phase = 'ready';
}

// Game control functions
function startJump() {
    if (gameState.isJumping) return;

    gameState.isJumping = true;
    gameState.phase = 'approach';
    gameState.initialSpeed = parseFloat(speedSlider.value) * (1000 / 3600); // Convert km/h to m/s
    gameState.speed = gameState.initialSpeed;
    gameState.lastTimestamp = performance.now();

    speedSlider.disabled = true;
    carSelect.disabled = true;

    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (!gameState.isJumping) return;

    const deltaTime = (timestamp - gameState.lastTimestamp) / 1000;
    gameState.lastTimestamp = timestamp;

    updatePhysics(deltaTime);
    drawScene();

    if (gameState.phase !== 'finished') {
        requestAnimationFrame(gameLoop);
    }
}

// Setup functions
function updateCarSelection() {
    gameState.selectedCar = cars[parseInt(carSelect.value) - 1];
    carName.textContent = gameState.selectedCar.name;
    carImage.src = `./images/${gameState.selectedCar.image}`;
    preloadCarImage();
}

function updateSpeed() {
    if (!gameState.isJumping) {
        speedValue.textContent = speedSlider.value;
    }
}

function positionCarOnLedge() {
    gameState.position = {
        x: ledgeX1 + (ledgeWidth1 * 0.2),
        y: ledgeY1 - gameState.carSize.height
    };
    gameState.velocity = { x: 0, y: 0 };
    gameState.phase = 'ready';
    drawScene();
}

// Event listeners and initialization
carSelect.addEventListener('input', updateCarSelection);
speedSlider.addEventListener('input', updateSpeed);
startButton.addEventListener('click', startJump);
document.getElementById('restartButton').addEventListener('click', restartGame);
preloadCarImage();