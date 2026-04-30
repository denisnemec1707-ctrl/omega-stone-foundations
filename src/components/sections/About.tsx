import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/AnimatedSection";

const About = () => {
  const { t } = useTranslation("index");

  return (
    <section id="o-nas" className="py-12 sm:py-20 md:py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <AnimatedSection className="max-w-4xl">
          <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
            {t("about.label")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md mb-6 sm:mb-8 md:mb-12 leading-tight text-white">
            {t("about.title")} <span className="text-gold">{t("about.titleAccent")}</span>
          </h2>
          <div className="space-y-4 md:space-y-6 text-muted-foreground font-light text-sm sm:text-base md:text-lg leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
