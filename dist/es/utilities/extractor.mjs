var s = /* @__PURE__ */ ((A) => (A[A.HIRAGANA = 0] = "HIRAGANA", A[A.KUTOUTEN = 1] = "KUTOUTEN", A[A.CHOUON = 2] = "CHOUON", A[A.ZENKAKU_SPACE = 3] = "ZENKAKU_SPACE", A[A.HANKAKU_SPACE = 4] = "HANKAKU_SPACE", A[A.ZENKAKU_ALPHABET = 5] = "ZENKAKU_ALPHABET", A[A.HANKAKU_ALPHABET = 6] = "HANKAKU_ALPHABET", A[A.ZENKAKU_NUMBER = 7] = "ZENKAKU_NUMBER", A[A.HANKAKU_NUMBER = 8] = "HANKAKU_NUMBER", A[A.ZENKAKU_1BYTE_SYMBOL = 9] = "ZENKAKU_1BYTE_SYMBOL", A[A.HANKAKU_1BYTE_SYMBOL = 10] = "HANKAKU_1BYTE_SYMBOL", A))(s || {});
const o = {
  0: /[ぁ-ん]/g,
  1: /[、。]/g,
  2: /[ー]/g,
  /* eslint-disable-next-line no-irregular-whitespace */
  3: /[　]/g,
  4: /[ ]/g,
  5: /[Ａ-Ｚａ-ｚ]/g,
  6: /[A-Za-z]/g,
  7: /[０-９]/g,
  8: /[0-9]/g,
  9: /[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［￥］＾＿“｛｜｝～]/g,
  /* eslint-disable-next-line no-useless-escape*/
  10: /[!"#$%&'()*+,-.\/:;<=>?@[\\]^_`{|}~]/g
};
function B({
  input: A,
  patterns: N = 0
  /* HIRAGANA */
}) {
  const E = [], U = (K) => {
    typeof K == "string" ? E.push("[" + K + "]") : K instanceof RegExp ? E.push(K.source) : E.push(o[K].source);
  };
  if (Array.isArray(N))
    for (const K of N)
      U(K);
  else
    U(N);
  if (E.length === 0)
    return A;
  const g = new RegExp(E.join("|"), "g"), _ = A.replace(g, "");
  return _.length === 0 ? A : A.replace(
    new RegExp("[" + _ + "]", "g"),
    ""
  );
}
export {
  o as CaptureableCharacterMap,
  s as CaptureableCharacterType,
  B as extractor
};
//# sourceMappingURL=extractor.mjs.map
