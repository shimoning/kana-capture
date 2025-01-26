function u(a, e) {
  if (!a.length || !e.length)
    return {
      before: a,
      after: e,
      diff: e,
      same: "",
      gap: 0
    };
  if (a === e)
    return {
      before: a,
      after: e,
      diff: "",
      same: a,
      gap: 0
    };
  const f = a.split(""), h = e.split(""), o = Math.max(f.length, h.length), l = [], p = [];
  let t = 0;
  for (let s = 0; s < o; s++) {
    const r = f[s];
    for (let c = s + t; c < o; c++, t++) {
      const n = h[c];
      if (r === n) {
        l.push(r);
        break;
      }
      p.push(n);
    }
  }
  return {
    before: a,
    after: e,
    diff: p.join(""),
    same: l.join(""),
    gap: t
  };
}
export {
  u as diff
};
//# sourceMappingURL=diff.mjs.map
