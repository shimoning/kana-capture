/**
 * Extractable
 */
export type CaptureableCharacterPattern = string | RegExp | CaptureableCharacterType;

export enum CaptureableCharacterType {
  HIRAGANA,
  KUTOUTEN,
  CHOUON,
  KAGIKAKKO,
  ZENKAKU_SPACE,
  HANKAKU_SPACE,
  ZENKAKU_ALPHABET,
  HANKAKU_ALPHABET,
  ZENKAKU_NUMBER,
  HANKAKU_NUMBER,
  ZENKAKU_1BYTE_SYMBOL,
  HANKAKU_1BYTE_SYMBOL,
}

export const CaptureableCharacterMap: Record<CaptureableCharacterType, RegExp> = {
  [CaptureableCharacterType.HIRAGANA]: /[ぁ-ん]/g,
  [CaptureableCharacterType.KUTOUTEN]: /[、。]/g,
  [CaptureableCharacterType.CHOUON]: /[ー]/g,
  [CaptureableCharacterType.KAGIKAKKO]: /[「」]/g,
  /* eslint-disable-next-line no-irregular-whitespace */
  [CaptureableCharacterType.ZENKAKU_SPACE]: /[　]/g,
  [CaptureableCharacterType.HANKAKU_SPACE]: /[ ]/g,
  [CaptureableCharacterType.ZENKAKU_ALPHABET]: /[Ａ-Ｚａ-ｚ]/g,
  [CaptureableCharacterType.HANKAKU_ALPHABET]: /[A-Za-z]/g,
  [CaptureableCharacterType.ZENKAKU_NUMBER]: /[０-９]/g,
  [CaptureableCharacterType.HANKAKU_NUMBER]: /[0-9]/g,
  [CaptureableCharacterType.ZENKAKU_1BYTE_SYMBOL]: /[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［￥］＾＿“｛｜｝～]/g,
  /* eslint-disable-next-line no-useless-escape*/
  [CaptureableCharacterType.HANKAKU_1BYTE_SYMBOL]: /[!"#$%&'()*+,-.\/:;<=>?@[\\]^_`{|}~]/g,
}

export type ExtractorInput = {
  input: string;
  patterns?: CaptureableCharacterPattern | CaptureableCharacterPattern[];
}
export function extractor({
  input,
  patterns = CaptureableCharacterType.HIRAGANA,
}: ExtractorInput): string {
  const sources: string[] = []
  const patternParser = (pattern: CaptureableCharacterPattern) => {
    if (typeof pattern === 'string') {
      sources.push('[' + pattern + ']')
    } else if (pattern instanceof RegExp) {
      sources.push(pattern.source)
    } else {
      sources.push(CaptureableCharacterMap[pattern].source)
    }
  }

  if (Array.isArray(patterns)) {
    for (const pattern of patterns) {
      patternParser(pattern)
    }
  } else {
    patternParser(patterns)
  }
  if (sources.length === 0) {
    return input
  }

  const regExp = new RegExp(sources.join('|'), 'g')
  const filter = input.replace(regExp, '')
  if (filter.length === 0) {
    return input
  }
  return input.replace(
    new RegExp('[' + filter + ']', 'g'),
    '',
  )
}
