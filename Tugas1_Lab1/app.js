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

    console.log(`Ledge 1 - X: ${ledgeX1}, Y: ${ledgeY1}, Width: ${ledgeWidth1}, Height: ${ledgeHeight1}`);
    console.log(`Ledge 2 - X: ${ledgeX2}, Y: ${ledgeY2}, Width: ${ledgeWidth2}, Height: ${ledgeHeight2}`);
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

// Car options with images and masses
const cars = [
    { name: 'Car 1', mass: 1000, image: 'car_1.png' },
    { name: 'Car 2', mass: 1200, image: 'car_2.png' },
    { name: 'Car 3', mass: 1400, image: 'car_3.png' },
    { name: 'Car 4', mass: 1600, image: 'car_4.png' },
    { name: 'Car 5', mass: 1800, image: 'car_5.png' },
    { name: 'Car 6', mass: 2000, image: 'car_6.png' }
];

let speed = parseFloat(speedSlider.value) * 1000 / 3600;
let selectedCar = cars[0];
let carX = 0, carY = canvas.height - 50;
let isJumping = false;
let carImg = new Image();
let phase = 1; // 1 for straight motion, 2 for projectile
let initialVelocityX = 0, initialVelocityY = 0;

// Preload the car image
function preloadCarImage() {
    carImg.src = `./images/${selectedCar.image}`;
    carImg.onload = () => {
        drawScene();
    };
}

// Function to draw the grassy ledges
function drawGrassyLedge() {
    ctx.fillStyle = '#228B22';
    ctx.fillRect(ledgeX1, ledgeY1, ledgeWidth1, ledgeHeight1);
    ctx.fillRect(ledgeX2, ledgeY2, ledgeWidth2, ledgeHeight2);
}

// Function to draw the car at a specific position
function drawCar(x, y) {
    const carWidth = canvas.width * 0.05; // 5% of canvas width
    const carHeight = canvas.height * 0.05; // 5% of canvas height
    ctx.drawImage(carImg, x, y, carWidth, carHeight);
}

// Function to update car selection
function updateCarSelection() {
    selectedCar = cars[parseInt(carSelect.value) - 1];
    carName.textContent = selectedCar.name;
    carImage.src = `./images/${selectedCar.image}`;
    preloadCarImage();
    positionCarOnLedge();
}

// Function to update speed
function updateSpeed() {
    speed = parseFloat(speedSlider.value) * 1000 / 3600;
    speedValue.textContent = speedSlider.value;
}

// Function to position the car on the first ledge
function positionCarOnLedge() {
    carX = ledgeX1 + (ledgeWidth1 * 0.2);
    carY = ledgeY1 - (canvas.height * 0.04);

    console.log(`Initial Car Position - X: ${carX}, Y: ${carY}`);
    drawScene();
}

// Function to draw the entire scene
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrassyLedge();
    drawCar(carX, carY);
}

// Start the jump
function startJump() {
    carX = ledgeX1 + (ledgeWidth1 * 0.2);
    carY = ledgeY1 - (canvas.height * 0.04);
    phase = 1; // Reset to straight motion
    isJumping = true;
    initialVelocityX = speed; // Initial velocity in X direction for projectile
    initialVelocityY = 0; // Start with no vertical velocity
    animateJump();
}

// Animation loop for car jump
function animateJump() {
    if (!isJumping) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrassyLedge();

    // Phase 1: Move straight along the ledge
    if (phase === 1) {
        carX += 2; // Adjust the increment for speed
        if (carX >= ledgeWidth1 - (canvas.width * 0.05)) {
            phase = 2; // Switch to projectile motion
            carX = ledgeWidth1 - (canvas.width * 0.05); // Align at ledge edge
            initialVelocityY = speed * Math.sin(toRadians(45)); // Set initial Y velocity for projectile
        }
    }

    // Phase 2: Apply projectile physics
    if (phase === 2) {
        const timeStep = 0.1; // Adjust for smoothness
        const gravity = 9.8;

        // Update X and Y using the current velocities
        carX += initialVelocityX * timeStep;
        carY -= (initialVelocityY * timeStep - 0.5 * gravity * Math.pow(timeStep, 2));
        initialVelocityY -= gravity * timeStep; // Adjust Y velocity due to gravity
    }

    console.log(`Car Position - X: ${carX.toFixed(2)}, Y: ${carY.toFixed(2)}`);
    drawCar(carX, carY);

    // Check if the car is off-screen or hits the ground
    if (carX >= canvas.width || carY >= canvas.height - 50) {
        isJumping = false;
        checkJumpOutcome(carX);
    } else {
        requestAnimationFrame(animateJump);
    }
}

// Check the outcome of the jump
function checkJumpOutcome(finalX) {
    const gapStart = 400;
    const gapWidth = 100;

    if (finalX >= gapStart && finalX <= gapStart + gapWidth) {
        alert('Car fell into the gap!');
    } else if (finalX > gapStart + gapWidth) {
        alert('Car successfully cleared the gap!');
    } else {
        alert('Car did not reach the gap.');
    }
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Initial setup
preloadCarImage();
carSelect.addEventListener('input', updateCarSelection);
speedSlider.addEventListener('input', updateSpeed);
startButton.addEventListener('click', startJump);
