from PIL import Image, ImageDraw, ImageFont
import os

# Create a 120x120 image with transparent background
size = (120, 120)
img = Image.new('RGBA', size, (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Define colors
pink_main = (255, 105, 180, 255)  # #FF69B4
pink_light = (255, 182, 193, 180)  # #FFB6C1
pink_dark = (255, 20, 147, 255)   # #FF1493

# Draw main circle outline
center = (60, 60)
draw.ellipse([10, 10, 110, 110], outline=pink_main, width=3)

# Draw crown/hair shape (simplified polygon)
crown_points = [(30, 50), (40, 30), (60, 35), (80, 30), (90, 50), (75, 45), (60, 55), (45, 45)]
draw.polygon(crown_points, fill=pink_main)

# Draw hair strands (simplified lines)
draw.line([(45, 35), (50, 25), (55, 35)], fill=pink_dark, width=3)
draw.line([(55, 37), (60, 27), (65, 37)], fill=pink_dark, width=3)
draw.line([(65, 35), (70, 25), (75, 35)], fill=pink_dark, width=3)

# Draw decorative dots
draw.ellipse([25, 70, 35, 80], fill=pink_light)
draw.ellipse([85, 70, 95, 80], fill=pink_light)
draw.ellipse([55, 85, 65, 95], fill=pink_light)

# Try to add text (L and J)
try:
    # Try to use a default font, fallback to basic if not available
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf", 20)
    except:
        font = ImageFont.load_default()
    
    # Draw L and J
    draw.text((35, 90), "L", fill=pink_main, font=font)
    draw.text((75, 90), "J", fill=pink_main, font=font)
except:
    # If font fails, draw simple shapes instead
    draw.rectangle([35, 90, 38, 105], fill=pink_main)
    draw.rectangle([35, 102, 45, 105], fill=pink_main)
    draw.arc([75, 90, 85, 105], 0, 180, fill=pink_main, width=3)

# Save the image
img.save('logo.png', 'PNG')
print("PNG logo created successfully!")
