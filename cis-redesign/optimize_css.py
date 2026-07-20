import os
import re

def minify_css(content):
    # Remove CSS comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove multiple spaces and newlines
    content = re.sub(r'\s+', ' ', content)
    # Remove spaces around CSS syntax chars
    content = re.sub(r'\s*([\{\}\:\;\,\>\+\~\!])\s*', r'\1', content)
    return content.strip()

def optimize_css_files():
    css_files = ['css/design-system.css', 'css/main.css']
    
    for file_path in css_files:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            minified = minify_css(content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(minified)
                
            print(f"Optimized {file_path}")

if __name__ == '__main__':
    optimize_css_files()
