import Layout from "@/components/layout/Layout";
import Hero from "@/components/News/Hero";
import NewsItems from "@/components/News/NewsItems";

const NewsPage = () => {
  return (
    <Layout>
      <Hero />
      <NewsItems />
    </Layout>
  );
};

export default NewsPage;
