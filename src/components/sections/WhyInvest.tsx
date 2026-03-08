import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const WhyInvest = () => {
  return (
    <section id="preco-investovat" className="py-12 sm:py-20 md:py-32 lg:py-48">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-20">
          <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
            Výhody pre investorov
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md mb-4 sm:mb-6 md:mb-8">
            Prečo investovať s <span className="text-gold">ASSETRA</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed px-2 sm:px-0">
            Ponúkame jednoduchý investičný model s jasnými podmienkami, predvídateľnými výnosmi a zabezpečením reálnymi aktívami.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-16" staggerDelay={0.1}>
          <StaggerItem className="text-center p-2 sm:p-0">
            <p className="font-serif text-2xl sm:text-4xl md:text-display-sm text-gold mb-2 sm:mb-3 md:mb-4">
              <AnimatedCounter value={12} suffix="%" />
            </p>
            <h3 className="font-serif text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-3">Fixný ročný výnos</h3>
            <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
              Váš výnos je vopred určený a zmluvne garantovaný. Žiadna trhová volatilita, žiadne prekvapenia.
            </p>
          </StaggerItem>

          <StaggerItem className="text-center p-2 sm:p-0">
            <p className="font-serif text-2xl sm:text-4xl md:text-display-sm text-gold mb-2 sm:mb-3 md:mb-4">Mesačne</p>
            <h3 className="font-serif text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-3">Pravidelný príjem</h3>
            <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
              Dostávajte svoje výnosy každý mesiac. Konzistentný cash flow, s ktorým môžete plánovať.
            </p>
          </StaggerItem>

          <StaggerItem className="text-center p-2 sm:p-0">
            <p className="font-serif text-2xl sm:text-4xl md:text-display-sm text-gold mb-2 sm:mb-3 md:mb-4">Reálne</p>
            <h3 className="font-serif text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-3">Zabezpečenie aktívami</h3>
            <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
              Každá investícia je viazaná na fyzické nehnuteľnosti. Hmatateľné zabezpečenie, nie papierové sľuby.
            </p>
          </StaggerItem>

          <StaggerItem className="text-center p-2 sm:p-0">
            <p className="font-serif text-2xl sm:text-4xl md:text-display-sm text-gold mb-2 sm:mb-3 md:mb-4">12–36</p>
            <h3 className="font-serif text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-3">Mesačné cykly</h3>
            <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
              Krátke investičné horizonty s definovanými výstupnými bodmi. Váš kapitál nie je uzamknutý na neurčito.
            </p>
          </StaggerItem>

          <StaggerItem className="text-center p-2 sm:p-0">
            <p className="font-serif text-2xl sm:text-4xl md:text-display-sm text-gold mb-2 sm:mb-3 md:mb-4">
              <AnimatedCounter value={20} suffix="%+" />
            </p>
            <h3 className="font-serif text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-3">Prevádzkové marže</h3>
            <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
              Náš akvizičný model cieli na minimálne 20% ziskové marže, čím zabezpečuje pokrytie vášho fixného výnosu.
            </p>
          </StaggerItem>

          <StaggerItem className="text-center p-2 sm:p-0">
            <p className="font-serif text-2xl sm:text-4xl md:text-display-sm text-gold mb-2 sm:mb-3 md:mb-4">Plná</p>
            <h3 className="font-serif text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-3">Návratnosť kapitálu</h3>
            <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
              Na konci cyklu dostanete späť celú istinu plus všetky získané výnosy. Jednoducho a kompletne.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <AnimatedSection className="text-center mt-8 sm:mt-12 md:mt-16" delay={0.4}>
          <Button
            asChild
            className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm md:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <a href="#kontakt">Mám záujem investovať</a>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WhyInvest;
