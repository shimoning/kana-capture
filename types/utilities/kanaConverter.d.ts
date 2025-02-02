export declare enum KanaType {
    Hiragana = 0,
    ZenkakuKatakana = 1,
    HankakuKatakana = 2
}
export declare function kanaConverter(type: KanaType, strings: string): string;
