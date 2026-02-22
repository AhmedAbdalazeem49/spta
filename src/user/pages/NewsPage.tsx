import Layout from "@/components/layout/Layout";
import Hero from "@/user/components/News/Hero";
import NewsItems from "@/user/components/News/NewsItems";

const NewsPage = () => {
  return (
    <Layout>
      <Hero />
      <NewsItems />
    </Layout>
  );
};

export default NewsPage;
