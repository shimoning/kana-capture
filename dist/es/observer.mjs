import { KanaType as b, kanaConverter as H } from "./utilities/kanaConverter.mjs";
var T = /* @__PURE__ */ ((t) => (t[t.REALTIME = 0] = "REALTIME", t[t.ENTER = 1] = "ENTER", t))(T || {});
const R = /[^ 　ぁあ-んー]/g, w = /[ぁぃぅぇぉっゃゅょ]/g;
function M(t, m, a = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1
}) {
  let d = 0;
  function k() {
    const e = a.realtime && (a.realtime === !0 || a.realtime instanceof HTMLInputElement && a.realtime.checked), n = a.enter && (a.enter === !0 || a.enter instanceof HTMLInputElement && a.enter.checked);
    d = e || !n ? 0 : 1;
  }
  const l = [];
  if (typeof m == "string") {
    const e = document.querySelectorAll(m);
    for (const n of e)
      l.push({ element: n, type: b.Hiragana });
  } else
    for (const e of m)
      if (typeof e == "string") {
        const n = document.querySelectorAll(e);
        for (const v of n)
          l.push({ element: v, type: b.Hiragana });
      } else
        l.push({
          element: e.element,
          type: e.type ?? b.Hiragana
        });
  let c = !1, f = "", i = "", u = "";
  const o = new Array(l.length).fill("");
  function I() {
    r("reset"), f = "", i = "", u = "";
    for (let e = 0; e < l.length; e++)
      o[e] = "";
  }
  function E() {
    f = t.value, l.forEach(({ element: e }, n) => {
      o[n] = e.value;
    }), r("setup", t.value, { defaultString: f, activeOutputs: l });
  }
  let s;
  function L() {
    r("start", { timer: s }), !s && (s = setInterval(() => {
      k(), _();
    }, a.observeInterval ?? 30));
  }
  function p() {
    r("end"), s && (clearInterval(s), s = void 0);
  }
  function _() {
    let e = t.value;
    if (r("observe", { compositing: c, inputString: e, defaultString: f, currentString: i, outputValues: o }), e === "" || (e.indexOf(f) !== -1 && (e = e.replace(f, "")), i === e) || (i = e, !c))
      return;
    const n = i.replace(R, "");
    h(n);
  }
  function h(e) {
    r("set", { defaultString: f, hiraganaString: e, inputValue: u, outputValues: o }), e.length && (u = e), l.forEach(({ element: n, type: v }, g) => {
      const y = H(v, u);
      r("converted", { type: v, inputValue: u, after: y, before: o[g] }), d === 0 ? n.value = o[g] + y : d === 1 && (n.dataset.kana = o[g] = y);
    });
  }
  function A() {
    l.forEach(({ element: e }) => {
      e.dataset.kana && (e.value += e.dataset.kana, e.removeAttribute("data-kana"));
    });
  }
  function r(e, ...n) {
    if (a.debug) {
      if (n.length === 0) {
        console.info("debug", { message: e });
        return;
      }
      console.info("debug", { message: e }, ...n);
    }
  }
  t.addEventListener("focus", () => {
    r("focus"), E();
  }), t.addEventListener("blur", () => {
    r("blur"), p();
  }), t.addEventListener("compositionstart", (e) => {
    r("compositionstart", { e }), E(), L(), c = !0;
  }), t.addEventListener("compositionend", (e) => {
    r("compositionend", { e }), p(), c = !1;
  }), t.addEventListener("keydown", (e) => {
    r("keydown", { compositing: c, e }), c || E(), e.code === "Enter" && (a.clearOnInputEmpty && t.value === "" ? (I(), h("")) : d === 1 && A());
  }), t.addEventListener("keyup", (e) => {
    r("keyup", { compositing: c, e });
  });
}
export {
  R as AntiHiraganaPattern,
  w as CompactHiraganaPattern,
  b as KanaType,
  T as OutputMode,
  H as kanaConverter,
  M as setupObserver
};
//# sourceMappingURL=observer.mjs.map
