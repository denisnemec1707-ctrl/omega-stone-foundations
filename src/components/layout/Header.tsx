import { useState } from "react";
import { Menu, X } from "lucide-react";
 import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
   { href: "/real-estate", label: "Real Estate" },
   { href: "/private-equity", label: "Private Equity" },
   { href: "/private-credit", label: "Private Credit" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20 border-b border-border">
           <Link to="/" className="font-serif text-lg md:text-xl tracking-wide">
            ASSETRA <span className="text-gold">investments</span>
           </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
               <Link
                key={link.href}
                 to={link.href}
                 className={`text-sm tracking-ultra-wide uppercase transition-colors ${
                   location.pathname === link.href 
                     ? "text-gold" 
                     : "text-muted-foreground hover:text-foreground"
                 }`}
              >
                {link.label}
               </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Otvoriť menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background border-border">
              <nav className="flex flex-col gap-8 mt-12">
                {navLinks.map((link) => (
                   <Link
                    key={link.href}
                     to={link.href}
                    onClick={() => setIsOpen(false)}
                     className={`text-lg tracking-ultra-wide uppercase transition-colors ${
                       location.pathname === link.href 
                         ? "text-gold" 
                         : "text-muted-foreground hover:text-foreground"
                     }`}
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
