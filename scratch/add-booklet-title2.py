import codecs

with codecs.open('src/user/components/Conference2024/Tabs/BookletTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# The actual content has the emoji comment
old = 'className="w-full pb-16 space-y-8">\n\n\n      {/* \U0001f680\U0001f680\U0001f680 ACCORDION SECTIONS \U0001f680\U0001f680\U0001f680 */}\n      <div className="space-y-4">'

new = 'className="w-full pb-16 space-y-8">\n\n        {/* Section Title */}\n        <div className="mb-2">\n          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3">\n            Visitor Information\n          </h3>\n          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>\n        </div>\n\n      {/* ACCORDION SECTIONS */}\n      <div className="space-y-4">'

if old in content:
    content = content.replace(old, new)
    print("Replaced OK")
else:
    # Try without the exact emoji - use a simpler approach
    import re
    content = re.sub(
        r'(className="w-full pb-16 space-y-8">)\s*\{/\*.*?ACCORDION SECTIONS.*?\*/\}\s*(<div className="space-y-4">)',
        r'\1\n\n        {/* Section Title */}\n        <div className="mb-2">\n          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3">\n            Visitor Information\n          </h3>\n          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>\n        </div>\n\n      {/* ACCORDION SECTIONS */}\n      \2',
        content,
        flags=re.DOTALL
    )
    print("Regex replaced")

with codecs.open('src/user/components/Conference2024/Tabs/BookletTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
