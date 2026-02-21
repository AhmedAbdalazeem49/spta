import Layout from "@/components/layout/Layout";
import Benefits from "@/components/MembershipBenefits/Benefits";
import Cta from "@/components/MembershipBenefits/Cta";
import Hero from "@/components/MembershipBenefits/Hero";
import Partners from "@/components/MembershipBenefits/Partners";

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
