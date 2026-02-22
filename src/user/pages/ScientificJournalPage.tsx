import EditorialBoard from "@/user/components/Journal/EditorialBoard";
import Features from "@/user/components/Journal/Features";
import Hero from "@/user/components/Journal/Hero";
import Info from "@/user/components/Journal/Info";
import Submissions from "@/user/components/Journal/Submissions";
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
