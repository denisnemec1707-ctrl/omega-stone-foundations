import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import PageMeta from "@/components/PageMeta";
import { ArrowUpRight, Briefcase, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/i18n/hooks";
import { getLocalizedPath } from "@/i18n/routes";

const Careers = () => {
  const { t } = useTranslation("careers");
  const locale = useLocale();

  const positions = [
    {
      title: t("positions.salesRep.title"),
      icon: Users,
      type: t("positions.salesRep.type"),
      description: t("positions.salesRep.description"),
      requirements: t("positions.salesRep.requirements", { returnObjects: true }) as string[],
    },
    {
      title: t("positions.projectManager.title"),
      icon: Briefcase,
      type: t("positions.projectManager.type"),
      description: t("positions.projectManager.description"),
      requirements: t("positions.projectManager.requirements", { returnObjects: true }) as string[],
    },
  ];

  return (
    <>
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        routeKey="careers"
      />
      <Header />
      <main>
        <SubpageHero
          label={t("hero.label")}
          title={t("hero.title")}
          titleAccent={t("hero.titleAccent")}
          description={t("hero.description")}
        />

        {/* Featured: Assistant CEO */}
        <section className="pt-16 sm:pt-24 md:pt-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <Link
                to={getLocalizedPath("assistantCeo", locale)}
                className="group block bg-charcoal rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-charcoal/90 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4">
                      <Sparkles className="w-3 h-3" />
                      {t("featured.label")}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mb-3">
                      {t("featured.title")}
                    </h3>
                    <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed max-w-2xl">
                      {t("featured.text")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary-foreground group-hover:gap-3 transition-all">
                    <span className="text-sm sm:text-base">{t("featured.cta")}</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="max-w-3xl">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {t("openPositions.label")}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 sm:mb-6 leading-tight">
                  {t("openPositions.title")}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                  {t("openPositions.description")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Position Cards */}
        <section className="pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {positions.map((pos) => (
                <AnimatedSection key={pos.title}>
                  <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <pos.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-foreground">
                          {pos.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">{pos.type}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                      {pos.description}
                    </p>

                    <div className="mt-auto">
                      <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                        {t("requirementsLabel")}
                      </h4>
                      <ul className="space-y-2">
                        {pos.requirements.map((req) => (
                          <li
                            key={req}
                            className="text-sm text-foreground/80 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mb-4">
                  {t("cta.heading")}
                </h3>
                <p className="text-primary-foreground/60 text-sm sm:text-base mb-8 max-w-xl mx-auto">
                  {t("cta.text")}
                </p>
                <a
                  href="mailto:info@assetrainvestments.com"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-base sm:text-lg"
                >
                  info@assetrainvestments.com
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Careers;
