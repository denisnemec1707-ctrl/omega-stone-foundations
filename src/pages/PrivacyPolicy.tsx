import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import { AnimatedSection } from "@/components/AnimatedSection";

const PrivacyPolicy = () => {
  const { t } = useTranslation("privacy");

  const purposeItems = t("sections.purpose.items", { returnObjects: true }) as string[];
  const recipientsItems = t("sections.recipients.items", { returnObjects: true }) as string[];
  const scopeItems = t("sections.scope.items", { returnObjects: true }) as string[];
  const rightsItems = t("sections.rights.items", { returnObjects: true }) as string[];

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
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.controller.title")}</h2>
                  <p className="text-sm sm:text-base">
                    {t("sections.controller.text")}
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.purpose.title")}</h2>
                  <p className="text-sm sm:text-base">{t("sections.purpose.intro")}</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm sm:text-base">
                    {Array.isArray(purposeItems) && purposeItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.scope.title")}</h2>
                  <p className="text-sm sm:text-base">{t("sections.scope.intro")}</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm sm:text-base">
                    {Array.isArray(scopeItems) && scopeItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.legalBasis.title")}</h2>
                  <p className="text-sm sm:text-base">
                    {t("sections.legalBasis.text")}
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.retention.title")}</h2>
                  <p className="text-sm sm:text-base">
                    {t("sections.retention.text")}
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.recipients.title")}</h2>
                  <p className="text-sm sm:text-base">{t("sections.recipients.intro")}</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm sm:text-base">
                    {Array.isArray(recipientsItems) && recipientsItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.transfers.title")}</h2>
                  <p className="text-sm sm:text-base">
                    {t("sections.transfers.text")}
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.rights.title")}</h2>
                  <p className="text-sm sm:text-base">{t("sections.rights.intro")}</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm sm:text-base">
                    {Array.isArray(rightsItems) && rightsItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.cookies.title")}</h2>
                  <p className="text-sm sm:text-base">
                    {t("sections.cookies.text")}
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">{t("sections.contact.title")}</h2>
                  <p className="text-sm sm:text-base">
                    {t("sections.contact.text").split("info@assetrainvestments.com")[0]}
                    <a href="mailto:info@assetrainvestments.com" className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors">
                      info@assetrainvestments.com
                    </a>
                    {t("sections.contact.text").split("info@assetrainvestments.com")[1] ?? ""}
                  </p>
                </div>

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

export default PrivacyPolicy;
