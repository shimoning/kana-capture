import { diff as P } from "./utilities/diff.js";
import { generateCaptureableRegExp as w, CaptureableCharacterType as R, extractor as M } from "./utilities/extractor.js";
import { KanaType as y, kanaConverter as x } from "./utilities/kanaConverter.js";
var q = /* @__PURE__ */ ((i) => (i[i.REALTIME = 0] = "REALTIME", i[i.ENTER = 1] = "ENTER", i))(q || {});
function K(i, E, n = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: R.HIRAGANA
}) {
  const A = w(
    n.captureablePatterns ?? R.HIRAGANA
  ), a = typeof i == "string" ? document.querySelector(i) : i;
  if (!a)
    throw new Error("input element not found");
  let p = 0;
  const b = !(n.realtime instanceof HTMLInputElement) && !(n.enter instanceof HTMLInputElement);
  function L() {
    const e = n.realtime && (n.realtime === !0 || n.realtime instanceof HTMLInputElement && n.realtime.checked), t = n.enter && (n.enter === !0 || n.enter instanceof HTMLInputElement && n.enter.checked);
    p = e || !t ? 0 : 1;
  }
  b && L(), r("outputTimingIsStatic", { outputTimingIsStatic: b });
  const f = [], T = (e) => {
    if (typeof e == "string") {
      const t = document.querySelectorAll(e);
      for (const d of t)
        f.push({ element: d, type: y.Hiragana });
    } else e instanceof HTMLInputElement ? f.push({ element: e, type: y.Hiragana }) : f.push({
      element: e.element,
      type: e.type ?? y.Hiragana
    });
  };
  if (Array.isArray(E))
    for (const e of E)
      T(e);
  else
    T(E);
  let c = !1, o = "", m = "", s = "";
  const l = new Array(f.length).fill("");
  function k() {
    r("reset"), o = "", m = "", s = "";
    for (let e = 0; e < f.length; e++)
      l[e] = "";
  }
  function g() {
    o = a.value, f.forEach(({ element: e }, t) => {
      l[t] = e.value;
    }), r("setup", a.value, { defaultString: o, activeOutputs: f });
  }
  let u;
  function S() {
    r("start", { timer: u }), !u && (u = setInterval(() => {
      b || L(), C();
    }, n.observeInterval ?? 30));
  }
  function H() {
    r("end", { timer: u }), u && (clearInterval(u), u = void 0);
  }
  function C() {
    const e = a.value;
    if (r("observe", { observing: c, inputString: e, defaultString: o, currentString: m, outputValues: l }), e === "")
      return;
    const t = P(o, e);
    m !== t.diff && (m = t.diff, c && v(m));
  }
  function v(e) {
    r("set", { defaultString: o, string: e, inputValue: s, outputValues: l });
    const t = M({
      input: e,
      patterns: A
    });
    t.length === e.length && (s = t), f.forEach(({ element: d, type: _ }, I) => {
      const h = x(_, s);
      r("converted", { type: _, string: e, inputValue: s, after: h, before: l[I] }), p === 0 ? d.value = l[I] + h : p === 1 && (d.dataset.kana = l[I] = h);
    });
  }
  function N() {
    f.forEach(({ element: e }) => {
      e.dataset.kana && (e.value += e.dataset.kana, e.removeAttribute("data-kana"));
    });
  }
  function r(e, ...t) {
    if (n.debug) {
      if (t.length === 0) {
        console.info("debug", { message: e });
        return;
      }
      console.info("debug", { message: e }, ...t);
    }
  }
  a.addEventListener("focus", () => {
    r("focus"), g();
  }), a.addEventListener("blur", () => {
    r("blur"), H();
  }), a.addEventListener("compositionstart", (e) => {
    r("compositionstart", { e }), g(), S(), c = !0;
  }), a.addEventListener("compositionend", (e) => {
    r("compositionend", { e }), H(), v(s), k(), c = !1;
  }), a.addEventListener("beforeinput", (e) => {
    if (r("beforeinput", { observing: c, e }), !c && !e.isComposing && e.data) {
      const t = e.data, d = M({
        input: t,
        patterns: A
      });
      t && t === d && (g(), v(t));
    }
  }), a.addEventListener("keyup", (e) => {
    r("keyup", { observing: c, e }), e.code === "Enter" && (n.clearOnInputEmpty && a.value === "" ? (k(), v("")) : p === 1 && N());
  });
}
export {
  R as CaptureableCharacterType,
  y as KanaType,
  q as OutputTiming,
  K as setupObserver
};
//# sourceMappingURL=index.js.map
