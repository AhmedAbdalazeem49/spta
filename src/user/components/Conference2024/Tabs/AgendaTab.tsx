import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Coffee,
  Mic2,
  PlayCircle,
  ShieldCheck,
  Star,
  Trophy,
  User,
  Users,
} from "lucide-react";
import React, { useState } from "react";

type ItemType =
  | "ceremony"
  | "keynote"
  | "break"
  | "panel"
  | "invited"
  | "platform"
  | "qna"
  | "lunch"
  | "Focused Symposium"
  | "registration"
  | "closing";

interface AgendaItem {
  id: string;
  time: string;
  type?: ItemType;
  title: string | React.ReactNode;
  speaker?: string | React.ReactNode;
}

interface AgendaSession {
  id: string;
  title?: string;
  moderator?: string;
  items: AgendaItem[];
}

interface AgendaDay {
  id: number;
  label: string;
  date: string;
  day: string;
  subtitle: string;
  icon: React.ReactNode;
  sessions: AgendaSession[];
}

const TYPE_STYLES: Record<
  ItemType,
  {
    color: string;
    bg: string;
    border: string;
    icon: React.ReactNode;
    label: string;
  }
> = {
  registration: {
    color: "text-slate-600 dark:text-slate-300",
    bg: "bg-slate-50 dark:bg-slate-800/30",
    border: "border-slate-300 dark:border-slate-700",
    icon: <ShieldCheck className="w-4 h-4" />,
    label: "Registration",
  },
  ceremony: {
    color: "text-purple-700 dark:text-purple-300",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-400 dark:border-purple-600",
    icon: <Trophy className="w-4 h-4" />,
    label: "Ceremony",
  },
  keynote: {
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-500 dark:border-blue-600",
    icon: <Mic2 className="w-4 h-4" />,
    label: "Keynote",
  },
  "Focused Symposium": {
    color: "text-indigo-700 dark:text-indigo-300",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-500 dark:border-indigo-600",
    icon: <BookOpen className="w-4 h-4" />,
    label: "Focused Symposium",
  },
  break: {
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-400 dark:border-amber-600",
    icon: <Coffee className="w-4 h-4" />,
    label: "Break",
  },
  panel: {
    color: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-500 dark:border-rose-600",
    icon: <Users className="w-4 h-4" />,
    label: "Panel",
  },
  invited: {
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-500 dark:border-emerald-600",
    icon: <Star className="w-4 h-4" />,
    label: "Invited",
  },
  platform: {
    color: "text-teal-700 dark:text-teal-300",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    border: "border-teal-500 dark:border-teal-600",
    icon: <PlayCircle className="w-4 h-4" />,
    label: "Platform",
  },
  qna: {
    color: "text-orange-700 dark:text-orange-300",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-400 dark:border-orange-600",
    icon: <Users className="w-4 h-4" />,
    label: "Q&A",
  },
  closing: {
    color: "text-slate-700 dark:text-slate-200",
    bg: "bg-slate-100 dark:bg-slate-800/50",
    border: "border-slate-500 dark:border-slate-600",
    icon: <Star className="w-4 h-4" />,
    label: "Closing",
  },
};

const AGENDA_DATA: AgendaDay[] = [
  {
    id: 1,
    label: "Day 1",
    date: "Nov 12, 2026",
    day: "Thursday",
    subtitle: "Conference Day 1",
    icon: <Mic2 className="w-5 h-5" />,
    sessions: [
      {
        id: "d1-s0",
        items: [
          {
            id: "1",
            time: "7:30–8:00",
            type: "registration",
            title: "Registration",
            speaker: "—",
          },
          {
            id: "2",
            time: "8:00–8:10",
            title: "Opening remarks",
            speaker: "—",
          },
        ],
      },
      {
        id: "d1-s1",
        title: "Session 1: Strategic Leadership & Health System Integration",
        moderator: "Dr. Ahmad Alghamdi",
        items: [
          {
            id: "3",
            time: "8:10–8:40",
            type: "keynote",
            title: "Physiotherapy's Role in Saudi Health System Transformation",
            speaker: "Dr. Faisal Aldahmashi OR Dr. Ahmad Nashry",
          },
          {
            id: "4",
            time: "8:40–9:45",
            type: "Focused Symposium",
            title: (
              <>
                <div className="font-bold mb-2">
                  Direct Access Implementation: Evidence & Saudi Experience
                </div>
                <ul className="text-sm font-normal space-y-1 text-slate-600 dark:text-slate-400">
                  <li>▪ Opening & Framing (5 min)</li>
                  <li>▪ Evidence Presentation (20 min)</li>
                  <li>▪ Saudi Experience Case Study (20 min)</li>
                  <li>
                    ▪ Implementation Framework – Practical roadmap (20 min)
                  </li>
                </ul>
              </>
            ),
            speaker: (
              <div className="flex flex-col gap-1">
                <span>Dr. Asma Alrushud</span>
                <span>Dr. Hani Alabbad</span>
                <span>Dr. Hosam Alzahrani</span>
                <span>Dr. Hani Alabbad</span>
              </div>
            ),
          },
          {
            id: "5",
            time: "9:45–10:00",
            type: "qna",
            title: "Q&A",
            speaker: "—",
          },
          {
            id: "6",
            time: "10:00–10:15",
            type: "break",
            title: "Break",
            speaker: "—",
          },
          {
            id: "7",
            time: "10:15–11:00",
            type: "ceremony",
            title: "Opening ceremony",
            speaker: "—",
          },
          {
            id: "8",
            time: "11:00–11:40",
            type: "panel",
            title:
              "Rehabilitation Governance & National Standards: Building a Unified Physiotherapy Framework",
            speaker: (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Moderator: Dr. Mishal Aldaihan
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Panelists:
                </span>
                <ol className="text-sm space-y-1 list-decimal list-inside text-slate-600 dark:text-slate-400">
                  <li>Dr. Faisal Aldahmashi OR Ms. Manar Almkirsh</li>
                  <li>Dr. Hanan Alsaif</li>
                  <li>Mr. Talal Alghamdi</li>
                  <li>Dr. Noora Alshoweir</li>
                </ol>
              </div>
            ),
          },
          {
            id: "9",
            time: "11:40–11:50",
            type: "qna",
            title: "Q&A",
            speaker: "—",
          },
          {
            id: "10",
            time: "11:50–13:00",
            type: "break",
            title: "Lunch",
            speaker: "—",
          },
        ],
      },
      {
        id: "d1-s2",
        title: "Session 2: Advanced Musculoskeletal & Sports Rehabilitation",
        moderator: "Dr. Abdulaziz Alomereni",
        items: [
          {
            id: "11",
            time: "13:00–13:30",
            type: "keynote",
            title:
              "Redefining Chronic Pain Care: Integrating Biopsychosocial & Value-Based Physiotherapy Models",
            speaker: "Prof. Lorimer Moseley",
          },
          {
            id: "12",
            time: "13:30–13:50",
            type: "invited",
            title:
              "Evidence-Based Return-to-Sport Decision-Making in Modern Rehabilitation",
            speaker: "Prof. Qassim Muaidi",
          },
          {
            id: "13",
            time: "13:50–14:10",
            type: "invited",
            title:
              "Speaking Up in Elite Sport - Barriers and Enablers Faced by Physiotherapists",
            speaker: "Dr. Sian Knott",
          },
          {
            id: "14",
            time: "14:10–14:30",
            type: "invited",
            title:
              "Integrating Evidence, Experience & Patient Context: Advanced Decision-Making in Musculoskeletal Physiotherapy",
            speaker: "Prof. Ali Alshami",
          },
          {
            id: "15",
            time: "14:30–14:40",
            type: "platform",
            title:
              "Effects of Nigella sativa Supplementation with Combined Exercise on Musculoskeletal Performance and Blood Fructosamine Levels in Male Adults with Type 2 Diabetes Mellitus: A Randomized Controlled Trial",
            speaker: "Dr. Hiedar Alyami",
          },
          {
            id: "16",
            time: "14:40–14:50",
            type: "platform",
            title:
              "The Impact of Autonomic Nervous System Modulation on Heart Rate Variability and Musculoskeletal Manifestations in Chronic Neck Pain: A Double-Blind Randomized Clinical Trial",
            speaker: "Dr. Hani Alkhawajah",
          },
          {
            id: "17",
            time: "14:50–15:00",
            type: "platform",
            title:
              "Comparative Effectiveness of Cognitive Functional Therapy, Exercise, and Multimodal Rehabilitation for Chronic Low Back Pain: A Systematic Review and Network Meta-Analysis of Randomized Controlled Trials",
            speaker: "Mr. Abdullah Alessa",
          },
          {
            id: "18",
            time: "15:00–15:10",
            type: "qna",
            title: "Q&A",
            speaker: "—",
          },
          {
            id: "19",
            time: "15:10–15:40",
            type: "break",
            title: "Break / Exhibition",
            speaker: "—",
          },
        ],
      },
      {
        id: "d1-s3",
        title: "Session 3: Advanced Rehabilitation Across Specialties",
        moderator: "Dr. Batool Alhassan",
        items: [
          {
            id: "20",
            time: "15:40–16:00",
            type: "invited",
            title:
              "Redefining Cardiopulmonary & ICU Rehabilitation in Modern Healthcare",
            speaker: "Prof. Ali Albarrari",
          },
          {
            id: "21",
            time: "16:00–16:20",
            type: "invited",
            title:
              "Reversing Frailty: Strategic Physiotherapy Interventions for Healthy Aging in Saudi Arabia",
            speaker: "Dr. Maha Almarwani",
          },
          {
            id: "22",
            time: "16:20–16:40",
            type: "invited",
            title:
              "Pelvic Health & Beyond: Evidence-Based Physiotherapy for Women",
            speaker: "Prof. Heba Embabi",
          },
          {
            id: "23",
            time: "16:40–16:50",
            type: "platform",
            title:
              "Effects of High-Intensity Interval Training on Body Composition, Blood Pressure, and Cardiorespiratory Fitness in Obese Hypertensive Men: A Randomized Controlled Trial",
            speaker: "Mr. Mahdi Al Ghannam",
          },
          {
            id: "24",
            time: "16:50–17:00",
            type: "platform",
            title:
              "Effect of Pulsed High-Intensity Laser Therapy Combined with Exercise Protocol in Treatment of Primary Dysmenorrhea: A Randomized Controlled Trial",
            speaker: "Ms. Saeeda Alhashmi Alamir",
          },
          {
            id: "25",
            time: "17:00–17:10",
            type: "platform",
            title:
              "The Effect of Vitamin D Supplementation on Pediatric Skeletal Muscle Strength",
            speaker: "Mr. Naif Bin-Talha",
          },
          {
            id: "26",
            time: "17:10–17:20",
            type: "qna",
            title: "Q&A",
            speaker: "—",
          },
          {
            id: "27",
            time: "17:20–17:50",
            type: "panel",
            title: "Integrated & Interdisciplinary Models of Care",
            speaker: (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Moderator: Dr. Sara Almansouri
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Panelists:
                </span>
                <ul className="text-sm space-y-1 list-none text-slate-600 dark:text-slate-400">
                  <li>1. Dr. Walid Ouanes</li>
                  <li>2. Dr. Tahany Alhamad</li>
                  <li>3. Dr. Mohammed Alhaizan</li>
                  <li>4. Dr. Faisal Al Mubarak</li>
                  <li>5. Ms. Lamia AlFaleh</li>
                </ul>
              </div>
            ),
          },
          {
            id: "28",
            time: "17:50–18:00",
            type: "qna",
            title: "Q&A",
            speaker: "—",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Day 2",
    date: "Nov 13, 2026",
    day: "Friday",
    subtitle: "Conference Day 2",
    icon: <Trophy className="w-5 h-5" />,
    sessions: [
      {
        id: "d2-s4",
        title: "Session 4: Neurological Rehabilitation Across the Lifespan",
        moderator: "Dr. Sattam Almutairi",
        items: [
          {
            id: "29",
            time: "13:30–14:00",
            type: "keynote",
            title:
              "Neuroplasticity in Action: Translating Brain Science into High-Impact Stroke Rehabilitation",
            speaker: "Dr. Turki Abualait",
          },
          {
            id: "30",
            time: "14:00–14:20",
            type: "invited",
            title:
              "Optimizing Neurodevelopment: Advancing Pediatric Neurorehabilitation Through Early, Intensive & Family-Centered Care",
            speaker: "Dr. Veronika Vasilcova",
          },
          {
            id: "31",
            time: "14:20–14:40",
            type: "invited",
            title:
              "Rehabilitation Strategies for Neurodegenerative Disorders: Care paths to Improve Mobility, Function, and Quality of Life Across the Continuum of Care (Virtual Lecture)",
            speaker: "Dr. Miriam Rafferty",
          },
          {
            id: "32",
            time: "14:40–14:50",
            type: "platform",
            title:
              "The effects of trunk rehabilitation on balance, gait, falls, and community mobility in patients with multiple sclerosis",
            speaker: "Ms. Shatha Mukhtar",
          },
          {
            id: "33",
            time: "14:50–15:00",
            type: "platform",
            title:
              "Using Transcranial Direct Current Stimulation to Improve Multiple Domains in Health-Related Quality of Life among Subacute Stroke Survivors",
            speaker: "Dr. Mohammed Alshehri",
          },
          {
            id: "34",
            time: "15:00–15:10",
            type: "platform",
            title:
              "Effects of Thoracic Spinal Manipulation with Trigger Point Therapy on Inflammatory Cytokines in Individuals with Relapsing-Remitting Multiple Sclerosis: A Pilot Randomized Controlled Trial",
            speaker: "Dr. Murdi Alanazi",
          },
          {
            id: "35",
            time: "15:10–15:20",
            type: "qna",
            title: "Q&A",
            speaker: "—",
          },
          {
            id: "36",
            time: "15:20–15:50",
            type: "break",
            title: "Break / Exhibition",
            speaker: "—",
          },
        ],
      },
      {
        id: "d2-s5",
        title: "Session 5: Digital Rehabilitation and Workforce Development",
        moderator: "Dr. Hani Alkhawajah",
        items: [
          {
            id: "37",
            time: "15:50–16:20",
            type: "keynote",
            title:
              "AI-Assisted Assessment and Treatment in Physiotherapy Practice",
            speaker: "Dr. Mashael Alsobhi",
          },
          {
            id: "38",
            time: "16:20–16:40",
            type: "invited",
            title: "Residency, Specialization, & Competency Frameworks",
            speaker: "Dr. Terrence McGee",
          },
          {
            id: "39",
            time: "16:40–17:00",
            type: "invited",
            title:
              "Challenges with Telehealth and How To Overcome Them (Virtual Lecture)",
            speaker: "Prof. Rana Hinman",
          },
          {
            id: "40",
            time: "17:00–17:10",
            type: "platform",
            title:
              "Integrating AI and IoT-Enabled Assistive Technologies in Post-Stroke Neurorehabilitation: A Value-Based Framework",
            speaker: "Dr. Fayez Namnaqani",
          },
          {
            id: "41",
            time: "17:10–17:20",
            type: "platform",
            title:
              "Bridging the Cognitive Gap: AI-Assisted Quantitative Movement Analysis for Enhanced Clinical Reasoning in Musculoskeletal Physical Therapy",
            speaker: "Ms. Noor Alzahri",
          },
          {
            id: "42",
            time: "17:20–17:30",
            type: "platform",
            title:
              "A Virtual Reality Physiotherapy Toolkit for Chronic Knee Pain: Biomechanical Accuracy and User Experience in an Early-Stage Evaluation",
            speaker: "Dr. Alhanouf Almutairi",
          },
          {
            id: "43",
            time: "17:30–17:40",
            type: "qna",
            title: "Q&A",
            speaker: "—",
          },
          {
            id: "44",
            time: "17:40–18:10",
            type: "panel",
            title:
              "The Future of Physiotherapy in Saudi Arabia: 2030 Vision Roadmap",
            speaker: (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Moderator: Dr. Asma Alderaa
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Panelists:
                </span>
                <ul className="text-sm space-y-1 list-none text-slate-600 dark:text-slate-400">
                  <li>1. Dr. Abdulfattah Alqahtani</li>
                  <li>2. Dr. Terrence McGee</li>
                  <li>3. Ms. Manar Almkirsh OR Dr. Faisal Aldahmashi</li>
                  <li>4. Dr. Ahamd Barhameen</li>
                </ul>
              </div>
            ),
          },
          {
            id: "45",
            time: "18:10–18:20",
            type: "qna",
            title: "Q&A",
            speaker: "—",
          },
          {
            id: "46",
            time: "18:20–19:00",
            type: "closing",
            title: "Closing Remarks & Awards Ceremony",
            speaker: "—",
          },
        ],
      },
    ],
  },
];

export const AgendaTab = () => {
  const [activeDay, setActiveDay] = useState(1);
  const { language } = useLanguage();

  const currentDayData = AGENDA_DATA.find((d) => d.id === activeDay);

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
              ? "الأجندة العلمية للمؤتمر"
              : "Conference Scientific Agenda"}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-1">
            November 12–13, 2026 | Sheikh Hussein bin Abdulrahman Al-Mousa
            Conference Hall - 15th floor
          </p>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Advancing Physiotherapy in Saudi Arabia: Leadership, Innovation &
            Value-Based Impact
          </p>
        </div>
      </div>

      {/* Day Toggles */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
        {AGENDA_DATA.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm border-2 ${
              activeDay === day.id
                ? "bg-blue-600 text-white border-blue-600 shadow-blue-600/30 shadow-lg scale-105"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-500"
            }`}
          >
            <div
              className={`p-2 rounded-xl ${activeDay === day.id ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-gray-700 text-blue-500 dark:text-blue-400"}`}
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
        {currentDayData?.sessions.map((session, sIdx) => (
          <div
            key={session.id}
            className="border-b-2 border-slate-100 dark:border-slate-800 last:border-b-0"
          >
            {/* Session Header (if exists) */}
            {session.title && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                    {session.title}
                  </h4>
                  {session.moderator && (
                    <p className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
                      <User className="w-4 h-4" /> Moderator:{" "}
                      {session.moderator}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Interactive Timeline Layout */}
            <div className="relative p-6 md:p-10 space-y-8 md:space-y-10 bg-white dark:bg-slate-900">
              {/* Vertical Line */}
              <div className="absolute top-10 bottom-10 left-[2.25rem] md:left-[9.5rem] w-[2px] bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent z-0" />

              {session.items.map((item, idx) => {
                const cfg = TYPE_STYLES[item.type];
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
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg?.bg} ${cfg?.color} ${cfg?.border}`}
                        >
                          {cfg?.icon} {cfg?.label}
                        </span>
                      </div>

                      <div
                        className={`text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 leading-relaxed ${isBreak ? "opacity-80" : ""}`}
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
          </div>
        ))}

        {/* End of Day Blocks */}
        {activeDay === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 md:p-12 text-center border-t border-blue-100 dark:border-blue-800/50">
            <h4 className="text-3xl font-black text-blue-900 dark:text-blue-100 mb-4">
              End of Day 1
            </h4>
            <p className="text-blue-700 dark:text-blue-300 mb-8 max-w-2xl mx-auto font-medium">
              Thank you for joining us on the first day of the conference. We
              look forward to seeing you tomorrow for more insightful sessions
              and discussions.
            </p>
            <button
              onClick={() => {
                setActiveDay(2);
                const el = document.getElementById("agenda-top");
                if (el) {
                  window.scrollTo({
                    top:
                      el.getBoundingClientRect().top + window.pageYOffset - 100,
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
            <p className="text-indigo-700 dark:text-indigo-300 mb-8 max-w-2xl mx-auto font-medium">
              Thank you for being part of this remarkable event. We hope you
              enjoyed the sessions. Please take a moment to evaluate your
              experience to claim your certificate.
            </p>
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
