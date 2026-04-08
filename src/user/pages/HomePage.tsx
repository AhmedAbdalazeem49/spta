import BranchesSection from "@/components/BranchesSection";
import About from "@/user/components/Home/About";
import DownloadApp from "@/user/components/Home/DownloadApp";
import Hero from "@/user/components/Home/Hero";
import LatestNews from "@/user/components/Home/LatestNews";
import Research from "@/user/components/Home/Research";
import Stats from "@/user/components/Home/Stats";
import WorkAreasSection from "@/user/components/Home/WorkAreasSection";
import Quote from "@/user/components/About/Quote";
import Layout from "@/components/layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Quote />
      {/* <WorkAreasSection /> */}
      <Stats />
      <LatestNews />
      {/* <Research /> */}
      {/* <DownloadApp /> */}
      {/* <BranchesSection /> */}
    </Layout>
  );
};

export default HomePage;
