import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };
type NavGroup = { heading?: string; links: NavLink[] };

const navGroups: NavGroup[] = [
  {
    links: [{ href: "/", label: "Domov" }],
  },
  {
    heading: "Čo robíme",
    links: [
      { href: "/nehnutelnosti", label: "Nehnuteľnosti" },
      { href: "/akvizicie", label: "Akvizície" },
      { href: "/uvery", label: "Úvery" },
    ],
  },
  {
    links: [
      { href: "/pre-investorov", label: "Pre investorov" },
      { href: "/klub", label: "ASSETRA Klub" },
      { href: "/projekty", label: "Portfólio" },
      { href: "/kariera", label: "Kariéra" },
    ],
  },
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
          "fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[60] flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-3 rounded-full transition-colors duration-300",
          isOpen
            ? "bg-foreground/20 backdrop-blur-md"
            : "bg-background/90 backdrop-blur-md shadow-lg"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={cn(
          "text-xs sm:text-sm font-medium tracking-wide",
          isOpen ? "text-primary-foreground" : "text-foreground"
        )}>
          Menu
        </span>
        <div className={cn(
          "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center",
          isOpen ? "bg-foreground/20" : "bg-charcoal"
        )}>
          <div className="flex flex-col items-center justify-center gap-[4px] sm:gap-[5px]">
            <motion.span
              className="block w-3.5 sm:w-4 h-[1.5px] sm:h-[2px] bg-primary-foreground"
              animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-3.5 sm:w-4 h-[1.5px] sm:h-[2px] bg-primary-foreground"
              animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
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
            <motion.div
              className="absolute inset-0 bg-charcoal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.97 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
            />

            <nav className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 max-h-[90vh] overflow-y-auto py-8 px-4">
              {navGroups.map((group, gi) => {
                const baseDelay = navGroups
                  .slice(0, gi)
                  .reduce((acc, g) => acc + g.links.length + (g.heading ? 1 : 0), 0);
                return (
                  <div key={gi} className="flex flex-col items-center">
                    {group.heading && (
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: baseDelay * 0.06 }}
                        className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary-foreground/40 mb-2 sm:mb-3"
                      >
                        {group.heading}
                      </motion.span>
                    )}
                    {group.links.map((link, li) => {
                      const delay = (baseDelay + (group.heading ? 1 : 0) + li) * 0.06;
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.4, delay }}
                        >
                          <Link
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-1 sm:py-1.5 transition-colors duration-200 text-center",
                              location.pathname === link.href
                                ? "text-primary-foreground"
                                : "text-primary-foreground/50 hover:text-primary-foreground"
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
