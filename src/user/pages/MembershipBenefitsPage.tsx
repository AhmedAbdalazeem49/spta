import Layout from "@/components/layout/Layout";
import Benefits from "@/user/components/MembershipBenefits/Benefits";
import Hero from "@/user/components/MembershipBenefits/Hero";
import MembershipSubscribePage from "./MembershipSubscribePage";
import MembersCountPage from "./MembersCountPage";

const MembershipBenefitsPage = () => {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <MembershipSubscribePage />
      <MembersCountPage />
    </Layout>
  );
};

export default MembershipBenefitsPage;
