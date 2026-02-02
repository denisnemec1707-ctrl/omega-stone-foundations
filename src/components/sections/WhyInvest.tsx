import { Button } from "@/components/ui/button";

const WhyInvest = () => {
  return (
    <section id="preco-investovat" className="py-20 md:py-32 lg:py-48">
      <div className="container mx-auto px-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4 md:mb-6">
            Výhody pre investorov
          </p>
          <h2 className="font-serif text-3xl md:text-display-sm lg:text-display-md mb-6 md:mb-8">
            Prečo investovať s <span className="text-gold">Omega Capital</span>
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed">
            Ponúkame jednoduchý investičný model s jasnými podmienkami, predvídateľnými výnosmi a zabezpečením reálnymi aktívami.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          <div className="text-center">
            <p className="font-serif text-4xl md:text-display-sm text-gold mb-3 md:mb-4">10%</p>
            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3">Fixný ročný výnos</h3>
            <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
              Váš výnos je vopred určený a zmluvne garantovaný. Žiadna trhová volatilita, žiadne prekvapenia.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-4xl md:text-display-sm text-gold mb-3 md:mb-4">Mesačne</p>
            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3">Pravidelný príjem</h3>
            <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
              Dostávajte svoje výnosy každý mesiac. Konzistentný cash flow, s ktorým môžete plánovať.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-4xl md:text-display-sm text-gold mb-3 md:mb-4">Reálne</p>
            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3">Zabezpečenie aktívami</h3>
            <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
              Každá investícia je viazaná na fyzické nehnuteľnosti. Hmatateľné zabezpečenie, nie papierové sľuby.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-4xl md:text-display-sm text-gold mb-3 md:mb-4">12–18</p>
            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3">Mesačné cykly</h3>
            <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
              Krátke investičné horizonty s definovanými výstupnými bodmi. Váš kapitál nie je uzamknutý na neurčito.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-4xl md:text-display-sm text-gold mb-3 md:mb-4">20%+</p>
            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3">Prevádzkové marže</h3>
            <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
              Náš akvizičný model cieli na minimálne 20% ziskové marže, čím zabezpečuje pokrytie vášho fixného výnosu.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-4xl md:text-display-sm text-gold mb-3 md:mb-4">Plná</p>
            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3">Návratnosť kapitálu</h3>
            <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
              Na konci cyklu dostanete späť celú istinu plus všetky získané výnosy. Jednoducho a kompletne.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Button 
            asChild
            className="bg-gold hover:bg-gold/90 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-8 md:px-10 text-sm md:text-base"
          >
            <a href="#kontakt">Mám záujem investovať</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;
