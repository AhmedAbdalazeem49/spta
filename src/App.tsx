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
            <Route path="/about/*" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/research/databases" element={<DatabasesPage />} />
            <Route path="/research/center" element={<ResearchCenterPage />} />
            <Route path="/research/*" element={<ResearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/elibrary" element={<ELibraryPage />} />
            <Route path="/booklets" element={<BookletsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsPage />} />
            <Route path="/app" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
