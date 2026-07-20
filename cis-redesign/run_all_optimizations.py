import os
import sys

def main():
    print("Starting Web Performance Optimization...")
    
    # 1. Optimize HTML
    if os.path.exists('optimize_html.py'):
        print("\n--- Optimizing HTML ---")
        os.system(f"{sys.executable} optimize_html.py")
        
    # 2. Optimize JS
    if os.path.exists('optimize_js.py'):
        print("\n--- Optimizing JS ---")
        os.system(f"{sys.executable} optimize_js.py")
        
    # 3. Optimize CSS
    if os.path.exists('optimize_css.py'):
        print("\n--- Optimizing CSS ---")
        os.system(f"{sys.executable} optimize_css.py")
        
    # 4. Optimize Fonts
    if os.path.exists('optimize_fonts.py'):
        print("\n--- Optimizing Fonts ---")
        os.system(f"{sys.executable} optimize_fonts.py")
        
    print("\nAll optimizations completed successfully.")

if __name__ == '__main__':
    main()
