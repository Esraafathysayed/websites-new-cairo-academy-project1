import os
import re

PROJECT_ROOT = r"c:\Users\ESSO\Downloads\project IT\cis-redesign"
ASSETS_DIR = os.path.join(PROJECT_ROOT, "assets")

def get_existing_webp_files():
    webp_files = set()
    if os.path.exists(ASSETS_DIR):
        for f in os.listdir(ASSETS_DIR):
            if f.lower().endswith('.webp'):
                webp_files.add(os.path.splitext(f)[0])
    return webp_files

def main():
    webp_basenames = get_existing_webp_files()
    print(f"Found {len(webp_basenames)} webp files in assets.")
    
    # This regex matches the filename and the extension, excluding slashes.
    # It will safely match "hero_bg.png" out of "assets/hero_bg.png"
    pattern = re.compile(r'([a-zA-Z0-9_\-\.\s]+)\.(png|jpg|jpeg)', re.IGNORECASE)
    
    files_modified = 0
    total_refs_updated = 0
    
    extensions_to_check = ('.html', '.css', '.js', '.json', '.md')
    
    for root, dirs, files in os.walk(PROJECT_ROOT):
        # Skip certain directories
        if any(ignored in root.replace('\\', '/') for ignored in ["/.git", "/.agents", "/node_modules"]):
            continue
            
        for file in files:
            if file.endswith(extensions_to_check):
                filepath = os.path.join(root, file)
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")
                    continue
                
                original_content = content
                
                def replacer(match):
                    basename = match.group(1)
                    # Exclude leading spaces that might have been matched
                    basename = basename.lstrip()
                    
                    if basename in webp_basenames:
                        return f"{basename}.webp"
                    return match.group(0)
                
                new_content, num_subs = pattern.subn(replacer, content)
                
                if new_content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    files_modified += 1
                    total_refs_updated += num_subs
                    print(f"Updated references in {os.path.relpath(filepath, PROJECT_ROOT)}")

    print("\n" + "="*40)
    print("REPORT")
    print(f"Files modified: {files_modified}")
    print(f"References updated: {total_refs_updated}")
    print("="*40)

if __name__ == "__main__":
    main()
