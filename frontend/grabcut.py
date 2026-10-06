import cv2
import numpy as np

def grabcut_extract(input_path, output_path):
    img = cv2.imread(input_path)
    h, w = img.shape[:2]
    
    mask = np.zeros(img.shape[:2], np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    
    # Subject is centered, background is on top and sides
    # Box enclosing the person: from x=80 to w-80, y=30 to h-10
    rect = (50, 30, w - 100, h - 40)
    
    print("Running GrabCut segmentation...")
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 6, cv2.GC_INIT_WITH_RECT)
    
    # 0 and 2 are background, 1 and 3 are foreground
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
    
    # Soften edges slightly with Gaussian blur
    mask_soft = cv2.GaussianBlur(mask2.astype(float) * 255, (5, 5), 0)
    mask_soft = np.clip(mask_soft, 0, 255).astype(np.uint8)
    
    # Merge into BGRA
    b, g, r = cv2.split(img)
    rgba = cv2.merge([b, g, r, mask_soft])
    
    cv2.imwrite(output_path, rgba)
    print(f"Successfully saved clean cutout to {output_path}")

if __name__ == "__main__":
    grabcut_extract(
        r"c:\Users\Forson Odonkor\Documents\Hire\ghanatech-global\frontend\public\images\hero-talent.jpg",
        r"c:\Users\Forson Odonkor\Documents\Hire\ghanatech-global\frontend\public\images\hero-talent.png"
    )
