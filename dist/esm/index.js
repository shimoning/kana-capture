import { diff as P } from "./utilities/diff.js";
import { generateCaptureableRegExp as w, CaptureableCharacterType as H, extractor as _ } from "./utilities/extractor.js";
import { KanaType as y, kanaConverter as x } from "./utilities/kanaConverter.js";
var q = /* @__PURE__ */ ((f) => (f[f.REALTIME = 0] = "REALTIME", f[f.ENTER = 1] = "ENTER", f))(q || {});
function K(f, E, n = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: H.HIRAGANA
}) {
  const I = w(
    n.captureablePatterns ?? H.HIRAGANA
  ), a = typeof f == "string" ? document.querySelector(f) : f;
  if (!a)
    throw new Error("input element not found");
  let p = 0;
  const R = !(n.realtime instanceof HTMLInputElement) && !(n.enter instanceof HTMLInputElement);
  function M() {
    const e = n.realtime && (n.realtime === !0 || n.realtime instanceof HTMLInputElement && n.realtime.checked), t = n.enter && (n.enter === !0 || n.enter instanceof HTMLInputElement && n.enter.checked);
    p = e || !t ? 0 : 1;
  }
  const i = [], A = (e) => {
    if (typeof e == "string") {
      const t = document.querySelectorAll(e);
      for (const d of t)
        i.push({ element: d, type: y.Hiragana });
    } else e instanceof HTMLInputElement ? i.push({ element: e, type: y.Hiragana }) : i.push({
      element: e.element,
      type: e.type ?? y.Hiragana
    });
  };
  if (Array.isArray(E))
    for (const e of E)
      A(e);
  else
    A(E);
  let c = !1, o = "", m = "", s = "";
  const l = new Array(i.length).fill("");
  function L() {
    r("reset"), o = "", m = "", s = "";
    for (let e = 0; e < i.length; e++)
      l[e] = "";
  }
  function b() {
    o = a.value, i.forEach(({ element: e }, t) => {
      l[t] = e.value;
    }), r("setup", a.value, { defaultString: o, activeOutputs: i });
  }
  let u;
  function S() {
    r("start", { timer: u }), !u && (u = setInterval(() => {
      R || M(), C();
    }, n.observeInterval ?? 30));
  }
  function T() {
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
    const t = _({
      input: e,
      patterns: I
    });
    t.length === e.length && (s = t), i.forEach(({ element: d, type: k }, g) => {
      const h = x(k, s);
      r("converted", { type: k, string: e, inputValue: s, after: h, before: l[g] }), p === 0 ? d.value = l[g] + h : p === 1 && (d.dataset.kana = l[g] = h);
    });
  }
  function N() {
    i.forEach(({ element: e }) => {
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
    r("focus"), b();
  }), a.addEventListener("blur", () => {
    r("blur"), T();
  }), a.addEventListener("compositionstart", (e) => {
    r("compositionstart", { e }), b(), S(), c = !0;
  }), a.addEventListener("compositionend", (e) => {
    r("compositionend", { e }), T(), v(s), L(), c = !1;
  }), a.addEventListener("beforeinput", (e) => {
    if (r("beforeinput", { observing: c, e }), !c && !e.isComposing && e.data) {
      const t = e.data, d = _({
        input: t,
        patterns: I
      });
      t && t === d && (b(), v(t));
    }
  }), a.addEventListener("keyup", (e) => {
    r("keyup", { observing: c, e }), e.code === "Enter" && (n.clearOnInputEmpty && a.value === "" ? (L(), v("")) : p === 1 && N());
  });
}
export {
  H as CaptureableCharacterType,
  y as KanaType,
  q as OutputTiming,
  K as setupObserver
};
//# sourceMappingURL=index.js.map
