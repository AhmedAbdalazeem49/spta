import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import type { Plan } from "../components/Membership/Plans";

import Benefits from "@/user/components/Membership/Benefits";
import GeographicalDistribution from "@/user/components/Membership/GeographicalDistribution";
import Hero from "@/user/components/Membership/Hero";
import Stats from "@/user/components/Membership/Stats";
import HeroCount from "../components/Membership/HeroCount";
import Plans from "../components/Membership/Plans";

const Membership = () => {
  const { t, isRTL } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: { pathname: "/membership" } },
      });

      return;
    }

    // ✅ Go to payment page FIRST
    navigate("/payment", {
      state: {
        type: "membership",

        item: {
          key: plan.key,
          nameEn: plan.nameEn,
          nameAr: plan.nameAr,
          price: plan.price,
          priceValue: plan.price,
        },
      },
    });
  };

  return (
    <Layout>
      <Hero />
      <Benefits />

      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">
              {t("اختر العضوية المناسبة", "Choose Membership")}
            </h2>

            <p className="text-muted-foreground mt-2">
              {t(
                "اختر الخطة المناسبة لك حسب مستواك",
                "Choose the plan that fits your level"
              )}
            </p>
          </div>

          <Plans
            t={t}
            isRTL={isRTL}
            onSelect={(plan: Plan) => handleSelectPlan(plan)}
          />
        </div>
      </section>

      {/* <HeroCount /> */}
      {/* <Stats /> */}
      {/* <GeographicalDistribution /> */}
    </Layout>
  );
};

export default Membership;
