import { diff } from './utilities/diff'
import {
  CapturableCharacterPattern,
  CapturableCharacterType,
  generateCapturableRegExp,
  extractor,
} from './utilities/extractor'
import { kanaConverter, KanaType } from './utilities/kanaConverter'
export { KanaType, CapturableCharacterType }
export type { CapturableCharacterPattern }

export type Options = {
  observeInterval?: number; // unit: ms
  debug?: boolean; // logging if true
  event?: boolean; // logging if true
  realtime?: boolean | HTMLInputElement;
  enter?: boolean | HTMLInputElement;
  clearOnInputEmpty?: boolean;
  capturablePatterns?: CapturableCharacterPattern | CapturableCharacterPattern[];
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
// TODO: support textarea (HTMLTextAreaElement)
export type InputElement = HTMLInputElement | string;
export function setupObserver(
  input: InputElement,
  outputs: OutputElement | OutputElement[],
  options: Options = {
    observeInterval: 30,
    debug: false,
    realtime: true,
    enter: false,
    clearOnInputEmpty: false,
    capturablePatterns: CapturableCharacterType.HIRAGANA,
  },
) {
  // 入力値を受け付けるパターン
  // TODO: support dynamic patterns
  const capturablePatterns = generateCapturableRegExp(
    options.capturablePatterns ?? CapturableCharacterType.HIRAGANA,
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
  const realtimeIsDynamic = options.realtime instanceof HTMLInputElement
  const enterIsDynamic = options.enter instanceof HTMLInputElement
  const outputTimingIsStatic = !realtimeIsDynamic && !enterIsDynamic
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
  if (outputTimingIsStatic) {
    _checkOutputTiming()
  }
  _debug('outputTiming', { outputTiming, outputTimingIsStatic, realtimeIsDynamic, enterIsDynamic })

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
  let composing: boolean = false
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

  let timer: ReturnType<typeof setInterval> | undefined
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
    _debug('observe', { composing, inputString, defaultString, currentString, outputValues })

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

    // セットする
    _set(currentString)
  }

  /**
   * セットする
   * @param string string
   * @returns void
   */
  function _set(string: string) {
    _debug('set', { defaultString, string, inputValue, outputValues })
    const extracted = extractor({
      input: string,
      patterns: capturablePatterns,
    })
    if (extracted.length === string.length) {
      inputValue = extracted
    }

    activeOutputs.forEach(({ element, type }, index) => {
      const converted = kanaConverter(type, inputValue)
      _debug('converted', { type, string, inputValue, after: converted, before: outputValues[index], bufferKana: element.dataset['bufferKana'], bufferOther: element.dataset['bufferOther'] })
      if (outputTiming === OutputTiming.REALTIME) {
        element.value = outputValues[index] + converted
      } else if (outputTiming === OutputTiming.ENTER) {
        _setBuffer(element, converted)
      }
    })
  }

  /**
   * 文字を抽出してセットする
   * @param candidate string
   * @returns void
   */
  function _extractAndSet(candidate: string) {
    const extracted = extractor({
      input: candidate,
      patterns: capturablePatterns,
    })
    if (candidate && candidate === extracted) {
      _setup()
      _set(extracted)
    }
  }

  /**
   * 文字を反映せずに一時保存する
   *
   * @param element HTMLInputElement
   * @param string  string
   * @returns void
   */
  function _setBuffer(element: HTMLInputElement, string: string) {
    _debug('set buffer', { composing, element, string })
    if (composing) {
      element.dataset['bufferKana'] = string
    } else {
      element.dataset['bufferOther'] = (element.dataset['bufferOther'] ?? '') + string
    }
  }
  /**
   * バッファをクリアする
   * @param element HTMLInputElement
   * @returns void
   */
  function _clearBuffer(element: HTMLInputElement) {
    _debug('clear buffer')
    element.dataset['bufferOther'] = ''
    element.dataset['bufferKana'] = ''
  }
  // 予約
  // /**
  //  * 全てのバッファをクリアする
  //  * @returns void
  //  */
  // function _clearBufferAll() {
  //   activeOutputs.forEach(({ element }) => {
  //     _clearBuffer(element)
  //   })
  // }
  /**
   * 反映する
   * @returns void
   */
  function _reflectBufferAll(clear: boolean = false) {
    activeOutputs.forEach(({ element }) => {
      if (clear) {
        element.value = ''
        _clearBuffer(element)
        return
      }
      const buffer = (element.dataset['bufferOther'] ?? '') + (element.dataset['bufferKana'] ?? '')
      if (buffer) {
        element.value += buffer
        _clearBuffer(element)
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
      console.log('%c[debug]', 'background-color: #ff6d13; color: #fffafa;', { message })
      return
    }
    console.log('%c[debug]', 'background-color: #ff6d13; color: #fffafa;', { message }, ...args)
  }

  /**
   * イベントログ
   * @param message
   * @param args
   * @return void
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _event(message: string, ...args: any[]) {
    if (!options.event) {
      return
    }
    if (args.length === 0) {
      console.info('%c[event]', 'background-color: #fffafa; color: #303030;', { message })
      return
    }
    console.info('%c[event]', 'background-color: #fffafa; color: #303030;', { message }, ...args)
  }

  /**
   * Event listeners
   */
  inputElement.addEventListener('focus', (e: FocusEvent) => {
    _event('focus', { e })
    _setup()
  })
  inputElement.addEventListener('blur', (e: FocusEvent) => {
    _event('blur', { e })
    _end()
  })
  inputElement.addEventListener('compositionstart', (e: CompositionEvent) => {
    _event('compositionstart', { e })
    _setup()
    _start()
    composing = true
  })
  inputElement.addEventListener('compositionend', (e: CompositionEvent) => {
    _event('compositionend', { e, inputValue })
    _end()
    _reset()
    composing = false

    // windows での全角スペース対策
    if (['　', ' '].includes(e.data)) {
      _debug('spaces', '"' + e.data + '"')
      _extractAndSet(e.data)
    }
  })
  inputElement.addEventListener('beforeinput', (e: InputEvent) => {
    _event('beforeinput', { composing, e })
    if (!composing && !e.isComposing && e.data) {
      _extractAndSet(e.data)
    }
  })
  inputElement.addEventListener('input', (e: Event) => { // 実際には InputEvent; TS の定義上は Event
    _event('input', { composing, e })
  })
  inputElement.addEventListener('keydown', (e: KeyboardEvent) => {
    _event('keydown', { composing, e })
  })
  inputElement.addEventListener('keyup', (e: KeyboardEvent) => {
    _event('keyup', { composing, e }, e.code)
    if (e.code === 'Enter') {
      let clear = false
      if (options.clearOnInputEmpty && inputElement.value === '') {
        clear = true
        _reset()
        _set('')
      }
      if (outputTiming === OutputTiming.ENTER) {
        _reflectBufferAll(clear)
      }
    }
    if (e.code === 'Backspace') {
      // FIXME: REALTIME -> 日本語入力中にバックスペースで全て消すと1文字目が残る
      // FIXME: ENTER -> 日本語入力中にバックスペースで全て消し、Enterで確定もしくは半角入力後エンターすると1文字目が残る
      _debug('backspace', { outputTiming }, inputElement.value)
    }
  })

  if (options.realtime instanceof HTMLInputElement) {
    options.realtime.addEventListener('change', () => {
      _debug('realtime change')
      _checkOutputTiming()
      _reflectBufferAll()
    })
  }
  if (options.enter instanceof HTMLInputElement) {
    options.enter.addEventListener('change', () => {
      _debug('enter change')
      _checkOutputTiming()
    })
  }
}
