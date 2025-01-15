import { setupObserver } from './observer.ts'
import { KanaType } from './utilities/kanaConverter.ts'

const input = document.querySelector<HTMLInputElement>('#input')!

const outputHiragana = document.querySelector<HTMLInputElement>(
  '#output-hiragana'
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
  input,
  [
    { element: outputHiragana, type: KanaType.Hiragana },
    { element: outputZenkakuKatakana, type: KanaType.ZenkakuKatakana },
    { element: outputHankakuKatakana, type: KanaType.HankakuKatakana },
  ],
  {
    observeInterval: 30,
    debug: false,
    realtime: timingRealtime,
    enter: timingEnter,
    clearOnInputEmpty: true,
  },
)
