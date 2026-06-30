"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactInfo() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      type: "address",
      title: t("العنوان", "Address"),
      details: t("الرياض، المملكة العربية السعودية", "Riyadh, Saudi Arabia"),
      sub: t("جامعة الملك سعود", "King Saud University"),
    },
    {
      icon: FaWhatsapp,
      type: "phone",
      title: t("الواتساب", "Whatsapp"),
      details: "+966541812433",
      sub: t("للتواصل المباشر", "Direct Contact"),
    },
    {
      icon: Mail,
      type: "email",
      title: t("البريد الإلكتروني", "Email"),
      details: "spta@spta.sa",
      sub: t("سنرد خلال 24 ساعة", "We reply within 24 hours"),
    },
  ];

  const socialLinks = [
    {
      icon: FaXTwitter,
      href: "https://x.com/Spta_Media?lang=ar",
      label: "Twitter",
      color: "hover:bg-black",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/saudi-physical-therapy-association-spta-/",
      label: "LinkedIn",
      color: "hover:bg-blue-700",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/spta_media?igsh=bXMyOHpmbjQ1MXFt&utm_source=qr",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
  ];

  return (
    <section className="py-16 bg-background -mt-16 relative z-20">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const getLink = () => {
              switch (info.type) {
                case "phone":
                  return `https://wa.me/${info.details.replace(/\D/g, "")}`;
                case "email":
                  return `mailto:${info.details}`;
                case "website":
                  return info.details.startsWith("http")
                    ? info.details
                    : `https://${info.details}`;
                case "address":
                  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    info.details,
                  )}`;
                default:
                  return null;
              }
            };

            const link = getLink();

            return (
              <a href={link} target="_blank" rel="noopener noreferrer">
                <motion.div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-2xl p-6 shadow-lg card-hover text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <info.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="font-bold text-foreground mb-2">
                    {info.title}
                  </h3>

                  <p
                    className="text-foreground font-medium hover:underline transition"
                    dir="ltr"
                  >
                    {info.details}
                  </p>

                  <p className="text-muted-foreground text-sm mt-1">
                    {info.sub}
                  </p>
                </motion.div>
              </a>
            );
          })}
        </div>

        <div className="space-y-8">
          <motion.div
            data-aos="fade-up"
            data-aos-delay={100}
            className="bg-card rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">
              {t("تابعنا على وسائل التواصل", "Follow Us on Social Media")}
            </h3>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground transition-colors ${social.color} hover:text-primary-foreground`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
