import re

with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace moderators array
moderators_replacement = """  moderators: [
    {
      title: "Dr.",
      name: "Abdulaziz Alomereni",
      credentials: "PhD, PT",
      role: "Assistant Professor of Musculoskeletal Physical Therapy",
      affiliation: "College of Applied Medical Sciences, Najran University, Saudi Arabia",
      isFemale: false,
      photo: ImgAbdulaziz,
    },
    {
      title: "Dr.",
      name: "Ahmad Alghamdi",
      credentials: "PhD, PT",
      role: "Assistant Professor, Chair of the Physical Therapy Department",
      affiliation: "College of Applied Medical Sciences, Imam Abdulrahman Bin Faisal University, Saudi Arabia",
      isFemale: false,
      photo: ImgAhmad,
    },
    {
      title: "Dr.",
      name: "Hani Alkhawajah",
      credentials: "BSc PT, MSc, PhD",
      role: "Senior Staff Physiotherapist, Chairman of the Physical Therapy Department",
      affiliation: "King Fahad Hospital of the University, Saudi Arabia",
      isFemale: false,
      photo: ImgHani,
    },
    {
      title: "Dr.",
      name: "Sara Almansouri",
      credentials: "PhD",
      role: "Assistant Professor",
      affiliation: "Faculty of Medical Rehabilitation Sciences, King Abdulaziz University, Saudi Arabia",
      isFemale: true,
      photo: ImgSara,
    },
    {
      title: "Dr.",
      name: "Batool Al Hassan",
      credentials: "PharmD",
      role: "Group Inpatient Pharmacy Services Director, Chairman of the Pharmacy & Therapeutics Committee",
      affiliation: "Almoosa Health, Saudi Arabia",
      isFemale: true,
      photo: femaleAvatarImg,
    },
    {
      title: "Dr.",
      name: "Mishal Aldaihan",
      credentials: "PT, DPT, MPT, Ph.D",
      role: "Associate Professor of Physical Therapy",
      affiliation: "Department of Rehabilitation Health Sciences, College of Applied Medical Sciences, King Saud University, Saudi Arabia",
      isFemale: false,
      photo: ImgMishal,
    },
    {
      title: "Dr.",
      name: "Asma Alderaa",
      credentials: "BSc, MSc, Ph.D",
      role: "Assistant Professor and Consultant Physical Therapist",
      affiliation: "Deaprtment of Rehabilitation Health Sciences, College of Applied Medical Sciences, King Saud University, Saudi Arabia",
      isFemale: true,
      photo: ImgAsma,
    },
    {
      title: "Dr.",
      name: "Sattam Almutairi",
      credentials: "PT, DPT, MPT, Ph.D",
      role: "Associate Professor and Consultant Physical Therapy",
      affiliation: "Department of Physical Therapy, College of Applied Medical Science, Qassim University, Saudi Arabia",
      isFemale: false,
      photo: ImgSattam,
    },
  ],
};"""

content = re.sub(r'  moderators: \[.*?^\};\n', moderators_replacement + '\n', content, flags=re.MULTILINE | re.DOTALL)

# Update modal to render affiliation as well as department/college/org
modal_old = """                    {(selectedSpeaker.role ||
                      selectedSpeaker.department ||
                      selectedSpeaker.college) && (
                      <div className="text-slate-300 font-medium mb-4">
                        {selectedSpeaker.role && (
                          <span className="block text-amber-400">
                            {selectedSpeaker.role}
                          </span>
                        )}
                        {selectedSpeaker.department && (
                          <span className="block">
                            {selectedSpeaker.department}
                          </span>
                        )}
                        {selectedSpeaker.college && (
                          <span className="block text-sm">
                            {selectedSpeaker.college}
                          </span>
                        )}
                      </div>
                    )}"""

modal_new = """                    {(selectedSpeaker.role ||
                      selectedSpeaker.department ||
                      selectedSpeaker.college ||
                      selectedSpeaker.affiliation ||
                      selectedSpeaker.org) && (
                      <div className="text-slate-300 font-medium mb-4">
                        {selectedSpeaker.role && (
                          <span className="block text-amber-400">
                            {selectedSpeaker.role}
                          </span>
                        )}
                        {selectedSpeaker.department && (
                          <span className="block">
                            {selectedSpeaker.department}
                          </span>
                        )}
                        {selectedSpeaker.college && (
                          <span className="block text-sm">
                            {selectedSpeaker.college}
                          </span>
                        )}
                        {selectedSpeaker.affiliation && (
                          <span className="block text-sm text-slate-400 mt-1">
                            {selectedSpeaker.affiliation}
                          </span>
                        )}
                        {selectedSpeaker.org && (
                          <span className="block text-sm text-slate-400">
                            {selectedSpeaker.org}
                          </span>
                        )}
                      </div>
                    )}"""

content = content.replace(modal_old, modal_new)

with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
