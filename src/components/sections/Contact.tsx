const Contact = () => {
  return (
    <section id="kontakt" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
            Začnite
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md mb-8">
            Investičné <span className="text-gold">konzultácie</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg leading-relaxed mb-12">
            Ak máte záujem dozvedieť sa viac o investovaní s Omega Capital, pozývame vás kontaktovať nás. Poskytneme vám kompletnú dokumentáciu, aktuálne podmienky a odpovieme na všetky otázky o našom investičnom modeli.
          </p>
          
          <div className="space-y-4 text-muted-foreground mb-16">
            <p className="tracking-wide">
              <span className="text-gold">Email</span> — invest@omegacapital.sk
            </p>
            <p className="tracking-wide">
              <span className="text-gold">Telefón</span> — +421 2 123 456 789
            </p>
            <p className="tracking-wide">
              <span className="text-gold">Kancelária</span> — Bratislava, Slovensko
            </p>
          </div>
          
          <div className="pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              Minimálna investícia: 10 000 € · Investičné obdobie: 12–24 mesiacov · Výnosy: 10% ročne, vyplácaný mesačne
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
