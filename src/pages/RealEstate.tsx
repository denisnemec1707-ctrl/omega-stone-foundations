import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import verticalRealestate from "@/assets/vertical-realestate.jpg";

const RealEstate = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Nehnuteľnosti a realitný flipping | ASSETRA Investments"
        description="Nakupujeme nehnuteľnosti pod trhovú hodnotu, rekonštruujeme ich a predávame s výrazným zhodnotením. Fixný 12% ročný výnos."
      />
      <Header />
      <main>
        <SubpageHero
          label="Investícia s fixným výnosom"
          title="Nehnuteľnosti"
          titleAccent="a realitný flipping"
          description="Nakupujeme nehnuteľnosti pod trhovú hodnotu, rekonštruujeme ich a predávame s výrazným zhodnotením. Váš kapitál je zabezpečený reálnymi aktívami."
          image={verticalRealestate}
        />

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                ASSETRA investments je slovenská investičná spoločnosť špecializujúca sa na akvizíciu, rekonštrukciu a predaj podhodnotených rezidenčných nehnuteľností.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Why Invest */}
        <AnimatedSection>
          <section className="pb-10 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Ako funguje realitný flipping
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Špecializujeme sa na problémové nehnuteľnosti, ktorým pridávame hodnotu prostredníctvom komplexnej rekonštrukcie a následného predaja.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Benefits - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {[
                { value: "12%", label: "Fixný ročný výnos", desc: "Váš výnos je vopred určený a zmluvne garantovaný." },
                { value: "Mesačne", label: "Pravidelný príjem", desc: "Dostávajte svoje výnosy každý mesiac." },
                { value: "Reálne", label: "Zabezpečenie aktívami", desc: "Každá investícia je viazaná na fyzické nehnuteľnosti." },
                { value: "12–36", label: "Mesačné cykly", desc: "Krátke investičné horizonty s definovanými výstupmi." },
                { value: "20%+", label: "Prevádzkové marže", desc: "Náš model cieli na minimálne 20% ziskové marže." },
                { value: "Plná", label: "Návratnosť kapitálu", desc: "Na konci cyklu dostanete späť celú istinu." },
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

        {/* How It Works */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start mb-10 sm:mb-14 md:mb-20">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Ako váš kapitál pracuje
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Jednoduchý a transparentný proces od investície po výplatu výnosov.
                </p>
              </div>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                {[
                  { step: "01", title: "Investujete", desc: "Záväzujete kapitál na definované obdobie. Podmienky sú fixované pri podpise zmluvy." },
                  { step: "02", title: "Kupujeme nehnuteľnosť", desc: "Váš kapitál financuje nákup nehnuteľností minimálne 20% pod trhovou hodnotou." },
                  { step: "03", title: "Rekonštrukcia a predaj", desc: "Nehnuteľnosť rekonštruujeme a predávame za férovú trhovú cenu." },
                  { step: "04", title: "Dostávate výnosy", desc: "Mesačné výplaty počas celého obdobia. Na konci sa vám vráti celá istina." },
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

export default RealEstate;
