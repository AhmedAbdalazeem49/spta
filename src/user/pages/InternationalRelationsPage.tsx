import Hero from "@/user/components/International/Hero";
import Partnerships from "@/user/components/International/Partnerships";
import Timeline from "@/user/components/International/Timeline";
import WorldPhysiotherapy from "@/user/components/International/WorldPhysiotherapy";
import Layout from "@/components/layout/Layout";

const InternationalRelationsPage = () => {
  return (
    <Layout>
      <Hero />
      <WorldPhysiotherapy />
      <Partnerships />
      <Timeline />
    </Layout>
  );
};

export default InternationalRelationsPage;
