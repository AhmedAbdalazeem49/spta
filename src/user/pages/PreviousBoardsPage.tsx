import BoardsCards from "@/user/components/Boards/BoardsCards";
import Cta from "@/user/components/Boards/Cta";
import Hero from "@/user/components/Boards/Hero";
import LegacyStats from "@/user/components/Boards/LegacyStats";
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
