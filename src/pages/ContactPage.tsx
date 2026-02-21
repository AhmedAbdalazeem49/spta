import BranchesSection from "@/components/BranchesSection";
import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";
import Hero from "@/components/Contact/Hero";
import Layout from "@/components/layout/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <Hero />
      <ContactInfo />
      <ContactForm />
      <BranchesSection />
    </Layout>
  );
};

export default ContactPage;
