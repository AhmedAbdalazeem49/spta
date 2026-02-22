import Layout from "@/components/layout/Layout";
import Chart from "@/user/components/MembersCount/Chart";
import GeographicalDistribution from "@/user/components/MembersCount/GeographicalDistribution";
import Hero from "@/user/components/MembersCount/Hero";
import Stats from "@/user/components/MembersCount/Stats";

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
