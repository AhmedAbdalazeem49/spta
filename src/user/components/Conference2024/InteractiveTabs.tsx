import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

import { AgendaTab } from "./Tabs/AgendaTab";
import { ScientificCommitteeTab } from "./Tabs/ScientificCommitteeTab";
import { OrganizingCommitteeTab } from "./Tabs/OrganizingCommitteeTab";
import { WorkshopsTab } from "./Tabs/WorkshopsTab";
import { InstructionsTab } from "./Tabs/InstructionsTab";
import { LocationTab } from "./Tabs/LocationTab";
import { RegistrationTab } from "./Tabs/RegistrationTab";
import { CertificatePreviewTab } from "./Tabs/CertificatePreviewTab";

export const InteractiveTabs = () => {
  const { language } = useLanguage();
  
  const tabs = [
    { id: 'agenda', label: language === 'ar' ? 'الجدول' : 'Agenda', component: AgendaTab },
    { id: 'scientific', label: language === 'ar' ? 'اللجنة العلمية' : 'Scientific Committee', component: ScientificCommitteeTab },
    { id: 'organizing', label: language === 'ar' ? 'اللجنة المنظمة' : 'Organizing Committee', component: OrganizingCommitteeTab },
    { id: 'workshops', label: language === 'ar' ? 'ورش العمل' : 'Workshops', component: WorkshopsTab },
    { id: 'instructions', label: language === 'ar' ? 'التعليمات' : 'Instructions', component: InstructionsTab },
    { id: 'location', label: language === 'ar' ? 'الموقع' : 'Location', component: LocationTab },
    { id: 'registration', label: language === 'ar' ? 'التسجيل' : 'Registration', component: RegistrationTab },
    { id: 'certificate', label: language === 'ar' ? 'معاينة الشهادة' : 'Certificate Preview', component: CertificatePreviewTab },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || AgendaTab;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors z-10 ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
