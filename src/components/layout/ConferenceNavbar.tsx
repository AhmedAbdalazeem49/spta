import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import sptaLogo from "@/assets/logo-color-cert.png";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const ConferenceNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['top', 'scientific', 'agenda', 'workshops', 'organizing', 'booklet', 'registration'];
      let current = 'top';
      
      if (window.scrollY < 100) {
        setActiveSection('top');
        return;
      }

      for (const s of sections) {
        if (s === 'top') continue;
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 4) {
             current = s;
             break; // Found the active one
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTabs = (tabId: string) => {
    setIsMobileMenuOpen(false);
    
    if (tabId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Scroll to the specific section
    const el = document.getElementById(tabId);
    if (el) {
      const yOffset = -100; // offset for navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'top', label: language === 'ar' ? 'الرئيسية' : 'Home' },
    { id: 'scientific', label: language === 'ar' ? 'اللجنة العلمية' : 'Scientific Committee' },
    // { id: 'speakers', label: language === 'ar' ? 'المتحدثون' : 'Speakers' },
    { id: 'agenda', label: language === 'ar' ? 'الأجندة' : 'Agenda' },
    { id: 'workshops', label: language === 'ar' ? 'ورش العمل' : 'Workshops' },
    { id: 'organizing', label: language === 'ar' ? 'اللجنة المنظمة' : 'Organizing Committee' },
    { id: 'booklet', label: language === 'ar' ? 'الكتيب والموقع' : 'Visitors Information' },
    { id: 'registration', label: language === 'ar' ? 'التسجيل' : 'Registration' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-2"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={sptaLogo} alt="SPTA Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToTabs(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  activeSection === item.id 
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" 
                    : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToTabs(item.id)}
                  className={`px-4 py-3 text-right rtl:text-right ltr:text-left font-semibold rounded-xl transition-all ${
                  activeSection === item.id 
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" 
                    : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                }`}
                >
                  {item.label}
                </button>
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default ConferenceNavbar;
