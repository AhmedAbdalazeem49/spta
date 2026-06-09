"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, User } from "lucide-react";
import React, { useState } from "react";

interface Branch {
  id: string;
  name: string;
  nameAr: string;
  director: string;
  directorAr: string;
}

const branches: Branch[] = [
  {
    id: "riyadh",
    name: "Riyadh Branch",
    nameAr: "فرع الرياض",
    director: "Dr. Nawaf Abdulaziz Al-Hatem",
    directorAr: "د. نواف عبدالعزيز الحاتم",
  },
  {
    id: "jeddah",
    name: "Jeddah Branch",
    nameAr: "فرع جدة",
    director: "Mr. Ahmed Tarek Al-Hasawi",
    directorAr: "أ. أحمد طارق الحساوي",
  },
  {
    id: "makkah",
    name: "Makkah Branch",
    nameAr: "فرع مكة المكرمة",
    director: "Ms. Razan Hatem Qarout",
    directorAr: "أ. رزان حاتم قاروت",
  },
  {
    id: "taif",
    name: "Taif Branch",
    nameAr: "فرع الطائف",
    director: "Mr. Rakan Khaled Al-Qurashi",
    directorAr: "أ. راكان خالد القرشي",
  },
  {
    id: "madinah",
    name: "Madinah Branch",
    nameAr: "فرع المدينة",
    director: "Mr. Majed Yahya Mudhaffar",
    directorAr: "أ. ماجد يحيى مظفر",
  },
  {
    id: "eastern",
    name: "Eastern Province Branch",
    nameAr: "فرع الشرقية",
    director: "Ms. Hayaa Jasim Al-Dosari",
    directorAr: "أ. هياء جاسم الدوسري",
  },
  {
    id: "asir",
    name: "Asir Branch",
    nameAr: "فرع عسير",
    director: "Ms. Shareefa Abdullah Al-Maalawi",
    directorAr: "أ. شريفة عبدالله آل معلوي",
  },
  {
    id: "tabuk",
    name: "Tabuk Branch",
    nameAr: "فرع تبوك",
    director: "Dr. Youssef Mushabib Al-Shahri",
    directorAr: "د. يوسف مشبب الشهري",
  },
  {
    id: "qassim",
    name: "Qassim Branch",
    nameAr: "فرع القصيم",
    director: "Dr. Sattam Majoul Al-Mutairi",
    directorAr: "د. سطام مجول المطيري",
  },
  {
    id: "hail",
    name: "Hail Branch",
    nameAr: "فرع حائل",
    director: "Mr. Waleed Sulaiman Al-Tuwaiher",
    directorAr: "أ. وليد سليمان الطويهر",
  },
  {
    id: "najran",
    name: "Najran Branch",
    nameAr: "فرع نجران",
    director: "Dr. Abdullah Mohammed Al-Khraim",
    directorAr: "د. عبدالله محمد آل خريم",
  },
  {
    id: "jouf",
    name: "Al-Jouf Branch",
    nameAr: "فرع الجوف",
    director: "Ms. Malak Fayez Al-Ruwaili",
    directorAr: "أ. ملاك فايز الرويلي",
  },
  {
    id: "jazan",
    name: "Jazan Branch",
    nameAr: "فرع جازان",
    director: "Dr. Mohammed Mansour Al-Shahri",
    directorAr: "د. محمد منصور الشهري",
  },
];

const BranchesSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeBranch, setActiveBranch] = useState<Branch>(branches[0]);

  return (
    <section
      id="branches"
      className="py-24 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide">
            {t("فروعنا", "Our Branches")}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-foreground">
            {t("فروع الجمعية حول المملكة", "SPTA Branches Across Saudi Arabia")}
          </h2>

          <p className="text-muted-foreground mt-4 text-lg">
            {t(
              "13 فرعاً تغطي جميع مناطق المملكة",
              "13 branches covering all regions of the Kingdom",
            )}
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT: Branch List */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-card border rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {t("اختر الفرع", "Select Branch")}
              </h3>

              <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-2">
                {branches.map((branch) => {
                  const isActive = activeBranch.id === branch.id;

                  return (
                    <button
                      key={branch.id}
                      onClick={() => setActiveBranch(branch)}
                      className={`w-full text-start rounded-xl p-3 transition-all duration-300 border ${
                        isActive
                          ? "bg-primary text-white shadow-md border-primary"
                          : "bg-background hover:bg-muted border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 w-2.5 h-2.5 rounded-full ${
                            isActive ? "bg-white" : "bg-primary"
                          }`}
                        />

                        <div className="flex-1">
                          <div className="font-semibold text-sm">
                            {language === "ar" ? branch.nameAr : branch.name}
                          </div>

                          <div className="text-xs opacity-80 mt-1">
                            {language === "ar"
                              ? branch.directorAr
                              : branch.director}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Active Branch Preview */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeBranch.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-card border rounded-2xl p-10 shadow-lg"
            >
              {/* Title */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">
                  {language === "ar" ? activeBranch.nameAr : activeBranch.name}
                </h3>

                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                  نشط
                </span>
              </div>

              {/* Director Card */}
              <div className="grid md:grid-cols-1 gap-6">
                <div className="p-6 rounded-xl border bg-muted/30">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <User className="w-4 h-4" />
                    <span className="text-sm">
                      {t("مدير الفرع", "Branch Director")}
                    </span>
                  </div>

                  <p className="font-semibold text-lg">
                    {language === "ar"
                      ? activeBranch.directorAr
                      : activeBranch.director}
                  </p>
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-8 text-sm text-muted-foreground">
                {t(
                  "يمكنك اختيار أي فرع من القائمة لعرض التفاصيل.",
                  "Select any branch from the list to view details.",
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
