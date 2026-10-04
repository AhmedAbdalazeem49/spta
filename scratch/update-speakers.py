import codecs
import re

# ==========================================
# 1. Update SpeakersTab.tsx
# ==========================================
with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', 'utf-8') as f:
    sp_content = f.read()

sp_content = sp_content.replace('\r\n', '\n')

# Add import if missing
if 'import femaleAvatarImg from "@/assets/female-avatar.png";' not in sp_content:
    sp_content = sp_content.replace(
        'import React, { useState } from "react";',
        'import React, { useState } from "react";\nimport femaleAvatarImg from "@/assets/female-avatar.png";'
    )

# Assign femaleAvatarImg to specific speakers
def replace_photo_for(name_snippet, content):
    # We look for the block containing the name and replace `photo: null` inside it.
    # Since doing it strictly with regex can be tricky if bio is long, let's just do targeted string replaces.
    # It's safer to use regex that finds the name, and the NEXT photo: null
    pattern = r'name:\s*"' + name_snippet + r'".*?photo:\s*null'
    match = re.search(pattern, content, flags=re.DOTALL)
    if match:
        replaced = match.group(0).replace('photo: null', 'photo: femaleAvatarImg')
        content = content[:match.start()] + replaced + content[match.end():]
    return content

sp_content = replace_photo_for("Maha Almarwani", sp_content)
sp_content = replace_photo_for("Hanan Sulaiman Alsaif", sp_content)
sp_content = replace_photo_for("Noorah A. Alshoweir", sp_content)

# For Batool, she doesn't have `photo: null` explicitly maybe? Let's check.
if '"Batool Al Hassan"' in sp_content and 'photo: femaleAvatarImg' not in sp_content[sp_content.find('"Batool Al Hassan"'):sp_content.find('"Batool Al Hassan"')+200]:
    # add photo: femaleAvatarImg
    batool_old = 'name: "Batool Al Hassan",'
    batool_new = 'name: "Batool Al Hassan",\n        photo: femaleAvatarImg,'
    sp_content = sp_content.replace(batool_old, batool_new)


with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', 'utf-8') as f:
    f.write(sp_content)

# ==========================================
# 2. Update WorkshopsTab.tsx
# ==========================================
with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'r', 'utf-8') as f:
    ws_content = f.read()

ws_content = ws_content.replace('\r\n', '\n')

# Add import if missing
if 'import femaleAvatarImg from "@/assets/female-avatar.png";' not in ws_content:
    ws_content = ws_content.replace(
        'import { motion, AnimatePresence } from "framer-motion";',
        'import { motion, AnimatePresence } from "framer-motion";\nimport femaleAvatarImg from "@/assets/female-avatar.png";'
    )

# Update Interface
ws_content = ws_content.replace(
    'title: string;\n}',
    'title: string;\n  photo?: string;\n}'
)

# Add photo to Tahani
ws_content = ws_content.replace(
    'name: "Ms. Tahani AlMahdi, MSc, PT",\n          title: "Saudi Academy of Sports Sciences\\nSaudi Arabia"',
    'name: "Ms. Tahani AlMahdi, MSc, PT",\n          title: "Saudi Academy of Sports Sciences\\nSaudi Arabia",\n          photo: femaleAvatarImg'
)

# Add photo to Doaa
ws_content = ws_content.replace(
    'name: "Dr. Doaa AlSharif, PhD, PT, AVRT, CRCs, MSc",\n          title: "Assistant professor\\nCollege of Applied Medical Sciences, Physical therapy Department\\nTaif University, Saudi Arabia"',
    'name: "Dr. Doaa AlSharif, PhD, PT, AVRT, CRCs, MSc",\n          title: "Assistant professor\\nCollege of Applied Medical Sciences, Physical therapy Department\\nTaif University, Saudi Arabia",\n          photo: femaleAvatarImg'
)

# Add photo to Maryam
ws_content = ws_content.replace(
    'name: "Mrs. Maryam Alshammari, MSc, PT. AVPT",\n          title: "Cochlear Implant Department\\nHafar Albaten Central Hospital"',
    'name: "Mrs. Maryam Alshammari, MSc, PT. AVPT",\n          title: "Cochlear Implant Department\\nHafar Albaten Central Hospital",\n          photo: femaleAvatarImg'
)

# Update rendering to use photo
old_render = '''                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base text-white shadow-sm shrink-0 ${speakerIconBg}`}>
                            {speaker.name.replace(/^(Dr\.|Mrs\.|Mr\.|Ms\.|Prof\.)\s*/, "").split(" ")[0][0]}
                          </div>'''

new_render = '''                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base text-white shadow-sm shrink-0 overflow-hidden ${speakerIconBg}`}>
                            {speaker.photo ? (
                              <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                            ) : (
                              speaker.name.replace(/^(Dr\\.|Mrs\\.|Mr\\.|Ms\\.|Prof\\.)\\s*/, "").split(" ")[0][0]
                            )}
                          </div>'''

ws_content = ws_content.replace(old_render, new_render)

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'w', 'utf-8') as f:
    f.write(ws_content)

print("Updated SpeakersTab & WorkshopsTab")
