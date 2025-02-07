import { diff as P } from "./utilities/diff.js";
import { generateCaptureableRegExp as w, CaptureableCharacterType as S, extractor as C } from "./utilities/extractor.js";
import { KanaType as I, kanaConverter as q } from "./utilities/kanaConverter.js";
var D = /* @__PURE__ */ ((c) => (c[c.REALTIME = 0] = "REALTIME", c[c.ENTER = 1] = "ENTER", c))(D || {});
function z(c, v, r = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  captureablePatterns: S.HIRAGANA
}) {
  const y = w(
    r.captureablePatterns ?? S.HIRAGANA
  ), a = typeof c == "string" ? document.querySelector(c) : c;
  if (!a)
    throw new Error("input element not found");
  let s = 0;
  const L = r.realtime instanceof HTMLInputElement, T = r.enter instanceof HTMLInputElement, A = !L && !T;
  function E() {
    const e = r.realtime && (r.realtime === !0 || r.realtime instanceof HTMLInputElement && r.realtime.checked), t = r.enter && (r.enter === !0 || r.enter instanceof HTMLInputElement && r.enter.checked);
    s = e || !t ? 0 : 1;
  }
  A && E(), n("outputTiming", { outputTiming: s, outputTimingIsStatic: A, realtimeIsDynamic: L, enterIsDynamic: T });
  const u = [], H = (e) => {
    if (typeof e == "string") {
      const t = document.querySelectorAll(e);
      for (const f of t)
        u.push({ element: f, type: I.Hiragana });
    } else e instanceof HTMLInputElement ? u.push({ element: e, type: I.Hiragana }) : u.push({
      element: e.element,
      type: e.type ?? I.Hiragana
    });
  };
  if (Array.isArray(v))
    for (const e of v)
      H(e);
  else
    H(v);
  let i = !1, o = "", m = "", d = "";
  const b = new Array(u.length).fill("");
  function _() {
    n("reset"), o = "", m = "", d = "";
    for (let e = 0; e < u.length; e++)
      b[e] = "";
  }
  function h() {
    o = a.value, u.forEach(({ element: e }, t) => {
      b[t] = e.value;
    }), n("setup", a.value, { defaultString: o, activeOutputs: u });
  }
  let l;
  function x() {
    n("start", { timer: l }), !l && (l = setInterval(() => {
      B();
    }, r.observeInterval ?? 30));
  }
  function M() {
    n("end", { timer: l }), l && (clearInterval(l), l = void 0);
  }
  function B() {
    const e = a.value;
    if (n("observe", { observing: i, inputString: e, defaultString: o, currentString: m, outputValues: b }), e === "")
      return;
    const t = P(o, e);
    m !== t.diff && (m = t.diff, i && p(m));
  }
  function p(e) {
    n("set", { defaultString: o, string: e, inputValue: d, outputValues: b });
    const t = C({
      input: e,
      patterns: y
    });
    t.length === e.length && (d = t), u.forEach(({ element: f, type: R }, K) => {
      const g = q(R, d);
      n("converted", { type: R, string: e, inputValue: d, after: g, before: b[K], bufferKana: f.dataset.bufferKana, bufferOther: f.dataset.bufferOther }), s === 0 ? f.value = b[K] + g : s === 1 && N(f, g);
    });
  }
  function N(e, t) {
    i ? e.dataset.bufferKana = t : e.dataset.bufferOther = (e.dataset.bufferOther ?? "") + t;
  }
  function k(e) {
    console.log("clear buffer"), e.dataset.bufferOther = "", e.dataset.bufferKana = "";
  }
  function O(e = !1) {
    u.forEach(({ element: t }) => {
      if (e) {
        t.value = "", k(t);
        return;
      }
      const f = (t.dataset.bufferOther ?? "") + (t.dataset.bufferKana ?? "");
      f && (t.value += f, k(t));
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
    n("focus"), h();
  }), a.addEventListener("blur", () => {
    n("blur"), M();
  }), a.addEventListener("compositionstart", (e) => {
    n("compositionstart", { e }), h(), x(), i = !0;
  }), a.addEventListener("compositionend", (e) => {
    n("compositionend", { e }), M(), p(d), _(), i = !1;
  }), a.addEventListener("beforeinput", (e) => {
    if (n("beforeinput", { observing: i, e }), !i && !e.isComposing && e.data) {
      const t = e.data, f = C({
        input: t,
        patterns: y
      });
      t && t === f && (h(), p(t));
    }
  }), a.addEventListener("keyup", (e) => {
    if (n("keyup", e.code, { observing: i, e }), e.code === "Enter") {
      let t = !1;
      r.clearOnInputEmpty && a.value === "" && (t = !0, _(), p("")), s === 1 && O(t);
    }
    e.code === "Backspace" && n("backspace", { outputTiming: s }, a.value);
  }), r.realtime instanceof HTMLInputElement && r.realtime.addEventListener("change", () => {
    n("realtime change"), E(), O();
  }), r.enter instanceof HTMLInputElement && r.enter.addEventListener("change", () => {
    n("enter change"), E();
  });
}
export {
  S as CaptureableCharacterType,
  I as KanaType,
  D as OutputTiming,
  z as setupObserver
};
//# sourceMappingURL=index.js.map
