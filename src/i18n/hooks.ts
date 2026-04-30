import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import {
  type Locale,
  type RouteKey,
  DEFAULT_LOCALE,
  LOCALES,
  getLocaleFromPath,
  getLocalizedPath,
  switchLocalePath,
} from './routes';

/** Returns the current locale derived from the URL path */
export function useLocale(): Locale {
  const { pathname } = useLocation();
  return getLocaleFromPath(pathname);
}

/** Returns the localized path for a given route key in the current locale */
export function useLocalizedPath(key: RouteKey): string {
  const locale = useLocale();
  return getLocalizedPath(key, locale);
}

/** Returns a function to switch to another locale while staying on the same page */
export function useSwitchLocale() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  return useCallback(
    (targetLocale: Locale) => {
      const newPath = switchLocalePath(pathname, targetLocale);
      i18n.changeLanguage(targetLocale);
      document.cookie = `locale=${targetLocale};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
      navigate(newPath);
    },
    [navigate, pathname, i18n]
  );
}

/** Locale-aware currency formatter */
export function useFormatCurrency() {
  const locale = useLocale();

  const localeMap: Record<Locale, string> = {
    sk: 'sk-SK',
    cs: 'cs-CZ',
    en: 'en-US',
  };

  return useCallback(
    (value: number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(localeMap[locale], {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...options,
      }).format(value);
    },
    [locale]
  );
}

/** Locale-aware number formatter */
export function useFormatNumber() {
  const locale = useLocale();

  const localeMap: Record<Locale, string> = {
    sk: 'sk-SK',
    cs: 'cs-CZ',
    en: 'en-US',
  };

  return useCallback(
    (value: number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(localeMap[locale], options).format(value);
    },
    [locale]
  );
}
