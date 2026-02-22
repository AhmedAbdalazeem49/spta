import Collaborations from "@/user/components/Center/Collaborations";
import Cta from "@/user/components/Center/Cta";
import Hero from "@/user/components/Center/Hero";
import OrganizationalStructure from "@/user/components/Center/OrganizationalStructure";
import ResearchAreas from "@/user/components/Center/ResearchAreas";
import Stats from "@/user/components/Center/Stats";
import Layout from "@/components/layout/Layout";

const ResearchCenterPage = () => {
  return (
    <Layout>
      <Hero />
      <Stats />
      <ResearchAreas />
      <OrganizationalStructure />
      <Collaborations />
      <Cta />
    </Layout>
  );
};

export default ResearchCenterPage;
