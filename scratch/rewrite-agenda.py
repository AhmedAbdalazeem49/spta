import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Make sure AnimatePresence and motion are imported (they probably are, but let's check)
if 'AnimatePresence' not in content:
    content = content.replace('import { motion } from "framer-motion";', 'import { motion, AnimatePresence } from "framer-motion";')

# Find the AgendaTab component declaration
component_start = content.find('export const AgendaTab = () => {')

# The original component body starts there. We will replace everything from component_start to the end.
new_component = '''export const AgendaTab = () => {
  const [activeDay, setActiveDay] = useState(1);
  const { language } = useLanguage();

  const currentDayData = AGENDA_DATA.find((d) => d.id === activeDay);

  // Keep track of expanded sessions
  const [expandedSessions, setExpandedSessions] = useState<string[]>(["d1-s1"]);

  // When changing days, auto-expand the first session with a title
  useEffect(() => {
    const firstTitled = AGENDA_DATA.find(d => d.id === activeDay)?.sessions.find(s => s.title);
    if (firstTitled) {
      setExpandedSessions([firstTitled.id]);
    } else {
      setExpandedSessions([]);
    }
  }, [activeDay]);

  const toggleSession = (id: string) => {
    setExpandedSessions(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleScrollToReviews = () => {
    const el = document.getElementById("reviews");
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="agenda-top" className="w-full pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 text-center md:text-start">
        <div>
          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
            {language === "ar"
              ? "الاجندة العلمية للمؤتمر"
              : "Conference Scientific Agenda"}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-1">
            November 12-14, 2026 | Sheikh Hussein bin Abdulrahman Al-Mousa Conference Hall
          </p>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        {AGENDA_DATA.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`relative overflow-hidden flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold flex-1 sm:flex-none ${
              activeDay === day.id
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105 border-blue-500"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <div
              className={`p-2 rounded-xl ${
                activeDay === day.id
                  ? "bg-white/20 text-white"
                  : "bg-blue-50 dark:bg-gray-700 text-blue-500 dark:text-blue-400"
              }`}
            >
              {day.icon}
            </div>
            <div className="text-left rtl:text-right min-w-0 overflow-hidden">
              <div className="text-xs font-semibold uppercase tracking-wide opacity-90 mb-0.5 whitespace-nowrap">
                {day.day}
              </div>
              <div className="text-sm opacity-80 mb-0.5 whitespace-nowrap">
                {day.date}
              </div>
              <div className="text-base whitespace-nowrap">{day.label}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Sessions Container */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {currentDayData?.sessions.map((session, sIdx) => {
          const hasTitle = !!session.title;
          const isExpanded = !hasTitle || expandedSessions.includes(session.id);

          return (
            <div
              key={session.id}
              className="border-b-2 border-slate-100 dark:border-slate-800 last:border-b-0"
            >
              {/* Session Header (if exists) */}
              {hasTitle && (
                <div
                  onClick={() => toggleSession(session.id)}
                  className={`relative p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all duration-300 group overflow-hidden ${
                    isExpanded 
                      ? "bg-blue-50/50 dark:bg-blue-900/10" 
                      : "bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-slate-800/80"
                  }`}
                >
                  {/* Decorative Active Indicator (Instead of arrows) */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                    isExpanded ? "bg-blue-600 dark:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]" : "bg-transparent group-hover:bg-blue-300 dark:group-hover:bg-blue-700"
                  }`} />
                  
                  <div className="pl-4">
                    <h4 className={`text-xl md:text-2xl font-black mb-2 leading-tight transition-colors duration-300 ${
                      isExpanded ? "text-blue-700 dark:text-blue-400" : "text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    }`}>
                      {session.title}
                    </h4>
                    {session.moderator && (
                      <p className="text-blue-600/80 dark:text-blue-400/80 font-bold flex items-center gap-2">
                        <User className="w-4 h-4" /> Moderator: {session.moderator}
                      </p>
                    )}
                  </div>
                  
                  {/* Visual state indicator (subtle glow / text change) */}
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                    isExpanded 
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700/50" 
                      : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 group-hover:border-blue-300 dark:group-hover:text-blue-500"
                  }`}>
                    {isExpanded ? "Active Section" : "Click to View Details"}
                  </div>
                </div>
              )}

              {/* Interactive Timeline Layout - Collapsible */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="relative p-6 md:p-10 space-y-8 md:space-y-10 bg-white dark:bg-slate-900">
                      {/* Vertical Line */}
                      <div className="absolute top-10 bottom-10 left-[2.25rem] md:left-[9.5rem] w-[2px] bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent z-0" />

                      {session.items.map((item, idx) => {
                        const cfg = TYPE_STYLES[item.type || 'ceremony'];
                        const isBreak =
                          item.type === "break" ||
                          item.type === "lunch" ||
                          item.type === "qna";
                        return (
                          <div
                            key={item.id}
                            className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 group"
                          >
                            {/* Time Column */}
                            <div className="md:w-28 shrink-0 flex items-start md:justify-end md:text-right pt-1 pl-12 md:pl-0">
                              <div className="font-black text-lg md:text-base text-slate-700 dark:text-slate-300">
                                {item.time}
                              </div>
                            </div>

                            {/* Timeline Node */}
                            <div className="absolute left-6 md:left-[9.5rem] top-2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 shadow-sm transition-transform group-hover:scale-125 group-hover:bg-blue-600 z-20" />

                            {/* Content Card */}
                            <div
                              className={`flex-1 rounded-2xl border transition-all duration-300 p-5 md:p-6 ${
                                isBreak
                                  ? "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 opacity-90"
                                  : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
                              }`}
                            >
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                {cfg && (
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}
                                  >
                                    {cfg.icon} {cfg.label}
                                  </span>
                                )}
                              </div>

                              <div
                                className={`text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 leading-relaxed ${
                                  isBreak ? "opacity-80" : ""
                                }`}
                              >
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
                                      <div className="w-full text-sm leading-relaxed">
                                        {item.speaker}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* End of Day Blocks */}
        {activeDay === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 md:p-12 text-center border-t border-blue-100 dark:border-blue-800/50">
            <h4 className="text-3xl font-black text-blue-900 dark:text-blue-100 mb-4">
              End of Day 1
            </h4>
            <button
              onClick={() => {
                setActiveDay(2);
                const el = document.getElementById("agenda-top");
                if (el) {
                  window.scrollTo({
                    top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                    behavior: "smooth",
                  });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
            >
              Continue to Day 2 Agenda <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {activeDay === 2 && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 md:p-12 text-center border-t border-indigo-100 dark:border-indigo-800/50">
            <h4 className="text-3xl font-black text-indigo-900 dark:text-indigo-100 mb-4">
              End of Conference
            </h4>
            <button
              onClick={handleScrollToReviews}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-600/30 hover:scale-105"
            >
              Evaluate the Conference <Star className="w-5 h-5 fill-current" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
'''

# We also need to add AnimatePresence and useEffect if they are missing
if 'useEffect' not in content:
    content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')

final_content = content[:component_start] + new_component

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'w', 'utf-8') as f:
    f.write(final_content)
