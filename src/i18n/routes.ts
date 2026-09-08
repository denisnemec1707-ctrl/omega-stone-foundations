export type Locale = 'sk' | 'en' | 'cs';
export const DEFAULT_LOCALE: Locale = 'sk';
export const LOCALES: Locale[] = ['sk', 'en', 'cs'];

export type RouteKey =
  | 'home'
  | 'realEstate'
  | 'acquisitions'
  | 'loans'
  | 'forInvestors'
  | 'portfolio'
  | 'careers'
  | 'assistantCeo'
  | 'sellCompany'
  | 'invest'
  | 'propertyFinancing'
  | 'club'
  | 'partners'
  | 'privacy'
  | 'terms';

export const ROUTE_SLUGS: Record<RouteKey, Record<Locale, string>> = {
  home:               { sk: '/',                           en: '/en',                         cs: '/cs' },
  realEstate:         { sk: '/nehnutelnosti',              en: '/en/real-estate',              cs: '/cs/nemovitosti' },
  acquisitions:       { sk: '/akvizicie',                  en: '/en/acquisitions',             cs: '/cs/akvizice' },
  loans:              { sk: '/uvery',                      en: '/en/loans',                    cs: '/cs/uvery' },
  forInvestors:       { sk: '/pre-investorov',             en: '/en/for-investors',            cs: '/cs/pro-investory' },
  portfolio:          { sk: '/projekty',                   en: '/en/portfolio',                cs: '/cs/portfolio' },
  careers:            { sk: '/kariera',                    en: '/en/careers',                  cs: '/cs/kariera' },
  assistantCeo:       { sk: '/kariera/asistent-ceo',       en: '/en/careers/ceo-assistant',    cs: '/cs/kariera/asistent-ceo' },
  sellCompany:        { sk: '/predam-firmu',               en: '/en/sell-your-company',        cs: '/cs/prodam-firmu' },
  invest:             { sk: '/investovat',                 en: '/en/invest',                   cs: '/cs/investovat' },
  propertyFinancing:  { sk: '/financovanie-nehnutelnosti', en: '/en/property-financing',       cs: '/cs/financovani-nemovitosti' },
  club:               { sk: '/klub',                       en: '/en/club',                     cs: '/cs/klub' },
  partners:           { sk: '/partneri',                   en: '/en/partners',                 cs: '/cs/partneri' },
  privacy:            { sk: '/ochrana-udajov',              en: '/en/privacy-policy',           cs: '/cs/ochrana-udaju' },
  terms:              { sk: '/obchodne-podmienky',         en: '/en/terms',                    cs: '/cs/obchodni-podminky' },
};

// Fast-load routes that bypass Preloader + PageTransition for LCP
export const FAST_LOAD_ROUTE_KEYS: RouteKey[] = [
  'sellCompany',
  'invest',
  'propertyFinancing',
  'assistantCeo',
  'club',
  'partners',
];

/** Get locale from URL pathname */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
  if (pathname.startsWith('/cs/') || pathname === '/cs') return 'cs';
  return 'sk';
}

/** Get route key from any localized pathname */
export function getRouteKey(pathname: string): RouteKey | null {
  const normalized = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;

  for (const [key, slugs] of Object.entries(ROUTE_SLUGS)) {
    for (const slug of Object.values(slugs)) {
      if (normalized === slug) return key as RouteKey;
    }
  }
  return null;
}

/** Get localized path for a route key in a specific locale */
export function getLocalizedPath(key: RouteKey, locale: Locale): string {
  return ROUTE_SLUGS[key][locale];
}

/** Switch current path to another locale */
export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  const routeKey = getRouteKey(currentPath);
  if (!routeKey) {
    // Fallback: redirect to home in target locale
    return getLocalizedPath('home', targetLocale);
  }
  return getLocalizedPath(routeKey, targetLocale);
}

/** Check if a pathname is a fast-load route (any locale) */
export function isFastLoadPath(pathname: string): boolean {
  const routeKey = getRouteKey(pathname);
  return routeKey !== null && FAST_LOAD_ROUTE_KEYS.includes(routeKey);
}

/** Get the slug part (without locale prefix) for React Router route definitions */
export function getRouteSlug(key: RouteKey, locale: Locale): string {
  const fullPath = ROUTE_SLUGS[key][locale];
  if (locale === 'sk') return fullPath;
  // Remove the /en or /cs prefix
  const prefix = `/${locale}`;
  if (fullPath === prefix) return '/'; // home route
  return fullPath.slice(prefix.length);
}
