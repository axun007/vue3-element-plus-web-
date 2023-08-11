import { createI18n } from "vue-i18n";
import enLocale from './en'
import cnLocale from './cn'

const messages = {
  en: {
    ...enLocale
  },
  cn: {
    ...cnLocale
  }
}
const language = (navigator.language || 'en').toLocaleLowerCase()
const langType = localStorage.getItem('lang') || language.split('-')[0] || 'en'
console.log(langType)
const i18n = createI18n({
  // fallbackLocale: 'ch',
  globalInjection: true,
  legacy: false,
  // locale: language.split("-")[0] || 'zh',
  // messages
  locale: langType, // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'en', // 设置备用语言
  messages,
})

export default i18n