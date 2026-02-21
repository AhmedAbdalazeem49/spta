import Cta from "@/components/About/Cta";
import Hero from "@/components/About/Hero";
import Leadership from "@/components/About/Leadership";
import Objectives from "@/components/About/Objectives";
import Partners from "@/components/About/Partners";
import Quote from "@/components/About/Quote";
import VisionMission from "@/components/About/VisionMission";
import Layout from "@/components/layout/Layout";


const AboutPage = () => {
  return (
    <Layout>
      <Hero />
      <VisionMission />
      <Objectives />
      <Leadership />
      <Quote />
      <Partners />
      <Cta />
    </Layout>
  );
};

export default AboutPage;
