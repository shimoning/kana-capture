import { diff as S } from "./utilities/diff.mjs";
import { generateCaptureableRegExp as C, CaptureableCharacterType as I, extractor as M } from "./utilities/extractor.mjs";
import { KanaType as g, kanaConverter as N } from "./utilities/kanaConverter.mjs";
var w = /* @__PURE__ */ ((t) => (t[t.REALTIME = 0] = "REALTIME", t[t.ENTER = 1] = "ENTER", t))(w || {});
function G(t, m, a = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: I.HIRAGANA
}) {
  const L = C(
    a.captureablePatterns ?? I.HIRAGANA
  );
  let d = 0;
  function R() {
    const e = a.realtime && (a.realtime === !0 || a.realtime instanceof HTMLInputElement && a.realtime.checked), r = a.enter && (a.enter === !0 || a.enter instanceof HTMLInputElement && a.enter.checked);
    d = e || !r ? 0 : 1;
  }
  const l = [];
  if (typeof m == "string") {
    const e = document.querySelectorAll(m);
    for (const r of e)
      l.push({ element: r, type: g.Hiragana });
  } else
    for (const e of m)
      if (typeof e == "string") {
        const r = document.querySelectorAll(e);
        for (const v of r)
          l.push({ element: v, type: g.Hiragana });
      } else
        l.push({
          element: e.element,
          type: e.type ?? g.Hiragana
        });
  let f = !1, u = "", i = "", s = "";
  const c = new Array(l.length).fill("");
  function h() {
    n("reset"), u = "", i = "", s = "";
    for (let e = 0; e < l.length; e++)
      c[e] = "";
  }
  function E() {
    u = t.value, l.forEach(({ element: e }, r) => {
      c[r] = e.value;
    }), n("setup", t.value, { defaultString: u, activeOutputs: l });
  }
  let o;
  function _() {
    n("start", { timer: o }), !o && (o = setInterval(() => {
      R(), H();
    }, a.observeInterval ?? 30));
  }
  function k() {
    n("end", { timer: o }), o && (clearInterval(o), o = void 0);
  }
  function H() {
    let e = t.value;
    n("observe", { observing: f, inputString: e, defaultString: u, currentString: i, outputValues: c }), !(e === "" || (e = S(u, e).diff, i === e)) && (i = e, f && b(i));
  }
  function b(e) {
    n("set", { defaultString: u, string: e, inputValue: s, outputValues: c });
    const r = M({
      input: e,
      patterns: L
    });
    r.length === e.length && (s = r), l.forEach(({ element: v, type: A }, p) => {
      const y = N(A, s);
      n("converted", { type: A, string: e, inputValue: s, after: y, before: c[p] }), d === 0 ? v.value = c[p] + y : d === 1 && (v.dataset.kana = c[p] = y);
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
    n("compositionend", { e }), k(), b(s), h(), f = !1;
  }), t.addEventListener("keydown", (e) => {
    n("keydown", { observing: f, e }), f || E(), e.code === "Enter" && (a.clearOnInputEmpty && t.value === "" ? (h(), b("")) : d === 1 && T());
  }), t.addEventListener("keyup", (e) => {
    n("keyup", { observing: f, e });
  });
}
export {
  I as CaptureableCharacterType,
  g as KanaType,
  w as OutputTiming,
  G as setupObserver
};
//# sourceMappingURL=observer.mjs.map
