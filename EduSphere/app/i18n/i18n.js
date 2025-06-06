import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';
import ko from './locales/ko.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'ko',
  fallbackLng: 'ko',
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ko: { translation: ko },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
