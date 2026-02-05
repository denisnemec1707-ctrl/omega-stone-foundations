const Footer = () => {
  return (
     <footer className="py-6 sm:py-8 md:py-12 border-t border-border">
       <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
         <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
           <p className="font-serif text-sm sm:text-base md:text-lg tracking-wide">
            ASSETRA <span className="text-gold">investments</span>
          </p>
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © 2025 Assetra Investments s.r.o. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
