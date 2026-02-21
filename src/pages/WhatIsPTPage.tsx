import Layout from "@/components/layout/Layout";
import Benefits from "@/components/WhatIsPt/Benefits";
import Clarifications from "@/components/WhatIsPt/Clarifications";
import Conditions from "@/components/WhatIsPt/Conditions";
import Cta from "@/components/WhatIsPt/Cta";
import Hero from "@/components/WhatIsPt/Hero";

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
