import re

with open('src/components/layout/ConferenceNavbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace logo imports
content = re.sub(
    r'import sptaLogo from "@/assets/spta-trans.png";\nimport SecondLogo from "@/assets/spta-logo-colors-trans.png";',
    'import sptaLogo from "@/assets/logo-color-cert.png";',
    content
)

# Replace logo images
content = re.sub(
    r'<img src=\{sptaLogo\} alt="SPTA Logo" className="h-10 sm:h-12 w-auto object-contain dark:hidden" />\s*<img src=\{SecondLogo\} alt="SPTA Logo" className="h-10 sm:h-12 w-auto object-contain hidden dark:block" />',
    '<img src={sptaLogo} alt="SPTA Logo" className="h-10 sm:h-12 w-auto object-contain" />',
    content
)

# Hide Desktop language button
lang_btn_desktop = r'<Button\s*variant="ghost"\s*size="icon"\s*onClick=\{[^}]+\}\s*className="[^"]*hidden sm:flex"[^>]*>\s*<Globe[^>]+/>\s*</Button>'
content = re.sub(lang_btn_desktop, '', content, flags=re.DOTALL)

# Hide Mobile language button
lang_btn_mobile = r'<Button\s*variant="outline"\s*onClick=\{[^}]+\}\s*className="mt-2 flex items-center justify-center gap-2"[^>]*>\s*<Globe[^>]+/>[^<]+</Button>'
content = re.sub(lang_btn_mobile, '', content, flags=re.DOTALL)

with open('src/components/layout/ConferenceNavbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
