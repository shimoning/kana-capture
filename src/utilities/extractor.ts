/**
 * Extractable
 */
export type CapturableCharacterPattern = string | RegExp | CapturableCharacterType;

export enum CapturableCharacterType {
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

export const CapturableCharacterMap: Record<CapturableCharacterType, RegExp> = {
  [CapturableCharacterType.HIRAGANA]: /[ぁ-ん]/g,
  [CapturableCharacterType.KUTOUTEN]: /[、。]/g,
  [CapturableCharacterType.CHOUON]: /[ー]/g,
  [CapturableCharacterType.KAGIKAKKO]: /[「」]/g,
  /* eslint-disable-next-line no-irregular-whitespace */
  [CapturableCharacterType.ZENKAKU_SPACE]: /[　]/g,
  [CapturableCharacterType.HANKAKU_SPACE]: /[ ]/g,
  [CapturableCharacterType.ZENKAKU_ALPHABET]: /[Ａ-Ｚａ-ｚ]/g,
  [CapturableCharacterType.HANKAKU_ALPHABET]: /[A-Za-z]/g,
  [CapturableCharacterType.ZENKAKU_NUMBER]: /[０-９]/g,
  [CapturableCharacterType.HANKAKU_NUMBER]: /[0-9]/g,
  [CapturableCharacterType.ZENKAKU_1BYTE_SYMBOL]: /[！＂”＃＄％＆＇’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿｀“｛｜｝～]/g,
  [CapturableCharacterType.HANKAKU_1BYTE_SYMBOL]: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g,
}

export type ExtractorInput = {
  input: string;
  patterns?: CapturableCharacterPattern | CapturableCharacterPattern[];
}
export function extractor({
  input,
  patterns = CapturableCharacterType.HIRAGANA,
}: ExtractorInput): string {
  const regExp = patterns instanceof RegExp
    ? patterns
    : generateCapturableRegExp(patterns)
  const filter = input.replace(regExp, '')
  if (filter.length === 0) {
    return input
  }
  return input.replace(
    new RegExp('[' + filter + ']', 'g'),
    '',
  )
}

export function generateCapturableRegExp(
  patterns: CapturableCharacterPattern | CapturableCharacterPattern[],
): RegExp {
  const sources: string[] = []
  const _patternParser = (pattern: CapturableCharacterPattern) => {
    if (typeof pattern === 'string') {
      sources.push('[' + pattern + ']')
    } else if (pattern instanceof RegExp) {
      sources.push(pattern.source)
    } else {
      sources.push(CapturableCharacterMap[pattern].source)
    }
  }

  if (Array.isArray(patterns)) {
    for (const pattern of patterns) {
      _patternParser(pattern)
    }
  } else {
    _patternParser(patterns)
  }
  return new RegExp(sources.join('|'), 'g')
}
