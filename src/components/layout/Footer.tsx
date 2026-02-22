import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin,
  ArrowUp, Send
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import sptaLogo from '@/assets/spta-trans.png';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    about: [
      { label: t('نظرة عامة', 'Overview'), path: '/about' },
      { label: t('المجلس الحالي', 'Current Council'), path: '/about/council' },
      { label: t('الفروع', 'Branches'), path: '/about/branches' },
      { label: t('الشراكات', 'Partnerships'), path: '/about/partnerships' },
    ],
    research: [
      { label: t('الممارسة المبنية على الأدلة', 'Evidence-Based Practice'), path: '/research/ebp' },
      { label: t('قواعد البيانات', 'Databases'), path: '/research/databases' },
      { label: t('إرشادات البحث', 'Research Guidelines'), path: '/research/guidelines' },
    ],
    quick: [
      { label: t('المكتبة الإلكترونية', 'E-Library'), path: '/library' },
      { label: t('الأخبار', 'News'), path: '/news' },
      { label: t('اتصل بنا', 'Contact'), path: '/contact' },
      { label: t('تسجيل الدخول', 'Login'), path: '/login' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
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
                "الجمعية السعودية للعلاج الطبيعي هي منظمة مهنية تهدف إلى تطوير مهنة العلاج الطبيعي في المملكة العربية السعودية.",
                "The Saudi Physical Therapy Association is a professional organization aimed at developing the physical therapy profession in Saudi Arabia."
              )}
            </p>

            {/* App Download */}
            <div className="space-y-3">
              <p className="font-semibold">
                {t("حمل التطبيق", "Download the App")}
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span className="text-sm">App Store</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 01-.109-.531V2.344a1.5 1.5 0 01.108-.53zm10.89 9.479l2.708-2.708 5.904 3.349c.476.27.476.932 0 1.201l-5.904 3.35-2.708-2.708L12 12l2.5-.707zM4.4.935l8.676 8.677 2.708-2.708L5.502.238A1.5 1.5 0 004.4.935zm8.676 12.453L4.4 23.065a1.5 1.5 0 001.102.697l10.282-6.666-2.708-2.708z" />
                  </svg>
                  <span className="text-sm">Google Play</span>
                </a>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {t("من نحن", "About Us")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.path}>
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

          {/* Research Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {t("البحث والتعليم", "Research")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.research.map((link) => (
                <li key={link.path}>
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
                    "الرياض، المملكة العربية السعودية",
                    "Riyadh, Saudi Arabia"
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href="tel:+966"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  +966 XX XXX XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:info@spta.org.sa"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  info@spta.org.sa
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

            {/* Social Links */}
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

            {/* Policy Links */}
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
