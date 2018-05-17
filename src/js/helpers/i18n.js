import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export function getUserLanguage() {
  const NAV = navigator;
  let userLanguage = NAV.languages ? NAV.languages[0] : (NAV.language || NAV.userLanguage);

  if (!(userLanguage === 'ru')) {
    userLanguage = 'en';
  }

  return userLanguage;
}

const lang = getUserLanguage();

i18n.use(XHR).use(LanguageDetector).init({
  lng: lang,
  defaultNS: 'common',
  ns: 'common',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
});

export default i18n;
