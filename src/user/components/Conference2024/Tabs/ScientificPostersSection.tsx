import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import femaleAvatar from "@/assets/female-avatar.png";
import {
  FileText,
  Calendar,
  Clock,
  ChevronDown,
  Monitor,
  Hash,
  Sparkles,
  Layers,
  BookOpen,
} from "lucide-react";

export interface PosterAbstract {
  screen: number;
  abstractId: string;
  title: string;
  author: string;
  gender: "male" | "female";
}

export interface PosterSession {
  id: string;
  sessionCode: string;
  titleEn: string;
  titleAr: string;
  dayEn: string;
  dayAr: string;
  timeEn: string;
  timeAr: string;
  tagColor: string;
  posters: PosterAbstract[];
}

const POSTER_SESSIONS: PosterSession[] = [
  {
    id: "session-r1",
    sessionCode: "Session R1",
    titleEn: "Professional Practice, Health Systems & Digital Rehabilitation",
    titleAr: "الممارسة المهنية، النظم الصحية وإعادة التأهيل الرقمي",
    dayEn: "Day 1",
    dayAr: "اليوم الأول",
    timeEn: "Poster display 08:30–11:30",
    timeAr: "عرض الملصقات 08:30–11:30",
    tagColor: "from-[#11517E] to-[#6FC4BC]",
    posters: [
      {
        screen: 1,
        abstractId: "A-020",
        title:
          "Acceptability of Telehealth Physical Therapy in Adults with Chronic Low Back Pain: A Multivariable Analysis of Knowledge, Attitudes, Barriers, and Biopsychosocial Health Factors",
        author: "Dr. Yousef M. Alshehre",
        gender: "male",
      },
      {
        screen: 2,
        abstractId: "A-036",
        title:
          "Moving to Practice: Exploring the Experiences of Physical Therapy Interns During the Transition from Academic Education to Clinical Internship in Saudi Arabia: A Phenomenological Study",
        author: "Amnah A. Alauujaimi",
        gender: "female",
      },
      {
        screen: 3,
        abstractId: "A-045",
        title:
          "Using ChatGPT among Saudi Physiotherapists and Accuracy of Knowledge Generated toward Non-Surgical Management of Knee Osteoarthritis Based on OARSI Guidelines",
        author: "Shujun Otaywi Aljubayri",
        gender: "female",
      },
      {
        screen: 4,
        abstractId: "A-055",
        title:
          "Evidence-Based Practice Among Physiotherapists in Cardiopulmonary Subdiscipline: A Cross-Sectional Survey in Saudi Arabia",
        author: "Raghad Obaidallah R Alsulami",
        gender: "female",
      },
      {
        screen: 5,
        abstractId: "A-068",
        title:
          "Mobile-Based Telerehabilitation During the First Six Weeks Following ACL Reconstruction: A Case Series of Six Patients",
        author: "Jaffar Saleh Alabdrabalrasol",
        gender: "male",
      },
      {
        screen: 6,
        abstractId: "A-069",
        title:
          "Preparing Physiotherapists for Palliative Care: A Mixed-Methods Study of Graduates' Knowledge and Attitudes and Academics' Educational Perspectives",
        author: "Omar Abdrhman Abdallah AL-maaytah",
        gender: "male",
      },
      {
        screen: 7,
        abstractId: "A-070",
        title:
          "Evaluating the Quality of ChatGPT-Generated Educational Content for Patients and Clinical Responses for Physiotherapists in Cardiac Rehabilitation",
        author: "Majd Mohammed Alzahrani",
        gender: "female",
      },
      {
        screen: 8,
        abstractId: "A-093",
        title:
          "Effectiveness of Artificial Intelligence-Enabled Care in the Management of Knee Osteoarthritis: A Systematic Review and Meta-Analysis of Randomized Controlled Trials",
        author: "Fai Ali Alsahrif",
        gender: "female",
      },
      {
        screen: 9,
        abstractId: "A-103",
        title:
          "A Qualitative Study Exploring Patient Perspectives on a Mobile-Delivered Decongestive Progressive Resistance Exercise Program for Breast Cancer-Related Lymphedema",
        author: "Sarah abdulaziz khayat",
        gender: "female",
      },
      {
        screen: 10,
        abstractId: "A-111",
        title:
          "Barriers and Facilitators to Evidence-Based Physiotherapy Practice in Saudi Arabia: A Critical Review",
        author: "Maryam Mohammed Al-Farqeer",
        gender: "female",
      },
    ],
  },
  {
    id: "session-r2",
    sessionCode: "Session R2",
    titleEn: "Musculoskeletal Pain, Assessment & Functional Rehabilitation",
    titleAr: "آلام الجهاز العضلي الهيكلي، التقييم وإعادة التأهيل الوظيفي",
    dayEn: "Day 1",
    dayAr: "اليوم الأول",
    timeEn: "Poster display 13:00–14:30",
    timeAr: "عرض الملصقات 13:00–14:30",
    tagColor: "from-[#11517E] to-[#6FC4BC]",
    posters: [
      {
        screen: 1,
        abstractId: "A-016",
        title:
          "Prevalence of Neuropathic Pain and Its Association with Patient-Reported Outcomes Following Total Knee Arthroplasty",
        author: "Hend Fuhaid Alshammari",
        gender: "female",
      },
      {
        screen: 2,
        abstractId: "A-018",
        title:
          "The Acute Effect of Isometric Exercise on Pain Sensitivity and Clinical Pain Intensity in Adults with Chronic Low Back Pain: Randomized Control Trial",
        author: "Asma Ali Mezher Alqahtani",
        gender: "female",
      },
      {
        screen: 3,
        abstractId: "A-019",
        title:
          "Associations of Foot Arch Status and Handgrip Strength with Unilateral Balance and Physical Performance Among Healthy Young Adults",
        author: "Dimah Ayed Alsaedi",
        gender: "female",
      },
      {
        screen: 4,
        abstractId: "A-034",
        title:
          "Exploring the Association Between Central Sensitization, Physical Activity, and Health-Related Quality of Life in Individuals with Knee Osteoarthritis",
        author: "Rana AlMoqaiteeb",
        gender: "female",
      },
      {
        screen: 5,
        abstractId: "A-035",
        title:
          "Illness Perceptions and Pain Experiences of Adults with Knee Osteoarthritis in Saudi Arabia: A Cross-Sectional Study",
        author: "Ayah Ismail",
        gender: "female",
      },
      {
        screen: 6,
        abstractId: "A-042",
        title:
          "Cross-Cultural Adaptation and Psychometric Properties Testing of the Arabic Version of the Upper Limb Functional Index",
        author: "Yousef Abdulkarim Ali Albahrani",
        gender: "male",
      },
      {
        screen: 7,
        abstractId: "A-053",
        title:
          "Joints Mobilization versus Myofascial Release on Diabetic Patients with Painful Heel",
        author: "Afnan Alabdulaaly",
        gender: "female",
      },
      {
        screen: 8,
        abstractId: "A-071",
        title:
          "Psychosocial Practice within Musculoskeletal Physical Therapy in Saudi Arabia: A Mixed-Methods Study",
        author: "Hanan Alharbi",
        gender: "female",
      },
      {
        screen: 9,
        abstractId: "A-076",
        title:
          "Effects of Cervical Extensor Muscle Fatigue on Cervical Strength and Dynamic Postural Stability in Healthy Young Adults",
        author: "Roaa Abdulghani Sroge",
        gender: "female",
      },
      {
        screen: 10,
        abstractId: "A-080",
        title:
          "Immediate Effects of Static Stretching Versus Active Release Technique on Pain and Functional Performance Among Postgraduate Female Students With Piriformis Syndrome",
        author: "Huda Jjabeen",
        gender: "female",
      },
    ],
  },
  {
    id: "session-r3",
    sessionCode: "Session R3",
    titleEn: "Sports, Performance & Rehabilitation Across Specialties",
    titleAr: "الرياضة، الأداء البدني وإعادة التأهيل عبر التخصصات",
    dayEn: "Day 1",
    dayAr: "اليوم الأول",
    timeEn: "Poster display 14:30–17:30",
    timeAr: "عرض الملصقات 14:30–17:30",
    tagColor: "from-[#11517E] to-[#6FC4BC]",
    posters: [
      {
        screen: 1,
        abstractId: "A-024",
        title:
          "Physical Activity Level And Its Association With Balance, Fear of Falling And Quality of Life Among Community-Dwelling Older Women in AL JOUF CITY, SAUDI ARABIA",
        author: "Mariyyah Eid Alanazi",
        gender: "female",
      },
      {
        screen: 2,
        abstractId: "A-026",
        title:
          "Impact of Academic Background on Women's Awareness of Prenatal, Antenatal and Postnatal Exercise Importance",
        author: "Ghaida Khalid Alahmari",
        gender: "female",
      },
      {
        screen: 3,
        abstractId: "A-043",
        title:
          "Physiotherapists' Knowledge and Perceptions on Implementing Injury Prevention Programs in Resistance Training in Public Fitness Centres: A Focus Group Study",
        author: "Abdulrhman Ibrahim Al Subaie",
        gender: "male",
      },
      {
        screen: 4,
        abstractId: "A-044",
        title:
          "Using Upper Extremity Functional Index and Lower Extremity Functional Scale to Predict Functional Exercise Capacity in People with Heart Failure: A Cross-Sectional Study",
        author: "Abdulaziz K Alshamasi",
        gender: "male",
      },
      {
        screen: 5,
        abstractId: "A-054",
        title:
          "Level of Knowledge of Pelvic Floor Anatomy, Exercises, and Dysfunction Among Antenatal and Postnatal Women in Saudi Arabia",
        author: "Layan Dhafer Aldrees",
        gender: "female",
      },
      {
        screen: 6,
        abstractId: "A-075",
        title:
          "Predicting Falls Among Older Adults Undergoing Hemodialysis: A Mixed-Methods Study",
        author: "Waleed Adnan Alqurashi",
        gender: "male",
      },
      {
        screen: 7,
        abstractId: "A-079",
        title:
          "Concussion-Related Knowledge, Attitudes, and Clinical Decision Making Among Physiotherapists Across Saudi Arabia: A Nationwide Cross-Sectional Study",
        author: "Hanan Alharbi",
        gender: "female",
      },
      {
        screen: 8,
        abstractId: "A-083",
        title:
          "Immediate Motor and Postural Responses to Peroneal Nerve Stimulation",
        author: "Dr. Rehab Aljuhni",
        gender: "female",
      },
      {
        screen: 9,
        abstractId: "A-122",
        title:
          "Usual Gait Speed Among Community-Dwelling Saudi Adults: A Preliminary Cross-Sectional Study",
        author: "Renad Hassan Alzahrani",
        gender: "female",
      },
      {
        screen: 10,
        abstractId: "A-124",
        title:
          "Effectiveness of Rehabilitation Programs for Common Sports Injuries: A Systematic Review and Meta-Analysis",
        author: "Rakan Abdullah Alwabel",
        gender: "male",
      },
    ],
  },
  {
    id: "session-r4",
    sessionCode: "Session R4",
    titleEn: "Neurological, Pediatric & Sensorimotor Rehabilitation",
    titleAr: "إعادة التأهيل العصبي، الأطفال والتأهيل الحسي الحركي",
    dayEn: "Day 2",
    dayAr: "اليوم الثاني",
    timeEn: "Poster display 13:30–16:30",
    timeAr: "عرض الملصقات 13:30–16:30",
    tagColor: "from-[#11517E] to-[#6FC4BC]",
    posters: [
      {
        screen: 1,
        abstractId: "A-021",
        title:
          "Effect of Aquatic Therapy Intervention in a Patient with Multiple Sclerosis - A Case Report",
        author: "Rosane Barroso Caetano",
        gender: "female",
      },
      {
        screen: 2,
        abstractId: "A-022",
        title:
          "Phase-Dependent Cerebellar Contributions to Visual Working Memory: An Online Triple-Pulse Transcranial Magnetic Stimulation Study",
        author: "Ali Abdullah Fajea",
        gender: "male",
      },
      {
        screen: 3,
        abstractId: "A-040",
        title:
          "Exploring the Effects of Remotely Supervised Transcranial Direct Current Stimulation on Motor Outcomes in Multiple Sclerosis: A Systematic Review",
        author: "Hind Almotiri",
        gender: "female",
      },
      {
        screen: 4,
        abstractId: "A-048",
        title: "The Effect of Exercise on Gut Microbiota in Autism",
        author: "Norah Saeed Alqahtani",
        gender: "female",
      },
      {
        screen: 5,
        abstractId: "A-058",
        title:
          "Perceptions and Practices of Contemporary Physiotherapy Approaches for Upper Limb Rehabilitation Post-Stroke: A Cross-Sectional Survey of Physiotherapists in Saudi Arabia",
        author: "Anas Mohammed AlHafidh",
        gender: "male",
      },
      {
        screen: 6,
        abstractId: "A-062",
        title:
          "The Feasibility of Sensory Integration Balance Training (Sensory Walking Pathway) for Children with Cerebral Palsy",
        author: "Dalia Fahad Binshaye",
        gender: "female",
      },
      {
        screen: 7,
        abstractId: "A-096",
        title:
          "Daytime Sleepiness and Its Association with Neck Disability, Fatigue, and Psychological Well-Being in University Students: A Cross-Sectional Study",
        author: "Ahmed Ali Mohammed Torad",
        gender: "male",
      },
      {
        screen: 8,
        abstractId: "A-104",
        title:
          "Correlation Between Forward Head Posture, Postural Control and Ankle Function",
        author: "Hebatalla Maaz Abdelrafi Magbol",
        gender: "female",
      },
      {
        screen: 9,
        abstractId: "A-108",
        title:
          "Current Knowledge and Practice of Post-Stroke Unilateral Spatial Neglect Rehabilitation Among Saudi Arabian Physiotherapists",
        author: "Mohammed Awadh M Alqarni",
        gender: "male",
      },
      {
        screen: 10,
        abstractId: "A-064",
        title:
          "Low-Intensity Pulsed Ultrasound Does Not Induce Early Fibroblast Activation: Evidence for Selective Nanomechanical Stimulation Favoring Cardiac Regeneration",
        author: "Philippe Germain",
        gender: "male",
      },
    ],
  },
];

const MaleAvatarIcon = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full object-cover"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100" height="100" rx="50" fill="#E8F1F5" />
    {/* Body / Shoulders */}
    <path
      d="M18 90C18 72 32 64 50 64C68 64 82 72 82 90"
      fill="#11517E"
    />
    {/* Neck */}
    <path d="M42 54H58V66H42V54Z" fill="#F1C27D" />
    {/* Head */}
    <circle cx="50" cy="40" r="18" fill="#FCD5A2" />
    {/* Hair */}
    <path
      d="M32 38C32 26 40 20 50 20C60 20 68 26 68 38C68 40 66 33 60 30C54 27 46 27 40 30C34 33 32 40 32 38Z"
      fill="#2C3E50"
    />
    {/* Collar / Tie accent */}
    <path d="M47 64L50 72L53 64H47Z" fill="#6FC4BC" />
  </svg>
);

export const ScientificPostersSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  // Elastic collapse: default open first session, others collapsed
  const [openSessions, setOpenSessions] = useState<Record<string, boolean>>({
    "session-r1": true,
    "session-r2": false,
    "session-r3": false,
    "session-r4": false,
  });

  const toggleSession = (id: string) => {
    setOpenSessions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    POSTER_SESSIONS.forEach((s) => (all[s.id] = true));
    setOpenSessions(all);
  };

  const collapseAll = () => {
    const none: Record<string, boolean> = {};
    POSTER_SESSIONS.forEach((s) => (none[s.id] = false));
    setOpenSessions(none);
  };

  const isAllOpen = Object.values(openSessions).every(Boolean);

  return (
    <section
      id="scientific-posters"
      className="scroll-mt-24 sm:scroll-mt-32 w-full "
      dir={isRTL ? "rtl" : "ltr"}
    >
      
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 sm:w-9 sm:h-9 text-[#11517E]" />
              <span>
                {language === "ar"
                  ? "جلسات عرض الملصقات العلمية (Poster Display)"
                  : "Posters Sessions"}
              </span>
            </h2>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={isAllOpen ? collapseAll : expandAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all active:scale-95 border border-slate-200"
            >
              <Layers className="w-4 h-4 text-[#11517E]" />
              <span>
                {isAllOpen
                  ? language === "ar"
                    ? "طي الكل"
                    : "Collapse All"
                  : language === "ar"
                  ? "توسيع الكل"
                  : "Expand All"}
              </span>
            </button>
          </div>
        </div>

        {/* Sessions Accordion List */}
        <div className="mt-8 space-y-6">
          {POSTER_SESSIONS.map((session, idx) => {
            const isOpen = !!openSessions[session.id];

            return (
              <div
                key={session.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#11517E]/30 bg-white shadow-lg ring-1 ring-[#11517E]/10"
                    : "border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Session Header / Trigger */}
                <button
                  type="button"
                  onClick={() => toggleSession(session.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-7 flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="flex  items-start gap-4 flex-1">
                    {/* Session Badge */}
                    <div
                      className={`w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${session.tagColor} text-white flex flex-col items-center justify-center font-black shrink-0 shadow-md`}
                    >
                      <span className="text-[7px] sm:text-xs opacity-90 uppercase">
                        {language === "ar" ? "جلسة" : "Session"}
                      </span>
                      <span className="text-xs sm:text-lg leading-none font-black">
                        R{idx + 1}
                      </span>
                    </div>

                    {/* Session Information */}
                    <div className="flex-1 min-w-0 flex flex-col items-start gap-2">
                      {/* Session Title */}
                      <h3 className="text-base sm:text-xl font-black text-slate-900 leading-snug text-left">
                        {session.titleEn}
                      </h3>

                      {/* Session Date */}
                      <div className="flex flex-wrap items-start gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                          <Calendar className="w-3.5 h-3.5 text-[#55AE47]" />
                          {language === "ar" ? session.dayAr : session.dayEn}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-[#6FC4BC]" />
                          {language === "ar" ? session.timeAr : session.timeEn}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                          {session.posters.length}
                          {language === "ar" ? " ملصقات" : " Posters"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Arrow */}
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                      isOpen
                        ? "bg-[#11517E] text-white rotate-180 shadow-md"
                        : "bg-slate-200/80 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="border-t border-slate-100 p-4 sm:p-6 lg:p-8 bg-slate-50/40">
                        {/* Table Header Description on Desktop */}
                        <div className="hidden lg:grid lg:grid-cols-12 gap-4 pb-3 mb-4 border-b border-slate-200 text-xs font-extrabold text-slate-400 uppercase tracking-wider px-4">
                          <div className="col-span-1 text-center">
                            {language === "ar" ? "الشاشة" : "Screen"}
                          </div>
                          <div className="col-span-2 text-center">
                            {language === "ar" ? "رمز البحث" : "Abstract ID"}
                          </div>
                          <div className="col-span-6">
                            {language === "ar"
                              ? "عنوان الملصق العلمي"
                              : "Abstract Title"}
                          </div>
                          <div className="col-span-3">
                            {language === "ar" ? "الباحث / المؤلف" : "Author"}
                          </div>
                        </div>

                        {/* Posters Grid / List */}
                        <div className="space-y-3">
                          {session.posters.map((poster) => (
                            <motion.div
                              key={poster.abstractId}
                              whileHover={{ y: -2 }}
                              transition={{ duration: 0.2 }}
                              className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#6FC4BC] p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                                {/* Screen badge */}
                                <div className="lg:col-span-1 flex items-center gap-2 lg:justify-center">
                                  <div className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-black text-xs border border-slate-200 shadow-inner">
                                    <Monitor className="w-3.5 h-3.5 text-[#11517E]" />
                                    <span>{poster.screen}</span>
                                  </div>
                                  <span className="lg:hidden text-xs text-slate-400 font-semibold">
                                    {language === "ar" ? "شاشة رقم" : "Screen"}{" "}
                                    #{poster.screen}
                                  </span>
                                </div>

                                {/* Abstract ID badge */}
                                <div className="lg:col-span-2 flex items-center lg:justify-center">
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-blue-50 text-[#11517E] border border-blue-200/70 text-xs font-black font-mono shadow-sm">
                                    <Hash className="w-3 h-3 text-[#6FC4BC]" />
                                    {poster.abstractId}
                                  </span>
                                </div>

                                {/* Title (no character escaping, 100% exact verbatim) */}
                                <div className="lg:col-span-6">
                                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed hover:text-[#11517E] transition-colors select-text">
                                    {poster.title}
                                  </h4>
                                </div>

                                {/* Author with Male / Female Avatar */}
                                <div className="lg:col-span-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex items-center gap-3">
                                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shrink-0 border-2 border-[#6FC4BC]/40 shadow-sm bg-slate-50 flex items-center justify-center">
                                    {poster.gender === "female" ? (
                                      <img
                                        src={femaleAvatar}
                                        alt={poster.author}
                                        className="w-full h-full object-cover scale-110"
                                        loading="lazy"
                                      />
                                    ) : (
                                      <MaleAvatarIcon />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                      {language === "ar" ? "الباحث" : "Author"}
                                    </div>
                                    <div className="text-xs sm:text-sm font-extrabold text-[#11517E] truncate">
                                      {poster.author}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      
    </section>
  );
};

export default ScientificPostersSection;
