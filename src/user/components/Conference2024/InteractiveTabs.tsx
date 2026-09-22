import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, LayoutGrid } from "lucide-react";

import { AgendaTab } from "./Tabs/AgendaTab";
import { ScientificCommitteeTab } from "./Tabs/ScientificCommitteeTab";
import { OrganizingCommitteeTab } from "./Tabs/OrganizingCommitteeTab";
import { WorkshopsTab } from "./Tabs/WorkshopsTab";
import { LocationTab } from "./Tabs/LocationTab";
import { RegistrationTab } from "./Tabs/RegistrationTab";
import { CertificatePreviewTab } from "./Tabs/CertificatePreviewTab";
import { SpeakersTab } from "./Tabs/SpeakersTab";
import { BookletTab } from "./Tabs/BookletTab";

export const InteractiveTabs = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('speakers');
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'speakers',    label: language === 'ar' ? 'المتحدثون'       : 'Speakers',            component: SpeakersTab },
    { id: 'agenda',      label: language === 'ar' ? 'الأجندة'          : 'Agenda',               component: AgendaTab },
    { id: 'workshops',   label: language === 'ar' ? 'ورش العمل'        : 'Workshops',            component: WorkshopsTab },
    { id: 'booklet',     label: language === 'ar' ? 'الكتيب'           : 'Booklet',              component: BookletTab },
    { id: 'scientific',  label: language === 'ar' ? 'اللجنة العلمية'   : 'Scientific Committee', component: ScientificCommitteeTab },
    { id: 'organizing',  label: language === 'ar' ? 'اللجنة المنظمة'   : 'Organizing Committee', component: OrganizingCommitteeTab },
    { id: 'location',    label: language === 'ar' ? 'الموقع'           : 'Location',             component: LocationTab },
    { id: 'registration',label: language === 'ar' ? 'التسجيل'          : 'Registration',         component: RegistrationTab },
    // { id: 'certificate', label: language === 'ar' ? 'معاينة الشهادة'   : 'Certificate Preview',  component: CertificatePreviewTab },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || SpeakersTab;
  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label || 'Speakers';

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Sticky Tab Bar */}
      <div
        ref={tabBarRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isSticky
            ? 'bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-gray-200/60 dark:border-gray-800/60'
            : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/40'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Desktop tab bar */}
          <div className="hidden lg:flex items-center gap-1 py-3 overflow-x-auto scrollbar-none">
            <LayoutGrid className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-pill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-lg shadow-blue-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile dropdown */}
          <div className="lg:hidden py-3 relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30"
            >
              <span>{activeTabLabel}</span>
              <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  className="absolute top-full mt-2 inset-x-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setIsDropdownOpen(false); }}
                      className={`w-full text-left px-5 py-4 text-sm font-semibold border-b border-gray-50 dark:border-gray-800/60 last:border-b-0 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[600px] p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
