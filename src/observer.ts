import { diff } from './utilities/diff'
import {
  CaptureableCharacterPattern,
  CaptureableCharacterType,
  generateCaptureableRegExp,
  extractor,
} from './utilities/extractor'
import { kanaConverter, KanaType } from './utilities/kanaConverter'
export { KanaType, CaptureableCharacterType }
export type { CaptureableCharacterPattern }

export type Options = {
  observeInterval?: number; // unit: ms
  debug?: boolean; // logging if true
  realtime?: boolean | HTMLInputElement;
  enter?: boolean | HTMLInputElement;
  clearOnInputEmpty?: boolean;
  captureablePatterns?: CaptureableCharacterPattern | CaptureableCharacterPattern[];
};

// TODO: support other elements (e.g. HTMLDivElement, HTMLSpanElement, HTMLTextAreaElement)
export type OutputElement = Output | HTMLInputElement | string;
export type Output = {
  element: HTMLInputElement;
  type?: KanaType;
};
export enum OutputTiming {
  REALTIME, // default and priority
  ENTER,
}

export function setupObserver(
  input: HTMLInputElement | string, // TODO: support textarea (HTMLTextAreaElement)
  outputs: OutputElement | OutputElement[],
  options: Options = {
    observeInterval: 30,
    debug: false,
    realtime: true,
    enter: false,
    clearOnInputEmpty: false,
    captureablePatterns: CaptureableCharacterType.HIRAGANA,
  },
) {
  // 入力値を受け付けるパターン
  const captureablePatterns = generateCaptureableRegExp(
    options.captureablePatterns ?? CaptureableCharacterType.HIRAGANA,
  )

  // 入力元を整える
  const inputElement = typeof input === 'string'
    ? document.querySelector<HTMLInputElement>(input)
    : input
  if (!inputElement) {
    throw new Error('input element not found')
  }

  // 出力のタイミング
  let outputTiming = OutputTiming.REALTIME
  function _checkOutputTiming() {
    const realtime =
      options.realtime &&
      (options.realtime === true ||
        (options.realtime instanceof HTMLInputElement && options.realtime.checked))
    const enter =
      options.enter &&
      (options.enter === true ||
        (options.enter instanceof HTMLInputElement && options.enter.checked))
    outputTiming = realtime || !enter
      ? OutputTiming.REALTIME // realtime=true, realtime=false & enter=false
      : OutputTiming.ENTER  // realtime=false & enter=true
  }

  // 出力先を整える
  const activeOutputs: Required<Output>[] = []
  const _outputParser = (output: OutputElement): void => {
    if (typeof output === 'string') {
      const elements = document.querySelectorAll<HTMLInputElement>(output)
      for (const element of elements) {
        activeOutputs.push({ element, type: KanaType.Hiragana })
      }
    } else if (output instanceof HTMLInputElement) {
      activeOutputs.push({ element: output, type: KanaType.Hiragana })
    } else {
      activeOutputs.push({
        element: output.element,
        type: output.type ?? KanaType.Hiragana,
      })
    }
  }
  if (Array.isArray(outputs)) {
    for (const output of outputs) {
      _outputParser(output)
    }
  } else {
    _outputParser(outputs)
  }

  // 状態管理
  let observing: boolean = false
  let defaultString: string = ''
  let currentString: string = ''

  let inputValue: string = ''
  const outputValues: string[] = new Array(activeOutputs.length).fill('')
  /**
   * 初期化
   * @returns void
   */
  function _reset() {
    _debug('reset')
    defaultString = ''
    currentString = ''

    inputValue = ''
    for (let i = 0; i < activeOutputs.length; i++) {
      outputValues[i] = ''
    }
  }
  /**
   * 初期入力値を保存する
   * @returns void
   */
  function _setup() {
    defaultString = inputElement!.value
    activeOutputs.forEach(({ element }, index) => {
      outputValues[index] = element.value
    })
    _debug('setup', inputElement!.value, { defaultString, activeOutputs })
  }

  let timer: number | undefined
  /**
   * 監視を開始する
   * @returns void
   */
  function _start() {
    _debug('start', { timer })
    if (timer) {
      return
    }
    timer = setInterval(() => {
      _checkOutputTiming()
      _observe()
    }, options.observeInterval ?? 30)
  }
  /**
   * 監視を終了する
   * @returns void
   */
  function _end() {
    _debug('end', { timer })
    if (timer) {
      clearInterval(timer)
      timer = undefined
    }
  }

  /**
   * 入力を監視する
   * @return void
   */
  function _observe() {
    const inputString = inputElement!.value
    _debug('observe', { observing, inputString, defaultString, currentString, outputValues })

    // 空文字の場合は何もしない
    if (inputString === '') {
      return
    }

    // すでに入力されている文字を取り除く
    const diffResult = diff(defaultString, inputString)

    // 同じだったら何もしない
    if (currentString === diffResult.diff) {
      return
    }
    currentString = diffResult.diff

    // 変換完了している場合は何もしない
    if (!observing) {
      return
    }

    // セットする
    _set(currentString)
  }

  /**
   * セットする
   * @param string
   */
  function _set(string: string) {
    _debug('set', { defaultString, string, inputValue, outputValues })
    const extracted = extractor({
      input: string,
      patterns: captureablePatterns,
    })
    if (extracted.length === string.length) {
      inputValue = extracted
    }

    activeOutputs.forEach(({ element, type }, index) => {
      const converted = kanaConverter(type, inputValue)
      _debug('converted', { type, string, inputValue, after: converted, before: outputValues[index] })
      if (outputTiming === OutputTiming.REALTIME) {
        element.value = outputValues[index] + converted
      } else if (outputTiming === OutputTiming.ENTER) {
        element.dataset['kana'] = outputValues[index] = converted
      }
    })
  }

  /**
   * 反映する
   * @returns void
   */
  function _reflect() {
    activeOutputs.forEach(({ element }) => {
      if (element.dataset['kana']) {
        element.value += element.dataset['kana']
        element.removeAttribute('data-kana')
      }
    })
  }

  /**
   * デバッグログ
   * @param message
   * @param args
   * @return void
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _debug(message: string, ...args: any[]) {
    if (!options.debug) {
      return
    }
    if (args.length === 0) {
      console.info('debug', { message })
      return
    }
    console.info('debug', { message }, ...args)
  }

  /**
   * Event listeners
   */
  inputElement.addEventListener('focus', () => {
    _debug('focus')
    _setup()
  })
  inputElement.addEventListener('blur', () => {
    _debug('blur')
    _end()
  })
  inputElement.addEventListener('compositionstart', (e: CompositionEvent) => {
    _debug('compositionstart', { e })
    _setup()
    _start()
    observing = true
  })
  inputElement.addEventListener('compositionend', (e: CompositionEvent) => {
    _debug('compositionend', { e })
    _end()
    _set(inputValue)
    _reset()
    observing = false
  })
  inputElement.addEventListener('keydown', (e: KeyboardEvent) => {
    _debug('keydown', { observing, e })
  })
  inputElement.addEventListener('keyup', (e: KeyboardEvent) => {
    _debug('keyup', { observing, e })

    if (e.code === 'Enter') {
      if (options.clearOnInputEmpty && inputElement.value === '') {
        _reset()
        _set('')
      } else {
        if (outputTiming === OutputTiming.ENTER) {
          _reflect()
        }
      }
    } else if (!observing) {
      const candidate = inputElement.value.slice(-1)
      const extracted = extractor({
        input: candidate,
        patterns: captureablePatterns,
      })
      if (candidate === extracted) {
        _setup()
        _set(candidate)
      }
    }
  })
}
