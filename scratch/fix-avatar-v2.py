import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# Replace the entire old SVG block with the new professional one
old_svg_start = '              ) : (member as any).isFemale ? (\n                /* Pretty female avatar icon */'
old_svg_end = '                  {/* Collar accent */}\n                  <path d="M36 74 Q50 68 64 74" fill="url(#femAvBody)" opacity="0.6" />\n                </svg>'

start_idx = content.find(old_svg_start)
end_idx = content.find(old_svg_end) + len(old_svg_end)

new_svg = '''              ) : (member as any).isFemale ? (
                /* Professional female avatar - no hair, formal blue tones */
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="fAvBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#dbeafe" />
                      <stop offset="100%" stopColor="#bfdbfe" />
                    </linearGradient>
                    <linearGradient id="fAvBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="fAvSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde8d0" />
                      <stop offset="100%" stopColor="#f0c89a" />
                    </linearGradient>
                  </defs>
                  {/* Light blue background */}
                  <circle cx="50" cy="50" r="50" fill="url(#fAvBg)" />
                  {/* Professional blazer / shoulders */}
                  <ellipse cx="50" cy="95" rx="30" ry="18" fill="url(#fAvBody)" />
                  {/* Collar V */}
                  <path d="M43 72 L50 80 L57 72" fill="#1e40af" />
                  {/* White shirt under collar */}
                  <path d="M43 72 L50 78 L57 72 L57 70 L50 74 L43 70 Z" fill="#e0f2fe" opacity="0.9" />
                  {/* Neck */}
                  <rect x="45" y="60" width="10" height="12" rx="3" fill="url(#fAvSkin)" />
                  {/* Head - no hair, clean */}
                  <circle cx="50" cy="44" r="20" fill="url(#fAvSkin)" />
                  {/* Subtle head top roundness cap - same skin, no hair */}
                  <ellipse cx="50" cy="26" rx="17" ry="6" fill="url(#fAvSkin)" />
                  {/* Eyes */}
                  <ellipse cx="43" cy="44" rx="2.8" ry="2.2" fill="#334155" />
                  <ellipse cx="57" cy="44" rx="2.8" ry="2.2" fill="#334155" />
                  {/* Eye shine */}
                  <circle cx="44" cy="43" r="0.9" fill="white" opacity="0.9" />
                  <circle cx="58" cy="43" r="0.9" fill="white" opacity="0.9" />
                  {/* Eyebrows */}
                  <path d="M40 40 Q43 38.5 46 40" stroke="#5c4033" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  <path d="M54 40 Q57 38.5 60 40" stroke="#5c4033" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  {/* Nose */}
                  <path d="M50 47 Q48.5 50 50 51 Q51.5 50 50 47" fill="none" stroke="#d4a27a" strokeWidth="1" strokeLinecap="round" />
                  {/* Subtle smile */}
                  <path d="M45 55 Q50 58.5 55 55" stroke="#b07850" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  {/* Ear left */}
                  <ellipse cx="30" cy="46" rx="3" ry="4" fill="url(#fAvSkin)" />
                  {/* Ear right */}
                  <ellipse cx="70" cy="46" rx="3" ry="4" fill="url(#fAvSkin)" />
                </svg>'''

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_svg + content[end_idx:]
    print("SVG replaced!")
else:
    print("Block not found!")

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
