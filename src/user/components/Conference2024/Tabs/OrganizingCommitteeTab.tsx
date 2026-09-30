import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

import imgNawaf from "@/assets/organization-committe/Dr. Nawaf Alhatim.jpg";
import imgDalia from "@/assets/organization-committe/Ms. Dalia Binshaye.jpg";
import imgAbdulrahman from "@/assets/organization-committe/Mr. Abdulrahman Alkusayer.jpg";
import imgSujud from "@/assets/organization-committe/Ms. Sujud Al-Thanayyan.jpg";
import imgShouq from "@/assets/organization-committe/Ms. Shouq Alharbi.jpg";
import imgSarah from "@/assets/organization-committe/Ms. Sarah Alwuthayh.jpg";

export const OrganizingCommitteeTab = () => {
  const { language } = useLanguage();
  
  const members = [
    { id: 1, name: "Dr. Nawaf Alhatim", role: "Chair", initials: "NA", image: imgNawaf },
    { id: 2, name: "Ms. Dalia Binshaye", role: "Master of Ceremonies", initials: "DB", image: imgDalia },
    { id: 3, name: "Mr. Abdulrahman Alkusayer", role: "Volunteer Lead", initials: "AA", image: imgAbdulrahman },
    { id: 4, name: "Dr. Haidr Alyami", role: "Poster Presentation Lead", initials: "HA", image: null },
    { id: 5, name: "Ms. Sujud Al-Thanayyan", role: "Media and Publication lead", initials: "SA", image: imgSujud },
    { id: 6, name: "Ms. Shouq Alharbi", role: "Media Lead", initials: "SA", image: imgShouq },
    { id: 7, name: "Ms. Sarah Alwuthayh", role: "Media Team", initials: "SA", image: imgSarah },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {language === 'ar' ? 'اللجنة المنظمة' : 'Organizing Committee'}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-8 rounded-3xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-gray-700 shadow-sm"
          >
            <div className="w-24 h-24 mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 border-white dark:border-gray-800">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-extrabold text-white tracking-widest">{member.initials}</span>
              )}
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{member.name}</h4>
              <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full mt-3">
                {member.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
