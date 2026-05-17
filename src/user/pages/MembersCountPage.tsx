import Layout from "@/components/layout/Layout";
import GeographicalDistribution from "@/user/components/MembersCount/GeographicalDistribution";
import Hero from "@/user/components/MembersCount/Hero";
import Stats from "@/user/components/MembersCount/Stats";

const MembersCountPage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <GeographicalDistribution />
    </>
  );
};

export default MembersCountPage;
