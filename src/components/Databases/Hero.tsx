"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary-dark" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-glow rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-4xl mx-auto text-center ${
            isRTL ? "text-right md:text-center" : "text-left md:text-center"
          }`}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center"
          >
            <Database className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          {/* Heading & Description */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {t("القواعد الإلكترونية", "Electronic Databases")}
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              "مجموعة منتقاة من قواعد البيانات الإلكترونية لدعم الممارسة المبنية على الأدلة والبحث العلمي",
              "A curated collection of electronic databases to support evidence-based practice and scientific research"
            )}
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${
                  isRTL ? "right-4" : "left-4"
                }`}
              />
              <input
                type="text"
                placeholder={t("ابحث في القواعد...", "Search databases...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-4 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 ${
                  isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                }`}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
