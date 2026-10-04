import codecs

# We'll create a script to implement a CustomSelect component for the workshops and replace the native selects
code = """
  const CustomSelect = ({ value, onChange, options, placeholder, timeLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOpt = options.find(o => o.id === value);
    
    // Close dropdown on click outside
    useEffect(() => {
      const close = () => setIsOpen(false);
      if (isOpen) {
        document.addEventListener('click', close);
      }
      return () => document.removeEventListener('click', close);
    }, [isOpen]);

    return (
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center bg-white dark:bg-slate-900 shadow-sm ${isOpen ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
        >
          {selectedOpt ? (
            <div className="flex flex-col gap-1 pr-6">
              <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{selectedOpt.id}: {selectedOpt.title}</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <User className="w-3.5 h-3.5"/> {selectedOpt.speaker}
                {priceData?.workshop_price && (
                  <span className="text-blue-600 dark:text-blue-400 font-bold ml-2">(+{priceData.workshop_price} SAR)</span>
                )}
              </span>
            </div>
          ) : (
            <span className="text-slate-500 dark:text-slate-400 font-medium">{placeholder}</span>
          )}
          
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0"><path d="m6 9 6 6 6-6"/></svg>
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                <div 
                  onClick={() => { onChange(""); setIsOpen(false); }}
                  className={`p-3 rounded-xl cursor-pointer transition-colors ${!value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  <span className="font-semibold">{placeholder}</span>
                </div>
                
                {options.map(opt => (
                  <div 
                    key={opt.id}
                    onClick={() => { onChange(opt.id); setIsOpen(false); }}
                    className={`p-3 rounded-xl cursor-pointer transition-colors border-2 ${value === opt.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <span className={`font-bold text-sm ${value === opt.id ? 'text-blue-900 dark:text-blue-300' : 'text-slate-900 dark:text-slate-100'}`}>
                          <span className="text-blue-600 dark:text-blue-400 mr-1">{opt.id}</span>
                          {opt.title}
                        </span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <User className="w-3 h-3"/> {opt.speaker}
                        </span>
                      </div>
                      {priceData?.workshop_price && (
                        <div className="shrink-0 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-lg">
                          +{priceData.workshop_price} SAR
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
"""

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Add CustomSelect component definition before `export const RegistrationTab = () => {`
if 'const CustomSelect' not in content:
    content = content.replace('export const RegistrationTab = () => {', code + '\nexport const RegistrationTab = () => {')

# Replace native selects
old_morning = '''<select value={selectedMorning} onChange={e => setSelectedMorning(e.target.value)} className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-blue-500 outline-none appearance-none">
                  <option value="">No morning workshop</option>
                  {morningWorkshops.map(w => <option key={w.id} value={w.id}>{w.id}: {w.title} – {w.speaker} {priceData?.workshop_price ? `(+${priceData.workshop_price} SAR)` : ''}</option>)}
                </select>'''

new_morning = '''<CustomSelect 
                  value={selectedMorning} 
                  onChange={setSelectedMorning} 
                  options={morningWorkshops} 
                  placeholder="No morning workshop selected" 
                  timeLabel="08:00 – 12:00" 
                />'''

old_evening = '''<select value={selectedEvening} onChange={e => setSelectedEvening(e.target.value)} className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-blue-500 outline-none appearance-none">
                  <option value="">No afternoon workshop</option>
                  {eveningWorkshops.map(w => <option key={w.id} value={w.id}>{w.id}: {w.title} – {w.speaker} {priceData?.workshop_price ? `(+${priceData.workshop_price} SAR)` : ''}</option>)}
                </select>'''

new_evening = '''<CustomSelect 
                  value={selectedEvening} 
                  onChange={setSelectedEvening} 
                  options={eveningWorkshops} 
                  placeholder="No afternoon workshop selected" 
                  timeLabel="13:00 – 17:00" 
                />'''

content = content.replace(old_morning, new_morning)
content = content.replace(old_evening, new_evening)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Updated script executed successfully!")
