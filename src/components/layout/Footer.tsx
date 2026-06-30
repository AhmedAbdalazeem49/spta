import sptaLogo from "@/assets/spta-trans.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
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
        label: t("العلاقات الدولية", "International"),
        path: "/about/international",
      },
      {
        label: t("ما هو العلاج الطبيعي", "What is PT"),
        path: "/about/what-is-pt",
      },
      { label: t("الفروع", "Branches"), path: "/contact" },
      { label: t("الأخبار", "News"), path: "/news" },
      {
        label: t("المجموعات التخصصية", "Specializations"),
        path: "/specializations",
      },
      {
        label: t(
          "المشاركة في الأبحاث والاستبيانات",
          "Empirical Research & Questionnaires",
        ),
        path: "/research/empirical",
      },
      {
        label: t("المؤتمرات", "Conferences"),
        path: "/conferences",
      },
      {
        label: t(
          "المجلة الدولية لأبحاث العلاج الطبيعي وممارساته",
          "International Journal of Physical Therapy Research and Practice",
        ),
        path: "https://www.inkwellinfinite.com/index.php/ijprp",
      },
    ],
  };

  const socialLinks = [
    {
      icon: FaXTwitter,
      href: "https://x.com/Spta_Media?lang=ar",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/saudi-physical-therapy-association-spta-/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/spta_media?igsh=bXMyOHpmbjQ1MXFt&utm_source=qr",
      label: "Instagram",
    },
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
                  "Get the latest news and updates",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo & About */}
          <div>
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
                "The Saudi Physical Therapy Association is a scientific society that works to develop the physical therapy profession in the Kingdom.",
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
                    "King Saud University, Riyadh",
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="w-5 h-5 flex-shrink-0" />
                <a
                  href="https://wa.me/966541812433"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +966541812433
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
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  target="_blank"
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
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} SPTA.{" "}
              {t("جميع الحقوق محفوظة", "All rights reserved")}
            </p>
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
