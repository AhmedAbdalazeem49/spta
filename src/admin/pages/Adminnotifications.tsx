import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Search,
  Filter,
  Users,
  Calendar,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Trash2,
  BellOff,
  BellRing,
  RefreshCw,
  Eye,
  Ticket,
  Award,
  Info,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

// ── Types ─────────────────────────────────────────────────────────────────────

type NotifType =
  | "registration"
  | "certificate"
  | "alert"
  | "workshop"
  | "coupon"
  | "system";

interface Notification {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  type: NotifType;
  isRead: boolean;
  createdAt: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockNotifications: Notification[] = [
  {
    id: 1,
    titleAr: "تسجيل جديد في ورشة التأهيل",
    titleEn: "New Registration in Rehabilitation Workshop",
    descriptionAr: "قام مستخدم جديد بالتسجيل في ورشة التأهيل الحركي المتقدم",
    descriptionEn:
      "A new user registered in the Advanced Motor Rehabilitation Workshop",
    type: "registration",
    isRead: false,
    createdAt: "2024-03-15T14:30:00",
  },
  {
    id: 2,
    titleAr: "تم إصدار شهادة جديدة",
    titleEn: "New Certificate Issued",
    descriptionAr:
      "تم إصدار شهادة حضور لمحمد أحمد بعد إتمام ورشة العلاج الطبيعي",
    descriptionEn:
      "A certificate of attendance was issued to Mohammed Ahmad after completing the physical therapy workshop",
    type: "certificate",
    isRead: false,
    createdAt: "2024-03-15T12:00:00",
  },
  {
    id: 3,
    titleAr: "انتهاء صلاحية كود الخصم",
    titleEn: "Discount Code Expired",
    descriptionAr: "انتهت صلاحية كود الخصم MEMBER50 وتم تعطيله تلقائياً",
    descriptionEn:
      "Discount code MEMBER50 has expired and was automatically deactivated",
    type: "coupon",
    isRead: true,
    createdAt: "2024-03-14T09:00:00",
  },
  {
    id: 4,
    titleAr: "ورشة جديدة متاحة للتسجيل",
    titleEn: "New Workshop Available",
    descriptionAr:
      "تمت إضافة ورشة تقنيات التنفس العلاجية وهي متاحة الآن للتسجيل",
    descriptionEn:
      "Therapeutic Breathing Techniques workshop has been added and is now open for registration",
    type: "workshop",
    isRead: true,
    createdAt: "2024-03-13T16:00:00",
  },
  {
    id: 5,
    titleAr: "تنبيه: ظرفية مقاعد الورشة",
    titleEn: "Alert: Workshop Seats Almost Full",
    descriptionAr: "تبقى 3 مقاعد فقط في ورشة العلاج الطبيعي الرياضي",
    descriptionEn:
      "Only 3 seats remaining in the Sports Physical Therapy Workshop",
    type: "alert",
    isRead: false,
    createdAt: "2024-03-13T11:00:00",
  },
  {
    id: 6,
    titleAr: "تحديث النظام بنجاح",
    titleEn: "System Updated Successfully",
    descriptionAr: "تم تحديث المنصة إلى الإصدار الجديد بنجاح",
    descriptionEn:
      "The platform has been successfully updated to the new version",
    type: "system",
    isRead: true,
    createdAt: "2024-03-12T08:00:00",
  },
  {
    id: 7,
    titleAr: "عضوية جديدة مفعلة",
    titleEn: "New Membership Activated",
    descriptionAr: "قامت سارة الخالد بتفعيل عضوية VIP",
    descriptionEn: "Sara Al-Khaled activated a VIP membership",
    type: "registration",
    isRead: false,
    createdAt: "2024-03-11T15:30:00",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const AdminNotifications = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRead, setFilterRead] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ── API (uncomment when backend is ready) ─────────────────────────────────
  // useEffect(() => { fetchNotifications(); }, []);

  // const fetchNotifications = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await api.get('/admin/notifications');
  //     const data = res.data?.data || res.data || [];
  //     setNotifications(Array.isArray(data) ? data : []);
  //   } catch {
  //     setNotifications(mockNotifications);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // ── Stats ─────────────────────────────────────────────────────────────────

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const stats = {
    total: notifications.length,
    unread: unreadCount,
    read: notifications.filter((n) => n.isRead).length,
    alerts: notifications.filter((n) => n.type === "alert").length,
  };

  // ── Filtered ──────────────────────────────────────────────────────────────

  const filtered = notifications.filter((n) => {
    const matchesSearch =
      n.titleAr.includes(searchQuery) ||
      n.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.descriptionAr || "").includes(searchQuery) ||
      (n.descriptionEn || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || n.type === filterType;
    const matchesRead =
      filterRead === "all" ||
      (filterRead === "unread" && !n.isRead) ||
      (filterRead === "read" && n.isRead);
    return matchesSearch && matchesType && matchesRead;
  });

  // ── Icon & color per type ─────────────────────────────────────────────────

  const getTypeConfig = (type: NotifType) => {
    const configs: Record<
      NotifType,
      {
        icon: any;
        bg: string;
        iconColor: string;
        labelAr: string;
        labelEn: string;
        badgeColor: string;
      }
    > = {
      registration: {
        icon: Users,
        bg: "bg-green-accent/10",
        iconColor: "text-green-accent",
        labelAr: "تسجيل",
        labelEn: "Registration",
        badgeColor:
          "bg-green-accent/10 text-green-accent border-green-accent/30",
      },
      certificate: {
        icon: Award,
        bg: "bg-blue-light/10",
        iconColor: "text-blue-light",
        labelAr: "شهادة",
        labelEn: "Certificate",
        badgeColor: "bg-blue-light/10 text-blue-light border-blue-light/30",
      },
      alert: {
        icon: AlertCircle,
        bg: "bg-yellow-500/10",
        iconColor: "text-yellow-600",
        labelAr: "تنبيه",
        labelEn: "Alert",
        badgeColor: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
      },
      workshop: {
        icon: GraduationCap,
        bg: "bg-primary/10",
        iconColor: "text-primary",
        labelAr: "ورشة",
        labelEn: "Workshop",
        badgeColor: "bg-primary/10 text-primary border-primary/30",
      },
      coupon: {
        icon: Ticket,
        bg: "bg-purple-500/10",
        iconColor: "text-purple-600",
        labelAr: "كوبون",
        labelEn: "Coupon",
        badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
      },
      system: {
        icon: Info,
        bg: "bg-muted",
        iconColor: "text-muted-foreground",
        labelAr: "نظام",
        labelEn: "System",
        badgeColor: "bg-muted text-muted-foreground border-border",
      },
    };
    return configs[type] || configs.system;
  };

  // ── Actions ───────────────────────────────────────────────────────────────

  const markAsRead = async (id: number) => {
    // await api.patch(`/admin/notifications/${id}/read`);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = async () => {
    try {
      // await api.patch('/admin/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast({
        title: t("تم التحديث", "Updated"),
        description: t(
          "تم تحديد جميع الإشعارات كمقروءة",
          "All notifications marked as read"
        ),
      });
    } catch {
      toast({ title: t("حدث خطأ", "Error"), variant: "destructive" });
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      // await api.delete(`/admin/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      toast({
        title: t("تم الحذف", "Deleted"),
        description: t("تم حذف الإشعار", "Notification deleted"),
      });
    } catch {
      toast({ title: t("حدث خطأ", "Error"), variant: "destructive" });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // const res = await api.get('/admin/notifications');
      // setNotifications(res.data?.data || res.data || []);
      await new Promise((r) => setTimeout(r, 800));
      toast({
        title: t("تم التحديث", "Refreshed"),
        description: t("تم تحديث الإشعارات", "Notifications refreshed"),
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 60) return `${diff} ${t("دقيقة", "min ago")}`;
    if (diff < 1440) return `${Math.floor(diff / 60)} ${t("ساعة", "hr ago")}`;
    return date.toLocaleDateString(isRTL ? "ar-SA" : "en-US");
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            {t("الإشعارات", "Notifications")}
            {unreadCount > 0 && (
              <span className="w-6 h-6 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "متابعة جميع أحداث المنصة والتنبيهات",
              "Follow all platform events and alerts"
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {t("تحديد الكل كمقروء", "Mark all as read")}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2"
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {t("تحديث", "Refresh")}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Bell,
            value: stats.total,
            label: t("الكل", "Total"),
            color: "text-primary",
          },
          {
            icon: BellRing,
            value: stats.unread,
            label: t("غير مقروء", "Unread"),
            color: "text-destructive",
          },
          {
            icon: BellOff,
            value: stats.read,
            label: t("مقروء", "Read"),
            color: "text-muted-foreground",
          },
          {
            icon: AlertCircle,
            value: stats.alerts,
            label: t("تنبيهات", "Alerts"),
            color: "text-yellow-600",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } w-4 h-4 text-muted-foreground`}
              />
              <Input
                placeholder={t(
                  "بحث في الإشعارات...",
                  "Search notifications..."
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isRTL ? "pr-10" : "pl-10"}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="w-4 h-4 me-2" />
                <SelectValue placeholder={t("النوع", "Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                <SelectItem value="registration">
                  {t("تسجيل", "Registration")}
                </SelectItem>
                <SelectItem value="certificate">
                  {t("شهادة", "Certificate")}
                </SelectItem>
                <SelectItem value="alert">{t("تنبيه", "Alert")}</SelectItem>
                <SelectItem value="workshop">
                  {t("ورشة", "Workshop")}
                </SelectItem>
                <SelectItem value="coupon">{t("كوبون", "Coupon")}</SelectItem>
                <SelectItem value="system">{t("نظام", "System")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRead} onValueChange={setFilterRead}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder={t("الحالة", "Status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                <SelectItem value="unread">
                  {t("غير مقروء", "Unread")}
                </SelectItem>
                <SelectItem value="read">{t("مقروء", "Read")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="w-5 h-5 text-primary" />
            {t("جميع الإشعارات", "All Notifications")}
            <span className="text-sm font-normal text-muted-foreground">
              ({filtered.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              <AnimatePresence>
                {filtered.map((notification, index) => {
                  const config = getTypeConfig(notification.type);
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      transition={{ delay: index * 0.04 }}
                      className={`p-4 cursor-pointer transition-colors group ${
                        notification.isRead
                          ? "bg-background hover:bg-muted/30"
                          : "bg-primary/5 hover:bg-primary/8"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}
                        >
                          <Icon className={`w-5 h-5 ${config.iconColor}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            )}
                            <Badge
                              variant="outline"
                              className={`${config.badgeColor} gap-1 text-xs`}
                            >
                              <Icon className="w-3 h-3" />
                              {t(config.labelAr, config.labelEn)}
                            </Badge>
                          </div>
                          <h4
                            className={`font-medium ${
                              !notification.isRead
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {t(notification.titleAr, notification.titleEn)}
                          </h4>
                          {(notification.descriptionAr ||
                            notification.descriptionEn) && (
                            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                              {t(
                                notification.descriptionAr || "",
                                notification.descriptionEn || ""
                              )}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTime(notification.createdAt)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              title={t("تحديد كمقروء", "Mark as read")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            title={t("حذف", "Delete")}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <BellOff className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    {t("لا توجد إشعارات", "No notifications")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(
                      "ستظهر الإشعارات الجديدة هنا",
                      "New notifications will appear here"
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;
