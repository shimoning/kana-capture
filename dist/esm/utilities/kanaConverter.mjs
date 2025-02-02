import { isHiraganaCharCode as s } from "./isHiraganaCharCode.mjs";
import { toKatakanaCharCode as l } from "./toKatakanaCharCode.mjs";
import { katakanaMap as n } from "../maps/kana/hiragana2hankakuKatakana.mjs";
import { alphabetMap as f } from "../maps/kana/alphabet.mjs";
import { numberMap as k } from "../maps/kana/number.mjs";
import { symbolMap as m } from "../maps/kana/symbol.mjs";
var g = /* @__PURE__ */ ((a) => (a[a.Hiragana = 0] = "Hiragana", a[a.ZenkakuKatakana = 1] = "ZenkakuKatakana", a[a.HankakuKatakana = 2] = "HankakuKatakana", a))(g || {});
function H(a, e) {
  let t = "";
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (a === 0)
      t += r;
    else if (a === 1) {
      const i = e.charCodeAt(o);
      s(i) ? t += String.fromCharCode(l(i)) : t += r;
    } else a === 2 && (typeof n[r] == "string" ? t += n[r] : typeof f[r] == "string" ? t += f[r] : typeof k[r] == "string" ? t += k[r] : typeof m[r] == "string" ? t += m[r] : t += r);
  }
  return t;
}
export {
  g as KanaType,
  H as kanaConverter
};
//# sourceMappingURL=kanaConverter.mjs.map
