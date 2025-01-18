// eslint-disable-next-line no-irregular-whitespace
export const AntiHiraganaPattern = /[^ 　ぁあ-んー]/g

export function extractHiragana(string: string): string {
  return string.replace(AntiHiraganaPattern, '')
}
