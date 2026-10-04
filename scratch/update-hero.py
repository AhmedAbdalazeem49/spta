import codecs

with codecs.open('src/user/components/Conference2024/HeroSection.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# 1. Import BrandPattern
if 'import { BrandPattern }' not in content:
    content = content.replace(
        'import { Calendar, MapPin, Award } from "lucide-react";',
        'import { Calendar, MapPin, Award } from "lucide-react";\nimport { BrandPattern } from "./BrandPattern";'
    )

# 2. Update background styling
old_bg = """      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-black z-0" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />"""

new_bg = """      <BrandPattern position="top-left" variant="primary" />
      <BrandPattern position="bottom-right" variant="secondary" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#11517E]/40 via-slate-900 to-[#0a1e35] z-0" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6FC4BC]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#55AE47]/15 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />"""
content = content.replace(old_bg, new_bg)

# Update badge colors
old_badge = 'border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
new_badge = 'border-white/10 shadow-[0_0_20px_rgba(111,196,188,0.3)]'
content = content.replace(old_badge, new_badge)

old_badge_inner = 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
new_badge_inner = 'bg-[#6FC4BC]/20 text-[#6FC4BC] border border-[#6FC4BC]/30'
content = content.replace(old_badge_inner, new_badge_inner)

# H1 gradient
old_h1_grad = 'from-white via-blue-100 to-slate-400'
new_h1_grad = 'from-white via-[#6FC4BC] to-[#55AE47]'
content = content.replace(old_h1_grad, new_h1_grad)

with codecs.open('src/user/components/Conference2024/HeroSection.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Updated HeroSection")
