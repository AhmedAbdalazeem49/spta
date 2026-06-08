"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, Phone, Users } from "lucide-react";
import React, { useState } from "react";

interface Branch {
  id: string;
  name: string;
  nameAr: string;
  director: string;
  directorAr: string;
  lat: number;
  lng: number;
}

const branches: Branch[] = [
  {
    id: "riyadh",
    name: "Riyadh Branch",
    nameAr: "فرع الرياض",
    director: "Dr. Nawaf Abdulaziz Al-Hatem",
    directorAr: "د. نواف عبدالعزيز الحاتم",
    lat: 24.7135,
    lng: 46.6753,
  },
  {
    id: "jeddah",
    name: "Jeddah Branch",
    nameAr: "فرع جدة",
    director: "Mr. Ahmed Tarek Al-Hasawi",
    directorAr: "أ. أحمد طارق الحساوي",
    lat: 21.4858,
    lng: 39.1925,
  },
  {
    id: "makkah",
    name: "Makkah Branch",
    nameAr: "فرع مكة المكرمة",
    director: "Ms. Razan Hatem Qarout",
    directorAr: "أ. رزان حاتم قاروت",
    lat: 21.3891,
    lng: 39.8579,
  },
  {
    id: "taif",
    name: "Taif Branch",
    nameAr: "فرع الطائف",
    director: "Mr. Rakan Khaled Al-Qurashi",
    directorAr: "أ. راكان خالد القرشي",
    lat: 21.2703,
    lng: 40.4158,
  },
  {
    id: "madinah",
    name: "Madinah Branch",
    nameAr: "فرع المدينة",
    director: "Mr. Majed Yahya Mudhaffar",
    directorAr: "أ. ماجد يحيى مظفر",
    lat: 24.4672,
    lng: 39.6024,
  },
  {
    id: "eastern",
    name: "Eastern Province Branch",
    nameAr: "فرع الشرقية",
    director: "Ms. Hayaa Jasim Al-Dosari",
    directorAr: "أ. هياء جاسم الدوسري",
    lat: 26.3927,
    lng: 49.9777,
  },
  {
    id: "asir",
    name: "Asir Branch",
    nameAr: "فرع عسير",
    director: "Ms. Shareefa Abdullah Al-Maalawi",
    directorAr: "أ. شريفة عبدالله آل معلوي",
    lat: 18.2164,
    lng: 42.5053,
  },
  {
    id: "tabuk",
    name: "Tabuk Branch",
    nameAr: "فرع تبوك",
    director: "Dr. Youssef Mushabib Al-Shahri",
    directorAr: "د. يوسف مشبب الشهري",
    lat: 28.3838,
    lng: 36.555,
  },
  {
    id: "qassim",
    name: "Qassim Branch",
    nameAr: "فرع القصيم",
    director: "Dr. Sattam Majoul Al-Mutairi",
    directorAr: "د. سطام مجول المطيري",
    lat: 26.326,
    lng: 43.975,
  },
  {
    id: "hail",
    name: "Hail Branch",
    nameAr: "فرع حائل",
    director: "Mr. Waleed Sulaiman Al-Tuwaiher",
    directorAr: "أ. وليد سليمان الطويهر",
    lat: 27.5114,
    lng: 41.7208,
  },
  {
    id: "najran",
    name: "Najran Branch",
    nameAr: "فرع نجران",
    director: "Dr. Abdullah Mohammed Al-Khraim",
    directorAr: "د. عبدالله محمد آل خريم",
    lat: 17.4933,
    lng: 44.1277,
  },
  {
    id: "jouf",
    name: "Al-Jouf Branch",
    nameAr: "فرع الجوف",
    director: "Ms. Malak Fayez Al-Ruwaili",
    directorAr: "أ. ملك فايز الرويلي",
    lat: 29.8867,
    lng: 40.1041,
  },
  {
    id: "jazan",
    name: "Jazan Branch",
    nameAr: "فرع جازان",
    director: "Dr. Mohammed Mansour Al-Shahri",
    directorAr: "د. محمد منصور الشهري",
    lat: 16.8892,
    lng: 42.5511,
  },
];

const BranchesSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeBranch, setActiveBranch] = useState<Branch>(branches[0]);

  const getGoogleMapsEmbedUrl = (branch: Branch) => {
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.22!2d${branch.lng}!3d${branch.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2ssa!4v1600000000000!5m2!1sen!2ssa`;
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${activeBranch.lat},${activeBranch.lng}`;
    window.open(url, "_blank");
  };

  return (
    <section id="branches" className="section-padding bg-gradient-subtle">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-accent font-semibold text-lg mb-4 block">
            {t("فروعنا", "Our Branches")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("فروع الجمعية حول المملكة", "SPTA Branches Across the Kingdom")}
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            {t(
              "13 فرعاً تغطي جميع مناطق المملكة",
              "13 branches covering all regions of Saudi Arabia",
            )}
          </p>
          <div className="w-24 h-1 bg-gradient-premium mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Branch Tabs */}
          <div className="lg:col-span-1" data-aos="fade-up">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 max-h-[600px] overflow-y-auto">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {t("اختر الفرع", "Select Branch")}
              </h3>
              <div className="space-y-2">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => setActiveBranch(branch)}
                    className={`w-full p-3 rounded-xl text-start transition-all duration-300 ${
                      activeBranch.id === branch.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-background hover:bg-primary/10 text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${activeBranch.id === branch.id ? "bg-white" : "bg-primary"}`}
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          {language === "ar" ? branch.nameAr : branch.name}
                        </div>
                        <div className="text-xs opacity-80">
                          {language === "ar"
                            ? branch.directorAr
                            : branch.director}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map and Branch Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg"
              data-aos="fade-up"
            >
              <iframe
                src={getGoogleMapsEmbedUrl(activeBranch)}
                width="100%"
                height="400"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title={`Map of ${language === "ar" ? activeBranch.nameAr : activeBranch.name}`}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <Button
                  onClick={handleGetDirections}
                  size="sm"
                  className="bg-primary hover:opacity-90"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {t("الاتجاهات", "Directions")}
                </Button>
              </div>
            </div>

            {/* Branch Info */}
            <motion.div
              key={activeBranch.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6 shadow-lg border border-border/50"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {language === "ar" ? activeBranch.nameAr : activeBranch.name}
              </h3>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">
                    {t("مدير الفرع", "Branch Director")}:{" "}
                  </span>
                  {language === "ar"
                    ? activeBranch.directorAr
                    : activeBranch.director}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
