import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const ScientificCommitteeTab = () => {
  const { language } = useLanguage();
  
  const members = [1, 2, 3, 4, 5, 6].map(i => ({
    id: i,
    name: language === 'ar' ? `د. عضو ${i}` : `Dr. Member ${i}`,
    role: language === 'ar' ? 'أستاذ مشارك' : 'Associate Professor',
    brief: language === 'ar' ? 'خبير في مجال البحث العلمي وتطوير المناهج الطبية.' : 'Expert in scientific research and medical curriculum development.'
  }));

  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {language === 'ar' ? 'أعضاء اللجنة العلمية' : 'Scientific Committee Members'}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-md relative z-10 flex items-center justify-center overflow-hidden">
                <span className="text-gray-400">Photo</span>
            </div>
            <div className="text-center relative z-10">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h4>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.brief}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
