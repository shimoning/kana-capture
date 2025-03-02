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
function u(a, e) {
  if (!a.length || !e.length)
    return {
      before: a,
      after: e,
      diff: e,
      same: "",
      gap: 0
    };
  if (a === e)
    return {
      before: a,
      after: e,
      diff: "",
      same: a,
      gap: 0
    };
  const f = a.split(""), h = e.split(""), o = Math.max(f.length, h.length), l = [], p = [];
  let t = 0;
  for (let s = 0; s < o; s++) {
    const r = f[s];
    for (let c = s + t; c < o; c++, t++) {
      const n = h[c];
      if (r === n) {
        l.push(r);
        break;
      }
      p.push(n);
    }
  }
  return {
    before: a,
    after: e,
    diff: p.join(""),
    same: l.join(""),
    gap: t
  };
}
export {
  u as diff
};
//# sourceMappingURL=diff.js.map
