import Layout from "@/components/layout/Layout";
import Conditions from "@/user/components/MembershipTypes/Conditions";
import Cta from "@/user/components/MembershipTypes/Cta";
import Hero from "@/user/components/MembershipTypes/Hero";
import Types from "@/user/components/MembershipTypes/Types";

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
