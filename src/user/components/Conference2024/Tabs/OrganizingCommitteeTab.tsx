import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const OrganizingCommitteeTab = () => {
  const { language } = useLanguage();
  
  const members = [1, 2, 3, 4].map(i => ({
    id: i,
    name: language === 'ar' ? `منظم ${i}` : `Organizer ${i}`,
    role: language === 'ar' ? 'إدارة الفعاليات' : 'Event Management',
    brief: language === 'ar' ? 'متخصص في إدارة وتنظيم الفعاليات الكبرى.' : 'Specialized in managing and organizing major events.'
  }));

  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {language === 'ar' ? 'اللجنة المنظمة' : 'Organizing Committee'}
        </h3>
        <p className="text-gray-500">
          {language === 'ar' ? 'الفريق الذي يقف خلف الكواليس' : 'The team behind the scenes'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-gray-700"
          >
            <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl rotate-3 flex items-center justify-center overflow-hidden shadow-sm">
                <span className="text-xs text-gray-500 -rotate-3">Avatar</span>
            </div>
            <div className="text-center md:text-start flex-1">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h4>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full mb-3 mt-1">
                {member.role}
              </span>
              <p className="text-gray-600 dark:text-gray-400">
                {member.brief}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
