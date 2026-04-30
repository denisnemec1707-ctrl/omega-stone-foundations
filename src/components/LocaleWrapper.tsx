import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/i18n/routes";

interface LocaleWrapperProps {
  locale: Locale;
}

const LocaleWrapper = ({ locale }: LocaleWrapperProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale === 'cs' ? 'cs' : locale === 'en' ? 'en' : 'sk';
  }, [locale, i18n]);

  return <Outlet />;
};

export default LocaleWrapper;
