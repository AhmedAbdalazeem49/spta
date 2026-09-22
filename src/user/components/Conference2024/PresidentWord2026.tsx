import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import con1Image from "@/assets/dr.jpg";

export const PresidentWord2026 = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-slate-950 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: President Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-5/12 flex flex-col items-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="relative p-2 rounded-full border-2 border-amber-500/30 bg-slate-900/50 backdrop-blur-sm">
                <img
                  src={con1Image}
                  alt="Dr. Abdulfattah Saeed Alqahtani"
                  className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 object-cover rounded-full shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-serif font-bold text-white tracking-wide">
                Dr. Abdulfattah Saeed Alqahtani
              </h3>
              <p className="text-amber-400 font-medium mt-2 text-lg uppercase tracking-widest">
                President of Saudi Physical Therapy Association
              </p>
            </div>
          </motion.div>

          {/* Right: Speech Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-7/12 relative"
          >
            <Quote className="absolute -top-10 -left-10 w-24 h-24 text-amber-500/10 rotate-180 z-0" />
            
            <div className="relative z-10 space-y-6 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                <span className="text-amber-500">Welcome to the 6th</span> Saudi International Physiotherapy Conference.
              </h2>
              
              <p>
                It is my great pleasure to welcome you, organized by the Saudi Physical Therapy Association in strategic partnership with Almoosa Health Group, under the theme <strong className="text-amber-400 font-semibold">Physiotherapy in Saudi Arabia: Leadership, Innovation and Value-Based Impact</strong>. This theme reflects our shared commitment to advancing the physiotherapy profession in line with Saudi Vision 2030.
              </p>
              
              <p>
                As healthcare continues to transform, physiotherapists are increasingly recognized as leaders in delivering integrated, evidence-based, and patient-centered care. This conference brings together distinguished experts, researchers, clinicians, educators, and future leaders.
              </p>
              
              <p>
                Through inspiring keynotes, interactive workshops, scientific presentations, and multidisciplinary discussions, this conference aims to advance leadership, promote evidence-based practice, encourage innovation, and prepare the profession for tomorrow. 
              </p>
              
              <p className="text-xl text-white font-medium italic pt-4 border-t border-slate-800">
                I warmly welcome you and thank you for being part of this important gathering.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
