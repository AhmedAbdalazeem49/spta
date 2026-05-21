import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { Coupon } from "@/types/coupon";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Percent,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";

interface CouponsAnalyticsProps {
  coupons: Coupon[];
}

export const CouponsAnalytics = ({ coupons }: CouponsAnalyticsProps) => {
  const { t } = useLanguage();

  /* -------------------------
   * COMPUTED INSIGHTS
   * ------------------------- */

  const total = coupons.length;

  const active = coupons.filter(
    (c) => c.isActive && (!c.usageLimit || c.usedCount < c.usageLimit)
  ).length;

  const expired = coupons.filter(
    (c) => c.endDate && new Date(c.endDate).getTime() < new Date().getTime()
  ).length;

  const totalUsage = coupons.reduce((a, c) => a + c.usedCount, 0);

  const avgDiscount =
    total > 0
      ? Math.round(
          coupons.reduce((a, c) => a + (c.discountPercentage || 0), 0) / total
        )
      : 0;

  const topCoupons = [...coupons]
    .sort((a, b) => b.usedCount - a.usedCount)
    .slice(0, 6);

  const usageRate =
    coupons.length > 0 ? Math.round((totalUsage / (total * 10 || 1)) * 100) : 0;

  /* -------------------------
   * UI
   * ------------------------- */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            {t("تحليلات الأكواد", "Coupons Intelligence")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t(
              "رؤية شاملة لأداء الأكواد داخل النظام",
              "System-wide coupon performance insights"
            )}
          </p>
        </div>

        <Sparkles className="w-5 h-5 text-primary/70" />
      </div>

      {/* KPI GRID */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-muted/50">
          <CardContent className="p-4">
            <Ticket className="w-5 h-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-xs text-muted-foreground">
              {t("إجمالي الأكواد", "Total Coupons")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-muted/50">
          <CardContent className="p-4">
            <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-2xl font-bold">{active}</p>
            <p className="text-xs text-muted-foreground">
              {t("أكواد نشطة", "Active")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-muted/50">
          <CardContent className="p-4">
            <AlertTriangle className="w-5 h-5 text-red-500 mb-2" />
            <p className="text-2xl font-bold">{expired}</p>
            <p className="text-xs text-muted-foreground">
              {t("منتهية", "Expired")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-muted/50">
          <CardContent className="p-4">
            <Percent className="w-5 h-5 text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{avgDiscount}%</p>
            <p className="text-xs text-muted-foreground">
              {t("متوسط الخصم", "Avg Discount")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* USAGE OVERVIEW */}
      <Card className="border-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4 text-primary" />
            {t("معدل الاستخدام", "Usage Rate")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Progress value={usageRate} className="h-2" />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {t("إجمالي الاستخدام", "Total usage")}: {totalUsage}
            </span>
            <span>{usageRate}%</span>
          </div>
        </CardContent>
      </Card>

      {/* TOP COUPONS */}
      <Card className="border-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-4 h-4 text-green-500" />
            {t("الأكواد الأكثر أداءً", "Top Performing Coupons")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {topCoupons.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              {t("لا توجد بيانات", "No data available")}
            </p>
          )}

          {topCoupons.map((coupon, index) => {
            const progress =
              coupon.usageLimit > 0
                ? (coupon.usedCount / coupon.usageLimit) * 100
                : 0;

            return (
              <div
                key={coupon.id}
                className="flex items-center gap-4 p-3 rounded-xl border hover:bg-muted/40 transition"
              >
                {/* Rank */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-mono font-semibold text-sm">
                    {coupon.code}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{coupon.usedCount} uses</span>
                    <span>•</span>
                    <span>{Math.round(progress)}% capacity</span>
                  </div>

                  <Progress value={progress} className="h-1.5 mt-2" />
                </div>

                {/* Badge */}
                <div className="text-xs font-semibold px-2 py-1 rounded-md bg-muted">
                  {Math.round(progress)}%
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
