import { isHiraganaCharCode } from './isHiraganaCharCode'
export function containsHiragana(strings: string): boolean {
  for (let i = 0; i < strings.length; i++) {
    const char = strings.charCodeAt(i)
    if (isHiraganaCharCode(char)) {
      return true
    }
  }
  return false
}
