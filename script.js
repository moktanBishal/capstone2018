// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = 500;
const HEIGHT = 800;
const BIG_CIRCLE_RADIUS = 200;
const SMALL_CIRCLE_RADIUS = 20;
const ANGULAR_SPEED = 0.05;

function calculateColorGradient() {
    const gradient = ctx.createRadialGradient(BIG_CIRCLE_RADIUS, BIG_CIRCLE_RADIUS, 0, BIG_CIRCLE_RADIUS, BIG_CIRCLE_RADIUS, BIG_CIRCLE_RADIUS);
    
    for (let i = 0; i <= BIG_CIRCLE_RADIUS; i++) {
        const alpha = i / BIG_CIRCLE_RADIUS;
        gradient.addColorStop(alpha, `rgba(255, 255, 255, ${alpha})`);
    }
    
    return gradient;
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Calculate the center coordinates
    const centerX = WIDTH / 2;
    const centerY = HEIGHT / 2;

    // Draw the big circle with color gradient at the center
    ctx.fillStyle = calculateColorGradient();
    ctx.beginPath();
    ctx.arc(centerX, centerY, BIG_CIRCLE_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    // Calculate the positions of three small circles moving in a big circle with smooth transition
    for (let i = 0; i < 3; i++) {
        const currentAngle = (Math.PI * 2 / 3) * i + angle;
        const x = centerX + BIG_CIRCLE_RADIUS * Math.cos(currentAngle);
        const y = centerY + BIG_CIRCLE_RADIUS * Math.sin(currentAngle);

        // Change the color of the small circle based on the angle
        const color = `rgb(${Math.floor(255 * (1 + Math.sin(angle * 2)) / 2)}, ${Math.floor(255 * (1 + Math.cos(angle * 2)) / 2)}, ${Math.floor(255 * (1 - Math.sin(angle * 2)) / 2)})`;

        // Draw the small circle with varying size based on a sinusoidal function
        const size = SMALL_CIRCLE_RADIUS + 3 * Math.sin(angle * 2);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Update the angle over time
    angle += ANGULAR_SPEED;

    requestAnimationFrame(draw);
}

let angle = 0;
draw();

