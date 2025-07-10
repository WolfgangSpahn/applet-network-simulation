import { sharedConfig as re, untrack as st, createRenderEffect as y, $PROXY as ae, batch as zt, $TRACK as tt, getListener as ze, createSignal as p, onMount as Ee, onCleanup as Be, createComponent as E, createEffect as We, For as lt, createMemo as X, Show as Bt } from "solid-js";
function Rt(e, t, l) {
  let r = l.length, i = t.length, n = r, s = 0, o = 0, a = t[i - 1].nextSibling, f = null;
  for (; s < i || o < n; ) {
    if (t[s] === l[o]) {
      s++, o++;
      continue;
    }
    for (; t[i - 1] === l[n - 1]; )
      i--, n--;
    if (i === s) {
      const h = n < r ? o ? l[o - 1].nextSibling : l[n - o] : a;
      for (; o < n; ) e.insertBefore(l[o++], h);
    } else if (n === o)
      for (; s < i; )
        (!f || !f.has(t[s])) && t[s].remove(), s++;
    else if (t[s] === l[n - 1] && l[o] === t[i - 1]) {
      const h = t[--i].nextSibling;
      e.insertBefore(l[o++], t[s++].nextSibling), e.insertBefore(l[--n], h), t[i] = l[n];
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let m = o;
        for (; m < n; ) f.set(l[m], m++);
      }
      const h = f.get(t[s]);
      if (h != null)
        if (o < h && h < n) {
          let m = s, $ = 1, u;
          for (; ++m < i && m < n && !((u = f.get(t[m])) == null || u !== h + $); )
            $++;
          if ($ > h - o) {
            const b = t[s];
            for (; o < h; ) e.insertBefore(l[o++], b);
          } else e.replaceChild(l[o++], t[s++]);
        } else s++;
      else t[s++].remove();
    }
  }
}
const nt = "_$DX_DELEGATE";
function w(e, t, l) {
  let r;
  const i = () => {
    const s = document.createElement("template");
    return s.innerHTML = e, l ? s.content.firstChild.firstChild : s.content.firstChild;
  }, n = t ? () => st(() => document.importNode(r || (r = i()), !0)) : () => (r || (r = i())).cloneNode(!0);
  return n.cloneNode = n, n;
}
function V(e, t = window.document) {
  const l = t[nt] || (t[nt] = /* @__PURE__ */ new Set());
  for (let r = 0, i = e.length; r < i; r++) {
    const n = e[r];
    l.has(n) || (l.add(n), t.addEventListener(n, Wt));
  }
}
function S(e, t, l) {
  Ze(e) || (l == null ? e.removeAttribute(t) : e.setAttribute(t, l));
}
function _e(e, t) {
  Ze(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function U(e, t, l, r) {
  Array.isArray(l) ? (e[`$$${t}`] = l[0], e[`$$${t}Data`] = l[1]) : e[`$$${t}`] = l;
}
function Yt(e, t, l) {
  return st(() => e(t, l));
}
function v(e, t, l, r) {
  if (l !== void 0 && !r && (r = []), typeof t != "function") return Ce(e, t, r, l);
  y((i) => Ce(e, t(), i, l), r);
}
function Ze(e) {
  return !!re.context && !re.done && (!e || e.isConnected);
}
function Wt(e) {
  if (re.registry && re.events && re.events.find(([a, f]) => f === e))
    return;
  let t = e.target;
  const l = `$$${e.type}`, r = e.target, i = e.currentTarget, n = (a) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: a
  }), s = () => {
    const a = t[l];
    if (a && !t.disabled) {
      const f = t[`${l}Data`];
      if (f !== void 0 ? a.call(t, f, e) : a.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && n(t.host), !0;
  }, o = () => {
    for (; s() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), re.registry && !re.done && (re.done = _$HY.done = !0), e.composedPath) {
    const a = e.composedPath();
    n(a[0]);
    for (let f = 0; f < a.length - 2 && (t = a[f], !!s()); f++) {
      if (t._$host) {
        t = t._$host, o();
        break;
      }
      if (t.parentNode === i)
        break;
    }
  } else o();
  n(r);
}
function Ce(e, t, l, r, i) {
  const n = Ze(e);
  if (n) {
    !l && (l = [...e.childNodes]);
    let a = [];
    for (let f = 0; f < l.length; f++) {
      const h = l[f];
      h.nodeType === 8 && h.data.slice(0, 2) === "!$" ? h.remove() : a.push(h);
    }
    l = a;
  }
  for (; typeof l == "function"; ) l = l();
  if (t === l) return l;
  const s = typeof t, o = r !== void 0;
  if (e = o && l[0] && l[0].parentNode || e, s === "string" || s === "number") {
    if (n || s === "number" && (t = t.toString(), t === l))
      return l;
    if (o) {
      let a = l[0];
      a && a.nodeType === 3 ? a.data !== t && (a.data = t) : a = document.createTextNode(t), l = ge(e, l, r, a);
    } else
      l !== "" && typeof l == "string" ? l = e.firstChild.data = t : l = e.textContent = t;
  } else if (t == null || s === "boolean") {
    if (n) return l;
    l = ge(e, l, r);
  } else {
    if (s === "function")
      return y(() => {
        let a = t();
        for (; typeof a == "function"; ) a = a();
        l = Ce(e, a, l, r);
      }), () => l;
    if (Array.isArray(t)) {
      const a = [], f = l && Array.isArray(l);
      if (Re(a, t, l, i))
        return y(() => l = Ce(e, a, l, r, !0)), () => l;
      if (n) {
        if (!a.length) return l;
        if (r === void 0) return l = [...e.childNodes];
        let h = a[0];
        if (h.parentNode !== e) return l;
        const m = [h];
        for (; (h = h.nextSibling) !== r; ) m.push(h);
        return l = m;
      }
      if (a.length === 0) {
        if (l = ge(e, l, r), o) return l;
      } else f ? l.length === 0 ? it(e, a, r) : Rt(e, l, a) : (l && ge(e), it(e, a));
      l = a;
    } else if (t.nodeType) {
      if (n && t.parentNode) return l = o ? [t] : t;
      if (Array.isArray(l)) {
        if (o) return l = ge(e, l, r, t);
        ge(e, l, null, t);
      } else l == null || l === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      l = t;
    }
  }
  return l;
}
function Re(e, t, l, r) {
  let i = !1;
  for (let n = 0, s = t.length; n < s; n++) {
    let o = t[n], a = l && l[e.length], f;
    if (!(o == null || o === !0 || o === !1)) if ((f = typeof o) == "object" && o.nodeType)
      e.push(o);
    else if (Array.isArray(o))
      i = Re(e, o, a) || i;
    else if (f === "function")
      if (r) {
        for (; typeof o == "function"; ) o = o();
        i = Re(
          e,
          Array.isArray(o) ? o : [o],
          Array.isArray(a) ? a : [a]
        ) || i;
      } else
        e.push(o), i = !0;
    else {
      const h = String(o);
      a && a.nodeType === 3 && a.data === h ? e.push(a) : e.push(document.createTextNode(h));
    }
  }
  return i;
}
function it(e, t, l = null) {
  for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], l);
}
function ge(e, t, l, r) {
  if (l === void 0) return e.textContent = "";
  const i = r || document.createTextNode("");
  if (t.length) {
    let n = !1;
    for (let s = t.length - 1; s >= 0; s--) {
      const o = t[s];
      if (i !== o) {
        const a = o.parentNode === e;
        !n && !s ? a ? e.replaceChild(i, o) : e.insertBefore(i, l) : a && o.remove();
      } else n = !0;
    }
  } else e.insertBefore(i, l);
  return [i];
}
const Ye = Symbol("store-raw"), he = Symbol("store-node"), ee = Symbol("store-has"), at = Symbol("store-self");
function ct(e) {
  let t = e[ae];
  if (!t && (Object.defineProperty(e, ae, {
    value: t = new Proxy(e, Gt)
  }), !Array.isArray(e))) {
    const l = Object.keys(e), r = Object.getOwnPropertyDescriptors(e);
    for (let i = 0, n = l.length; i < n; i++) {
      const s = l[i];
      r[s].get && Object.defineProperty(e, s, {
        enumerable: r[s].enumerable,
        get: r[s].get.bind(t)
      });
    }
  }
  return t;
}
function Se(e) {
  let t;
  return e != null && typeof e == "object" && (e[ae] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function me(e, t = /* @__PURE__ */ new Set()) {
  let l, r, i, n;
  if (l = e != null && e[Ye]) return l;
  if (!Se(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
    for (let s = 0, o = e.length; s < o; s++)
      i = e[s], (r = me(i, t)) !== i && (e[s] = r);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
    const s = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
    for (let a = 0, f = s.length; a < f; a++)
      n = s[a], !o[n].get && (i = e[n], (r = me(i, t)) !== i && (e[n] = r));
  }
  return e;
}
function Ae(e, t) {
  let l = e[t];
  return l || Object.defineProperty(e, t, {
    value: l = /* @__PURE__ */ Object.create(null)
  }), l;
}
function be(e, t, l) {
  if (e[t]) return e[t];
  const [r, i] = p(l, {
    equals: !1,
    internal: !0
  });
  return r.$ = i, e[t] = r;
}
function Zt(e, t) {
  const l = Reflect.getOwnPropertyDescriptor(e, t);
  return !l || l.get || !l.configurable || t === ae || t === he || (delete l.value, delete l.writable, l.get = () => e[ae][t]), l;
}
function dt(e) {
  ze() && be(Ae(e, he), at)();
}
function qt(e) {
  return dt(e), Reflect.ownKeys(e);
}
const Gt = {
  get(e, t, l) {
    if (t === Ye) return e;
    if (t === ae) return l;
    if (t === tt)
      return dt(e), l;
    const r = Ae(e, he), i = r[t];
    let n = i ? i() : e[t];
    if (t === he || t === ee || t === "__proto__") return n;
    if (!i) {
      const s = Object.getOwnPropertyDescriptor(e, t);
      ze() && (typeof n != "function" || e.hasOwnProperty(t)) && !(s && s.get) && (n = be(r, t, n)());
    }
    return Se(n) ? ct(n) : n;
  },
  has(e, t) {
    return t === Ye || t === ae || t === tt || t === he || t === ee || t === "__proto__" ? !0 : (ze() && be(Ae(e, ee), t)(), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: qt,
  getOwnPropertyDescriptor: Zt
};
function Te(e, t, l, r = !1) {
  if (!r && e[t] === l) return;
  const i = e[t], n = e.length;
  l === void 0 ? (delete e[t], e[ee] && e[ee][t] && i !== void 0 && e[ee][t].$()) : (e[t] = l, e[ee] && e[ee][t] && i === void 0 && e[ee][t].$());
  let s = Ae(e, he), o;
  if ((o = be(s, t, i)) && o.$(() => l), Array.isArray(e) && e.length !== n) {
    for (let a = e.length; a < n; a++) (o = s[a]) && o.$();
    (o = be(s, "length", n)) && o.$(e.length);
  }
  (o = s[at]) && o.$();
}
function ft(e, t) {
  const l = Object.keys(t);
  for (let r = 0; r < l.length; r += 1) {
    const i = l[r];
    Te(e, i, t[i]);
  }
}
function Ut(e, t) {
  if (typeof t == "function" && (t = t(e)), t = me(t), Array.isArray(t)) {
    if (e === t) return;
    let l = 0, r = t.length;
    for (; l < r; l++) {
      const i = t[l];
      e[l] !== i && Te(e, l, i);
    }
    Te(e, "length", r);
  } else ft(e, t);
}
function $e(e, t, l = []) {
  let r, i = e;
  if (t.length > 1) {
    r = t.shift();
    const s = typeof r, o = Array.isArray(e);
    if (Array.isArray(r)) {
      for (let a = 0; a < r.length; a++)
        $e(e, [r[a]].concat(t), l);
      return;
    } else if (o && s === "function") {
      for (let a = 0; a < e.length; a++)
        r(e[a], a) && $e(e, [a].concat(t), l);
      return;
    } else if (o && s === "object") {
      const { from: a = 0, to: f = e.length - 1, by: h = 1 } = r;
      for (let m = a; m <= f; m += h)
        $e(e, [m].concat(t), l);
      return;
    } else if (t.length > 1) {
      $e(e[r], t, [r].concat(l));
      return;
    }
    i = e[r], l = [r].concat(l);
  }
  let n = t[0];
  typeof n == "function" && (n = n(i, l), n === i) || r === void 0 && n == null || (n = me(n), r === void 0 || Se(i) && Se(n) && !Array.isArray(n) ? ft(i, n) : Te(e, r, n));
}
function ut(...[e, t]) {
  const l = me(e || {}), r = Array.isArray(l), i = ct(l);
  function n(...s) {
    zt(() => {
      r && s.length === 1 ? Ut(l, s[0]) : $e(l, s);
    });
  }
  return [i, n];
}
const [Jt, Pe] = p({ x: 30, y: 40, text: "-" });
var Kt = /* @__PURE__ */ w("<svg><g></svg>", !1, !0);
function qe(e) {
  Ee(() => {
    Pe({
      x: e.x,
      y: e.y,
      text: e.text
    });
  }), Be(() => {
    Pe(null);
  });
  const t = (r) => {
    r.currentTarget.getBoundingClientRect();
    const i = r.currentTarget.ownerSVGElement.getBoundingClientRect(), n = r.clientX - i.left, s = r.clientY - i.top;
    Pe({
      x: n,
      y: s,
      text: e.text
    });
  }, l = () => {
    Pe(null);
  };
  return (() => {
    var r = Kt();
    return r.addEventListener("mouseleave", l), r.addEventListener("mouseenter", t), v(r, () => e.children), r;
  })();
}
var Qt = /* @__PURE__ */ w('<svg><g><path fill=#1a202c stroke=#ffffff stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 27.467192,9.3368497 H 38.081364 V 6.6590449 l 6.078743,5.3556111 -6.078743,5.355609 V 14.692459 H 27.467192 Z"fill-rule=evenodd id=path3></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="m 28.351706,29.007584 h 10.614172 v -2.677807 l 6.078743,5.35561 -6.078743,5.355608 v -2.6778 H 28.351706 Z"fill-rule=evenodd id=path4></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 23.860893,19.267895 H 13.246719 v -2.677807 l -6.07874,5.355612 6.07874,5.355609 v -2.677806 h 10.614174 z"fill-rule=evenodd id=path5></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 23.860893,36.9079 H 13.246719 v -2.677804 l -6.07874,5.355609 6.07874,5.355609 v -2.677808 h 10.614174 z"fill-rule=evenodd id=path6></path><path fill=lightblue transform=translate(8,5) d="M9.12 8c0 .49-.4.89-.89.89s-.89-.4-.89-.89.4-.89.89-.89.89.4.89.89zm-3.2-2.42.84.84c.38-.38.89-.62 1.46-.62s1.08.24 1.46.62l.84-.84c-.59-.59-1.41-.96-2.3-.96s-1.71.37-2.3.96zm-1.67-1.67.84.84c.81-.81 1.92-1.31 3.16-1.31 1.24 0 2.35.5 3.16 1.31l.84-.84c-1.08-1.08-2.58-1.75-4.25-1.75s-3.17.67-4.25 1.75zm4.25-4.25c-2.62 0-5 1.06-6.72 2.79l.84.84c1.46-1.46 3.48-2.37 5.72-2.37s4.26.91 5.72 2.37l.84-.84c-1.72-1.73-4.1-2.79-6.72-2.79z"fill-rule=evenodd></path><text x=37 y=43.5 fill=white stroke=white stroke-width=0.4 font-size=5 text-anchor=middle>DHCP</svg>', !1, !0);
const el = (e) => E(qe, {
  x: 10,
  y: 480,
  text: "Switch Funktion des WLAN-Routers",
  get children() {
    var t = Qt();
    return U(t, "click", e.onClick), y(() => S(t, "transform", `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`)), t;
  }
});
V(["click"]);
var tl = /* @__PURE__ */ w('<svg><g><g><circle cx=25 cy=25 r=25 fill=#1a202c></circle><path d="M 27,-0.5 C 4.280346,-0.5 -7.093581,26.967033 8.969693,43.030307 25.032967,59.093581 52.5,47.719654 52.5,25 52.5,10.916739 41.08326,-0.5 27,-0.5 Z m -6.59812,13.14844 c 0.497667,-0.496459 1.303263,-0.496459 1.80093,0 L 25.725,16.13875 V 6.28937 c 6.73e-4,-1.699326 2.550673,-1.699326 2.55,0 v 9.84938 l 3.50625,-3.49031 c 1.211263,-1.204958 3.016518,0.616265 1.80094,1.81687 L 27,20.98375 20.40188,14.44937 c -0.496459,-0.497667 -0.496459,-1.303263 0,-1.80093 z M 14.76,31.48656 c 0.702959,0 -1.303272,0.496465 -1.80094,0 L 6.28125,25 12.95906,18.48156 c 1.210843,-1.310625 3.116852,0.629426 1.785,1.81688 l -3.50625,3.41062 h 9.99282 c 1.699047,9.52e-4 1.699047,2.550952 0,2.55 h -9.99282 l 3.50625,3.42656 c 0.500886,0.493273 -0.687098,1.80094 0.0159,1.80094 z m 18.83813,5.84906 c -0.497668,0.496465 -1.303272,0.496465 -1.80094,0 L 28.275,33.86125 v 9.83344 c -6.73e-4,1.699326 -2.550673,1.699326 -2.55,0 v -9.83344 l -3.50625,3.49031 c -1.211258,1.203503 -3.015063,-0.616257 -1.80094,-1.81687 L 27,29.00031 l 6.59813,6.53438 c 0.496459,0.497667 0.496459,1.303263 0,1.80093 z m 7.44281,-5.83312 c -1.21084,1.310625 -3.116852,-0.629426 -1.785,-1.81688 l 3.50625,-3.42656 h -9.97688 c -1.699047,-9.52e-4 -1.699047,-2.550952 0,-2.55 h 9.99282 l -3.50625,-3.41062 c -1.331852,-1.187454 0.57416,-3.127505 1.785,-1.81688 L 47.71875,25 Z"id=path2 stroke=none fill=white></svg>', !1, !0);
const ll = (e) => E(qe, {
  x: 10,
  y: 480,
  text: "Router Funktion des WLAN-Routers",
  get children() {
    var t = tl();
    return U(t, "click", e.onClick), y(() => S(t, "transform", `translate(${e.x - 27}, ${e.y - 25}) scale(${e.scale})`)), t;
  }
});
V(["click"]);
var nl = /* @__PURE__ */ w('<svg><g cursor=pointer><rect x=0 y=0 width=30 height=30 fill=#1a202c></rect><path d="M 3.89,0 C 1.74,0 0,1.74 0,3.89 v 17.5 c 0,2.15 1.74,3.89 3.89,3.89 l 9.074811,-0.06958 -0.302087,1.905209 L 9.73,27.22 c -1.0793167,0.03841 -1.94,0.87 -1.94,1.94 0,1.08 0.8700386,1.949087 1.94,1.94 l 12.289622,-0.104374 c 1.079961,-0.0092 1.835627,-1.183121 1.835627,-2.253121 0,-1.08 -0.871229,-1.819152 -1.94,-1.870418 l -2.901293,-0.139165 -0.197713,-1.782664 9.527097,-0.06958 c 2.149943,-0.0157 3.128292,-1.983543 3.124592,-3.820418 L 31.433141,3.7856262 C 31.41833,1.0789662 29.4,0 27.25,0 Z M 27.25,3.89 V 17.5 H 3.89 V 3.89 Z"></svg>', !1, !0);
const il = ({
  x: e,
  y: t,
  role: l,
  color: r,
  onClick: i
}) => (() => {
  var n = nl(), s = n.firstChild, o = s.nextSibling;
  return U(n, "click", i), S(n, "transform", `translate(${e - 17}, ${t - 10})`), S(o, "fill", r), n;
})();
V(["click"]);
var rl = /* @__PURE__ */ w('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path d="M 44.966127,13.05536 H 41.465515 V 7.9074012 A 4.9420396,4.9420396 0 0 0 36.755134,2.7594433 H 15.288149 A 4.9420396,4.9420396 0 0 0 10.577768,7.9074012 V 13.05536 H 7.0771574 a 6.846784,6.846784 0 0 0 -6.79530499,6.872524 v 17.1427 a 6.846784,6.846784 0 0 0 6.79530499,6.872523 h 2.213621 a 5.1479579,5.1479579 0 0 0 5.1479576,5.147958 h 23.165811 a 5.1479579,5.1479579 0 0 0 5.147958,-5.147958 h 2.213622 a 6.846784,6.846784 0 0 0 6.795304,-6.872523 v -17.1427 A 6.846784,6.846784 0 0 0 44.966127,13.05536 Z M 15.725725,7.9074012 H 36.317557 V 13.05536 H 15.725725 Z M 14.438736,43.943107 V 33.647192 h 23.165811 v 10.295915 z"id=path3 style=stroke-width:2.57398></svg>', !1, !0);
const ol = (e) => (() => {
  var t = rl(), l = t.firstChild, r = l.nextSibling;
  return U(t, "click", e.onClick), y((i) => {
    var n = `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`, s = e.color;
    return n !== i.e && S(t, "transform", i.e = n), s !== i.t && S(r, "fill", i.t = s), i;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
V(["click"]);
var sl = /* @__PURE__ */ w('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path d="M 3.25,4 C 1.4495,4 0,5.4495 0,7.25 v 32.5 C 0,41.5505 1.4495,43 3.25,43 H 6.4873048 L 0,49.487305 H 6.5 L 12.987305,43 h 26.02539 L 45.5,49.487305 H 52 L 45.512695,43 H 48.75 C 50.5505,43 52,41.5505 52,39.75 V 7.25 C 52,5.4495 50.5505,4 48.75,4 Z m 1.625,3.2373049 h 42.25 c 0,0 1.625,0 1.625,1.6249999 V 38.112306 c 0,1.625 -1.625,1.625 -1.625,1.625 H 4.875 c -1.625,0 -1.625,-1.625 -1.625,-1.625 V 8.8623048 c 0,0 0,-1.625 1.625,-1.6249999 z"id=path1 style=stroke-width:3.25></svg>', !1, !0);
const al = (e) => (() => {
  var t = sl(), l = t.firstChild, r = l.nextSibling;
  return U(t, "click", e.onClick), y((i) => {
    var n = `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`, s = e.color;
    return n !== i.e && S(t, "transform", i.e = n), s !== i.t && S(r, "fill", i.t = s), i;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
V(["click"]);
var cl = /* @__PURE__ */ w('<svg><g><g fill=#1a202c stroke=white stroke-linecap=round stroke-linejoin=round stroke-miterlimit=10 stroke-width=1.5 id=g3 transform=matrix(2.4257541,0,0,2.4257541,-3.1269462,-4.5157475)><path d="m 7.26906,13.0098 c -0.53,-0.27 -1.12,-0.41 -1.72,-0.41 -4.679998,0.33 -4.679998,7.14 0,7.47 H 16.6391 c 1.35,0.01 2.65,-0.49 3.64,-1.4 3.29,-2.87 1.53,-8.64 -2.8,-9.19004 -1.56,-9.370003 -15.09004,-5.81 -11.88004,3.12004"id=path1></path><text x=9 y=15 stroke=none fill=white font-size=3>Internet</svg>', !1, !0);
const dl = (e) => (() => {
  var t = cl();
  return U(t, "click", e.onClick), y(() => S(t, "transform", `translate(${e.x - 50}, ${e.y - 20}) scale(${e.scale})`)), t;
})();
V(["click"]);
var fl = /* @__PURE__ */ w('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path style="stroke:#000000;stroke-width:0.0942123;stroke-linejoin:round;paint-order:stroke fill markers"d="m 16.862342,51.997696 c -1.075084,-0.112511 -2.05623,-0.629494 -2.81195,-1.481673 -0.606442,-0.683846 -0.99723,-1.478324 -1.182546,-2.404124 -0.08256,-0.412478 -0.08652,-1.42271 -0.08652,-22.087902 0,-20.7683452 0.0036,-21.6736757 0.08766,-22.0954943 0.180391,-0.9051494 0.561892,-1.6857033 1.155474,-2.3641094 0.788682,-0.9013869 1.740115,-1.3970751 2.911572,-1.51690371 0.68286,-0.06984992 21.106949,-0.06937781 21.839706,5.0492e-4 1.918467,0.18296326 3.419838,1.52073859 4.010516,3.57351399 l 0.110671,0.384613 0.01239,21.8269715 c 0.01204,21.18475 0.0097,21.840978 -0.07786,22.302998 C 42.429956,50.253426 40.799243,51.807018 38.77573,52 38.133884,52.06121 17.448499,52.05903 16.862339,51.9977 Z m 11.793312,-3.290627 c 0.583152,-0.159722 1.234131,-0.620988 1.597899,-1.132223 0.22752,-0.319756 0.484274,-0.890638 0.56959,-1.26646 0.09121,-0.4018 0.07768,-1.248045 -0.02601,-1.626906 -0.240727,-0.879528 -0.856487,-1.688344 -1.571582,-2.064318 -0.931559,-0.489775 -2.043048,-0.449248 -2.919402,0.106451 -1.690193,1.071756 -1.994065,3.625097 -0.608796,5.115506 0.798161,0.858739 1.857352,1.169501 2.958301,0.86795 z m 9.000288,-9.706039 c 0.263827,-0.08398 0.661726,-0.512649 0.739675,-0.79688 0.04531,-0.165215 0.05841,-3.81095 0.05841,-16.254639 0,-14.2190157 -0.0083,-16.0669755 -0.07299,-16.264525 -0.10786,-0.3293604 -0.277898,-0.5391612 -0.559502,-0.690343 l -0.250929,-0.1347142 -9.70489,4.999e-4 -9.704891,4.999e-4 -0.240157,0.1220107 C 17.634484,5.1283348 17.504037,5.2714138 17.372345,5.5843601 17.274393,5.81713 17.274356,5.823202 17.273302,21.964711 l -0.0011,16.147494 0.125043,0.270336 c 0.135947,0.29391 0.349152,0.499086 0.631352,0.607583 0.253156,0.09733 19.322502,0.107919 19.627299,0.01089 z"id=path4></svg>', !1, !0);
const ul = (e) => (() => {
  var t = fl(), l = t.firstChild, r = l.nextSibling;
  return U(t, "click", e.onClick), y((i) => {
    var n = `translate(${e.x - 20}, ${e.y - 25}) scale(${e.scale})`, s = e.color;
    return n !== i.e && S(t, "transform", i.e = n), s !== i.t && S(r, "fill", i.t = s), i;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
V(["click"]);
const gl = [], [xe, gt] = ut(gl), ht = [
  { id: 0, color: "red", position: [370, 320], type: "cloud", role: "leaf", mac: "b3:75:3c:8d:13:8f", subnet: "213.3", name: "Swisscom" },
  { id: 1, color: "white", position: [250, 250], type: "Switch", role: "transit", mac: "1c:4f:9b:2d:63:e1", subnet: "192.168.1", name: "WLAN-B", forwarding: "clientIsolation" },
  { id: 4, color: "blue", position: [100, 400], type: "computer", role: "source", mac: "03:aa:66:de:9e:21", subnet: "192.168.1", name: "My Laptop" },
  { id: 13, color: "green", position: [100, 100], type: "printer", role: "destination", mac: "fe:08:d8:75:82:a0", ip: "10.0.0.4", name: "HPP 1000" },
  { id: 61, color: "purple", position: [100, 250], type: "tv", role: "leaf", mac: "7a:10:fe:88:3c:93", subnet: "192.168.1", name: "Samsung HDTV" },
  { id: 76, color: "orange", position: [250, 100], type: "mobile", role: "leaf", mac: "e5:3b:cd:1a:f7:08", subnet: "192.168.1", name: "My Phone" },
  { id: 255, color: "pink", position: [250, 320], type: "router", role: "transit", mac: "b2:77:3a:8c:14:5f", subnet: "192.168.1", name: "WLAN-R" }
], ke = [
  { id: 1, nodes: [13, 1], type: "wireless" },
  { id: 2, nodes: [1, 255], type: "internal" },
  { id: 3, nodes: [1, 4], type: "wireless" },
  { id: 4, nodes: [255, 0], type: "fixed" },
  { id: 5, nodes: [1, 61], type: "wireless" },
  { id: 6, nodes: [1, 76], type: "wireless" }
];
var hl = /* @__PURE__ */ w('<div class="switch-pref absolute top-0 right-0 m-4 bg-gray-900 text-white text-fluid-xs p-4 rounded shadow-lg"><h2 class="text-white text-fluid-lg font-medium mx-2 mb-1">Switch Settings</h2><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-4"><div class="flex flex-col"><span class="text-fluid-xs mb-2 font-bold text-prophy-orange">Name:</span><input type=text class="bg-gray-700 text-white text-fluid-xs p-2 rounded w-full"title="Enter the name of the switch"></div><div class="flex flex-col"><span class="text-fluid-xs mb-2 font-bold text-prophy-orange">Allowed Ports:</span><div class="grid grid-cols-4 gap-2"></div></div><div class="flex flex-col"><span class="text-fluid-xs mb-2 font-bold text-prophy-orange">Forwarding Table:</span><div><div class="grid grid-cols-4 gap-2 mb-1"style="grid-template-columns:3fr 1fr 3fr 1fr;"><div class="text-fluid-2xs font-medium text-gray-300">Target MAC Adr.</div><div class="text-fluid-2xs font-medium text-gray-300 text-center">Port to</div><div class="text-fluid-2xs font-medium text-gray-300">Target MAC Adr.</div><div class="text-fluid-2xs font-medium text-gray-300 text-center">Port to</div></div><div class="grid grid-cols-4 gap-2"style="grid-template-columns:3fr 1fr 3fr 1fr;">'), pl = /* @__PURE__ */ w('<label class="flex items-center space-x-2 text-fluid-xs"><input type=checkbox name=allowedPorts class="form-checkbox text-blue-500"><span>'), rt = /* @__PURE__ */ w("<div>"), vl = /* @__PURE__ */ w('<div class="text-gray-400 text-fluid-xs italic col-span-4">No entries'), $l = /* @__PURE__ */ w('<button class="bg-green-500 hover:bg-green-600 text-white text-fluid-xs p-2 rounded">Save'), ml = /* @__PURE__ */ w('<div class="text-red-500 text-fluid-xs mt-4">');
const bl = ({
  selectedSwitch: e,
  allowedPorts: t,
  setAllowedPorts: l,
  setShowEmilieNotification: r,
  onClose: i,
  scaleX: n,
  scaleY: s
}) => {
  const [o, a] = p(e?.forwarding || "clientIsolation"), [f, h] = p(e?.name || "no switch selected"), [m, $] = p(""), u = () => {
    if (!f()) {
      $("Name is required.");
      return;
    }
    $("");
  };
  return We(() => {
    console.log("Allowed ports:", t());
  }), (() => {
    var b = hl(), P = b.firstChild, D = P.nextSibling, z = D.firstChild, J = z.firstChild, te = J.firstChild, Z = te.nextSibling, j = J.nextSibling, K = j.firstChild, q = K.nextSibling, oe = j.nextSibling, le = oe.firstChild, ne = le.nextSibling, A = ne.firstChild, H = A.nextSibling;
    return b.$$click = (k) => k.stopPropagation(), Z.$$input = (k) => {
      h(k.target.value), u();
    }, v(q, E(lt, {
      get each() {
        return ht.filter((k, N) => N !== 0 && N !== 1).map((k) => k.id);
      },
      children: (k) => (() => {
        var N = pl(), F = N.firstChild, ce = F.nextSibling;
        return F.addEventListener("change", (de) => {
          console.log(`Toggled port: ${k}`), l((C) => {
            if (de.target.checked) {
              if (!C.includes(k))
                return [...C, k];
            } else
              return C.filter((B) => B !== k);
            return C;
          }), gt((C) => C.filter((B) => B.port !== k));
        }), F.value = k, v(ce, `to ${k}`), y(() => F.checked = t().includes(k)), N;
      })()
    })), v(H, E(lt, {
      each: xe,
      children: (k, N) => [(() => {
        var F = rt();
        return v(F, () => k.destinationMac || "—"), y(() => _e(F, `bg-gray-700 text-white text-fluid-2xs p-1 rounded overflow-hidden ${N() % 2 === 1 ? "col-start-3" : ""}`)), F;
      })(), (() => {
        var F = rt();
        return v(F, () => `${k.port}` || "—"), y(() => _e(F, `bg-gray-700 text-white text-fluid-2xs p-1 rounded text-center ${N() % 2 === 1 ? "col-start-4" : ""}`)), F;
      })()]
    }), null), v(H, (() => {
      var k = X(() => xe.length === 0);
      return () => k() && vl();
    })(), null), v(z, (() => {
      var k = X(() => !!(f() && !m()));
      return () => k() && (() => {
        var N = $l();
        return N.$$click = () => {
          console.log("Save computer preferences"), r(!0), i();
        }, N;
      })();
    })(), null), v(z, (() => {
      var k = X(() => !!m());
      return () => k() && (() => {
        var N = ml();
        return v(N, m), N;
      })();
    })(), null), y(() => Z.value = f()), b;
  })();
};
V(["click", "input"]);
var xl = /* @__PURE__ */ w('<div class="computer-pref absolute m-4 bg-gray-900 text-white"><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-6"><div class="flex flex-col"><span class=mb-2>Name:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"title="Enter the name of the computer"></div><div class="flex flex-col"><span class=mb-2>MAC-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=fe:08:d8:75:82:a0 title="Enter the MAC address of the computer (Format: XX:XX:XX:XX:XX:XX)"></div><div class="flex flex-col"><span class=mb-2>IP-Address:</span><div class="flex items-end space-x-2 w-full"><div class="flex flex-col flex-grow"><span class="text-sm mb-1">Subnet-Address</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=XXX.XXX.XXX title="Enter the subnet portion of the IP address (Format: XXX.XXX.XXX)"></div><span class=pb-2>.</span><div class="flex flex-col"><span class="text-sm mb-1">Id</span><input type=text class="bg-gray-700 text-white p-2 rounded w-12"placeholder=XXX title="Enter the host ID portion of the IP address (Format: XXX)">'), yl = /* @__PURE__ */ w('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Save'), wl = /* @__PURE__ */ w('<div class="text-red-500 mt-4">');
const Pl = ({
  selectedComputer: e,
  onClose: t,
  scaleX: l,
  scaleY: r
}) => {
  const [i, n] = p(e?.name || ""), [s, o] = p(e?.mac || ""), [a, f] = p(e?.subnet || ""), [h, m] = p(e?.id || ""), [$, u] = p(""), b = () => {
    if (!i()) {
      u("Name is required.");
      return;
    }
    if (!/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(s())) {
      u("Invalid MAC-Address format.");
      return;
    }
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(a())) {
      u("Invalid Subnet format.");
      return;
    }
    if (!/^\d{1,3}$/.test(h())) {
      u("Invalid ID format.");
      return;
    }
    u("");
  };
  return Ee(() => {
    console.log("ComputerPref component mounted");
  }), (() => {
    var P = xl(), D = P.firstChild, z = D.firstChild, J = z.firstChild, te = J.firstChild, Z = te.nextSibling, j = J.nextSibling, K = j.firstChild, q = K.nextSibling, oe = j.nextSibling, le = oe.firstChild, ne = le.nextSibling, A = ne.firstChild, H = A.firstChild, k = H.nextSibling, N = A.nextSibling, F = N.nextSibling, ce = F.firstChild, de = ce.nextSibling;
    return P.$$click = (C) => C.stopPropagation(), Z.$$input = (C) => {
      n(C.target.value), b();
    }, q.$$input = (C) => {
      o(C.target.value), b();
    }, k.$$input = (C) => {
      f(C.target.value), b();
    }, de.$$input = (C) => {
      m(C.target.value), b();
    }, v(z, (() => {
      var C = X(() => !!(i() && s() && a() && h() && !$()));
      return () => C() && (() => {
        var B = yl();
        return B.$$click = () => {
          console.log("Save computer preferences"), t();
        }, B;
      })();
    })(), null), v(z, (() => {
      var C = X(() => !!$());
      return () => C() && (() => {
        var B = wl();
        return v(B, $), B;
      })();
    })(), null), y((C) => {
      var B = `${e.position[1] - 300}px`, se = `${e.position[0] - 100}px`;
      return B !== C.e && ((C.e = B) != null ? P.style.setProperty("top", B) : P.style.removeProperty("top")), se !== C.t && ((C.t = se) != null ? P.style.setProperty("left", se) : P.style.removeProperty("left")), C;
    }, {
      e: void 0,
      t: void 0
    }), y(() => Z.value = i()), y(() => q.value = s()), y(() => k.value = a()), y(() => de.value = h()), P;
  })();
};
V(["click", "input"]);
var kl = /* @__PURE__ */ w('<div class="popup absolute bg-gray-800 text-white text-xs border border-white p-2 rounded shadow-lg"><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Ping');
const ot = ({
  selectedDevice: e,
  onClose: t,
  onPing: l,
  scaleX: r,
  scaleY: i
}) => (console.log("Selected computer:", e), (() => {
  var n = kl(), s = n.firstChild;
  return n.$$click = (o) => o.stopPropagation(), s.$$click = () => {
    console.log("DevicePopup clicked"), l(e), t();
  }, y((o) => {
    var a = `${e.position[1] * i}px`, f = `${e.position[0] * r}px`;
    return a !== o.e && ((o.e = a) != null ? n.style.setProperty("top", a) : n.style.removeProperty("top")), f !== o.t && ((o.t = f) != null ? n.style.setProperty("left", f) : n.style.removeProperty("left")), o;
  }, {
    e: void 0,
    t: void 0
  }), n;
})());
V(["click"]);
V(["click"]);
var _l = /* @__PURE__ */ w('<div class="popup absolute bg-gray-800 text-white text-xs border border-white p-2 rounded shadow-lg"><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Preferences</button><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Ping</button><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Select Printer</button><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Print Test Page');
const Cl = ({
  selectedComputer: e,
  onClose: t,
  onPing: l,
  onPrinterSelect: r,
  onPrintTestPage: i,
  onPreferences: n,
  scaleX: s,
  scaleY: o
}) => (console.log(e), (() => {
  var a = _l(), f = a.firstChild, h = f.nextSibling, m = h.nextSibling, $ = m.nextSibling;
  return a.$$click = (u) => u.stopPropagation(), f.$$click = () => {
    n(e), t();
  }, h.$$click = () => {
    l(e), t();
  }, m.$$click = () => {
    l(e), r(e), t();
  }, $.$$click = () => {
    i(e), t();
  }, y((u) => {
    var b = `${e.position[1] * o}px`, P = `${e.position[0] * s}px`;
    return b !== u.e && ((u.e = b) != null ? a.style.setProperty("top", b) : a.style.removeProperty("top")), P !== u.t && ((u.t = P) != null ? a.style.setProperty("left", P) : a.style.removeProperty("left")), u;
  }, {
    e: void 0,
    t: void 0
  }), a;
})());
V(["click"]);
var Sl = /* @__PURE__ */ w('<div class="printer-pref absolute top-10 left-0 m-4 bg-gray-900 text-white"><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-6"><div class="flex flex-col"><span class=mb-2>Name:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"title="Enter the name of the printer"></div><div class="flex flex-col"><span class=mb-2>MAC-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=fe:08:d8:75:82:a0 title="Enter the MAC address of the computer (Format: XX:XX:XX:XX:XX:XX)"></div><div class="flex flex-col"><span class=mb-2>IP-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=192.168.0.1 title="Enter the IP address of the printer">'), Al = /* @__PURE__ */ w('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Save'), Tl = /* @__PURE__ */ w('<div class="text-red-500 mt-4">');
const Xl = ({
  selectedPrinter: e,
  onSave: t,
  onClose: l,
  scaleX: r,
  scaleY: i
}) => {
  const [n, s] = p(e?.name || "no printer selected"), [o, a] = p(e?.ip || ""), [f, h] = p(e?.mac || ""), [m, $] = p(""), u = () => {
    e.id;
  };
  We(() => {
    u();
  });
  const b = () => {
    if (!n()) {
      $("Name is required.");
      return;
    }
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(o())) {
      $("Invalid IP-Address format.");
      return;
    }
    $("");
  };
  return Ee(() => {
    console.log("PrinterPref component mounted");
  }), (() => {
    var P = Sl(), D = P.firstChild, z = D.firstChild, J = z.firstChild, te = J.firstChild, Z = te.nextSibling, j = J.nextSibling, K = j.firstChild, q = K.nextSibling, oe = j.nextSibling, le = oe.firstChild, ne = le.nextSibling;
    return P.$$click = (A) => A.stopPropagation(), Z.$$input = (A) => {
      s(A.target.value), b();
    }, q.$$input = (A) => {
      h(A.target.value), b();
    }, ne.$$input = (A) => {
      a(A.target.value), b();
    }, v(z, (() => {
      var A = X(() => !!(n() && o() && !m()));
      return () => A() && (() => {
        var H = Al();
        return H.$$click = () => {
          console.log("Save printer preferences"), t(e.id, {
            name: n(),
            ip: o()
          }), l();
        }, H;
      })();
    })(), null), v(z, (() => {
      var A = X(() => !!m());
      return () => A() && (() => {
        var H = Tl();
        return v(H, m), H;
      })();
    })(), null), y((A) => {
      var H = `${e.position[1] * i}px`, k = `${(e.position[0] - 100) * r}px`;
      return H !== A.e && ((A.e = H) != null ? P.style.setProperty("top", H) : P.style.removeProperty("top")), k !== A.t && ((A.t = k) != null ? P.style.setProperty("left", k) : P.style.removeProperty("left")), A;
    }, {
      e: void 0,
      t: void 0
    }), y(() => Z.value = n()), y(() => q.value = f()), y(() => ne.value = o()), P;
  })();
};
V(["click", "input"]);
var El = /* @__PURE__ */ w('<div><h2 class="text-lg font-bold mb-4"></h2><div class="flex flex-col space-y-4"><div class=text-bg-300></div><div class="flex justify-end space-x-4 mt-6"><button class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded">Ok');
const Ml = ({
  selectedComputer: e,
  title: t,
  message: l,
  success: r,
  onClose: i,
  scaleX: n,
  scaleY: s
}) => (() => {
  var o = El(), a = o.firstChild, f = a.nextSibling, h = f.firstChild, m = h.nextSibling, $ = m.firstChild;
  return o.$$click = (u) => u.stopPropagation(), v(a, t), v(h, l), U($, "click", i), y((u) => {
    var b = `computer-pref absolute p-4 ${r() ? "bg-green-900" : "bg-red-900"} text-white rounded shadow-lg`, P = `${(e.position[1] - 300) * s}px`, D = `${e.position[0] * n}px`;
    return b !== u.e && _e(o, u.e = b), P !== u.t && ((u.t = P) != null ? o.style.setProperty("top", P) : o.style.removeProperty("top")), D !== u.a && ((u.a = D) != null ? o.style.setProperty("left", D) : o.style.removeProperty("left")), u;
  }, {
    e: void 0,
    t: void 0,
    a: void 0
  }), o;
})();
V(["click"]);
var Nl = /* @__PURE__ */ w('<div class="computer-pref p-4 absolute bg-gray-800 rounded text-white"><h2 class="text-lg font-bold mb-4"></h2><div class="flex flex-col space-y-4"><div class=text-bg-300></div><div class="flex justify-end space-x-4 mt-6"><button class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded cursor-pointer">Ok');
const Hl = ({
  selectedComputer: e,
  title: t,
  message: l,
  onClose: r,
  scaleX: i,
  scaleY: n
}) => (() => {
  var s = Nl(), o = s.firstChild, a = o.nextSibling, f = a.firstChild, h = f.nextSibling, m = h.firstChild;
  return s.$$click = ($) => $.stopPropagation(), `${200 * n}px` != null ? s.style.setProperty("top", `${200 * n}px`) : s.style.removeProperty("top"), `${200 * i}px` != null ? s.style.setProperty("left", `${200 * i}px`) : s.style.removeProperty("left"), v(o, t), v(f, l), U(m, "click", r), s;
})();
V(["click"]);
var Il = /* @__PURE__ */ w('<div class="select-printer-dialog absolute top-40 left-0 m-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg"><h2 class="text-lg font-bold mb-4">Select a Printer</h2><div class="flex flex-col space-y-4"></div><div class="flex justify-end space-x-4 mt-6"><button class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded">Cancel'), Ll = /* @__PURE__ */ w("<div class=text-gray-300>No printers available."), Ol = /* @__PURE__ */ w('<label><div class="flex items-center space-x-3"><input type=radio name=printer class=accent-blue-500><span class=text-white>'), jl = /* @__PURE__ */ w('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Confirm');
const Vl = ({
  selectedComputer: e,
  availablePrinters: t,
  selectedPrinter: l,
  setSelectedPrinter: r,
  onConfirm: i,
  onClose: n,
  scaleX: s,
  scaleY: o
}) => (() => {
  var a = Il(), f = a.firstChild, h = f.nextSibling, m = h.nextSibling, $ = m.firstChild;
  return a.$$click = (u) => u.stopPropagation(), v(h, (() => {
    var u = X(() => t.length === 0);
    return () => u() && Ll();
  })(), null), v(h, () => t.map((u) => (() => {
    var b = Ol(), P = b.firstChild, D = P.firstChild, z = D.nextSibling;
    return D.addEventListener("change", () => r(u.id)), v(z, () => u.name), y(() => _e(b, `flex items-center justify-between p-3 mb-2 rounded cursor-pointer border 
                ${l() === u.id ? "bg-blue-700 border-blue-500" : "bg-gray-800 border-gray-600"}`)), y(() => D.value = u.id), y(() => D.checked = l() === u.id), b;
  })()), null), U($, "click", n), v(m, (() => {
    var u = X(() => t.length !== 0);
    return () => u() && (() => {
      var b = jl();
      return b.$$click = () => {
        l() && i(l());
      }, y(() => b.disabled = !l()), b;
    })();
  })(), null), y((u) => {
    var b = `${(e.position[1] - 300) * o}px`, P = `${(e.position[0] - 100) * s}px`;
    return b !== u.e && ((u.e = b) != null ? a.style.setProperty("top", b) : a.style.removeProperty("top")), P !== u.t && ((u.t = P) != null ? a.style.setProperty("left", P) : a.style.removeProperty("left")), u;
  }, {
    e: void 0,
    t: void 0
  }), a;
})();
V(["click"]);
var Dl = /* @__PURE__ */ w("<svg><g pointer-events=none><rect x=-27 y=-20 height=35 fill=black stroke=white strokeWidth=1 rx=5></rect><text x=-15 y=3 fill=white fontSize=8></svg>", !1, !0);
function Fl() {
  return E(Bt, {
    get when() {
      return Jt();
    },
    children: (e) => {
      const t = e();
      return (() => {
        var l = Dl(), r = l.firstChild, i = r.nextSibling;
        return v(i, () => t.text), y((n) => {
          var s = `translate(${t.x}, ${t.y - 10})`, o = t.text.length * 7 + 20;
          return s !== n.e && S(l, "transform", n.e = s), o !== n.t && S(r, "width", n.t = o), n;
        }, {
          e: void 0,
          t: void 0
        }), l;
      })();
    }
  });
}
const zl = {
  language: "de"
};
class Bl {
  constructor() {
    this.phrases = {
      incoming: { en: "incomming", de: "eingehend" },
      reflected: { en: "reflected", de: "reflektiert" },
      transmitted: { en: "transmitted", de: "transmittiert" },
      air: { en: "Air", de: "Luft" },
      mirror: { en: "Mirror", de: "Spiegel" },
      water: { en: "Water", de: "Wasser" },
      oil: { en: "Oil", de: "Öl" },
      aceton: { en: "Aceton", de: "Aceton" },
      honey: { en: "Honey", de: "Honig" },
      submit: { en: "To Emilie", de: "Zu Emilie" }
    };
  }
  // Shorthand for getPhrase
  _(t) {
    let l = zl.language;
    return this.getPhrase(t, l);
  }
  // get phrase by key
  getPhrase(t, l) {
    if (this.phrases[t] !== void 0) {
      if (this.phrases[t][l] !== void 0)
        return this.phrases[t][l];
      console.log("language: '" + l + "' not found for key '" + t + "'");
    } else
      console.log("key not found: " + t);
    return console.log("return key: " + t), t;
  }
}
const Xe = new Bl(), Rl = Xe._.bind(Xe);
Xe.getPhrase.bind(Xe);
var Yl = /* @__PURE__ */ w('<svg><g cursor=pointer><rect x=20 width=100 height=30 fill=#4caf50 rx=5 ry=5></rect><text x=70 fill=white font-size=14 font-family="Arial, sans-serif"text-anchor=middle></svg>', !1, !0), Wl = /* @__PURE__ */ w('<div class="bg-gray-900 relative border text-sm"><svg><text x=10 y=30 fill=white fontSize=16 fontWeight=bold><tspan style=font-size:18px;font-weight:bold;>Subnet Address: 192.168.1</tspan></text><defs><linearGradient id=halfRedHalfGreen x1=0% y1=0% x2=100% y2=0%><stop offset=49.9%></stop><stop offset=50%></stop></linearGradient></defs>'), Zl = /* @__PURE__ */ w("<svg><path stroke=white fill=none></svg>", !1, !0), ql = /* @__PURE__ */ w("<svg><text fill=white fontSize=12 fontWeight=bold></svg>", !1, !0), Gl = /* @__PURE__ */ w("<svg><g></svg>", !1, !0), Ul = /* @__PURE__ */ w("<svg><circle r=8 fill=url(#halfRedHalfGreen)></svg>", !1, !0);
let W = [4, 1, [255]], Jl = [4, 1, 255];
function De(e, t, l) {
  let r = [], i = Array.isArray(e) ? e : [e], n = Array.isArray(t) ? t : [t];
  return i.forEach((s) => {
    n.forEach((o) => {
      ke.some((a) => a.nodes.includes(s) && a.nodes.includes(o)) && r.push({
        threadIndex: l,
        nodeId: s,
        nextNodeId: o
      });
    });
  }), r;
}
function Kl(e) {
  if (typeof e != "string")
    return console.error("Invalid input: IP must be a string."), null;
  const t = e.trim().split(".");
  if (t.length !== 4)
    return console.error("Invalid IP format: Must contain four octets."), null;
  const l = parseInt(t[3], 10);
  return isNaN(l) ? (console.error("Invalid host ID: Last segment is not a number."), null) : l;
}
let Fe = [];
const cn = (e) => {
  console.log("NetworkSimulator props:", e.width, e.height);
  const [t, l] = p(e.width || 500), [r, i] = p(e.height || 500), [n, s] = p(e.width / 500), [o, a] = p(e.height / 500), [f, h] = p(e.height / 500), [m, $] = p("Log:"), [u, b] = p("white"), [P, D] = p("blue"), [z, J] = p(!1), [te, Z] = p(null), [j, K] = p(null), [q, oe] = p(null), [le, ne] = p(null), [A, H] = p(!1), [k, N] = p(!1), [F, ce] = p(!1), [de, C] = p(!1), [B, se] = p(!1), [Me, Ne] = p(null), [en, pt] = p(!1), [vt, ye] = p(!1), [$t, He] = p(!1), [mt, Ie] = p(""), [bt, Ge] = p(!1), [xt, Le] = p(!1), [Oe, Ue] = p([]), [fe, yt] = ut(ht), pe = (d) => fe.find((g) => g.id === d), [we, wt] = p([255]), [Je, Pt] = p(null), kt = (d) => {
    let g = m();
    e.onSubmit({
      preventDefault: () => {
      },
      target: {
        value: g
      }
    }), $("");
  }, ve = (d) => {
    console.log(`Device ${d.id} clicked! Initiate multicast ping.`), $((I) => `${I}[Device ${d.type} ${d.id} clicked!  Initiate multicast ping.]`), W = JSON.parse(JSON.stringify(Jl)), W[0] = d.id;
    let g = we().filter((I) => I !== d.id);
    W[W.length - 1] = g, console.log("thread:", W);
    let x = W[W.length - 1].map((I) => pe(I));
    console.log("targetNodes:", x), Ql(d, x), console.log("fwding table:", d.id, xe), D(d.color), b("white"), Dt();
  }, _t = (d) => {
    console.log(`Printer ${d.id} clicked!`), $((g) => `${g}[Printer ${d.id} clicked!]`), Ne(d);
  }, Ct = (d) => {
    console.log(`=> TV ${d.id} clicked!`), $((g) => `${g}[TV ${d.id} clicked!]`), ce(!0), oe(d);
  }, St = (d) => {
    console.log(`Mobile ${d.id} clicked!`), $((g) => `${g}[Mobile ${d.id} clicked!]`), C(!0), ne(d);
  }, At = (d) => {
    $((g) => `${g}[Switch ${d.id} clicked!]`), H(!0), Z(d);
  }, Tt = (d) => {
    $((g) => `${g}[Computer ${d.id} clicked!]`), se(!0), K(d);
  }, Xt = (d) => {
    console.log(`Computer ${d.id} preferences clicked!`), $((g) => `${g}[Computer ${d.id} preferences clicked!]`), console.debug(`Preferences for Computer ${d.id}`), N(!0), K(d);
  }, Et = (d) => {
    Le(!0);
  }, Mt = (d, g) => {
    console.log("Printer IP changed:", d, g), $((x) => `${x}[Printer ${d} IP changed to ${g.ip}]`), yt((x) => x.id === d, "ip", g.ip), He(!0);
  }, Nt = (d) => {
    let g = fe.find((x) => x.type === "printer");
    console.log("handlePrintTestPage: nodes:", fe), console.log("handlePrintTestPage: available:", Oe()), console.log("handlePrintTestPage: computer:", d), console.log("handlePrintTestPage: printer:", g), Oe().some((x) => x.id === g.id) && Je() === g.id ? (console.log("handlePrintTestPage: Printer available"), g && g.ip.startsWith(d.subnet) && Kl(g.ip) == 13 ? (Ie(`Print test page to ${g.name}`), $((x) => `${x}[Print test page to ${g.name}]`), ye(!0), Ge(!0), e.onSubmit({
      preventDefault: () => {
      },
      target: {
        value: "Success!! Test page is printed!!!"
      }
    })) : (Ie(`Could not print test page to ${g.name}`), $((x) => `${x}[Could not print test page to ${g.name}]`), ye(!0), Ge(!1))) : (console.log("handlePrintTestPage: Printer not available"), Ie("Printer not available"), $((x) => `${x}[Printer not available]`), ye(!0));
  };
  We(() => {
    console.log("broadcast has changed:", z());
    let d = fe.find((x) => x.type === "printer"), g = fe.find((x) => x.type === "computer");
    we().includes(13) && we().includes(4) && d.ip == `${g.subnet}.${d.id}` ? (Ue([{
      id: 13,
      name: "HPP 1000"
    }]), $((x) => `${x}[Computer and Printer can communicate. Printer is available.]`), e.onSubmit({
      preventDefault: () => {
      },
      target: {
        value: "C-P"
      }
    })) : Ue([]);
  });
  const Ht = (d) => {
    !d.target.closest(".Switch-pref") && !d.target.closest(".popup") && !d.target.closest(".computer-pref") && !d.target.closest(".printer-pref") && It();
  }, It = () => {
    Z(null), K(null), Ne(null), N(!1), H(!1), pt(!1), se(!1);
  }, [tn, ln] = p(!1), [nn, rn] = p(0), [on, sn] = p(0), [Lt, Ot] = p([]);
  let Q = De(W[0], W[1], 1), ue = 0, R = null;
  function je() {
    console.debug(`updatePositions: ${JSON.stringify(Q)}`), Ot(Q.map((d) => ({
      id: d.nextNodeId,
      pos: {
        x: pe(d.nodeId).position[0],
        y: pe(d.nodeId).position[1]
      }
    })));
  }
  function Ve() {
    if (console.debug(`movingCircles: ${JSON.stringify(Q)}`), Q.length === 0) {
      cancelAnimationFrame(R), R = null, console.debug("Animation complete!");
      return;
    }
    const d = 50;
    if (Q.forEach(({
      threadIndex: g,
      nodeId: x,
      nextNodeId: I
    }) => {
      console.debug(`current: ${x}`, `next: ${I}`);
      const Y = ke.findIndex((O) => O.nodes.includes(x) && O.nodes.includes(I));
      if (Y === -1 || !Fe[Y]) {
        console.warn("Path not found for:", x, "->", I);
        return;
      }
      const G = Fe[Y], ie = ke[Y], c = G.getTotalLength(), T = ie.nodes[0] !== x ? 1 - (ue + 1) / d : (ue + 1) / d, _ = G.getPointAtLength(c * T), L = document.getElementById(`circle-${I}`);
      console.debug(`move circle-${I}`), L ? (L.setAttribute("cx", _.x), L.setAttribute("cy", _.y)) : console.warn("Circle not found for:", x);
    }), ue + 1 < d)
      ue++;
    else {
      ue = 0;
      let g = [];
      Q.forEach(({
        threadIndex: x,
        nodeId: I,
        nextNodeId: Y
      }) => {
        let G = W[x + 1], ie = De(Y, G, x + 1);
        g.push(...ie);
      }), Q = g, je();
    }
    Q.length > 0 ? R = requestAnimationFrame(Ve) : (console.debug("Animation complete!"), cancelAnimationFrame(R), R = null);
  }
  function jt() {
    R || (console.debug("Starting animation..."), je(), R = requestAnimationFrame(Ve));
  }
  function Vt() {
    R && (cancelAnimationFrame(R), R = null, console.debug("Animation stopped."));
  }
  function Dt() {
    console.debug("Redoing animation..."), ue = 0, cancelAnimationFrame(R), R = null, Q = De(W[0], W[1], 1), je(), R = requestAnimationFrame(Ve);
  }
  Be(() => Vt()), Ee(() => {
    jt();
  }), Be(() => {
    cancelAnimationFrame(R);
  });
  const Ft = (d, g) => {
    const I = g - 30 - 20;
    return (() => {
      var Y = Yl(), G = Y.firstChild, ie = G.nextSibling;
      return Y.$$click = kt, S(G, "y", I), S(ie, "y", I + 30 / 2 + 5), v(ie, () => Rl("submit")), Y;
    })();
  };
  return (() => {
    var d = Wl(), g = d.firstChild, x = g.firstChild, I = x.nextSibling, Y = I.firstChild, G = Y.firstChild, ie = G.nextSibling;
    return d.$$click = Ht, v(g, () => ke.map((c, M) => {
      const T = pe(c.nodes[0]), _ = pe(c.nodes[1]);
      return (() => {
        var L = Zl();
        return Yt((O) => Fe[M] = O, L), y((O) => {
          var Ke = `M ${T.position[0] * n()} ${T.position[1] * o()} L ${_.position[0] * n()} ${_.position[1] * o()}`, Qe = c.type === "internal" ? "8" : "1", et = c.type === "wireless" ? "5,5" : "0";
          return Ke !== O.e && S(L, "d", O.e = Ke), Qe !== O.t && S(L, "stroke-width", O.t = Qe), et !== O.a && S(L, "stroke-dasharray", O.a = et), O;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), L;
      })();
    }), x), v(g, () => fe.map((c) => (() => {
      var M = Gl();
      return v(M, (() => {
        var T = X(() => c.type === "Switch");
        return () => T() ? E(el, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * o();
          },
          get scale() {
            return f();
          },
          onClick: (_) => {
            _.stopPropagation(), At(c);
          }
        }) : X(() => c.type === "router")() ? E(ll, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * o();
          },
          get scale() {
            return f();
          },
          onClick: (_) => {
            _.stopPropagation(), ve(c);
          }
        }) : X(() => c.type === "printer")() ? E(ol, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * o();
          },
          get scale() {
            return 0.7 * f();
          },
          get role() {
            return c.role;
          },
          get color() {
            return c.color;
          },
          onClick: (_) => {
            _.stopPropagation(), _t(c);
          }
        }) : X(() => c.type === "tv")() ? E(al, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * o();
          },
          get scale() {
            return 0.7 * f();
          },
          get color() {
            return c.color;
          },
          onClick: (_) => {
            _.stopPropagation(), Ct(c);
          }
        }) : X(() => c.type === "mobile")() ? E(ul, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * o();
          },
          get scale() {
            return 0.7 * f();
          },
          get color() {
            return c.color;
          },
          onClick: (_) => {
            _.stopPropagation(), St(c);
          }
        }) : X(() => c.type === "cloud")() ? E(dl, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * o();
          },
          get scale() {
            return 3 * f();
          },
          onClick: (_) => {
            _.stopPropagation(), ve(c);
          }
        }) : E(il, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * o();
          },
          get role() {
            return c.role;
          },
          get color() {
            return c.color;
          },
          onClick: (_) => {
            _.stopPropagation(), Tt(c);
          }
        });
      })(), null), v(M, () => Ft(t(), r()), null), v(M, E(qe, {
        get x() {
          return c.position[0] * n() + 10;
        },
        get y() {
          return c.position[1] * o() - 25;
        },
        get text() {
          return `id=${c.id}`;
        },
        get children() {
          var T = ql();
          return v(T, () => c.id), y((_) => {
            var L = c.position[0] * n() + 30, O = c.position[1] * o() - 25;
            return L !== _.e && S(T, "x", _.e = L), O !== _.t && S(T, "y", _.t = O), _;
          }, {
            e: void 0,
            t: void 0
          }), T;
        }
      }), null), M;
    })()), I), v(g, () => Lt().map((c) => (() => {
      var M = Ul();
      return y((T) => {
        var _ = `circle-${c.id}`, L = c.pos.x * n(), O = c.pos.y * o();
        return _ !== T.e && S(M, "id", T.e = _), L !== T.t && S(M, "cx", T.t = L), O !== T.a && S(M, "cy", T.a = O), T;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      }), M;
    })()), null), v(g, E(Fl, {}), null), v(d, (() => {
      var c = X(() => !!(te() && A()));
      return () => c() && E(bl, {
        get selectedSwitch() {
          return te();
        },
        allowedPorts: we,
        setAllowedPorts: wt,
        setShowEmilieNotification: He,
        onClose: () => H(!1),
        get scaleX() {
          return n();
        },
        get scaleY() {
          return o();
        }
      });
    })(), null), v(d, (() => {
      var c = X(() => !!(j() && k()));
      return () => c() && E(Pl, {
        get selectedComputer() {
          return j();
        },
        onClose: () => N(!1)
      });
    })(), null), v(d, (() => {
      var c = X(() => !!(j() && xt()));
      return () => c() && E(Vl, {
        get selectedComputer() {
          return j();
        },
        get availablePrinters() {
          return Oe();
        },
        selectedPrinter: Je,
        setSelectedPrinter: Pt,
        onConfirm: (M) => {
          console.log("Selected printer ID:", M), Le(!1), $((T) => `${T}[Printer ${M} selected]`);
        },
        onClose: () => Le(!1),
        get scaleX() {
          return n();
        },
        get scaleY() {
          return o();
        }
      });
    })(), null), v(d, (() => {
      var c = X(() => !!Me());
      return () => c() && E(Xl, {
        get selectedPrinter() {
          return Me();
        },
        onSave: Mt,
        onClose: () => Ne(null),
        get scaleX() {
          return n();
        },
        get scaleY() {
          return o();
        }
      });
    })(), null), v(d, (() => {
      var c = X(() => !!(q() && F()));
      return () => c() && E(ot, {
        get selectedDevice() {
          return q();
        },
        onClose: () => ce(!1),
        onPing: (M) => {
          ve(M);
        },
        get scaleX() {
          return n();
        },
        get scaleY() {
          return o();
        }
      });
    })(), null), v(d, (() => {
      var c = X(() => !!(le() && de()));
      return () => c() && E(ot, {
        get selectedDevice() {
          return le();
        },
        onClose: () => C(!1),
        onPing: (M) => {
          ve(M);
        },
        get scaleX() {
          return n();
        },
        get scaleY() {
          return o();
        }
      });
    })(), null), v(d, (() => {
      var c = X(() => !!(j() && B()));
      return () => c() && E(Cl, {
        get selectedComputer() {
          return j();
        },
        onClose: () => se(!1),
        onPing: () => {
          ve(j());
        },
        onPrinterSelect: Et,
        onPrintTestPage: Nt,
        onPreferences: Xt,
        get scaleX() {
          return n();
        },
        get scaleY() {
          return o();
        }
      });
    })(), null), v(d, (() => {
      var c = X(() => !!vt());
      return () => c() && E(Ml, {
        get selectedComputer() {
          return j();
        },
        title: "Print a test page",
        message: mt,
        success: bt,
        onClose: () => ye(!1),
        get scaleX() {
          return n();
        },
        get scaleY() {
          return o();
        }
      });
    })(), null), v(d, (() => {
      var c = X(() => !!$t());
      return () => c() && E(Hl, {
        get selectedComputer() {
          return Me();
        },
        title: "Alert",
        message: "Please inform Emilie!",
        onClose: () => He(!1),
        get scaleX() {
          return n();
        },
        get scaleY() {
          return o();
        }
      });
    })(), null), y((c) => {
      var M = e.width, T = e.height, _ = P(), L = u();
      return M !== c.e && S(g, "width", c.e = M), T !== c.t && S(g, "height", c.t = T), _ !== c.a && S(G, "stop-color", c.a = _), L !== c.o && S(ie, "stop-color", c.o = L), c;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), d;
  })();
}, Ql = (e, t, l) => {
  console.log("Updating forwarding table for source node:", e), console.log("Target nodes number:", t.length);
  let r = [{
    destinationMac: e.mac,
    port: e.id
  }];
  t.forEach((i) => {
    r.push({
      destinationMac: i.mac,
      port: i.id,
      ip: i.ip ? i.ip : void 0
    });
  }), r = r.filter((i) => i.ip === void 0 || i.ip === "192.168.1.13"), console.log("Intermediate forwarding table:", r), r.forEach((i) => {
    xe.find((s) => s.destinationMac === i.destinationMac) || gt([...xe, i]);
  });
};
V(["click"]);
let dn = "0.1.0";
export {
  cn as NetworkSimulator,
  dn as network_simulation_version
};
