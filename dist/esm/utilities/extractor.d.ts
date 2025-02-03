/**
 * Extractable
 */
export type CaptureableCharacterPattern = string | RegExp | CaptureableCharacterType;
export declare enum CaptureableCharacterType {
    HIRAGANA = 0,
    KUTOUTEN = 1,
    CHOUON = 2,
    KAGIKAKKO = 3,
    ZENKAKU_SPACE = 4,
    HANKAKU_SPACE = 5,
    ZENKAKU_ALPHABET = 6,
    HANKAKU_ALPHABET = 7,
    ZENKAKU_NUMBER = 8,
    HANKAKU_NUMBER = 9,
    ZENKAKU_1BYTE_SYMBOL = 10,
    HANKAKU_1BYTE_SYMBOL = 11
}
export declare const CaptureableCharacterMap: Record<CaptureableCharacterType, RegExp>;
export type ExtractorInput = {
    input: string;
    patterns?: CaptureableCharacterPattern | CaptureableCharacterPattern[];
};
export declare function extractor({ input, patterns, }: ExtractorInput): string;
export declare function generateCaptureableRegExp(patterns: CaptureableCharacterPattern | CaptureableCharacterPattern[]): RegExp;
