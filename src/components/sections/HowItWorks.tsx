import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AnimatedProgressLine = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="absolute left-5 sm:left-6 md:left-8 top-10 sm:top-12 md:top-16 bottom-10 sm:bottom-12 md:bottom-16 w-px bg-border overflow-hidden"
    >
      <motion.div
        className="w-full bg-gold"
        initial={{ height: "0%" }}
        animate={{ height: isVisible ? "100%" : "0%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />
    </motion.div>
  );
};

interface StepProps {
  number: number;
  title: string;
  description: string;
  isHighlighted?: boolean;
}

const Step = ({ number, title, description, isHighlighted = false }: StepProps) => {
  return (
    <StaggerItem className="flex gap-4 sm:gap-5 md:gap-8 relative">
      <motion.div
        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center z-10 bg-background ${
          isHighlighted ? "border-gold" : "border-border"
        }`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span
          className={`font-serif text-lg sm:text-xl md:text-2xl ${
            isHighlighted ? "text-gold" : "text-muted-foreground"
          }`}
        >
          {number}
        </span>
      </motion.div>
      <div>
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4">{title}</h3>
        <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </StaggerItem>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Investujete",
      description:
        "Záväzujete kapitál na definované obdobie (zvyčajne 12–36 mesiacov). Vaše investičné podmienky — výnosová sadzba, výplatný kalendár a trvanie — sú fixované pri podpise zmluvy.",
      isHighlighted: true,
    },
    {
      number: 2,
      title: "Kupujeme nehnuteľnosť",
      description:
        "Váš kapitál financuje nákup starostlivo vybraných nehnuteľností. Akvizujeme iba aktíva s cenou minimálne 20% pod trhovou hodnotou, čím zabezpečujeme vstavanú maržu pre vaše výnosy a naše operácie.",
      isHighlighted: false,
    },
    {
      number: 3,
      title: "Rekonštrukcia a predaj",
      description:
        "Nehnuteľnosť rekonštruujeme na trhový štandard a predávame za férovú trhovú cenu. Zisková marža pokrýva váš fixný výnos, prevádzkové náklady a náš zisk.",
      isHighlighted: false,
    },
    {
      number: 4,
      title: "Dostávate výnosy",
      description:
        "Počas celého investičného obdobia dostávate mesačné výplaty. Na konci cyklu sa vám vráti celá istina. Potom sa môžete rozhodnúť reinvestovať alebo kapitál kompletne vybrať.",
      isHighlighted: true,
    },
  ];

  return (
    <section id="ako-to-funguje" className="py-12 sm:py-20 md:py-32 lg:py-48">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-20">
            <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
              Investičný model
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md">
              Ako váš kapitál <span className="text-gold">pracuje</span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            <AnimatedProgressLine />
            <StaggerContainer className="space-y-6 sm:space-y-10 md:space-y-16" staggerDelay={0.15}>
              {steps.map((step) => (
                <Step key={step.number} {...step} />
              ))}
            </StaggerContainer>
          </div>

          <AnimatedSection className="text-center mt-8 sm:mt-12 md:mt-16" delay={0.6}>
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm md:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <a href="#kontakt">Začať investovať</a>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
