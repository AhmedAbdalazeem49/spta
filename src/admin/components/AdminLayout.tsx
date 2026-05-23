import sptaLogo from "@/assets/spta-logo-colors-trans.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Bell,
  ChevronLeft,
  ChevronRight,
  Crown,
  Eye,
  Globe,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Ticket,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, isRTL, language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isSystemAdmin = user?.role === "system_admin";

  const navItems = [
    {
      path: "/admin",
      icon: LayoutDashboard,
      labelAr: "لوحة التحكم",
      labelEn: "Dashboard",
      systemAdminOnly: false,
    },
    {
      path: "/admin/users",
      icon: Users,
      labelAr: "المستخدمون",
      labelEn: "Users",
      systemAdminOnly: true,
    },
    {
      path: "/admin/workshops",
      icon: GraduationCap,
      labelAr: "ورش العمل",
      labelEn: "Workshops",
      systemAdminOnly: false,
    },
    {
      path: "/admin/certificates",
      icon: Award,
      labelAr: "الشهادات",
      labelEn: "Certificates",
      systemAdminOnly: false,
    },
    {
      path: "/admin/coupons",
      icon: Ticket,
      labelAr: "أكواد الخصم",
      labelEn: "Coupons",
      systemAdminOnly: false,
    },
    {
      path: "/admin/memberships",
      icon: Crown,
      labelAr: "الأعضاء",
      labelEn: "Memberships",
      systemAdminOnly: true,
    },
  ].filter((item) => !item.systemAdminOnly || isSystemAdmin);

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-center">
        <Link to="/admin">
          <img
            src={sptaLogo}
            alt="SPTA"
            className={`object-contain transition-all ${
              collapsed ? "w-10" : "w-32"
            }`}
          />
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm">{t(item.labelAr, item.labelEn)}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Home className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <span className="text-sm">{t("الموقع الرئيسي", "Main Site")}</span>
          )}
        </Link>
        <button
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <span className="text-sm">{t("تسجيل الخروج", "Logout")}</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex" dir={isRTL ? "rtl" : "ltr"}>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-card border-e border-border transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-64"
        }`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-20 bg-card border border-border rounded-full p-1 shadow-sm z-10 transition-all"
          style={{ [isRTL ? "left" : "right"]: collapsed ? "56px" : "248px" }}
        >
          {collapsed ? (
            isRTL ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : isRTL ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: isRTL ? 280 : -280 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? 280 : -280 }}
              className={`fixed top-0 ${
                isRTL ? "right-0" : "left-0"
              } z-50 w-64 h-screen bg-card border-e border-border lg:hidden`}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-foreground">
              {t("لوحة التحكم", "Admin Panel")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            >
              <Globe className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
