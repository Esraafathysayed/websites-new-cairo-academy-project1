import os
import re

def analyze():
    weights_used = set()
    for file in ['css/design-system.css', 'css/main.css']:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            # Remove @font-face blocks temporarily so we only find actual usages
            content_no_font_face = re.sub(r'@font-face\s*{[^}]+}', '', content)
            matches = re.findall(r'font-weight\s*:\s*(\d+)', content_no_font_face)
            weights_used.update(matches)
    
    with open('weights_output.txt', 'w') as f:
        f.write(f"Weights used: {weights_used}\n")

if __name__ == '__main__':
    analyze()
