import { diff as H } from "./utilities/diff.mjs";
import { CaptureableCharacterType as I, extractor as S } from "./utilities/extractor.mjs";
import { KanaType as h, kanaConverter as w } from "./utilities/kanaConverter.mjs";
var N = /* @__PURE__ */ ((t) => (t[t.REALTIME = 0] = "REALTIME", t[t.ENTER = 1] = "ENTER", t))(N || {});
function G(t, m, a = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: I.HIRAGANA
}) {
  let d = 0;
  function L() {
    const e = a.realtime && (a.realtime === !0 || a.realtime instanceof HTMLInputElement && a.realtime.checked), r = a.enter && (a.enter === !0 || a.enter instanceof HTMLInputElement && a.enter.checked);
    d = e || !r ? 0 : 1;
  }
  const l = [];
  if (typeof m == "string") {
    const e = document.querySelectorAll(m);
    for (const r of e)
      l.push({ element: r, type: h.Hiragana });
  } else
    for (const e of m)
      if (typeof e == "string") {
        const r = document.querySelectorAll(e);
        for (const v of r)
          l.push({ element: v, type: h.Hiragana });
      } else
        l.push({
          element: e.element,
          type: e.type ?? h.Hiragana
        });
  let f = !1, o = "", i = "", c = "";
  const u = new Array(l.length).fill("");
  function g() {
    n("reset"), o = "", i = "", c = "";
    for (let e = 0; e < l.length; e++)
      u[e] = "";
  }
  function E() {
    o = t.value, l.forEach(({ element: e }, r) => {
      u[r] = e.value;
    }), n("setup", t.value, { defaultString: o, activeOutputs: l });
  }
  let s;
  function _() {
    n("start", { timer: s }), !s && (s = setInterval(() => {
      L(), R();
    }, a.observeInterval ?? 30));
  }
  function k() {
    n("end", { timer: s }), s && (clearInterval(s), s = void 0);
  }
  function R() {
    let e = t.value;
    n("observe", { compositing: f, inputString: e, defaultString: o, currentString: i, outputValues: u }), !(e === "" || (e = H(o, e).diff, i === e)) && (i = e, f && b(i));
  }
  function b(e) {
    n("set", { defaultString: o, string: e, inputValue: c, outputValues: u });
    const r = S({
      input: e,
      patterns: a.captureablePatterns ?? I.HIRAGANA
    });
    console.warn({ extracted: r, string: e, inputValue: c, defaultString: o }), r.length === e.length && (c = r), l.forEach(({ element: v, type: A }, p) => {
      const y = w(A, c);
      n("converted", { type: A, string: e, inputValue: c, after: y, before: u[p] }), d === 0 ? v.value = u[p] + y : d === 1 && (v.dataset.kana = u[p] = y);
    });
  }
  function T() {
    l.forEach(({ element: e }) => {
      e.dataset.kana && (e.value += e.dataset.kana, e.removeAttribute("data-kana"));
    });
  }
  function n(e, ...r) {
    if (a.debug) {
      if (r.length === 0) {
        console.info("debug", { message: e });
        return;
      }
      console.info("debug", { message: e }, ...r);
    }
  }
  t.addEventListener("focus", () => {
    n("focus"), E();
  }), t.addEventListener("blur", () => {
    n("blur"), k();
  }), t.addEventListener("compositionstart", (e) => {
    n("compositionstart", { e }), E(), _(), f = !0;
  }), t.addEventListener("compositionend", (e) => {
    n("compositionend", { e }), k(), b(c), g(), f = !1;
  }), t.addEventListener("keydown", (e) => {
    n("keydown", { compositing: f, e }), f || E(), e.code === "Enter" && (a.clearOnInputEmpty && t.value === "" ? (g(), b("")) : d === 1 && T());
  }), t.addEventListener("keyup", (e) => {
    n("keyup", { compositing: f, e });
  });
}
export {
  I as CaptureableCharacterType,
  h as KanaType,
  N as OutputMode,
  G as setupObserver
};
//# sourceMappingURL=observer.mjs.map
