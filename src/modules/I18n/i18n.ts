import enCommon from '@/modules/I18n/Translations/en/common.json'
import enFooter from '@/modules/I18n/Translations/en/footer.json'
import enHeader from '@/modules/I18n/Translations/en/header.json'
import enHomePage from '@/modules/I18n/Translations/en/homepage.json'
import hiCommon from '@/modules/I18n/Translations/hi/common.json'
import hiFooter from '@/modules/I18n/Translations/hi/footer.json'
import hiHeader from '@/modules/I18n/Translations/hi/header.json'
import hiHomePage from '@/modules/I18n/Translations/hi/homepage.json'
import mlCommon from '@/modules/I18n/Translations/ml/common.json'
import mlFooter from '@/modules/I18n/Translations/ml/footer.json'
import mlHeader from '@/modules/I18n/Translations/ml/header.json'
import mlHomePage from '@/modules/I18n/Translations/ml/homepage.json'
import mrCommon from '@/modules/I18n/Translations/mr/common.json'
import mrFooter from '@/modules/I18n/Translations/mr/footer.json'
import mrHeader from '@/modules/I18n/Translations/mr/header.json'
import mrHomePage from '@/modules/I18n/Translations/mr/homepage.json'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        common: enCommon,
        header: enHeader,
        footer: enFooter,
        homePage: enHomePage,
      },
      hi: {
        common: hiCommon,
        header: hiHeader,
        footer: hiFooter,
        homePage: hiHomePage,
      },
      mr: {
        common: mrCommon,
        header: mrHeader,
        footer: mrFooter,
        homePage: mrHomePage,
      },
      ml: {
        common: mlCommon,
        header: mlHeader,
        footer: mlFooter,
        homePage: mlHomePage,
      },
    },
    ns: ['header', 'footer', 'common', 'homePage'],
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    defaultNS: 'common',
  })

export default i18n
