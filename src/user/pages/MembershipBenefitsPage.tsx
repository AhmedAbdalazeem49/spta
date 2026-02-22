import Layout from "@/components/layout/Layout";
import Benefits from "@/user/components/MembershipBenefits/Benefits";
import Cta from "@/user/components/MembershipBenefits/Cta";
import Hero from "@/user/components/MembershipBenefits/Hero";
import Partners from "@/user/components/MembershipBenefits/Partners";

const MembershipBenefitsPage = () => {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <Partners />
      <Cta />
    </Layout>
  );
};

export default MembershipBenefitsPage;
