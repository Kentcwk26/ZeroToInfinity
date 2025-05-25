// Function to create bouncing and colliding bubbles
function initBubbles() {
    const container = document.querySelector('.bubble-container');
    const bubbles = document.querySelectorAll('.bubble');
    const bubbleArray = [];

    // Initialize each bubble's position and speed
    bubbles.forEach((bubble, index) => {
        // Ensure bubbles start far apart
        let posX = Math.random() * (container.clientWidth - bubble.clientWidth);
        let posY = Math.random() * (container.clientHeight - bubble.clientHeight);
        let speedX = (Math.random() * 1) + 1; // Horizontal speed
        let speedY = (Math.random() * 1) + 1; // Vertical speed

        // Store bubble information in an array
        bubbleArray.push({
            element: bubble,
            posX: posX,
            posY: posY,
            speedX: speedX,
            speedY: speedY,
            radius: bubble.clientWidth / 2,
        });

        // Set initial position
        bubble.style.left = posX + 'px';
        bubble.style.top = posY + 'px';
    });

    // Function to detect collision between two bubbles
    function detectCollision(b1, b2) {
        const dx = (b1.posX + b1.radius) - (b2.posX + b2.radius);
        const dy = (b1.posY + b1.radius) - (b2.posY + b2.radius);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < b1.radius + b2.radius; // Return true if they overlap
    }

    // Function to handle bubble collision and reflection
    function handleCollision(b1, b2) {
        // Get the difference in positions
        const dx = b1.posX - b2.posX;
        const dy = b1.posY - b2.posY;

        // Normalize the collision vector
        const distance = Math.sqrt(dx * dx + dy * dy);
        const normalX = dx / distance;
        const normalY = dy / distance;

        // Calculate relative velocity
        const relVelX = b1.speedX - b2.speedX;
        const relVelY = b1.speedY - b2.speedY;

        // Calculate the relative velocity in terms of the normal direction
        const velocityAlongNormal = relVelX * normalX + relVelY * normalY;

        // If the bubbles are moving away from each other, don't reflect
        if (velocityAlongNormal > 0) return;

        // Reflect the velocities (elastic collision)
        const restitution = 1; // Coefficient of restitution (1 for perfectly elastic)
        const impulse = (2 * velocityAlongNormal) / (b1.radius + b2.radius);

        b1.speedX -= impulse * b2.radius * normalX * restitution;
        b1.speedY -= impulse * b2.radius * normalY * restitution;
        b2.speedX += impulse * b1.radius * normalX * restitution;
        b2.speedY += impulse * b1.radius * normalY * restitution;
    }

    // Function to update the position of each bubble
    function updateBubblePosition() {
        bubbleArray.forEach((bubble, index) => {
            // Move the bubble
            bubble.posX += bubble.speedX;
            bubble.posY += bubble.speedY;

            // Detect collision with container's edges and reflect
            if (bubble.posX + bubble.element.clientWidth >= container.clientWidth || bubble.posX <= 0) {
                bubble.speedX = -bubble.speedX; // Reflect horizontally
            }
            if (bubble.posY + bubble.element.clientHeight >= container.clientHeight || bubble.posY <= 0) {
                bubble.speedY = -bubble.speedY; // Reflect vertically
            }

            // Detect collisions between bubbles and reflect
            for (let i = index + 1; i < bubbleArray.length; i++) {
                const otherBubble = bubbleArray[i];
                if (detectCollision(bubble, otherBubble)) {
                    handleCollision(bubble, otherBubble); // Reflect upon collision
                }
            }

            // Update bubble's position
            bubble.element.style.left = bubble.posX + 'px';
            bubble.element.style.top = bubble.posY + 'px';
        });

        // Continue updating the position in the next frame
        requestAnimationFrame(updateBubblePosition);
    }

    // Start the animation loop
    updateBubblePosition();
}

// Initialize bubbles when the DOM is ready
window.onload = initBubbles;
