import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="bg-charcoal rounded-2xl p-5 sm:p-6 shadow-2xl border border-foreground/5">
            <p className="text-sm text-primary-foreground/70 font-light leading-relaxed mb-4">
              Táto stránka používa cookies na zlepšenie vášho zážitku. Používaním stránky súhlasíte s ich spracovaním v súlade s GDPR.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2.5 rounded-full bg-primary-foreground text-charcoal text-sm font-medium tracking-wide hover:bg-primary-foreground/90 transition-colors"
                style={{ color: "hsl(220, 20%, 12%)" }}
              >
                Súhlasím
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2.5 rounded-full border border-primary-foreground/20 text-primary-foreground text-sm tracking-wide hover:bg-primary-foreground/5 transition-colors"
              >
                Odmietnuť
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
