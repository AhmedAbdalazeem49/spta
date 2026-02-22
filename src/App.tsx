import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Chatbot from "./components/Chatbot";
import AboutPage from "./user/pages/AboutPage";
import AdminMembershipsPage from "./admin/pages/AdminMembershipsPage";
import MembershipSubscribePage from "./admin/pages/MembershipSubscribePage";
import BookletsPage from "./user/pages/BookletsPage";
import BrochuresPage from "./user/pages/BrochuresPage";
import CertificatesPage from "./admin/pages/CertificatesPage";
import ContactPage from "./user/pages/ContactPage";
import CopyrightPage from "./user/pages/CopyrightPage";
import DatabasesPage from "./user/pages/DatabasesPage";
import DigitalCardPage from "./user/pages/DigitalCardPage";
import DiscountCodesPage from "./admin/pages/DiscountCodesPage";
import EmailNotificationsPage from "./admin/pages/EmailNotificationsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./user/pages/HomePage";
import InternationalRelationsPage from "./user/pages/InternationalRelationsPage";
import LibraryPage from "./user/pages/LibraryPage";
import LoginPage from "./pages/LoginPage";
import MembersCountPage from "./user/pages/MembersCountPage";
import MembershipBenefitsPage from "./user/pages/MembershipBenefitsPage";
import MembershipManagementPage from "./admin/pages/MembershipManagementPage";
import MembershipTypesPage from "./user/pages/MembershipTypesPage";
import NewsPage from "./user/pages/NewsPage";
import NotFound from "./pages/NotFound";
import PoliciesPage from "./user/pages/PoliciesPage";
import PresidentMessagePage from "./user/pages/PresidentMessagePage";
import PreviousBoardsPage from "./user/pages/PreviousBoardsPage";
import ProfilePage from "./user/pages/ProfilePage";
import ResearchCenterPage from "./user/pages/ResearchCenterPage";
import ResearchPage from "./user/pages/ResearchPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ScientificJournalPage from "./user/pages/ScientificJournalPage";
import SignupPage from "./pages/SignupPage";
import SpecializationsPage from "./user/pages/SpecializationsPage";
import VideosPage from "./user/pages/VideosPage";
import VisionMissionPage from "./user/pages/VisionMissionPage";
import WhatIsPTPage from "./user/pages/WhatIsPTPage";
import WorkshopsPage from "./admin/pages/WorkshopsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* About */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/vision-mission" element={<VisionMissionPage />} />
              <Route path="/about/president-message" element={<PresidentMessagePage />} />
              <Route path="/about/previous-boards" element={<PreviousBoardsPage />} />
              <Route path="/about/what-is-pt" element={<WhatIsPTPage />} />
              <Route path="/about/international" element={<InternationalRelationsPage />} />
              <Route path="/about/copyright" element={<CopyrightPage />} />
              <Route path="/about/policies" element={<PoliciesPage />} />
              <Route path="/about/*" element={<AboutPage />} />

              {/* Research */}
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/research/center" element={<ResearchCenterPage />} />
              <Route path="/research/databases" element={<DatabasesPage />} />
              <Route path="/research/*" element={<ResearchPage />} />

              {/* Library */}
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/booklets" element={<BookletsPage />} />
              <Route path="/brochures" element={<BrochuresPage />} />
              <Route path="/videos" element={<VideosPage />} />

              <Route path="/specializations" element={<SpecializationsPage />} />
              <Route path="/journal" element={<ScientificJournalPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Membership */}
              <Route path="/membership/benefits" element={<MembershipBenefitsPage />} />
              <Route path="/membership" element={<MembershipBenefitsPage />} />
              <Route path="/membership/types" element={<MembershipTypesPage />} />
              <Route path="/membership/count" element={<MembersCountPage />} />
              <Route path="/membership/subscribe" element={<MembershipSubscribePage />} />
              <Route path="/membership/management" element={<ProtectedRoute><MembershipManagementPage /></ProtectedRoute>} />
              <Route path="/membership/card" element={<ProtectedRoute><DigitalCardPage /></ProtectedRoute>} />

              {/* Admin */}
              <Route path="/admin/memberships" element={<AdminRoute><AdminMembershipsPage /></AdminRoute>} />

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* Protected */}
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              {/* Workshops */}
              <Route path="/workshops" element={<WorkshopsPage />} />
              <Route path="/workshops/certificates" element={<CertificatesPage />} />
              <Route path="/workshops/codes" element={<DiscountCodesPage />} />

              <Route path="/communications/emails" element={<EmailNotificationsPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
