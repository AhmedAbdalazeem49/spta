import codecs

with codecs.open('src/user/components/Conference2024/PresidentWord2026.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# 1. Imports
if 'import { BrandPattern }' not in content:
    content = content.replace(
        'import { Quote } from "lucide-react";',
        'import { Quote } from "lucide-react";\nimport { BrandPattern } from "./BrandPattern";'
    )

# 2. Background
old_bg = """      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      </div>"""

new_bg = """      <BrandPattern position="top-left" variant="primary" />
      <BrandPattern position="bottom-right" variant="secondary" />
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6FC4BC]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#11517E]/20 rounded-full blur-[120px]"></div>
      </div>"""
content = content.replace(old_bg, new_bg)

# 3. Replace amber/gold with brand-teal / brand-green
content = content.replace('bg-amber-500', 'bg-[#6FC4BC]')
content = content.replace('border-amber-500/30', 'border-[#6FC4BC]/30')
content = content.replace('text-amber-500/20', 'text-[#6FC4BC]/20')
content = content.replace('text-amber-400', 'text-[#6FC4BC]')
content = content.replace('text-amber-500', 'text-[#55AE47]')

with codecs.open('src/user/components/Conference2024/PresidentWord2026.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Updated PresidentWord2026")
