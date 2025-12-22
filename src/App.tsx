import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ResearchPage from "./pages/ResearchPage";
import LibraryPage from "./pages/LibraryPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";
import DatabasesPage from "./pages/DatabasesPage";
import ELibraryPage from "./pages/ELibraryPage";
import BookletsPage from "./pages/BookletsPage";
import ResearchCenterPage from "./pages/ResearchCenterPage";
import PreviousBoardsPage from "./pages/PreviousBoardsPage";
import BrochuresPage from "./pages/BrochuresPage";
import VideosPage from "./pages/VideosPage";
import MembershipBenefitsPage from "./pages/MembershipBenefitsPage";
import MembershipTypesPage from "./pages/MembershipTypesPage";
import MembersCountPage from "./pages/MembersCountPage";
import SpecializationsPage from "./pages/SpecializationsPage";
import WhatIsPTPage from "./pages/WhatIsPTPage";
import PoliciesPage from "./pages/PoliciesPage";
import VisionMissionPage from "./pages/VisionMissionPage";
import InternationalRelationsPage from "./pages/InternationalRelationsPage";
import CopyrightPage from "./pages/CopyrightPage";
import PresidentMessagePage from "./pages/PresidentMessagePage";
import ScientificJournalPage from "./pages/ScientificJournalPage";
import ProfilePage from "./pages/ProfilePage";
import MembershipManagementPage from "./pages/MembershipManagementPage";
import DigitalCardPage from "./pages/DigitalCardPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/previous-boards" element={<PreviousBoardsPage />} />
            <Route path="/about/vision-mission" element={<VisionMissionPage />} />
            <Route path="/about/president-message" element={<PresidentMessagePage />} />
            <Route path="/about/what-is-pt" element={<WhatIsPTPage />} />
            <Route path="/about/international" element={<InternationalRelationsPage />} />
            <Route path="/about/copyright" element={<CopyrightPage />} />
            <Route path="/about/policies" element={<PoliciesPage />} />
            <Route path="/about/*" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/research/databases" element={<DatabasesPage />} />
            <Route path="/research/center" element={<ResearchCenterPage />} />
            <Route path="/research/*" element={<ResearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/elibrary" element={<ELibraryPage />} />
            <Route path="/booklets" element={<BookletsPage />} />
            <Route path="/brochures" element={<BrochuresPage />} />
            <Route path="/videos" element={<VideosPage />} />
            
            <Route path="/membership/benefits" element={<MembershipBenefitsPage />} />
            <Route path="/membership/types" element={<MembershipTypesPage />} />
            <Route path="/membership/count" element={<MembersCountPage />} />
            <Route path="/membership/management" element={<MembershipManagementPage />} />
            <Route path="/membership/card" element={<DigitalCardPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/specializations" element={<SpecializationsPage />} />
            <Route path="/journal" element={<ScientificJournalPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsPage />} />
            <Route path="/app" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
