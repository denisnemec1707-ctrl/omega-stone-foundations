import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import PageMeta from "@/components/PageMeta";
import { ArrowUpRight } from "lucide-react";

import ensolaLogo from "@/assets/ensola-logo.png";
import woodsteelLogo from "@/assets/woodsteel-logo.png";
import historycaffeImg from "@/assets/historycaffe.jpg";
import euroscaffLogo from "@/assets/euroscaff-logo.png";
import sutovce1 from "@/assets/sutovce-1.jpg";
import sutovce2 from "@/assets/sutovce-2.jpg";
import crossrockLogo from "@/assets/crossrock-logo.png";

const companies = [
  {
    name: "Ensola",
    logo: euroscaffLogo,
    description:
      "Predaj a montáž tepelných čerpadiel, smart home riešení a fotovoltických systémov. Moderné energetické riešenia pre domácnosti aj firmy.",
    tags: ["Tepelné čerpadlá", "Fotovoltika", "Smart Home"],
  },
  {
    name: "Woodsteel",
    logo: woodsteelLogo,
    description:
      "Výroba a montáž zasklení, pergol a zimných záhrad. Aktuálne pôsobí v troch krajinách — Slovensko, Česko a Rakúsko.",
    tags: ["Zasklenia", "Pergoly", "SK · CZ · AT"],
  },
  {
    name: "History Caffe & Bakery",
    image: historycaffeImg,
    description:
      "Lokálna kaviareň s vlastnou pekárňou. Autentický koncept spojujúci kvalitnú kávu s čerstvo pečeným pečivom.",
    tags: ["Kaviareň", "Pekáreň", "Lokálny koncept"],
  },
  {
    name: "EUROSCAFF",
    logo: euroscaffLogo,
    description:
      "Stavebná spoločnosť a personálna agentúra v stavebníctve pôsobiaca na nemeckom trhu. Zabezpečuje kvalifikovanú pracovnú silu pre stavebné projekty.",
    tags: ["Stavebníctvo", "Personalistika", "Nemecko"],
  },
];

const Portfolio = () => {
  return (
    <>
      <PageMeta
        title="Naše portfólio | ASSETRA investments"
        description="Portfólio malých lokálnych podnikov, ktoré spoluvlastníme — Ensola, Woodsteel, History Caffe & Bakery, EUROSCAFF a realitné projekty."
      />
      <Header />
      <main>
        <SubpageHero
          label="Portfólio"
          title="Naše"
          titleAccent="spoločnosti"
          description="Budujeme a spoluvlastníme portfólio malých lokálnych podnikov s potenciálom rastu naprieč rôznymi odvetviami."
        />

        {/* Company Cards */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="mb-12 sm:mb-16">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Aktívne investície
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 leading-tight">
                  Spoločnosti v našom portfóliu
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {companies.map((company, i) => (
                <AnimatedSection key={company.name}>
                  <div className="group bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 h-full flex flex-col transition-colors hover:bg-secondary">
                    <div className="h-12 sm:h-16 mb-6 sm:mb-8 flex items-center">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="h-full w-auto object-contain max-w-[180px]"
                        />
                      ) : company.image ? (
                        <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl overflow-hidden">
                          <img
                            src={company.image}
                            alt={company.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : null}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">
                      {company.name}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                      {company.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {company.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-xs tracking-wide uppercase px-3 py-1.5 rounded-full bg-background text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Acquisition Banner */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="bg-primary/10 border border-primary/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary mb-3 block">
                  Prebiehajúca akvizícia
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3">
                  Rozširujeme portfólio
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                  Aktuálne prebieha akvizícia spoločnosti zameranej na obchod s hútnickým materiálom.
                  Detaily zverejníme po ukončení transakcie.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Nové Šútovce */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="mb-12 sm:mb-16">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Realitný projekt
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 leading-tight">
                  Nové Šútovce 1
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-4 max-w-3xl leading-relaxed">
                  Predaj stavebných pozemkov v Šútovciach. Pripravené parcely v miernom svahu
                  s kompletnou infraštruktúrou (siete + cesta). Ideálna poloha v Hornonitrianskej
                  kotline zaručuje rýchlu výstavbu a nerušený výhľad na okolitú krajinu.
                </p>
                <p className="text-muted-foreground/70 text-sm mt-3">
                  Zrealizované v spolupráci so spoločnosťou BAK spol. s.r.o.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <AnimatedSection>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src={sutovce1}
                    alt="Nové Šútovce - stavebné pozemky"
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src={sutovce2}
                    alt="Nové Šútovce - parcely"
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Crossrock Capital */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-shrink-0">
                  <img
                    src={crossrockLogo}
                    alt="Crossrock Capital logo"
                    className="h-16 sm:h-20 md:h-24 w-auto object-contain opacity-80"
                  />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-3 block">
                    Naša história
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary-foreground mb-4">
                    Crossrock Capital
                  </h3>
                  <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">
                    V minulosti sme boli súčasťou spoločnosti Crossrock Capital, kde sme spoločne
                    zobchodovali desiatky nehnuteľností. Táto skúsenosť formovala náš prístup
                    k investíciám a položila základy pre vznik ASSETRA investments.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
