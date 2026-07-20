import os
import re

PROJECT_ROOT = r"c:\Users\ESSO\Downloads\project IT\cis-redesign"

def remove_google_fonts(content):
    # Remove preconnects for google fonts
    content = re.sub(r'<link[^>]+href="https://fonts\.googleapis\.com"[^>]*>\s*', '', content)
    content = re.sub(r'<link[^>]+href="https://fonts\.gstatic\.com"[^>]*>\s*', '', content)
    
    # Remove Google Fonts comments
    content = re.sub(r'<!--[^>]*Google Fonts[^>]*-->\s*', '', content, flags=re.IGNORECASE)
    
    # Remove Google Fonts preloads/stylesheets and noscript fallbacks
    # Matches <link ... href="https://fonts.googleapis.com/css2..." ...>
    content = re.sub(r'<link[^>]+href="https://fonts\.googleapis\.com/css2[^"]*"[^>]*>\s*', '', content)
    content = re.sub(r'<noscript>\s*</noscript>\s*', '', content)
    
    return content

def replace_hardcoded_fonts(content):
    # Replace hardcoded font-family in HTML/JS/CSS with CSS variables if they match the pattern
    # E.g. font-family: 'Cairo', system-ui, sans-serif; -> font-family: var(--font-headings);
    content = re.sub(r"font-family:\s*['\"]?Cairo['\"]?.*?;\s*", r"font-family: var(--font-headings);\n", content)
    content = re.sub(r"font-family:\s*['\"]?Tajawal['\"]?.*?;\s*", r"font-family: var(--font-body);\n", content)
    return content

def main():
    files_modified = 0
    extensions = ('.html', '.css', '.js')
    
    for root, dirs, files in os.walk(PROJECT_ROOT):
        # Skip ignored dirs
        if any(ignored in root.replace('\\', '/') for ignored in ["/.git", "/.agents", "/node_modules"]):
            continue
            
        for file in files:
            if file.endswith(extensions):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        original_content = f.read()
                        
                    content = original_content
                    content = remove_google_fonts(content)
                    content = replace_hardcoded_fonts(content)
                    
                    if content != original_content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(content)
                        files_modified += 1
                        print(f"Updated: {os.path.relpath(filepath, PROJECT_ROOT)}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")
                    
    print(f"\nTotal files modified: {files_modified}")

if __name__ == "__main__":
    main()
