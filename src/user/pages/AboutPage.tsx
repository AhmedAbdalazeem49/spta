import Hero from "@/user/components/About/Hero";
import Leadership from "@/user/components/About/Leadership";
import Objectives from "@/user/components/About/Objectives";
import Partners from "@/user/components/About/Partners";
import Quote from "@/user/components/About/Quote";
import VisionMission from "@/user/components/About/VisionMission";
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
    </Layout>
  );
};

export default AboutPage;
