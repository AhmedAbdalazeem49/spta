import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, BookOpen, Users, Building2, Phone, FileText, Library, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, setLanguage, t, isRTL } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      label: t('الرئيسية', 'Home'), 
      path: '/',
      icon: Building2
    },
    { 
      label: t('من نحن', 'About Us'), 
      path: '/about',
      icon: Users,
      children: [
        { label: t('نظرة عامة', 'Overview'), path: '/about' },
        { label: t('المجلس الحالي', 'Current Council'), path: '/about/council' },
        { label: t('الفروع', 'Branches'), path: '/about/branches' },
        { label: t('الشراكات', 'Partnerships'), path: '/about/partnerships' },
      ]
    },
    { 
      label: t('البحث والتعليم', 'Research & Education'), 
      path: '/research',
      icon: BookOpen,
      children: [
        { label: t('الممارسة المبنية على الأدلة', 'Evidence-Based Practice'), path: '/research/ebp' },
        { label: t('قواعد البيانات', 'Databases'), path: '/research/databases' },
        { label: t('إرشادات البحث', 'Research Guidelines'), path: '/research/guidelines' },
      ]
    },
    { 
      label: t('المجلة العلمية', 'Scientific Journal'), 
      path: '/news',
      icon: FileText
    },
    { 
      label: t('المكتبة الإلكترونية', 'E-Library'), 
      path: '/library',
      icon: Library
    },
    { 
      label: t('تطبيق SPTA', 'SPTA App'), 
      path: '/app',
      icon: Smartphone
    },
    { 
      label: t('اتصل بنا', 'Contact Us'), 
      path: '/contact',
      icon: Phone
    },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md"
            >
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </motion.div>
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <h1 className={`font-bold text-lg ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
                {t('الجمعية السعودية', 'Saudi Physical')}
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/80'}`}>
                {t('للعلاج الطبيعي', 'Therapy Association')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.path}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.path)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'bg-primary text-primary-foreground' 
                      : isScrolled 
                        ? 'text-foreground hover:bg-secondary' 
                        : 'text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.path && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-56 bg-card rounded-xl shadow-lg border border-border overflow-hidden`}
                    >
                      {item.children.map((child, idx) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-3 text-foreground hover:bg-secondary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className={`rounded-full ${isScrolled ? 'hover:bg-secondary' : 'hover:bg-primary-foreground/10'}`}
            >
              <Globe className={`w-5 h-5 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
            </Button>

            {/* Login Button */}
            <Link to="/login">
              <Button 
                variant={isScrolled ? "default" : "outline"}
                className={!isScrolled ? 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary' : ''}
              >
                {t('تسجيل الدخول', 'Login')}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-card rounded-2xl mb-4 overflow-hidden shadow-lg"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        location.pathname === item.path 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className={`${isRTL ? 'pr-8' : 'pl-8'} space-y-1 mt-1`}>
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
