import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "./components/ScrollToTop";

import { PageTransition } from "./components/PageTransition";
import Index from "./pages/Index";
import RealEstate from "./pages/RealEstate";
import PrivateEquity from "./pages/PrivateEquity";
import PrivateCredit from "./pages/PrivateCredit";
import ForInvestors from "./pages/ForInvestors";
import NotFound from "./pages/NotFound";

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
          path="/real-estate"
          element={
            <PageTransition>
              <RealEstate />
            </PageTransition>
          }
        />
        <Route
          path="/private-equity"
          element={
            <PageTransition>
              <PrivateEquity />
            </PageTransition>
          }
        />
        <Route
          path="/private-credit"
          element={
            <PageTransition>
              <PrivateCredit />
            </PageTransition>
          }
        />
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
