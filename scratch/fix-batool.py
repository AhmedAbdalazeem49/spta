import codecs

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

bad_batool = """      {
        title: "Dr.",
        name: "Batool Al Hassan",
          photo: femaleAvatarImg,
        credentials: "PharmD",
        role: "Group Inpatient Pharmacy Services Director; Chairman of the Pharmacy & Therapeutics Committee",
        department: "",
        college: "",
        org: "Almoosa Health Group",
        isFemale: true,
        photo: null,
      },"""

good_batool = """      {
        title: "Dr.",
        name: "Batool Al Hassan",
        photo: femaleAvatarImg,
        credentials: "PharmD",
        role: "Group Inpatient Pharmacy Services Director; Chairman of the Pharmacy & Therapeutics Committee",
        department: "",
        college: "",
        org: "Almoosa Health Group",
        isFemale: true,
      },"""

if bad_batool in content:
    content = content.replace(bad_batool, good_batool)
    print("Fixed Batool in SpeakersTab!")
else:
    print("Block not found!")

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
