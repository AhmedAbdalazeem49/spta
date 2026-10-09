import agendaPdf from "@/assets/agenda.pdf";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Coffee,
  Download,
  Mic2,
  PlayCircle,
  ShieldCheck,
  Star,
  Trophy,
  User,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ItemType =
  | "ceremony"
  | "keynote"
  | "break"
  | "panel"
  | "invited"
  | "platform presentation"
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
    color: "text-slate-600 ",
    bg: "bg-slate-50 ",
    border: "border-slate-300 ",
    icon: <ShieldCheck className="w-4 h-4" />,
    label: "Registration",
  },
  ceremony: {
    color: "text-purple-700 ",
    bg: "bg-purple-50 ",
    border: "border-purple-400 ",
    icon: <Trophy className="w-4 h-4" />,
    label: "Ceremony",
  },
  keynote: {
    color: "text-[#11517E] -[#6FC4BC]",
    bg: "bg-[#f0f8f8] -[#11517E]/20",
    border: "border-[#11517E] -[#11517E]",
    icon: <Mic2 className="w-4 h-4" />,
    label: "Keynote",
  },
  "Focused Symposium": {
    color: "text-[#11517E] ",
    bg: "bg-[#f0f8f8] ",
    border: "border-[#6FC4BC] -[#6FC4BC]",
    icon: <BookOpen className="w-4 h-4" />,
    label: "Focused Symposium",
  },
  break: {
    color: "text-[#55AE47] ",
    bg: "bg-[#55AE47]/5 ",
    border: "border-#55AE47] ",
    icon: <Coffee className="w-4 h-4" />,
    label: "Break",
  },
  panel: {
    color: "text-rose-700 ",
    bg: "bg-rose-50 ",
    border: "border-rose-500 ",
    icon: <Users className="w-4 h-4" />,
    label: "Panel",
  },
  invited: {
    color: "text-emerald-700 ",
    bg: "bg-emerald-50 ",
    border: "border-emerald-500 ",
    icon: <Star className="w-4 h-4" />,
    label: "Invited",
  },
  "platform presentation": {
    color: "text-teal-700 ",
    bg: "bg-teal-50 ",
    border: "border-teal-500 ",
    icon: <PlayCircle className="w-4 h-4" />,
    label: "Platform Presentation",
  },
  qna: {
    color: "text-[#55AE47] ",
    bg: "bg-[#55AE47]/5 ",
    border: "border-#55AE47] ",
    icon: <Users className="w-4 h-4" />,
    label: "Q&A",
  },
  closing: {
    color: "text-slate-700 ",
    bg: "bg-slate-100 ",
    border: "border-slate-500 ",
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
            speaker: "Dr. Faisal Aldahmashi",
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
                <ul className="text-sm font-normal space-y-1 text-slate-600 ">
                  <li>▪ Opening & Framing</li>
                  <li>▪ Evidence Presentation</li>
                  <li>▪ Saudi Experience Case Study</li>
                  <li>▪ Implementation Framework – Practical roadmap</li>
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
                <span className="font-bold text-slate-800 ">
                  Moderator: Dr. Mishal Aldaihan
                </span>
                <span className="font-bold text-slate-700 ">Panelists:</span>
                <ol className="text-sm space-y-1 list-decimal list-inside text-slate-600 ">
                  <li>Dr. Faisal Aldahmashi</li>
                  <li>Dr. Hanan Alsaif</li>
                  <li>Mr. Talal Alghamdi</li>
                  <li>Dr. Noorah A. Alshoweir</li>
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
              "Redefining Chronic Pain Care: Integrating Biopsychosocial & Value-Based Physiotherapy Models (Virtual Lecture)",
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
            type: "platform presentation",
            title:
              "Effects of Nigella sativa Supplementation with Combined Exercise on Musculoskeletal Performance and Blood Fructosamine Levels in Male Adults with Type 2 Diabetes Mellitus: A Randomized Controlled Trial",
            speaker: "Dr. Hiedar Alyami",
          },
          {
            id: "16",
            time: "14:40–14:50",
            type: "platform presentation",
            title:
              "The Impact of Autonomic Nervous System Modulation on Heart Rate Variability and Musculoskeletal Manifestations in Chronic Neck Pain: A Double-Blind Randomized Clinical Trial",
            speaker: "Dr. Hani Alkhawajah",
          },
          {
            id: "17",
            time: "14:50–15:00",
            type: "platform presentation",
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
              "Preparing Physical Therapists for Older Adults: Development and Evaluation of an Arabic Educational Intervention on Ageism",
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
            type: "platform presentation",
            title:
              "Effects of High-Intensity Interval Training on Body Composition, Blood Pressure, and Cardiorespiratory Fitness in Obese Hypertensive Men: A Randomized Controlled Trial",
            speaker: "Mr. Mahdi Al Ghannam",
          },
          {
            id: "24",
            time: "16:50–17:00",
            type: "platform presentation",
            title:
              "Effect of Pulsed High-Intensity Laser Therapy Combined with Exercise Protocol in Treatment of Primary Dysmenorrhea: A Randomized Controlled Trial",
            speaker: "Ms. Saeeda Alhashmi Alamir",
          },
          {
            id: "25",
            time: "17:00–17:10",
            type: "platform presentation",
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
                <span className="font-bold text-slate-800 ">
                  Moderator: Dr. Sara Almansouri
                </span>
                <span className="font-bold text-slate-700 ">Panelists:</span>
                <ul className="text-sm space-y-1 list-none text-slate-600 ">
                  <li>1. Dr. Walid Ouanes</li>
                  <li>2. Dr. Tahany Alhamad</li>
                  <li>3. Dr. Mohammed Alhaizan</li>
                  <li>4. Dr. Faisal Al Mubarak</li>
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
            type: "platform presentation",
            title:
              "The effects of trunk rehabilitation on balance, gait, falls, and community mobility in patients with multiple sclerosis",
            speaker: "Ms. Shatha Mukhtar",
          },
          {
            id: "33",
            time: "14:50–15:00",
            type: "platform presentation",
            title:
              "Using Transcranial Direct Current Stimulation to Improve Multiple Domains in Health-Related Quality of Life among Subacute Stroke Survivors",
            speaker: "Dr. Mohammed Alshehri",
          },
          {
            id: "34",
            time: "15:00–15:10",
            type: "platform presentation",
            title:
              "Effects of Thoracic Spinal Manipulation with Trigger Point Therapy on Inflammatory Cytokines in Individuals with Relapsing-Remitting Multiple Sclerosis: A Pilot Randomized Controlled Trial",
            speaker: "Dr. Fayez Namnaqani",
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
            type: "platform presentation",
            title:
              "Gamified Vs Standard Step-Counting Applications: Effects on Daily Step Count and Sleep Quality in University Students",
            speaker: "Dr. Rehab Aljuhni",
          },
          {
            id: "41",
            time: "17:10–17:20",
            type: "platform presentation",
            title:
              "Bridging the Cognitive Gap: AI-Assisted Quantitative Movement Analysis for Enhanced Clinical Reasoning in Musculoskeletal Physical Therapy",
            speaker: "Ms. Noor Alzahri",
          },
          {
            id: "42",
            time: "17:20–17:30",
            type: "platform presentation",
            title:
              "Beyond the Tendon: Whole-Body Compensatory Movement Patterns in Athletes with Patellar Tendinopathy Identified by AI-Assisted Motion Analysis",
            speaker: "Mr. Abdullah Alharbi",
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
                <span className="font-bold text-slate-800 ">
                  Moderator: Dr. Asma Alderaa
                </span>
                <span className="font-bold text-slate-700 ">Panelists:</span>
                <ul className="text-sm space-y-1 list-none text-slate-600 ">
                  <li>1. Dr. Abdulfattah Alqahtani</li>
                  <li>2. Dr. Terrence McGee</li>
                  <li>3. Ms. Manar Almkirsh</li>
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
  const navigate = useNavigate();

  const currentDayData = AGENDA_DATA.find((d) => d.id === activeDay);

  // Keep track of expanded sessions
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // When changing days, collapse all sessions
  useEffect(() => {
    setExpandedSessions([]);
  }, [activeDay]);

  const toggleSession = (id: string) => {
    setExpandedSessions((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleScrollToReviews = () => {
    navigate("/conference-evaluations");
  };

  return (
    <div id="agenda-top" className="w-full pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 text-center md:text-start">
        <div>
          <h3 className="text-4xl font-black text-[#11517E] mb-3">
            {language === "ar"
              ? "الاجندة العلمية للمؤتمر"
              : "Conference Scientific Agenda"}
          </h3>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] rounded-full mb-2"></div>
          <p className="text-[#11517E] font-bold text-lg mb-1">
            November 12-14, 2026 | Conference Hall
          </p>
        </div>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = agendaPdf;
            link.download = "Scientific Agenda.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setShowDownloadModal(true);
            setTimeout(() => setShowDownloadModal(false), 3000);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#6FC4BC] text-white rounded-xl font-bold hover:bg-[#5dafa7] transition-all shadow-lg shadow-[#6FC4BC]/30 hover:scale-105"
        >
          <Download className="w-5 h-5" />
          {language === "ar"
            ? "تحميل الجدول العلمي"
            : "Download Scientific Agenda"}
        </button>
      </div>

      {/* Day Selector */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        {AGENDA_DATA.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`relative overflow-hidden flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold flex-1 sm:flex-none ${
              activeDay === day.id
                ? "bg-[#11517E] text-white shadow-xl shadow-blue-600/20 scale-105 border-[#11517E]"
                : "bg-white text-slate-600 hover:bg-[#f0f8f8] :bg-slate-700 border border-slate-200 "
            }`}
          >
            <div
              className={`p-2 rounded-xl ${
                activeDay === day.id
                  ? "bg-white/20 text-white"
                  : "bg-[#f0f8f8] text-[#11517E] -[#6FC4BC]"
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
      <div className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden shadow-xl">
        {currentDayData?.sessions.map((session, sIdx) => {
          const hasTitle = !!session.title;
          const isExpanded = !hasTitle || expandedSessions.includes(session.id);

          return (
            <div
              key={session.id}
              className="border-b-2 border-slate-100 last:border-b-0"
            >
              {/* Session Header (if exists) */}
              {hasTitle && (
                <div
                  onClick={() => toggleSession(session.id)}
                  className={`relative p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all duration-300 group overflow-hidden ${
                    isExpanded
                      ? "bg-white "
                      : "bg-gradient-to-r from-blue-100 via-#11517E]/10/80 to-blue-50 hover:from-blue-200 hover:via-#11517E]/20/80 hover:to-blue-100 :from-slate-600 :via-blue-700/40 :to-slate-600"
                  }`}
                >
                  {/* Decorative Active Indicator (Instead of arrows) */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                      isExpanded
                        ? "bg-[#11517E] -[#11517E] shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                        : "bg-transparent group-hover:bg-blue-300 :bg-[#11517E]"
                    }`}
                  />

                  <div className="pl-4">
                    <h4
                      className={`text-xl md:text-2xl font-black mb-2 leading-tight transition-colors duration-300 ${
                        isExpanded
                          ? "text-[#11517E] -[#6FC4BC]"
                          : "text-slate-900 group-hover:text-[#11517E] :text-[#6FC4BC]"
                      }`}
                    >
                      {session.title}
                    </h4>
                    {session.moderator && (
                      <p className="text-[#11517E]/80 -[#6FC4BC]/80 font-bold flex items-center gap-2">
                        <User className="w-4 h-4" /> Moderator:{" "}
                        {session.moderator}
                      </p>
                    )}
                  </div>

                  {/* Visual state indicator (subtle glow / text change) */}
                  <div
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                      isExpanded
                        ? "bg-[#e0f2f1] text-[#11517E] -[#6FC4BC] border-[#11517E]/20 -[#11517E]/50"
                        : "bg-white text-slate-500 border-slate-200 group-hover:border-[#6FC4BC]/50 :text-[#11517E]"
                    }`}
                  >
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
                    <div className="relative p-6 md:p-10 space-y-8 md:space-y-10 bg-white ">
                      {/* Vertical Line */}
                      <div className="absolute top-10 bottom-10 left-[2.25rem] md:left-[9.5rem] w-[2px] bg-gradient-to-b from-transparent via-slate-200 to-transparent z-0" />

                      {session.items.map((item, idx) => {
                        const cfg = TYPE_STYLES[item.type || ""];
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
                              <div className="font-black text-lg md:text-base text-slate-700 ">
                                {item.time}
                              </div>
                            </div>

                            {/* Timeline Node */}
                            <div className="absolute left-6 md:left-[9.5rem] top-2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-[#11517E] shadow-sm transition-transform group-hover:scale-125 group-hover:bg-[#11517E] z-20" />

                            {/* Content Card */}
                            <div
                              className={`flex-1 rounded-2xl border transition-all duration-300 p-5 md:p-6 ${
                                isBreak
                                  ? "bg-slate-50 border-slate-100 opacity-90"
                                  : "bg-white border-slate-200 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
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
                                className={`text-lg md:text-xl font-bold text-slate-900 mb-4 leading-relaxed ${
                                  isBreak ? "opacity-80" : ""
                                }`}
                              >
                                {item.title}
                              </div>

                              {item.speaker && item.speaker !== "—" && (
                                <div className="mt-4 pt-4 border-t border-slate-100 ">
                                  <div className="text-sm font-semibold text-slate-600 flex items-start gap-2">
                                    {typeof item.speaker === "string" ? (
                                      <>
                                        <div className="p-1.5 bg-[#f0f8f8] -[#11517E]/30 rounded-lg text-[#11517E] shrink-0">
                                          <User className="w-4 h-4" />
                                        </div>
                                        <span className="pt-1">
                                          {item.speaker}
                                        </span>
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
          <div className="bg-gradient-to-br from-blue-50 to-#11517E]/5 p-8 md:p-12 text-center border-t border-blue-100 ">
            <h4 className="text-3xl font-black text-blue-900 mb-4">
              End of Day 1
            </h4>
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#11517E] hover:bg-[#11517E] text-white font-bold transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
            >
              Continue to Day 2 Agenda <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {activeDay === 2 && (
          <div className="bg-gradient-to-br from-#11517E]/5 to-purple-50 p-8 md:p-12 text-center border-t border-[#11517E]/10 ">
            <h4 className="text-3xl font-black text-#11517E] mb-4">
              End of Conference
            </h4>
            <button
              onClick={handleScrollToReviews}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#6FC4BC] hover:bg-#11517E] text-white font-bold transition-all shadow-lg shadow-#11517E]/30 hover:scale-105"
            >
              Evaluate the Conference <Star className="w-5 h-5 fill-current" />
            </button>
          </div>
        )}
      </div>
      {/* Download Success Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#6FC4BC] to-emerald-400 z-10" />
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Download Successful!
              </h3>
              <p className="text-slate-500 ">
                The Scientific Agenda has been successfully downloaded to your
                device.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
