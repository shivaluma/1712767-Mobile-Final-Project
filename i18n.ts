import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLang from './utils/locales/en.json';
import viLang from './utils/locales/vi.json';
const resources = {
  vi: {
    translation: viLang,
  },
  en: {
    translation: enLang,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  cleanCode: true,
});

export default i18n;
