import Hero from "@/components/International/Hero";
import Partnerships from "@/components/International/Partnerships";
import SaudiRepresentatives from "@/components/International/SaudiRepresentatives";
import Timeline from "@/components/International/Timeline";
import WorldPhysiotherapy from "@/components/International/WorldPhysiotherapy";
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
