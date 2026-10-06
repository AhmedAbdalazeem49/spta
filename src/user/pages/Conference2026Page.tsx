import ConferenceLayout from "@/components/layout/ConferenceLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import AOS from "aos";
import { useEffect } from "react";
import { Exhibitor } from "../components/Conference2024/Exhibitor";
import { HeroSection } from "../components/Conference2024/HeroSection";
import { InteractiveTabs } from "../components/Conference2024/InteractiveTabs";
import { PresidentWord2026 } from "../components/Conference2024/PresidentWord2026";
import { PricingSection } from "../components/Conference2024/PricingSection";
import { SponsorsSlider } from "../components/Conference2024/SponsorsSlider";
import { StrategicPartner } from "../components/Conference2024/StrategicPartner";

const Conference2026Page = () => {
  const { t } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <ConferenceLayout>
      <HeroSection />

      {/* Newly designed President's Word */}
      <PresidentWord2026 />

      <StrategicPartner />

      {/* Foundation / Institutional Partner moved up */}
      <Exhibitor />

      {/* <PricingSection /> */}

      <InteractiveTabs />
      {/* <SponsorsSlider /> */}
    </ConferenceLayout>
  );
};

export default Conference2026Page;
