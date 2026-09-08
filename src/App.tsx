import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import Preloader from "./components/Preloader";
import LocaleWrapper from "./components/LocaleWrapper";
import GeoRedirect from "./components/GeoRedirect";
import { useState, useCallback } from "react";

import { PageTransition } from "./components/PageTransition";
import Index from "./pages/Index";
import RealEstate from "./pages/RealEstate";
import PrivateEquity from "./pages/PrivateEquity";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Portfolio from "./pages/Portfolio";
import PredamFirmu from "./pages/PredamFirmu";
import Investovat from "./pages/Investovat";
import FinancovanieNehnutelnosti from "./pages/FinancovanieNehnutelnosti";
import Klub from "./pages/Klub";
import Partneri from "./pages/Partneri";
import NotFound from "./pages/NotFound";

import { isFastLoadPath } from "./i18n/routes";

const queryClient = new QueryClient();

/** Returns page route elements for use inside a layout Route */
function pageRoutes() {
  return [
    // Standard routes with PageTransition
    <Route key="home" index element={<PageTransition><Index /></PageTransition>} />,
    <Route key="nehnutelnosti" path="nehnutelnosti" element={<PageTransition><RealEstate /></PageTransition>} />,
    <Route key="real-estate" path="real-estate" element={<PageTransition><RealEstate /></PageTransition>} />,
    <Route key="nemovitosti" path="nemovitosti" element={<PageTransition><RealEstate /></PageTransition>} />,

    <Route key="akvizicie" path="akvizicie" element={<PageTransition><PrivateEquity /></PageTransition>} />,
    <Route key="acquisitions" path="acquisitions" element={<PageTransition><PrivateEquity /></PageTransition>} />,
    <Route key="akvizice" path="akvizice" element={<PageTransition><PrivateEquity /></PageTransition>} />,


    // Hidden for now (pages kept in repo for future use):
    // ForInvestors (/pre-investorov), Careers (/kariera), AssistantCEO (/kariera/asistent-ceo)

    <Route key="ochrana-udajov" path="ochrana-udajov" element={<PageTransition><PrivacyPolicy /></PageTransition>} />,
    <Route key="privacy-policy" path="privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />,
    <Route key="ochrana-udaju" path="ochrana-udaju" element={<PageTransition><PrivacyPolicy /></PageTransition>} />,

    <Route key="obchodne-podmienky" path="obchodne-podmienky" element={<PageTransition><Terms /></PageTransition>} />,
    <Route key="terms" path="terms" element={<PageTransition><Terms /></PageTransition>} />,
    <Route key="obchodni-podminky" path="obchodni-podminky" element={<PageTransition><Terms /></PageTransition>} />,

    <Route key="projekty" path="projekty" element={<PageTransition><Portfolio /></PageTransition>} />,
    <Route key="portfolio" path="portfolio" element={<PageTransition><Portfolio /></PageTransition>} />,


    <Route key="predam-firmu" path="predam-firmu" element={<PredamFirmu />} />,
    <Route key="sell-your-company" path="sell-your-company" element={<PredamFirmu />} />,
    <Route key="prodam-firmu" path="prodam-firmu" element={<PredamFirmu />} />,

    <Route key="investovat" path="investovat" element={<Investovat />} />,
    <Route key="invest" path="invest" element={<Investovat />} />,

    <Route key="financovanie-nehnutelnosti" path="financovanie-nehnutelnosti" element={<FinancovanieNehnutelnosti />} />,
    <Route key="property-financing" path="property-financing" element={<FinancovanieNehnutelnosti />} />,
    <Route key="financovani-nemovitosti" path="financovani-nemovitosti" element={<FinancovanieNehnutelnosti />} />,

    <Route key="klub" path="klub" element={<Klub />} />,
    <Route key="partneri" path="partneri" element={<Partneri />} />,
    <Route key="partners" path="partners" element={<Partneri />} />,
    <Route key="club" path="club" element={<Klub />} />,
  ];
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* SK routes (default, no prefix) */}
        <Route element={<LocaleWrapper locale="sk" />}>
          {pageRoutes()}
        </Route>

        {/* EN routes */}
        <Route path="/en" element={<LocaleWrapper locale="en" />}>
          {pageRoutes()}
        </Route>

        {/* CS routes */}
        <Route path="/cs" element={<LocaleWrapper locale="cs" />}>
          {pageRoutes()}
        </Route>

        {/* Catch-all 404 */}
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
          <GeoRedirect />
          <CookieBanner />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
