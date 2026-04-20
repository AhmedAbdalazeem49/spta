import Layout from "@/components/layout/Layout";
import Benefits from "@/user/components/WhatIsPt/Benefits";
import Clarifications from "@/user/components/WhatIsPt/Clarifications";
import Conditions from "@/user/components/WhatIsPt/Conditions";
import Hero from "@/user/components/WhatIsPt/Hero";

const WhatIsPTPage = () => {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <Clarifications />
      <Conditions />
    </Layout>
  );
};

export default WhatIsPTPage;
