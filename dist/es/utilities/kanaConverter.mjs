import { isHiraganaCharCode as e } from "./isHiraganaCharCode.mjs";
import { katakanaMap as i } from "../map/kana/hiragana2hankakuKatakana.mjs";
var f = /* @__PURE__ */ ((a) => (a[a.Hiragana = 0] = "Hiragana", a[a.ZenkakuKatakana = 1] = "ZenkakuKatakana", a[a.HankakuKatakana = 2] = "HankakuKatakana", a))(f || {});
function C(a, t) {
  let n = "";
  for (let r = 0; r < t.length; r++) {
    const k = t.charCodeAt(r);
    if (e(k)) {
      if (a === 0)
        n += t[r];
      else if (a === 1)
        n += String.fromCharCode(k + 96);
      else if (a === 2) {
        const o = t[r];
        typeof i[o] == "string" && (n += i[o]);
      }
    }
  }
  return n;
}
export {
  f as KanaType,
  C as kanaConverter
};
//# sourceMappingURL=kanaConverter.mjs.map
