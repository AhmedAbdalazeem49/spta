import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import con1Image from "@/assets/dr.jpg";

export const PresidentWord2026 = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 bg-[#f8fbfe] overflow-hidden">
      {/* Subtle background decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#11517E]/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6FC4BC]/20 to-transparent" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#6FC4BC]/6 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#11517E]/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,#11517E0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: President Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-5/12 flex flex-col items-center"
          >
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6FC4BC]/30 to-[#11517E]/20 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
              {/* Border ring */}
              <div className="relative p-1.5 rounded-full bg-gradient-to-br from-[#11517E] via-[#6FC4BC] to-[#55AE47] shadow-xl">
                <div className="p-1 rounded-full bg-white">
                  <img
                    src={con1Image}
                    alt="Dr. Abdulfattah Saeed Alqahtani"
                    className="w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-[#11517E] tracking-wide">
                Dr. Abdulfattah Saeed Alqahtani
              </h3>
              <p className="text-[#6FC4BC] font-semibold mt-1 text-sm uppercase tracking-widest">
                President of Saudi Physical Therapy Association
              </p>
            </div>
          </motion.div>

          {/* Right: Speech */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            {/* Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-[#11517E]/10 relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#11517E] via-[#6FC4BC] to-[#55AE47]" />

              {/* Big decorative quote */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-[#11517E]/8 rotate-180" />

              <div className="relative z-10 space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                {/* Opening headline */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[#11517E] leading-snug mb-6">
                  <span className="text-[#55AE47]">Welcome</span> to the 6th Saudi International Physiotherapy Conference.
                </h2>

                <p>
                  It is my great pleasure to welcome you, organized by the Saudi Physical Therapy Association in strategic partnership with Almoosa Health Group, under the theme{" "}
                  <strong className="text-[#11517E] font-semibold">
                    Physiotherapy in Saudi Arabia: Leadership, Innovation and Value-Based Impact
                  </strong>
                  . This theme reflects our shared commitment to advancing the physiotherapy profession in line with Saudi Vision 2030.
                </p>

                <p>
                  As healthcare continues to transform, physiotherapists are increasingly recognized as leaders in delivering integrated, evidence-based, and patient-centered care. This conference brings together distinguished experts, researchers, clinicians, educators, and future leaders.
                </p>

                <p>
                  Through inspiring keynotes, interactive workshops, scientific presentations, and multidisciplinary discussions, this conference aims to advance leadership, promote evidence-based practice, encourage innovation, and prepare the profession for tomorrow.
                </p>

                <div className="pt-5 border-t border-[#11517E]/10">
                  <p className="text-[#11517E] font-semibold italic text-base sm:text-lg">
                    I warmly welcome you and thank you for being part of this important gathering.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
