import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import { AnimatedSection } from "@/components/AnimatedSection";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Obchodné podmienky | ASSETRA Investments"
        description="Obchodné podmienky spoločnosti ASSETRA investments s.r.o. pre používanie webovej stránky a služieb."
      />
      <Header />
      <main>
        <section className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 sm:mb-12 md:mb-16">
                Obchodné podmienky
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="prose prose-lg max-w-3xl text-muted-foreground font-light leading-relaxed space-y-8 sm:space-y-10">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">1. Úvodné ustanovenia</h2>
                  <p className="text-sm sm:text-base">
                    Tieto obchodné podmienky upravujú práva a povinnosti súvisiace s používaním webovej stránky assetra.sk prevádzkovanej spoločnosťou ASSETRA investments s.r.o. so sídlom v Bratislave, Slovenská republika (ďalej len „spoločnosť").
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">2. Povaha obsahu</h2>
                  <p className="text-sm sm:text-base">
                    Obsah tejto webovej stránky slúži výlučne na informatívne účely a nepredstavuje investičné poradenstvo, ponuku na predaj ani výzvu na kúpu akýchkoľvek finančných nástrojov. Všetky informácie o výnosoch, projektoch a investičných príležitostiach sú orientačné a môžu sa meniť.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">3. Investičné riziko</h2>
                  <p className="text-sm sm:text-base">
                    Každá investícia je spojená s rizikom. Minulé výnosy nie sú zárukou budúcich výsledkov. Hodnota investícií môže rásť aj klesať. Investori by mali zvážiť svoje finančné možnosti a v prípade potreby konzultovať nezávislého finančného poradcu pred prijatím investičného rozhodnutia.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">4. Duševné vlastníctvo</h2>
                  <p className="text-sm sm:text-base">
                    Všetok obsah na tejto stránke vrátane textov, grafiky, log, obrázkov a softvéru je chránený autorským právom a ďalšími zákonmi o duševnom vlastníctve. Akékoľvek kopírovanie, reprodukcia alebo distribúcia bez predchádzajúceho písomného súhlasu spoločnosti je zakázaná.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">5. Obmedzenie zodpovednosti</h2>
                  <p className="text-sm sm:text-base">
                    Spoločnosť nenesie zodpovednosť za akúkoľvek priamu alebo nepriamu škodu vzniknutú v súvislosti s používaním tejto webovej stránky alebo spoliehania sa na informácie na nej uvedené. Spoločnosť si vyhradzuje právo kedykoľvek meniť obsah stránky bez predchádzajúceho upozornenia.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">6. Odkazy na tretie strany</h2>
                  <p className="text-sm sm:text-base">
                    Stránka môže obsahovať odkazy na webové stránky tretích strán. Spoločnosť nemá kontrolu nad obsahom týchto stránok a nenesie za ne žiadnu zodpovednosť.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">7. Rozhodné právo</h2>
                  <p className="text-sm sm:text-base">
                    Tieto obchodné podmienky sa riadia právnym poriadkom Slovenskej republiky. Akékoľvek spory budú riešené príslušnými súdmi Slovenskej republiky.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">8. Kontakt</h2>
                  <p className="text-sm sm:text-base">
                    V prípade otázok nás kontaktujte na{" "}
                    <a href="mailto:info@assetra.sk" className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors">
                      info@assetra.sk
                    </a>.
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground/60 pt-4 border-t border-border">
                  Posledná aktualizácia: Marec 2025
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
