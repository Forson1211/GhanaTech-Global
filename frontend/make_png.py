from PIL import Image
import numpy as np

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Sample corner pixels to determine background color
    corners = [
        data[5, 5, :3],
        data[5, -5, :3],
        data[20, 20, :3],
        data[20, -20, :3],
    ]
    bg_color = np.mean(corners, axis=0)
    print(f"Detected background color: {bg_color}")
    
    # Calculate distance from background color
    rgb = data[:, :, :3].astype(float)
    dist = np.sqrt(np.sum((rgb - bg_color) ** 2, axis=2))
    
    # Threshold for transparency
    # Also check if saturation is very low (gray) and brightness matches background
    threshold = 35.0
    alpha = np.where(dist < threshold, 0, 255).astype(np.uint8)
    
    # Smooth edges with feathering
    feather_range = 15.0
    smooth = np.clip((dist - threshold) / feather_range * 255, 0, 255).astype(np.uint8)
    
    # Only apply to upper half/sides where background is present
    data[:, :, 3] = smooth
    
    out_img = Image.fromarray(data, mode="RGBA")
    out_img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    make_transparent(
        r"c:\Users\Forson Odonkor\Documents\Hire\ghanatech-global\frontend\public\images\hero-talent.jpg",
        r"c:\Users\Forson Odonkor\Documents\Hire\ghanatech-global\frontend\public\images\hero-talent.png"
    )
