import Layout from "@/components/layout/Layout";
import Hero from "@/user/components/VisionMission/Hero";
import Objectives from "@/user/components/VisionMission/Objectives";
import Values from "@/user/components/VisionMission/Values";
import VisionMission from "@/user/components/VisionMission/VisionMission";


const VisionMissionPage = () => {
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
