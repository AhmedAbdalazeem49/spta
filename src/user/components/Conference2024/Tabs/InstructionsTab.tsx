import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, UserCheck, Clock, Tag } from "lucide-react";

export const InstructionsTab = () => {
  const { language } = useLanguage();

  const rules = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-rose-500" />,
      title: language === 'ar' ? 'التسجيل الإلزامي' : 'Mandatory Registration',
      desc: language === 'ar' ? 'يجب التسجيل في المؤتمر أولاً لكي تتمكن من حضور ورش العمل واستخراج الشهادات.' : 'You must register for the conference first to access workshops and obtain certificates.',
      bg: 'bg-rose-50 dark:bg-rose-900/10',
      border: 'border-rose-100 dark:border-rose-900/30'
    },
    {
      icon: <UserCheck className="w-8 h-8 text-[#55AE47]" />,
      title: language === 'ar' ? 'الفئات المستهدفة' : 'Target Audience',
      desc: language === 'ar' ? 'التسجيل متاح للطلاب، الممارسين الصحيين، الأطباء، والباحثين في المجال الطبي.' : 'Registration is open for students, healthcare professionals, doctors, and medical researchers.',
      bg: 'bg-emerald-50 dark:bg-emerald-900/10',
      border: 'border-emerald-100 dark:border-emerald-900/30'
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-500" />,
      title: language === 'ar' ? 'تعارض أوقات الورش' : 'Workshop Conflicts',
      desc: language === 'ar' ? 'لا يمكن التسجيل في ورشتي عمل في نفس الوقت (صباحي / مسائي). يرجى التأكد من الجدول.' : 'Cannot register for two workshops in the same time slot (Morning/Evening). Please check the schedule.',
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      border: 'border-amber-100 dark:border-amber-900/30'
    },
    {
      icon: <Tag className="w-8 h-8 text-[#6FC4BC]" />,
      title: language === 'ar' ? 'الرسوم والخصومات' : 'Fees & Discounts',
      desc: language === 'ar' ? 'يتوفر تسجيل مبكر وتسجيل متأخر. ورش العمل ليس عليها أي خصم إضافي (تعتبر إضافات منفصلة).' : 'Early bird and late bird stages available. Workshops have no additional discounts (Separate add-ons).',
      bg: 'bg-[#f0f8f8] dark:bg-indigo-900/10',
      border: 'border-indigo-100 dark:border-indigo-900/30'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="text-center mb-14">
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          {language === 'ar' ? 'تعليمات هامة' : 'Important Instructions'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'ar' ? 'يرجى قراءة هذه التعليمات بعناية لضمان تجربة سلسة خلال فترة المؤتمر.' : 'Please read these instructions carefully to ensure a smooth experience during the conference.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {rules.map((rule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
            className={`${rule.bg} ${rule.border} border p-8 rounded-[2rem] shadow-sm flex flex-col sm:flex-row gap-6 transition-all`}
          >
            <div className="shrink-0 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm h-fit">
              {rule.icon}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{rule.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{rule.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
