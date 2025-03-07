import { setupObserver, KanaType, CapturableCharacterType } from './index.ts'

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
    event: true,
    realtime: timingRealtime,
    enter: timingEnter,
    // enter: true,
    clearOnInputEmpty: true,
    capturablePatterns: [
      CapturableCharacterType.HIRAGANA,
      CapturableCharacterType.KUTOUTEN,
      CapturableCharacterType.CHOUON,
      CapturableCharacterType.KAGIKAKKO,
      CapturableCharacterType.ZENKAKU_SPACE,

      // 全角英数字記号
      CapturableCharacterType.ZENKAKU_ALPHABET,
      CapturableCharacterType.ZENKAKU_NUMBER,
      CapturableCharacterType.ZENKAKU_1BYTE_SYMBOL,

      // 半角英数字記号 + 半角スペース
      CapturableCharacterType.HANKAKU_SPACE,
      CapturableCharacterType.HANKAKU_ALPHABET,
      CapturableCharacterType.HANKAKU_NUMBER,
      CapturableCharacterType.HANKAKU_1BYTE_SYMBOL,
    ],
  },
)

document.getElementById('input')!.focus()
