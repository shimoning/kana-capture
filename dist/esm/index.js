import { diff as q } from "./utilities/diff.js";
import { generateCapturableRegExp as D, CapturableCharacterType as x, extractor as C } from "./utilities/extractor.js";
import { KanaType as I, kanaConverter as G } from "./utilities/kanaConverter.js";
/**
 * @license
 * KanaCapture v0.3.0
 * Copyright (c) 2025 Shimoning, Inc.
 * Released under the MIT License.
 */
var V = /* @__PURE__ */ ((c) => (c[c.REALTIME = 0] = "REALTIME", c[c.ENTER = 1] = "ENTER", c))(V || {});
function J(c, E, r = {
  observeInterval: 30,
  debug: !1,
  realtime: !0,
  enter: !1,
  clearOnInputEmpty: !1,
  capturablePatterns: x.HIRAGANA
}) {
  const L = D(
    r.capturablePatterns ?? x.HIRAGANA
  ), n = typeof c == "string" ? document.querySelector(c) : c;
  if (!n)
    throw new Error("input element not found");
  let s = 0;
  const k = r.realtime instanceof HTMLInputElement, A = r.enter instanceof HTMLInputElement, T = !k && !A;
  function m() {
    const e = r.realtime && (r.realtime === !0 || r.realtime instanceof HTMLInputElement && r.realtime.checked), t = r.enter && (r.enter === !0 || r.enter instanceof HTMLInputElement && r.enter.checked);
    s = e || !t ? 0 : 1;
  }
  T && m(), a("outputTiming", { outputTiming: s, outputTimingIsStatic: T, realtimeIsDynamic: k, enterIsDynamic: A });
  const u = [], _ = (e) => {
    if (typeof e == "string") {
      const t = document.querySelectorAll(e);
      for (const o of t)
        u.push({ element: o, type: I.Hiragana });
    } else e instanceof HTMLInputElement ? u.push({ element: e, type: I.Hiragana }) : u.push({
      element: e.element,
      type: e.type ?? I.Hiragana
    });
  };
  if (Array.isArray(E))
    for (const e of E)
      _(e);
  else
    _(E);
  let f = !1, d = "", p = "", b = "";
  const v = new Array(u.length).fill("");
  function H() {
    a("reset"), d = "", p = "", b = "";
    for (let e = 0; e < u.length; e++)
      v[e] = "";
  }
  function h() {
    d = n.value, u.forEach(({ element: e }, t) => {
      v[t] = e.value;
    }), a("setup", n.value, { defaultString: d, activeOutputs: u });
  }
  let i;
  function B() {
    a("start", { timer: i }), !i && (i = setInterval(() => {
      N();
    }, r.observeInterval ?? 30));
  }
  function M() {
    a("end", { timer: i }), i && (clearInterval(i), i = void 0);
  }
  function N() {
    const e = n.value;
    if (a("observe", { composing: f, inputString: e, defaultString: d, currentString: p, outputValues: v }), e === "")
      return;
    const t = q(d, e);
    p !== t.diff && (p = t.diff, g(p));
  }
  function g(e) {
    a("set", { defaultString: d, string: e, inputValue: b, outputValues: v });
    const t = C({
      input: e,
      patterns: L
    });
    t.length === e.length && (b = t), u.forEach(({ element: o, type: K }, w) => {
      const y = G(K, b);
      a("converted", { type: K, string: e, inputValue: b, after: y, before: v[w], bufferKana: o.dataset.bufferKana, bufferOther: o.dataset.bufferOther }), s === 0 ? o.value = v[w] + y : s === 1 && P(o, y);
    });
  }
  function O(e) {
    const t = C({
      input: e,
      patterns: L
    });
    e && e === t && (h(), g(t));
  }
  function P(e, t) {
    a("set buffer", { composing: f, element: e, string: t }), f ? e.dataset.bufferKana = t : e.dataset.bufferOther = (e.dataset.bufferOther ?? "") + t;
  }
  function R(e) {
    a("clear buffer"), e.dataset.bufferOther = "", e.dataset.bufferKana = "";
  }
  function S(e = !1) {
    u.forEach(({ element: t }) => {
      if (e) {
        t.value = "", R(t);
        return;
      }
      const o = (t.dataset.bufferOther ?? "") + (t.dataset.bufferKana ?? "");
      o && (t.value += o, R(t));
    });
  }
  function a(e, ...t) {
    if (r.debug) {
      if (t.length === 0) {
        console.log("%c[debug]", "background-color: #ff6d13; color: #fffafa;", { message: e });
        return;
      }
      console.log("%c[debug]", "background-color: #ff6d13; color: #fffafa;", { message: e }, ...t);
    }
  }
  function l(e, ...t) {
    if (r.event) {
      if (t.length === 0) {
        console.info("%c[event]", "background-color: #fffafa; color: #303030;", { message: e });
        return;
      }
      console.info("%c[event]", "background-color: #fffafa; color: #303030;", { message: e }, ...t);
    }
  }
  n.addEventListener("focus", (e) => {
    l("focus", { e }), h();
  }), n.addEventListener("blur", (e) => {
    l("blur", { e }), M();
  }), n.addEventListener("compositionstart", (e) => {
    l("compositionstart", { e }), h(), B(), f = !0;
  }), n.addEventListener("compositionend", (e) => {
    l("compositionend", { e, inputValue: b }), M(), H(), f = !1, ["　", " "].includes(e.data) && (a("spaces", '"' + e.data + '"'), O(e.data));
  }), n.addEventListener("beforeinput", (e) => {
    l("beforeinput", { composing: f, e }), !f && !e.isComposing && e.data && O(e.data);
  }), n.addEventListener("input", (e) => {
    l("input", { composing: f, e });
  }), n.addEventListener("keydown", (e) => {
    l("keydown", { composing: f, e });
  }), n.addEventListener("keyup", (e) => {
    if (l("keyup", { composing: f, e }, e.code), e.code === "Enter") {
      let t = !1;
      r.clearOnInputEmpty && n.value === "" && (t = !0, H(), g("")), s === 1 && S(t);
    }
    e.code === "Backspace" && a("backspace", { outputTiming: s }, n.value);
  }), r.realtime instanceof HTMLInputElement && r.realtime.addEventListener("change", () => {
    a("realtime change"), m(), S();
  }), r.enter instanceof HTMLInputElement && r.enter.addEventListener("change", () => {
    a("enter change"), m();
  });
}
export {
  x as CapturableCharacterType,
  I as KanaType,
  V as OutputTiming,
  J as setupObserver
};
//# sourceMappingURL=index.js.map
