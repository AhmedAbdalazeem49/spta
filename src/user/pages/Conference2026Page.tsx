import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroSection } from "../components/Conference2024/HeroSection";
import { StrategicPartner } from "../components/Conference2024/StrategicPartner";
import { SponsorsSlider } from "../components/Conference2024/SponsorsSlider";
import { Exhibitor } from "../components/Conference2024/Exhibitor";
import { InteractiveTabs } from "../components/Conference2024/InteractiveTabs";
import { PresidentWord2026 } from "../components/Conference2024/PresidentWord2026";
import { ReviewsSection } from "../components/Conference2024/ReviewsSection";
import { PricingSection } from "../components/Conference2024/PricingSection";
import AOS from "aos";
import { useEffect } from "react";

const Conference2026Page = () => {
  const { t } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Layout>
      <HeroSection />
      
      {/* Newly designed President's Word */}
      <PresidentWord2026 />
      
      {/* Foundation / Institutional Partner moved up */}
      <Exhibitor />
      
      <StrategicPartner />
      
      <SponsorsSlider />

      {/* <PricingSection /> */}
      
      <InteractiveTabs />

      <ReviewsSection />
    </Layout>
  );
};

export default Conference2026Page;
