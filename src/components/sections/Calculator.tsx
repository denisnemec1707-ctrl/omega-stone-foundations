import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedValue } from "@/components/AnimatedCounter";
import { motion } from "framer-motion";
import { useLocale, useFormatCurrency } from "@/i18n/hooks";
import { getLocalizedPath } from "@/i18n/routes";

const Calculator = () => {
  const { t } = useTranslation("forInvestors");
  const locale = useLocale();
  const formatCurrency = useFormatCurrency();
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

  return (
    <section id="kalkulacka" className="py-12 sm:py-20 md:py-32 lg:py-48">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-8 sm:mb-10 md:mb-16">
            <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
              {t("calculator.label")}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md mb-4 sm:mb-6 md:mb-8">
              {t("calculator.title")} <span className="text-gold">{t("calculator.titleAccent")}</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed px-2 sm:px-0">
              {t("calculator.description")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-16">
              <div className="space-y-6 sm:space-y-8 md:space-y-12">
                <div>
                  <div className="flex justify-between mb-2 sm:mb-3 md:mb-4">
                    <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-muted-foreground">
                      {t("calculator.investmentAmount")}
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
                    <span>{t("calculator.min")}</span>
                    <span>{t("calculator.max")}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 sm:mb-3 md:mb-4">
                    <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-muted-foreground">
                      {t("calculator.investmentDuration")}
                    </label>
                    <span className="font-serif text-base sm:text-lg md:text-xl text-gold">
                      <AnimatedValue value={duration} /> {t("calculator.months")}
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
                    <span>{t("calculator.minMonths")}</span>
                    <span>{t("calculator.maxMonths")}</span>
                  </div>
                </div>

                <div className="pt-4 sm:pt-4 md:pt-6 border-t border-border">
                  <div className="flex justify-between text-xs sm:text-xs md:text-sm text-muted-foreground mb-2">
                    <span>{t("calculator.annualRate")}</span>
                    <span className="text-gold">{t("calculator.rateValue")}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-xs md:text-sm text-muted-foreground">
                    <span>{t("calculator.payoutFrequency")}</span>
                    <span className="text-gold">{t("calculator.payoutValue")}</span>
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
                  {t("calculator.results")}
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
                      {t("calculator.monthlyPayout")}
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
                      {t("calculator.totalReturnFor")} <AnimatedValue value={duration} /> {t("calculator.months")}
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
                      {t("calculator.totalEnd")}
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
                    <p className="text-xs text-muted-foreground mt-2">{t("calculator.totalEndNote")}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-8 sm:mt-10 md:mt-16" delay={0.4}>
            <p className="text-muted-foreground font-light text-sm md:text-base mb-6">
              {t("calculator.interested")}
            </p>
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm md:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <Link to={getLocalizedPath("invest", locale)}>{t("calculator.cta")}</Link>
            </Button>
            <p className="mt-4 text-xs sm:text-sm text-muted-foreground/70">
              {t("calculator.clubLinkPrefix")}{" "}
              <Link to={getLocalizedPath("club", locale)} className="underline underline-offset-4 hover:text-foreground transition-colors">
                {t("calculator.clubLinkText")}
              </Link>{" "}
              {t("calculator.clubLinkSuffix")}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
