import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Hero from "@/components/VisionMission/Hero";
import Objectives from "@/components/VisionMission/Objectives";
import Values from "@/components/VisionMission/Values";
import VisionMission from "@/components/VisionMission/VisionMission";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Eye,
  Flag,
  Globe,
  Heart,
  Lightbulb,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const VisionMissionPage = () => {
  const { t, isRTL } = useLanguage();

  return (
    <Layout>
      <Hero />
      <VisionMission />
      <Objectives />
      <Values />
    </Layout>
  );
};

export default VisionMissionPage;
