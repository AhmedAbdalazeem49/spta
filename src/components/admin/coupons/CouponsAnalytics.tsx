import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { Coupon } from "@/types/coupon";
import { Sparkles, TrendingUp } from "lucide-react";

interface CouponsAnalyticsProps {
  coupons: Coupon[];
}

export const CouponsAnalytics = ({ coupons }: CouponsAnalyticsProps) => {
  const { t } = useLanguage();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Usage Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t("استخدام الأكواد", "Code Usage")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/50 rounded-xl flex items-center justify-center">
            <p className="text-muted-foreground">
              {t("رسم بياني للاستخدام", "Usage Chart")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Codes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-accent" />
            {t("أكثر الأكواد استخداماً", "Most Used Codes")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...coupons]
              .sort((a, b) => b.usedCount - a.usedCount)
              .slice(0, 5)
              .map((code, index) => (
                <div key={code.id} className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-muted-foreground w-8">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono font-medium truncate">
                      {code.code}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {code.usedCount} {t("استخدام", "uses")}
                    </p>
                  </div>
                  <Progress
                    value={
                      code.maxUsage > 0
                        ? (code.usedCount / code.maxUsage) * 100
                        : 0
                    }
                    className="w-24 h-2"
                  />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
