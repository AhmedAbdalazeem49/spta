import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Coupon } from "@/types/coupon";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Calendar, CheckCircle, Clock, Copy, Edit, Gift, Link2, Percent, Trash2, Users } from "lucide-react";

interface CouponsListProps {
  coupons: Coupon[];
  isLoading: boolean;
  onOpenEdit: (coupon: Coupon) => void;
  onOpenDelete: (coupon: Coupon) => void;
  onCopyCode: (code: string) => void;
}

export const CouponsList = ({
  coupons,
  isLoading,
  onOpenEdit,
  onOpenDelete,
  onCopyCode,
}: CouponsListProps) => {
  const { t, isRTL } = useLanguage();

  const getTypeBadge = (type: string) => {
    if (type === "free") {
      return (
        <Badge className="bg-green-accent/10 text-green-accent border-green-accent/30 gap-1">
          <Gift className="w-3 h-3" />
          {t("مجاني", "Free")}
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="bg-primary/10 text-primary border-primary/30 gap-1"
      >
        <Percent className="w-3 h-3" />
        {t("خصم", "Discount")}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<
      string,
      { color: string; icon: any; labelAr: string; labelEn: string }
    > = {
      active: {
        color: "bg-green-accent/10 text-green-accent border-green-accent/30",
        icon: CheckCircle,
        labelAr: "نشط",
        labelEn: "Active",
      },
      expired: {
        color: "bg-destructive/10 text-destructive border-destructive/30",
        icon: Clock,
        labelAr: "منتهي",
        labelEn: "Expired",
      },
      used: {
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        icon: AlertCircle,
        labelAr: "مستنفد",
        labelEn: "Used Up",
      },
    };
    const config = configs[status] || configs.expired;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-72 rounded-xl" />
        ))}
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">
          {t("لا توجد أكواد", "No codes found")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {coupons.map((code, index) => (
          <motion.div
            key={code.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.07 }}
          >
            <Card className="overflow-hidden group h-full hover:shadow-md transition-shadow">
              <div
                className={`h-2 ${
                  code.type === "free"
                    ? "bg-gradient-to-r from-green-accent to-green-light"
                    : "bg-gradient-to-r from-primary to-blue-light"
                }`}
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getTypeBadge(code.type)}
                    {getStatusBadge(code.status)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => onCopyCode(code.code)}
                    title={t("نسخ", "Copy")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 mb-4 text-center group-hover:bg-muted transition-colors">
                  <p className="text-xs text-muted-foreground mb-1">
                    {t("الكود", "Code")}
                  </p>
                  <p className="text-2xl font-mono font-bold tracking-wider text-primary">
                    {code.code}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <span
                    className={`text-4xl font-bold ${
                      code.type === "free"
                        ? "text-green-accent"
                        : "text-primary"
                    }`}
                  >
                    {code.discountPercent}%
                  </span>
                  <span className="text-muted-foreground">
                    {code.type === "free"
                      ? t("حضور مجاني", "Free Attendance")
                      : t("خصم", "Discount")}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {t("الاستخدام", "Usage")}
                    </span>
                    <span className="font-medium">
                      {code.usedCount}/
                      {code.maxUsage === 0 ? "∞" : code.maxUsage}
                    </span>
                  </div>
                  <Progress
                    value={
                      code.maxUsage > 0
                        ? (code.usedCount / code.maxUsage) * 100
                        : 0
                    }
                    className="h-2"
                  />
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    {code.validFrom || "—"} → {code.validTo || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Link2 className="w-4 h-4 text-primary shrink-0" />
                    {t(code.linkedWorkshopAr, code.linkedWorkshopEn)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => onOpenEdit(code)}
                  >
                    <Edit className="w-4 h-4" />
                    {t("تعديل", "Edit")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive hover:text-destructive hover:border-destructive/50"
                    onClick={() => onOpenDelete(code)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
