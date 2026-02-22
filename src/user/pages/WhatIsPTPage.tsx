import Layout from "@/components/layout/Layout";
import Benefits from "@/user/components/WhatIsPt/Benefits";
import Clarifications from "@/user/components/WhatIsPt/Clarifications";
import Conditions from "@/user/components/WhatIsPt/Conditions";
import Cta from "@/user/components/WhatIsPt/Cta";
import Hero from "@/user/components/WhatIsPt/Hero";

const WhatIsPTPage = () => {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <Clarifications />
      <Conditions />
      <Cta />
    </Layout>
  );
};

export default WhatIsPTPage;
