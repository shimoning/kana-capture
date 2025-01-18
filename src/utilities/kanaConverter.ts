import { isHiraganaCharCode } from './isHiraganaCharCode'
import { toKatakanaCharCode } from './toKatakanaCharCode'
import { katakanaMap } from '../map/kana/hiragana2hankakuKatakana'

export enum KanaType {
  Hiragana,
  ZenkakuKatakana,
  HankakuKatakana,
}

export function kanaConverter(type: KanaType, strings: string): string {
  let convertedStrings = ''
  for (let i = 0; i < strings.length; i++) {
    const char = strings.charCodeAt(i)
    if (!isHiraganaCharCode(char)) {
      convertedStrings += strings[i]
      continue
    }

    if (type === KanaType.Hiragana) {
      convertedStrings += strings[i]
    } else if (type === KanaType.ZenkakuKatakana) {
      convertedStrings += String.fromCharCode(toKatakanaCharCode(char))
    } else if (type === KanaType.HankakuKatakana) {
      const string = strings[i]
      if (typeof katakanaMap[string] === 'string') {
        convertedStrings += katakanaMap[string]
      }
    }
  }
  return convertedStrings
}
