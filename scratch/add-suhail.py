import codecs

with codecs.open('src/user/components/Conference2024/Tabs/ScientificCommitteeTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# 1. Add import for Dr. Suhail's photo
old_last_import = 'import ImgNoran from "@/assets/scientific-commiette/Noran Felemban.png";'
new_last_import = '''import ImgNoran from "@/assets/scientific-commiette/Noran Felemban.png";
import ImgSuhail from "@/assets/scientific-commiette/Dr.Suhail's.JPG";'''
content = content.replace(old_last_import, new_last_import)

# 2. Add Dr. Suhail as member #9 (before the existing #9 Noran), and shift Noran to #10
# Find the Noran entry and inject before it
old_noran = '''  {
    id: 9,
    name: "Ms. Noran Abdulkhaliq Felemban",'''
new_suhail_and_noran = '''  {
    id: 9,
    name: "Dr. Suhail Esam Yaghmor",
    title: "Dr.",
    role: "member",
    affiliation: "Almoosa Rehabilitation Hospital, Al-Ahsa",
    photo: ImgSuhail,
    bio: "Dr. Suhail Esam Yaghmor is a Consultant in Physical Medicine and Rehabilitation with extensive experience in rehabilitation medicine, healthcare leadership, and quality improvement. He completed his specialist training in Physical Medicine and Rehabilitation at Paris Descartes University in France and is licensed as a consultant by the Saudi Commission for Health Specialties. He has held several senior leadership positions, including Chief Medical Officer at Almoosa Rehabilitation Hospital and Medical Director at Cambridge Medical & Rehabilitation Hospital. He has also led healthcare teams through major accreditation programs, including CARF and CBAHI, and serves as a certified surveyor for the Saudi Commission for Health Specialties. Dr. Yaghmor is also involved in medical education, professional examinations, rehabilitation service development, and national professional organizations. His clinical interests include neurorehabilitation, musculoskeletal rehabilitation, spinal cord injury, and interventional rehabilitation medicine.",
  },
  {
    id: 10,
    name: "Ms. Noran Abdulkhaliq Felemban",'''
content = content.replace(old_noran, new_suhail_and_noran)

with codecs.open('src/user/components/Conference2024/Tabs/ScientificCommitteeTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Done - Dr. Suhail added!")
