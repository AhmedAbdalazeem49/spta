import codecs

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# Update Areej's entry: remove photo, add isFemale flag
old = '''    {
      id: 8,
      name: "Mrs. Areej Almuhsen ",
      role: "Media Team",
      initials: "SA",
      image: imgSarah,
    },'''

new = '''    {
      id: 8,
      name: "Mrs. Areej Almuhsen",
      role: "Media Team",
      initials: "AA",
      isFemale: true,
      image: null,
    },'''

if old in content:
    content = content.replace(old, new)
    print("Entry updated!")
else:
    print("NOT FOUND")

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
