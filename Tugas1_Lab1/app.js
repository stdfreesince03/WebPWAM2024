// app.js

const canvas = document.getElementById('jumpCanvas');
const ctx = canvas.getContext('2d');

// Get controls
const car1Slider = document.getElementById('car1');
const car2Slider = document.getElementById('car2');
const speedSlider = document.getElementById('speed');
const car1Name = document.getElementById('car1Name');
const car2Name = document.getElementById('car2Name');

// Car options with predefined masses (in kg)
const cars = [
    { name: 'Car 1', mass: 1000 },
    { name: 'Car 2', mass: 1200 },
    { name: 'Car 3', mass: 1400 },
    { name: 'Car 4', mass: 1600 },
    { name: 'Car 5', mass: 1800 },
    { name: 'Car 6', mass: 2000 }
];

// Simulation variables
let speed = parseFloat(speedSlider.value); // Initial speed
let car1 = cars[0]; // Initial car 1
let car2 = cars[0]; // Initial car 2
let carX = 0, carY = canvas.height - 50; // Start position
let isJumping = false;

// Update car selection labels
car1Slider.addEventListener('input', updateCarSelection);
car2Slider.addEventListener('input', updateCarSelection);
speedSlider.addEventListener('input', updateSpeed);

function updateCarSelection() {
    car1 = cars[parseInt(car1Slider.value) - 1];
    car2 = cars[parseInt(car2Slider.value) - 1];
    car1Name.textContent = car1.name;
    car2Name.textContent = car2.name;
}

function updateSpeed() {
    speed = parseFloat(speedSlider.value);
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
    ctx.fillStyle = 'red'; // Car 1 color
    ctx.fillRect(x, y, 50, 20);
    ctx.fillStyle = 'blue'; // Car 2 color
    ctx.fillRect(x + 60, y, 50, 20); // Second car
}

// Check the outcome of the jump
function checkJumpOutcome(finalX) {
    const gapStart = 400; // Example gap starting point
    const gapWidth = 100; // Example gap width

    if (finalX >= gapStart && finalX <= gapStart + gapWidth) {
        alert('Cars fell into the gap!');
    } else if (finalX > gapStart + gapWidth) {
        alert('Cars successfully cleared the gap!');
    } else {
        alert('Cars did not reach the gap.');
    }
}