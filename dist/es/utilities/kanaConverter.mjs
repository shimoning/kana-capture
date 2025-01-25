import { isHiraganaCharCode as k } from "./isHiraganaCharCode.mjs";
import { toKatakanaCharCode as f } from "./toKatakanaCharCode.mjs";
import { katakanaMap as i } from "../maps/kana/hiragana2hankakuKatakana.mjs";
var C = /* @__PURE__ */ ((a) => (a[a.Hiragana = 0] = "Hiragana", a[a.ZenkakuKatakana = 1] = "ZenkakuKatakana", a[a.HankakuKatakana = 2] = "HankakuKatakana", a))(C || {});
function c(a, o) {
  let r = "";
  for (let n = 0; n < o.length; n++) {
    const t = o[n];
    if (a === 0)
      r += t;
    else if (a === 1) {
      const e = o.charCodeAt(n);
      k(e) ? r += String.fromCharCode(f(e)) : r += t;
    } else a === 2 && (typeof i[t] == "string" ? r += i[t] : r += t);
  }
  return r;
}
export {
  C as KanaType,
  c as kanaConverter
};
//# sourceMappingURL=kanaConverter.mjs.map
