import re

with open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace morningWorkshops
old_morning = r"const morningWorkshops = \[.*?\];"
new_morning = '''const morningWorkshops = [
    { id: 'm1', title: 'Clinical Reasoning in Cervicothoracic Disorders', speaker: 'Dr. Terrence McGee', time: '08:00 AM - 12:00 PM' },
    { id: 'm2', title: 'Speaking Up in Elite Sport', speaker: 'Dr. Sian Knott', time: '08:00 AM - 12:00 PM' },
    { id: 'm3', title: 'From Rehabilitation to Performance: Integrating OPT', speaker: 'Ms. Tahani AlMahdi', time: '08:00 AM - 12:00 PM' },
    { id: 'm4', title: 'Physiotherapy in Chronic Overlapping Pain Conditions', speaker: 'Dr. Ali Alatar', time: '08:00 AM - 12:00 PM' },
    { id: 'm5', title: 'A Practical Approach to Acute Vertigo and BPPV', speaker: 'Dr. Doaa AlSharif', time: '08:00 AM - 12:00 PM' },
  ];'''
content = re.sub(old_morning, new_morning, content, flags=re.DOTALL)

old_evening = r"const eveningWorkshops = \[.*?\];"
new_evening = '''const eveningWorkshops = [
    { id: 'e1', title: 'Aquatic Therapy Beyond the Pool', speaker: 'Mr. Mohamed Zedan', time: '01:00 PM - 05:00 PM' },
    { id: 'e2', title: 'Using Musculoskeletal Ultrasound', speaker: 'Mr. Jaffar Alabdrabalrasol', time: '01:00 PM - 05:00 PM' },
    { id: 'e3', title: 'From Physical Stimuli to Biological Adaptation', speaker: 'Dr. Philippe Germain', time: '01:00 PM - 05:00 PM' },
    { id: 'e4', title: 'Better Teams, Better Care', speaker: 'Ms. Halah Aldhuaian', time: '01:00 PM - 05:00 PM' },
    { id: 'e5', title: 'From Risk to Readiness', speaker: 'Dr. Mohammed Alshehri', time: '01:00 PM - 05:00 PM' },
  ];'''
content = re.sub(old_evening, new_evening, content, flags=re.DOTALL)

# Now, we need to replace the two <select> tags with custom radio grids.
# I'll search for the morning and evening Workshop selection blocks.

# The block starts with <div className="space-y-6 md:col-span-2">
# and ends right before {/* Payment Summary */} or something similar. Let's find it accurately.

new_workshops_selection = '''<div className="space-y-8 md:col-span-2">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white border-b pb-2">
                    {t("اختيار ورش العمل (اختياري)", "Workshop Selection (Optional)")}
                  </h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-300 mb-6">
                    <p className="font-semibold text-sm">📅 Saturday, 14 November 2026 - Full day of workshops</p>
                    <p className="text-sm mt-1">Each workshop is 4 hours long. You can select one morning and/or one afternoon workshop.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-base font-bold text-slate-700 dark:text-slate-200">
                        {t("ورشة العمل الصباحية", "Morning Workshop")} (08:00 AM - 12:00 PM)
                      </label>
                      {selectedMorning && (
                        <button type="button" onClick={() => setSelectedMorning("")} className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md transition-colors">Clear Selection</button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {morningWorkshops.map(w => (
                        <div 
                          key={w.id}
                          onClick={() => setSelectedMorning(w.id === selectedMorning ? "" : w.id)}
                          className={cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 flex items-start gap-3 relative }
                        >
                           <div className={w-5 h-5 shrink-0 rounded-full border-2 mt-0.5 flex items-center justify-center }>
                              {selectedMorning === w.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                           </div>
                           <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                             <div>
                               <p className={ont-bold  leading-tight}>{w.title}</p>
                               <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{w.speaker}</p>
                               <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span> 14 Nov, {w.time} (4 hours)</p>
                             </div>
                             {priceData?.workshop_price > 0 && (
                               <div className={	ext-sm font-bold whitespace-nowrap px-3 py-1 rounded-full }>
                                 + {priceData.workshop_price} SAR
                               </div>
                             )}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-base font-bold text-slate-700 dark:text-slate-200">
                        {t("ورشة العمل المسائية", "Evening Workshop")} (01:00 PM - 05:00 PM)
                      </label>
                      {selectedEvening && (
                        <button type="button" onClick={() => setSelectedEvening("")} className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md transition-colors">Clear Selection</button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {eveningWorkshops.map(w => (
                        <div 
                          key={w.id}
                          onClick={() => setSelectedEvening(w.id === selectedEvening ? "" : w.id)}
                          className={cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 flex items-start gap-3 relative }
                        >
                           <div className={w-5 h-5 shrink-0 rounded-full border-2 mt-0.5 flex items-center justify-center }>
                              {selectedEvening === w.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                           </div>
                           <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                             <div>
                               <p className={ont-bold  leading-tight}>{w.title}</p>
                               <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{w.speaker}</p>
                               <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span> 14 Nov, {w.time} (4 hours)</p>
                             </div>
                             {priceData?.workshop_price > 0 && (
                               <div className={	ext-sm font-bold whitespace-nowrap px-3 py-1 rounded-full }>
                                 + {priceData.workshop_price} SAR
                               </div>
                             )}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>'''

import re

# Match the old workshop selection div and replace it
# Start: <div className="space-y-6 md:col-span-2">
# End: Just before {/* Payment Summary */}
pattern = r'<div className="space-y-6 md:col-span-2">\s*<h4.*?{/\* Payment Summary \*/\}'
content = re.sub(pattern, new_workshops_selection + '\n\n                {/* Payment Summary */}', content, flags=re.DOTALL)

with open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
