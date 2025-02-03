/**
 * 文字列比較を行う関数
 *
 * あくまでこのライブラリのためだけに作成したものなので汎用性はない
 */
export type DiffResult = {
    before: string;
    after: string;
    diff: string;
    same: string;
    gap: number;
};
export declare function diff(beforeString: string, afterString: string): DiffResult;
