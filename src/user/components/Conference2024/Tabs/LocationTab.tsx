import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Navigation, Car, Plane, Train, Compass } from "lucide-react";

// Conference venue: Almoosa Health Group

export const LocationTab = () => {
  const { language } = useLanguage();
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      nameAr: "المنطقة الشرقية",
      nameEn: "Eastern Province",
      icon: Train,
      descAr: "تقع مجموعة الموسى الصحية في المنطقة الشرقية ذاتها. يمكنك الوصول بسهولة عبر الطرق السريعة الداخلية أو سيارات الأجرة.",
      descEn: "Almoosa Health Group is located in the Eastern Province itself. Easily reachable via internal highways or ride-sharing services.",
      color: "from-blue-400 to-[#11517E]"
    },
    {
      id: 2,
      nameAr: "الرياض",
      nameEn: "Riyadh",
      icon: Plane,
      descAr: "من مطار الملك خالد الدولي، خذ رحلة طيران مباشرة إلى مطار الأحساء، ثم توجه إلى مجموعة الموسى الصحية (30 دقيقة).",
      descEn: "From King Khalid International Airport, fly directly to Al-Ahsa Airport, then head to Almoosa Health Group (~30 min drive).",
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 3,
      nameAr: "الدمام والخبر",
      nameEn: "Dammam & Khobar",
      icon: Car,
      descAr: "انطلق عبر طريق الدمام السريع المتجه جنوباً نحو الأحساء، تستغرق الرحلة حوالي ساعة ونصف بالسيارة.",
      descEn: "Head south via the Dammam-Hofuf expressway toward Al-Ahsa. The drive takes approximately 1.5 hours.",
      color: "from-emerald-400 to-[#55AE47]"
    },
    {
      id: 4,
      nameAr: "جدة ومكة المكرمة",
      nameEn: "Jeddah & Makkah",
      icon: Plane,
      descAr: "رحلات طيران مجدولة من مطار الملك عبدالعزيز إلى مطار الأحساء الدولي، ثم توجه مباشرة إلى الموسى الصحية.",
      descEn: "Scheduled flights from King Abdulaziz Airport to Al-Ahsa International Airport, then a direct transfer to Almoosa Health Group.",
      color: "from-amber-400 to-amber-600"
    }
  ];

  return (
    <div className="flex flex-col h-full w-full space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 mb-4">
          {language === 'ar' ? 'موقع المؤتمر' : 'Conference Location'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 text-lg">
          <MapPin className="w-6 h-6 text-red-500" />
          {language === 'ar' ? 'مجموعة الموسى الصحية، المنطقة الشرقية، المملكة العربية السعودية' : 'Almoosa Health Group, Eastern Province, Saudi Arabia'}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-1">
        
        {/* Real Interactive Map */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2 min-h-[280px] sm:min-h-[350px] md:min-h-[450px] xl:h-auto rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white/50 dark:border-gray-800/80 group"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.2847632741517!2d49.55777677604073!3d25.644396977410754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e35d3a4a4a4a4a5%3A0xa4a4a4a4a4a4a4a4!2sAlmoosa%20Health%20Group!5e0!3m2!1sen!2ssa!4v1700000000001!5m2!1sen!2ssa" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
          ></iframe>
          
          <div className="absolute inset-0 pointer-events-none ring-inset ring-1 ring-black/5 dark:ring-white/10 rounded-3xl"></div>

          <a 
            href="https://maps.google.com/?q=Almoosa+Health+Group+Al+Ahsa+Saudi+Arabia" 
            target="_blank" 
            rel="noreferrer"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 bg-[#11517E]/90 backdrop-blur-md hover:bg-[#11517E] text-white px-6 py-3 rounded-full font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-blue-600/40 transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            <Navigation className="w-5 h-5 animate-bounce" />
            {language === 'ar' ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
          </a>
        </motion.div>

        {/* Hotspots Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-4 bg-white/50 dark:bg-gray-900/30 p-6 rounded-3xl backdrop-blur-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-xl shadow-inner">
              <Compass className="w-7 h-7 text-[#11517E] dark:text-[#6FC4BC]" />
            </div>
            <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white tracking-tight">
              {language === 'ar' ? 'الـ Hotspots (وجهات الوصول)' : 'Arrival Hotspots'}
            </h4>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed font-medium">
            {language === 'ar' 
              ? 'خطط لرحلتك بسهولة من مختلف مناطق المملكة. اختر منطقتك لمعرفة أفضل وأسرع طرق الوصول.'
              : 'Plan your trip easily from various regions. Select your region to see the best and fastest routes.'}
          </p>
          
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 pb-2 custom-scrollbar">
            {hotspots.map((spot) => {
              const Icon = spot.icon;
              const isActive = activeHotspot === spot.id;
              
              return (
                <motion.div 
                  key={spot.id}
                  layout
                  onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                  className={`cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-white dark:bg-gray-800 border-[#11517E]/50 shadow-xl shadow-blue-500/10 scale-[1.02]' 
                      : 'bg-white/60 dark:bg-gray-800/40 border-transparent hover:border-[#11517E]/20 dark:hover:border-blue-900/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md'
                  }`}
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${spot.color} shadow-lg shrink-0 transform transition-transform ${isActive ? 'rotate-12' : ''}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-bold text-lg transition-colors ${isActive ? 'text-[#11517E] dark:text-[#6FC4BC]' : 'text-gray-800 dark:text-gray-200'}`}>
                        {language === 'ar' ? spot.nameAr : spot.nameEn}
                      </h5>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 pt-0"
                      >
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100/50 dark:border-blue-800/30">
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            {language === 'ar' ? spot.descAr : spot.descEn}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
