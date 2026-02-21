import Layout from "@/components/layout/Layout";
import Cta from "@/components/Research/Cta";
import Databases from "@/components/Research/Databases";
import EBP from "@/components/Research/EBP";
import Hero from "@/components/Research/Hero";
import Tools from "@/components/Research/Tools";

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
