import Layout from "@/components/layout/Layout";
import Benefits from "@/user/components/MembershipBenefits/Benefits";
import Hero from "@/user/components/MembershipBenefits/Hero";
import Partners from "@/user/components/MembershipBenefits/Partners";

const MembershipBenefitsPage = () => {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <Partners />
    </Layout>
  );
};

export default MembershipBenefitsPage;
