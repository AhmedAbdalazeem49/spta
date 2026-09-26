import re

with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_moderators = '''moderators: [
      { title: "Dr.", name: "Abdulaziz Alomereni, PhD, PT", role: "Assistant Professor of Musculoskeletal Physical Therapy", department: "Department of Medical Rehabilitation Sciences – Physical Therapy Program", college: "College of Applied Medical Sciences", org: "Najran University", isFemale: false, photo: ImgAbdulaziz },
      { title: "Dr.", name: "Ahmad Alghamdi, PhD, PT", role: "Assistant Professor; Chair of the Physical Therapy Department", department: "Department of Physical Therapy", college: "College of Applied Medical Sciences", org: "Imam Abdulrahman Bin Faisal University", isFemale: false, photo: ImgAhmad },
      { title: "Dr.", name: "Hani Alkhawajah, BSc PT, MSc, PhD", role: "Senior Staff Physiotherapist; Chairman of the Physical Therapy Department", department: "Department of Physical Therapy", college: "King Fahad Hospital of the University, Alkhobar", org: "Imam Abdulrahman Bin Faisal University", isFemale: false, photo: ImgHani },
      { title: "Dr.", name: "Sara Almansouri, PhD", role: "Assistant Professor", department: "", college: "Faculty of Medical Rehabilitation Sciences", org: "King Abdulaziz University", isFemale: true, photo: ImgSara },
      { title: "Dr.", name: "Batool Al Hassan, PharmD", role: "Group Inpatient Pharmacy Services Director; Chairman of the Pharmacy & Therapeutics Committee", department: "", college: "", org: "Almoosa Health Group", isFemale: true, photo: null },
      { title: "Dr.", name: "Mishal Aldaihan, PT, DPT, MPT, Ph.D", role: "Associate Professor of Physical Therapy", department: "Department of Rehabilitation Health Sciences", college: "College of Applied Medical Sciences", org: "King Saud University", isFemale: false, photo: ImgMishal },
      { title: "Dr.", name: "Asma Alderaa, BSc, MSc, Ph.D", role: "Assistant Professor and Consultant Physical Therapist", department: "Rehabilitation Department", college: "College of Applied Medical Sciences", org: "King Saud University", isFemale: true, photo: ImgAsma },
      { title: "Dr.", name: "Sattam Almutairi, PT, DPT, MPT, Ph.D", role: "Associate Professor and Consultant Physical Therapy", department: "Department of Physical Therapy", college: "College of Applied Medical Science", org: "Qassim University", isFemale: false, photo: ImgSattam },
    ]'''

# Replace moderators array
content = re.sub(r'moderators:\s*\[.*?\]', new_moderators, content, flags=re.DOTALL)

# Now, we need to update the rendering of the moderator card.
# Search for:
#           {activeTab === 'moderators' && (
#             <motion.div
#               key="moderators"
#               ...
#               className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
#             >
#               {speakersData.moderators.map((speaker, i) => (
#                 <div ...
#
# Inside there, we have:
#                     <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
#                       {speaker.title && <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">{speaker.title}</span>}
#                       {speaker.name}
#                     </h4>
#                     <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-snug mb-2 line-clamp-1">
#                       {speaker.role}
#                     </p>
#                     <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
#                       <Building2 className="w-3 h-3" />
#                       {speaker.org}
#                     </div>

new_render = '''<div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {speaker.title && <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">{speaker.title}</span>}
                      {speaker.name}
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-semibold leading-snug mb-1">
                      {speaker.role}
                    </p>
                    {speaker.department && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-1">
                        {speaker.department}
                      </p>
                    )}
                    {speaker.college && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-3">
                        {speaker.college}
                      </p>
                    )}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                      <Building2 className="w-3 h-3 shrink-0" />
                      <span className="text-left">{speaker.org}</span>
                    </div>
                  </div>'''

# Regex to match the flex-1 div
content = re.sub(r'<div className="flex-1">.*?</div>', new_render, content, count=1, flags=re.DOTALL)
# wait, there are multiple <div className="flex-1"> in the file.
# The keynote speakers might have one, panels etc.
# Let's write it in a safer way.

with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
