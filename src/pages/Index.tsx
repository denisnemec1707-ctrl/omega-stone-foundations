import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Link to={href} className="block group">
      <div
        ref={ref}
        className="relative rounded-2xl overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px]"
      >
        {/* Parallax BG image */}
        <motion.div
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
          style={{ y }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Content */}
        <div className="relative z-10 h-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex flex-col justify-end p-8 sm:p-12 md:p-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-end">
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-4 leading-tight">
                {title}
              </h3>
              <motion.div
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground text-sm tracking-wide group-hover:bg-primary-foreground/10 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Zobraziť viac
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </div>
            <p className="text-primary-foreground/80 text-base sm:text-lg font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Full screen with mountain image */}
        <section ref={heroRef} className="relative h-screen overflow-hidden rounded-2xl mx-4 sm:mx-6 mt-4 sm:mt-6">
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src={heroMountains}
              alt="Mountain landscape"
              className="w-full h-[120%] object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          <motion.div
            className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-12 md:p-16"
            style={{ opacity: heroOpacity }}
          >
            {/* Giant name */}
            <div className="flex-1 flex items-center justify-center">
              <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] text-primary-foreground tracking-tight leading-none text-center">
                ASSETRA
              </h1>
            </div>

            {/* Bottom subtitle */}
            <div className="max-w-3xl">
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground/90 leading-tight">
                Súkromná investičná spoločnosť zameraná na dlhodobý rast
              </p>
            </div>
          </motion.div>
        </section>

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-24 sm:py-32 md:py-40">
            <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug text-foreground max-w-5xl">
                ASSETRA investments je súkromná investičná spoločnosť so sídlom na Slovensku. Spravujeme diverzifikované portfólio naprieč nehnuteľnosťami, akvizíciami firiem a zabezpečenými úvermi.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Diverzifikované portfólio heading */}
        <AnimatedSection>
          <section className="pb-16 sm:pb-20">
            <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                  Diverzifikované portfólio
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed md:pt-4">
                  Naša stratégia je založená na konzervativnom prístupe s dôrazom na ochranu kapitálu a generovanie stabilných výnosov prostredníctvom reálnych aktív a overených investičných stratégií.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Vertical Cards */}
        <section className="px-4 sm:px-6 space-y-6 sm:space-y-8">
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

        {/* Spacer */}
        <div className="h-24 sm:h-32" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
