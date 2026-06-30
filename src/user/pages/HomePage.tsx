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
import Message from "../components/PresidentMessage/Message";
import AdvertisementsSection from "@/user/components/Home/AdvertisementsSection";
import Partners from "@/user/components/About/Partners";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <Quote />
      <About />
      <Message />
      <Stats />
      <WorkAreasSection />
      {/* <Research /> */}
      {/* <DownloadApp /> */}
      {/* <BranchesSection /> */}
      <AdvertisementsSection />
      <Partners />
    </Layout>
  );
};

export default HomePage;
