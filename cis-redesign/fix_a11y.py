import os
import glob
import re

def fix_html_files():
    html_files = glob.glob('*.html')
    
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Wrap in main
        # Find header end
        header_end_match = re.search(r'</header>\s*', content)
        # Find footer start
        footer_start_match = re.search(r'<!--\s*(?:[0-9]+\.\s*)?FOOTER.*?(?:-->)?\s*<footer', content, flags=re.IGNORECASE | re.DOTALL)
        
        if not footer_start_match:
            footer_start_match = re.search(r'<footer', content, flags=re.IGNORECASE)

        if header_end_match and footer_start_match and '<main>' not in content:
            header_end_idx = header_end_match.end()
            footer_start_idx = footer_start_match.start()
            
            new_content = content[:header_end_idx] + '\n  <main>\n' + content[header_end_idx:footer_start_idx] + '\n  </main>\n' + content[footer_start_idx:]
            content = new_content

        # Fix specific headings inside services and other files
        # h4 immediately under h2 without h3
        # In a real DOM parser this is easier, but here we do regex for the known patterns
        
        # known h4 to h3
        content = content.replace('<h4 style="font-size:var(--font-size-sm); margin-bottom:2px;" data-i18n="index_h4_80">', '<h3 style="font-size:var(--font-size-sm); margin-bottom:2px;" data-i18n="index_h4_80">')
        content = content.replace('العنوان الرئيسي</h4>', 'العنوان الرئيسي</h3>')
        content = content.replace('<h4 style="font-size:var(--font-size-sm); margin-bottom:2px;" data-i18n="index_h4_82">', '<h3 style="font-size:var(--font-size-sm); margin-bottom:2px;" data-i18n="index_h4_82">')
        content = content.replace('الهاتف والخط الساخن\n              </h4>', 'الهاتف والخط الساخن\n              </h3>')
        content = content.replace('<h4 style="font-size:var(--font-size-sm); margin-bottom:2px;" data-i18n="index_h4_84">', '<h3 style="font-size:var(--font-size-sm); margin-bottom:2px;" data-i18n="index_h4_84">')
        content = content.replace('المعتمد</h4>', 'المعتمد</h3>')
        
        # Footer contact title h4 to h2
        content = content.replace('<h4 data-i18n="footer_contact_title">تواصل معنا</h4>', '<h2 data-i18n="footer_contact_title">تواصل معنا</h2>')

        # Modal h5s to div
        content = content.replace('<h5 style="font-size:11px; color:var(--text-muted); font-weight:800; margin-bottom:4px;">', '<div style="font-size:11px; color:var(--text-muted); font-weight:800; margin-bottom:4px;">')
        content = content.replace('عمليات البحث الأخيرة\n        </h5>', 'عمليات البحث الأخيرة\n        </div>')
        content = content.replace('<h5 style="font-size:11px; color:var(--text-muted); font-weight:800; margin-bottom:4px; margin-top:12px;">', '<div style="font-size:11px; color:var(--text-muted); font-weight:800; margin-bottom:4px; margin-top:12px;">')
        content = content.replace('روابط شائعة ومباشرة</h5>', 'روابط شائعة ومباشرة</div>')
        content = content.replace('<h5\n          style="font-size:11px; color:var(--text-muted); font-weight:800; margin-bottom:8px; border-top:1px solid rgba(15,15,16,0.06); padding-top:12px;">', '<div\n          style="font-size:11px; color:var(--text-muted); font-weight:800; margin-bottom:8px; border-top:1px solid rgba(15,15,16,0.06); padding-top:12px;">')
        content = content.replace('نتائج البحث المطابقة</h5>', 'نتائج البحث المطابقة</div>')

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print("Fixed accessibility in HTML files.")

if __name__ == '__main__':
    fix_html_files()
