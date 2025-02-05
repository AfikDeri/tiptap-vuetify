import en from './en'
import ru from './ru'
import es from './es'
import pl from './pl'
import fr from './fr'
import uk from './uk'
import ptbr from './ptbr'
import tr from './tr'
import ConsoleLogger from '~/logging/ConsoleLogger'
import { TiptapVuetifyPlugin } from '~/main'

export const defaultLanguage = 'en'
export const dictionary = {
  en,
  ru,
  es,
  pl,
  fr,
  uk,
  ptbr,
  tr
}

export function getCurrentLang () {
  return TiptapVuetifyPlugin.vuetifyLang || defaultLanguage
}

export function getMsg (path: string, args?): string {
  let currentLang = getCurrentLang()

  if (!dictionary[currentLang]) {
    currentLang = defaultLanguage

    ConsoleLogger.warn(`The current language "${currentLang}" is not yet available. Using language "${defaultLanguage}" by default. Contribution to github is welcome.`)
  }

  const dictionaryByLang = dictionary[currentLang]
  const target = path.split('.').reduce((prev: string, curr: string) => {
    return prev[curr]
  }, dictionaryByLang)

  if (target instanceof Function) {
    return target(args)
  }

  return target
}
