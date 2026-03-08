import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroMountains from "@/assets/hero-mountains.jpg";
import verticalRealestate from "@/assets/vertical-realestate.jpg";
import verticalCredit from "@/assets/vertical-credit.jpg";
import verticalEquity from "@/assets/vertical-equity.jpg";

const VerticalCard = ({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Link to={href} className="block group">
      <motion.div
        ref={ref}
        className="relative rounded-xl sm:rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
        whileHover={{ scale: 1.01, y: -4 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 sm:from-black/70 sm:via-black/30" />

        <div className="relative z-10 h-full min-h-[380px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex flex-col justify-end p-5 sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-col gap-4 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 md:items-end">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary-foreground mb-3 sm:mb-4 leading-tight">
                {title}
              </h3>
              <motion.div
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-primary-foreground/30 text-primary-foreground text-xs sm:text-sm tracking-wide group-hover:bg-primary-foreground/10 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Zobraziť viac
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.div>
            </div>
            <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="ASSETRA Investments | Súkromná investičná spoločnosť"
        description="Súkromná investičná spoločnosť zameraná na dlhodobý rast. Nehnuteľnosti, private equity a zabezpečené úvery na Slovensku."
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-[85vh] sm:h-[90vh] md:h-screen overflow-hidden rounded-xl sm:rounded-2xl mx-3 sm:mx-4 md:mx-6 mt-3 sm:mt-4 md:mt-6"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src={heroMountains}
              alt="Mountain landscape"
              className="w-full h-[115%] sm:h-[120%] object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 sm:from-black/50 sm:to-black/20" />

          <motion.div
            className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-16"
            style={{ opacity: heroOpacity }}
          >
            <div className="flex-1 flex items-center justify-center">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] text-primary-foreground tracking-tight leading-none text-center">
                ASSETRA
              </h1>
            </div>

            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-primary-foreground/90 leading-snug">
                Súkromná investičná spoločnosť zameraná na dlhodobý rast
              </p>
            </div>
          </motion.div>
        </section>

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                ASSETRA investments je súkromná investičná spoločnosť so sídlom na Slovensku. Spravujeme diverzifikované portfólio naprieč nehnuteľnosťami, akvizíciami firiem a zabezpečenými úvermi.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Diverzifikované portfólio */}
        <AnimatedSection>
          <section className="pb-10 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Diverzifikované portfólio
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Naša stratégia je založená na konzervativnom prístupe s dôrazom na ochranu kapitálu a generovanie stabilných výnosov prostredníctvom reálnych aktív a overených investičných stratégií.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Vertical Cards */}
        <section className="px-3 sm:px-4 md:px-6 space-y-4 sm:space-y-6 md:space-y-8">
          <VerticalCard
            title="Nehnuteľnosti a realitný flipping"
            description="Nakupujeme nehnuteľnosti pod trhovú hodnotu prostredníctvom realitného flippingu. Špecializujeme sa na problémové nehnuteľnosti, ktorým pridávame hodnotu a následne predávame s výrazným zhodnotením."
            image={verticalRealestate}
            href="/real-estate"
          />
          <VerticalCard
            title="Zabezpečené úvery"
            description="Financujeme právnické osoby a realitné projekty zabezpečenými úvermi. Ponúkame flexibilné podmienky s dôrazom na bezpečnosť investície a stabilné, rizikovo vyvážené výnosy."
            image={verticalCredit}
            href="/private-credit"
          />
          <VerticalCard
            title="Akvizície a private equity"
            description="Vyhľadávame fungujúce, zabehnuté firmy na slovenskom a českom trhu vhodné na odkúpenie. Investujeme prostredníctvom dlhodobých partnerstiev s dôrazom na rast hodnoty."
            image={verticalEquity}
            href="/private-equity"
          />
        </section>

        {/* CTA Section */}
        <AnimatedSection>
          <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 mt-8 sm:mt-12 md:mt-16 py-16 sm:py-24 md:py-32">
            <div className="px-5 sm:px-8 md:px-12 lg:px-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 sm:gap-10">
                <div className="max-w-2xl">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground mb-4 sm:mb-6">
                    Začnite investovať s ASSETRA
                  </h2>
                  <p className="text-primary-foreground/50 font-light text-base sm:text-lg leading-relaxed">
                    Fixný 10% ročný výnos vyplácaný mesačne. Váš kapitál je zabezpečený reálnymi aktívami. Vyplňte nezáväzný formulár a ozveme sa vám do 24 hodín.
                  </p>
                </div>
                <Link
                  to="/pre-investorov#kontakt"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-base sm:text-lg self-start"
                >
                  Chcem investovať
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="h-16 sm:h-24 md:h-32" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
