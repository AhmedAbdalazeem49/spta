import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeakerImg from '@/assets/spta-speaker-1.jpeg';

const speakersData = {
  keynote: [
    { name: "Dr. Terrence McGee", role: "Clinical Reasoning", location: "Ireland", bio: "Renowned expert in clinical reasoning and manual therapy frameworks." },
    { name: "Dr. Philippe Germain", role: "Exercise Physiology", location: "France", bio: "Leading researcher in biological adaptation and exercise stimulus." },
  ],
  invited: [
    { name: "Dr. Sian Knott", role: "Elite Sport Psychology", location: "UK", bio: "Sport psychologist working with Olympic athletes on performance and wellbeing." },
    { name: "Dr. Ali Alatar", role: "Chronic Pain", location: "Saudi Arabia", bio: "Pain medicine specialist with expertise in pain neuroscience." },
    { name: "Dr. Doaa AlSharif", role: "Vestibular", location: "Saudi Arabia", bio: "Vestibular rehabilitation specialist with expertise in balance disorders." },
  ],
  panelists: [
    { name: "Ms. Tahani AlMahdi", role: "OPT", location: "Saudi Arabia", bio: "Saudi certified performance trainer specializing in return-to-sport." },
    { name: "Mr. Mohamed Zedan", role: "Aquatic Therapy", location: "Egypt", bio: "Pioneer in aquatic physiotherapy with 15 years clinical experience." },
    { name: "Mr. Jaffar Alabdrabalrasol", role: "MSK Ultrasound", location: "Saudi Arabia", bio: "Saudi MSK ultrasound specialist with extensive diagnostic training." },
  ],
  moderators: [
    { name: "Ms. Halah Aldhuaian", role: "Team Dynamics", location: "Saudi Arabia", bio: "Healthcare leadership consultant specializing in interprofessional collaboration." },
    { name: "Dr. Mohammed Alshehri", role: "Sports Readiness", location: "Saudi Arabia", bio: "Sports physiotherapist and injury prevention expert." },
  ]
};

export const SpeakersTab = () => {
  return (
    <div className="space-y-12 md:space-y-20 py-12">
      
      {/* KEYNOTE SPEAKERS */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Keynote Speakers</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="flex flex-col gap-8">
          {speakersData.keynote.map((speaker, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl group"
            >
              <div className="md:w-2/5 h-56 sm:h-64 md:h-auto relative overflow-hidden">
                <img src={SpeakerImg} alt={speaker.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 md:hidden"></div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2">{speaker.role} &mdash; {speaker.location}</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">{speaker.name}</h3>
                <p className="text-slate-300 text-lg leading-relaxed font-light">{speaker.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INVITED SPEAKERS */}
      <section>
        <div className="mb-10 text-left border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Invited Experts</h2>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {speakersData.invited.map((speaker, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="break-inside-avoid bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-l-8 border-l-blue-500 overflow-hidden relative group"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={SpeakerImg} alt={speaker.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/30" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{speaker.name}</h4>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-md mt-1">
                      {speaker.location}
                    </span>
                  </div>
                </div>
                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{speaker.role}</h5>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{speaker.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PANELISTS */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 py-3 px-8 inline-block rounded-full">
            Panelists
          </h2>
        </div>
        
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {speakersData.panelists.map((speaker, i) => (
            <PanelistPill key={i} speaker={speaker} />
          ))}
        </div>
      </section>

      {/* MODERATORS */}
      <section className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center font-serif">Session Moderators</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {speakersData.moderators.map((speaker, i) => (
            <div key={i} className="flex items-start gap-6 group cursor-pointer">
              <div className="w-20 h-20 shrink-0 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-400 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                {speaker.name.split(" ").slice(-2).map(n => n[0]).join("")}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{speaker.name}</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-3">{speaker.role} &bull; {speaker.location}</p>
                <p className="text-slate-600 dark:text-slate-300 italic">"{speaker.bio}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// Subcomponent for interactive Panelist Pill
const PanelistPill = ({ speaker }: { speaker: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      onClick={() => setIsOpen(!isOpen)}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between p-4 px-6">
        <div className="flex items-center gap-4">
          <img src={SpeakerImg} alt={speaker.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">{speaker.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{speaker.role}</p>
          </div>
        </div>
        <div className="text-slate-400">
          <svg className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 pt-2 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              <p>{speaker.bio}</p>
              <p className="text-sm text-slate-400 mt-2">Location: {speaker.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
