/**
 * Diff
 */
export type DiffResult = {
    before: string;
    after: string;
    diff: string;
    same: string;
    gap: number;
};
export declare function diff(beforeString: string, afterString: string): DiffResult;
