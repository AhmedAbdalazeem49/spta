import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/ScientificCommitteeTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# 1. Import femaleAvatarImg
if 'import femaleAvatarImg from "@/assets/female-avatar.png";' not in content:
    content = content.replace(
        'import React, { useState } from "react";\n',
        'import React, { useState } from "react";\nimport femaleAvatarImg from "@/assets/female-avatar.png";\n'
    )

# 2. Replace the SVG block
old_svg_block = '''  // Female icon (no photo) — only Dr. Asma
  if (member.isFemale) {
    return (
      <div className={`${dim} rounded-full bg-gradient-to-br ${cfg.bg} flex items-center justify-center ${cfg.ring} shadow-xl overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="100" r="60" fill="rgba(255,255,255,0.15)" />
          <ellipse cx="50" cy="30" rx="20" ry="22" fill="rgba(255,255,255,0.9)" />
          <path d="M 20 40 Q 50 65 80 40 Q 75 20 50 18 Q 25 20 20 40Z" fill="rgba(255,255,255,0.5)" />
          <path d="M 25 75 Q 50 65 75 75 L 80 100 L 20 100Z" fill="rgba(255,255,255,0.85)" />
        </svg>
      </div>
    );
  }'''

# Note: sometimes comment dash is different, let's just use regex or a more robust replacement.
# Or just replace starting from `if (member.isFemale) {`
new_svg_block = '''  // Female icon (no photo)
  if (member.isFemale) {
    return (
      <div className={`${dim} rounded-full flex items-center justify-center ${cfg.ring} shadow-xl overflow-hidden shrink-0 bg-[#eef8f7]`}>
        <img src={femaleAvatarImg} alt="Female Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }'''

start_idx = content.find('if (member.isFemale) {')
end_idx = content.find('  // Fallback: initials')

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_svg_block + '\n\n' + content[end_idx:]

with codecs.open('src/user/components/Conference2024/Tabs/ScientificCommitteeTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Updated ScientificCommitteeTab.tsx")
