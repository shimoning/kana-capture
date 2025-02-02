import { diff as N } from "./utilities/diff.mjs";
import { generateCaptureableRegExp as P, CaptureableCharacterType as H, extractor as R } from "./utilities/extractor.mjs";
import { KanaType as y, kanaConverter as w } from "./utilities/kanaConverter.mjs";
var x = /* @__PURE__ */ ((f) => (f[f.REALTIME = 0] = "REALTIME", f[f.ENTER = 1] = "ENTER", f))(x || {});
function V(f, E, r = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: H.HIRAGANA
}) {
  const A = P(
    r.captureablePatterns ?? H.HIRAGANA
  ), a = typeof f == "string" ? document.querySelector(f) : f;
  if (!a)
    throw new Error("input element not found");
  let v = 0;
  function T() {
    const e = r.realtime && (r.realtime === !0 || r.realtime instanceof HTMLInputElement && r.realtime.checked), t = r.enter && (r.enter === !0 || r.enter instanceof HTMLInputElement && r.enter.checked);
    v = e || !t ? 0 : 1;
  }
  const i = [], I = (e) => {
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
      I(e);
  else
    I(E);
  let l = !1, u = "", p = "", s = "";
  const c = new Array(i.length).fill("");
  function L() {
    n("reset"), u = "", p = "", s = "";
    for (let e = 0; e < i.length; e++)
      c[e] = "";
  }
  function b() {
    u = a.value, i.forEach(({ element: e }, t) => {
      c[t] = e.value;
    }), n("setup", a.value, { defaultString: u, activeOutputs: i });
  }
  let o;
  function C() {
    n("start", { timer: o }), !o && (o = setInterval(() => {
      T(), M();
    }, r.observeInterval ?? 30));
  }
  function k() {
    n("end", { timer: o }), o && (clearInterval(o), o = void 0);
  }
  function M() {
    const e = a.value;
    if (n("observe", { observing: l, inputString: e, defaultString: u, currentString: p, outputValues: c }), e === "")
      return;
    const t = N(u, e);
    p !== t.diff && (p = t.diff, l && m(p));
  }
  function m(e) {
    n("set", { defaultString: u, string: e, inputValue: s, outputValues: c });
    const t = R({
      input: e,
      patterns: A
    });
    t.length === e.length && (s = t), i.forEach(({ element: d, type: _ }, g) => {
      const h = w(_, s);
      n("converted", { type: _, string: e, inputValue: s, after: h, before: c[g] }), v === 0 ? d.value = c[g] + h : v === 1 && (d.dataset.kana = c[g] = h);
    });
  }
  function S() {
    i.forEach(({ element: e }) => {
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
    n("blur"), k();
  }), a.addEventListener("compositionstart", (e) => {
    n("compositionstart", { e }), b(), C(), l = !0;
  }), a.addEventListener("compositionend", (e) => {
    n("compositionend", { e }), k(), m(s), L(), l = !1;
  }), a.addEventListener("beforeinput", (e) => {
    if (n("beforeinput", { observing: l, e }), !l && !e.isComposing && e.data) {
      const t = e.data, d = R({
        input: t,
        patterns: A
      });
      t && t === d && (b(), m(t));
    }
  }), a.addEventListener("keyup", (e) => {
    n("keyup", { observing: l, e }), e.code === "Enter" && (r.clearOnInputEmpty && a.value === "" ? (L(), m("")) : v === 1 && S());
  });
}
export {
  H as CaptureableCharacterType,
  y as KanaType,
  x as OutputTiming,
  V as setupObserver
};
//# sourceMappingURL=observer.mjs.map
