import { diff as S } from "./utilities/diff.mjs";
import { generateCaptureableRegExp as C, CaptureableCharacterType as _, extractor as N } from "./utilities/extractor.mjs";
import { KanaType as g, kanaConverter as P } from "./utilities/kanaConverter.mjs";
var q = /* @__PURE__ */ ((l) => (l[l.REALTIME = 0] = "REALTIME", l[l.ENTER = 1] = "ENTER", l))(q || {});
function V(l, E, r = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: _.HIRAGANA
}) {
  const R = C(
    r.captureablePatterns ?? _.HIRAGANA
  ), a = typeof l == "string" ? document.querySelector(l) : l;
  if (!a)
    throw new Error("input element not found");
  let v = 0;
  function H() {
    const e = r.realtime && (r.realtime === !0 || r.realtime instanceof HTMLInputElement && r.realtime.checked), n = r.enter && (r.enter === !0 || r.enter instanceof HTMLInputElement && r.enter.checked);
    v = e || !n ? 0 : 1;
  }
  const f = [], A = (e) => {
    if (typeof e == "string") {
      const n = document.querySelectorAll(e);
      for (const m of n)
        f.push({ element: m, type: g.Hiragana });
    } else e instanceof HTMLInputElement ? f.push({ element: e, type: g.Hiragana }) : f.push({
      element: e.element,
      type: e.type ?? g.Hiragana
    });
  };
  if (Array.isArray(E))
    for (const e of E)
      A(e);
  else
    A(E);
  let u = !1, o = "", d = "", s = "";
  const c = new Array(f.length).fill("");
  function I() {
    t("reset"), o = "", d = "", s = "";
    for (let e = 0; e < f.length; e++)
      c[e] = "";
  }
  function p() {
    o = a.value, f.forEach(({ element: e }, n) => {
      c[n] = e.value;
    }), t("setup", a.value, { defaultString: o, activeOutputs: f });
  }
  let i;
  function T() {
    t("start", { timer: i }), !i && (i = setInterval(() => {
      H(), w();
    }, r.observeInterval ?? 30));
  }
  function k() {
    t("end", { timer: i }), i && (clearInterval(i), i = void 0);
  }
  function w() {
    let e = a.value;
    t("observe", { observing: u, inputString: e, defaultString: o, currentString: d, outputValues: c }), !(e === "" || (e = S(o, e).diff, d === e)) && (d = e, u && b(d));
  }
  function b(e) {
    t("set", { defaultString: o, string: e, inputValue: s, outputValues: c });
    const n = N({
      input: e,
      patterns: R
    });
    n.length === e.length && (s = n), f.forEach(({ element: m, type: L }, y) => {
      const h = P(L, s);
      t("converted", { type: L, string: e, inputValue: s, after: h, before: c[y] }), v === 0 ? m.value = c[y] + h : v === 1 && (m.dataset.kana = c[y] = h);
    });
  }
  function M() {
    f.forEach(({ element: e }) => {
      e.dataset.kana && (e.value += e.dataset.kana, e.removeAttribute("data-kana"));
    });
  }
  function t(e, ...n) {
    if (r.debug) {
      if (n.length === 0) {
        console.info("debug", { message: e });
        return;
      }
      console.info("debug", { message: e }, ...n);
    }
  }
  a.addEventListener("focus", () => {
    t("focus"), p();
  }), a.addEventListener("blur", () => {
    t("blur"), k();
  }), a.addEventListener("compositionstart", (e) => {
    t("compositionstart", { e }), p(), T(), u = !0;
  }), a.addEventListener("compositionend", (e) => {
    t("compositionend", { e }), k(), b(s), I(), u = !1;
  }), a.addEventListener("keydown", (e) => {
    t("keydown", { observing: u, e }), u || p(), e.code === "Enter" && (r.clearOnInputEmpty && a.value === "" ? (I(), b("")) : v === 1 && M());
  }), a.addEventListener("keyup", (e) => {
    t("keyup", { observing: u, e });
  });
}
export {
  _ as CaptureableCharacterType,
  g as KanaType,
  q as OutputTiming,
  V as setupObserver
};
//# sourceMappingURL=observer.mjs.map
