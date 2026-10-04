import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'r', 'utf-8') as f:
    ws_content = f.read()

# Update Tahani
tahani_pattern = r'name:\s*"Ms\. Tahani AlMahdi, MSc, PT",\s*title:\s*"Saudi Academy of Sports Sciences\\nSaudi Arabia"'
ws_content = re.sub(tahani_pattern, 'name: "Ms. Tahani AlMahdi, MSc, PT",\n          title: "Saudi Academy of Sports Sciences\\nSaudi Arabia",\n          photo: femaleAvatarImg', ws_content)

# Update Doaa
doaa_pattern = r'name:\s*"Dr\. Doaa AlSharif, PhD, PT, AVRT, CRCs, MSc",\s*title:\s*"Assistant professor\\nCollege of Applied Medical Sciences, Physical therapy Department\\nTaif University, Saudi Arabia"'
ws_content = re.sub(doaa_pattern, 'name: "Dr. Doaa AlSharif, PhD, PT, AVRT, CRCs, MSc",\n          title: "Assistant professor\\nCollege of Applied Medical Sciences, Physical therapy Department\\nTaif University, Saudi Arabia",\n          photo: femaleAvatarImg', ws_content)

# Update Maryam
maryam_pattern = r'name:\s*"Mrs\. Maryam Alshammari, MSc, PT\. AVPT",\s*title:\s*"Cochlear Implant Department\\nHafar Albaten Central Hospital"'
ws_content = re.sub(maryam_pattern, 'name: "Mrs. Maryam Alshammari, MSc, PT. AVPT",\n          title: "Cochlear Implant Department\\nHafar Albaten Central Hospital",\n          photo: femaleAvatarImg', ws_content)

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'w', 'utf-8') as f:
    f.write(ws_content)

print("Injected photos into WorkshopsTab")
