import SecondLogo from "@/assets/spta-logo-colors-trans.png";
import sptaLogo from "@/assets/spta-trans.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  ChevronDown,
  FileText,
  Globe,
  GraduationCap,
  Library,
  LogOut,
  Menu,
  Phone,
  Shield,
  Smartphone,
  User,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("الرئيسية", "Home"), path: "/", icon: Building2 },
    {
      label: t("من نحن", "About"),
      path: "/about",
      icon: Users,
      children: [
        { label: t("نظرة عامة", "Overview"), path: "/about" },
        {
          label: t("الرؤية والرسالة", "Vision & Mission"),
          path: "/about/vision-mission",
        },
        {
          label: t("ما هو العلاج الطبيعي", "What is PT"),
          path: "/about/what-is-pt",
        },
        {
          label: t("العلاقات الدولية", "International"),
          path: "/about/international",
        },
        {
          label: t("المجالس السابقة", "Previous Boards"),
          path: "/about/previous-boards",
        },
      ],
    },
    // {
    //   label: t("البحث والتعليم", "Research"),
    //   path: "/research",
    //   icon: BookOpen,
    //   children: [
    //     {
    //       label: t("مركز الأبحاث", "Research Center"),
    //       path: "/research/center",
    //     },
    //     {
    //       label: t("قواعد البيانات", "Databases"),
    //       path: "/research/databases",
    //     },
    //   ],
    // },
    // {
    //   label: t("المكتبة والإعلام", "Library & Media"),
    //   path: "/library",
    //   icon: Library,
    //   children: [
    //     { label: t("المكتبة", "Library"), path: "/library" },
    //     { label: t("الكتيبات", "Booklets"), path: "/booklets" },
    //     { label: t("المطويات", "Brochures"), path: "/brochures" },
    //     { label: t("الفيديوهات", "Videos"), path: "/videos" },
    //   ],
    // },
    {
      label: t("العضوية", "Membership"),
      path: "/membership",
      icon: Users,
      children: [
        {
          label: t("اشترك الآن", "Subscribe"),
          path: "/membership/subscribe",
        },
        {
          label: t("مزايا العضوية", "Membership Benefits"),
          path: "/membership/benefits",
        },

        { label: t("عدد الأعضاء", "Members Count"), path: "/membership/count" },
        {
          label: t("البطاقة الرقمية", "Digital Card"),
          path: "/membership/card",
        },
      ],
    },
    {
      label: t("ورش العمل", "Workshops"),
      path: "/workshops",
      icon: GraduationCap,
    },
    {
      label: t("التخصصات", "Specializations"),
      path: "/specializations",
      icon: Building2,
    },
    // {
    //   label: t("المجلة العلمية", "Scientific Journal"),
    //   path: "/journal",
    //   icon: FileText,
    // },
    { label: t("الأخبار", "News"), path: "/news", icon: FileText },
    {
      label: t("اتصل بنا", "Contact Us"),
      path: "/contact",
      icon: Phone,
    },
    // { label: t("تطبيق SPTA", "SPTA App"), path: "/#app", icon: Smartphone },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg"
          : "bg-background/95 backdrop-blur-lg shadow-lg"
      }`}
    >
      <div className="md:px-12 px-2">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex">
            <motion.div whileHover={{ scale: 1.05 }} className="w-auto">
              <img
                src={isScrolled ? SecondLogo : SecondLogo}
                alt="SPTA Logo"
                className="w-[160px] object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/");

              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.path)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isScrolled
                        ? "text-foreground hover:bg-secondary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  <AnimatePresence>
                    {item.children && activeDropdown === item.path && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-full ${
                          isRTL ? "right-0" : "left-0"
                        } mt-2 w-56 bg-card rounded-xl shadow-lg border border-border overflow-hidden`}
                      >
                        {item.children.map((child) => (
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
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {isAuthenticated ? (
              <>
                {((user as any)?.role === "admin" ||
                  (user as any)?.is_admin) && (
                  <Link to="/admin">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-primary"
                    >
                      <Shield className="w-4 h-4" />
                      {t("لوحة التحكم", "Admin")}
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button
                    variant={isScrolled ? "default" : "outline"}
                    className={`gap-2 ${
                      !isScrolled ? "text-primary-foreground bg-primary" : ""
                    }`}
                  >
                    <User className="w-4 h-4" />
                    {user?.name?.split(" ")[0] || t("حسابي", "My Account")}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                  className={`rounded-full ${
                    isScrolled
                      ? "hover:bg-secondary"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  <LogOut
                    className={`w-5 h-5 ${
                      isScrolled ? "text-foreground" : "text-foreground"
                    }`}
                  />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button
                  variant={isScrolled ? "default" : "outline"}
                  className={
                    !isScrolled ? "text-primary-foreground bg-primary" : ""
                  }
                >
                  {t("تسجيل الدخول", "Login")}
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className={`rounded-full ${
                isScrolled
                  ? "hover:bg-secondary"
                  : "hover:bg-primary-foreground/10"
              }`}
            >
              <Globe
                className={`w-8 h-8 ${
                  isScrolled ? "text-foreground" : "text-foreground"
                }`}
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X
                  className={`w-6 h-6 ${
                    isScrolled ? "text-foreground" : "text-foreground"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    isScrolled ? "text-foreground" : "text-foreground"
                  }`}
                />
              )}
            </Button>
          </div>
        </nav>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black lg:hidden"
              />

              {/* Mobile Menu */}
              <motion.div
                initial={{ x: isRTL ? 300 : -300 }}
                animate={{ x: 0 }}
                exit={{ x: isRTL ? 300 : -300 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className={`fixed top-0 ${
                  isRTL ? "right-0" : "left-0"
                } z-50 h-screen w-[75%] max-w-sm bg-background shadow-2xl lg:hidden flex flex-col`}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-16 border-b border-border">
                  <img
                    src={sptaLogo}
                    alt="SPTA"
                    className="h-10 w-auto object-contain"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                  {navItems.map((item) => {
                    const isActive =
                      location.pathname === item.path ||
                      location.pathname.startsWith(item.path + "/");

                    const isOpen = mobileDropdown === item.path;

                    return (
                      <div key={item.path} className="space-y-1">
                        {/* Parent */}
                        <button
                          onClick={() =>
                            item.children
                              ? setMobileDropdown(isOpen ? null : item.path)
                              : setIsMobileMenuOpen(false)
                          }
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-secondary"
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.children && (
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.span>
                          )}
                        </button>

                        {/* Dropdown */}
                        <AnimatePresence>
                          {item.children && isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pl-4"
                            >
                              <div
                                className={`space-y-1 ${
                                  isRTL ? "border-r pr-4" : "border-l pl-4"
                                } border-border`}
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-2 text-sm rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
