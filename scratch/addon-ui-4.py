import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = re.sub(
    r'\{selectedMorning && <div className="flex justify-between text-base"><span>Morning Workshop</span><span className="font-medium text-slate-900 dark:text-white">\{priceData\?\.workshop_price \|\| 0\} SAR</span></div>\}',
    r'{selectedMorning && <div className="flex justify-between text-base"><span>Morning Workshop</span><span className="font-medium text-slate-900 dark:text-white">{existingWorkshops.includes(selectedMorning) ? <span className="text-emerald-500 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Paid</span> : `${priceData?.workshop_price || 0} SAR`}</span></div>}',
    content
)

content = re.sub(
    r'\{selectedEvening && <div className="flex justify-between text-base"><span>Afternoon Workshop</span><span className="font-medium text-slate-900 dark:text-white">\{priceData\?\.workshop_price \|\| 0\} SAR</span></div>\}',
    r'{selectedEvening && <div className="flex justify-between text-base"><span>Afternoon Workshop</span><span className="font-medium text-slate-900 dark:text-white">{existingWorkshops.includes(selectedEvening) ? <span className="text-emerald-500 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Paid</span> : `${priceData?.workshop_price || 0} SAR`}</span></div>}',
    content
)


with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Regex replace 2 done")
