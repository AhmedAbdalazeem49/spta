import femaleAvatarImg from "@/assets/female-avatar.png";
import imgTerrence from "@/assets/invited-speakers/Terrence_McGee - Terrence McGee.png";
import imgSian from "@/assets/invited-speakers/sian harries.jpg";
import imgAlyAlattar from "@/assets/workshops-speakers/Dr. Aly Alatar .png";
import imgZedan from "@/assets/workshops-speakers/Dr. Mohammed Zedan.jpg";
import imgMohamed from "@/assets/workshops-speakers/Dr. Mohammed.jpg";
import imgMonira from "@/assets/workshops-speakers/Dr. Monira Aldhahi.jpeg";
import imgPhilippe from "@/assets/workshops-speakers/Dr. Philippe Germain .png";
import imgJeffar from "@/assets/workshops-speakers/Mr. Jaffar Alabdrabalrasol.jpg";
import imgHalaa from "@/assets/workshops-speakers/Ms. Halah Aldhuaian.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import React, { useState } from "react";

interface Speaker {
  name: string;
  title: string;
  photo?: string;
}

interface Workshop {
  id: string;
  title: string;
  timePeriod: "Morning" | "Afternoon";
  time: string;
  speakers: Speaker[];
  objectives: string[];
}

const WORKSHOPS: Workshop[] = [
  // MORNING WORKSHOPS
  {
    id: "w1",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title:
      "Clinical Reasoning in Cervicothoracic Disorders: Integrating Clinical Practice Guidelines into Complex Patient Management",
    speakers: [
      {
        name: "Dr. Terrence McGee, PT, DScPT",
        title:
          "Board-Certified Clinical Specialist in Orthopaedic Physical Therapy\nFellow, American Academy of Orthopaedic Manual Physical Therapists\nDirector of Strategic Operations, Assistant Professor\nDepartment of Physical Therapy, University of Delaware, USA",
        photo: imgTerrence,
      },
    ],
    objectives: [
      "Distinguish clinical practice guidelines from clinical reasoning in cervicothoracic care.",
      "Apply guideline recommendations to the patient's presentation, irritability, context, and changing clinical findings.",
      "Develop and reassess hypothesis-driven examination and intervention plans.",
      "Integrate manual therapy, exercise, education, and reassessment into individualised management plans.",
      "Reflect on complex cases involving uncertainty and competing management options.",
    ],
  },
  {
    id: "w2",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title: "Speaking Up in Elite Sport",
    speakers: [
      {
        name: "Dr. Sian Knott, DAHP, PT",
        title:
          "Lecturer in Physiotherapy\nSchool of Healthcare Sciences\nCardiff University, UK",
        photo: imgSian,
      },
    ],
    objectives: [
      "Recognise the personal, cultural, professional, and organisational influences on speaking up.",
      "Identify barriers and enablers of workplace voice.",
      "Assess the urgency and potential harm associated with a concern.",
      "Distinguish observable facts from assumptions and interpretations.",
      "Choose appropriate routes for raising or escalating concerns.",
      "Use the SPEAK structure to communicate concerns clearly and professionally.",
      "Respond in ways that promote psychological safety, trust, and dialogue.",
      "Identify practical actions that strengthen a speaking-up culture.",
    ],
  },
  {
    id: "w3",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title:
      "From Rehabilitation to Performance: Integrating the Optimum Performance Training (OPT) for Female Athletes",
    speakers: [
      {
        name: "Ms. Tahani AlMahdi, MSc, PT",
        title: "Saudi Academy of Sports Sciences\nSaudi Arabia",
        photo: femaleAvatarImg,
      },
    ],
    objectives: [
      "Explain how the Optimum Performance Training (OPT) model bridges rehabilitation and return to performance.",
      "Identify physiological and biomechanical considerations specific to female athletes.",
      "Apply the OPT model to progressive, evidence-informed rehabilitation and performance programmes.",
      "Integrate movement assessment and corrective exercise to optimise function and reduce reinjury risk.",
      "Develop safe return-to-sport plans that support long-term athletic performance.",
    ],
  },
  {
    id: "w4",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title:
      "Physiotherapy in Chronic Overlapping Pain Conditions: From Complexity to Clinical Practice",
    speakers: [
      {
        name: "Dr. Aly Alatar, PhD, PT",
        title:
          "Consultant Physiotherapist and Pain Specialist\nFounder, Kinesia Clinic\nKuwait",
        photo: imgAlyAlattar,
      },
    ],
    objectives: [
      "Define chronic overlapping pain conditions and recognise common presentations.",
      "Recognise features of multisystem and nociplastic pain.",
      "Assess pain mechanisms, physical capacity, fatigue, sleep, autonomic symptoms, psychosocial factors, and activity tolerance.",
      "Identify symptom triggers and relievers to guide management decisions.",
      "Develop individualised plans using education, exercise, pacing, graded exposure, load management, and lifestyle strategies.",
      "Adapt exercise to symptom irritability, flare-ups, fatigue, and recovery response.",
      "Apply clinical reasoning and identify when multidisciplinary management or referral is needed.",
    ],
    agenda: [
      {
        time: "08:00 - 08:30",
        topic:
          "Understanding Chronic Overlapping Pain Conditions: common presentations, nociplastic pain, and multisystem involvement.",
      },
      {
        time: "08:30 - 09:10",
        topic:
          "Physiotherapy assessment: pain, fatigue, sleep, activity tolerance, symptom triggers, contextual factors, and red flags.",
      },
      {
        time: "09:10 - 09:45",
        topic:
          "Clinical reasoning and patient classification: irritability, functional capacity, treatment priorities, and patient subgroups.",
      },
      { time: "09:45 - 10:00", topic: "Break" },
      {
        time: "10:00 - 10:45",
        topic:
          "Physiotherapy management: education, pacing, graded exposure, load management, flare management, and lifestyle factors.",
      },
      {
        time: "10:45 - 11:25",
        topic:
          "Exercise prescription practical workshop: selection, dosing, progression, regression, and monitoring symptom response.",
      },
      {
        time: "11:25 - 11:50",
        topic:
          "Complex clinical cases: assessment priorities, treatment planning, exercise modification, and multidisciplinary referral.",
      },
      {
        time: "11:50 - 12:00",
        topic:
          "Summary, key clinical messages, questions, and next-step reflection.",
      },
    ],
  },
  {
    id: "w5",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title:
      "A Practical Approach to Acute Vertigo and Benign Paroxysmal Positional Vertigo",
    speakers: [
      {
        name: "Dr. Doaa AlSharif, PhD, PT, AVRT, CRCs, MSc",
        title:
          "Assistant professor\nCollege of Applied Medical Sciences, Physical therapy Department\nTaif University, Saudi Arabia",
        photo: femaleAvatarImg,
      },
      {
        name: "Mrs. Maryam Alshammari, MSc, PT. AVPT",
        title: "Cochlear Implant Department\nHafar Albaten Central Hospital",
        photo: femaleAvatarImg,
      },
    ],
    objectives: [
      "Explain the pathophysiology and clinical presentation of posterior, horizontal, and anterior canal BPPV.",
      "Perform evidence-based bedside tests for positional vertigo.",
      "Differentiate peripheral BPPV from urgent causes of acute vertigo.",
      "Select and perform the appropriate canalith repositioning manoeuvre.",
      "Apply clinical reasoning through case discussion and supervised practice.",
    ],
  },

  // AFTERNOON WORKSHOPS
  {
    id: "w6",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title: "Aquatic Therapy Beyond the Pool",
    speakers: [
      {
        name: "Mr. Mohamed Zedan, PT",
        title:
          "Physiotherapist - Hydrotherapy Supervisor\nAlmoosa Rehabilitation Hospital\nSaudi Arabia",
        photo: imgZedan,
      },
    ],
    objectives: [
      "Explain the core principles of Water Specific Therapy in neurorehabilitation.",
      "Apply evidence-informed aquatic interventions to improve movement, balance, and function.",
      "Use clinical reasoning to plan, progress, and regress aquatic interventions.",
      "Integrate aquatic techniques to support mobility, independence, and daily participation.",
    ],
  },
  {
    id: "w7",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title:
      "Using Musculoskeletal Ultrasound as an Objective Outcome Measure in Rehabilitation",
    speakers: [
      {
        name: "Mr. Jaffar Alabdrabalrasol, MSc, PT",
        title:
          "Senior Physiotherapist\nDepartment of Physiotherapy\nQatif Central Hospital, Saudi Arabia",
        photo: imgJeffar,
      },
    ],
    objectives: [
      "Explain the role of musculoskeletal ultrasound as an objective outcome measure in postoperative rehabilitation.",
      "Select appropriate scanning settings for the suprapatellar recess and quadriceps.",
      "Perform reproducible scans and measure suprapatellar effusion depth.",
      "Measure quadriceps thickness at rest and during contraction, and calculate limb symmetry.",
      "Use real-time ultrasound biofeedback to facilitate quadriceps activation.",
      "Interpret affected- and sound-limb measurements to identify inhibition patterns.",
    ],
  },
  {
    id: "w8",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title:
      "From Physical Stimuli to Biological Adaptation: Understanding Mechanobiology for the Future of Physiotherapy",
    speakers: [
      {
        name: "Dr. Philippe Germain, PhD",
        title: "Associate Professor\nUniversity of Orléans, France",
        photo: imgPhilippe,
      },
    ],
    objectives: [
      "Explain the principles of mechanobiology and mechanotransduction.",
      "Describe how physical stimuli regulate intracellular signalling.",
      "Explain the role of satellite cells in skeletal-muscle regeneration.",
      "Distinguish diagnostic ultrasound from therapeutic ultrasound.",
      "Summarise the rationale for and limitations of Low-Intensity Pulsed Ultrasound (LIPUS).",
      "Discuss how experimental mechanobiology may translate into future clinical applications.",
    ],
  },
  {
    id: "w9",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title:
      "Better Teams, Better Care: Leadership for High-Performing Physiotherapy Practice",
    speakers: [
      {
        name: "Ms. Halah Aldhuaian, MSc, PT",
        title:
          "Senior Physiotherapist\nRiyadh First Health Cluster-Long Term Care Hospital\nSaudi Arabia",
        photo: imgHalaa,
      },
    ],
    objectives: [
      "Distinguish clinical excellence from clinical leadership and explain their complementary roles.",
      "Identify the characteristics and leadership behaviours of high-performing physiotherapy teams.",
      "Apply leadership and coaching strategies to improve engagement, communication, and change management.",
      "Use practical leadership tools to strengthen team performance, patient experience, and quality improvement.",
      "Develop a personalised action plan for team effectiveness and patient-centred care.",
    ],
  },
  {
    id: "w10",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title:
      "From Risk to Readiness: Integrating Physical and Psychosocial Factors in Sports Rehabilitation",
    speakers: [
      {
        name: "Dr. Mohammed Alshehri, PT, MSc, PhD",
        title:
          "Associate professor, Physical Therapy Department\nJazan University, Saudi Arabia",
        photo: imgMohamed,
      },
      {
        name: "Dr. Monira Aldahi, MSc, DPT, PhD (Hons), FHEA, AT-IBCT",
        title:
          "Associate Professor of Rehabilitation Sciences\nConsultant Physical Therapy at KAAUH\nHead of CHRS Research unit\nPrincess Nourah bint Abdulrahman University\nWorld Rugby Medical Educator",
        photo: imgMonira,
      },
    ],
    objectives: [
      "Identify physiological and psychological factors associated with sports injury risk.",
      "Perform and interpret functional assessments of strength, balance, fatigue, and movement.",
      "Recognise how stress, anxiety, self-efficacy, resilience, fear of reinjury, and readiness affect rehabilitation.",
      "Integrate physical and psychological findings into a multidimensional athlete profile.",
      "Design individualised injury-prevention and rehabilitation strategies targeting modifiable factors.",
    ],
  },
];

const WorkshopCard = ({
  workshop,
  globalIndex,
  isExpanded,
  onToggle,
}: {
  workshop: Workshop;
  globalIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const isMorning = workshop.timePeriod === "Morning";

  // Morning: warm amber/orange palette
  // Afternoon: deep navy/indigo/violet palette (much darker)
  const collapsedBg = isMorning
    ? "bg-gradient-to-r from-amber-100 via-orange-100/80 to-amber-50 dark:from-amber-900/40 dark:via-orange-900/30 dark:to-amber-900/40 hover:from-amber-200 hover:to-amber-100 dark:hover:from-amber-900/60 dark:hover:to-amber-900/50"
    : "bg-gradient-to-r from-indigo-950/90 via-violet-950/80 to-slate-900/90 hover:from-indigo-950 hover:via-violet-950 hover:to-slate-950 border-indigo-800/40";

  const expandedBg = isMorning
    ? "bg-white dark:bg-slate-900"
    : "bg-slate-950 border-indigo-900/40";

  const accentLine = isMorning
    ? "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
    : "bg-[#6FC4BC] shadow-[0_0_12px_rgba(99,102,241,0.5)]";

  const accentLineCollapsed = isMorning
    ? "group-hover:bg-amber-300 dark:group-hover:bg-amber-700"
    : "group-hover:bg-indigo-700 dark:group-hover:bg-[#6FC4BC]";

  const titleColor = isMorning
    ? isExpanded
      ? "text-slate-900 dark:text-white"
      : "text-amber-900 dark:text-amber-100 group-hover:text-amber-800 dark:group-hover:text-amber-200"
    : isExpanded
      ? "text-white"
      : "text-indigo-100 group-hover:text-white";

  const badgeBg = isMorning
    ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-400/30"
    : "bg-[#6FC4BC]/20 text-indigo-300 border border-[#6FC4BC]/30";

  const timeBadge = isMorning
    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
    : "bg-indigo-900/50 text-indigo-300";

  const objectiveDot = isMorning ? "bg-amber-500" : "bg-[#6FC4BC]";

  const speakerIconBg = isMorning
    ? "bg-gradient-to-br from-amber-400 to-orange-500"
    : "bg-gradient-to-br from-[#6FC4BC] to-[#55AE47]";

  const speakerNameColor = isMorning
    ? "text-slate-900 dark:text-white"
    : "text-white";

  const speakerTitleColor = isMorning
    ? "text-slate-600 dark:text-slate-400"
    : "text-indigo-300";

  const sectionTitleColor = isMorning
    ? "text-slate-800 dark:text-slate-200"
    : "text-slate-200";

  const dividerColor = isMorning
    ? "border-slate-200 dark:border-slate-700"
    : "border-indigo-900/50";

  const objectiveTextColor = isMorning
    ? "text-slate-700 dark:text-slate-300"
    : "text-indigo-100";

  const statusBadge = isExpanded
    ? isMorning
      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700/50"
      : "bg-indigo-900/40 text-indigo-300 border-indigo-700/50"
    : isMorning
      ? "bg-white dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700 group-hover:border-amber-400"
      : "bg-indigo-950/60 text-indigo-400 border-indigo-800 group-hover:text-indigo-300";

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden border transition-all duration-300 ${
        isExpanded
          ? isMorning
            ? "border-amber-200 dark:border-amber-800/50"
            : "border-indigo-800/50"
          : isMorning
            ? "border-amber-200/60 dark:border-amber-800/30"
            : "border-indigo-800/40"
      } shadow-sm hover:shadow-lg`}
    >
      {/* ── Clickable Header ── */}
      <div
        onClick={onToggle}
        className={`relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 cursor-pointer transition-all duration-300 group overflow-hidden ${
          isExpanded ? expandedBg : collapsedBg
        }`}
      >
        {/* Left accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
            isExpanded ? accentLine : `bg-transparent ${accentLineCollapsed}`
          }`}
        />

        <div className="pl-4 flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${badgeBg}`}
            >
              {isMorning ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
              Workshop {globalIndex + 1}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${timeBadge}`}
            >
              <Clock className="w-3.5 h-3.5" />
              {workshop.time}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`text-lg md:text-xl font-black leading-snug transition-colors duration-300 ${titleColor}`}
          >
            {workshop.title}
          </h3>

          {/* Speaker names preview (collapsed) */}
          {!isExpanded && (
            <p
              className={`mt-2 text-xs font-medium truncate ${isMorning ? "text-amber-700/70 dark:text-amber-400/70" : "text-indigo-400/80"}`}
            >
              {workshop.speakers.map((s) => s.name).join(" • ")}
            </p>
          )}
        </div>

        {/* Status badge */}
        <div
          className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${statusBadge}`}
        >
          {isExpanded ? "Showing Details" : "Click to View Details"}
        </div>
      </div>

      {/* ── Expandable Content ── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className={`p-5 md:p-8 flex flex-col lg:flex-row gap-8 ${isMorning ? "bg-white dark:bg-slate-900" : "bg-slate-950"}`}
            >
              {/* Speakers */}
              <div className="lg:w-2/5 flex flex-col gap-8">
                <div>
                  <h4
                    className={`flex items-center gap-2 text-base font-black mb-4 border-b pb-2 ${sectionTitleColor} ${dividerColor}`}
                  >
                    <Users
                      className={`w-5 h-5 ${isMorning ? "text-amber-500" : "text-indigo-400"}`}
                    />
                    {workshop.speakers.length > 1 ? "Speakers" : "Speaker"}
                  </h4>
                  <div className="space-y-5">
                    {workshop.speakers.map((speaker, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base text-white shadow-sm shrink-0 overflow-hidden ${speakerIconBg}`}
                        >
                          {speaker.photo ? (
                            <img
                              src={speaker.photo}
                              alt={speaker.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            speaker.name
                              .replace(/^(Dr\.|Mrs\.|Mr\.|Ms\.|Prof\.)\s*/, "")
                              .split(" ")[0][0]
                          )}
                        </div>
                        <div>
                          <div
                            className={`font-bold text-base leading-tight ${speakerNameColor}`}
                          >
                            {speaker.name}
                          </div>
                          <div
                            className={`text-xs font-medium mt-1 whitespace-pre-line leading-relaxed ${speakerTitleColor}`}
                          >
                            {speaker.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Objectives */}
                <div>
                  <h4
                    className={`flex items-center gap-2 text-base font-black mb-4 border-b pb-2 ${sectionTitleColor} ${dividerColor}`}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 ${isMorning ? "text-amber-500" : "text-indigo-400"}`}
                    />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-3">
                    {workshop.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${objectiveDot}`}
                        />
                        <span
                          className={`leading-relaxed text-sm font-medium ${objectiveTextColor}`}
                        >
                          {obj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const WorkshopsTab = () => {
  const { language } = useLanguage();

  const morningWorkshops = WORKSHOPS.filter((w) => w.timePeriod === "Morning");
  const afternoonWorkshops = WORKSHOPS.filter(
    (w) => w.timePeriod === "Afternoon",
  );

  const [expandedMorning, setExpandedMorning] = useState<string[]>([]);
  const [expandedAfternoon, setExpandedAfternoon] = useState<string[]>([]);
  const [morningOpen, setMorningOpen] = useState(false);
  const [afternoonOpen, setAfternoonOpen] = useState(false);

  const toggleMorning = (id: string) =>
    setExpandedMorning((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleAfternoon = (id: string) =>
    setExpandedAfternoon((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="mb-10">
        <h3 className="text-4xl font-black text-[#11517E] mb-3">
          {language === "ar" ? "ورش العمل" : "Workshops"}
        </h3>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] rounded-full mb-3"></div>
        <p className="text-[#11517E] font-bold text-xl flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Saturday 14 November 2026
        </p>
      </div>

      {/* Morning Section */}
      <div className="mb-6">
        <button
          onClick={() => setMorningOpen((prev) => !prev)}
          className="w-full flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/40 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/50 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/60 rounded-xl text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-200">
              <Sun className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Morning Sessions
              </h3>
              <p className="text-amber-600 dark:text-amber-500 font-bold text-sm">
                08:00 AM – 12:00 PM &nbsp;·&nbsp; {morningWorkshops.length}{" "}
                workshops
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm shrink-0">
            <span className="hidden sm:inline">
              {morningOpen ? "Collapse" : "Expand"}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${morningOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {morningOpen && (
            <motion.div
              key="morning-workshops"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
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
      </div>

      {/* Afternoon Section */}
      <div className="mb-8">
        <button
          onClick={() => setAfternoonOpen((prev) => !prev)}
          className="w-full flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#11517E]/10 to-[#6FC4BC]/10 dark:from-indigo-950/60 dark:to-slate-900/60 border border-[#11517E]/20 dark:border-indigo-800/40 hover:from-[#11517E]/20 hover:to-[#6FC4BC]/20 dark:hover:from-indigo-950/80 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#11517E]/10 dark:bg-indigo-950/60 border border-[#11517E]/20 dark:border-indigo-800/50 rounded-xl text-[#11517E] dark:text-[#6FC4BC] group-hover:scale-110 transition-transform duration-200">
              <Moon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Afternoon Sessions
              </h3>
              <p className="text-[#6FC4BC] font-bold text-sm">
                01:00 PM – 05:00 PM &nbsp;·&nbsp; {afternoonWorkshops.length}{" "}
                workshops
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#11517E] dark:text-[#6FC4BC] font-bold text-sm shrink-0">
            <span className="hidden sm:inline">
              {afternoonOpen ? "Collapse" : "Expand"}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${afternoonOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {afternoonOpen && (
            <motion.div
              key="afternoon-workshops"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
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
      </div>
    </div>
  );
};
