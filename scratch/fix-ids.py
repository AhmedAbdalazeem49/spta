import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace("id: '1'", "id: 'm1'")
content = content.replace("id: '2'", "id: 'm2'")
content = content.replace("id: '3'", "id: 'm3'")
content = content.replace("id: '4'", "id: 'm4'")
content = content.replace("id: '5'", "id: 'm5'")
content = content.replace("id: '6'", "id: 'e1'")
content = content.replace("id: '7'", "id: 'e2'")
content = content.replace("id: '8'", "id: 'e3'")
content = content.replace("id: '9'", "id: 'e4'")
content = content.replace("id: '10'", "id: 'e5'")

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Updated IDs to match backend m/e format")
