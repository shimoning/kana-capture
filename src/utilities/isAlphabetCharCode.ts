export function isAlphabetCharCode(char: number): boolean {
  return (char >= 0x41 && char <= 0x5A)
      || (char >= 0x61 && char <= 0x7A)
}
