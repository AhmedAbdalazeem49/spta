import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/BookletTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# ----- Fix AccordionItem colorMap (lines 50-62) -----
old_colormap_accordion = '''  const colorMap: Record<string, string> = {
    blue: "border-[#11517E] bg-[#f0f8f8] dark:bg-[#11517E]/20 text-[#11517E] dark:text-[#6FC4BC]",
    green:
      "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    amber:
      "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
    purple:
      "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    rose: "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300",
    teal: "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300",
  };'''

new_colormap_accordion = '''  const colorMap: Record<string, string> = {
    blue: "border-[#11517E] bg-[#11517E]/5 text-[#11517E]",
    green: "border-[#55AE47] bg-[#55AE47]/5 text-[#55AE47]",
    amber: "border-[#55AE47] bg-[#55AE47]/5 text-[#55AE47]",
    purple: "border-[#6FC4BC] bg-[#6FC4BC]/5 text-[#6FC4BC]",
    rose: "border-[#11517E] bg-[#11517E]/5 text-[#11517E]",
    teal: "border-[#6FC4BC] bg-[#6FC4BC]/5 text-[#6FC4BC]",
    indigo: "border-[#11517E] bg-[#11517E]/5 text-[#11517E]",
  };'''

# ----- Fix section title -----
old_title = '        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3">'
new_title = '        <h3 className="text-4xl font-black text-[#11517E] mb-3">'

# ----- Fix accordion button header text -----
old_btn_title = '          <div className="font-bold text-slate-900 dark:text-white text-lg leading-tight">'
new_btn_title = '          <div className="font-bold text-[#11517E] text-lg leading-tight">'

old_btn_subtitle = '            <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">'
new_btn_subtitle = '            <div className="text-sm text-[#11517E]/60 mt-0.5">'

old_chevron = '          className="shrink-0 text-slate-400"'
new_chevron = '          className="shrink-0 text-[#6FC4BC]"'

# ----- Fix info row colors -----
old_label = '    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 sm:w-40 shrink-0">'
new_label = '    <span className="text-sm font-bold text-[#11517E]/60 sm:w-40 shrink-0">'

old_value = '    <span className="text-slate-800 dark:text-slate-200 font-medium flex-1">'
new_value = '    <span className="text-slate-700 font-medium flex-1">'

old_inforow_border = '  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">'
new_inforow_border = '  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-[#11517E]/8 last:border-0">'

# ----- Fix colorMap in component (places/hotels) -----
old_colormap_component = '''  const colorMap: Record<string, string> = {
    blue: "bg-[#e0f2f1] dark:bg-[#11517E]/30 text-[#11517E] dark:text-[#6FC4BC]",
    indigo:
      "bg-indigo-100 dark:bg-indigo-900/30 text-[#6FC4BC] dark:text-indigo-400",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    amber:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    rose: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
  };'''

new_colormap_component = '''  const colorMap: Record<string, string> = {
    blue: "bg-[#11517E]/10 text-[#11517E]",
    indigo: "bg-[#11517E]/10 text-[#11517E]",
    green: "bg-[#55AE47]/10 text-[#55AE47]",
    amber: "bg-[#55AE47]/10 text-[#55AE47]",
    rose: "bg-[#11517E]/10 text-[#11517E]",
    purple: "bg-[#6FC4BC]/10 text-[#6FC4BC]",
    teal: "bg-[#6FC4BC]/10 text-[#6FC4BC]",
  };'''

# ----- Fix MapLink colors -----
old_maplink = '    className="inline-flex items-center gap-1.5 text-[#11517E] dark:text-[#6FC4BC] font-semibold hover:underline text-sm"'
new_maplink = '    className="inline-flex items-center gap-1.5 text-[#11517E] font-semibold hover:underline text-sm"'

# ----- Fix accordion card bg -----
old_accordion_card = '      className={`rounded-2xl border-2 overflow-hidden transition-shadow ${open ? "shadow-md" : "shadow-sm"} ${accent.split(" ")[0]} bg-white dark:bg-slate-900`}'
new_accordion_card = '      className={`rounded-2xl border-2 overflow-hidden transition-shadow ${open ? "shadow-md" : "shadow-sm"} ${accent.split(" ")[0]} bg-white`}'

replacements = [
    (old_colormap_accordion, new_colormap_accordion),
    (old_title, new_title),
    (old_btn_title, new_btn_title),
    (old_btn_subtitle, new_btn_subtitle),
    (old_chevron, new_chevron),
    (old_label, new_label),
    (old_value, new_value),
    (old_inforow_border, new_inforow_border),
    (old_colormap_component, new_colormap_component),
    (old_maplink, new_maplink),
    (old_accordion_card, new_accordion_card),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"OK: {old[:60].strip()!r}")
    else:
        old_crlf = old.replace('\n', '\r\n')
        new_crlf = new.replace('\n', '\r\n')
        if old_crlf in content:
            content = content.replace(old_crlf, new_crlf)
            print(f"OK (CRLF): {old[:60].strip()!r}")
        else:
            print(f"MISS: {old[:60].strip()!r}")

# Fix any remaining dark: classes in BookletTab
content = content.replace('dark:text-white', '')
content = content.replace('dark:bg-slate-800', '')
content = content.replace('dark:bg-slate-900', '')
content = content.replace('dark:border-slate-800', '')
content = content.replace(' dark:text-slate-300', '')
content = content.replace(' dark:text-slate-400', '')
content = content.replace('dark:bg-gray-800', '')

with codecs.open('src/user/components/Conference2024/Tabs/BookletTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("BookletTab done!")
