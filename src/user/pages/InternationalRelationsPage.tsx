import Hero from "@/user/components/International/Hero";
import Partnerships from "@/user/components/International/Partnerships";
import SaudiRepresentatives from "@/user/components/International/SaudiRepresentatives";
import Timeline from "@/user/components/International/Timeline";
import WorldPhysiotherapy from "@/user/components/International/WorldPhysiotherapy";
import Layout from "@/components/layout/Layout";

const InternationalRelationsPage = () => {
  return (
    <Layout>
      <Hero />
      <WorldPhysiotherapy />
      <SaudiRepresentatives />
      <Partnerships />
      <Timeline />
    </Layout>
  );
};

export default InternationalRelationsPage;
