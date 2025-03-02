import { isHiraganaCharCode as s } from "./isHiraganaCharCode.js";
import { toKatakanaCharCode as l } from "./toKatakanaCharCode.js";
import { katakanaMap as n } from "../maps/kana/hiragana2hankakuKatakana.js";
import { alphabetMap as f } from "../maps/kana/alphabet.js";
import { numberMap as k } from "../maps/kana/number.js";
import { symbolMap as m } from "../maps/kana/symbol.js";
/*!
 * MIT License
 *
 * Copyright (c) 2025 Shimoning, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
//# sourceMappingURL=kanaConverter.js.map
