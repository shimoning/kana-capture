import { isHiraganaCharCode as i } from "./isHiraganaCharCode.mjs";
import { toKatakanaCharCode as f } from "./toKatakanaCharCode.mjs";
import { katakanaMap as e } from "../map/kana/hiragana2hankakuKatakana.mjs";
var u = /* @__PURE__ */ ((a) => (a[a.Hiragana = 0] = "Hiragana", a[a.ZenkakuKatakana = 1] = "ZenkakuKatakana", a[a.HankakuKatakana = 2] = "HankakuKatakana", a))(u || {});
function h(a, t) {
  let o = "";
  for (let r = 0; r < t.length; r++) {
    const n = t.charCodeAt(r);
    if (!i(n)) {
      o += t[r];
      continue;
    }
    if (a === 0)
      o += t[r];
    else if (a === 1)
      o += String.fromCharCode(f(n));
    else if (a === 2) {
      const k = t[r];
      typeof e[k] == "string" && (o += e[k]);
    }
  }
  return o;
}
export {
  u as KanaType,
  h as kanaConverter
};
//# sourceMappingURL=kanaConverter.mjs.map
