import en from '../lang/en'
import de from '../lang/de'

export default {
  locales: ['en', 'de'],
  defaultLocale: 'en',
  strategy: 'no_prefix',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en,
      de,
    },
  },
}
