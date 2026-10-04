import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# 1. Update calculateTotal
old_calc = """  const calculateTotal = () => {
    if (!priceData) return 0;
    let total = priceData.conference_price || 0;
    if (selectedMorning) total += (priceData.workshop_price || 0);
    if (selectedEvening) total += (priceData.workshop_price || 0);"""

new_calc = """  const hasRegistration = !!priceData?.my_registration;
  const existingWorkshops = priceData?.my_registration?.selected_workshops || [];
  const hasMorning = existingWorkshops.some((w: string) => w.startsWith('m'));
  const hasEvening = existingWorkshops.some((w: string) => w.startsWith('e'));

  const calculateTotal = () => {
    if (!priceData) return 0;
    let total = hasRegistration ? 0 : (priceData.conference_price || 0);
    if (selectedMorning && !existingWorkshops.includes(selectedMorning)) total += (priceData.workshop_price || 0);
    if (selectedEvening && !existingWorkshops.includes(selectedEvening)) total += (priceData.workshop_price || 0);"""

if old_calc in content:
    content = content.replace(old_calc, new_calc)
    print("Updated calculateTotal")

# 2. Update the initial state of selectedMorning and selectedEvening if already registered?
# If they are already registered, it would be nice to set `selectedMorning` to their existing one, but disable it.
# Actually, the user can just use the UI. Let's just update the Workshop Add-ons section to show a banner.

# Find the Workshop Add-ons Section B
old_b = """        {/* Section B: Workshops */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border-2 border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">"""

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
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border-2 border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">"""

if old_b in content:
    content = content.replace(old_b, new_b)
    print("Updated Section B header")

# 3. Update the Conference price breakdown row
old_conf_row = """            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Conference Registration</span>
              <span className="font-semibold text-slate-900 dark:text-white">{priceData?.conference_price || 0} SAR</span>
            </div>"""

new_conf_row = """            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Conference Registration</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {hasRegistration ? <span className="text-emerald-500 flex items-center gap-1"><Check className="w-4 h-4"/> Paid</span> : `${priceData?.conference_price || 0} SAR`}
              </span>
            </div>"""

if old_conf_row in content:
    content = content.replace(old_conf_row, new_conf_row)
    print("Updated Conference price row")


with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

