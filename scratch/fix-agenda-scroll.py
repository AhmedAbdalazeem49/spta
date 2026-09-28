import codecs

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Add an ID to the top of AgendaTab or its container
# <div className="w-full pb-16"> -> <div id="agenda-top" className="w-full pb-16">
content = content.replace('<div className="w-full pb-16">', '<div id="agenda-top" className="w-full pb-16">')

# Modify the onClick for Day 2 to also scroll
old_click = 'onClick={() => setActiveDay(2)}'
new_click = 'onClick={() => { setActiveDay(2); const el = document.getElementById("agenda-top"); if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" }); } }}'
content = content.replace(old_click, new_click)

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
