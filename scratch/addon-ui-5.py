import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Add useEffect for priceData to auto-select workshops
old_effect = """  useEffect(() => {
    if (isAuthenticated) {
      setStep('register');
      fetchPriceData();
    }
  }, [isAuthenticated]);"""

new_effect = """  useEffect(() => {
    if (isAuthenticated) {
      setStep('register');
      fetchPriceData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (priceData?.my_registration?.selected_workshops) {
      const existing = priceData.my_registration.selected_workshops;
      const morning = existing.find((w: string) => w.startsWith('m'));
      const evening = existing.find((w: string) => w.startsWith('e'));
      if (morning && !selectedMorning) setSelectedMorning(morning);
      if (evening && !selectedEvening) setSelectedEvening(evening);
    }
  }, [priceData]);"""

content = content.replace(old_effect, new_effect)

# Update CustomSelect to take disabled prop
old_select_def = """  const CustomSelect = ({ value, onChange, options, placeholder, timeLabel, priceData }) => {"""
new_select_def = """  const CustomSelect = ({ value, onChange, options, placeholder, timeLabel, priceData, disabled = false }: any) => {"""
content = content.replace(old_select_def, new_select_def)

# Update onClick in CustomSelect
old_select_click = """          <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center bg-white dark:bg-slate-900 shadow-sm ${isOpen ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
          >"""
new_select_click = """          <div 
            onClick={() => { if (!disabled) setIsOpen(!isOpen); }}
            className={`w-full p-4 rounded-2xl border-2 transition-all flex justify-between items-center shadow-sm ${disabled ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-80' : 'bg-white dark:bg-slate-900 cursor-pointer'} ${isOpen ? 'border-blue-500 ring-4 ring-blue-500/10' : (!disabled && 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600')}`}
          >"""
content = content.replace(old_select_click, new_select_click)

# Pass disabled prop to Morning
content = re.sub(
    r'<CustomSelect\s*value=\{selectedMorning\}\s*onChange=\{setSelectedMorning\}\s*options=\{morningWorkshops\}\s*placeholder="No morning workshop selected"\s*timeLabel="08:00 - 12:00"\s*priceData=\{priceData\}\s*/>',
    r'<CustomSelect \n                    value={selectedMorning} \n                    onChange={setSelectedMorning} \n                    options={morningWorkshops} \n                    placeholder="No morning workshop selected" \n                    timeLabel="08:00 - 12:00"\n                    priceData={priceData}\n                    disabled={hasMorning}\n                  />',
    content
)

# Pass disabled prop to Evening
content = re.sub(
    r'<CustomSelect\s*value=\{selectedEvening\}\s*onChange=\{setSelectedEvening\}\s*options=\{eveningWorkshops\}\s*placeholder="No afternoon workshop selected"\s*timeLabel="13:00 - 17:00"\s*priceData=\{priceData\}\s*/>',
    r'<CustomSelect \n                    value={selectedEvening} \n                    onChange={setSelectedEvening} \n                    options={eveningWorkshops} \n                    placeholder="No afternoon workshop selected" \n                    timeLabel="13:00 - 17:00"\n                    priceData={priceData}\n                    disabled={hasEvening}\n                  />',
    content
)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Updated CustomSelects disabled states!")
