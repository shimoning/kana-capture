export function isKanaSymbolCharCode(char: number): boolean {
  return (char >= 0x3001 && char <= 0x303E)
}
