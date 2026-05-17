import BranchesSection from "@/components/BranchesSection";
import ContactForm from "@/user/components/Contact/ContactForm";
import ContactInfo from "@/user/components/Contact/ContactInfo";
import Hero from "@/user/components/Contact/Hero";
import Layout from "@/components/layout/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <Hero />
      <ContactInfo />
      {/* <ContactForm /> */}
      <BranchesSection />
    </Layout>
  );
};

export default ContactPage;
