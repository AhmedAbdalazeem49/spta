import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace("id: 1", "id: '1'")
content = content.replace("id: 2", "id: '2'")
content = content.replace("id: 3", "id: '3'")
content = content.replace("id: 4", "id: '4'")
content = content.replace("id: 5", "id: '5'")
content = content.replace("id: 6", "id: '6'")
content = content.replace("id: 7", "id: '7'")
content = content.replace("id: 8", "id: '8'")
content = content.replace("id: 9", "id: '9'")
content = content.replace("id: 10", "id: '10'")

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Changed workshop IDs to string numbers")
