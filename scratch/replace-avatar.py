import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_svg = '''const FemaleAvatar = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="fAvBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eff6ff" />
        <stop offset="100%" stopColor="#dbeafe" />
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
    {/* Background */}
    <circle cx="50" cy="50" r="50" fill="url(#fAvBg)" />
    {/* Professional blazer / shoulders */}
    <ellipse cx="50" cy="97" rx="32" ry="20" fill="url(#fAvBody)" />
    {/* Collar */}
    <path d="M43 71 L50 80 L57 71" fill="#1e40af" />
    {/* White shirt */}
    <path d="M43 71 L50 77 L57 71 L57 69 L50 73 L43 69 Z" fill="#e0f2fe" opacity="0.95" />
    {/* Neck */}
    <rect x="45" y="60" width="10" height="12" rx="3" fill="url(#fAvSkin)" />
    {/* Head — clean, no hair */}
    <circle cx="50" cy="44" r="21" fill="url(#fAvSkin)" />
    {/* Very subtle head cap — same skin colour, no hair effect */}
    <ellipse cx="50" cy="25" rx="16" ry="5.5" fill="url(#fAvSkin)" />
    {/* Ears */}
    <ellipse cx="29.5" cy="46" rx="3" ry="4.5" fill="url(#fAvSkin)" />
    <ellipse cx="70.5" cy="46" rx="3" ry="4.5" fill="url(#fAvSkin)" />
    {/* Eyebrows — thin, formal */}
    <path d="M40.5 39.5 Q43.5 38 46.5 39.5" stroke="#7c5c3e" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    <path d="M53.5 39.5 Q56.5 38 59.5 39.5" stroke="#7c5c3e" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    {/* Eyes */}
    <ellipse cx="43" cy="44" rx="2.8" ry="2.3" fill="#334155" />
    <ellipse cx="57" cy="44" rx="2.8" ry="2.3" fill="#334155" />
    {/* Eye shine */}
    <circle cx="44" cy="43.2" r="0.85" fill="white" opacity="0.9" />
    <circle cx="58" cy="43.2" r="0.85" fill="white" opacity="0.9" />
    {/* Subtle nose */}
    <path d="M49.5 48 Q48 51 50 52 Q52 51 50.5 48" fill="none" stroke="#d4a27a" strokeWidth="0.9" strokeLinecap="round" />
    {/* Gentle closed smile */}
    <path d="M45.5 56 Q50 59 54.5 56" stroke="#b07850" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
)'''

new_svg = '''const FemaleAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="100" r="60" fill="rgba(255,255,255,0.15)" />
    <ellipse cx="50" cy="30" rx="20" ry="22" fill="rgba(255,255,255,0.9)" />
    <path d="M 20 40 Q 50 65 80 40 Q 75 20 50 18 Q 25 20 20 40Z" fill="rgba(255,255,255,0.5)" />
    <path d="M 25 75 Q 50 65 75 75 L 80 100 L 20 100Z" fill="rgba(255,255,255,0.85)" />
  </svg>
)'''

if old_svg in content:
    content = content.replace(old_svg, new_svg)
    print("Replaced SVG!")
else:
    print("Could not find the SVG in the file.")

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
