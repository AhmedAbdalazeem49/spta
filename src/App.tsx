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
import AboutPage from "./pages/AboutPage";
import AdminMembershipsPage from "./pages/AdminMembershipsPage";
import MembershipSubscribePage from "./pages/MembershipSubscribePage";
import BookletsPage from "./pages/BookletsPage";
import BrochuresPage from "./pages/BrochuresPage";
import CertificatesPage from "./pages/CertificatesPage";
import ContactPage from "./pages/ContactPage";
import CopyrightPage from "./pages/CopyrightPage";
import DatabasesPage from "./pages/DatabasesPage";
import DigitalCardPage from "./pages/DigitalCardPage";
import DiscountCodesPage from "./pages/DiscountCodesPage";
import EmailNotificationsPage from "./pages/EmailNotificationsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
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
import ResetPasswordPage from "./pages/ResetPasswordPage";
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
