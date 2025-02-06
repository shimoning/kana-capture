import { setupObserver, KanaType, CaptureableCharacterType } from './index.ts'

const outputHiragana = document.querySelector<HTMLInputElement>(
  '#output-hiragana1',
)!
const outputZenkakuKatakana = document.querySelector<HTMLInputElement>(
  '#output-zenkaku-katakana',
)!
const outputHankakuKatakana = document.querySelector<HTMLInputElement>(
  '#output-hankaku-katakana',
)!

const timingRealtime =
  document.querySelector<HTMLInputElement>('#timing-realtime')!
const timingEnter = document.querySelector<HTMLInputElement>('#timing-enter')!

setupObserver(
  '#input',
  [
    outputHiragana,
    '#output-hiragana2',
    '.output-hiragana',
    { element: outputZenkakuKatakana, type: KanaType.ZenkakuKatakana },
    { element: outputHankakuKatakana, type: KanaType.HankakuKatakana },
  ],
  {
    observeInterval: 30,
    debug: false,
    // realtime: timingRealtime,
    // enter: timingEnter,
    enter: true,
    clearOnInputEmpty: true,
    captureablePatterns: [
      CaptureableCharacterType.HIRAGANA,
      CaptureableCharacterType.KUTOUTEN,
      CaptureableCharacterType.CHOUON,
      CaptureableCharacterType.KAGIKAKKO,
      CaptureableCharacterType.ZENKAKU_SPACE,

      // 全角英数字記号
      CaptureableCharacterType.ZENKAKU_ALPHABET,
      CaptureableCharacterType.ZENKAKU_NUMBER,
      CaptureableCharacterType.ZENKAKU_1BYTE_SYMBOL,

      // 半角英数字記号 + 半角スペース
      CaptureableCharacterType.HANKAKU_SPACE,
      CaptureableCharacterType.HANKAKU_ALPHABET,
      CaptureableCharacterType.HANKAKU_NUMBER,
      CaptureableCharacterType.HANKAKU_1BYTE_SYMBOL,
    ],
  },
)
