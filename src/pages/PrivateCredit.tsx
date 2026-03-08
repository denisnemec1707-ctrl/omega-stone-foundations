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
import verticalCredit from "@/assets/vertical-credit.jpg";

const faqs = [
  { question: "Aké zabezpečenie požadujete?", answer: "Záložné právo na nehnuteľnosť alebo záloh na obchodný podiel. Akceptujeme aj záloh na hnuteľný majetok firmy." },
  { question: "Aká je maximálna výška úveru?", answer: "Pre realitné projekty do 2 000 000 €, pre podnikateľské úvery do 1 000 000 €." },
  { question: "Ako rýchlo môžem získať financie?", answer: "Rozhodujeme do 5 pracovných dní. Čerpanie do 2 týždňov od schválenia." },
  { question: "Aké sú úrokové sadzby?", answer: "Od 10% do 18% p.a. v závislosti od typu projektu a kvality zabezpečenia." },
  { question: "Môžem splatiť úver predčasne?", answer: "Áno, kedykoľvek bez poplatkov. Úroky sa počítajú len za skutočné čerpanie." },
  { question: "Financujete aj fyzické osoby?", answer: "Nie, financujeme výlučne právnické osoby – s.r.o. a a.s." },
];

const PrivateCredit = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Zabezpečené úvery | ASSETRA Investments"
        description="Poskytujeme financovanie pre právnické osoby a realitné projekty. Rýchle schválenie, flexibilné podmienky a transparentné náklady."
      />
      <Header />
      <main>
        <SubpageHero
          label="Private Credit"
          title="Zabezpečené"
          titleAccent="úvery"
          description="Poskytujeme financovanie pre právnické osoby a realitné projekty. Rýchle schválenie, flexibilné podmienky."
          image={verticalCredit}
        />

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                Poskytujeme zabezpečené úvery pre právnické osoby a realitné projekty. Rýchle rozhodnutia, flexibilné podmienky a transparentné náklady.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Financing Types */}
        <AnimatedSection>
          <section className="pb-10 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Čo financujeme
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Ponúkame dva hlavné typy financovania pre právnické osoby.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Financing Types - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <StaggerContainer className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
              {[
                { title: "Realitné projekty", desc: "Financovanie akvizícií, developmentu a rekonštrukcií nehnuteľností.", params: ["Výška: 10 000 – 500 000 €", "Splatnosť: 3–24 mesiacov", "LTV do 70%"] },
                { title: "Podnikateľské úvery", desc: "Financovanie prevádzkového kapitálu, akvizícií a expanzie.", params: ["Výška: 10 000 – 500 000 €", "Splatnosť: 3–24 mesiacov", "Zabezpečenie aktívami"] },
              ].map((type, i) => (
                <StaggerItem key={i}>
                  <div className="border border-primary-foreground/10 p-5 sm:p-8 h-full rounded-xl">
                    <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4 text-primary-foreground">{type.title}</h3>
                    <p className="text-sm sm:text-base text-primary-foreground/40 font-light leading-relaxed mb-4">{type.desc}</p>
                    <ul className="space-y-2">
                      {type.params.map((p, j) => <li key={j} className="text-xs sm:text-sm text-primary-foreground/60">• {p}</li>)}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Benefits */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start mb-10 sm:mb-14 md:mb-20">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Výhody spolupráce
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Rýchle rozhodnutia, flexibilné podmienky a transparentné náklady.
                </p>
              </div>
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { value: "5 dní", label: "Rýchle schválenie", desc: "Rozhodnutie do 5 pracovných dní." },
                  { value: "Flexibilné", label: "Podmienky", desc: "Individuálny prístup ku každému projektu." },
                  { value: "0 €", label: "Skryté poplatky", desc: "Jasná úroková sadzba od začiatku." },
                  { value: "Min.", label: "Byrokracia", desc: "Zameriavame sa na podstatu projektu." },
                ].map((item, i) => (
                  <StaggerItem key={i} className="text-center">
                    <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 sm:mb-3">{item.value}</p>
                    <h3 className="font-serif text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{item.label}</h3>
                    <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </AnimatedSection>

        {/* Process - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground max-w-3xl">
                Ako to funguje
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {[
                { step: "01", title: "Žiadosť", desc: "Kontaktujte nás s popisom projektu." },
                { step: "02", title: "Analýza", desc: "Vyhodnotíme projekt a zabezpečenie." },
                { step: "03", title: "Ponuka", desc: "Konkrétna ponuka s podmienkami." },
                { step: "04", title: "Čerpanie", desc: "Po podpise uvoľníme financie." },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <span className="font-serif text-5xl sm:text-6xl text-primary-foreground/10 block mb-2">{item.step}</span>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3 text-primary-foreground">{item.title}</h3>
                  <p className="text-primary-foreground/40 font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* FAQ */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-10 sm:mb-14 md:mb-20">
                Často kladené otázky
              </h2>
              <div className="max-w-3xl">
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border border-border px-4 sm:px-6 data-[state=open]:border-foreground/30 transition-colors">
                      <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-foreground py-4 sm:py-5 text-foreground/70">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA to Investor page */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
                <div className="max-w-2xl">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground mb-4">
                    Máte záujem investovať?
                  </h2>
                  <p className="text-primary-foreground/50 font-light text-base sm:text-lg leading-relaxed">
                    Vyplňte nezáväzný formulár a ozveme sa vám do 24 hodín s konkrétnymi podmienkami.
                  </p>
                </div>
                <Link
                  to="/pre-investorov#kontakt"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-base sm:text-lg self-start"
                >
                  Chcem investovať
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="h-8 sm:h-12" />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateCredit;
