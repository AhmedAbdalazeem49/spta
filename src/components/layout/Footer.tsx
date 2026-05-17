import sptaLogo from "@/assets/spta-trans.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    about: [
      { label: t("نبذة عن الجمعية", "About SPTA"), path: "/about" },
      {
        label: t("الرؤية والرسالة", "Vision & Mission"),
        path: "/about/vision-mission",
      },
      { label: t("مجلس الإدارة", "Board of Directors"), path: "/about" },
      { label: t("الفروع", "Branches"), path: "/about" },
    ],
    services: [
      {
        label: t("أنواع العضوية", "Membership Types"),
        path: "/membership/types",
      },
      { label: t("ورش العمل", "Workshops"), path: "/news" },
      {
        label: t("المجلة العلمية", "Scientific Journal"),
        path: "/research/journal",
      },
      { label: t("المكتبة الإلكترونية", "E-Library"), path: "/library" },
    ],
    quick: [
      { label: t("الأخبار", "News"), path: "/news" },
      { label: t("اتصل بنا", "Contact"), path: "/contact" },
      { label: t("تسجيل الدخول", "Login"), path: "/login" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10 hidden">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className={`${isRTL ? "text-right" : "text-left"}`}>
              <h3 className="text-2xl font-bold mb-2">
                {t("اشترك في النشرة الإخبارية", "Subscribe to Newsletter")}
              </h3>
              <p className="text-primary-foreground/80">
                {t(
                  "احصل على آخر الأخبار والتحديثات",
                  "Get the latest news and updates"
                )}
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <Input
                type="email"
                placeholder={t("البريد الإلكتروني", "Your email")}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 min-w-[250px]"
              />
              <Button variant="secondary" className="gap-2">
                <Send className="w-4 h-4" />
                {t("اشتراك", "Subscribe")}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-6">
              <img
                src={sptaLogo}
                alt="SPTA Logo"
                className="object-cover w-[200px] h-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              {t(
                "الجمعية السعودية للعلاج الطبيعي جمعية علمية تعمل علي تطوير مهنة العلاج الطبيعي في المملكة .",
                "The Saudi Physical Therapy Association is a scientific society that works to develop the physical therapy profession in the Kingdom."
              )}
            </p>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {t("عن الجمعية", "About SPTA")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {t("الخدمات", "Services")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {t("تواصل معنا", "Contact Us")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {t(
                    "جامعة الملك سعود، الرياض",
                    "King Saud University, Riyadh"
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href="tel:0541812433"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  0541812433
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:spta@spta.sa"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  spta@spta.sa
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 flex-shrink-0" />
                <a
                  href="https://spta.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  spta.sa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} SPTA.{" "}
              {t("جميع الحقوق محفوظة", "All rights reserved")}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/about/policies"
                className="text-primary-foreground/60 hover:text-primary-foreground"
              >
                {t("السياسات", "Policies")}
              </Link>
              <Link
                to="/about/copyright"
                className="text-primary-foreground/60 hover:text-primary-foreground"
              >
                {t("حقوق النشر", "Copyrights")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
