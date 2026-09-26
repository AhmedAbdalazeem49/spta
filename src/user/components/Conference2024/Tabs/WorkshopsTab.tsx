import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Users, X, CheckCircle2 } from "lucide-react";

const workshopsData = {
  morning: [
    {
      id: "m1",
      title: "Clinical Reasoning in Cervicothoracic Disorders",
      speaker: "Dr. Terrence McGee",
      time: "08:00 AM - 12:00 PM",
      teaser: "Master advanced clinical reasoning frameworks for the cervical and thoracic spine.",
      bio: "International manual therapy expert with 20+ years academic experience.",
      objectives: [
        "Apply clinical reasoning frameworks",
        "Differentiate cervical and thoracic dysfunction sources",
        "Demonstrate advanced manual therapy techniques",
        "Integrate patient-centered assessment"
      ]
    },
    {
      id: "m2",
      title: "Speaking Up in Elite Sport",
      speaker: "Dr. Sian Knott",
      time: "08:00 AM - 12:00 PM",
      teaser: "Explore communication and psychological safety in high-performance environments.",
      bio: "Sport psychologist working with Olympic athletes.",
      objectives: [
        "Understand communication dynamics in high-performance settings",
        "Develop assertive strategies",
        "Manage psychological safety",
        "Apply evidence-based athlete wellbeing approaches"
      ]
    },
    {
      id: "m3",
      title: "From Rehabilitation to Performance: Integrating OPT",
      speaker: "Ms. Tahani AlMahdi",
      time: "08:00 AM - 12:00 PM",
      teaser: "Bridge the gap between late-stage rehab and return-to-sport performance.",
      bio: "Saudi certified performance trainer specializing in return-to-sport.",
      objectives: [
        "Understand OPT model principles",
        "Bridge rehab and sport performance",
        "Design progressive return-to-sport programs",
        "Integrate strength and conditioning"
      ]
    },
    {
      id: "m4",
      title: "Physiotherapy in Chronic Overlapping Pain Conditions",
      speaker: "Dr. Ali Alatar",
      time: "08:00 AM - 12:00 PM",
      teaser: "Develop comprehensive strategies for complex chronic pain patients.",
      bio: "Pain medicine specialist with expertise in pain neuroscience.",
      objectives: [
        "Recognize chronic overlapping pain conditions",
        "Apply pain neuroscience education",
        "Select appropriate physiotherapy interventions",
        "Develop patient-centered pain management plans"
      ]
    },
    {
      id: "m5",
      title: "A Practical Approach to Acute Vertigo and BPPV",
      speaker: "Dr. Doaa AlSharif",
      coSpeaker: "Mrs. Maryam ALShammari",
      time: "08:00 AM - 12:00 PM",
      teaser: "Hands-on techniques for assessing and treating common vestibular disorders.",
      bio: "Vestibular rehabilitation specialist with expertise in balance disorders.",
      coBio: "Co-specialist in vestibular rehabilitation and clinical practice.",
      objectives: [
        "Conduct systematic vestibular assessment",
        "Differentiate BPPV variants",
        "Perform Epley and Semont maneuvers",
        "Develop vestibular rehabilitation programs"
      ]
    }
  ],
  afternoon: [
    {
      id: "a1",
      title: "Aquatic Therapy Beyond the Pool",
      speaker: "Mr. Mohamed Zedan",
      time: "01:00 PM - 05:00 PM",
      teaser: "Discover the therapeutic power of water for complex neurological rehabilitation.",
      bio: "Pioneer in aquatic physiotherapy with 15 years clinical experience.",
      objectives: [
        "Understand physiological effects of water immersion",
        "Apply Halliwick principles",
        "Design aquatic therapy programs for neurological conditions",
        "Explore technology in aquatic rehab"
      ]
    },
    {
      id: "a2",
      title: "Using Musculoskeletal Ultrasound",
      speaker: "Mr. Jaffar Alabdrabalrasol",
      time: "01:00 PM - 05:00 PM",
      teaser: "Integrate point-of-care diagnostic ultrasound into your routine practice.",
      bio: "Saudi MSK ultrasound specialist with extensive diagnostic training.",
      objectives: [
        "Understand basic ultrasound physics",
        "Identify MSK structures on ultrasound",
        "Perform guided assessment of tendons and joints",
        "Integrate ultrasound in routine assessment"
      ]
    },
    {
      id: "a3",
      title: "From Physical Stimuli to Biological Adaptation",
      speaker: "Dr. Philippe Germain",
      time: "01:00 PM - 05:00 PM",
      teaser: "The science of how the body adapts to precise mechanical loading.",
      bio: "French researcher in exercise physiology and biological response to training.",
      objectives: [
        "Explain how physical stimuli trigger adaptation",
        "Apply progressive overload safely",
        "Understand hormonal and neural adaptations",
        "Design evidence-based training protocols"
      ]
    },
    {
      id: "a4",
      title: "Better Teams, Better Care",
      speaker: "Ms. Halah Aldhuaian",
      time: "01:00 PM - 05:00 PM",
      teaser: "Transform interprofessional team dynamics for improved patient outcomes.",
      bio: "Healthcare leadership consultant specializing in interprofessional collaboration.",
      objectives: [
        "Define effective interprofessional team dynamics",
        "Apply conflict resolution strategies",
        "Develop communication frameworks",
        "Build psychological safety in healthcare"
      ]
    },
    {
      id: "a5",
      title: "From Risk to Readiness",
      speaker: "Dr. Mohammed Alshehri",
      coSpeaker: "Dr. Monira Aldhahi",
      time: "01:00 PM - 05:00 PM",
      teaser: "Data-driven injury prevention and athletic readiness screening.",
      bio: "Sports physiotherapist and injury prevention expert with national-level experience.",
      coBio: "MSc, DPT, PhD (Hons), FHEA, AT-IBCT. Associate Professor of Rehabilitation Sciences and Consultant Physical Therapist at KAAUH. Head of CHRS Research Unit, College of Health and Rehabilitation Sciences, Princess Nourah bint Abdulrahman University. World Rugby Medical Educator.",
      objectives: [
        "Conduct functional movement assessments",
        "Identify injury risk factors",
        "Design individualized prevention programs",
        "Apply data-driven readiness approaches"
      ]
    }
  ]
};

type Workshop = (typeof workshopsData.morning)[0];

export const WorkshopsTab = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const renderWorkshopCard = (workshop: Workshop) => (
    <motion.div
      key={workshop.id}
      whileHover={{ y: -5 }}
      onClick={() => setSelectedWorkshop(workshop)}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100 dark:border-slate-700 cursor-pointer hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:w-2 transition-all duration-300"></div>
      
      <div className="flex-1 pl-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">{workshop.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-2 italic">"{workshop.teaser}"</p>
        
        <div className="mt-auto space-y-2">
          {/* Main speaker */}
          <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-200">
            <User className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
            {workshop.speaker}
          </div>
          {/* Co-speaker badge */}
          {workshop.coSpeaker && (
            <div className="flex items-center gap-2">
              <span className="flex items-center text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-full px-2.5 py-1">
                <Users className="w-3 h-3 mr-1.5 shrink-0" />
                Co-Speaker: {workshop.coSpeaker}
              </span>
            </div>
          )}
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Clock className="w-4 h-4 mr-2 text-amber-500 shrink-0" />
            {workshop.time}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 text-center text-blue-600 dark:text-blue-400 text-sm font-bold group-hover:text-blue-700 dark:group-hover:text-blue-300">
        View Details &rarr;
      </div>
    </motion.div>
  );

  return (
    <div className="py-12">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b-2 border-slate-200 dark:border-slate-800 pb-4 inline-block">Morning Workshops - Saturday 14 November (08:00 AM - 12:00 PM)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopsData.morning.map(renderWorkshopCard)}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b-2 border-slate-200 dark:border-slate-800 pb-4 inline-block">Afternoon Workshops - Saturday 14 November (01:00 PM - 05:00 PM)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopsData.afternoon.map(renderWorkshopCard)}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedWorkshop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWorkshop(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button 
                onClick={() => setSelectedWorkshop(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>

              <div className="p-5 sm:p-6 md:p-8">
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold mb-6 flex items-center w-max">
                  <Clock className="w-4 h-4 mr-2" />
                  {selectedWorkshop.time}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                  {selectedWorkshop.title}
                </h2>
                
                {/* Speaker section */}
                <div className={`grid gap-4 mb-8 ${selectedWorkshop.coSpeaker ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                  {/* Main Speaker */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Speaker</span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">{selectedWorkshop.speaker}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedWorkshop.bio}</p>
                  </div>

                  {/* Co-Speaker (if exists) */}
                  {selectedWorkshop.coSpeaker && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-5 border border-purple-200 dark:border-purple-800/50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">Co-Speaker</span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">{selectedWorkshop.coSpeaker}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedWorkshop.coBio}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                    Learning Objectives
                  </h4>
                  <ul className="space-y-4">
                    {selectedWorkshop.objectives.map((obj, i) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex items-start"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-200 text-lg">{obj}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
