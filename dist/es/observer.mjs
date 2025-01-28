import { diff as N } from "./utilities/diff.mjs";
import { generateCaptureableRegExp as P, CaptureableCharacterType as H, extractor as q } from "./utilities/extractor.mjs";
import { KanaType as g, kanaConverter as x } from "./utilities/kanaConverter.mjs";
var G = /* @__PURE__ */ ((l) => (l[l.REALTIME = 0] = "REALTIME", l[l.ENTER = 1] = "ENTER", l))(G || {});
function Z(l, b, r = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: H.HIRAGANA
}) {
  const y = P(
    r.captureablePatterns ?? H.HIRAGANA
  ), R = y.source.includes("　"), S = y.source.includes(" "), a = typeof l == "string" ? document.querySelector(l) : l;
  if (!a)
    throw new Error("input element not found");
  let p = 0;
  function T() {
    const e = r.realtime && (r.realtime === !0 || r.realtime instanceof HTMLInputElement && r.realtime.checked), t = r.enter && (r.enter === !0 || r.enter instanceof HTMLInputElement && r.enter.checked);
    p = e || !t ? 0 : 1;
  }
  const c = [], A = (e) => {
    if (typeof e == "string") {
      const t = document.querySelectorAll(e);
      for (const E of t)
        c.push({ element: E, type: g.Hiragana });
    } else e instanceof HTMLInputElement ? c.push({ element: e, type: g.Hiragana }) : c.push({
      element: e.element,
      type: e.type ?? g.Hiragana
    });
  };
  if (Array.isArray(b))
    for (const e of b)
      A(e);
  else
    A(b);
  let f = !1, i = "", d = "", s = "";
  const o = new Array(c.length).fill("");
  function I() {
    n("reset"), i = "", d = "", s = "";
    for (let e = 0; e < c.length; e++)
      o[e] = "";
  }
  function m() {
    i = a.value, c.forEach(({ element: e }, t) => {
      o[t] = e.value;
    }), n("setup", a.value, { defaultString: i, activeOutputs: c });
  }
  let u;
  function w() {
    n("start", { timer: u }), !u && (u = setInterval(() => {
      T(), M();
    }, r.observeInterval ?? 30));
  }
  function L() {
    n("end", { timer: u }), u && (clearInterval(u), u = void 0);
  }
  function M() {
    const e = a.value;
    if (n("observe", { observing: f, inputString: e, defaultString: i, currentString: d, outputValues: o }), e === "")
      return;
    const t = N(i, e);
    d !== t.diff && (d = t.diff, f && v(d));
  }
  function v(e) {
    n("set", { defaultString: i, string: e, inputValue: s, outputValues: o });
    const t = q({
      input: e,
      patterns: y
    });
    t.length === e.length && (s = t), c.forEach(({ element: E, type: _ }, h) => {
      const k = x(_, s);
      n("converted", { type: _, string: e, inputValue: s, after: k, before: o[h] }), p === 0 ? E.value = o[h] + k : p === 1 && (E.dataset.kana = o[h] = k);
    });
  }
  function C() {
    c.forEach(({ element: e }) => {
      e.dataset.kana && (e.value += e.dataset.kana, e.removeAttribute("data-kana"));
    });
  }
  function n(e, ...t) {
    if (r.debug) {
      if (t.length === 0) {
        console.info("debug", { message: e });
        return;
      }
      console.info("debug", { message: e }, ...t);
    }
  }
  a.addEventListener("focus", () => {
    n("focus"), m();
  }), a.addEventListener("blur", () => {
    n("blur"), L();
  }), a.addEventListener("compositionstart", (e) => {
    n("compositionstart", { e }), m(), w(), f = !0;
  }), a.addEventListener("compositionend", (e) => {
    n("compositionend", { e }), L(), v(s), I(), f = !1;
  }), a.addEventListener("keydown", (e) => {
    n("keydown", { observing: f, e });
  }), a.addEventListener("keyup", (e) => {
    if (n("keyup", { observing: f, e }), e.code === "Enter")
      r.clearOnInputEmpty && a.value === "" ? (I(), v("")) : p === 1 && C();
    else if (!f && e.code === "Space") {
      const t = a.value.slice(-1);
      (R && t === "　" || S && t === " ") && (m(), v(t));
    }
  });
}
export {
  H as CaptureableCharacterType,
  g as KanaType,
  G as OutputTiming,
  Z as setupObserver
};
//# sourceMappingURL=observer.mjs.map
