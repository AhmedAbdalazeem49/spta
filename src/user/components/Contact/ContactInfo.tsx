"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";

export default function ContactInfo() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t("العنوان", "Address"),
      details: t("الرياض، المملكة العربية السعودية", "Riyadh, Saudi Arabia"),
      sub: t("جامعة الملك سعود", "King Saud University"),
    },
    {
      icon: Phone,
      title: t("الهاتف", "Phone"),
      details: "+966 XX XXX XXXX",
      sub: t("متاح 24/7", "Available 24/7"),
    },
    {
      icon: Mail,
      title: t("البريد الإلكتروني", "Email"),
      details: "info@spta.org.sa",
      sub: t("سنرد خلال 24 ساعة", "We reply within 24 hours"),
    },
    {
      icon: Clock,
      title: t("ساعات العمل", "Working Hours"),
      details: t("الأحد - الخميس", "Sunday - Thursday"),
      sub: t("8:00 ص - 4:00 م", "8:00 AM - 4:00 PM"),
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:bg-blue-700",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: MessageCircle,
      href: "#",
      label: "WhatsApp",
      color: "hover:bg-green-600",
    },
  ];

  return (
    <section className="py-16 bg-background -mt-16 relative z-20">
      <div className="container-custom">
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
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
              <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
              <p className="text-foreground font-medium">{info.details}</p>
              <p className="text-muted-foreground text-sm mt-1">{info.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <div className="space-y-8">
          <motion.div
            data-aos="fade-left"
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
