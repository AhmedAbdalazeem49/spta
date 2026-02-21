import Layout from "@/components/layout/Layout";
import Cta from "@/components/Specialization/Cta";
import Hero from "@/components/Specialization/Hero";
import SpecializationItems from "@/components/Specialization/SpecializationItems";

const SpecializationsPage = () => {
  return (
    <Layout>
      <Hero />
      <SpecializationItems />
      <Cta />
    </Layout>
  );
};

export default SpecializationsPage;
