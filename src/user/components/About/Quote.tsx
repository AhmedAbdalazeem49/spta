"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";
import React from "react";

const Quote = () => {
  const { t } = useLanguage();

  const quotes = [
    {
      text: t(
        "وبذلنا الغالي والنفيس للمحافظة على صحة الإنسان وتوفير كل أسباب العيش الكريم له.",
        "We have spared no effort to safeguard human health and provide every means for a dignified life.",
      ),
      author: t(
        "خادم الحرمين الشريفين الملك سلمان بن عبدالعزيز",
        "Custodian of the Two Holy Mosques King Salman bin Abdulaziz",
      ),
    },
    {
      text: t(
        "نحن ننظر إلى القطاع غير الربحي على أنه قطاع مهم في دعم مسيرة التعليم والثقافة والصحة والبحث، وسنعتمد عليه بشكل رئيسي",
        "We view the non-profit sector as a vital pillar in supporting the advancement of education, culture, health, and research — and we will rely on it as a key driver.",
      ),
      author: t(
        "سمو ولي العهد الأمير محمد بن سلمان",
        "HRH Crown Prince Mohammed bin Salman",
      ),
    },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="text-center"
            >
              <QuoteIcon className="w-12 h-12 mx-auto mb-6 opacity-50" />
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                {quote.text}
              </p>
              <div>
                <p className="font-bold text-lg text-accent">{quote.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quote;
