import { katakanaMap } from '../map/kana/zenkaku2hankakuKatakana'
export function toHankakuKatakana(zenkakuKatakana: string): string {
  let _katakana = ''
  for (let i = 0; i < zenkakuKatakana.length; i++) {
    const string = zenkakuKatakana[i]
    if (typeof katakanaMap[string] === 'string') {
      _katakana += katakanaMap[string]
    }
  }
  return _katakana
}
