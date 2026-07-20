import os
import sys
import glob

def optimize_fonts():
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        print("fonttools is not installed. Please install it using: pip install fonttools brotli")
        print("Skipping font conversion.")
        return

    ttf_files = glob.glob('assets/fonts/*.ttf')
    if not ttf_files:
        ttf_files = glob.glob('fonts/*.ttf')

    for ttf_path in ttf_files:
        woff2_path = ttf_path.replace('.ttf', '.woff2')
        if not os.path.exists(woff2_path):
            print(f"Converting {ttf_path} to WOFF2...")
            font = TTFont(ttf_path)
            font.flavor = 'woff2'
            font.save(woff2_path)
            print(f"Created {woff2_path}")
        else:
            print(f"{woff2_path} already exists, skipping.")

    # Now update design-system.css
    css_path = 'css/design-system.css'
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace TTF definitions with WOFF2 prioritized
        import re
        def replace_src(match):
            font_url = match.group(1)
            if '.ttf' in font_url:
                woff2_url = font_url.replace('.ttf', '.woff2')
                return f"url('{woff2_url}') format('woff2'), url('{font_url}') format('truetype')"
            return match.group(0)

        new_content = re.sub(r"url\('([^']+)'\)\s*format\('truetype'\)", replace_src, content)
        
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated design-system.css with WOFF2 sources.")

if __name__ == '__main__':
    optimize_fonts()
