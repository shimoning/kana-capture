export function isHiraganaCharCode(char: number): boolean {
  return (char >= 12353 && char <= 12435) || char == 12445 || char == 12446
}
