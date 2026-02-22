import Layout from "@/components/layout/Layout";
import Cta from "@/user/components/Research/Cta";
import Databases from "@/user/components/Research/Databases";
import EBP from "@/user/components/Research/EBP";
import Hero from "@/user/components/Research/Hero";
import Tools from "@/user/components/Research/Tools";

const ResearchPage = () => {
  return (
    <Layout>
      <Hero />
      <EBP />
      <Databases />
      <Tools />
      <Cta />
    </Layout>
  );
};

export default ResearchPage;
