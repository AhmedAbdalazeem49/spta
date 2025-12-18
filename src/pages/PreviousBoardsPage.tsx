import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
  Crown,
  Shield,
  Medal,
  History,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AOS from "aos";

interface BoardMember {
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  isChairman?: boolean;
  isViceChairman?: boolean;
}

interface BoardTerm {
  id: string;
  term: string;
  termEn: string;
  year: string;
  yearEn: string;
  achievements: string[];
  achievementsEn: string[];
  members: BoardMember[];
  highlight?: string;
  highlightEn?: string;
}

const PreviousBoardsPage = () => {
  const { t, isRTL } = useLanguage();
  const [expandedBoard, setExpandedBoard] = useState<string | null>(null);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const boardTerms: BoardTerm[] = [
    {
      id: "1",
      term: "المجلس الخامس",
      termEn: "Fifth Board",
      year: "2021 - 2024",
      yearEn: "2021 - 2024",
      highlight: "تحقيق رؤية 2030",
      highlightEn: "Achieving Vision 2030",
      achievements: [
        "إطلاق منصة التعليم الإلكتروني",
        "توقيع 15 اتفاقية شراكة دولية",
        "زيادة عدد الأعضاء بنسبة 200%",
        "إقامة 50+ فعالية علمية",
      ],
      achievementsEn: [
        "Launching e-learning platform",
        "Signing 15 international partnership agreements",
        "200% increase in membership",
        "Hosting 50+ scientific events",
      ],
      members: [
        { name: "د. أحمد محمد الغامدي", nameEn: "Dr. Ahmed Mohammed Al-Ghamdi", role: "رئيس المجلس", roleEn: "Chairman", isChairman: true },
        { name: "د. فاطمة علي العتيبي", nameEn: "Dr. Fatima Ali Al-Otaibi", role: "نائب الرئيس", roleEn: "Vice Chairman", isViceChairman: true },
        { name: "د. خالد سعد القحطاني", nameEn: "Dr. Khalid Saad Al-Qahtani", role: "أمين المجلس", roleEn: "Secretary" },
        { name: "د. نورة محمد الشمري", nameEn: "Dr. Noura Mohammed Al-Shammari", role: "أمين الصندوق", roleEn: "Treasurer" },
        { name: "د. عبدالله فهد الدوسري", nameEn: "Dr. Abdullah Fahad Al-Dosari", role: "عضو", roleEn: "Member" },
        { name: "د. سارة عبدالرحمن المالكي", nameEn: "Dr. Sara Abdulrahman Al-Malki", role: "عضو", roleEn: "Member" },
      ],
    },
    {
      id: "2",
      term: "المجلس الرابع",
      termEn: "Fourth Board",
      year: "2018 - 2021",
      yearEn: "2018 - 2021",
      highlight: "التحول الرقمي",
      highlightEn: "Digital Transformation",
      achievements: [
        "تطوير الموقع الإلكتروني الجديد",
        "إطلاق تطبيق الجمعية للهواتف",
        "تأسيس 8 فروع إقليمية جديدة",
        "استضافة المؤتمر الدولي الأول",
      ],
      achievementsEn: [
        "Developing new website",
        "Launching association mobile app",
        "Establishing 8 new regional branches",
        "Hosting first international conference",
      ],
      members: [
        { name: "د. محمد عبدالله الحربي", nameEn: "Dr. Mohammed Abdullah Al-Harbi", role: "رئيس المجلس", roleEn: "Chairman", isChairman: true },
        { name: "د. عائشة سعيد الزهراني", nameEn: "Dr. Aisha Saeed Al-Zahrani", role: "نائب الرئيس", roleEn: "Vice Chairman", isViceChairman: true },
        { name: "د. عمر حسن السلمي", nameEn: "Dr. Omar Hassan Al-Sulami", role: "أمين المجلس", roleEn: "Secretary" },
        { name: "د. هند فيصل العنزي", nameEn: "Dr. Hind Faisal Al-Anzi", role: "أمين الصندوق", roleEn: "Treasurer" },
        { name: "د. سلطان ناصر الشهري", nameEn: "Dr. Sultan Nasser Al-Shahri", role: "عضو", roleEn: "Member" },
      ],
    },
    {
      id: "3",
      term: "المجلس الثالث",
      termEn: "Third Board",
      year: "2015 - 2018",
      yearEn: "2015 - 2018",
      highlight: "التوسع والنمو",
      highlightEn: "Expansion & Growth",
      achievements: [
        "مضاعفة عدد الأعضاء",
        "إطلاق المجلة العلمية",
        "تنظيم ورش عمل تخصصية",
        "بناء شراكات مع الجامعات",
      ],
      achievementsEn: [
        "Doubling membership",
        "Launching scientific journal",
        "Organizing specialized workshops",
        "Building university partnerships",
      ],
      members: [
        { name: "د. سعود علي المطيري", nameEn: "Dr. Saud Ali Al-Mutairi", role: "رئيس المجلس", roleEn: "Chairman", isChairman: true },
        { name: "د. ليلى محمد الرشيد", nameEn: "Dr. Laila Mohammed Al-Rashid", role: "نائب الرئيس", roleEn: "Vice Chairman", isViceChairman: true },
        { name: "د. فهد عبدالعزيز البقمي", nameEn: "Dr. Fahad Abdulaziz Al-Bogami", role: "أمين المجلس", roleEn: "Secretary" },
        { name: "د. منى سالم الخالدي", nameEn: "Dr. Mona Salem Al-Khalidi", role: "عضو", roleEn: "Member" },
      ],
    },
    {
      id: "4",
      term: "المجلس الثاني",
      termEn: "Second Board",
      year: "2012 - 2015",
      yearEn: "2012 - 2015",
      highlight: "البناء المؤسسي",
      highlightEn: "Institutional Building",
      achievements: [
        "وضع اللوائح والأنظمة",
        "تأسيس اللجان الفرعية",
        "إطلاق برنامج العضوية",
        "تنظيم أول مؤتمر سنوي",
      ],
      achievementsEn: [
        "Establishing bylaws and regulations",
        "Creating sub-committees",
        "Launching membership program",
        "Organizing first annual conference",
      ],
      members: [
        { name: "د. عبدالرحمن خالد العمري", nameEn: "Dr. Abdulrahman Khalid Al-Omari", role: "رئيس المجلس", roleEn: "Chairman", isChairman: true },
        { name: "د. أمل ناصر الجبرين", nameEn: "Dr. Amal Nasser Al-Jabreen", role: "نائب الرئيس", roleEn: "Vice Chairman", isViceChairman: true },
        { name: "د. يوسف سلمان الغامدي", nameEn: "Dr. Yousef Salman Al-Ghamdi", role: "أمين المجلس", roleEn: "Secretary" },
      ],
    },
    {
      id: "5",
      term: "المجلس التأسيسي",
      termEn: "Founding Board",
      year: "2009 - 2012",
      yearEn: "2009 - 2012",
      highlight: "البداية",
      highlightEn: "The Beginning",
      achievements: [
        "تأسيس الجمعية رسمياً",
        "الحصول على الترخيص",
        "بناء الهيكل التنظيمي",
        "استقطاب الأعضاء المؤسسين",
      ],
      achievementsEn: [
        "Official establishment of association",
        "Obtaining official license",
        "Building organizational structure",
        "Recruiting founding members",
      ],
      members: [
        { name: "د. إبراهيم عبدالله الشريف", nameEn: "Dr. Ibrahim Abdullah Al-Sharif", role: "رئيس المجلس", roleEn: "Chairman", isChairman: true },
        { name: "د. خديجة محمد الحسيني", nameEn: "Dr. Khadija Mohammed Al-Husseini", role: "نائب الرئيس", roleEn: "Vice Chairman", isViceChairman: true },
        { name: "د. طارق أحمد النعيمي", nameEn: "Dr. Tariq Ahmed Al-Nuaimi", role: "أمين المجلس", roleEn: "Secretary" },
      ],
    },
  ];

  const toggleBoard = (id: string) => {
    setExpandedBoard(expandedBoard === id ? null : id);
  };

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-primary to-navy" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-2 h-2 bg-primary-foreground rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 opacity-20"
        >
          <Crown className="w-24 h-24 text-primary-foreground" />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 opacity-20"
        >
          <Award className="w-32 h-32 text-primary-foreground" />
        </motion.div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20"
            >
              <History className="w-14 h-14 text-primary-foreground" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">
              {t("المجالس السابقة", "Previous Boards")}
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
              {t(
                "رحلة من الإنجاز والتميز عبر مسيرة الجمعية السعودية للعلاج الطبيعي",
                "A journey of achievement and excellence throughout SPTA's history"
              )}
            </p>
            
            {/* Timeline Navigation Dots */}
            <div className="flex justify-center gap-4 mb-12">
              {boardTerms.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    setActiveTimelineItem(index);
                    setExpandedBoard(boardTerms[index].id);
                  }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    activeTimelineItem === index
                      ? "bg-primary-foreground scale-125"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-primary-foreground mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Timeline */}
      <section className="py-16 bg-secondary/30 overflow-hidden">
        <div className="container-custom">
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border transform -translate-y-1/2" />
            
            {/* Timeline Items */}
            <div className="flex justify-between items-center relative">
              {boardTerms.map((board, index) => (
                <motion.div
                  key={board.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveTimelineItem(index);
                      setExpandedBoard(board.id);
                      // Scroll to board section
                      document.getElementById(`board-${board.id}`)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${
                      activeTimelineItem === index
                        ? "bg-primary text-primary-foreground shadow-glow scale-110"
                        : "bg-card text-foreground border-2 border-border hover:border-primary"
                    }`}
                  >
                    {index === 0 ? (
                      <Crown className="w-7 h-7" />
                    ) : index === boardTerms.length - 1 ? (
                      <Star className="w-7 h-7" />
                    ) : (
                      <Shield className="w-7 h-7" />
                    )}
                  </motion.button>
                  
                  <div className={`mt-4 text-center transition-all duration-300 ${
                    activeTimelineItem === index ? "opacity-100" : "opacity-60"
                  }`}>
                    <span className="block font-bold text-foreground text-sm">
                      {t(board.term, board.termEn)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t(board.year, board.yearEn)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board Cards Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="space-y-8">
            {boardTerms.map((board, index) => (
              <motion.div
                key={board.id}
                id={`board-${board.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-3xl border transition-all duration-500 ${
                  expandedBoard === board.id
                    ? "border-primary shadow-lg bg-card"
                    : "border-border/50 bg-card/50 hover:bg-card hover:border-border"
                }`}
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleBoard(board.id)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-6">
                    {/* Term Badge */}
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-500 to-amber-600"
                          : index === boardTerms.length - 1
                          ? "bg-gradient-to-br from-primary to-accent"
                          : "bg-primary/10"
                      }`}
                    >
                      {index === 0 ? (
                        <Crown className={`w-10 h-10 ${index === 0 ? "text-white" : "text-primary"}`} />
                      ) : index === boardTerms.length - 1 ? (
                        <Star className="w-10 h-10 text-primary-foreground" />
                      ) : (
                        <Users className="w-10 h-10 text-primary" />
                      )}
                    </motion.div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                          {t(board.term, board.termEn)}
                        </h3>
                        {board.highlight && (
                          <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                            {t(board.highlight, board.highlightEn)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {t(board.year, board.yearEn)}
                        <span className="mx-2">•</span>
                        <Users className="w-4 h-4" />
                        {board.members.length} {t("عضو", "members")}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: expandedBoard === board.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-foreground" />
                  </motion.div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedBoard === board.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 border-t border-border/50 pt-6">
                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Members */}
                          <div>
                            <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Users className="w-5 h-5 text-primary" />
                              {t("أعضاء المجلس", "Board Members")}
                            </h4>
                            <div className="grid gap-3">
                              {board.members.map((member, memberIndex) => (
                                <motion.div
                                  key={memberIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: memberIndex * 0.05 }}
                                  className={`flex items-center gap-4 p-4 rounded-xl ${
                                    member.isChairman
                                      ? "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20"
                                      : member.isViceChairman
                                      ? "bg-accent/10 border border-accent/20"
                                      : "bg-secondary/50"
                                  }`}
                                >
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    member.isChairman
                                      ? "bg-yellow-500"
                                      : member.isViceChairman
                                      ? "bg-accent"
                                      : "bg-primary/10"
                                  }`}>
                                    {member.isChairman ? (
                                      <Crown className="w-6 h-6 text-white" />
                                    ) : member.isViceChairman ? (
                                      <Medal className="w-6 h-6 text-white" />
                                    ) : (
                                      <Users className="w-6 h-6 text-primary" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-foreground">
                                      {t(member.name, member.nameEn)}
                                    </p>
                                    <p className={`text-sm ${
                                      member.isChairman
                                        ? "text-yellow-600 dark:text-yellow-500"
                                        : member.isViceChairman
                                        ? "text-accent"
                                        : "text-muted-foreground"
                                    }`}>
                                      {t(member.role, member.roleEn)}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Achievements */}
                          <div>
                            <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Award className="w-5 h-5 text-primary" />
                              {t("الإنجازات", "Achievements")}
                            </h4>
                            <div className="space-y-3">
                              {board.achievements.map((achievement, achIndex) => (
                                <motion.div
                                  key={achIndex}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: achIndex * 0.05 }}
                                  className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl"
                                >
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Star className="w-4 h-4 text-primary" />
                                  </div>
                                  <p className="text-foreground">
                                    {t(achievement, board.achievementsEn[achIndex])}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("إرث من الإنجازات", "A Legacy of Achievements")}
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              {t(
                "على مدار 15 عاماً من العطاء والتميز",
                "Over 15 years of dedication and excellence"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "5", label: t("مجالس إدارية", "Board Terms") },
              { number: "25+", label: t("قائد ومسؤول", "Leaders & Officials") },
              { number: "100+", label: t("إنجاز", "Achievements") },
              { number: "15", label: t("عام من التميز", "Years of Excellence") },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="text-center"
              >
                <span className="text-5xl md:text-6xl font-bold block mb-2">{stat.number}</span>
                <span className="text-primary-foreground/70">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto" data-aos="zoom-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("كن جزءاً من المستقبل", "Be Part of the Future")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t(
                "انضم إلينا وكن جزءاً من الفصل القادم في مسيرة الجمعية السعودية للعلاج الطبيعي",
                "Join us and be part of the next chapter in SPTA's journey"
              )}
            </p>
            <Button size="lg" className="gap-2">
              {t("انضم للجمعية", "Join SPTA")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PreviousBoardsPage;
