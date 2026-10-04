import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'r', 'utf-8') as f:
    ws_content = f.read()

# Fix literal newlines in the generated strings
bad_tahani = 'title: "Saudi Academy of Sports Sciences\nSaudi Arabia",'
good_tahani = 'title: "Saudi Academy of Sports Sciences\\nSaudi Arabia",'
ws_content = ws_content.replace(bad_tahani, good_tahani)

bad_doaa = 'title: "Assistant professor\nCollege of Applied Medical Sciences, Physical therapy Department\nTaif University, Saudi Arabia",'
good_doaa = 'title: "Assistant professor\\nCollege of Applied Medical Sciences, Physical therapy Department\\nTaif University, Saudi Arabia",'
ws_content = ws_content.replace(bad_doaa, good_doaa)

bad_maryam = 'title: "Cochlear Implant Department\nHafar Albaten Central Hospital",'
good_maryam = 'title: "Cochlear Implant Department\\nHafar Albaten Central Hospital",'
ws_content = ws_content.replace(bad_maryam, good_maryam)

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'w', 'utf-8') as f:
    f.write(ws_content)

print("Fixed newlines!")
