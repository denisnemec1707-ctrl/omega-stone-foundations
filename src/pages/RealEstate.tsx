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
        description="Nakupujeme podhodnotené nehnuteľnosti, rekonštruujeme ich a predávame s výrazným zhodnotením. Špecializujeme sa na realitný flipping na Slovensku."
      />
      <Header />
      <main>
        <SubpageHero
          label="Náš sektor"
          title="Nehnuteľnosti"
          titleAccent="a realitný flipping"
          description="Špecializujeme sa na akvizíciu podhodnotených nehnuteľností, ich komplexnú rekonštrukciu a následný predaj za trhovú cenu."
          image={verticalRealestate}
        />

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                Vyhľadávame problémové a podhodnotené rezidenčné nehnuteľnosti na slovenskom trhu. Po akvizícii im pridávame hodnotu komplexnou rekonštrukciou a predávame za férovú trhovú cenu.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* How flipping works */}
        <AnimatedSection>
          <section className="pb-10 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Ako funguje realitný flipping
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Náš obchodný model je postavený na nákupe nehnuteľností minimálne 20% pod trhovú hodnotu, ich rekonštrukcii a následnom predaji.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Process Steps */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
              {[
                { step: "01", title: "Akvizícia", desc: "Vyhľadávame nehnuteľnosti pod trhovú hodnotu — exekúcie, dedičstvá, urgentné predaje." },
                { step: "02", title: "Rekonštrukcia", desc: "Komplexná obnova s vlastným tímom. Zameriavame sa na maximalizáciu hodnoty pri kontrolovaných nákladoch." },
                { step: "03", title: "Predaj", desc: "Nehnuteľnosť predávame za férovú trhovú cenu. Typická marža je 20% a viac." },
                { step: "04", title: "Opakovanie", desc: "Celý cyklus trvá 12–36 mesiacov. Kapitál sa reinvestuje do ďalších projektov." },
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

        {/* Stats */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                {[
                  { value: "20%+", label: "Cieľová marža", desc: "Na každom projekte cielime minimálne 20% ziskovú maržu." },
                  { value: "12–36", label: "Mesačné cykly", desc: "Krátke investičné horizonty s definovanými výstupmi." },
                  { value: "SK", label: "Trh", desc: "Zameriavame sa na slovenský rezidenčný trh." },
                  { value: "Reálne", label: "Aktíva", desc: "Každý projekt je viazaný na fyzickú nehnuteľnosť." },
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
                    Fixný 12% ročný výnos zabezpečený reálnymi nehnuteľnosťami. Vyplňte nezáväzný formulár.
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
