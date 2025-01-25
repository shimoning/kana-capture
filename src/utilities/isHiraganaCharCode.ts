export function isHiraganaCharCode(char: number): boolean {
  return (char >= 0x3041 && char <= 0x3096)
      || (char >= 0x309D && char <= 0x309E)
}
