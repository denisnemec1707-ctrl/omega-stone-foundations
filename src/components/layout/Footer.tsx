const Footer = () => {
  return (
    <footer className="py-8 md:py-12 border-t border-border">
      <div className="container mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <p className="font-serif text-base md:text-lg tracking-wide">
            OMEGA <span className="text-gold">CAPITAL</span>
          </p>
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © 2025 Omega Capital Group s.r.o. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
