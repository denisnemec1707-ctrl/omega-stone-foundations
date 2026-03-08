import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import verticalEquity from "@/assets/vertical-equity.jpg";

const faqs = [
  { question: "Aké typy firiem hľadáte?", answer: "Hľadáme zabehnuté, ziskové firmy s obratom 1–10 mil. € v rôznych odvetviach – výroba, služby, e-commerce, IT." },
  { question: "Ako dlho trvá celý proces akvizície?", answer: "Štandardne 3–6 mesiacov od prvého kontaktu po uzavretie transakcie." },
  { question: "Čo sa stane so zamestnancami po akvizícii?", answer: "Zamestnanci sú kľúčovou hodnotou. Naším cieľom je zachovať stabilný tím a ďalej ho rozvíjať." },
  { question: "Môžem ostať vo firme po predaji?", answer: "Áno, ponúkame rôzne modely spolupráce – od úplného odchodu až po pokračovanie v manažérskej pozícii." },
  { question: "Ako stanovujete cenu firmy?", answer: "Používame kombináciu metód – násobok EBITDA, diskontované cash flow a porovnanie s podobnými transakciami." },
];

const PrivateEquity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SubpageHero
          label="Private Equity"
          title="Akvizície"
          titleAccent="zabehnutých firiem"
          description="Hľadáme fungujúce, ziskové firmy na slovenskom a českom trhu. Ponúkame férovú cenu a diskrétny proces."
          image={verticalEquity}
        />

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                Vyhľadávame fungujúce, zabehnuté firmy na slovenskom a českom trhu vhodné na odkúpenie. Investujeme prostredníctvom dlhodobých partnerstiev s dôrazom na rast hodnoty.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Criteria */}
        <AnimatedSection>
          <section className="pb-10 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Investičné kritériá
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Zameriavame sa na zabehnuté firmy s jasným potenciálom rastu a stabilným tímom.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Criteria stats - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: "1–10 mil. €", label: "Obrat", desc: "Hľadáme firmy s ročným obratom v rozmedzí 1 až 10 miliónov eur." },
                { value: "2+ roky", label: "Ziskovosť", desc: "Firma musí byť zisková minimálne 2 roky po sebe." },
                { value: "SK/CZ", label: "Trh", desc: "Zameriavame sa na slovenský a český trh s potenciálom expanzie." },
                { value: "Stabilný", label: "Tím", desc: "Preferujeme firmy so zabehnutým manažmentom a lojálnym tímom." },
              ].map((item, i) => (
                <StaggerItem key={i} className="text-center">
                  <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mb-2 sm:mb-3">{item.value}</p>
                  <h3 className="font-serif text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-primary-foreground/80">{item.label}</h3>
                  <p className="text-primary-foreground/40 font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Process */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start mb-10 sm:mb-14 md:mb-20">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Ako to funguje
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Od prvého kontaktu po uzavretie transakcie.
                </p>
              </div>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                {[
                  { step: "01", title: "Prvotný kontakt", desc: "Nezáväzná konzultácia o vašej firme. Podpíšeme NDA." },
                  { step: "02", title: "Due diligence", desc: "Detailná analýza finančných výkazov a obchodného modelu." },
                  { step: "03", title: "Ocenenie a ponuka", desc: "Férová ponuka na základe trhového ocenenia." },
                  { step: "04", title: "Uzavretie transakcie", desc: "Finalizácia dokumentov a prevod vlastníctva." },
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <span className="font-serif text-5xl sm:text-6xl text-foreground/10 block mb-2">{item.step}</span>
                    <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
                Často kladené otázky
              </h2>
            </AnimatedSection>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-primary-foreground/10 px-4 sm:px-6 data-[state=open]:border-primary-foreground/30 transition-colors">
                    <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-primary-foreground py-4 sm:py-5 text-primary-foreground/70">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-primary-foreground/40 font-light text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA to Investor page */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
                <div className="max-w-2xl">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
                    Máte záujem investovať?
                  </h2>
                  <p className="text-muted-foreground font-light text-base sm:text-lg leading-relaxed">
                    Vyplňte nezáväzný formulár a ozveme sa vám do 24 hodín s konkrétnymi podmienkami.
                  </p>
                </div>
                <Link
                  to="/pre-investorov#kontakt"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full border border-foreground/30 text-foreground hover:bg-foreground/5 transition-colors text-base sm:text-lg self-start"
                >
                  Chcem investovať
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="h-8 sm:h-12" />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateEquity;
