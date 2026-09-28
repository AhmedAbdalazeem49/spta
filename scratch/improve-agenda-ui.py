import codecs

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Replace the Session Items Table Layout with a better timeline design
old_layout = '''            {/* Session Items Table Layout */}
            <div className="flex flex-col">
              {session.items.map((item, idx) => {
                const cfg = TYPE_STYLES[item.type];
                const isBreak = item.type === "break" || item.type === "lunch" || item.type === "qna";
                return (
                  <div 
                    key={item.id} 
                    className={`flex flex-col md:flex-row border-t border-slate-100 dark:border-slate-800/50 first:border-t-0 transition-colors ${isBreak ? "bg-slate-50/50 dark:bg-slate-800/20" : "hover:bg-blue-50/30 dark:hover:bg-slate-800/40"} ${idx % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/30 dark:bg-slate-800/10"}`}
                  >
                    {/* Time & Type Column */}
                    <div className="md:w-64 shrink-0 p-5 md:p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 flex flex-col md:items-start justify-center gap-3">
                      <div className="flex items-center gap-2 font-black text-lg text-slate-700 dark:text-slate-300">
                        <Clock className="w-5 h-5 text-blue-500" />
                        {item.time}
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </div>

                    {/* Details Column */}
                    <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                      <div className={`text-base md:text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug ${isBreak ? "opacity-80" : ""}`}>
                        {item.title}
                      </div>
                      {item.speaker && item.speaker !== "—" && (
                        <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          {typeof item.speaker === "string" ? (
                            <>
                              <User className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                              <span>{item.speaker}</span>
                            </>
                          ) : (
                            <div className="w-full">{item.speaker}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>'''

new_layout = '''            {/* Interactive Timeline Layout */}
            <div className="relative p-6 md:p-10 space-y-8 md:space-y-10 bg-white dark:bg-slate-900">
              {/* Vertical Line */}
              <div className="absolute top-10 bottom-10 left-[2.25rem] md:left-[9.5rem] w-[2px] bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent z-0" />
              
              {session.items.map((item, idx) => {
                const cfg = TYPE_STYLES[item.type];
                const isBreak = item.type === "break" || item.type === "lunch" || item.type === "qna";
                return (
                  <div key={item.id} className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 group">
                    {/* Time Column */}
                    <div className="md:w-28 shrink-0 flex items-start md:justify-end md:text-right pt-1 pl-12 md:pl-0">
                      <div className="font-black text-lg md:text-base text-slate-700 dark:text-slate-300">
                        {item.time}
                      </div>
                    </div>
                    
                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-[9.5rem] top-2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 shadow-sm transition-transform group-hover:scale-125 group-hover:bg-blue-600 z-20" />
                    
                    {/* Content Card */}
                    <div className={`flex-1 rounded-2xl border transition-all duration-300 p-5 md:p-6 ${
                      isBreak 
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 opacity-90' 
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1'
                    }`}>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                      </div>
                      
                      <div className={`text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 leading-relaxed ${isBreak ? 'opacity-80' : ''}`}>
                        {item.title}
                      </div>
                      
                      {item.speaker && item.speaker !== "—" && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                          <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-start gap-2">
                            {typeof item.speaker === "string" ? (
                              <>
                                <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-500 shrink-0">
                                  <User className="w-4 h-4" />
                                </div>
                                <span className="pt-1">{item.speaker}</span>
                              </>
                            ) : (
                              <div className="w-full text-sm leading-relaxed">{item.speaker}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>'''

content = content.replace(old_layout, new_layout)

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
