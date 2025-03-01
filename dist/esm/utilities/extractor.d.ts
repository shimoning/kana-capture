/**
 * Extractable
 */
export type CapturableCharacterPattern = string | RegExp | CapturableCharacterType;
export declare enum CapturableCharacterType {
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
export declare const CapturableCharacterMap: Record<CapturableCharacterType, RegExp>;
export type ExtractorInput = {
    input: string;
    patterns?: CapturableCharacterPattern | CapturableCharacterPattern[];
};
export declare function extractor({ input, patterns, }: ExtractorInput): string;
export declare function generateCapturableRegExp(patterns: CapturableCharacterPattern | CapturableCharacterPattern[]): RegExp;
