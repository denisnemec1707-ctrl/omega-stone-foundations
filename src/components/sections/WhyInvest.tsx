const WhyInvest = () => {
  return (
    <section id="preco-investovat" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
            Výhody pre investorov
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md mb-8">
            Prečo investovať s <span className="text-gold">Omega Capital</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg leading-relaxed">
            Ponúkame jednoduchý investičný model s jasnými podmienkami, predvídateľnými výnosmi a zabezpečením reálnymi aktívami.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">10%</p>
            <h3 className="font-serif text-xl mb-3">Fixný ročný výnos</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Váš výnos je vopred určený a zmluvne garantovaný. Žiadna trhová volatilita, žiadne prekvapenia.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">Mesačne</p>
            <h3 className="font-serif text-xl mb-3">Pravidelný príjem</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Dostávajte svoje výnosy každý mesiac. Konzistentný cash flow, s ktorým môžete plánovať.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">Reálne</p>
            <h3 className="font-serif text-xl mb-3">Zabezpečenie aktívami</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Každá investícia je viazaná na fyzické nehnuteľnosti. Hmatateľné zabezpečenie, nie papierové sľuby.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">12–18</p>
            <h3 className="font-serif text-xl mb-3">Mesačné cykly</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Krátke investičné horizonty s definovanými výstupnými bodmi. Váš kapitál nie je uzamknutý na neurčito.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">20%+</p>
            <h3 className="font-serif text-xl mb-3">Prevádzkové marže</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Náš akvizičný model cieli na minimálne 20% ziskové marže, čím zabezpečuje pokrytie vášho fixného výnosu.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">Plná</p>
            <h3 className="font-serif text-xl mb-3">Návratnosť kapitálu</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Na konci cyklu dostanete späť celú istinu plus všetky získané výnosy. Jednoducho a kompletne.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;
