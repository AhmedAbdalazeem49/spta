import SecondLogo from "@/assets/spta-logo-colors-trans.png";
import sptaLogo from "@/assets/spta-trans.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronDown,
  Globe,
  GraduationCap,
  LogOut,
  Menu,
  Phone,
  Shield,
  User,
  Users,
  X,
  FileText,
  Library,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
    },
    {
      label: t("المؤتمر", "Conference"),
      path: "#",
      icon: Library,
      children: [
        {
          label: t("تقديم ورش العمل", "Workshop Submission"),
          path: "https://sptaworkshop-mckvddhf.manus.space/",
          external: true,
        },
        {
          label: t("تقديم الملخصات", "Abstract Submission"),
          path: "https://sptaconf-rtge7wgu.manus.space/",
          external: true,
        },
      ],
    },
    {
      label: t("العضوية", "Membership"),
      path: "/membership",
      icon: Users,
    },
    {
      label: t("ورش العمل", "Workshops"),
      path: "/workshops",
      icon: GraduationCap,
    },
    {
      label: t("البطاقة الرقمية", "Digital Card"),
      path: "/card",
      icon: Users,
    },
    {
      label: t("المجلة العلمية", "Scientific Journal"),
      path: "/journal",
      icon: FileText,
    },
    {
      label: t("اتصل بنا", "Contact Us"),
      path: "/contact",
      icon: Phone,
    },
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
              const hasChildren = !!item.children?.length;

              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() =>
                    hasChildren && setActiveDropdown(item.path)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isScrolled
                          ? "text-foreground hover:bg-secondary"
                          : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === item.path ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {hasChildren && activeDropdown === item.path && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute top-full mt-1 min-w-[220px] rounded-xl border border-border bg-background shadow-xl overflow-hidden py-1.5 ${
                          isRTL ? "right-0" : "left-0"
                        }`}
                      >
                        {item.children!.map((child) =>
                          child.external ? (
                            <a
                              key={child.path}
                              href={child.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                            >
                              <span>{child.label}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            </a>
                          ) : (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                            >
                              {child.label}
                            </Link>
                          ),
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                {(user?.role === "system_admin" ||
                  user?.role === "branch_admin") && (
                  <Link to="/admin">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-primary"
                    >
                      <Shield className="w-4 h-4" />
                    </Button>
                  </Link>
                )}

                <Link to="/profile">
                  <Button
                    variant={isScrolled ? "default" : "outline"}
                    className={`${
                      !isScrolled ? "text-primary-foreground bg-primary" : ""
                    }`}
                  >
                    <User className="w-4 h-4" />
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
                    const hasChildren = !!item.children?.length;
                    const isSubmenuOpen = openMobileSubmenu === item.path;

                    return (
                      <div key={item.path} className="space-y-1">
                        <div
                          className={`w-full flex items-center rounded-lg font-medium transition ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-secondary"
                          }`}
                        >
                          <button
                            onClick={() => {
                              navigate(item.path);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex-1 flex items-center px-4 py-3 text-start"
                          >
                            <span>{item.label}</span>
                          </button>

                          {hasChildren && (
                            <button
                              onClick={() =>
                                setOpenMobileSubmenu(
                                  isSubmenuOpen ? null : item.path,
                                )
                              }
                              className="px-3 py-3"
                              aria-label="Toggle submenu"
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isSubmenuOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {hasChildren && isSubmenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className={`overflow-hidden ${
                                isRTL ? "pr-4" : "pl-4"
                              }`}
                            >
                              {item.children!.map((child) =>
                                child.external ? (
                                  <a
                                    key={child.path}
                                    href={child.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                                  >
                                    <span>{child.label}</span>
                                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                  </a>
                                ) : (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                                  >
                                    {child.label}
                                  </Link>
                                ),
                              )}
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
