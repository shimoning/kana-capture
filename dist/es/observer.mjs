import { diff as C } from "./utilities/diff.mjs";
import { generateCaptureableRegExp as N, CaptureableCharacterType as H, extractor as R } from "./utilities/extractor.mjs";
import { KanaType as g, kanaConverter as P } from "./utilities/kanaConverter.mjs";
var x = /* @__PURE__ */ ((l) => (l[l.REALTIME = 0] = "REALTIME", l[l.ENTER = 1] = "ENTER", l))(x || {});
function V(l, E, r = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: H.HIRAGANA
}) {
  const A = N(
    r.captureablePatterns ?? H.HIRAGANA
  ), a = typeof l == "string" ? document.querySelector(l) : l;
  if (!a)
    throw new Error("input element not found");
  let p = 0;
  function T() {
    const e = r.realtime && (r.realtime === !0 || r.realtime instanceof HTMLInputElement && r.realtime.checked), t = r.enter && (r.enter === !0 || r.enter instanceof HTMLInputElement && r.enter.checked);
    p = e || !t ? 0 : 1;
  }
  const f = [], I = (e) => {
    if (typeof e == "string") {
      const t = document.querySelectorAll(e);
      for (const d of t)
        f.push({ element: d, type: g.Hiragana });
    } else e instanceof HTMLInputElement ? f.push({ element: e, type: g.Hiragana }) : f.push({
      element: e.element,
      type: e.type ?? g.Hiragana
    });
  };
  if (Array.isArray(E))
    for (const e of E)
      I(e);
  else
    I(E);
  let c = !1, o = "", v = "", s = "";
  const i = new Array(f.length).fill("");
  function k() {
    n("reset"), o = "", v = "", s = "";
    for (let e = 0; e < f.length; e++)
      i[e] = "";
  }
  function b() {
    o = a.value, f.forEach(({ element: e }, t) => {
      i[t] = e.value;
    }), n("setup", a.value, { defaultString: o, activeOutputs: f });
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
    if (n("observe", { observing: c, inputString: e, defaultString: o, currentString: v, outputValues: i }), e === "")
      return;
    const t = C(o, e);
    v !== t.diff && (v = t.diff, c && m(v));
  }
  function m(e) {
    n("set", { defaultString: o, string: e, inputValue: s, outputValues: i });
    const t = R({
      input: e,
      patterns: A
    });
    t.length === e.length && (s = t), f.forEach(({ element: d, type: _ }, y) => {
      const h = P(_, s);
      n("converted", { type: _, string: e, inputValue: s, after: h, before: i[y] }), p === 0 ? d.value = i[y] + h : p === 1 && (d.dataset.kana = i[y] = h);
    });
  }
  function S() {
    f.forEach(({ element: e }) => {
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
    n("focus"), b();
  }), a.addEventListener("blur", () => {
    n("blur"), L();
  }), a.addEventListener("compositionstart", (e) => {
    n("compositionstart", { e }), b(), w(), c = !0;
  }), a.addEventListener("compositionend", (e) => {
    n("compositionend", { e }), L(), m(s), k(), c = !1;
  }), a.addEventListener("keydown", (e) => {
    n("keydown", { observing: c, e });
  }), a.addEventListener("keyup", (e) => {
    if (n("keyup", { observing: c, e }), e.code === "Enter")
      r.clearOnInputEmpty && a.value === "" ? (k(), m("")) : p === 1 && S();
    else if (!c) {
      const t = a.value.slice(-1), d = R({
        input: t,
        patterns: A
      });
      t === d && (b(), m(t));
    }
  });
}
export {
  H as CaptureableCharacterType,
  g as KanaType,
  x as OutputTiming,
  V as setupObserver
};
//# sourceMappingURL=observer.mjs.map
