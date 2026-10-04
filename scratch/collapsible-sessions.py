import codecs

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# Add ChevronDown to imports
content = content.replace(
    'import { Clock, CheckCircle2, Sun, Moon, Calendar, Users } from "lucide-react";',
    'import { Clock, CheckCircle2, Sun, Moon, Calendar, Users, ChevronDown } from "lucide-react";'
)

# Replace the two state declarations for section-level collapse
old_state = """  const [expandedMorning, setExpandedMorning] = useState<string[]>([]);
  const [expandedAfternoon, setExpandedAfternoon] = useState<string[]>([]);"""

new_state = """  const [expandedMorning, setExpandedMorning] = useState<string[]>([]);
  const [expandedAfternoon, setExpandedAfternoon] = useState<string[]>([]);
  const [morningOpen, setMorningOpen] = useState(false);
  const [afternoonOpen, setAfternoonOpen] = useState(false);"""

content = content.replace(old_state, new_state)

# Replace the Morning Section JSX
old_morning = """        {/* Morning Section */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-xl text-amber-600 dark:text-amber-400">
              <Sun className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Morning Sessions</h3>
              <p className="text-amber-600 dark:text-amber-500 font-bold text-sm">08:00 AM – 12:00 PM</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {morningWorkshops.map((w, idx) => (
              <WorkshopCard
                key={w.id}
                workshop={w}
                globalIndex={idx}
                isExpanded={expandedMorning.includes(w.id)}
                onToggle={() => toggleMorning(w.id)}
              />
            ))}
          </div>
        </div>"""

new_morning = """        {/* Morning Section */}
        <div className="mb-6">
          <button
            onClick={() => setMorningOpen(prev => !prev)}
            className="w-full flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/40 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/50 transition-all duration-300 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/60 rounded-xl text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-200">
                <Sun className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Morning Sessions</h3>
                <p className="text-amber-600 dark:text-amber-500 font-bold text-sm">08:00 AM – 12:00 PM &nbsp;·&nbsp; {morningWorkshops.length} workshops</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm transition-all duration-300`}>
              <span className="hidden sm:inline">{morningOpen ? 'Collapse' : 'Expand'}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${morningOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {morningOpen && (
              <motion.div
                key="morning-workshops"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 pt-4">
                  {morningWorkshops.map((w, idx) => (
                    <WorkshopCard
                      key={w.id}
                      workshop={w}
                      globalIndex={idx}
                      isExpanded={expandedMorning.includes(w.id)}
                      onToggle={() => toggleMorning(w.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>"""

content = content.replace(old_morning, new_morning)

# Replace the Afternoon Section JSX
old_afternoon = """        {/* Afternoon Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-950/60 border border-indigo-800/50 rounded-xl text-indigo-400">
              <Moon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Afternoon Sessions</h3>
              <p className="text-[#6FC4BC] dark:text-indigo-400 font-bold text-sm">01:00 PM – 05:00 PM</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {afternoonWorkshops.map((w, idx) => (
              <WorkshopCard
                key={w.id}
                workshop={w}
                globalIndex={idx + 5}
                isExpanded={expandedAfternoon.includes(w.id)}
                onToggle={() => toggleAfternoon(w.id)}
              />
            ))}
          </div>
        </div>"""

new_afternoon = """        {/* Afternoon Section */}
        <div className="mb-8">
          <button
            onClick={() => setAfternoonOpen(prev => !prev)}
            className="w-full flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#11517E]/10 to-[#6FC4BC]/10 dark:from-indigo-950/60 dark:to-slate-900/60 border border-[#11517E]/20 dark:border-indigo-800/40 hover:from-[#11517E]/20 hover:to-[#6FC4BC]/20 dark:hover:from-indigo-950/80 transition-all duration-300 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#11517E]/10 dark:bg-indigo-950/60 border border-[#11517E]/20 dark:border-indigo-800/50 rounded-xl text-[#11517E] dark:text-[#6FC4BC] group-hover:scale-110 transition-transform duration-200">
                <Moon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Afternoon Sessions</h3>
                <p className="text-[#6FC4BC] dark:text-[#6FC4BC] font-bold text-sm">01:00 PM – 05:00 PM &nbsp;·&nbsp; {afternoonWorkshops.length} workshops</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 text-[#11517E] dark:text-[#6FC4BC] font-bold text-sm transition-all duration-300`}>
              <span className="hidden sm:inline">{afternoonOpen ? 'Collapse' : 'Expand'}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${afternoonOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {afternoonOpen && (
              <motion.div
                key="afternoon-workshops"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 pt-4">
                  {afternoonWorkshops.map((w, idx) => (
                    <WorkshopCard
                      key={w.id}
                      workshop={w}
                      globalIndex={idx + 5}
                      isExpanded={expandedAfternoon.includes(w.id)}
                      onToggle={() => toggleAfternoon(w.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>"""

content = content.replace(old_afternoon, new_afternoon)

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Done!")
