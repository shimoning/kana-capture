import { setupObserver, KanaType, CaptureableCharacterType } from './observer.ts'

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
    realtime: timingRealtime,
    enter: timingEnter,
    clearOnInputEmpty: true,
    captureablePatterns: [
      CaptureableCharacterType.HIRAGANA,
      CaptureableCharacterType.KUTOUTEN,
      CaptureableCharacterType.CHOUON,
      CaptureableCharacterType.KAGIKAKKO,
    ],
  },
)
