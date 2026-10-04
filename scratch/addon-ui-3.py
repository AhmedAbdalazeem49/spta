import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = re.sub(
    r'<div className="flex justify-between text-base"><span>Conference Ticket</span><span className="font-medium text-slate-900 dark:text-white">\{priceData\?\.conference_price \|\| 0\} SAR</span></div>',
    r'<div className="flex justify-between text-base"><span>Conference Ticket</span><span className="font-medium text-slate-900 dark:text-white">{hasRegistration ? <span className="text-emerald-500 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Paid</span> : `${priceData?.conference_price || 0} SAR`}</span></div>',
    content
)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Regex replace done")
