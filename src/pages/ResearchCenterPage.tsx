import Collaborations from "@/components/Center/Collaborations";
import Cta from "@/components/Center/Cta";
import Hero from "@/components/Center/Hero";
import OrganizationalStructure from "@/components/Center/OrganizationalStructure";
import ResearchAreas from "@/components/Center/ResearchAreas";
import Stats from "@/components/Center/Stats";
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
