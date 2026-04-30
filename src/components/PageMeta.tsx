import { useEffect } from "react";
import { type RouteKey, type Locale, LOCALES, getLocalizedPath, getLocaleFromPath } from "@/i18n/routes";

interface PageMetaProps {
  title: string;
  description: string;
  routeKey?: RouteKey;
}

const BASE_URL = "https://assetrainvestments.com";

const hreflangMap: Record<string, string> = {
  sk: "sk",
  en: "en",
  cs: "cs",
};

const PageMeta = ({ title, description, routeKey }: PageMetaProps) => {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    // og:url + og:locale
    const ogLocaleMap: Record<Locale, string> = { sk: "sk_SK", en: "en_US", cs: "cs_CZ" };
    const currentLocale = getLocaleFromPath(window.location.pathname);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", BASE_URL + window.location.pathname);

    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement("meta");
      ogLocale.setAttribute("property", "og:locale");
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute("content", ogLocaleMap[currentLocale]);

    // canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", BASE_URL + window.location.pathname);

    // hreflang tags
    const existingHreflangs = document.querySelectorAll('link[data-hreflang]');
    existingHreflangs.forEach((el) => el.remove());

    if (routeKey) {
      LOCALES.forEach((locale) => {
        const link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = hreflangMap[locale];
        link.href = BASE_URL + getLocalizedPath(routeKey, locale);
        link.setAttribute("data-hreflang", "true");
        document.head.appendChild(link);
      });

      // x-default → SK
      const xDefault = document.createElement("link");
      xDefault.rel = "alternate";
      xDefault.hreflang = "x-default";
      xDefault.href = BASE_URL + getLocalizedPath(routeKey, "sk");
      xDefault.setAttribute("data-hreflang", "true");
      document.head.appendChild(xDefault);
    }

    return () => {
      const hreflangs = document.querySelectorAll('link[data-hreflang]');
      hreflangs.forEach((el) => el.remove());
    };
  }, [title, description, routeKey]);

  return null;
};

export default PageMeta;
