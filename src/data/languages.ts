import deContent from './content/de.json'
import enContent from './content/en.json'
import frContent from './content/fr.json'
import ltContent from './content/lt.json'
import plContent from './content/pl.json'
import ruContent from './content/ru.json'
import yiContent from './content/yi.json'

export const languageCodes = ['lt', 'en', 'yi', 'de', 'fr', 'pl', 'ru'] as const
export const defaultLanguage = 'lt'

export type Language = (typeof languageCodes)[number]

export interface AudioContent {
  label: string
  duration: string
  src: string
}

export interface TextBlock {
  title: string
  body: string
}

export interface PoemContent {
  label: string
  text: string
}

export interface SiteContent {
  lang: Language
  'lang-label': string
  'lang-label-full': string
  title: string
  subtitle: string
  audio: AudioContent | null
  fragment: string
  fragmentAuthor: string
  fullPoem: PoemContent
  aboutSculpture: TextBlock
  aboutSculptor: TextBlock
  aboutPoet: TextBlock
  speech: TextBlock
  credits: string[]
  funding: string
}

export const contentByLanguage: Record<Language, SiteContent> = {
  lt: ltContent as SiteContent,
  en: enContent as SiteContent,
  yi: yiContent as SiteContent,
  de: deContent as SiteContent,
  fr: frContent as SiteContent,
  pl: plContent as SiteContent,
  ru: ruContent as SiteContent,
}

export const translatedLanguages = languageCodes.filter(
  (language): language is Exclude<Language, typeof defaultLanguage> => language !== defaultLanguage,
)

export function getPagePath(language: Language): string {
  return language === defaultLanguage ? '/' : `/${language}/`
}

export function getPoemPath(language: Language): string {
  return language === defaultLanguage ? '/poem/' : `/${language}/poem/`
}

export function getTextDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'yi' ? 'rtl' : 'ltr'
}
