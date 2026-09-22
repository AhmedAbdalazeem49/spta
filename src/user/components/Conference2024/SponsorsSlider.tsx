import React from "react";
import { motion } from "framer-motion";
import { Award, Shield, Star } from "lucide-react";

export const SponsorsSlider = () => {
  const sponsors = [
    { name: "Sponsor 1", tier: "Gold" },
    { name: "Sponsor 2", tier: "Gold" },
    { name: "Sponsor 3", tier: "Gold" },
    { name: "Sponsor 4", tier: "Silver" },
    { name: "Sponsor 5", tier: "Silver" },
    { name: "Sponsor 6", tier: "Silver" },
    { name: "Sponsor 7", tier: "Bronze" },
    { name: "Sponsor 8", tier: "Bronze" },
    { name: "Sponsor 9", tier: "Bronze" },
  ];

  const tierConfigs = {
    Gold: {
      bg: "bg-amber-50 dark:bg-amber-900/30",
      border: "border-amber-400 dark:border-amber-500",
      text: "text-amber-700 dark:text-amber-400",
      glow: "hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]",
      badgeBg: "bg-amber-500 text-white",
      icon: <Award className="w-10 h-10 text-amber-500" />,
      width: "w-56 sm:w-72 md:w-80",
      height: "h-32 sm:h-40 md:h-48",
      duration: "40s"
    },
    Silver: {
      bg: "bg-slate-50 dark:bg-slate-800",
      border: "border-slate-400 dark:border-slate-500",
      text: "text-slate-700 dark:text-slate-300",
      glow: "hover:shadow-[0_0_40px_rgba(148,163,184,0.5)]",
      badgeBg: "bg-slate-500 text-white",
      icon: <Shield className="w-8 h-8 text-slate-400" />,
      width: "w-48 sm:w-64 md:w-72",
      height: "h-28 sm:h-36 md:h-40",
      duration: "35s"
    },
    Bronze: {
      bg: "bg-rose-50 dark:bg-rose-900/30",
      border: "border-rose-400 dark:border-rose-500",
      text: "text-rose-700 dark:text-rose-400",
      glow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]",
      badgeBg: "bg-rose-500 text-white",
      icon: <Star className="w-6 h-6 text-rose-500" />,
      width: "w-40 sm:w-56 md:w-64",
      height: "h-24 sm:h-28 md:h-32",
      duration: "30s"
    }
  };

  const renderTierRow = (tierName: "Gold" | "Silver" | "Bronze", reverse: boolean = false) => {
    const tierSponsors = sponsors.filter((s) => s.tier === tierName);
    // Triple the items for seamless scrolling
    const seamlessItems = [...tierSponsors, ...tierSponsors, ...tierSponsors];
    const config = tierConfigs[tierName];

    return (
      <div className="relative mb-16 last:mb-0">
        <div className="flex justify-center mb-6 relative z-10">
          <div className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg ${config.badgeBg}`}>
            {tierName} Sponsors
          </div>
        </div>
        
        <div className="relative flex overflow-hidden group">
          {/* Gradient masks for smooth fade at edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10"></div>

          <motion.div
            className="flex space-x-8 w-max"
            animate={{
              translateX: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: parseFloat(config.duration),
            }}
          >
            {seamlessItems.map((sponsor, i) => (
              <div
                key={i}
                className={`flex-shrink-0 flex flex-col items-center justify-center border-2 rounded-3xl transition-all duration-300 ${config.bg} ${config.border} ${config.glow} ${config.width} ${config.height} relative mx-4`}
              >
                <div className="absolute top-4 right-4 opacity-80">{config.icon}</div>
                <h3 className={`text-2xl font-bold ${config.text}`}>{sponsor.name}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden overflow-x-hidden">
      <div className="container mx-auto px-4 mb-20 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
        >
          Our Partners & Sponsors
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
        >
          We are proud to be supported by industry leaders who share our vision for advancing healthcare and physiotherapy excellence.
        </motion.p>
      </div>

      <div className="flex flex-col">
        {renderTierRow("Gold")}
        {renderTierRow("Silver", true)}
        {renderTierRow("Bronze")}
      </div>
    </section>
  );
};
