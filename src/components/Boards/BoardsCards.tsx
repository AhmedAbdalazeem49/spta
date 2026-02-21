"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Crown,
  Medal,
  Star,
  Award,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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

export default function BoardsCards() {
  const { t } = useLanguage();
  const [expandedBoard, setExpandedBoard] = useState<string | null>(null);

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
        {
          name: "د. أحمد محمد الغامدي",
          nameEn: "Dr. Ahmed Mohammed Al-Ghamdi",
          role: "رئيس المجلس",
          roleEn: "Chairman",
          isChairman: true,
        },
        {
          name: "د. فاطمة علي العتيبي",
          nameEn: "Dr. Fatima Ali Al-Otaibi",
          role: "نائب الرئيس",
          roleEn: "Vice Chairman",
          isViceChairman: true,
        },
        {
          name: "د. خالد سعد القحطاني",
          nameEn: "Dr. Khalid Saad Al-Qahtani",
          role: "أمين المجلس",
          roleEn: "Secretary",
        },
        {
          name: "د. نورة محمد الشمري",
          nameEn: "Dr. Noura Mohammed Al-Shammari",
          role: "أمين الصندوق",
          roleEn: "Treasurer",
        },
        {
          name: "د. عبدالله فهد الدوسري",
          nameEn: "Dr. Abdullah Fahad Al-Dosari",
          role: "عضو",
          roleEn: "Member",
        },
        {
          name: "د. سارة عبدالرحمن المالكي",
          nameEn: "Dr. Sara Abdulrahman Al-Malki",
          role: "عضو",
          roleEn: "Member",
        },
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
        {
          name: "د. محمد عبدالله الحربي",
          nameEn: "Dr. Mohammed Abdullah Al-Harbi",
          role: "رئيس المجلس",
          roleEn: "Chairman",
          isChairman: true,
        },
        {
          name: "د. عائشة سعيد الزهراني",
          nameEn: "Dr. Aisha Saeed Al-Zahrani",
          role: "نائب الرئيس",
          roleEn: "Vice Chairman",
          isViceChairman: true,
        },
        {
          name: "د. عمر حسن السلمي",
          nameEn: "Dr. Omar Hassan Al-Sulami",
          role: "أمين المجلس",
          roleEn: "Secretary",
        },
        {
          name: "د. هند فيصل العنزي",
          nameEn: "Dr. Hind Faisal Al-Anzi",
          role: "أمين الصندوق",
          roleEn: "Treasurer",
        },
        {
          name: "د. سلطان ناصر الشهري",
          nameEn: "Dr. Sultan Nasser Al-Shahri",
          role: "عضو",
          roleEn: "Member",
        },
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
        {
          name: "د. سعود علي المطيري",
          nameEn: "Dr. Saud Ali Al-Mutairi",
          role: "رئيس المجلس",
          roleEn: "Chairman",
          isChairman: true,
        },
        {
          name: "د. ليلى محمد الرشيد",
          nameEn: "Dr. Laila Mohammed Al-Rashid",
          role: "نائب الرئيس",
          roleEn: "Vice Chairman",
          isViceChairman: true,
        },
        {
          name: "د. فهد عبدالعزيز البقمي",
          nameEn: "Dr. Fahad Abdulaziz Al-Bogami",
          role: "أمين المجلس",
          roleEn: "Secretary",
        },
        {
          name: "د. منى سالم الخالدي",
          nameEn: "Dr. Mona Salem Al-Khalidi",
          role: "عضو",
          roleEn: "Member",
        },
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
        {
          name: "د. عبدالرحمن خالد العمري",
          nameEn: "Dr. Abdulrahman Khalid Al-Omari",
          role: "رئيس المجلس",
          roleEn: "Chairman",
          isChairman: true,
        },
        {
          name: "د. أمل ناصر الجبرين",
          nameEn: "Dr. Amal Nasser Al-Jabreen",
          role: "نائب الرئيس",
          roleEn: "Vice Chairman",
          isViceChairman: true,
        },
        {
          name: "د. يوسف سلمان الغامدي",
          nameEn: "Dr. Yousef Salman Al-Ghamdi",
          role: "أمين المجلس",
          roleEn: "Secretary",
        },
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
        {
          name: "د. إبراهيم عبدالله الشريف",
          nameEn: "Dr. Ibrahim Abdullah Al-Sharif",
          role: "رئيس المجلس",
          roleEn: "Chairman",
          isChairman: true,
        },
        {
          name: "د. خديجة محمد الحسيني",
          nameEn: "Dr. Khadija Mohammed Al-Husseini",
          role: "نائب الرئيس",
          roleEn: "Vice Chairman",
          isViceChairman: true,
        },
        {
          name: "د. طارق أحمد النعيمي",
          nameEn: "Dr. Tariq Ahmed Al-Nuaimi",
          role: "أمين المجلس",
          roleEn: "Secretary",
        },
      ],
    },
  ];

  const toggleBoard = (id: string) => {
    setExpandedBoard(expandedBoard === id ? null : id);
  };

  return (
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
                      <Crown className="w-10 h-10 text-white" />
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
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    member.isChairman
                                      ? "bg-yellow-500"
                                      : member.isViceChairman
                                      ? "bg-accent"
                                      : "bg-primary/10"
                                  }`}
                                >
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
                                  <p
                                    className={`text-sm ${
                                      member.isChairman
                                        ? "text-yellow-600 dark:text-yellow-500"
                                        : member.isViceChairman
                                        ? "text-accent"
                                        : "text-muted-foreground"
                                    }`}
                                  >
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
                                  {t(
                                    achievement,
                                    board.achievementsEn[achIndex]
                                  )}
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
  );
}
