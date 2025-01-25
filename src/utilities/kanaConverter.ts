import { isHiraganaCharCode } from './isHiraganaCharCode'
import { toKatakanaCharCode } from './toKatakanaCharCode'
import { katakanaMap } from '../maps/kana/hiragana2hankakuKatakana'

export enum KanaType {
  Hiragana,
  ZenkakuKatakana,
  HankakuKatakana,
}

export function kanaConverter(type: KanaType, strings: string): string {
  let convertedStrings = ''
  for (let i = 0; i < strings.length; i++) {
    const string = strings[i]
    if (type === KanaType.Hiragana) {
      convertedStrings += string
    } else if (type === KanaType.ZenkakuKatakana) {
      const char = strings.charCodeAt(i)
      if (isHiraganaCharCode(char)) {
        convertedStrings += String.fromCharCode(toKatakanaCharCode(char))
      } else {
        convertedStrings += string
      }
    } else if (type === KanaType.HankakuKatakana) {
      if (typeof katakanaMap[string] === 'string') {
        convertedStrings += katakanaMap[string]
      } else {
        convertedStrings += string
      }
    }
  }
  return convertedStrings
}
