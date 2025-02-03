import { CaptureableCharacterPattern, CaptureableCharacterType } from './utilities/extractor';
import { KanaType } from './utilities/kanaConverter';
export { KanaType, CaptureableCharacterType };
export type { CaptureableCharacterPattern };
export type Options = {
    observeInterval?: number;
    debug?: boolean;
    realtime?: boolean | HTMLInputElement;
    enter?: boolean | HTMLInputElement;
    clearOnInputEmpty?: boolean;
    captureablePatterns?: CaptureableCharacterPattern | CaptureableCharacterPattern[];
};
export type OutputElement = Output | HTMLInputElement | string;
export type Output = {
    element: HTMLInputElement;
    type?: KanaType;
};
export declare enum OutputTiming {
    REALTIME = 0,// default and priority
    ENTER = 1
}
export type InputElement = HTMLInputElement | string;
export declare function setupObserver(input: InputElement, outputs: OutputElement | OutputElement[], options?: Options): void;
