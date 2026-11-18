from PIL import Image, ImageDraw, ImageFont
import os

img = Image.new('RGB', (1200, 630), color='#0B0914')
draw = ImageDraw.Draw(img)

# Draw decorative purple gradient-like background panels
for i in range(120):
    alpha_color = (124 - i, 58, 237 - i)
    draw.ellipse([800 - i * 3, -100 - i * 2, 1400 + i * 2, 500 + i * 2], outline='#20143B')

draw.rectangle([60, 60, 1140, 570], outline='#302544', width=3)
draw.rectangle([80, 80, 1120, 550], fill='#171326', outline='#7C3AED', width=2)

# Small Tag
draw.rounded_rectangle([120, 130, 340, 175], radius=10, fill='#7C3AED')
draw.text((140, 142), "PORTFOLIO 2024", fill='#FFFFFF')

# Main Title & Subtitle
draw.text((120, 210), "Lavan Kumar", fill='#F8FAFC')
draw.text((120, 290), "Full Stack Developer", fill='#A78BFA')
draw.text((120, 360), "React.js • Node.js • Express • Python • Flask • Databases", fill='#B8B2C9')
draw.text((120, 430), "Hyderabad, India  |  B.Tech CSE  |  Java NPTEL 95% Elite", fill='#7C3AED')

out_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "og-image.png")
img.save(out_path, format='PNG')
print("OG image created at:", out_path)

