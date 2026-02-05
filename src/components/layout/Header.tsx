import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#preco-investovat", label: "Prečo investovať" },
  { href: "#ako-to-funguje", label: "Ako to funguje" },
  { href: "#kalkulacka", label: "Kalkulačka" },
  { href: "#faq", label: "Otázky" },
  { href: "#kontakt", label: "Kontakt" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20 border-b border-border">
          <a href="#" className="font-serif text-lg md:text-xl tracking-wide">
            ASSETRA <span className="text-gold">investments</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
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
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
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
