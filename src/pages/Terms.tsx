import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import { AnimatedSection } from "@/components/AnimatedSection";

const Terms = () => {
  const { t } = useTranslation("terms");

  const sectionKeys = [
    "intro",
    "content",
    "risk",
    "ip",
    "liability",
    "thirdParty",
    "law",
    "contact",
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
      />
      <Header />
      <main>
        <section className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 sm:mb-12 md:mb-16">
                {t("title")}
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="prose prose-lg max-w-3xl text-muted-foreground font-light leading-relaxed space-y-8 sm:space-y-10">
                {sectionKeys.map((key) => (
                  <div key={key}>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">
                      {t(`sections.${key}.title`)}
                    </h2>
                    <p className="text-sm sm:text-base">
                      {key === "contact" ? (
                        <>
                          {t(`sections.${key}.text`).split("info@assetrainvestments.com")[0]}
                          <a href="mailto:info@assetrainvestments.com" className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors">
                            info@assetrainvestments.com
                          </a>
                          {t(`sections.${key}.text`).split("info@assetrainvestments.com")[1] ?? ""}
                        </>
                      ) : (
                        t(`sections.${key}.text`)
                      )}
                    </p>
                  </div>
                ))}

                <p className="text-xs sm:text-sm text-muted-foreground/60 pt-4 border-t border-border">
                  {t("lastUpdated")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
