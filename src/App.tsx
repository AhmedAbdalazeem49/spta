import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import AboutPage from "./pages/AboutPage";
import BookletsPage from "./pages/BookletsPage";
import BrochuresPage from "./pages/BrochuresPage";
import CertificatesPage from "./pages/CertificatesPage";
import ContactPage from "./pages/ContactPage";
import CopyrightPage from "./pages/CopyrightPage";
import DatabasesPage from "./pages/DatabasesPage";
import DigitalCardPage from "./pages/DigitalCardPage";
import DiscountCodesPage from "./pages/DiscountCodesPage";
import EmailNotificationsPage from "./pages/EmailNotificationsPage";
import HomePage from "./pages/HomePage";
import InternationalRelationsPage from "./pages/InternationalRelationsPage";
import LibraryPage from "./pages/LibraryPage";
import LoginPage from "./pages/LoginPage";
import MembersCountPage from "./pages/MembersCountPage";
import MembershipBenefitsPage from "./pages/MembershipBenefitsPage";
import MembershipManagementPage from "./pages/MembershipManagementPage";
import MembershipTypesPage from "./pages/MembershipTypesPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";
import PoliciesPage from "./pages/PoliciesPage";
import PresidentMessagePage from "./pages/PresidentMessagePage";
import PreviousBoardsPage from "./pages/PreviousBoardsPage";
import ProfilePage from "./pages/ProfilePage";
import ResearchCenterPage from "./pages/ResearchCenterPage";
import ResearchPage from "./pages/ResearchPage";
import ScientificJournalPage from "./pages/ScientificJournalPage";
import SignupPage from "./pages/SignupPage";
import SpecializationsPage from "./pages/SpecializationsPage";
import VideosPage from "./pages/VideosPage";
import VisionMissionPage from "./pages/VisionMissionPage";
import WhatIsPTPage from "./pages/WhatIsPTPage";
import WorkshopsPage from "./pages/WorkshopsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* About Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/about/vision-mission"
              element={<VisionMissionPage />}
            />
            <Route
              path="/about/president-message"
              element={<PresidentMessagePage />}
            />
            <Route
              path="/about/previous-boards"
              element={<PreviousBoardsPage />}
            />
            <Route path="/about/what-is-pt" element={<WhatIsPTPage />} />
            <Route
              path="/about/international"
              element={<InternationalRelationsPage />}
            />
            {/* Copyrights In the Footer */}
            <Route path="/about/copyright" element={<CopyrightPage />} />
            {/* Policies In the Footer */}
            <Route path="/about/policies" element={<PoliciesPage />} />
            <Route path="/about/*" element={<AboutPage />} />

            {/* Research Pages */}
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/research/center" element={<ResearchCenterPage />} />
            <Route path="/research/databases" element={<DatabasesPage />} />
            <Route path="/research/*" element={<ResearchPage />} />

            {/* Library Pages */}
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/booklets" element={<BookletsPage />} />
            <Route path="/brochures" element={<BrochuresPage />} />
            <Route path="/videos" element={<VideosPage />} />

            {/* Specialization */}
            <Route path="/specializations" element={<SpecializationsPage />} />

            {/* Journal Page */}
            <Route path="/journal" element={<ScientificJournalPage />} />

            {/* News Page */}
            <Route path="/news" element={<NewsPage />} />

            {/* Contact Us Page */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Membership Pages */}
            <Route
              path="/membership/benefits"
              element={<MembershipBenefitsPage />}
            />
            <Route
              path="/membership"
              element={<MembershipBenefitsPage />}
            />
            <Route path="/membership/types" element={<MembershipTypesPage />} />
            <Route path="/membership/count" element={<MembersCountPage />} />
            <Route
              path="/membership/management"
              element={<MembershipManagementPage />}
            />
            <Route path="/membership/card" element={<DigitalCardPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/profile" element={<ProfilePage />} />

            <Route path="*" element={<NotFound />} />

            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route
              path="/workshops/certificates"
              element={<CertificatesPage />}
            />
            <Route path="/workshops/codes" element={<DiscountCodesPage />} />

            <Route
              path="/communications/emails"
              element={<EmailNotificationsPage />}
            />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
