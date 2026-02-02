const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20 border-b border-border">
          <a href="#" className="font-serif text-xl tracking-wide">
            OMEGA <span className="text-gold">CAPITAL</span>
          </a>
          <nav className="hidden md:flex items-center gap-12">
            <a href="#preco-investovat" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Prečo investovať
            </a>
            <a href="#ako-to-funguje" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Ako to funguje
            </a>
            <a href="#kalkulacka" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Kalkulačka
            </a>
            <a href="#faq" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Otázky
            </a>
            <a href="#kontakt" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Kontakt
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
