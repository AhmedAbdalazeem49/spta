import Layout from "@/components/layout/Layout";
import Cta from "@/user/components/Specialization/Cta";
import Hero from "@/user/components/Specialization/Hero";
import SpecializationItems from "@/user/components/Specialization/SpecializationItems";

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
