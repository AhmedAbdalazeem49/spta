import EditorialBoard from "@/components/Journal/EditorialBoard";
import Features from "@/components/Journal/Features";
import Hero from "@/components/Journal/Hero";
import Info from "@/components/Journal/Info";
import Submissions from "@/components/Journal/Submissions";
import Layout from "@/components/layout/Layout";

const ScientificJournalPage = () => {
  return (
    <Layout>
      <Hero />
      <Info />
      <Features />
      <EditorialBoard />
      <Submissions />
    </Layout>
  );
};

export default ScientificJournalPage;
