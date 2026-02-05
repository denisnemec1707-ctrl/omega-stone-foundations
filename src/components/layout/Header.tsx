import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/real-estate", label: "Real Estate" },
  { href: "/private-equity", label: "Private Equity" },
  { href: "/private-credit", label: "Private Credit" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isScrolled } = useScrollPosition(50);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md"
          : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div
          className={cn(
            "flex items-center justify-between border-b border-border transition-all duration-300",
            isScrolled
              ? "h-12 sm:h-14 md:h-16"
              : "h-14 sm:h-16 md:h-20"
          )}
        >
          <Link to="/">
            <motion.span
              className={cn(
                "font-serif tracking-wide transition-all duration-300",
                isScrolled
                  ? "text-sm sm:text-base md:text-lg"
                  : "text-base sm:text-lg md:text-xl"
              )}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              ASSETRA{" "}
              <motion.span
                className="text-gold"
                whileHover={{ color: "hsl(var(--gold-muted))" }}
              >
                investments
              </motion.span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm tracking-ultra-wide uppercase transition-colors",
                  location.pathname === link.href
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground h-10 w-10 -mr-2"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Otvoriť menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[280px] sm:max-w-xs bg-background border-border"
            >
              <nav className="flex flex-col gap-6 sm:gap-8 mt-8 sm:mt-12">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base sm:text-lg tracking-ultra-wide uppercase transition-colors py-2",
                    location.pathname === "/"
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground active:text-gold"
                  )}
                >
                  Domov
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base sm:text-lg tracking-ultra-wide uppercase transition-colors py-2",
                      location.pathname === link.href
                        ? "text-gold"
                        : "text-muted-foreground hover:text-foreground active:text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
