"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award, UserCheck, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Stats() {
  const { t } = useLanguage();

  // Stats data is self-contained
  const stats = {
    total: 5234,
    male: 3156,
    female: 2078,
    active: 4521,
    honorary: 45,
    associate: 668,
  };

  // Counter animation
  const AnimatedCounter = ({
    target,
    duration = 2000,
  }: {
    target: number;
    duration?: number;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [target, duration]);

    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <section>


      {/* Stats Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Total Members */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-12 shadow-2xl">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <div className="text-6xl md:text-8xl font-bold mb-4">
                <AnimatedCounter target={stats.total} />
              </div>
              <p className="text-2xl text-white/80">
                {t("إجمالي الأعضاء", "Total Members")}
              </p>
            </div>
          </motion.div>

          {/* Gender Distribution */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                label: t("الأعضاء الذكور", "Male Members"),
                count: stats.male,
                color: "from-blue-500 to-blue-700",
              },
              {
                label: t("الأعضاء الإناث", "Female Members"),
                count: stats.female,
                color: "from-pink-500 to-rose-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 text-white relative overflow-hidden`}
              >
                <div className="absolute top-4 end-4 opacity-20">
                  <UserCheck className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
                  <div className="text-5xl md:text-6xl font-bold mb-4">
                    <AnimatedCounter target={item.count} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 bg-white/30 rounded-full flex-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(item.count / stats.total) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                    <span className="text-xl font-bold">
                      {Math.round((item.count / stats.total) * 100)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Membership Types */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Users,
                label: t("العضوية العاملة", "Active Members"),
                count: stats.active,
                color: "from-emerald-500 to-teal-600",
              },
              {
                icon: Award,
                label: t("العضوية الشرفية", "Honorary Members"),
                count: stats.honorary,
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: UserCheck,
                label: t("عضوية الانتساب", "Associate Members"),
                count: stats.associate,
                color: "from-purple-500 to-indigo-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-all text-center"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter target={item.count} />
                </div>
                <p className="text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
