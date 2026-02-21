import Layout from "@/components/layout/Layout";
import Conditions from "@/components/MembershipTypes/Conditions";
import Cta from "@/components/MembershipTypes/Cta";
import Hero from "@/components/MembershipTypes/Hero";
import Types from "@/components/MembershipTypes/Types";

const MembershipTypesPage = () => {
  return (
    <Layout>
      <Hero />
      <Types />
      <Conditions />
      <Cta />
    </Layout>
  );
};

export default MembershipTypesPage;
