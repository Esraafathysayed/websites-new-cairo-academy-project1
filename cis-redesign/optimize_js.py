import os
import re

def minify_js(content):
    # Remove single line comments (but not URLs like http://)
    content = re.sub(r'(?<!:)//.*', '', content)
    # Remove multi-line comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove multiple spaces/newlines
    content = re.sub(r'\s+', ' ', content)
    return content.strip()

def optimize_js_files():
    js_files = ['js/main.js', 'js/data.js', 'js/i18n.js']
    
    for file_path in js_files:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            minified = minify_js(content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(minified)
                
            print(f"Optimized {file_path}")

if __name__ == '__main__':
    optimize_js_files()
