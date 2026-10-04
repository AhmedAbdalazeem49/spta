import codecs

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# The script accidentally cut the imports block and pasted it after the SVG closing tag
# Fix: remove the stray import lines appended after </svg>
bad = '''                </svg> "@/assets/organization-committe/Dr. Abdullah Alfarhan.jpg";
import imgNawaf from "@/assets/organization-committe/Dr. Nawaf Alhatim.jpg";
import imgAbdulrahman from "@/assets/organization-committe/Mr. Abdulrahman Alkusayer.jpg";
import imgAlghanim from "@/assets/organization-committe/Mr. Ahmed Alghanim.jpg";
import imgMohammadAlIbrahim from "@/assets/organization-committe/Mr. Mohammad AlIbrahim.jpg";
import imgDalia from "@/assets/organization-committe/Ms. Dalia Binshaye.jpg";
import imgSarah from "@/assets/organization-committe/Ms. Sarah Alwuthayh.jpg";
import imgShouq from "@/assets/organization-committe/Ms. Shouq Alharbi.jpg";
import imgSujud from "@/assets/organization-committe/Ms. Sujud Al-Thanayyan.jpg";
import imgHiader from "@/assets/organization-committe/hiader-elyame.jpeg";'''

good = '''                </svg>'''

if bad in content:
    content = content.replace(bad, good)
    print("Fixed stray imports!")
else:
    print("Pattern not found")

with codecs.open('src/user/components/Conference2024/Tabs/OrganizingCommitteeTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
