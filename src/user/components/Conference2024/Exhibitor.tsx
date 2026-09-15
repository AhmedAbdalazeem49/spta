import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const Exhibitor = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl p-8 md:p-12 border border-blue-100 dark:border-blue-800/30 shadow-lg flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-48 h-48 md:w-64 md:h-64 shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center p-8 shadow-md"
          >
            {/* Replace with KSU Logo */}
            <div className="text-center font-bold text-xl text-blue-800 dark:text-blue-400">
              {language === 'ar' ? 'جامعة الملك سعود' : 'King Saud University'}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-start"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'ar' ? 'جامعة الملك سعود' : 'King Saud University'}
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-6 mx-auto md:mx-0"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === 'ar' 
                ? 'جامعة الملك سعود هي أول جامعة في المملكة العربية السعودية، تأسست عام 1957. تعتبر رائدة في مجال التعليم العالي والبحث العلمي، وتهدف إلى بناء مجتمع المعرفة من خلال برامجها الأكاديمية والبحثية المتميزة. تفخر الجامعة باستضافة هذا المؤتمر كجزء من التزامها بالتطوير المستمر والابتكار.'
                : 'King Saud University is the first university in Saudi Arabia, established in 1957. It is a pioneer in higher education and scientific research, aiming to build a knowledge society through its distinguished academic and research programs. The university is proud to host this conference as part of its commitment to continuous development and innovation.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
