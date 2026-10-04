import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import { BrandPattern } from "./BrandPattern";
import { AgendaTab } from "./Tabs/AgendaTab";
import { ScientificCommitteeTab } from "./Tabs/ScientificCommitteeTab";
import { OrganizingCommitteeTab } from "./Tabs/OrganizingCommitteeTab";
import { WorkshopsTab } from "./Tabs/WorkshopsTab";
import { RegistrationTab } from "./Tabs/RegistrationTab";
import { SpeakersTab } from "./Tabs/SpeakersTab";
import { BookletTab } from "./Tabs/BookletTab";

export const InteractiveTabs = () => {
  const { language } = useLanguage();

  const sections = [
    { id: 'scientific',  label: language === 'ar' ? 'اللجنة العلمية'   : 'Scientific Committee', component: ScientificCommitteeTab },
    { id: 'speakers',    label: language === 'ar' ? 'المتحدثون'       : 'Speakers',            component: SpeakersTab },
    { id: 'agenda',      label: language === 'ar' ? 'الأجندة'          : 'Agenda',               component: AgendaTab },
    { id: 'workshops',   label: language === 'ar' ? 'ورش العمل'        : 'Workshops',            component: WorkshopsTab },
    { id: 'organizing',  label: language === 'ar' ? 'اللجنة المنظمة'   : 'Organizing Committee', component: OrganizingCommitteeTab },
    { id: 'booklet',     label: language === 'ar' ? 'الكتيب والموقع'           : 'Visitor Information',   component: BookletTab },
    { id: 'registration',label: language === 'ar' ? 'التسجيل'          : 'Registration',         component: RegistrationTab },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10" id="tabs-section">
      <div className="w-full px-4 sm:px-6 flex flex-col gap-12 sm:gap-16">
        {sections.map((section, index) => {
          const Component = section.component;
          return (
            <section 
              key={section.id} 
              id={section.id} 
              className="scroll-mt-24 sm:scroll-mt-32 w-full"
            >
              <div className={`${section.id === "speakers" ? "bg-[#020817] text-white border-blue-900/30" : "bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-gray-100 dark:border-gray-800"} rounded-3xl shadow-xl border overflow-hidden p-6 md:p-10 w-full`}>
                <Component />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
