var U = /* @__PURE__ */ ((A) => (A[A.HIRAGANA = 0] = "HIRAGANA", A[A.KUTOUTEN = 1] = "KUTOUTEN", A[A.CHOUON = 2] = "CHOUON", A[A.KAGIKAKKO = 3] = "KAGIKAKKO", A[A.ZENKAKU_SPACE = 4] = "ZENKAKU_SPACE", A[A.HANKAKU_SPACE = 5] = "HANKAKU_SPACE", A[A.ZENKAKU_ALPHABET = 6] = "ZENKAKU_ALPHABET", A[A.HANKAKU_ALPHABET = 7] = "HANKAKU_ALPHABET", A[A.ZENKAKU_NUMBER = 8] = "ZENKAKU_NUMBER", A[A.HANKAKU_NUMBER = 9] = "HANKAKU_NUMBER", A[A.ZENKAKU_1BYTE_SYMBOL = 10] = "ZENKAKU_1BYTE_SYMBOL", A[A.HANKAKU_1BYTE_SYMBOL = 11] = "HANKAKU_1BYTE_SYMBOL", A))(U || {});
const g = {
  0: /[ぁ-ん]/g,
  1: /[、。]/g,
  2: /[ー]/g,
  3: /[「」]/g,
  /* eslint-disable-next-line no-irregular-whitespace */
  4: /[　]/g,
  5: /[ ]/g,
  6: /[Ａ-Ｚａ-ｚ]/g,
  7: /[A-Za-z]/g,
  8: /[０-９]/g,
  9: /[0-9]/g,
  10: /[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［￥］＾＿“｛｜｝～]/g,
  11: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g
};
function o({
  input: A,
  patterns: E = 0
  /* HIRAGANA */
}) {
  const N = E instanceof RegExp ? E : _(E), K = A.replace(N, "");
  return K.length === 0 ? A : A.replace(
    new RegExp("[" + K + "]", "g"),
    ""
  );
}
function _(A) {
  const E = [], N = (K) => {
    typeof K == "string" ? E.push("[" + K + "]") : K instanceof RegExp ? E.push(K.source) : E.push(g[K].source);
  };
  if (Array.isArray(A))
    for (const K of A)
      N(K);
  else
    N(A);
  return new RegExp(E.join("|"), "g");
}
export {
  g as CaptureableCharacterMap,
  U as CaptureableCharacterType,
  o as extractor,
  _ as generateCaptureableRegExp
};
//# sourceMappingURL=extractor.mjs.map
