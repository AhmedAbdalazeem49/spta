"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users } from "lucide-react";

interface Person {
  name: string;
  role: string;
}

interface EditorialBoardProps {
  editorialBoard?: {
    editor: Person;
    deputies: Person[];
  };
}

export default function EditorialBoard({
  editorialBoard,
}: EditorialBoardProps) {
  const { t } = useLanguage();

  const defaultBoard = editorialBoard || {
    editor: {
      name: t("د. محمد عبدالله الفهد", "Dr. Mohammed Abdullah Al-Fahd"),
      role: t("رئيس التحرير", "Editor-in-Chief"),
    },
    deputies: [
      {
        name: t("د. سارة أحمد العتيبي", "Dr. Sara Ahmed Al-Otaibi"),
        role: t("نائب رئيس التحرير", "Deputy Editor"),
      },
      {
        name: t("د. خالد سعود المالكي", "Dr. Khaled Saud Al-Malki"),
        role: t("مدير التحرير", "Managing Editor"),
      },
    ],
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12" data-aos="fade-up">
          <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("هيئة التحرير", "Editorial Board")}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Editor-in-Chief */}
          <motion.div
            data-aos="fade-up"
            className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 mb-6 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {defaultBoard.editor.name}
            </h3>
            <p className="text-white/80">{defaultBoard.editor.role}</p>
          </motion.div>

          {/* Deputies */}
          <div className="grid md:grid-cols-2 gap-6">
            {defaultBoard.deputies.map((deputy, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card rounded-2xl p-6 border border-border/50 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">
                  {deputy.name}
                </h3>
                <p className="text-muted-foreground text-sm">{deputy.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
