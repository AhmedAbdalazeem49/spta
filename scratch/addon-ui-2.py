import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_d = """              <div className="flex justify-between text-base"><span>Conference Ticket</span><span className="font-medium text-slate-900 dark:text-white">{priceData?.conference_price || 0} SAR</span></div>"""
new_d = """              <div className="flex justify-between text-base"><span>Conference Ticket</span><span className="font-medium text-slate-900 dark:text-white">{hasRegistration ? <span className="text-emerald-500 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Paid</span> : `${priceData?.conference_price || 0} SAR`}</span></div>"""

if old_d in content:
    content = content.replace(old_d, new_d)
    print("Updated Section D")

old_b = """        {/* Section B: Workshops */}
        <div>"""

new_b = """        {/* Section B: Workshops */}
        {hasRegistration && (
          <div className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl p-6 shadow-lg flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Check className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">You are already registered!</h3>
              <p className="opacity-90">Your conference registration is confirmed. You can add optional workshops below.</p>
            </div>
          </div>
        )}
        <div>"""

if old_b in content:
    content = content.replace(old_b, new_b)
    print("Updated Section B")

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

