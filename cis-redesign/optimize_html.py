import os
import glob
import re

def optimize_html_files():
    html_files = glob.glob('*.html')
    
    # Preload CSS
    css_design_system = '<link rel="stylesheet" href="css/design-system.css">'
    css_design_system_optimized = '''<link rel="preload" href="css/design-system.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="css/design-system.css"></noscript>'''

    css_main = '<link rel="stylesheet" href="css/main.css">'
    css_main_optimized = '''<link rel="preload" href="css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="css/main.css"></noscript>'''

    font_preloads = '''  <!-- Font Preloads -->
  <link rel="preload" href="assets/fonts/Cairo-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/Cairo-Bold.woff2" as="font" type="font/woff2" crossorigin>
'''

    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Optimize CSS Loading
        if css_design_system in content:
            content = content.replace(css_design_system, css_design_system_optimized)
        if css_main in content:
            content = content.replace(css_main, css_main_optimized)

        # 2. Add Font Preloads
        if '<!-- Font Preloads -->' not in content:
            # Insert before the first stylesheet or preload
            insert_pos = content.find('<link rel="preload"')
            if insert_pos == -1:
                insert_pos = content.find('<link rel="stylesheet"')
            if insert_pos != -1:
                content = content[:insert_pos] + font_preloads + content[insert_pos:]

        # 3. Add defer to JS
        # Find all <script src="..."></script> and add defer
        content = re.sub(r'<script\s+src="([^"]+)"(?!\s*defer)([^>]*)></script>', r'<script src="\1" defer\2></script>', content)

        # 4. Optimize Images (Add loading="lazy" and decoding="async")
        # Exceptions: LCP images or images with data-priority="high" or fetchpriority="high"
        
        def optimize_img_tag(match):
            img_tag = match.group(0)
            
            if 'fetchpriority="high"' in img_tag or 'data-priority="high"' in img_tag or 'hero_bg' in img_tag:
                # Make sure decoding="async" is there, but skip lazy loading
                if 'decoding=' not in img_tag:
                    img_tag = img_tag.replace('<img ', '<img decoding="async" ')
                return img_tag

            if 'loading=' not in img_tag:
                img_tag = img_tag.replace('<img ', '<img loading="lazy" ')
            if 'decoding=' not in img_tag:
                img_tag = img_tag.replace('<img ', '<img decoding="async" ')
                
            return img_tag

        content = re.sub(r'<img[^>]+>', optimize_img_tag, content)

        # 5. Remove HTML comments (excluding IE conditionals or critical markers)
        # But wait, the prompt says "Preserve pixel-perfect appearance" and "Do NOT rename IDs, Classes, JS hooks, Data attributes, Translation keys". 
        # Removing comments is safe for DOM size.
        # But we must preserve <!-- 12. FOOTER --> if we want, or remove. Let's strip only normal comments, except if they have [endif]
        # Actually it's safer to skip comment removal to avoid breaking any specific logic the user relies on for editing.
        # We will just strip leading/trailing whitespace where possible.
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    print("HTML files optimized successfully.")

if __name__ == '__main__':
    optimize_html_files()
