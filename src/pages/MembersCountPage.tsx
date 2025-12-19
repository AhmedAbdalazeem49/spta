import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Users, UserCheck, Award, Building2, MapPin, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const MembersCountPage = () => {
  const { t, isRTL } = useLanguage();

  const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
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

  const stats = {
    total: 5234,
    male: 3156,
    female: 2078,
    active: 4521,
    honorary: 45,
    associate: 668,
  };

  const regions = [
    { name: t("الرياض", "Riyadh"), count: 1850, percentage: 35 },
    { name: t("جدة", "Jeddah"), count: 1200, percentage: 23 },
    { name: t("الدمام", "Dammam"), count: 850, percentage: 16 },
    { name: t("مكة المكرمة", "Makkah"), count: 450, percentage: 9 },
    { name: t("المدينة المنورة", "Madinah"), count: 384, percentage: 7 },
    { name: t("مناطق أخرى", "Other Regions"), count: 500, percentage: 10 },
  ];

  const yearlyGrowth = [
    { year: "2020", members: 3200 },
    { year: "2021", members: 3800 },
    { year: "2022", members: 4400 },
    { year: "2023", members: 4900 },
    { year: "2024", members: 5234 },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Users className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("إحصائيات الأعضاء", "Members Statistics")}
            </h1>
            <p className="text-xl text-white/80">
              {t(
                "نفخر بمجتمعنا المتنامي من المتخصصين في العلاج الطبيعي",
                "We are proud of our growing community of PT specialists"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Stats */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Total Members */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            data-aos="zoom-in"
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
            <motion.div
              data-aos="fade-right"
              className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-4 end-4 opacity-20">
                <UserCheck className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2">{t("الأعضاء الذكور", "Male Members")}</h3>
                <div className="text-5xl md:text-6xl font-bold mb-4">
                  <AnimatedCounter target={stats.male} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-white/30 rounded-full flex-1">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(stats.male / stats.total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <span className="text-xl font-bold">{Math.round((stats.male / stats.total) * 100)}%</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              data-aos="fade-left"
              className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-4 end-4 opacity-20">
                <UserCheck className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2">{t("الأعضاء الإناث", "Female Members")}</h3>
                <div className="text-5xl md:text-6xl font-bold mb-4">
                  <AnimatedCounter target={stats.female} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-white/30 rounded-full flex-1">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(stats.female / stats.total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <span className="text-xl font-bold">{Math.round((stats.female / stats.total) * 100)}%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Membership Types */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Users, label: t("العضوية العاملة", "Active Members"), count: stats.active, color: "from-emerald-500 to-teal-600" },
              { icon: Award, label: t("العضوية الشرفية", "Honorary Members"), count: stats.honorary, color: "from-amber-500 to-orange-600" },
              { icon: UserCheck, label: t("عضوية الانتساب", "Associate Members"), count: stats.associate, color: "from-purple-500 to-indigo-600" },
            ].map((item, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-all text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
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

      {/* Regional Distribution */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("التوزيع الجغرافي", "Geographic Distribution")}
            </h2>
            <p className="text-muted-foreground">
              {t("انتشار أعضائنا في مختلف مناطق المملكة", "Our members across Saudi Arabia regions")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {regions.map((region, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="bg-card rounded-xl p-6 border border-border/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-foreground">{region.name}</span>
                  <span className="text-primary font-bold">{region.count.toLocaleString()}</span>
                </div>
                <div className="h-4 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${region.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
                <span className="text-sm text-muted-foreground mt-2 block">
                  {region.percentage}% {t("من إجمالي الأعضاء", "of total members")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Chart */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("نمو العضوية", "Membership Growth")}
            </h2>
            <p className="text-muted-foreground">
              {t("تطور أعداد الأعضاء خلال السنوات الأخيرة", "Member count growth over recent years")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between gap-4 h-64">
              {yearlyGrowth.map((year, index) => {
                const maxMembers = Math.max(...yearlyGrowth.map((y) => y.members));
                const heightPercentage = (year.members / maxMembers) * 100;
                return (
                  <motion.div
                    key={year.year}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="flex-1 flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPercentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="w-full bg-gradient-to-t from-primary to-accent rounded-t-xl relative group cursor-pointer"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {year.members.toLocaleString()}
                      </div>
                    </motion.div>
                    <span className="mt-4 font-bold text-foreground">{year.year}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MembersCountPage;
