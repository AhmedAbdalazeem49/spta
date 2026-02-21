import BoardsCards from "@/components/Boards/BoardsCards";
import Cta from "@/components/Boards/Cta";
import Hero from "@/components/Boards/Hero";
import LegacyStats from "@/components/Boards/LegacyStats";
import Layout from "@/components/layout/Layout";

const PreviousBoardsPage = () => {
  return (
    <Layout>
      <Hero />
      <BoardsCards />
      <LegacyStats />
      <Cta />
    </Layout>
  );
};

export default PreviousBoardsPage;
