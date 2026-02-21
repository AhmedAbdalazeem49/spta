import Layout from "@/components/layout/Layout";
import Chart from "@/components/MembersCount/Chart";
import GeographicalDistribution from "@/components/MembersCount/GeographicalDistribution";
import Hero from "@/components/MembersCount/Hero";
import Stats from "@/components/MembersCount/Stats";

const MembersCountPage = () => {
  return (
    <Layout>
      <Hero />
      <Stats />
      <GeographicalDistribution />
      {/* <Chart /> */}
    </Layout>
  );
};

export default MembersCountPage;
