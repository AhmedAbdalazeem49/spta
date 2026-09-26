import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Clock, User, X, Sun, Moon, Coffee, Mic2, Users,
  BookOpen, Trophy, Star, Stethoscope, ChevronRight, Download, AlertCircle, MapPin
} from "lucide-react";

type SessionType = "ceremony" | "keynote" | "workshop" | "break" | "panel" | "closing";

// ... (omitting unchanged for a moment, let's just do a big replace on the component)

interface Session {
  id: number;
  day: number;
  time: string;
  endTime: string;
  type: SessionType;
  title: string;
  speaker?: string;
  role?: string;
  room?: string;
  desc: string;
  tags?: string[];
}

const TYPE_CONFIG: Record<SessionType, { color: string; bg: string; border: string; icon: React.ReactNode; label: string }> = {
  ceremony: { color: "text-purple-700 dark:text-purple-300", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-400", icon: <Trophy className="w-4 h-4" />, label: "Ceremony" },
  keynote:  { color: "text-blue-700 dark:text-blue-300",   bg: "bg-blue-50 dark:bg-blue-900/20",     border: "border-blue-500",   icon: <Mic2 className="w-4 h-4" />,  label: "Keynote" },
  workshop: { color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-500", icon: <Stethoscope className="w-4 h-4" />, label: "Workshop" },
  break:    { color: "text-amber-700 dark:text-amber-300",  bg: "bg-amber-50 dark:bg-amber-900/20",   border: "border-amber-400",  icon: <Coffee className="w-4 h-4" />, label: "Break" },
  panel:    { color: "text-rose-700 dark:text-rose-300",    bg: "bg-rose-50 dark:bg-rose-900/20",     border: "border-rose-500",   icon: <Users className="w-4 h-4" />, label: "Panel" },
  closing:  { color: "text-indigo-700 dark:text-indigo-300", bg: "bg-indigo-50 dark:bg-indigo-900/20", border: "border-indigo-500", icon: <Star className="w-4 h-4" />, label: "Closing" },
};

const DAYS = [
  { label: "Day 1", date: "Nov 12, 2026", subtitle: "Conference Day 1", icon: <Mic2 className="w-5 h-5" /> },
  { label: "Day 2", date: "Nov 13, 2026", subtitle: "Conference Day 2", icon: <Trophy className="w-5 h-5" /> },
];

const SCHEDULE: Session[] = [
  // DAY 1
  { id: 1, day: 1, time: "07:30", endTime: "08:00", type: "break", title: "Registration", desc: "Participant check-in and badge collection." },
  { id: 2, day: 1, time: "08:00", endTime: "08:10", type: "ceremony", title: "Opening remarks", desc: "Welcome and opening remarks." },
  
  // Session 1
  { id: 3, day: 1, time: "08:10", endTime: "08:40", type: "keynote", title: "Physiotherapy’s Role in Saudi Health System Transformation", speaker: "Dr. Faisal Aldahmashi OR Dr. Ahmad Nashry", role: "Session 1: Strategic Leadership & Health System Integration", room: "Moderator: Dr. Ahmad Alghamdi", desc: "" },
  { id: 4, day: 1, time: "08:40", endTime: "09:45", type: "panel", title: "Focused symposium: Direct Access Implementation", speaker: "Dr. Asma Alrushud, Dr. Hani Alabbad, Dr. Hosam Alzahrani", desc: "Opening & Framing, Evidence Presentation, Saudi Experience Case Study, Implementation Framework." },
  { id: 5, day: 1, time: "09:45", endTime: "10:00", type: "panel", title: "Q&A", desc: "" },
  
  { id: 6, day: 1, time: "10:00", endTime: "10:15", type: "break", title: "Break", desc: "" },
  { id: 7, day: 1, time: "10:15", endTime: "11:00", type: "ceremony", title: "Opening ceremony", desc: "Official conference opening ceremony." },
  
  { id: 8, day: 1, time: "11:00", endTime: "11:40", type: "panel", title: "Panel (1): Rehabilitation Governance & National Standards: Building a Unified Physiotherapy Framework", speaker: "Dr. Hanan Alsaif, Mr. Talal Alghamdi, Dr. Noora Alshoweir", room: "Moderator: Dr. Mishal Aldaihan", desc: "" },
  { id: 9, day: 1, time: "11:40", endTime: "11:50", type: "panel", title: "Q&A", desc: "" },
  { id: 10, day: 1, time: "11:50", endTime: "13:00", type: "break", title: "Lunch", desc: "" },

  // Session 2
  { id: 11, day: 1, time: "13:00", endTime: "13:30", type: "keynote", title: "Redefining Chronic Pain Care: Integrating Biopsychosocial & Value-Based Physiotherapy Models", speaker: "Prof. Lorimer Moseley", role: "Session 2: Advanced Musculoskeletal & Sports Rehabilitation", room: "Moderator: Dr. Abdulaziz Alomereni", desc: "" },
  { id: 12, day: 1, time: "13:30", endTime: "13:50", type: "keynote", title: "Evidence-Based Return-to-Sport Decision-Making in Modern Rehabilitation", speaker: "Prof. Qassim Muaidi", desc: "Invited Lecture" },
  { id: 13, day: 1, time: "13:50", endTime: "14:10", type: "keynote", title: "Speaking Up in Elite Sport - Barriers and Enablers Faced by Physiotherapists", speaker: "Dr. Sian Knott", desc: "Invited Lecture" },
  { id: 14, day: 1, time: "14:10", endTime: "14:30", type: "keynote", title: "Integrating Evidence, Experience & Patient Context: Advanced Decision Making in Musculoskeletal Physiotherapy", speaker: "Prof. Ali Alshami", desc: "Invited Lecture" },
  { id: 15, day: 1, time: "14:30", endTime: "14:40", type: "workshop", title: "Platform (1): Effects of Nigella sativa Supplementation with Combined Exercise...", speaker: "Dr. Hiedar Alyami", desc: "Platform presentation" },
  { id: 16, day: 1, time: "14:40", endTime: "14:50", type: "workshop", title: "Platform (2): The Impact of Autonomic Nervous System Modulation...", speaker: "Dr. Hani Alkhawajah", desc: "Platform presentation" },
  { id: 17, day: 1, time: "14:50", endTime: "15:00", type: "workshop", title: "Platform (3): Comparative Effectiveness of Cognitive Functional Therapy...", speaker: "Mr. Abdullah Alessa", desc: "Platform presentation" },
  { id: 18, day: 1, time: "15:00", endTime: "15:10", type: "panel", title: "Q&A", desc: "" },
  
  { id: 19, day: 1, time: "15:10", endTime: "15:40", type: "break", title: "Break / Exhibition", desc: "" },

  // Session 3
  { id: 20, day: 1, time: "15:40", endTime: "16:00", type: "keynote", title: "Redefining Cardiopulmonary & ICU Rehabilitation in Modern Healthcare", speaker: "Prof. Ali Albarrari", role: "Session 3: Advanced Rehabilitation Across Specialties", room: "Moderator: Dr. Batool Alhassan", desc: "Invited Lecture" },
  { id: 21, day: 1, time: "16:00", endTime: "16:20", type: "keynote", title: "Reversing Frailty: Strategic Physiotherapy Interventions for Healthy Aging in Saudi Arabia", speaker: "Dr. Maha Almarwani", desc: "Invited Lecture" },
  { id: 22, day: 1, time: "16:20", endTime: "16:40", type: "keynote", title: "Pelvic Health & Beyond: Evidence-Based Physiotherapy for Women", speaker: "Prof. Heba Embabi", desc: "Invited Lecture" },
  { id: 23, day: 1, time: "16:40", endTime: "16:50", type: "workshop", title: "Platform (4): Effects of High-Intensity Interval Training...", speaker: "Mr. Mahdi Al Ghannam", desc: "Platform presentation" },
  { id: 24, day: 1, time: "16:50", endTime: "17:00", type: "workshop", title: "Platform (5): Effect of Pulsed High-Intensity Laser Therapy...", speaker: "Ms. Saeeda Alhashmi Alamir", desc: "Platform presentation" },
  { id: 25, day: 1, time: "17:00", endTime: "17:10", type: "workshop", title: "Platform (6): The Effect of Vitamin D Supplementation...", speaker: "Mr. Naif Bin-Talha", desc: "Platform presentation" },
  { id: 26, day: 1, time: "17:10", endTime: "17:20", type: "panel", title: "Q&A", desc: "" },
  { id: 27, day: 1, time: "17:20", endTime: "17:50", type: "panel", title: "Panel (2): Integrated & Interdisciplinary Models of Care", speaker: "Dr. Walid Ouanes, Dr. Tahany Alhamad, Dr. Mohammed Alhaizan, Dr. Faisal Al Mubarak, Ms. Lamia AlFaleh", room: "Moderator: Dr. Sara Almansouri", desc: "" },
  { id: 28, day: 1, time: "17:50", endTime: "18:00", type: "panel", title: "Q&A", desc: "End of Day 1" },

  // DAY 2
  // Session 4
  { id: 29, day: 2, time: "13:30", endTime: "14:00", type: "keynote", title: "Neuroplasticity in Action: Translating Brain Science into High-Impact Stroke Rehabilitation", speaker: "Dr. Turki Abualait", role: "Session 4: Neurological Rehabilitation Across the Lifespan", room: "Moderator: Dr. Sattam Almutairi", desc: "" },
  { id: 30, day: 2, time: "14:00", endTime: "14:20", type: "keynote", title: "Optimizing Neurodevelopment: Advancing Pediatric Neurorehabilitation Through Early, Intensive & Family-Centered Care", speaker: "Dr. Veronika Vasilcova", desc: "Invited Lecture" },
  { id: 31, day: 2, time: "14:20", endTime: "14:40", type: "keynote", title: "Rehabilitation Strategies for Neurodegenerative Disorders", speaker: "Dr. Miriam Rafferty", desc: "Virtual Lecture" },
  { id: 32, day: 2, time: "14:40", endTime: "14:50", type: "workshop", title: "Platform (7): The effects of trunk rehabilitation...", speaker: "Ms. Shatha Mukhtar", desc: "Platform presentation" },
  { id: 33, day: 2, time: "14:50", endTime: "15:00", type: "workshop", title: "Platform (8): Using Transcranial Direct Current Stimulation...", speaker: "Dr. Mohammed Alshehri", desc: "Platform presentation" },
  { id: 34, day: 2, time: "15:00", endTime: "15:10", type: "workshop", title: "Platform (9): Effects of Thoracic Spinal Manipulation...", speaker: "Dr. Murdi Alanazi", desc: "Platform presentation" },
  { id: 35, day: 2, time: "15:10", endTime: "15:20", type: "panel", title: "Q&A", desc: "" },
  { id: 36, day: 2, time: "15:20", endTime: "15:50", type: "break", title: "Break / Exhibition", desc: "" },

  // Session 5
  { id: 37, day: 2, time: "15:50", endTime: "16:20", type: "keynote", title: "AI-Assisted Assessment and Treatment in Physiotherapy Practice", speaker: "Dr. Mashael Alsobhi", role: "Session 5: Digital Rehabilitation and Workforce Development", room: "Moderator: Dr. Hani Alkhawajah", desc: "" },
  { id: 38, day: 2, time: "16:20", endTime: "16:40", type: "keynote", title: "Residency, Specialization, & Competency Frameworks", speaker: "Dr. Terrence McGee", desc: "Invited Lecture" },
  { id: 39, day: 2, time: "16:40", endTime: "17:00", type: "keynote", title: "Challenges with Telehealth and How To Overcome Them", speaker: "Prof. Rana Hinman", desc: "Virtual Lecture" },
  { id: 40, day: 2, time: "17:00", endTime: "17:10", type: "workshop", title: "Platform (10): Integrating AI and IoT-Enabled Assistive Technologies...", speaker: "Dr. Fayez Namnaqani", desc: "Platform presentation" },
  { id: 41, day: 2, time: "17:10", endTime: "17:20", type: "workshop", title: "Platform (11): Bridging the Cognitive Gap...", speaker: "Ms. Noor Alzahri", desc: "Platform presentation" },
  { id: 42, day: 2, time: "17:20", endTime: "17:30", type: "workshop", title: "Platform (12): A Virtual Reality Physiotherapy Toolkit...", speaker: "Dr. Alhanouf Almutairi", desc: "Platform presentation" },
  { id: 43, day: 2, time: "17:30", endTime: "17:40", type: "panel", title: "Q&A", desc: "" },
  { id: 44, day: 2, time: "17:40", endTime: "18:10", type: "panel", title: "Panel (3): The Future of Physiotherapy in Saudi Arabia: 2030 Vision Roadmap", speaker: "Dr. Abdulfattah Alqahtani, Dr. Terrence McGee, Ms. Manar Almkirsh, Dr. Ahamd Barhameen", room: "Moderator: Dr. Asma Alderaa", desc: "" },
  { id: 45, day: 2, time: "18:10", endTime: "18:20", type: "panel", title: "Q&A", desc: "" },
  { id: 46, day: 2, time: "18:20", endTime: "19:00", type: "closing", title: "Closing Remarks & Awards Ceremony", desc: "End of Day 2" }
];

export const AgendaTab = () => {
  const { language } = useLanguage();
  const [activeDay, setActiveDay] = useState(1);
  const [selected, setSelected] = useState<Session | null>(null);

  // For real usage, you'd calculate current time. We'll mock it for demo if needed, 
  // or just use new Date(). Let's use new Date() and compare with the days.
  // Conference dates: Nov 11, Nov 12, Nov 13 (2026).
  const now = new Date();
  
  // Find next event (just a basic logic, assuming dates are 2026-11-11 to 2026-11-13)
  const getEventDateTime = (day: number, timeStr: string) => {
    const dates = ["2026-11-11", "2026-11-12", "2026-11-13"];
    return new Date(`${dates[day - 1]}T${timeStr}:00`);
  };

  let nextEvent = null;
  let nextEventDay = 1;
  for (const s of SCHEDULE) {
    const start = getEventDateTime(s.day, s.time);
    const end = getEventDateTime(s.day, s.endTime);
    if (now < start) {
      if (!nextEvent) {
        nextEvent = s;
        nextEventDay = s.day;
      }
    }
  }

  const daySchedule = SCHEDULE.filter(s => s.day === activeDay);

  const handleDownload = () => {
    // Mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Agenda_SPTA_2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 text-center md:text-start">
        <div>
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {language === 'ar' ? 'جدول المؤتمر' : 'Conference Agenda'}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">November 11–13, 2026 · Almoosa Health Group</p>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 rounded-full font-bold transition-all shadow-sm"
        >
          <Download className="w-5 h-5" />
          {language === 'ar' ? 'تحميل الأجندة' : 'Download Agenda'}
        </button>
      </div>

      {/* Next Event Banner */}
      {nextEvent && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 mb-10 text-white shadow-xl shadow-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <p className="text-blue-100 font-semibold text-sm mb-1 uppercase tracking-wider">
                {language === 'ar' ? 'الحدث التالي' : 'Next Event'}
              </p>
              <h4 className="text-xl font-bold">{nextEvent.title}</h4>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 inline-block font-mono text-lg font-bold">
              {nextEvent.time}
            </div>
            <p className="text-sm text-blue-200 mt-2 font-medium">Day {nextEvent.day}</p>
          </div>
        </motion.div>
      )}

      {/* Day Selector */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-10">
        {DAYS.map((day, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveDay(i + 1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
              activeDay === i + 1
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-xl shadow-blue-500/30"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300"
            }`}
          >
            <span className={activeDay === i + 1 ? "text-white" : "text-blue-500"}>{day.icon}</span>
            <div className="text-left min-w-0 overflow-hidden">
              <div>{day.label}</div>
              <div className={`text-xs font-normal mt-0.5 ${activeDay === i + 1 ? "text-blue-100" : "text-gray-400"}`}>{day.date} · {day.subtitle}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
          <span key={type} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
            {cfg.icon} {cfg.label}
          </span>
        ))}
      </div>

      {/* Schedule */}
      <div className="relative">
        {/* Connecting Vertical Line */}
        <div className="absolute left-[39px] sm:left-[47px] md:left-[63px] top-4 bottom-4 w-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0 hidden sm:block" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4 w-full relative z-10"
          >
            {daySchedule.map((item, index) => {
              const cfg = TYPE_CONFIG[item.type];
              const isBreak = item.type === "break";
              const isPast = now > getEventDateTime(item.day, item.endTime);
              const isCurrent = now >= getEventDateTime(item.day, item.time) && now <= getEventDateTime(item.day, item.endTime);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => !isBreak && setSelected(item)}
                  className={`w-full flex gap-4 md:gap-6 items-stretch rounded-2xl border-2 overflow-hidden transition-all duration-300 relative ${
                    isPast ? 'opacity-50 grayscale-[50%]' : ''
                  } ${
                    isCurrent ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 
                    isBreak
                      ? `${cfg.bg} ${cfg.border} opacity-70`
                      : `bg-white dark:bg-gray-800/80 border-gray-100 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer hover:shadow-lg hover:shadow-blue-500/5 group`
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 flex items-center gap-1 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Live Now
                    </div>
                  )}

                  {/* Time Column with visual node */}
                  <div className={`relative shrink-0 w-20 sm:w-24 md:w-32 flex flex-col items-center justify-center py-4 px-3 ${cfg.bg} border-r-2 ${cfg.border} z-10`}>
                    <span className={`text-sm font-black tabular-nums ${cfg.color}`}>{item.time}</span>
                    <div className={`w-4 h-4 rounded-full my-2 border-[3px] shadow-sm z-10 ${isCurrent ? 'bg-blue-600 border-white' : `${cfg.border} ${cfg.bg}`}`} />
                    <span className={`text-xs font-medium opacity-60 ${cfg.color}`}>{item.endTime}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-4 pr-4 flex flex-col justify-center min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                      {item.room && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {item.room}
                        </span>
                      )}
                      {item.tags?.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <h4 className={`text-base md:text-lg font-extrabold text-gray-900 dark:text-white mb-1 leading-snug ${!isBreak ? "group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" : ""}`}>
                      {item.title}
                    </h4>

                    {item.speaker && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                        <User className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.speaker}</span>
                        {item.role && <span className="text-gray-400 dark:text-gray-500 hidden sm:inline">· {item.role}</span>}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  {!isBreak && (
                    <div className="shrink-0 flex items-center pr-4">
                      <ChevronRight className={`w-5 h-5 transition-colors ${isCurrent ? 'text-blue-500' : 'text-gray-300 dark:text-gray-600 group-hover:text-blue-500'}`} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl mx-2 sm:mx-4 p-8 shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Decorative bg blob */}
              <div className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-20 ${TYPE_CONFIG[selected.type].bg}`} />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              <div className="relative z-10">
                {/* Type Badge */}
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border mb-5 ${TYPE_CONFIG[selected.type].bg} ${TYPE_CONFIG[selected.type].color} ${TYPE_CONFIG[selected.type].border}`}>
                  {TYPE_CONFIG[selected.type].icon} {TYPE_CONFIG[selected.type].label}
                </span>

                {/* Time */}
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-gray-700 dark:text-gray-200 text-lg">{selected.time} – {selected.endTime}</span>
                  {selected.room && (
                    <span className="ml-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300">{selected.room}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 leading-snug">
                  {selected.title}
                </h3>

                {/* Tags */}
                {selected.tags && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {selected.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold">#{tag}</span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
                  {selected.desc}
                </p>

                {/* Speaker */}
                {selected.speaker && (
                  <div className={`p-5 rounded-2xl border-2 flex items-center gap-4 ${TYPE_CONFIG[selected.type].bg} ${TYPE_CONFIG[selected.type].border}`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl text-white shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600`}>
                      {selected.speaker.split(' ').slice(-1)[0][0]}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">{selected.speaker}</h4>
                      {selected.role && <p className={`text-sm font-medium mt-0.5 ${TYPE_CONFIG[selected.type].color}`}>{selected.role}</p>}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
