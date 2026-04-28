import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import Preloader from "./components/Preloader";
import { useState, useCallback } from "react";

import { PageTransition } from "./components/PageTransition";
import Index from "./pages/Index";
import RealEstate from "./pages/RealEstate";
import PrivateEquity from "./pages/PrivateEquity";
import PrivateCredit from "./pages/PrivateCredit";
import ForInvestors from "./pages/ForInvestors";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Portfolio from "./pages/Portfolio";
import Careers from "./pages/Careers";
import AssistantCEO from "./pages/AssistantCEO";
import PredamFirmu from "./pages/PredamFirmu";
import Investovat from "./pages/Investovat";
import FinancovanieNehnutelnosti from "./pages/FinancovanieNehnutelnosti";
import Klub from "./pages/Klub";
import NotFound from "./pages/NotFound";

// Routes that bypass Preloader and PageTransition for fast LCP
// (paid traffic landings — every 100 ms of delay hurts CPL).
const FAST_LOAD_ROUTES = ["/predam-firmu", "/investovat", "/financovanie-nehnutelnosti", "/kariera/asistent-ceo", "/klub"];

function isFastLoadPath(pathname: string) {
  return FAST_LOAD_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
}

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/nehnutelnosti"
          element={
            <PageTransition>
              <RealEstate />
            </PageTransition>
          }
        />
        <Route
          path="/akvizicie"
          element={
            <PageTransition>
              <PrivateEquity />
            </PageTransition>
          }
        />
        <Route
          path="/uvery"
          element={
            <PageTransition>
              <PrivateCredit />
            </PageTransition>
          }
        />
        <Route
          path="/pre-investorov"
          element={
            <PageTransition>
              <ForInvestors />
            </PageTransition>
          }
        />
        <Route
          path="/ochrana-udajov"
          element={
            <PageTransition>
              <PrivacyPolicy />
            </PageTransition>
          }
        />
        <Route
          path="/obchodne-podmienky"
          element={
            <PageTransition>
              <Terms />
            </PageTransition>
          }
        />
        <Route
          path="/projekty"
          element={
            <PageTransition>
              <Portfolio />
            </PageTransition>
          }
        />
        <Route
          path="/kariera"
          element={
            <PageTransition>
              <Careers />
            </PageTransition>
          }
        />
        {/* Paid-traffic landings — no PageTransition wrapper for fast LCP */}
        <Route path="/kariera/asistent-ceo" element={<AssistantCEO />} />
        <Route path="/predam-firmu" element={<PredamFirmu />} />
        <Route path="/investovat" element={<Investovat />} />
        <Route path="/financovanie-nehnutelnosti" element={<FinancovanieNehnutelnosti />} />
        <Route path="/klub" element={<Klub />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window !== "undefined" && isFastLoadPath(window.location.pathname)) {
      return false;
    }
    return !sessionStorage.getItem("preloader-shown");
  });

  const handlePreloaderComplete = useCallback(() => {
    sessionStorage.setItem("preloader-shown", "true");
    setShowPreloader(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        <BrowserRouter>
          <ScrollToTop />
          <CookieBanner />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
