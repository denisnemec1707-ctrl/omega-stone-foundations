import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Domov" },
  { href: "/real-estate", label: "Real Estate" },
  { href: "/private-equity", label: "Private Equity" },
  { href: "/private-credit", label: "Private Credit" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Floating Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-6 right-6 sm:top-8 sm:right-8 z-[60] flex items-center gap-3 px-5 py-3 rounded-full transition-colors duration-300",
          isOpen
            ? "bg-foreground/20 backdrop-blur-md"
            : "bg-background/90 backdrop-blur-md shadow-lg"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={cn(
          "text-sm font-medium tracking-wide",
          isOpen ? "text-primary-foreground" : "text-foreground"
        )}>
          Menu
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isOpen ? "bg-foreground/20" : "bg-charcoal"
        )}>
          <div className="flex flex-col items-center justify-center gap-[5px]">
            <motion.span
              className={cn("block w-4 h-[2px]", isOpen ? "bg-primary-foreground" : "bg-primary-foreground")}
              animate={isOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={cn("block w-4 h-[2px]", isOpen ? "bg-primary-foreground" : "bg-primary-foreground")}
              animate={isOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.button>

      {/* Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0 bg-charcoal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.97 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Nav Links */}
            <nav className="relative z-10 flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block font-serif text-4xl sm:text-5xl md:text-6xl py-3 transition-colors duration-200",
                      location.pathname === link.href
                        ? "text-primary-foreground"
                        : "text-primary-foreground/50 hover:text-primary-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
