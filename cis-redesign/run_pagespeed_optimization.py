import os
import re
import glob
try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is not installed. Please run: pip install Pillow")
    exit(1)

# Configuration
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(PROJECT_DIR, "assets")
TARGET_WIDTHS = [320, 640, 960, 1280]

HERO_IMAGES = ['hero_bg.webp', 'hero_bg.png', 'admissions_banner.webp', 'cs_lab.webp', 'cs_lab.png']

def log(msg):
    print(f"[*] {msg}")

def generate_responsive_images():
    log("Scanning for images to generate responsive sizes...")
    image_paths = []
    for ext in ['*.webp', '*.png', '*.jpg', '*.jpeg']:
        image_paths.extend(glob.glob(os.path.join(ASSETS_DIR, "**", ext), recursive=True))
    
    dimensions = {}
    
    for path in image_paths:
        # Skip already resized files
        if re.search(r'-\d+w\.(webp|png|jpg|jpeg)$', path):
            continue
            
        try:
            with Image.open(path) as img:
                orig_width, orig_height = img.size
                rel_path = os.path.relpath(path, PROJECT_DIR).replace('\\', '/')
                dimensions[rel_path] = (orig_width, orig_height)
                
                base_name, _ = os.path.splitext(path)
                
                for target_w in TARGET_WIDTHS:
                    if orig_width > target_w:
                        target_h = int((float(orig_height) * float(target_w / orig_width)))
                        out_path = f"{base_name}-{target_w}w.webp"
                        if not os.path.exists(out_path):
                            resized = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
                            resized.save(out_path, format="WEBP", quality=85)
                            log(f"Generated responsive image: {os.path.basename(out_path)}")
        except Exception as e:
            log(f"Skipping {os.path.basename(path)}: {e}")
            
    return dimensions

def get_srcset(rel_path, orig_width):
    base_name, _ = os.path.splitext(rel_path)
    srcset = []
    for w in TARGET_WIDTHS:
        if orig_width > w:
            srcset.append(f"{base_name}-{w}w.webp {w}w")
    # Add original file
    srcset.append(f"{rel_path} {orig_width}w")
    return ", ".join(srcset)

def optimize_html(dimensions):
    log("Optimizing HTML files...")
    html_files = glob.glob(os.path.join(PROJECT_DIR, "*.html"))
    
    for html_path in html_files:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. Optimize <img> tags
        def img_replacer(match):
            img_tag = match.group(0)
            src_match = re.search(r'src=["\']([^"\']+)["\']', img_tag)
            if not src_match:
                return img_tag
                
            src = src_match.group(1)
            if src.startswith('http') or src.startswith('data:') or src.endswith('.svg'):
                return img_tag
                
            lookup_src = src.lstrip('./').replace('\\', '/')
            if lookup_src not in dimensions:
                # Fallback to webp lookup if original was png
                webp_src = os.path.splitext(lookup_src)[0] + '.webp'
                if webp_src in dimensions:
                    lookup_src = webp_src
                else:
                    return img_tag

            w, h = dimensions[lookup_src]
            
            # Clean existing layout-breaking attributes
            clean_tag = re.sub(r'\s*(width|height|loading|fetchpriority|decoding|srcset|sizes)=["\'][^"\']*["\']', '', img_tag)
            
            # Re-inject standard attributes
            attrs = [f'width="{w}"', f'height="{h}"', 'decoding="async"']
            
            # Determine priority
            is_hero = any(hero in lookup_src for hero in HERO_IMAGES) or 'hero' in img_tag.lower()
            if is_hero:
                attrs.append('loading="eager"')
                attrs.append('fetchpriority="high"')
            else:
                attrs.append('loading="lazy"')
                
            # Srcset
            srcset = get_srcset(lookup_src, w)
            if srcset:
                attrs.append(f'srcset="{srcset}"')
                attrs.append('sizes="(max-width: 640px) 320px, (max-width: 900px) 640px, (max-width: 1200px) 960px, 100vw"')
                
            # Reconstruct tag
            return clean_tag[:-1].strip() + ' ' + ' '.join(attrs) + clean_tag[-1:]
            
        optimized_content = re.sub(r'<img\s+[^>]+>', img_replacer, content)
        
        # 2. Add `defer` to scripts
        optimized_content = re.sub(r'<script\s+(?=.*src=)(?!.*defer)[^>]*>', lambda m: m.group(0).replace('<script ', '<script defer '), optimized_content)
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(optimized_content)
        log(f"Updated: {os.path.basename(html_path)}")

def optimize_css():
    log("Optimizing CSS files...")
    css_files = glob.glob(os.path.join(PROJECT_DIR, "css", "*.css"))
    
    for css_path in css_files:
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()
            
        # Add font-display: swap
        css = re.sub(r'(@font-face\s*\{[^\}]+?)(?<!font-display:\s*swap;)\s*\}', r'\1;font-display:swap;}', css)
        
        # Safe minify
        css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
        css = re.sub(r'\s+', ' ', css)
        css = re.sub(r'\s*([\{\}\:\;\,\>])\s*', r'\1', css)
        
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(css.strip())
        log(f"Minified CSS: {os.path.basename(css_path)}")

def optimize_js():
    log("Optimizing JS files...")
    js_files = glob.glob(os.path.join(PROJECT_DIR, "js", "*.js"))
    for js_path in js_files:
        if '.min.' in js_path: continue # already minified
        with open(js_path, 'r', encoding='utf-8') as f:
            js = f.read()
        
        # Basic comment removal (safe single-line only to avoid regex trap)
        js = re.sub(r'//.*', '', js)
        js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
        # Collapse empty lines
        js = os.linesep.join([s for s in js.splitlines() if s.strip()])
        
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(js)
        log(f"Minified JS: {os.path.basename(js_path)}")

if __name__ == "__main__":
    log("Starting PageSpeed Optimization...")
    dims = generate_responsive_images()
    optimize_html(dims)
    optimize_css()
    optimize_js()
    log("Optimization complete! You can now verify the site.")
