import re

with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update moderators array
new_moderators = '''moderators: [
      { title: "Dr.", name: "Abdulaziz Alomereni", credentials: "PhD, PT", role: "Assistant Professor of Musculoskeletal Physical Therapy", department: "Department of Medical Rehabilitation Sciences - Physical Therapy Program", college: "College of Applied Medical Sciences", org: "Najran University", isFemale: false, photo: ImgAbdulaziz },
      { title: "Dr.", name: "Ahmad Alghamdi", credentials: "PhD, PT", role: "Assistant Professor; Chair of the Physical Therapy Department", department: "Department of Physical Therapy", college: "College of Applied Medical Sciences", org: "Imam Abdulrahman Bin Faisal University", isFemale: false, photo: ImgAhmad },
      { title: "Dr.", name: "Hani Alkhawajah", credentials: "BSc PT, MSc, PhD", role: "Senior Staff Physiotherapist; Chairman of the Physical Therapy Department", department: "Department of Physical Therapy", college: "King Fahad Hospital of the University, Alkhobar", org: "Imam Abdulrahman Bin Faisal University", isFemale: false, photo: ImgHani },
      { title: "Dr.", name: "Sara Almansouri", credentials: "PhD", role: "Assistant Professor", department: "", college: "Faculty of Medical Rehabilitation Sciences", org: "King Abdulaziz University", isFemale: true, photo: ImgSara },
      { title: "Dr.", name: "Batool Al Hassan", credentials: "PharmD", role: "Group Inpatient Pharmacy Services Director; Chairman of the Pharmacy & Therapeutics Committee", department: "", college: "", org: "Almoosa Health Group", isFemale: true, photo: null },
      { title: "Dr.", name: "Mishal Aldaihan", credentials: "PT, DPT, MPT, Ph.D", role: "Associate Professor of Physical Therapy", department: "Department of Rehabilitation Health Sciences", college: "College of Applied Medical Sciences", org: "King Saud University", isFemale: false, photo: ImgMishal },
      { title: "Dr.", name: "Asma Alderaa", credentials: "BSc, MSc, Ph.D", role: "Assistant Professor and Consultant Physical Therapist", department: "Rehabilitation Department", college: "College of Applied Medical Sciences", org: "King Saud University", isFemale: true, photo: ImgAsma },
      { title: "Dr.", name: "Sattam Almutairi", credentials: "PT, DPT, MPT, Ph.D", role: "Associate Professor and Consultant Physical Therapy", department: "Department of Physical Therapy", college: "College of Applied Medical Science", org: "Qassim University", isFemale: false, photo: ImgSattam },
    ]'''
content = re.sub(r'moderators:\s*\[.*?\]', new_moderators, content, flags=re.DOTALL)

# 2. Update moderator card render to include credentials
# We just replace the h4 part in the flex-1 div for moderators
old_card_name = '''<h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {speaker.title && <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">{speaker.title}</span>}
                      {speaker.name}
                    </h4>'''

new_card_name = '''<h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {speaker.title && <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">{speaker.title}</span>}
                      {speaker.name}
                    </h4>
                    {speaker.credentials && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {speaker.credentials.split(',').map((cred: string, idx: number) => (
                          <span key={idx} className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {cred.trim()}
                          </span>
                        ))}
                      </div>
                    )}'''

# Replace it ONLY in the moderators section. We can locate the right one by looking for the department block.
if 'speaker.department &&' in content:
    idx = content.rfind(old_card_name, 0, content.find('speaker.department &&'))
    if idx != -1:
        content = content[:idx] + new_card_name + content[idx + len(old_card_name):]


# 3. Update the Modal Layout
modal_start = r'\{/\* Image Side \(Top - Auto/Contain Height for full picture visibility\) \*/\}'
# We need to replace everything from modal_start up to </motion.div> for the modal content
# The original modal content ends at:
#                       </div>
#                     </div>
#                   </div>
#                 </motion.div>

new_modal_content = '''{/* Image Container - Full display */}
                    <div className="w-full relative bg-slate-100 dark:bg-slate-950 flex justify-center pt-8 pb-4">
                      {selectedSpeaker.photo ? (
                        <img 
                          src={selectedSpeaker.photo} 
                          alt={selectedSpeaker.name} 
                          className="w-full h-auto max-h-[65vh] object-contain drop-shadow-xl" 
                        />
                      ) : (
                        <div className="w-full h-80 flex items-center justify-center">
                          <FallbackAvatar name={selectedSpeaker.name} isFemale={selectedSpeaker.isFemale} />
                        </div>
                      )}
                    </div>

                    {/* Content Side (Bottom) */}
                    <div className="w-full p-8 sm:p-10 flex flex-col bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 w-max shadow-sm">
                        {selectedSpeaker.type}
                      </div>
                      
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-3">
                        {selectedSpeaker.title && <span className="text-amber-600 dark:text-amber-500 font-bold mr-2">{selectedSpeaker.title}</span>}
                        {selectedSpeaker.name}
                      </h2>
                      
                      {selectedSpeaker.credentials && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedSpeaker.credentials.split(',').map((cred: string, idx: number) => (
                            <span key={idx} className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md text-sm font-bold shadow-sm">
                              {cred.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Optional Info display for moderators/panelists if selected from there */}
                      {(selectedSpeaker.role || selectedSpeaker.department || selectedSpeaker.college || selectedSpeaker.org) && (
                        <div className="mb-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                          {selectedSpeaker.role && <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">{selectedSpeaker.role}</p>}
                          {selectedSpeaker.department && <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{selectedSpeaker.department}</p>}
                          {selectedSpeaker.college && <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{selectedSpeaker.college}</p>}
                          {selectedSpeaker.org && <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{selectedSpeaker.org}</p>}
                        </div>
                      )}

                      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mt-2">
                        {selectedSpeaker.bio ? selectedSpeaker.bio.split('\\n').map((paragraph: string, idx: number) => (
                          <p key={idx} className="mb-4 last:mb-0 leading-relaxed">
                            {paragraph}
                          </p>
                        )) : <p className="italic text-slate-400">Bio coming soon.</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>'''

import re

# Find the start of the image section
start_idx = content.find('{/* Image Side (Top - Auto/Contain Height for full picture visibility) */}')
if start_idx != -1:
    end_idx = content.find('</motion.div>', start_idx)
    
    # Actually, we need to match until the FIRST </motion.div> that closes the modal content.
    if end_idx != -1:
        content = content[:start_idx] + new_modal_content + content[end_idx + len('</motion.div>'):]


with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
