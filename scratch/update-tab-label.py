import codecs

with codecs.open('src/user/components/Conference2024/InteractiveTabs.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Update the label for booklet tab
content = content.replace("'Booklet & Location'", "'Visitor Information'")
content = content.replace('"Booklet & Location"', '"Visitor Information"')

with codecs.open('src/user/components/Conference2024/InteractiveTabs.tsx', 'w', 'utf-8') as f:
    f.write(content)
