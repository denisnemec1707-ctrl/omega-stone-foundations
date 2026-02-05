import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const Trust = () => {
  const trustItems = [
    {
      title: "Konzervatívna akvizícia",
      description: "Kupujeme iba nehnuteľnosti s cenou 20% alebo viac pod trhovou hodnotou. Táto marža chráni pred trhovými výkyvmi a zabezpečuje ziskovosť aj v nepriaznivých podmienkach.",
      highlighted: true,
    },
    {
      title: "Zabezpečenie reálnymi aktívami",
      description: "Každá investícia je krytá fyzickými nehnuteľnosťami. Na rozdiel od finančných nástrojov si nehnuteľnosť zachováva vnútornú hodnotu bez ohľadu na trhový sentiment.",
      highlighted: false,
    },
    {
      title: "Krátke cykly",
      description: "Investičné obdobia 12–36 mesiacov limitujú expozíciu voči dlhodobým trhovým zmenám. Kapitál sa vracia a môže byť reinvestovaný alebo vybraný v pravidelných intervaloch.",
      highlighted: false,
    },
    {
      title: "Prevádzkové skúsenosti",
      description: "Náš tím dokončil desiatky akvizično-rekonštrukčno-predajných cyklov. Rozumieme slovenskému realitnému trhu, miestnym predpisom a ekonomike rekonštrukcií.",
      highlighted: false,
    },
  ];

  return (
    <section id="dovera" className="py-12 sm:py-20 md:py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-8 sm:mb-10 md:mb-16">
            <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
              Riadenie rizík
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md mb-4 sm:mb-6 md:mb-8 text-white">
              Ochrana kapitálu <span className="text-gold">na prvom mieste</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed px-2 sm:px-0">
              Každú transakciu štruktúrujeme s bezpečnosťou vášho kapitálu ako primárnou prioritou.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16" staggerDelay={0.1}>
            {trustItems.map((item, index) => (
              <StaggerItem
                key={index}
                className={`border-l-2 pl-4 sm:pl-6 md:pl-8 ${
                  item.highlighted ? "border-gold" : "border-border"
                }`}
              >
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4 text-white">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center" delay={0.4}>
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm md:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <a href="#kontakt">Kontaktovať nás</a>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Trust;
