import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import PageMeta from "@/components/PageMeta";
import { useTranslation } from "react-i18next";

import ensolaLogo from "@/assets/ensola-logo.png";
import woodsteelLogo from "@/assets/woodsteel-logo.png";
import historycaffeImg from "@/assets/historycaffe.jpg";
import euroscaffLogo from "@/assets/euroscaff-logo.png";
import sutovce1 from "@/assets/sutovce-1.jpg";
import sutovce2 from "@/assets/sutovce-2.jpg";

const Portfolio = () => {
  const { t } = useTranslation("portfolio");

  const companies: Array<{
    name: string;
    logo?: string;
    image?: string;
    description: string;
    tags: string[];
  }> = [
    {
      name: t("companies.ensola.name"),
      logo: euroscaffLogo,
      description: t("companies.ensola.description"),
      tags: t("companies.ensola.tags", { returnObjects: true }) as string[],
    },
    {
      name: t("companies.woodsteel.name"),
      logo: woodsteelLogo,
      description: t("companies.woodsteel.description"),
      tags: t("companies.woodsteel.tags", { returnObjects: true }) as string[],
    },
    {
      name: t("companies.historyCaffe.name"),
      image: historycaffeImg,
      description: t("companies.historyCaffe.description"),
      tags: t("companies.historyCaffe.tags", { returnObjects: true }) as string[],
    },
    {
      name: t("companies.euroscaff.name"),
      logo: ensolaLogo,
      description: t("companies.euroscaff.description"),
      tags: t("companies.euroscaff.tags", { returnObjects: true }) as string[],
    },
  ];

  return (
    <>
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        routeKey="portfolio"
      />
      <Header />
      <main>
        <SubpageHero
          label={t("hero.label")}
          title={t("hero.title")}
          titleAccent={t("hero.titleAccent")}
          description={t("hero.description")}
        />

        {/* Company Cards */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="mb-12 sm:mb-16">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {t("activeInvestments")}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 leading-tight">
                  {t("companiesCount")}
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {companies.map((company) => (
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
                  {t("pendingAcquisition.label")}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3">
                  {t("pendingAcquisition.title")}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                  {t("pendingAcquisition.text")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Brixstone Capital */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-3 block">
                  {t("realEstateDivision.label")}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary-foreground mb-4">
                  {t("realEstateDivision.title")}
                </h3>
                <p className="text-primary-foreground/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
                  {t("realEstateDivision.text")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Nove Sutovce */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="mb-12 sm:mb-16">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {t("project.label")}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 leading-tight">
                  {t("project.title")}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-4 max-w-3xl leading-relaxed">
                  {t("project.text")}
                </p>
                <p className="text-muted-foreground/70 text-sm mt-3">
                  {t("project.partner")}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <AnimatedSection>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src={sutovce1}
                    alt={t("project.alt1")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src={sutovce2}
                    alt={t("project.alt2")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
