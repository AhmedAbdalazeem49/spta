import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# 1. Import femaleAvatarImg
if 'import femaleAvatarImg from "@/assets/female-avatar.png";' not in content:
    content = content.replace(
        'import React from "react";\n',
        'import React from "react";\nimport femaleAvatarImg from "@/assets/female-avatar.png";\n'
    )

# 2. Remove the FemaleAvatar SVG component
svg_start = '/* ─── Professional Female Avatar SVG ───────────────────────────── */'
export_start = 'export const OrganizingCommitteeTab'
start_idx = content.find(svg_start)
end_idx = content.find(export_start)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]

# 3. Replace <FemaleAvatar /> with the image tag
old_jsx = '<FemaleAvatar />'
new_jsx = '<img src={femaleAvatarImg} alt="Female Avatar" className="w-full h-full object-cover" />'
content = content.replace(old_jsx, new_jsx)

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Updated OrganizingCommitteeTab.tsx")
