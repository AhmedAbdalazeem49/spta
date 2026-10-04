import codecs

# Exhibitor.tsx
with codecs.open('src/user/components/Conference2024/Exhibitor.tsx', 'r', 'utf-8') as f:
    ex_content = f.read()

if 'import { BrandPattern }' not in ex_content:
    ex_content = ex_content.replace(
        'import { motion } from "framer-motion";',
        'import { motion } from "framer-motion";\nimport { BrandPattern } from "./BrandPattern";'
    )
    
ex_content = ex_content.replace(
    'className="py-16 sm:py-24 bg-white dark:bg-slate-900 relative overflow-hidden"',
    'className="py-16 sm:py-24 bg-white dark:bg-slate-900 relative overflow-hidden"\n    >\n      <BrandPattern position="top-right" variant="secondary" />\n      <BrandPattern position="bottom-left" variant="primary" />'
)
ex_content = ex_content.replace('bg-indigo-500/5', 'bg-[#11517E]/5')
ex_content = ex_content.replace('bg-blue-500/5', 'bg-[#6FC4BC]/5')
ex_content = ex_content.replace('from-blue-600 to-indigo-600', 'from-[#11517E] to-[#6FC4BC]')
ex_content = ex_content.replace('from-blue-50 to-indigo-50/30', 'from-[#f0f9f8] to-[#e6f3f0]')

with codecs.open('src/user/components/Conference2024/Exhibitor.tsx', 'w', 'utf-8') as f:
    f.write(ex_content)


# SponsorsSlider.tsx
with codecs.open('src/user/components/Conference2024/SponsorsSlider.tsx', 'r', 'utf-8') as f:
    sp_content = f.read()

if 'import { BrandPattern }' not in sp_content:
    sp_content = sp_content.replace(
        'import { motion } from "framer-motion";',
        'import { motion } from "framer-motion";\nimport { BrandPattern } from "./BrandPattern";'
    )

sp_content = sp_content.replace(
    '<section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 overflow-x-hidden relative">',
    '<section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 overflow-x-hidden relative">\n      <BrandPattern position="top-left" variant="primary" />\n      <BrandPattern position="bottom-right" variant="secondary" />'
)

# Replace Sponsor colors while keeping their metallic feel, but applying brand colors softly
sp_content = sp_content.replace('bg-amber-100', 'bg-[#6FC4BC]/10')
sp_content = sp_content.replace('border-amber-200', 'border-[#6FC4BC]/30')
sp_content = sp_content.replace('text-amber-800', 'text-[#11517E]')
sp_content = sp_content.replace('bg-amber-500', 'bg-[#6FC4BC]')
sp_content = sp_content.replace('shadow-amber-500', 'shadow-[#6FC4BC]')

sp_content = sp_content.replace('bg-slate-200', 'bg-[#11517E]/10')
sp_content = sp_content.replace('border-slate-300', 'border-[#11517E]/30')
sp_content = sp_content.replace('text-slate-800', 'text-[#11517E]')
sp_content = sp_content.replace('bg-slate-400', 'bg-[#11517E]')
sp_content = sp_content.replace('shadow-slate-400', 'shadow-[#11517E]')

sp_content = sp_content.replace('bg-rose-100', 'bg-[#55AE47]/10')
sp_content = sp_content.replace('border-rose-200', 'border-[#55AE47]/30')
sp_content = sp_content.replace('text-rose-800', 'text-[#11517E]')
sp_content = sp_content.replace('bg-rose-400', 'bg-[#55AE47]')
sp_content = sp_content.replace('shadow-rose-400', 'shadow-[#55AE47]')

with codecs.open('src/user/components/Conference2024/SponsorsSlider.tsx', 'w', 'utf-8') as f:
    f.write(sp_content)

print("Updated Exhibitor & SponsorsSlider")
