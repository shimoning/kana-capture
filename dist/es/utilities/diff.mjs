function u(a, e) {
  if (!a.length)
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
  const c = a.split(""), h = e.split(""), o = Math.max(c.length, h.length), r = [], l = [];
  let t = 0;
  for (let s = 0; s < o; s++) {
    const p = c[s];
    for (let f = s + t; f < o; f++, t++) {
      const n = h[f];
      if (p === n) {
        r.push(p);
        break;
      }
      l.push(n);
    }
  }
  return {
    before: a,
    after: e,
    diff: l.join(""),
    same: r.join(""),
    gap: t
  };
}
export {
  u as diff
};
//# sourceMappingURL=diff.mjs.map
