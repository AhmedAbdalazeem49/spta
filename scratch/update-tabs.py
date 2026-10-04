import codecs

# StrategicPartner.tsx
with codecs.open('src/user/components/Conference2024/StrategicPartner.tsx', 'r', 'utf-8') as f:
    st_content = f.read()

if 'import { BrandPattern }' not in st_content:
    st_content = st_content.replace(
        'import { motion } from "framer-motion";',
        'import { motion } from "framer-motion";\nimport { BrandPattern } from "./BrandPattern";'
    )
    
st_content = st_content.replace(
    '<section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">',
    '<section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">\n      <BrandPattern position="top-right" variant="primary" />'
)
st_content = st_content.replace('from-blue-600 to-indigo-700', 'from-[#11517E] to-[#6FC4BC]')
st_content = st_content.replace('text-blue-600', 'text-[#11517E]')
st_content = st_content.replace('bg-blue-600', 'bg-[#11517E]')
st_content = st_content.replace('border-blue-100', 'border-[#6FC4BC]/30')
st_content = st_content.replace('from-blue-50 to-indigo-50/50', 'from-[#e6f3f0] to-[#f0f9f8]')

with codecs.open('src/user/components/Conference2024/StrategicPartner.tsx', 'w', 'utf-8') as f:
    f.write(st_content)

# InteractiveTabs.tsx
with codecs.open('src/user/components/Conference2024/InteractiveTabs.tsx', 'r', 'utf-8') as f:
    tab_content = f.read()

if 'import { BrandPattern }' not in tab_content:
    tab_content = tab_content.replace(
        'import { AgendaTab } from "./Tabs/AgendaTab";',
        'import { BrandPattern } from "./BrandPattern";\nimport { AgendaTab } from "./Tabs/AgendaTab";'
    )

tab_content = tab_content.replace(
    '<section id="conference-tabs" className="py-12 sm:py-20 bg-white dark:bg-slate-950 min-h-screen">',
    '<section id="conference-tabs" className="py-12 sm:py-20 bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden">\n      <BrandPattern position="top-left" variant="secondary" />\n      <BrandPattern position="bottom-right" variant="primary" />'
)

# Replace active tab colors
tab_content = tab_content.replace('bg-blue-600 text-white shadow-md shadow-blue-500/25', 'bg-[#11517E] text-white shadow-md shadow-[#11517E]/25')
tab_content = tab_content.replace('text-blue-600', 'text-[#11517E]')
tab_content = tab_content.replace('bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', 'bg-[#6FC4BC]/20 text-[#11517E] dark:text-[#6FC4BC]')

with codecs.open('src/user/components/Conference2024/InteractiveTabs.tsx', 'w', 'utf-8') as f:
    f.write(tab_content)

print("Updated StrategicPartner & InteractiveTabs")
