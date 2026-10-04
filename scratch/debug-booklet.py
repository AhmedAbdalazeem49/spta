import codecs
import sys

with codecs.open('src/user/components/Conference2024/Tabs/BookletTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

idx = content.find('w-full pb-16 space-y-8')
around = content[idx-10:idx+300]
# Write to temp file to avoid encoding issues
with open('scratch/around.txt', 'w', encoding='utf-8') as f:
    f.write(repr(around))
