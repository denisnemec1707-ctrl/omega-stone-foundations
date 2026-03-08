import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedValue } from "@/components/AnimatedCounter";
import { motion } from "framer-motion";

const Calculator = () => {
  const [investment, setInvestment] = useState(50000);
  const [duration, setDuration] = useState(12);
  const annualRate = 0.12;

  const calculations = useMemo(() => {
    const monthlyRate = annualRate / 12;
    const monthlyPayout = investment * monthlyRate;
    const totalReturn = monthlyPayout * duration;
    const totalAtEnd = investment + totalReturn;

    return {
      monthlyPayout: Math.round(monthlyPayout),
      totalReturn: Math.round(totalReturn),
      totalAtEnd: Math.round(totalAtEnd),
    };
  }, [investment, duration]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sk-SK', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="kalkulacka" className="py-12 sm:py-20 md:py-32 lg:py-48">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-8 sm:mb-10 md:mb-16">
            <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
              Investičná kalkulačka
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md mb-4 sm:mb-6 md:mb-8">
              Vypočítajte si svoje <span className="text-gold">výnosy</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed px-2 sm:px-0">
              Pozrite sa, koľko by ste zarobili s fixným 12% ročným výnosom od ASSETRA.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-16">
              <div className="space-y-6 sm:space-y-8 md:space-y-12">
                <div>
                  <div className="flex justify-between mb-2 sm:mb-3 md:mb-4">
                    <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-muted-foreground">
                      Výška investície
                    </label>
                    <span className="font-serif text-base sm:text-lg md:text-xl text-gold">
                      <AnimatedValue
                        value={investment}
                        formatValue={(v) => formatCurrency(v)}
                      />
                    </span>
                  </div>
                  <Slider
                    value={[investment]}
                    onValueChange={(value) => setInvestment(value[0])}
                    min={10000}
                    max={500000}
                    step={5000}
                    className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5 md:[&_[role=slider]]:h-4 md:[&_[role=slider]]:w-4"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>10 000 €</span>
                    <span>500 000 €</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 sm:mb-3 md:mb-4">
                    <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-muted-foreground">
                      Doba investície
                    </label>
                    <span className="font-serif text-base sm:text-lg md:text-xl text-gold">
                      <AnimatedValue value={duration} /> mesiacov
                    </span>
                  </div>
                  <Slider
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    min={6}
                    max={24}
                    step={6}
                    className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5 md:[&_[role=slider]]:h-4 md:[&_[role=slider]]:w-4"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>6 mesiacov</span>
                    <span>24 mesiacov</span>
                  </div>
                </div>

                <div className="pt-4 sm:pt-4 md:pt-6 border-t border-border">
                  <div className="flex justify-between text-xs sm:text-xs md:text-sm text-muted-foreground mb-2">
                    <span>Ročná výnosová sadzba</span>
                    <span className="text-gold">10% fixne</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-xs md:text-sm text-muted-foreground">
                    <span>Frekvencia výplat</span>
                    <span className="text-gold">Mesačne</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="bg-card p-5 sm:p-6 md:p-8 lg:p-12 border border-border shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 text-center text-foreground">
                  Vaše výnosy
                </h3>

                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <motion.div
                    className="text-center pb-4 sm:pb-6 md:pb-8 border-b border-border"
                    key={`monthly-${calculations.monthlyPayout}`}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-1 sm:mb-2">
                      Mesačná výplata
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl md:text-display-sm text-gold">
                      <AnimatedValue
                        value={calculations.monthlyPayout}
                        formatValue={(v) => formatCurrency(v)}
                      />
                    </p>
                  </motion.div>

                  <motion.div
                    className="text-center pb-4 sm:pb-6 md:pb-8 border-b border-border"
                    key={`total-${calculations.totalReturn}`}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-1 sm:mb-2">
                      Celkový výnos za <AnimatedValue value={duration} /> mesiacov
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl md:text-display-sm text-foreground">
                      <AnimatedValue
                        value={calculations.totalReturn}
                        formatValue={(v) => formatCurrency(v)}
                      />
                    </p>
                  </motion.div>

                  <div className="text-center">
                    <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-1 sm:mb-2">
                      Celkom na konci obdobia
                    </p>
                    <motion.p
                      className="font-serif text-2xl sm:text-3xl md:text-display-sm text-gold"
                      key={`end-${calculations.totalAtEnd}`}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <AnimatedValue
                        value={calculations.totalAtEnd}
                        formatValue={(v) => formatCurrency(v)}
                      />
                    </motion.p>
                    <p className="text-xs text-muted-foreground mt-2">(Istina + Výnosy)</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-8 sm:mt-10 md:mt-16" delay={0.4}>
            <p className="text-muted-foreground font-light text-sm md:text-base mb-6">
              Zaujali vás tieto výnosy? Kontaktujte nás pre viac informácií.
            </p>
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm md:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <a href="#kontakt">Chcem investovať</a>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
