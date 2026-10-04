import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'r', 'utf-8') as f:
    ws_content = f.read()

old_render_block = """                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base text-white shadow-sm shrink-0 ${speakerIconBg}`}>
                            {speaker.name.replace(/^(Dr\.|Mrs\.|Mr\.|Ms\.|Prof\.)\s*/, "").split(" ")[0][0]}
                          </div>"""

new_render_block = """                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base text-white shadow-sm shrink-0 overflow-hidden ${speakerIconBg}`}>
                            {speaker.photo ? (
                              <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                            ) : (
                              speaker.name.replace(/^(Dr\.|Mrs\.|Mr\.|Ms\.|Prof\.)\s*/, "").split(" ")[0][0]
                            )}
                          </div>"""

if old_render_block in ws_content:
    ws_content = ws_content.replace(old_render_block, new_render_block)
    print("Render block updated successfully!")
else:
    print("Old render block not found! Trying fallback regex...")
    fallback_regex = r'<div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base text-white shadow-sm shrink-0 \$\{speakerIconBg\}`}>\s*\{speaker\.name\.replace\(\/\^\(Dr\\\.\|Mrs\\\.\|Mr\\\.\|Ms\\\.\|Prof\\\.\)\\s\*\/\, \"\"\)\.split\(\" \"\)\[0\]\[0\]\}\s*</div>'
    match = re.search(fallback_regex, ws_content)
    if match:
        ws_content = ws_content[:match.start()] + new_render_block + ws_content[match.end():]
        print("Fallback replacement succeeded!")
    else:
        print("Failed to replace render block.")

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'w', 'utf-8') as f:
    f.write(ws_content)

