import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ConferenceNavbar from './ConferenceNavbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const ConferenceLayout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-franklin">
      <ConferenceNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default ConferenceLayout;
