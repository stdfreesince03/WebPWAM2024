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
let phase = 1; // 1 for straight, 2 for projectile, 3 for landing, 4 for bouncing off
let initialVelocityX = 0, initialVelocityY = 0;
const gravity = 9.8;
const timeStep = 0.02;
const landingBuffer = 10; // Tolerance for landing on the second ledge

// Set initial car selection to Car 1
carSelect.value = 1;
selectedCar = cars[0];
speedSlider.disabled = false; // Ensure slider is enabled initially
preloadCarImage();

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
    const carWidth = canvas.width * 0.05;
    const carHeight = canvas.height * 0.05;
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
    if (!isJumping) { // Only allow speed changes if not jumping
        speed = parseFloat(speedSlider.value) * 1000 / 3600;
        speedValue.textContent = speedSlider.value;
    }
}

// Function to position the car on the first ledge
function positionCarOnLedge() {
    carX = ledgeX1 + (ledgeWidth1 * 0.2);
    carY = ledgeY1 - (canvas.height * 0.04);
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
    if (isJumping) return; // Prevent multiple starts
    carX = ledgeX1 + (ledgeWidth1 * 0.2);
    carY = ledgeY1 - (canvas.height * 0.04);
    phase = 1; // Start with straight motion on the first ledge
    isJumping = true;
    initialVelocityX = speed;
    initialVelocityY = -12; // Adjusted upward velocity for smoother arc
    speedSlider.disabled = true; // Disable speed slider
    carSelect.disabled = true; // Disable car selection
    animateJump();
}

// Animation loop for car jump
function animateJump() {
    if (!isJumping) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrassyLedge();

    const carBottom = carY + canvas.height * 0.05;

    // Phase 1: Move straight along the first ledge
    if (phase === 1) {
        carX += 2; // Move straight at constant speed
        if (carX >= ledgeWidth1 - (canvas.width * 0.05)) {
            phase = 2;
            initialVelocityY = -15; // Higher initial upward velocity for arc
        }
    }

    // Phase 2: Apply projectile motion
    if (phase === 2) {
        carX += initialVelocityX * timeStep;
        carY -= (initialVelocityY * timeStep - 0.5 * gravity * timeStep);
        initialVelocityY -= gravity * timeStep;

        // Check for landing on the second ledge
        if (
            carX >= ledgeX2 &&
            carX <= ledgeX2 + ledgeWidth2 &&
            carBottom >= ledgeY2 - landingBuffer &&
            initialVelocityY <= 0 // Ensure downward motion for landing
        ) {
            carY = ledgeY2 - (canvas.height * 0.04); // Align to second ledge
            phase = 3; // Switch to straight motion on second ledge
        }

        // Check for collision with the left side of the second ledge
        if (
            carX >= ledgeX2 - (canvas.width * 0.05) &&
            carX < ledgeX2 &&
            carBottom >= ledgeY2
        ) {
            phase = 4; // Switch to bouncing off phase
            initialVelocityX = -initialVelocityX * 0.5; // Reverse and reduce horizontal speed
            initialVelocityY *= 0.6; // Reduce vertical speed
        }

        // Stop if the car falls below the canvas
        if (carY >= canvas.height) {
            endGame('Car fell off!');
            return;
        }

        // Stop if the car hits the right edge
        if (carX >= canvas.width) {
            endGame('Car hit the right wall!');
            return;
        }
    }

    // Phase 3: Move straight along the second ledge
    if (phase === 3) {
        carX += 2;

        // Stop the animation if the car reaches the end of the second ledge
        if (carX >= ledgeX2 + ledgeWidth2 - (canvas.width * 0.05)) {
            endGame('Car reached the end of the second ledge!');
            return;
        }
    }

    // Phase 4: Bounce off the side of the second ledge
    if (phase === 4) {
        carX += initialVelocityX * timeStep;
        carY -= initialVelocityY * timeStep;
        initialVelocityY -= gravity * timeStep;

        // Stop bouncing if the car falls below the canvas
        if (carY >= canvas.height) {
            endGame('Car fell off!');
            return;
        }
    }

    // Draw the car
    drawCar(carX, carY);
    requestAnimationFrame(animateJump);
}

// End game function
function endGame(message) {
    isJumping = false;
    alert(message);
    speedSlider.disabled = false;
    carSelect.disabled = false;
}

// Event listeners and initial setup
drawScene();
carSelect.addEventListener('input', updateCarSelection);
speedSlider.addEventListener('input', updateSpeed);
startButton.addEventListener('click', startJump);