import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroSection } from "../components/Conference2024/HeroSection";
import { StrategicPartner } from "../components/Conference2024/StrategicPartner";
import { SponsorsSlider } from "../components/Conference2024/SponsorsSlider";
import { Exhibitor } from "../components/Conference2024/Exhibitor";
import { InteractiveTabs } from "../components/Conference2024/InteractiveTabs";
import AOS from "aos";
import { useEffect } from "react";
import Message from "../components/PresidentMessage/Message";

const Conference2024Page = () => {
  const { t } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Layout>
      <HeroSection />
      
      {/* Reused President's Message */}
      <div className="py-12 bg-background">
        <Message />
      </div>
      
      <StrategicPartner />
      <SponsorsSlider />
      <Exhibitor />
      <InteractiveTabs />
    </Layout>
  );
};

export default Conference2024Page;
