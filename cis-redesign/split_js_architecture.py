import os
import glob
import re

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
JS_DIR = os.path.join(PROJECT_DIR, "js")

def extract_bracket_content(text, start_index, open_char, close_char):
    """Extract content matching brackets from a starting index."""
    count = 0
    in_string = False
    string_char = ''
    
    for i in range(start_index, len(text)):
        char = text[i]
        
        # Handle strings to ignore brackets inside them
        if char in ('"', "'", "`") and text[i-1] != '\\':
            if not in_string:
                in_string = True
                string_char = char
            elif string_char == char:
                in_string = False
                
        if not in_string:
            if char == open_char:
                count += 1
            elif char == close_char:
                count -= 1
                if count == 0:
                    return text[start_index:i+1]
    return ""

def split_data_js():
    data_file = os.path.join(JS_DIR, "data.js")
    if not os.path.exists(data_file):
        return []
        
    print("Splitting data.js...")
    with open(data_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    extracted_keys = []
    
    # Create the global base
    base_content = "window.CIS_DATA_AR = window.CIS_DATA_AR || {};\n"
    
    # Find all top level keys:   keyName: [ or {
    pattern = r'^\s*([a-zA-Z0-9_]+)\s*:\s*([\[\{])'
    for match in re.finditer(pattern, content, re.MULTILINE):
        key = match.group(1)
        open_char = match.group(2)
        close_char = ']' if open_char == '[' else '}'
        start_idx = match.start(2)
        
        block = extract_bracket_content(content, start_idx, open_char, close_char)
        if block:
            out_file = os.path.join(JS_DIR, f"data-{key}.js")
            with open(out_file, 'w', encoding='utf-8') as f:
                f.write(base_content + f"window.CIS_DATA_AR.{key} = {block};\n")
            extracted_keys.append(key)
            print(f" -> Created data-{key}.js")
            
    return extracted_keys

def split_main_js():
    main_file = os.path.join(JS_DIR, "main.js")
    if not os.path.exists(main_file):
        return {}
        
    print("Splitting main.js...")
    with open(main_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Mapping pages to their initialization functions
    pages = {
        'news': ['initNewsPage', 'renderNews'],
        'events': ['initEventsPage', 'renderEvents'],
        'admissions': ['initAdmissionsPage'],
        'faculty': ['initFacultyDirectory'],
        'services': ['initStudentServicesPortal'],
        'media': ['initVideoLightbox', 'initMediaPage'],
        'contact': ['initContactPage', 'initHomepageContactForm'],
        'quality': ['initQualityPage'],
        'it-unit': ['initItUnitPage'],
        'research': ['initResearchPage'],
        'alumni': ['initAlumniPage'],
        'career': ['initCareerPage'],
        'faq': ['initFaqPage'],
        'about': ['renderTimeline'],
        'index': ['renderNews', 'renderEvents', 'renderTestimonials']
    }
    
    extracted_funcs = set()
    
    for page, funcs in pages.items():
        page_code = ""
        funcs_to_call = []
        for func in funcs:
            if func in extracted_funcs:
                # If a function is shared (like renderNews on index and news pages),
                # we don't extract it multiple times. For simplicity in this script, 
                # we just call it. But wait, if it's extracted, it won't be in main-core.js.
                # Actually, shared functions should stay in main-core.js!
                funcs_to_call.append(func)
                continue
                
            # Match function declaration
            match = re.search(r'function\s+' + func + r'\s*\([^)]*\)\s*\{', content)
            if match:
                # To prevent shared functions from breaking, if it's used in index and news, we keep it in core
                # Let's check how many pages use it.
                count_uses = sum(1 for p, f_list in pages.items() if func in f_list)
                if count_uses > 1:
                    funcs_to_call.append(func)
                    continue # Keep it in core!
                
                start_idx = match.end() - 1
                block = extract_bracket_content(content, start_idx, '{', '}')
                if block:
                    decl = match.group(0)[:-1].strip()
                    page_code += decl + " " + block + "\n\n"
                    # Comment out the call in DOMContentLoaded
                    content = re.sub(r'^\s*' + func + r'\(\);', f'// {func}(); // Modularized', content, flags=re.MULTILINE)
                    # Erase function from core
                    content = content[:match.start()] + ("\n/* " + func + " extracted */\n") + content[match.start() + len(decl) + len(block):]
                    extracted_funcs.add(func)
                    funcs_to_call.append(func)
                    
        if page_code or funcs_to_call:
            wrapper = "document.addEventListener('DOMContentLoaded', () => {\n"
            for func in funcs_to_call:
                wrapper += f"  if(typeof {func} === 'function') {func}();\n"
            wrapper += "});\n\n"
            
            with open(os.path.join(JS_DIR, f"page-{page}.js"), 'w', encoding='utf-8') as f:
                f.write(wrapper + page_code)
            print(f" -> Created page-{page}.js")
            
    # Save the remaining as main-core.js
    with open(os.path.join(JS_DIR, "main-core.js"), 'w', encoding='utf-8') as f:
        f.write(content)
    print(" -> Created main-core.js")
    return pages

def update_html_files():
    print("Updating HTML files...")
    html_files = glob.glob(os.path.join(PROJECT_DIR, "*.html"))
    
    script_map = {
        'news.html': ['data-news.js', 'page-news.js'],
        'events.html': ['data-events.js', 'page-events.js'],
        'admissions.html': ['data-admissions.js', 'page-admissions.js'],
        'faculty.html': ['data-faculty.js', 'page-faculty.js'],
        'services.html': ['data-services.js', 'page-services.js'],
        'index.html': ['data-news.js', 'data-events.js', 'data-testimonials.js', 'page-index.js'],
        'about.html': ['data-timeline.js', 'page-about.js'],
        'faq.html': ['data-faq.js', 'page-faq.js'],
        'career.html': ['page-career.js'],
        'alumni.html': ['page-alumni.js'],
        'research.html': ['page-research.js'],
        'it-unit.html': ['page-it-unit.js'],
        'quality.html': ['page-quality.js'],
        'contact.html': ['page-contact.js'],
        'media.html': ['page-media.js']
    }
    
    for html_path in html_files:
        basename = os.path.basename(html_path)
        if basename.startswith('dept-'):
            script_map[basename] = ['data-departments.js']
            
    for html_path in html_files:
        basename = os.path.basename(html_path)
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Remove old main.js and data.js
        content = re.sub(r'<script\s+src="js/data\.js".*?></script>\s*', '', content)
        content = re.sub(r'<script\s+src="js/main\.js".*?></script>\s*', '', content)
        
        # Build new scripts
        new_scripts = ['<script defer src="js/main-core.js"></script>']
        if basename in script_map:
            for s in script_map[basename]:
                if os.path.exists(os.path.join(JS_DIR, s)):
                    new_scripts.append(f'<script defer src="js/{s}"></script>')
                    
        script_block = "\n  ".join(new_scripts) + "\n</body>"
        content = content.replace("</body>", script_block)
            
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f" -> Updated {basename}")

def minify_js():
    print("Minifying all new JS files...")
    js_files = glob.glob(os.path.join(JS_DIR, "*.js"))
    for js_path in js_files:
        if os.path.basename(js_path) in ['data.js', 'main.js']:
            continue
            
        with open(js_path, 'r', encoding='utf-8') as f:
            code = f.read()
            
        code = re.sub(r'//.*', '', code)
        code = re.sub(r'/\*.*?\*/', '', code, flags=re.DOTALL)
        code = os.linesep.join([s for s in code.splitlines() if s.strip()])
        
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(code)

if __name__ == "__main__":
    split_data_js()
    split_main_js()
    update_html_files()
    minify_js()
    print("Architecture modularization complete!")
