"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, CheckCircle, Calendar } from "lucide-react";

interface Issue {
  volume: string;
  issue: string;
  date: string;
  articles: number;
}

interface SubmissionsProps {
  submissionTypes?: string[];
  latestIssues?: Issue[];
}

export default function Submissions({
  submissionTypes,
  latestIssues,
}: SubmissionsProps) {
  const { t, isRTL } = useLanguage();

  const defaultSubmissionTypes = submissionTypes || [
    t("الأبحاث الأصلية", "Original Research"),
    t("المراجعات المنهجية", "Systematic Reviews"),
    t("دراسات الحالة", "Case Studies"),
    t("التقارير السريرية", "Clinical Reports"),
    t("الرسائل للمحرر", "Letters to Editor"),
  ];

  const defaultLatestIssues = latestIssues || [
    {
      volume: "15",
      issue: "4",
      date: t("أكتوبر 2024", "October 2024"),
      articles: 12,
    },
    {
      volume: "15",
      issue: "3",
      date: t("يوليو 2024", "July 2024"),
      articles: 10,
    },
    {
      volume: "15",
      issue: "2",
      date: t("أبريل 2024", "April 2024"),
      articles: 11,
    },
    {
      volume: "15",
      issue: "1",
      date: t("يناير 2024", "January 2024"),
      articles: 9,
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Submission Types */}
          <div data-aos="fade-right">
            <FileText className="w-12 h-12 mb-4 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("أنواع المخطوطات المقبولة", "Accepted Manuscript Types")}
            </h2>
            <div className="space-y-3">
              {defaultSubmissionTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{type}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Latest Issues */}
          <div data-aos="fade-left">
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                {t("أحدث الأعداد", "Latest Issues")}
              </h3>
              <div className="space-y-4">
                {defaultLatestIssues.map((issue, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-foreground">
                        Vol. {issue.volume}, Issue {issue.issue}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {issue.date}
                      </p>
                    </div>
                    <span className="text-primary font-medium">
                      {issue.articles} {t("مقال", "articles")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
