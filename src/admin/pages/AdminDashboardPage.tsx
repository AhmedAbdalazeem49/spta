// AdminDashboardPage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  Crown,
  Award,
  TrendingUp,
  ArrowRight,
  Eye,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import api from "@/services/api";

const AdminDashboardPage = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    users: 0,
    workshops: 0,
    memberships: 0,
    certificates: 0,
    visitors: 0,
    coupons: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          usersRes,
          workshopsRes,
          membershipsRes,
          visitorsRes,
          couponsRes,
        ] = await Promise.allSettled([
          api.get("/admin/users"),
          api.get("/workshops"),
          api.get("/admin/memberships"),
          api.get("/admin/visitors"),
          api.get("/coupons"),
        ]);

        setStats({
          users:
            usersRes.status === "fulfilled"
              ? usersRes.value.data?.data?.length ||
                usersRes.value.data?.length ||
                0
              : 0,
          workshops:
            workshopsRes.status === "fulfilled"
              ? workshopsRes.value.data?.data?.length ||
                workshopsRes.value.data?.length ||
                0
              : 0,
          memberships:
            membershipsRes.status === "fulfilled"
              ? membershipsRes.value.data?.data?.length ||
                membershipsRes.value.data?.length ||
                0
              : 0,
          certificates: 0,
          visitors:
            visitorsRes.status === "fulfilled"
              ? visitorsRes.value.data?.data?.length ||
                visitorsRes.value.data?.length ||
                0
              : 0,
          coupons:
            couponsRes.status === "fulfilled"
              ? couponsRes.value.data?.data?.length ||
                couponsRes.value.data?.length ||
                0
              : 0,
        });
      } catch {
        // fallback to 0
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: t("المستخدمون", "Users"),
      count: stats.users,
      icon: Users,
      color: "from-brand-blue to-deep-blue",
      link: "/admin/users",
    },
    {
      title: t("ورش العمل", "Workshops"),
      count: stats.workshops,
      icon: GraduationCap,
      color: "from-teal to-aqua-teal",
      link: "/admin/workshops",
    },
    {
      title: t("العضويات", "Memberships"),
      count: stats.memberships,
      icon: Crown,
      color: "from-mint to-teal",
      link: "/admin/memberships",
    },
    {
      title: t("الشهادات", "Certificates"),
      count: stats.certificates,
      icon: Award,
      color: "from-deep-blue to-midnight",
      link: "/admin/certificates",
    },
    {
      title: t("عدد الزوار", "Visitors"),
      count: stats.visitors,
      icon: Eye,
      color: "from-orange-400 to-orange-600",
      link: "/admin/visitors",
    },
    {
      title: t("أكواد الخصم", "Coupons"),
      count: stats.coupons,
      icon: Ticket,
      color: "from-purple-500 to-purple-700",
      link: "/admin/coupons",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("نظرة عامة", "Overview")}</h2>
        <p className="text-muted-foreground">
          {t("ملخص سريع للنظام", "Quick system summary")}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white`}
                  >
                    <card.icon className="w-5 h-5" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-accent" />
                </div>
                <p className="text-3xl font-bold">{card.count}</p>
                <p className="text-sm text-muted-foreground mb-3">
                  {card.title}
                </p>
                <Link to={card.link}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 px-0 text-primary hover:text-primary/80"
                  >
                    {t("عرض الكل", "View All")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
