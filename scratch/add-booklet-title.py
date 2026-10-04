import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/BookletTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old = '''      <div className="w-full pb-16 space-y-8">


        {/* ─── ACCORDION SECTIONS ─── */}
        <div className="space-y-4">'''

new = '''      <div className="w-full pb-16 space-y-8">
        {/* Section Title */}
        <div className="mb-2">
          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
            Visitor Information
          </h3>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
        </div>

        {/* ─── ACCORDION SECTIONS ─── */}
        <div className="space-y-4">'''

if old in content:
    content = content.replace(old, new)
    print("Replaced OK")
else:
    print("Not found, trying flexible search...")
    # Try to find approximate location
    idx = content.find('w-full pb-16 space-y-8')
    print(f"Found at index: {idx}")
    print(repr(content[idx:idx+200]))

with codecs.open('src/user/components/Conference2024/Tabs/BookletTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
