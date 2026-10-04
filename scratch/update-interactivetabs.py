import codecs

with codecs.open('src/user/components/Conference2024/InteractiveTabs.tsx', 'r', 'utf-8') as f:
    content = f.read()

old_div = '<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden p-6 md:p-10 w-full">'
new_div = '<div className={`${section.id === "speakers" ? "bg-[#020817] text-white border-blue-900/30" : "bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-gray-100 dark:border-gray-800"} rounded-3xl shadow-xl border overflow-hidden p-6 md:p-10 w-full`}>'

content = content.replace(old_div, new_div)

with codecs.open('src/user/components/Conference2024/InteractiveTabs.tsx', 'w', 'utf-8') as f:
    f.write(content)
