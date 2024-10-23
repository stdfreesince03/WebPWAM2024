const canvas = document.getElementById('jumpCanvas');
const ctx = canvas.getContext('2d');

// Set up the canvas for higher DPI
function setHighDPI(canvas, context, scaleFactor = 2) {
    // Store original dimensions
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;

    // Increase canvas size based on the scale factor
    canvas.width = originalWidth * scaleFactor;
    canvas.height = originalHeight * scaleFactor;

    // Set CSS size to match original dimensions (visual size)
    canvas.style.width = `${originalWidth}px`;
    canvas.style.height = `${originalHeight}px`;

    // Scale the drawing context
    context.scale(scaleFactor, scaleFactor);
}

// Initialize the canvas with higher DPI
setHighDPI(canvas, ctx);

// Get controls
const carSelect = document.getElementById('carSelect');
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');
const carName = document.getElementById('carName');
const carImage = document.getElementById('carImage');

// Variables for ledges
let ledgeWidth1 = canvas.width * 0.3;
let ledgeX1 = 0;
let ledgeHeight1 = canvas.height * 0.6;
let ledgeY1 = canvas.height - ledgeHeight1;

let ledgeWidth2 = canvas.width * 0.3;
let ledgeX2 = canvas.width * 0.7; // Set it to 70% from the left
let ledgeHeight2 = canvas.height * 0.3;
let ledgeY2 = canvas.height - ledgeHeight2;

// Function to draw the grassy ledges
function drawGrassyLedge() {
    // Draw the first ledge
    ctx.fillStyle = '#228B22'; // Green color for the grass
    ctx.fillRect(ledgeX1, ledgeY1, ledgeWidth1, ledgeHeight1);

    // Draw the second ledge
    ctx.fillStyle = '#228B22'; // Green color for the second ledge
    ctx.fillRect(ledgeX2, ledgeY2, ledgeWidth2, ledgeHeight2);
}

// Car options with images and masses
const cars = [
    { name: 'Car 1', mass: 1000, image: 'car_1.png' },
    { name: 'Car 2', mass: 1200, image: 'car_2.png' },
    { name: 'Car 3', mass: 1400, image: 'car_3.png' },
    { name: 'Car 4', mass: 1600, image: 'car_4.png' },
    { name: 'Car 5', mass: 1800, image: 'car_5.png' },
    { name: 'Car 6', mass: 2000, image: 'car_6.png' }
];

// Simulation variables
let speed = parseFloat(speedSlider.value) * 1000 / 3600; // Convert to m/s
let selectedCar = cars[0]; // Initial car
let carX = 0, carY = canvas.height - 50; // Start position
let isJumping = false;

// Update car selection
carSelect.addEventListener('input', updateCarSelection);
speedSlider.addEventListener('input', updateSpeed);

// Function to update car selection
function updateCarSelection() {
    selectedCar = cars[parseInt(carSelect.value) - 1];
    carName.textContent = selectedCar.name;
    carImage.src = `./images/${selectedCar.image}`;

    positionCarOnLedge();
}

// Function to update speed
function updateSpeed() {
    speed = parseFloat(speedSlider.value) * 1000 / 3600; // Convert to m/s
    speedValue.textContent = speedSlider.value;
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Start the jump
function startJump() {
    // Reset car position
    carX = 0;
    carY = canvas.height - 50;

    // Start jumping animation
    isJumping = true;
    animateJump();
}

// Animation loop for car jump
function animateJump() {
    if (!isJumping) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the new position using projectile physics
    const angle = toRadians(45); // Fixed launch angle
    const time = (carX / speed); // Time since start
    const gravity = 9.8; // Gravity in m/s²

    // Projectile motion calculations
    const newX = speed * Math.cos(angle) * time;
    const newY = speed * Math.sin(angle) * time - (0.5 * gravity * Math.pow(time, 2));

    // Update car position
    carX = newX;
    carY = canvas.height - 50 - newY;

    // Draw the car
    drawCar(carX, carY);

    // Check if the car is off screen or hit the ground
    if (carX >= canvas.width || carY >= canvas.height - 50) {
        isJumping = false; // Stop animation if car lands
        checkJumpOutcome(carX);
    } else {
        requestAnimationFrame(animateJump);
    }
}

// Check the outcome of the jump
function checkJumpOutcome(finalX) {
    const gapStart = 400; // Example gap starting point
    const gapWidth = 100; // Example gap width

    if (finalX >= gapStart && finalX <= gapStart + gapWidth) {
        alert('Car fell into the gap!');
    } else if (finalX > gapStart + gapWidth) {
        alert('Car successfully cleared the gap!');
    } else {
        alert('Car did not reach the gap.');
    }
}

// Function to draw the car at a specific position
function drawCar(x, y) {
    const carImg = new Image();
    carImg.src = `./images/${selectedCar.image}`;

    // Draw the car image once it loads
    carImg.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        drawGrassyLedge(); // Redraw the grassy ledges

        // Set responsive car dimensions based on canvas size
        const carWidth = canvas.width * 0.1; // 10% of canvas width
        const carHeight = canvas.height * 0.1; // 10% of canvas height

        // Draw the car image at specified position
        ctx.drawImage(carImg, x, y, carWidth, carHeight);
    };
}

// Function to position the car on the ledge
function positionCarOnLedge() {
    const carX = ledgeX1 + (ledgeWidth1 / 2) - (canvas.width * 0.05); // Center the car
    const carY = ledgeY1 - (canvas.height * 0.08); // Position above the ledge

    drawCar(carX, carY); // Draw the car at the calculated position
}

// Initial car and speed setup
drawGrassyLedge();
positionCarOnLedge();
updateSpeed();
