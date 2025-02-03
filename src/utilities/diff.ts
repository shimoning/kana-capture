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
}

export function diff(beforeString: string, afterString: string): DiffResult
{
  if (!beforeString.length || !afterString.length) {
    return {
      before: beforeString,
      after: afterString,
      diff: afterString,
      same: '',
      gap: 0,
    }
  }
  if (beforeString === afterString) {
    return {
      before: beforeString,
      after: afterString,
      diff: '',
      same: beforeString,
      gap: 0,
    }
  }

  const beforeCharacters = beforeString.split('')
  const afterCharacters = afterString.split('')
  const length = Math.max(beforeCharacters.length, afterCharacters.length)
  const sameCharacters = []
  const diffCharacters = []
  let gap = 0
  for (let i = 0; i < length; i++) {
    const beforeCharacter = beforeCharacters[i]
    for (let j = i + gap; j < length; j++, gap++) {
      const afterCharacter = afterCharacters[j]
      if (beforeCharacter === afterCharacter) {
        sameCharacters.push(beforeCharacter)
        break
      }
      diffCharacters.push(afterCharacter)
    }
  }

  return {
    before: beforeString,
    after: afterString,
    diff: diffCharacters.join(''),
    same: sameCharacters.join(''),
    gap,
  }
}
