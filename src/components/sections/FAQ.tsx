import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const FAQ = () => {
  const { t } = useTranslation("forInvestors");
  const faqItems = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="py-12 sm:py-20 md:py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-8 sm:mb-10 md:mb-16">
            <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
              {t("faq.label")}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md text-white">
              {t("faq.title")} <span className="text-gold">{t("faq.titleAccent")}</span>
            </h2>
          </AnimatedSection>

          <StaggerContainer staggerDelay={0.08}>
            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {faqItems.map((faq, index) => (
                <StaggerItem key={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border px-4 sm:px-4 md:px-6 data-[state=open]:border-gold transition-colors"
                  >
                    <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-gold py-4 sm:py-4 md:py-6 text-white">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-4 md:pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
