import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace("id: 'W1'", "id: 1")
content = content.replace("id: 'W2'", "id: 2")
content = content.replace("id: 'W3'", "id: 3")
content = content.replace("id: 'W4'", "id: 4")
content = content.replace("id: 'W5'", "id: 5")
content = content.replace("id: 'W6'", "id: 6")
content = content.replace("id: 'W7'", "id: 7")
content = content.replace("id: 'W8'", "id: 8")
content = content.replace("id: 'W9'", "id: 9")
content = content.replace("id: 'W10'", "id: 10")

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Changed workshop IDs to integers")
