import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// SK
import skCommon from './locales/sk/common.json';
import skIndex from './locales/sk/index.json';
import skRealEstate from './locales/sk/realEstate.json';
import skPrivateEquity from './locales/sk/privateEquity.json';
import skPrivateCredit from './locales/sk/privateCredit.json';
import skForInvestors from './locales/sk/forInvestors.json';
import skPortfolio from './locales/sk/portfolio.json';
import skCareers from './locales/sk/careers.json';
import skAssistantCeo from './locales/sk/assistantCeo.json';
import skPredamFirmu from './locales/sk/predamFirmu.json';
import skInvestovat from './locales/sk/investovat.json';
import skFinancovanie from './locales/sk/financovanie.json';
import skKlub from './locales/sk/klub.json';
import skPartneri from './locales/sk/partneri.json';
import skPrivacy from './locales/sk/privacy.json';
import skTerms from './locales/sk/terms.json';
import skValidation from './locales/sk/validation.json';

// EN
import enCommon from './locales/en/common.json';
import enIndex from './locales/en/index.json';
import enRealEstate from './locales/en/realEstate.json';
import enPrivateEquity from './locales/en/privateEquity.json';
import enPrivateCredit from './locales/en/privateCredit.json';
import enForInvestors from './locales/en/forInvestors.json';
import enPortfolio from './locales/en/portfolio.json';
import enCareers from './locales/en/careers.json';
import enAssistantCeo from './locales/en/assistantCeo.json';
import enPredamFirmu from './locales/en/predamFirmu.json';
import enInvestovat from './locales/en/investovat.json';
import enFinancovanie from './locales/en/financovanie.json';
import enKlub from './locales/en/klub.json';
import enPartneri from './locales/en/partneri.json';
import enPrivacy from './locales/en/privacy.json';
import enTerms from './locales/en/terms.json';
import enValidation from './locales/en/validation.json';

// CS
import csCommon from './locales/cs/common.json';
import csIndex from './locales/cs/index.json';
import csRealEstate from './locales/cs/realEstate.json';
import csPrivateEquity from './locales/cs/privateEquity.json';
import csPrivateCredit from './locales/cs/privateCredit.json';
import csForInvestors from './locales/cs/forInvestors.json';
import csPortfolio from './locales/cs/portfolio.json';
import csCareers from './locales/cs/careers.json';
import csAssistantCeo from './locales/cs/assistantCeo.json';
import csPredamFirmu from './locales/cs/predamFirmu.json';
import csInvestovat from './locales/cs/investovat.json';
import csFinancovanie from './locales/cs/financovanie.json';
import csKlub from './locales/cs/klub.json';
import csPartneri from './locales/cs/partneri.json';
import csPrivacy from './locales/cs/privacy.json';
import csTerms from './locales/cs/terms.json';
import csValidation from './locales/cs/validation.json';

const ns = (
  common: object,
  index: object,
  realEstate: object,
  privateEquity: object,
  privateCredit: object,
  forInvestors: object,
  portfolio: object,
  careers: object,
  assistantCeo: object,
  predamFirmu: object,
  investovat: object,
  financovanie: object,
  klub: object,
  partneri: object,
  privacy: object,
  terms: object,
  validation: object,
) => ({
  common, index, realEstate, privateEquity, privateCredit,
  forInvestors, portfolio, careers, assistantCeo, predamFirmu,
  investovat, financovanie, klub, partneri, privacy, terms, validation,
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sk: ns(skCommon, skIndex, skRealEstate, skPrivateEquity, skPrivateCredit, skForInvestors, skPortfolio, skCareers, skAssistantCeo, skPredamFirmu, skInvestovat, skFinancovanie, skKlub, skPartneri, skPrivacy, skTerms, skValidation),
      en: ns(enCommon, enIndex, enRealEstate, enPrivateEquity, enPrivateCredit, enForInvestors, enPortfolio, enCareers, enAssistantCeo, enPredamFirmu, enInvestovat, enFinancovanie, enKlub, enPartneri, enPrivacy, enTerms, enValidation),
      cs: ns(csCommon, csIndex, csRealEstate, csPrivateEquity, csPrivateCredit, csForInvestors, csPortfolio, csCareers, csAssistantCeo, csPredamFirmu, csInvestovat, csFinancovanie, csKlub, csPartneri, csPrivacy, csTerms, csValidation),
    },
    defaultNS: 'common',
    fallbackLng: 'sk',
    interpolation: { escapeValue: false },
    detection: {
      order: ['path', 'cookie'],
      lookupFromPathIndex: 0,
      lookupCookie: 'locale',
      caches: ['cookie'],
      cookieOptions: { path: '/', sameSite: 'lax' },
    },
  });

export default i18n;
