import { isHiraganaCharCode } from './isHiraganaCharCode'
import { katakanaMap } from '../map/kana/hiragana2hankakuKatakana'

export enum KanaType {
  Hiragana,
  ZenkakuKatakana,
  HankakuKatakana,
}

export function kanaConverter(type: KanaType, strings: string): string {
  let resultStrings = ''
  for (let i = 0; i < strings.length; i++) {
    const char = strings.charCodeAt(i)
    if (isHiraganaCharCode(char)) {
      if (type === KanaType.Hiragana) {
        resultStrings += strings[i]
      } else if (type === KanaType.ZenkakuKatakana) {
        resultStrings += String.fromCharCode(char + 96)
      } else if (type === KanaType.HankakuKatakana) {
        const string = strings[i]
        if (typeof katakanaMap[string] === 'string') {
          resultStrings += katakanaMap[string]
        }
      }
    }
  }
  return resultStrings
}
