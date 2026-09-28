import codecs

content = '''import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, User, CheckCircle2, List, Sun, Moon, Calendar, MapPin, Briefcase } from "lucide-react";

interface WorkshopAgenda {
  time: string;
  topic: string;
}

interface Speaker {
  name: string;
  title: string;
}

interface Workshop {
  id: string;
  title: string;
  timePeriod: "Morning" | "Afternoon";
  time: string;
  speakers: Speaker[];
  objectives: string[];
  agenda: WorkshopAgenda[];
}

const WORKSHOPS: Workshop[] = [
  // MORNING WORKSHOPS
  {
    id: "w1",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title: "Clinical Reasoning in Cervicothoracic Disorders: Integrating Clinical Practice Guidelines into Complex Patient Management",
    speakers: [
      {
        name: "Dr. Terrence McGee, PT, DScPT",
        title: "Board-Certified Clinical Specialist in Orthopaedic Physical Therapy\\nFellow, American Academy of Orthopaedic Manual Physical Therapists\\nDirector of Strategic Operations, Assistant Professor\\nDepartment of Physical Therapy, University of Delaware, USA"
      }
    ],
    objectives: [
      "Distinguish clinical practice guidelines from clinical reasoning in cervicothoracic care.",
      "Apply guideline recommendations to the patient's presentation, irritability, context, and changing clinical findings.",
      "Develop and reassess hypothesis-driven examination and intervention plans.",
      "Integrate manual therapy, exercise, education, and reassessment into individualised management plans.",
      "Reflect on complex cases involving uncertainty and competing management options."
    ],
    agenda: [
      { time: "08:00 - 08:30", topic: "When Experts Disagree: understanding clinical reasoning under uncertainty through an authentic cervicothoracic case." },
      { time: "08:30 - 09:10", topic: "Clinical Practice Guidelines as decision-support tools: contemporary recommendations, evidence synthesis, classification, and appropriate integration into individualized care." },
      { time: "09:10 - 09:25", topic: "Break" },
      { time: "09:25 - 10:15", topic: "Reasoning through examination and intervention: hypothesis refinement, manual therapy, therapeutic exercise, progression, and reassessment." },
      { time: "10:15 - 10:45", topic: "Managing complexity beyond the guideline: irritability, psychosocial considerations, multiple impairments, and evolving presentations." },
      { time: "10:45 - 11:00", topic: "Break" },
      { time: "11:00 - 11:45", topic: "Progressive case laboratory: teams defend examination findings, clinical decisions, intervention choices, and alternative management strategies." },
      { time: "11:45 - 12:00", topic: "Final reflection, implementation commitments, key clinical messages, and questions." }
    ]
  },
  {
    id: "w2",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title: "Speaking Up in Elite Sport",
    speakers: [
      {
        name: "Dr. Sian Knott, DAHP, PT",
        title: "Lecturer in Physiotherapy\\nSchool of Healthcare Sciences\\nCardiff University, UK"
      }
    ],
    objectives: [
      "Recognise the personal, cultural, professional, and organisational influences on speaking up.",
      "Identify barriers and enablers of workplace voice.",
      "Assess the urgency and potential harm associated with a concern.",
      "Distinguish observable facts from assumptions and interpretations.",
      "Choose appropriate routes for raising or escalating concerns.",
      "Use the SPEAK structure to communicate concerns clearly and professionally.",
      "Respond in ways that promote psychological safety, trust, and dialogue.",
      "Identify practical actions that strengthen a speaking-up culture."
    ],
    agenda: [
      { time: "08:00 - 08:10", topic: "Welcome, learning outcomes, and working agreements." },
      { time: "08:10 - 08:25", topic: "Opening reflection: conditions that enable or inhibit speaking up." },
      { time: "08:25 - 08:35", topic: "Research findings and four connected themes." },
      { time: "08:35 - 09:00", topic: "System-mapping activity: identifying organisational barriers and enablers." },
      { time: "09:00 - 09:30", topic: "Scenario triage: assessing risk, urgency, potential harm, and an appropriate response." },
      { time: "09:30 - 09:45", topic: "Break" },
      { time: "09:45 - 09:50", topic: "Introducing the SPEAK conversation structure." },
      { time: "09:50 - 10:25", topic: "Speaking-up rehearsal in triads using realistic elite-sport scenarios." },
      { time: "10:25 - 10:30", topic: "How to receive a concern well." },
      { time: "10:30 - 11:00", topic: "Receiving-concerns rehearsal in triads." },
      { time: "11:00 - 11:20", topic: "Conceptual framework and culture audit." },
      { time: "11:20 - 11:30", topic: "Break" },
      { time: "11:30 - 11:55", topic: "Designing change and developing practical action plans." },
      { time: "11:55 - 12:00", topic: "Commitments, key takeaways, and close." }
    ]
  },
  {
    id: "w3",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title: "From Rehabilitation to Performance: Integrating the Optimum Performance Training (OPT) for Female Athletes",
    speakers: [
      {
        name: "Ms. Tahani AlMahdi, MSc, PT",
        title: "Saudi Academy of Sports Sciences\\nSaudi Arabia"
      }
    ],
    objectives: [
      "Explain how the Optimum Performance Training (OPT) model bridges rehabilitation and return to performance.",
      "Identify physiological and biomechanical considerations specific to female athletes.",
      "Apply the OPT model to progressive, evidence-informed rehabilitation and performance programmes.",
      "Integrate movement assessment and corrective exercise to optimise function and reduce reinjury risk.",
      "Develop safe return-to-sport plans that support long-term athletic performance."
    ],
    agenda: [
      { time: "08:00 - 08:15", topic: "Introduction: the rehabilitation-to-performance continuum and why female-athlete considerations matter." },
      { time: "08:15 - 08:45", topic: "Foundations of the OPT Model: phases, principles, and application across rehabilitation and return to sport." },
      { time: "08:45 - 09:15", topic: "Female-athlete considerations: physiology, biomechanics, common injury patterns, load management, and recovery." },
      { time: "09:15 - 09:45", topic: "Assessment and clinical decision-making: movement assessment, corrective exercise principles, criteria-based progression, and return-to-performance decisions." },
      { time: "09:45 - 10:00", topic: "Break" },
      { time: "10:00 - 10:30", topic: "Practical lab 1: movement assessment, including overhead squat, single-leg squat, balance, and landing mechanics." },
      { time: "10:30 - 11:00", topic: "Practical lab 2: corrective exercise and early performance training — inhibition, lengthening, activation, integration, and stabilisation endurance." },
      { time: "11:00 - 11:30", topic: "Practical lab 3: progression through the OPT Model — strength, power, agility, exercise selection, and coaching cues." },
      { time: "11:30 - 11:50", topic: "Practical lab 4: case-based rehabilitation-to-performance programme design and group feedback." },
      { time: "11:50 - 12:00", topic: "Key takeaways, safe return-to-sport principles, and questions." }
    ]
  },
  {
    id: "w4",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title: "Physiotherapy in Chronic Overlapping Pain Conditions: From Complexity to Clinical Practice",
    speakers: [
      {
        name: "Dr. Aly Alatar, PhD, PT",
        title: "Consultant Physiotherapist and Pain Specialist\\nFounder, Kinesia Clinic\\nKuwait"
      }
    ],
    objectives: [
      "Define chronic overlapping pain conditions and recognise common presentations.",
      "Recognise features of multisystem and nociplastic pain.",
      "Assess pain mechanisms, physical capacity, fatigue, sleep, autonomic symptoms, psychosocial factors, and activity tolerance.",
      "Identify symptom triggers and relievers to guide management decisions.",
      "Develop individualised plans using education, exercise, pacing, graded exposure, load management, and lifestyle strategies.",
      "Adapt exercise to symptom irritability, flare-ups, fatigue, and recovery response.",
      "Apply clinical reasoning and identify when multidisciplinary management or referral is needed."
    ],
    agenda: [
      { time: "08:00 - 08:30", topic: "Understanding Chronic Overlapping Pain Conditions: common presentations, nociplastic pain, and multisystem involvement." },
      { time: "08:30 - 09:10", topic: "Physiotherapy assessment: pain, fatigue, sleep, activity tolerance, symptom triggers, contextual factors, and red flags." },
      { time: "09:10 - 09:45", topic: "Clinical reasoning and patient classification: irritability, functional capacity, treatment priorities, and patient subgroups." },
      { time: "09:45 - 10:00", topic: "Break" },
      { time: "10:00 - 10:45", topic: "Physiotherapy management: education, pacing, graded exposure, load management, flare management, and lifestyle factors." },
      { time: "10:45 - 11:25", topic: "Exercise prescription practical workshop: selection, dosing, progression, regression, and monitoring symptom response." },
      { time: "11:25 - 11:50", topic: "Complex clinical cases: assessment priorities, treatment planning, exercise modification, and multidisciplinary referral." },
      { time: "11:50 - 12:00", topic: "Summary, key clinical messages, questions, and next-step reflection." }
    ]
  },
  {
    id: "w5",
    timePeriod: "Morning",
    time: "08:00 - 12:00",
    title: "A Practical Approach to Acute Vertigo and Benign Paroxysmal Positional Vertigo",
    speakers: [
      {
        name: "Dr. Doaa AlSharif, PhD, PT, AVRT, CRCs, MSc",
        title: "Assistant professor\\nCollege of Applied Medical Sciences, Physical therapy Department\\nTaif University, Saudi Arabia"
      },
      {
        name: "Mrs. Maryam Alshammari, MSc, PT. AVPT",
        title: "Cochlear Implant Department\\nHafar Albaten Central Hospital"
      }
    ],
    objectives: [
      "Explain the pathophysiology and clinical presentation of posterior, horizontal, and anterior canal BPPV.",
      "Perform evidence-based bedside tests for positional vertigo.",
      "Differentiate peripheral BPPV from urgent causes of acute vertigo.",
      "Select and perform the appropriate canalith repositioning manoeuvre.",
      "Apply clinical reasoning through case discussion and supervised practice."
    ],
    agenda: [
      { time: "08:00 - 08:10", topic: "Welcome, workshop objectives, and pre-assessment." },
      { time: "08:10 - 08:40", topic: "Vestibular anatomy and physiology." },
      { time: "08:40 - 09:10", topic: "Pathophysiology and clinical presentation of BPPV: posterior, horizontal, and anterior canals." },
      { time: "09:10 - 09:40", topic: "Clinical assessment: history taking, positional tests, nystagmus interpretation, and differential diagnosis." },
      { time: "09:40 - 09:55", topic: "Acute vertigo in the Emergency Department: red flags, vestibular triage, and referral pathways." },
      { time: "09:55 - 10:10", topic: "Break" },
      { time: "10:10 - 10:35", topic: "Live demonstration of bedside assessment and canal-specific repositioning manoeuvres." },
      { time: "10:35 - 11:30", topic: "Supervised hands-on practice: Dix–Hallpike, Supine Roll Test, Epley, Semont, Gufoni, BBQ Roll, and Deep Head-Hanging manoeuvres." },
      { time: "11:30 - 11:50", topic: "Case-based discussions and clinical decision-making." },
      { time: "11:50 - 12:00", topic: "Questions, key take-home messages, post-assessment, and workshop evaluation." }
    ]
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
        title: "Physiotherapist - Hydrotherapy Supervisor\\nAlmoosa Rehabilitation Hospital\\nSaudi Arabia"
      }
    ],
    objectives: [
      "Explain the core principles of Water Specific Therapy in neurorehabilitation.",
      "Apply evidence-informed aquatic interventions to improve movement, balance, and function.",
      "Use clinical reasoning to plan, progress, and regress aquatic interventions.",
      "Integrate aquatic techniques to support mobility, independence, and daily participation."
    ],
    agenda: [
      { time: "13:00 - 13:15", topic: "Welcome, learning outcomes, participant screening, pool safety briefing, and pre-assessment." },
      { time: "13:15 - 13:45", topic: "Water Specific Therapy principles: water properties, movement control, balance, buoyancy, and neurorehabilitation goals." },
      { time: "13:45 - 14:15", topic: "Clinical assessment and treatment planning: indications, contraindications, consent, risk management, and goal setting." },
      { time: "14:15 - 14:30", topic: "Break and pool transition." },
      { time: "14:30 - 15:00", topic: "Demonstration: handling, alignment, balance reactions, gait preparation, and safe therapist positioning." },
      { time: "15:00 - 15:50", topic: "Practical station 1: movement, balance, transfers, and functional mobility in the aquatic environment." },
      { time: "15:50 - 16:05", topic: "Break and equipment reset." },
      { time: "16:05 - 16:50", topic: "Practical station 2: treatment progression, task-specific practice, fatigue monitoring, and adapting interventions to patient response." },
      { time: "16:50 - 17:00", topic: "Case integration, post-assessment, key safety messages, and close." }
    ]
  },
  {
    id: "w7",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title: "Using Musculoskeletal Ultrasound as an Objective Outcome Measure in Rehabilitation",
    speakers: [
      {
        name: "Mr. Jaffar Alabdrabalrasol, MSc, PT",
        title: "Senior Physiotherapist\\nDepartment of Physiotherapy\\nQatif Central Hospital, Saudi Arabia"
      }
    ],
    objectives: [
      "Explain the role of musculoskeletal ultrasound as an objective outcome measure in postoperative rehabilitation.",
      "Select appropriate scanning settings for the suprapatellar recess and quadriceps.",
      "Perform reproducible scans and measure suprapatellar effusion depth.",
      "Measure quadriceps thickness at rest and during contraction, and calculate limb symmetry.",
      "Use real-time ultrasound biofeedback to facilitate quadriceps activation.",
      "Interpret affected- and sound-limb measurements to identify inhibition patterns."
    ],
    agenda: [
      { time: "13:00 - 13:25", topic: "Welcome, objectives, and the early rehabilitation gap after ACL reconstruction." },
      { time: "13:25 - 13:55", topic: "Why objective measurement matters: ultrasound assessment of effusion, muscle morphology, and arthrogenic inhibition." },
      { time: "13:55 - 14:15", topic: "Ultrasound fundamentals: transducer selection, presets, image optimisation, knobology, and common artefacts." },
      { time: "14:15 - 14:30", topic: "Break and station setup." },
      { time: "14:30 - 15:15", topic: "Practical station A: suprapatellar recess imaging, patient positioning, probe placement, and effusion-depth measurement." },
      { time: "15:15 - 16:00", topic: "Practical station B: quadriceps thickness at rest and during activation, landmarking, reproducibility, and limb symmetry." },
      { time: "16:00 - 16:15", topic: "Break and station reset." },
      { time: "16:15 - 17:00", topic: "Practical station C: real-time ultrasound biofeedback for quadriceps activation, interpretation of paired measurements, case integration, and post-assessment." }
    ]
  },
  {
    id: "w8",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title: "From Physical Stimuli to Biological Adaptation: Understanding Mechanobiology for the Future of Physiotherapy",
    speakers: [
      {
        name: "Dr. Philippe Germain, PhD",
        title: "Associate Professor\\nUniversity of Orléans, France"
      }
    ],
    objectives: [
      "Explain the principles of mechanobiology and mechanotransduction.",
      "Describe how physical stimuli regulate intracellular signalling.",
      "Explain the role of satellite cells in skeletal-muscle regeneration.",
      "Distinguish diagnostic ultrasound from therapeutic ultrasound.",
      "Summarise the rationale for and limitations of Low-Intensity Pulsed Ultrasound (LIPUS).",
      "Discuss how experimental mechanobiology may translate into future clinical applications."
    ],
    agenda: [
      { time: "13:00 - 13:15", topic: "Welcome, learning outcomes, and framing the evidence-to-clinic question." },
      { time: "13:15 - 14:00", topic: "Why does physiotherapy work? From biomechanics to molecular biology: physical environments, mechanobiology, mechanotransduction, cytoskeleton, nucleus, and gene activation." },
      { time: "14:00 - 14:40", topic: "Satellite cells and muscle regeneration: stem cells, tissue repair, fibroblasts, extracellular matrix, and clinical implications for rehabilitation." },
      { time: "14:40 - 14:55", topic: "Break" },
      { time: "14:55 - 15:35", topic: "Ultrasound beyond imaging: therapeutic Low-Intensity Pulsed Ultrasound, mechanical stimulation, experimental evidence, and current limitations." },
      { time: "15:35 - 16:15", topic: "From laboratory to clinical physiotherapy: cell culture, ex vivo models, in vivo translation, ageing, sarcopenia, sports injuries, and regenerative rehabilitation." },
      { time: "16:15 - 16:30", topic: "Break" },
      { time: "16:30 - 16:50", topic: "Evidence appraisal activity: mapping a proposed biological mechanism to a testable clinical question and identifying gaps in translation." },
      { time: "16:50 - 17:00", topic: "Future directions, key takeaways, questions, and close." }
    ]
  },
  {
    id: "w9",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title: "Better Teams, Better Care: Leadership for High-Performing Physiotherapy Practice",
    speakers: [
      {
        name: "Ms. Halah Aldhuaian, MSc, PT",
        title: "Senior Physiotherapist\\nRiyadh First Health Cluster-Long Term Care Hospital\\nSaudi Arabia"
      }
    ],
    objectives: [
      "Distinguish clinical excellence from clinical leadership and explain their complementary roles.",
      "Identify the characteristics and leadership behaviours of high-performing physiotherapy teams.",
      "Apply leadership and coaching strategies to improve engagement, communication, and change management.",
      "Use practical leadership tools to strengthen team performance, patient experience, and quality improvement.",
      "Develop a personalised action plan for team effectiveness and patient-centred care."
    ],
    agenda: [
      { time: "13:00 - 13:15", topic: "Opening and setting the stage: welcome, overview, and why clinical excellence alone is not enough." },
      { time: "13:15 - 13:45", topic: "Leading high-performing physiotherapy teams: clinical leadership versus management, team characteristics, and behaviours that influence outcomes." },
      { time: "13:45 - 14:15", topic: "Leadership in practice: coaching, feedback, delegation, accountability, and leading through change." },
      { time: "14:15 - 14:30", topic: "Break" },
      { time: "14:30 - 15:00", topic: "Practical leadership toolkit: coaching conversations, feedback and feedforward, delegation, and quality-improvement tools." },
      { time: "15:00 - 15:40", topic: "Case-based team challenge: small-group analysis of physiotherapy leadership scenarios, solutions, presentations, and facilitated discussion." },
      { time: "15:40 - 15:55", topic: "Break" },
      { time: "15:55 - 16:25", topic: "Communication, staff engagement, resistance to change, and building psychological safety in rehabilitation services." },
      { time: "16:25 - 16:50", topic: "Individual exercise: create a 30-day leadership action plan with one behaviour, one improvement initiative, and success indicators." },
      { time: "16:50 - 17:00", topic: "Key takeaways, reflection, questions, and close." }
    ]
  },
  {
    id: "w10",
    timePeriod: "Afternoon",
    time: "13:00 - 17:00",
    title: "From Risk to Readiness: Integrating Physical and Psychosocial Factors in Sports Rehabilitation",
    speakers: [
      {
        name: "Dr. Mohammed Alshehri, PT, MSc, PhD",
        title: "Associate professor, Physical Therapy Department\\nJazan University, Saudi Arabia"
      },
      {
        name: "Dr. Monira Aldahi, MSc, DPT, PhD (Hons), FHEA, AT-IBCT",
        title: "Associate Professor of Rehabilitation Sciences\\nConsultant Physical Therapy at KAAUH\\nHead of CHRS Research unit\\nPrincess Nourah bint Abdulrahman University\\nWorld Rugby Medical Educator"
      }
    ],
    objectives: [
      "Identify physiological and psychological factors associated with sports injury risk.",
      "Perform and interpret functional assessments of strength, balance, fatigue, and movement.",
      "Recognise how stress, anxiety, self-efficacy, resilience, fear of reinjury, and readiness affect rehabilitation.",
      "Integrate physical and psychological findings into a multidimensional athlete profile.",
      "Design individualised injury-prevention and rehabilitation strategies targeting modifiable factors."
    ],
    agenda: [
      { time: "13:00 - 13:20", topic: "Introduction — beyond the physical: sports injury risk and the multidimensional biopsychosocial approach." },
      { time: "13:20 - 13:50", topic: "Physiological risk factors: strength, endurance, fatigue, fitness, balance, flexibility, neuromuscular control, and movement performance." },
      { time: "13:50 - 14:20", topic: "Psychological risk factors: self-efficacy, resilience, stress, anxiety, motivation, fear of re-injury, and psychological readiness." },
      { time: "14:20 - 14:40", topic: "Multidimensional risk assessment: integrating physiological and psychological findings into an athlete profile." },
      { time: "14:40 - 14:55", topic: "Break" },
      { time: "14:55 - 16:10", topic: "Practical assessment stations: strength and power, dynamic balance, hop and agility testing, fatigue and endurance, and structured psychological screening." },
      { time: "16:10 - 16:40", topic: "Case-based integration: interpreting athlete profiles, identifying protective and modifiable risk factors, and setting rehabilitation targets." },
      { time: "16:40 - 16:55", topic: "Injury-prevention and rehabilitation planning: individualised strategies, monitoring, and appropriately cautious return-to-sport decisions." },
      { time: "16:55 - 17:00", topic: "Summary, key messages, questions, and close." }
    ]
  }
];

export const WorkshopsTab = () => {
  const { language } = useLanguage();

  const renderWorkshop = (w: Workshop, index: number) => {
    const isMorning = w.timePeriod === "Morning";
    const themeBg = isMorning 
      ? "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/50" 
      : "bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800/50";
    
    const themeText = isMorning ? "text-amber-700 dark:text-amber-400" : "text-indigo-700 dark:text-indigo-400";
    const headerBg = isMorning ? "bg-amber-100/50 dark:bg-amber-900/30" : "bg-indigo-100/50 dark:bg-indigo-900/30";
    
    return (
      <div key={w.id} className={`w-full rounded-3xl border-2 overflow-hidden mb-12 shadow-sm hover:shadow-md transition-shadow ${themeBg}`}>
        {/* Header Section */}
        <div className={`p-6 md:p-8 ${headerBg} border-b border-inherit flex flex-col md:flex-row md:items-start justify-between gap-6`}>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-white dark:bg-slate-800 shadow-sm ${themeText}`}>
                {isMorning ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                Workshop {index + 1}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-white dark:bg-slate-800 shadow-sm text-slate-700 dark:text-slate-300`}>
                <Clock className="w-4 h-4 text-blue-500" />
                {w.time} (4 Hours)
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              {w.title}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Speakers & Objectives */}
          <div className="lg:w-1/3 flex flex-col gap-8">
            <div>
              <h4 className="flex items-center gap-2 text-xl font-black text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                <Users className={`w-6 h-6 ${themeText}`} />
                {w.speakers.length > 1 ? "Speakers" : "Speaker"}
              </h4>
              <div className="space-y-6">
                {w.speakers.map((speaker, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-sm shrink-0 ${isMorning ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-indigo-400 to-purple-500'}`}>
                      {speaker.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-lg">{speaker.name}</div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1 whitespace-pre-line leading-relaxed">
                        {speaker.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-xl font-black text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                <CheckCircle2 className={`w-6 h-6 ${themeText}`} />
                Objectives
              </h4>
              <ul className="space-y-3">
                {w.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isMorning ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                    <span className="leading-relaxed font-medium">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Agenda */}
          <div className="lg:w-2/3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
            <h4 className="flex items-center gap-2 text-xl font-black text-slate-800 dark:text-slate-200 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
              <List className={`w-6 h-6 ${themeText}`} />
              Agenda
            </h4>
            
            <div className="space-y-0">
              {w.agenda.map((item, idx) => {
                const isBreak = item.topic.toLowerCase().includes("break");
                return (
                  <div key={idx} className={`flex flex-col sm:flex-row border-b border-slate-100 dark:border-slate-800 last:border-0 ${isBreak ? 'bg-slate-50 dark:bg-slate-800/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'} transition-colors`}>
                    <div className={`sm:w-40 shrink-0 p-4 font-bold ${isBreak ? 'text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                      {item.time}
                    </div>
                    <div className={`flex-1 p-4 font-medium leading-relaxed ${isBreak ? 'text-slate-500 italic' : 'text-slate-800 dark:text-slate-200'}`}>
                      {item.topic}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
        </div>
      </div>
    );
  };

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="mb-12 text-center md:text-start">
        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
          {language === "ar" ? "ورش العمل" : "Workshops"}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-bold text-xl mb-2 flex items-center justify-center md:justify-start gap-2">
          <Calendar className="w-5 h-5" /> Saturday 14 November 2026
        </p>
        <p className="text-slate-600 dark:text-slate-300 font-medium max-w-3xl">
          Morning workshops run from 08:00 to 12:00. Afternoon workshops run from 13:00 to 17:00. Every agenda below totals exactly four hours, including breaks.
        </p>
      </div>

      {/* Morning Section */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-xl text-amber-600 dark:text-amber-400">
            <Sun className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Morning Sessions</h3>
            <p className="text-amber-600 dark:text-amber-500 font-bold">08:00 AM - 12:00 PM</p>
          </div>
        </div>
        
        <div>
          {WORKSHOPS.filter(w => w.timePeriod === "Morning").map((w, idx) => renderWorkshop(w, idx))}
        </div>
      </div>

      {/* Afternoon Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Moon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Afternoon Sessions</h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold">01:00 PM - 05:00 PM</p>
          </div>
        </div>
        
        <div>
          {WORKSHOPS.filter(w => w.timePeriod === "Afternoon").map((w, idx) => renderWorkshop(w, idx + 5))}
        </div>
      </div>

    </div>
  );
};
'''

with codecs.open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
