import codecs

with codecs.open('src/user/components/Conference2024/Tabs/ScientificCommitteeTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace(
    "import ImgSuhail from \"@/assets/scientific-commiette/Dr.Suhail's.JPG\";",
    'import ImgSuhail from "@/assets/scientific-commiette/Dr-Suhail.JPG";'
)

with codecs.open('src/user/components/Conference2024/Tabs/ScientificCommitteeTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Fixed import path!")
