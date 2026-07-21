import os
import re
try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is not installed. Run: pip install Pillow")
    exit(1)

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(PROJECT_DIR, "assets")

def generate_logo():
    orig_path = os.path.join(ASSETS_DIR, "CIS-logo.webp")
    out_path = os.path.join(ASSETS_DIR, "CIS-logo-150w.webp")
    if os.path.exists(orig_path):
        with Image.open(orig_path) as img:
            # Resize while preserving aspect ratio (height will be ~75)
            resized = img.resize((150, 75), Image.Resampling.LANCZOS)
            resized.save(out_path, format="WEBP", quality=90)
            print(f"[*] Generated {out_path}")
    else:
        print(f"[!] Could not find {orig_path}")

if __name__ == "__main__":
    generate_logo()
