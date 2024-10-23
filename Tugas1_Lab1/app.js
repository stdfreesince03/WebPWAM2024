// app.js

const canvas = document.getElementById('jumpCanvas');
const ctx = canvas.getContext('2d');

// Get controls
const carSelect = document.getElementById('carSelect');
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');
const carName = document.getElementById('carName');
const carImage = document.getElementById('carImage');

const ledgeWidth = canvas.width * 0.3; // 20% of the canvas width
const ledgeX = 0; // Starting from the left
const ledgeHeight = canvas.height * 0.6;
const ledgeY = canvas.height - ledgeHeight; // Adjust Y position based on ledge height

// Function to draw the grassy ledge
function drawGrassyLedge() {
    ctx.fillStyle = '#228B22'; // Green color for the grass
    ctx.fillRect(ledgeX, ledgeY, ledgeWidth, ledgeHeight); // Draw the ledge

    // Add grass texture (simple effect)
    ctx.fillStyle = '#32CD32'; // Lighter green for texture
    for (let i = 0; i < ledgeWidth; i += 10) {
        ctx.fillRect(ledgeX + i, ledgeY - 5, 5, 5); // Little grass blades
    }
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

// Draw the car (simple rectangle)
function drawCar(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 50, 20); // Simple car rectangle
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

// Initial car and speed setup
drawGrassyLedge();
updateCarSelection();
updateSpeed();