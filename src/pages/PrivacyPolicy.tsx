import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import { AnimatedSection } from "@/components/AnimatedSection";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Ochrana osobných údajov | ASSETRA Investments"
        description="Informácie o spracovaní a ochrane osobných údajov spoločnosťou ASSETRA investments s.r.o. v súlade s GDPR."
      />
      <Header />
      <main>
        <section className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 sm:mb-12 md:mb-16">
                Ochrana osobných údajov
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="prose prose-lg max-w-3xl text-muted-foreground font-light leading-relaxed space-y-8 sm:space-y-10">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">1. Prevádzkovateľ</h2>
                  <p className="text-sm sm:text-base">
                    Prevádzkovateľom osobných údajov je spoločnosť ASSETRA investments s.r.o., so sídlom v Bratislave, Slovenská republika (ďalej len „spoločnosť"). Spoločnosť spracúva osobné údaje v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">2. Účel spracovania</h2>
                  <p className="text-sm sm:text-base">Osobné údaje spracúvame na nasledovné účely:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm sm:text-base">
                    <li>Spracovanie investičných dopytov a žiadostí o financovanie</li>
                    <li>Komunikácia s potenciálnymi investormi a obchodnými partnermi</li>
                    <li>Plnenie zákonných povinností (účtovníctvo, daňové povinnosti)</li>
                    <li>Zlepšovanie našich služieb a webovej stránky</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">3. Rozsah spracúvaných údajov</h2>
                  <p className="text-sm sm:text-base">Spracúvame nasledovné kategórie osobných údajov:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm sm:text-base">
                    <li>Identifikačné údaje (meno, priezvisko)</li>
                    <li>Kontaktné údaje (email, telefónne číslo)</li>
                    <li>Údaje o investičnom záujme (plánovaná výška investície, oblasť záujmu)</li>
                    <li>Technické údaje z cookies (IP adresa, typ prehliadača)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">4. Právny základ</h2>
                  <p className="text-sm sm:text-base">
                    Osobné údaje spracúvame na základe súhlasu dotknutej osoby (čl. 6 ods. 1 písm. a) GDPR), oprávneného záujmu prevádzkovateľa (čl. 6 ods. 1 písm. f) GDPR) a plnenia zmluvy alebo predzmluvných vzťahov (čl. 6 ods. 1 písm. b) GDPR).
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">5. Doba uchovávania</h2>
                  <p className="text-sm sm:text-base">
                    Osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu spracovania, maximálne však 3 roky od posledného kontaktu, ak nie je zákonná povinnosť uchovávania dlhšia.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">6. Práva dotknutej osoby</h2>
                  <p className="text-sm sm:text-base">Ako dotknutá osoba máte právo:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm sm:text-base">
                    <li>Na prístup k svojim osobným údajom</li>
                    <li>Na opravu nesprávnych údajov</li>
                    <li>Na vymazanie údajov (právo na zabudnutie)</li>
                    <li>Na obmedzenie spracovania</li>
                    <li>Na prenositeľnosť údajov</li>
                    <li>Namietať proti spracovaniu</li>
                    <li>Odvolať súhlas so spracovaním</li>
                    <li>Podať sťažnosť na Úrad na ochranu osobných údajov SR</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">7. Cookies</h2>
                  <p className="text-sm sm:text-base">
                    Naša webová stránka používa cookies na zabezpečenie základnej funkčnosti a zlepšenie používateľského zážitku. Cookies môžete spravovať v nastaveniach svojho prehliadača. Viac informácií nájdete v cookie banneri pri prvej návšteve stránky.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">8. Kontakt</h2>
                  <p className="text-sm sm:text-base">
                    V prípade otázok týkajúcich sa ochrany osobných údajov nás kontaktujte na{" "}
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

export default PrivacyPolicy;
