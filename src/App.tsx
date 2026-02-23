import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import Chatbot from "./components/Chatbot";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import AboutPage from "./user/pages/AboutPage";
import BookletsPage from "./user/pages/BookletsPage";
import BrochuresPage from "./user/pages/BrochuresPage";
import ContactPage from "./user/pages/ContactPage";
import CopyrightPage from "./user/pages/CopyrightPage";
import DatabasesPage from "./user/pages/DatabasesPage";
import HomePage from "./user/pages/HomePage";
import InternationalRelationsPage from "./user/pages/InternationalRelationsPage";
import LibraryPage from "./user/pages/LibraryPage";
import MembersCountPage from "./user/pages/MembersCountPage";
import MembershipBenefitsPage from "./user/pages/MembershipBenefitsPage";
import MembershipTypesPage from "./user/pages/MembershipTypesPage";
import NewsPage from "./user/pages/NewsPage";
import PoliciesPage from "./user/pages/PoliciesPage";
import PresidentMessagePage from "./user/pages/PresidentMessagePage";
import PreviousBoardsPage from "./user/pages/PreviousBoardsPage";
import ResearchCenterPage from "./user/pages/ResearchCenterPage";
import ResearchPage from "./user/pages/ResearchPage";
import ScientificJournalPage from "./user/pages/ScientificJournalPage";
import SpecializationsPage from "./user/pages/SpecializationsPage";
import VideosPage from "./user/pages/VideosPage";
import VisionMissionPage from "./user/pages/VisionMissionPage";
import WhatIsPTPage from "./user/pages/WhatIsPTPage";

// Auth pages
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";

// Protected user pages
import MembershipSubscribePage from "./admin/pages/MembershipSubscribePage";
import DigitalCardPage from "./user/pages/DigitalCardPage";
import ProfilePage from "./user/pages/ProfilePage";

// Admin layout + pages
import AdminLayout from "./admin/components/AdminLayout";
import AdminCertificatesPage from "./admin/pages/AdminCertificatesPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminMembershipsPage from "./admin/pages/AdminMembershipsPage";
import AdminUsersPage from "./admin/pages/AdminUsersPage";
import AdminVisitorsPage from "./admin/pages/AdminVisitorsPage";
import AdminWorkshopsPage from "./admin/pages/AdminWorkshopsPage";
import AdminCoupons from "./admin/pages/AdminCoupons";
import AdminNewsletter from "./admin/pages/AdminNewsletter";
import AdminNotifications from "./admin/pages/Adminnotifications";
import AdminCommunicationSettings from "./admin/pages/AdminCommunicationSettings";

// Public workshops page (user-facing)
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
              <Route
                path="/specializations"
                element={<SpecializationsPage />}
              />
              <Route path="/journal" element={<ScientificJournalPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Membership */}
              <Route
                path="/membership/benefits"
                element={<MembershipBenefitsPage />}
              />
              <Route path="/membership" element={<MembershipBenefitsPage />} />
              <Route
                path="/membership/types"
                element={<MembershipTypesPage />}
              />
              <Route path="/membership/count" element={<MembersCountPage />} />
              <Route
                path="/membership/subscribe"
                element={<MembershipSubscribePage />}
              />
              <Route
                path="/membership/card"
                element={
                  <ProtectedRoute>
                    <DigitalCardPage />
                  </ProtectedRoute>
                }
              />
              {/* Public Workshops */}
              <Route path="/workshops" element={<WorkshopsPage />} />
              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              {/* Protected User */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              {/* Admin Panel (all wrapped in AdminRoute + AdminLayout) */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminDashboardPage />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminUsersPage />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/workshops"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminWorkshopsPage />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/memberships"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminMembershipsPage />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/certificates"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminCertificatesPage />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/visitors"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminVisitorsPage />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/coupons"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminCoupons />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/newsletter"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminNewsletter />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminNotifications />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/communication-settings"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminCommunicationSettings />
                    </AdminLayout>
                  </AdminRoute>
                }
              />
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
