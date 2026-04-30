import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLocale } from "@/i18n/hooks";
import { getLocalizedPath } from "@/i18n/routes";

const Footer = () => {
  const { t } = useTranslation("common");
  const locale = useLocale();

  return (
    <footer className="bg-charcoal rounded-t-2xl sm:rounded-t-3xl mt-6 sm:mt-8">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        {/* Logo */}
        <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground tracking-tight leading-none text-center">
            ASSETRA
          </h2>
        </div>

        {/* Navigation Grid */}
        <AnimatedSection>
          <div className="border-t border-primary-foreground/10 pt-10 sm:pt-12 md:pt-16 pb-10 sm:pb-12 md:pb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
              {/* Sektory */}
              <div>
                <h4 className="text-[10px] sm:text-xs tracking-widest uppercase text-primary-foreground/40 mb-4 sm:mb-5">{t("footer.sectors")}</h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li><Link to={getLocalizedPath("realEstate", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.realEstate")}</Link></li>
                  <li><Link to={getLocalizedPath("acquisitions", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.acquisitions")}</Link></li>
                  <li><Link to={getLocalizedPath("loans", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.loans")}</Link></li>
                </ul>
              </div>

              {/* Pre Vás */}
              <div>
                <h4 className="text-[10px] sm:text-xs tracking-widest uppercase text-primary-foreground/40 mb-4 sm:mb-5">{t("footer.forYou")}</h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li><Link to={getLocalizedPath("sellCompany", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("footer.sellCompany")}</Link></li>
                  <li><Link to={getLocalizedPath("invest", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("footer.invest")}</Link></li>
                  <li><Link to={getLocalizedPath("propertyFinancing", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("footer.propertyFinancing")}</Link></li>
                  <li><Link to={getLocalizedPath("club", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.club")}</Link></li>
                </ul>
              </div>

              {/* Spoločnosť */}
              <div>
                <h4 className="text-[10px] sm:text-xs tracking-widest uppercase text-primary-foreground/40 mb-4 sm:mb-5">{t("footer.company")}</h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li><Link to={getLocalizedPath("portfolio", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.portfolio")}</Link></li>
                  <li><Link to={getLocalizedPath("forInvestors", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.forInvestors")}</Link></li>
                  <li><Link to={getLocalizedPath("careers", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.careers")}</Link></li>
                  <li><Link to={getLocalizedPath("assistantCeo", locale)} className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("footer.assistantCeo")}</Link></li>
                </ul>
              </div>

              {/* Kontakt */}
              <div>
                <h4 className="text-[10px] sm:text-xs tracking-widest uppercase text-primary-foreground/40 mb-4 sm:mb-5">{t("footer.contact")}</h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li>
                    <a href="mailto:info@assetrainvestments.com" className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors break-all">
                      info@assetrainvestments.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+421911860788" className="text-sm sm:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      +421 911 860 788
                    </a>
                  </li>
                  <li className="text-sm sm:text-base text-primary-foreground/50">
                    {t("footer.location")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection>
          <div className="border-t border-primary-foreground/10 pt-12 sm:pt-16 md:pt-20">
            <div className="flex flex-col gap-10 sm:gap-12 md:grid md:grid-cols-2 md:gap-16 md:items-start">
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-4 sm:mb-6">
                  {t("footer.ctaHeading")}
                </h3>
                <p className="text-primary-foreground/50 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg">
                  {t("footer.ctaText")}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 md:items-end md:text-right">
                <Link
                  to={getLocalizedPath("invest", locale)}
                  className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-base sm:text-lg md:text-xl self-start md:self-auto"
                >
                  {t("footer.ctaButton")}
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom bar */}
        <div className="mt-16 sm:mt-20 md:mt-28 py-6 sm:py-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          <p className="text-[11px] sm:text-xs md:text-sm text-primary-foreground/30 text-center sm:text-left">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to={getLocalizedPath("privacy", locale)} className="text-[11px] sm:text-xs md:text-sm text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to={getLocalizedPath("terms", locale)} className="text-[11px] sm:text-xs md:text-sm text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
