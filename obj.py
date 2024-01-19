import pygame
import sys
import math

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 500, 900
FPS = 60
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BIG_CIRCLE_RADIUS = 200
SMALL_CIRCLE_RADIUS = 20
ANGULAR_SPEED = 0.5  # Adjust the angular speed as needed

# Create the window
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Moving Circles in a Big Circle")
clock = pygame.time.Clock()

def calculate_color_gradient():
    # Create a color gradient for the big circle
    gradient_surface = pygame.Surface((2 * BIG_CIRCLE_RADIUS, 2 * BIG_CIRCLE_RADIUS), pygame.SRCALPHA)
    for i in range(BIG_CIRCLE_RADIUS):
        alpha = int((i / BIG_CIRCLE_RADIUS) * 255)
        pygame.draw.circle(gradient_surface, (255, 255, 255, alpha), (BIG_CIRCLE_RADIUS, BIG_CIRCLE_RADIUS), i)
    return gradient_surface

color_gradient = calculate_color_gradient()

# Game loop
running = True
angle = 0
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Clear the screen
    screen.fill(BLACK)

    # Draw the big circle with color gradient
    screen.blit(color_gradient, (WIDTH // 2 - BIG_CIRCLE_RADIUS, HEIGHT // 2 - BIG_CIRCLE_RADIUS))

    # Update the angle over time
    angle += ANGULAR_SPEED

    # Calculate the positions of three small circles moving in a big circle with smooth transition
    for i in range(3):
        current_angle = math.radians((360 / 3) * i + angle)  # Add the angle to introduce motion
        x = WIDTH // 2 + BIG_CIRCLE_RADIUS * math.cos(current_angle)
        y = HEIGHT // 2 + BIG_CIRCLE_RADIUS * math.sin(current_angle)

        # Change the color of the small circle based on the angle
        color = (
            int(255 * (1 + math.sin(angle * 2)) / 2),
            int(255 * (1 + math.cos(angle * 2)) / 2),
            int(255 * (1 - math.sin(angle * 2)) / 2)
        )

        # Draw the small circle with varying size based on a sinusoidal function
        size = SMALL_CIRCLE_RADIUS + 10 * math.sin(angle * 2)
        pygame.draw.circle(screen, color, (int(x), int(y)), int(size))

    # Update the display
    pygame.display.flip()

    # Cap the frame rate
    clock.tick(FPS)

# Quit Pygame
pygame.quit()
sys.exit()
