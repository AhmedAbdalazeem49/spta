import BranchesSection from "@/components/BranchesSection";
import About from "@/components/Home/About";
import DownloadApp from "@/components/Home/DownloadApp";
import Hero from "@/components/Home/Hero";
import Research from "@/components/Home/Research";
import Stats from "@/components/Home/Stats";
import WorkAreasSection from "@/components/Home/WorkAreasSection";
import Layout from "@/components/layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <WorkAreasSection />
      <Stats />
      <Research />
      <DownloadApp />
      <BranchesSection />
    </Layout>
  );
};

export default HomePage;
