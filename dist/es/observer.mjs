import { CaptureableCharacterType as I, extractor as R } from "./utilities/extractor.mjs";
import { KanaType as g, kanaConverter as w } from "./utilities/kanaConverter.mjs";
var S = /* @__PURE__ */ ((t) => (t[t.REALTIME = 0] = "REALTIME", t[t.ENTER = 1] = "ENTER", t))(S || {});
function M(t, m, a = {
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
  let c = !1, o = "", i = "", f = "";
  const u = new Array(l.length).fill("");
  function h() {
    n("reset"), o = "", i = "", f = "";
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
      L(), T();
    }, a.observeInterval ?? 30));
  }
  function k() {
    n("end", { timer: s }), s && (clearInterval(s), s = void 0);
  }
  function T() {
    let e = t.value;
    n("observe", { compositing: c, inputString: e, defaultString: o, currentString: i, outputValues: u }), e !== "" && (e = e.replace(
      new RegExp("[" + o + "]", "g"),
      ""
    ), i !== e && (i = e, c && p(i)));
  }
  function p(e) {
    n("set", { defaultString: o, string: e, inputValue: f, outputValues: u });
    const r = R({
      input: e,
      patterns: a.captureablePatterns ?? I.HIRAGANA
    });
    console.warn({ extracted: r, string: e, inputValue: f, defaultString: o }), r.length === e.length && (f = r), l.forEach(({ element: v, type: A }, b) => {
      const y = w(A, f);
      n("converted", { type: A, string: e, inputValue: f, after: y, before: u[b] }), d === 0 ? v.value = u[b] + y : d === 1 && (v.dataset.kana = u[b] = y);
    });
  }
  function H() {
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
    n("compositionstart", { e }), E(), _(), c = !0;
  }), t.addEventListener("compositionend", (e) => {
    n("compositionend", { e }), k(), p(f), h(), c = !1;
  }), t.addEventListener("keydown", (e) => {
    n("keydown", { compositing: c, e }), c || E(), e.code === "Enter" && (a.clearOnInputEmpty && t.value === "" ? (h(), p("")) : d === 1 && H());
  }), t.addEventListener("keyup", (e) => {
    n("keyup", { compositing: c, e });
  });
}
export {
  I as CaptureableCharacterType,
  g as KanaType,
  S as OutputMode,
  M as setupObserver
};
//# sourceMappingURL=observer.mjs.map
