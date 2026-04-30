import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import PageMeta from "@/components/PageMeta";
import { useLocale, useSwitchLocale } from "@/i18n/hooks";
import { getLocalizedPath, LOCALES, type Locale } from "@/i18n/routes";
import { cn } from "@/lib/utils";

export const PHONE_DISPLAY = "+421 911 860 788";
export const PHONE_TEL = "+421911860788";
export const EMAIL = "info@assetrainvestments.com";

const localeLabels: Record<Locale, string> = { sk: "SK", en: "EN", cs: "CZ" };

type LandingLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export const LandingLayout = ({
  children,
  title,
  description,
}: LandingLayoutProps) => {
  const { t } = useTranslation("common");
  const locale = useLocale();
  const switchLocale = useSwitchLocale();

  return (
    <>
      <PageMeta title={title} description={description} />

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link
              to={getLocalizedPath("home", locale)}
              aria-label={t("landing.backToMain")}
              className="font-serif text-xl sm:text-2xl tracking-tight text-foreground hover:text-primary transition-colors"
            >
              ASSETRA
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Mini Language Switcher */}
              <div className="flex items-center gap-1">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={cn(
                      "text-[10px] sm:text-xs tracking-wider px-1.5 py-0.5 rounded transition-colors",
                      locale === loc
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {localeLabels[loc]}
                  </button>
                ))}
              </div>
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2 text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
                <span className="sm:hidden">{t("landing.call")}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/40">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-xs sm:text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="font-medium text-foreground">
                ASSETRA Investments
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="hover:text-primary transition-colors"
              >
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="hover:text-primary transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                to={getLocalizedPath("privacy", locale)}
                className="hover:text-primary transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                to={getLocalizedPath("terms", locale)}
                className="hover:text-primary transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <span>© 2026 ASSETRA Investments</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
