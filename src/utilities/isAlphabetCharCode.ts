export function isAlphabetCharCode(char: number): boolean {
  return (char >= 65 && char <= 90) || (char >= 97 && char <= 122)
}
