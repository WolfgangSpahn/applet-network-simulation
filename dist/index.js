import { sharedConfig as ne, untrack as We, createRenderEffect as b, $PROXY as re, batch as ft, $TRACK as Ve, getListener as Te, createSignal as $, onMount as _e, onCleanup as Ee, createComponent as T, createEffect as Xe, For as De, createMemo as E, Show as ut } from "solid-js";
function gt(e, t, l) {
  let n = l.length, i = t.length, o = n, r = 0, a = 0, s = t[i - 1].nextSibling, u = null;
  for (; r < i || a < o; ) {
    if (t[r] === l[a]) {
      r++, a++;
      continue;
    }
    for (; t[i - 1] === l[o - 1]; )
      i--, o--;
    if (i === r) {
      const d = o < n ? a ? l[a - 1].nextSibling : l[o - a] : s;
      for (; a < o; ) e.insertBefore(l[a++], d);
    } else if (o === a)
      for (; r < i; )
        (!u || !u.has(t[r])) && t[r].remove(), r++;
    else if (t[r] === l[o - 1] && l[a] === t[i - 1]) {
      const d = t[--i].nextSibling;
      e.insertBefore(l[a++], t[r++].nextSibling), e.insertBefore(l[--o], d), t[i] = l[o];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let f = a;
        for (; f < o; ) u.set(l[f], f++);
      }
      const d = u.get(t[r]);
      if (d != null)
        if (a < d && d < o) {
          let f = r, p = 1, v;
          for (; ++f < i && f < o && !((v = u.get(t[f])) == null || v !== d + p); )
            p++;
          if (p > d - a) {
            const S = t[r];
            for (; a < d; ) e.insertBefore(l[a++], S);
          } else e.replaceChild(l[a++], t[r++]);
        } else r++;
      else t[r++].remove();
    }
  }
}
const ze = "_$DX_DELEGATE";
function x(e, t, l) {
  let n;
  const i = () => {
    const r = document.createElement("template");
    return r.innerHTML = e, l ? r.content.firstChild.firstChild : r.content.firstChild;
  }, o = t ? () => We(() => document.importNode(n || (n = i()), !0)) : () => (n || (n = i())).cloneNode(!0);
  return o.cloneNode = o, o;
}
function F(e, t = window.document) {
  const l = t[ze] || (t[ze] = /* @__PURE__ */ new Set());
  for (let n = 0, i = e.length; n < i; n++) {
    const o = e[n];
    l.has(o) || (l.add(o), t.addEventListener(o, vt));
  }
}
function C(e, t, l) {
  He(e) || (l == null ? e.removeAttribute(t) : e.setAttribute(t, l));
}
function ht(e, t) {
  He(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function ee(e, t, l, n) {
  Array.isArray(l) ? (e[`$$${t}`] = l[0], e[`$$${t}Data`] = l[1]) : e[`$$${t}`] = l;
}
function pt(e, t, l) {
  return We(() => e(t, l));
}
function y(e, t, l, n) {
  if (l !== void 0 && !n && (n = []), typeof t != "function") return be(e, t, n, l);
  b((i) => be(e, t(), i, l), n);
}
function He(e) {
  return !!ne.context && !ne.done && (!e || e.isConnected);
}
function vt(e) {
  if (ne.registry && ne.events && ne.events.find(([s, u]) => u === e))
    return;
  let t = e.target;
  const l = `$$${e.type}`, n = e.target, i = e.currentTarget, o = (s) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: s
  }), r = () => {
    const s = t[l];
    if (s && !t.disabled) {
      const u = t[`${l}Data`];
      if (u !== void 0 ? s.call(t, u, e) : s.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && o(t.host), !0;
  }, a = () => {
    for (; r() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), ne.registry && !ne.done && (ne.done = _$HY.done = !0), e.composedPath) {
    const s = e.composedPath();
    o(s[0]);
    for (let u = 0; u < s.length - 2 && (t = s[u], !!r()); u++) {
      if (t._$host) {
        t = t._$host, a();
        break;
      }
      if (t.parentNode === i)
        break;
    }
  } else a();
  o(n);
}
function be(e, t, l, n, i) {
  const o = He(e);
  if (o) {
    !l && (l = [...e.childNodes]);
    let s = [];
    for (let u = 0; u < l.length; u++) {
      const d = l[u];
      d.nodeType === 8 && d.data.slice(0, 2) === "!$" ? d.remove() : s.push(d);
    }
    l = s;
  }
  for (; typeof l == "function"; ) l = l();
  if (t === l) return l;
  const r = typeof t, a = n !== void 0;
  if (e = a && l[0] && l[0].parentNode || e, r === "string" || r === "number") {
    if (o || r === "number" && (t = t.toString(), t === l))
      return l;
    if (a) {
      let s = l[0];
      s && s.nodeType === 3 ? s.data !== t && (s.data = t) : s = document.createTextNode(t), l = ae(e, l, n, s);
    } else
      l !== "" && typeof l == "string" ? l = e.firstChild.data = t : l = e.textContent = t;
  } else if (t == null || r === "boolean") {
    if (o) return l;
    l = ae(e, l, n);
  } else {
    if (r === "function")
      return b(() => {
        let s = t();
        for (; typeof s == "function"; ) s = s();
        l = be(e, s, l, n);
      }), () => l;
    if (Array.isArray(t)) {
      const s = [], u = l && Array.isArray(l);
      if (Ne(s, t, l, i))
        return b(() => l = be(e, s, l, n, !0)), () => l;
      if (o) {
        if (!s.length) return l;
        if (n === void 0) return l = [...e.childNodes];
        let d = s[0];
        if (d.parentNode !== e) return l;
        const f = [d];
        for (; (d = d.nextSibling) !== n; ) f.push(d);
        return l = f;
      }
      if (s.length === 0) {
        if (l = ae(e, l, n), a) return l;
      } else u ? l.length === 0 ? Re(e, s, n) : gt(e, l, s) : (l && ae(e), Re(e, s));
      l = s;
    } else if (t.nodeType) {
      if (o && t.parentNode) return l = a ? [t] : t;
      if (Array.isArray(l)) {
        if (a) return l = ae(e, l, n, t);
        ae(e, l, null, t);
      } else l == null || l === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      l = t;
    }
  }
  return l;
}
function Ne(e, t, l, n) {
  let i = !1;
  for (let o = 0, r = t.length; o < r; o++) {
    let a = t[o], s = l && l[e.length], u;
    if (!(a == null || a === !0 || a === !1)) if ((u = typeof a) == "object" && a.nodeType)
      e.push(a);
    else if (Array.isArray(a))
      i = Ne(e, a, s) || i;
    else if (u === "function")
      if (n) {
        for (; typeof a == "function"; ) a = a();
        i = Ne(
          e,
          Array.isArray(a) ? a : [a],
          Array.isArray(s) ? s : [s]
        ) || i;
      } else
        e.push(a), i = !0;
    else {
      const d = String(a);
      s && s.nodeType === 3 && s.data === d ? e.push(s) : e.push(document.createTextNode(d));
    }
  }
  return i;
}
function Re(e, t, l = null) {
  for (let n = 0, i = t.length; n < i; n++) e.insertBefore(t[n], l);
}
function ae(e, t, l, n) {
  if (l === void 0) return e.textContent = "";
  const i = n || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let r = t.length - 1; r >= 0; r--) {
      const a = t[r];
      if (i !== a) {
        const s = a.parentNode === e;
        !o && !r ? s ? e.replaceChild(i, a) : e.insertBefore(i, l) : s && a.remove();
      } else o = !0;
    }
  } else e.insertBefore(i, l);
  return [i];
}
const Me = Symbol("store-raw"), ce = Symbol("store-node"), Q = Symbol("store-has"), Ze = Symbol("store-self");
function qe(e) {
  let t = e[re];
  if (!t && (Object.defineProperty(e, re, {
    value: t = new Proxy(e, bt)
  }), !Array.isArray(e))) {
    const l = Object.keys(e), n = Object.getOwnPropertyDescriptors(e);
    for (let i = 0, o = l.length; i < o; i++) {
      const r = l[i];
      n[r].get && Object.defineProperty(e, r, {
        enumerable: n[r].enumerable,
        get: n[r].get.bind(t)
      });
    }
  }
  return t;
}
function me(e) {
  let t;
  return e != null && typeof e == "object" && (e[re] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function ue(e, t = /* @__PURE__ */ new Set()) {
  let l, n, i, o;
  if (l = e != null && e[Me]) return l;
  if (!me(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
    for (let r = 0, a = e.length; r < a; r++)
      i = e[r], (n = ue(i, t)) !== i && (e[r] = n);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
    const r = Object.keys(e), a = Object.getOwnPropertyDescriptors(e);
    for (let s = 0, u = r.length; s < u; s++)
      o = r[s], !a[o].get && (i = e[o], (n = ue(i, t)) !== i && (e[o] = n));
  }
  return e;
}
function xe(e, t) {
  let l = e[t];
  return l || Object.defineProperty(e, t, {
    value: l = /* @__PURE__ */ Object.create(null)
  }), l;
}
function ge(e, t, l) {
  if (e[t]) return e[t];
  const [n, i] = $(l, {
    equals: !1,
    internal: !0
  });
  return n.$ = i, e[t] = n;
}
function $t(e, t) {
  const l = Reflect.getOwnPropertyDescriptor(e, t);
  return !l || l.get || !l.configurable || t === re || t === ce || (delete l.value, delete l.writable, l.get = () => e[re][t]), l;
}
function Ge(e) {
  Te() && ge(xe(e, ce), Ze)();
}
function yt(e) {
  return Ge(e), Reflect.ownKeys(e);
}
const bt = {
  get(e, t, l) {
    if (t === Me) return e;
    if (t === re) return l;
    if (t === Ve)
      return Ge(e), l;
    const n = xe(e, ce), i = n[t];
    let o = i ? i() : e[t];
    if (t === ce || t === Q || t === "__proto__") return o;
    if (!i) {
      const r = Object.getOwnPropertyDescriptor(e, t);
      Te() && (typeof o != "function" || e.hasOwnProperty(t)) && !(r && r.get) && (o = ge(n, t, o)());
    }
    return me(o) ? qe(o) : o;
  },
  has(e, t) {
    return t === Me || t === re || t === Ve || t === ce || t === Q || t === "__proto__" ? !0 : (Te() && ge(xe(e, Q), t)(), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: yt,
  getOwnPropertyDescriptor: $t
};
function we(e, t, l, n = !1) {
  if (!n && e[t] === l) return;
  const i = e[t], o = e.length;
  l === void 0 ? (delete e[t], e[Q] && e[Q][t] && i !== void 0 && e[Q][t].$()) : (e[t] = l, e[Q] && e[Q][t] && i === void 0 && e[Q][t].$());
  let r = xe(e, ce), a;
  if ((a = ge(r, t, i)) && a.$(() => l), Array.isArray(e) && e.length !== o) {
    for (let s = e.length; s < o; s++) (a = r[s]) && a.$();
    (a = ge(r, "length", o)) && a.$(e.length);
  }
  (a = r[Ze]) && a.$();
}
function Je(e, t) {
  const l = Object.keys(t);
  for (let n = 0; n < l.length; n += 1) {
    const i = l[n];
    we(e, i, t[i]);
  }
}
function mt(e, t) {
  if (typeof t == "function" && (t = t(e)), t = ue(t), Array.isArray(t)) {
    if (e === t) return;
    let l = 0, n = t.length;
    for (; l < n; l++) {
      const i = t[l];
      e[l] !== i && we(e, l, i);
    }
    we(e, "length", n);
  } else Je(e, t);
}
function fe(e, t, l = []) {
  let n, i = e;
  if (t.length > 1) {
    n = t.shift();
    const r = typeof n, a = Array.isArray(e);
    if (Array.isArray(n)) {
      for (let s = 0; s < n.length; s++)
        fe(e, [n[s]].concat(t), l);
      return;
    } else if (a && r === "function") {
      for (let s = 0; s < e.length; s++)
        n(e[s], s) && fe(e, [s].concat(t), l);
      return;
    } else if (a && r === "object") {
      const { from: s = 0, to: u = e.length - 1, by: d = 1 } = n;
      for (let f = s; f <= u; f += d)
        fe(e, [f].concat(t), l);
      return;
    } else if (t.length > 1) {
      fe(e[n], t, [n].concat(l));
      return;
    }
    i = e[n], l = [n].concat(l);
  }
  let o = t[0];
  typeof o == "function" && (o = o(i, l), o === i) || n === void 0 && o == null || (o = ue(o), n === void 0 || me(i) && me(o) && !Array.isArray(o) ? Je(i, o) : we(e, n, o));
}
function Ke(...[e, t]) {
  const l = ue(e || {}), n = Array.isArray(l), i = qe(l);
  function o(...r) {
    ft(() => {
      n && r.length === 1 ? mt(l, r[0]) : fe(l, r);
    });
  }
  return [i, o];
}
const [xt, ve] = $({ x: 30, y: 40, text: "-" });
var wt = /* @__PURE__ */ x("<svg><g></svg>", !1, !0);
function Ie(e) {
  _e(() => {
    ve({
      x: e.x,
      y: e.y,
      text: e.text
    });
  }), Ee(() => {
    ve(null);
  });
  const t = (n) => {
    n.currentTarget.getBoundingClientRect();
    const i = n.currentTarget.ownerSVGElement.getBoundingClientRect(), o = n.clientX - i.left, r = n.clientY - i.top;
    ve({
      x: o,
      y: r,
      text: e.text
    });
  }, l = () => {
    ve(null);
  };
  return (() => {
    var n = wt();
    return n.addEventListener("mouseleave", l), n.addEventListener("mouseenter", t), y(n, () => e.children), n;
  })();
}
var _t = /* @__PURE__ */ x('<svg><g><path fill=#1a202c stroke=#ffffff stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 27.467192,9.3368497 H 38.081364 V 6.6590449 l 6.078743,5.3556111 -6.078743,5.355609 V 14.692459 H 27.467192 Z"fill-rule=evenodd id=path3></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="m 28.351706,29.007584 h 10.614172 v -2.677807 l 6.078743,5.35561 -6.078743,5.355608 v -2.6778 H 28.351706 Z"fill-rule=evenodd id=path4></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 23.860893,19.267895 H 13.246719 v -2.677807 l -6.07874,5.355612 6.07874,5.355609 v -2.677806 h 10.614174 z"fill-rule=evenodd id=path5></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 23.860893,36.9079 H 13.246719 v -2.677804 l -6.07874,5.355609 6.07874,5.355609 v -2.677808 h 10.614174 z"fill-rule=evenodd id=path6></path><path fill=lightblue transform=translate(8,5) d="M9.12 8c0 .49-.4.89-.89.89s-.89-.4-.89-.89.4-.89.89-.89.89.4.89.89zm-3.2-2.42.84.84c.38-.38.89-.62 1.46-.62s1.08.24 1.46.62l.84-.84c-.59-.59-1.41-.96-2.3-.96s-1.71.37-2.3.96zm-1.67-1.67.84.84c.81-.81 1.92-1.31 3.16-1.31 1.24 0 2.35.5 3.16 1.31l.84-.84c-1.08-1.08-2.58-1.75-4.25-1.75s-3.17.67-4.25 1.75zm4.25-4.25c-2.62 0-5 1.06-6.72 2.79l.84.84c1.46-1.46 3.48-2.37 5.72-2.37s4.26.91 5.72 2.37l.84-.84c-1.72-1.73-4.1-2.79-6.72-2.79z"fill-rule=evenodd></path><text x=37 y=43.5 fill=white stroke=white stroke-width=0.4 font-size=5 text-anchor=middle>DHCP</svg>', !1, !0);
const Pt = (e) => T(Ie, {
  x: 10,
  y: 480,
  text: "Switch Funktion des WLAN-Routers",
  get children() {
    var t = _t();
    return ee(t, "click", e.onClick), b(() => C(t, "transform", `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`)), t;
  }
});
F(["click"]);
var kt = /* @__PURE__ */ x('<svg><g><g><circle cx=25 cy=25 r=25 fill=#1a202c></circle><path d="M 27,-0.5 C 4.280346,-0.5 -7.093581,26.967033 8.969693,43.030307 25.032967,59.093581 52.5,47.719654 52.5,25 52.5,10.916739 41.08326,-0.5 27,-0.5 Z m -6.59812,13.14844 c 0.497667,-0.496459 1.303263,-0.496459 1.80093,0 L 25.725,16.13875 V 6.28937 c 6.73e-4,-1.699326 2.550673,-1.699326 2.55,0 v 9.84938 l 3.50625,-3.49031 c 1.211263,-1.204958 3.016518,0.616265 1.80094,1.81687 L 27,20.98375 20.40188,14.44937 c -0.496459,-0.497667 -0.496459,-1.303263 0,-1.80093 z M 14.76,31.48656 c 0.702959,0 -1.303272,0.496465 -1.80094,0 L 6.28125,25 12.95906,18.48156 c 1.210843,-1.310625 3.116852,0.629426 1.785,1.81688 l -3.50625,3.41062 h 9.99282 c 1.699047,9.52e-4 1.699047,2.550952 0,2.55 h -9.99282 l 3.50625,3.42656 c 0.500886,0.493273 -0.687098,1.80094 0.0159,1.80094 z m 18.83813,5.84906 c -0.497668,0.496465 -1.303272,0.496465 -1.80094,0 L 28.275,33.86125 v 9.83344 c -6.73e-4,1.699326 -2.550673,1.699326 -2.55,0 v -9.83344 l -3.50625,3.49031 c -1.211258,1.203503 -3.015063,-0.616257 -1.80094,-1.81687 L 27,29.00031 l 6.59813,6.53438 c 0.496459,0.497667 0.496459,1.303263 0,1.80093 z m 7.44281,-5.83312 c -1.21084,1.310625 -3.116852,-0.629426 -1.785,-1.81688 l 3.50625,-3.42656 h -9.97688 c -1.699047,-9.52e-4 -1.699047,-2.550952 0,-2.55 h 9.99282 l -3.50625,-3.41062 c -1.331852,-1.187454 0.57416,-3.127505 1.785,-1.81688 L 47.71875,25 Z"id=path2 stroke=none fill=white></svg>', !1, !0);
const Ct = (e) => T(Ie, {
  x: 10,
  y: 480,
  text: "Router Funktion des WLAN-Routers",
  get children() {
    var t = kt();
    return ee(t, "click", e.onClick), b(() => C(t, "transform", `translate(${e.x - 27}, ${e.y - 25}) scale(${e.scale})`)), t;
  }
});
F(["click"]);
var St = /* @__PURE__ */ x('<svg><g cursor=pointer><rect x=0 y=0 width=30 height=30 fill=#1a202c></rect><path d="M 3.89,0 C 1.74,0 0,1.74 0,3.89 v 17.5 c 0,2.15 1.74,3.89 3.89,3.89 l 9.074811,-0.06958 -0.302087,1.905209 L 9.73,27.22 c -1.0793167,0.03841 -1.94,0.87 -1.94,1.94 0,1.08 0.8700386,1.949087 1.94,1.94 l 12.289622,-0.104374 c 1.079961,-0.0092 1.835627,-1.183121 1.835627,-2.253121 0,-1.08 -0.871229,-1.819152 -1.94,-1.870418 l -2.901293,-0.139165 -0.197713,-1.782664 9.527097,-0.06958 c 2.149943,-0.0157 3.128292,-1.983543 3.124592,-3.820418 L 31.433141,3.7856262 C 31.41833,1.0789662 29.4,0 27.25,0 Z M 27.25,3.89 V 17.5 H 3.89 V 3.89 Z"></svg>', !1, !0);
const At = ({
  x: e,
  y: t,
  role: l,
  color: n,
  onClick: i
}) => (() => {
  var o = St(), r = o.firstChild, a = r.nextSibling;
  return ee(o, "click", i), C(o, "transform", `translate(${e - 17}, ${t - 10})`), C(a, "fill", n), o;
})();
F(["click"]);
var Tt = /* @__PURE__ */ x('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path d="M 44.966127,13.05536 H 41.465515 V 7.9074012 A 4.9420396,4.9420396 0 0 0 36.755134,2.7594433 H 15.288149 A 4.9420396,4.9420396 0 0 0 10.577768,7.9074012 V 13.05536 H 7.0771574 a 6.846784,6.846784 0 0 0 -6.79530499,6.872524 v 17.1427 a 6.846784,6.846784 0 0 0 6.79530499,6.872523 h 2.213621 a 5.1479579,5.1479579 0 0 0 5.1479576,5.147958 h 23.165811 a 5.1479579,5.1479579 0 0 0 5.147958,-5.147958 h 2.213622 a 6.846784,6.846784 0 0 0 6.795304,-6.872523 v -17.1427 A 6.846784,6.846784 0 0 0 44.966127,13.05536 Z M 15.725725,7.9074012 H 36.317557 V 13.05536 H 15.725725 Z M 14.438736,43.943107 V 33.647192 h 23.165811 v 10.295915 z"id=path3 style=stroke-width:2.57398></svg>', !1, !0);
const Et = (e) => (() => {
  var t = Tt(), l = t.firstChild, n = l.nextSibling;
  return ee(t, "click", e.onClick), b((i) => {
    var o = `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`, r = e.color;
    return o !== i.e && C(t, "transform", i.e = o), r !== i.t && C(n, "fill", i.t = r), i;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
F(["click"]);
var Nt = /* @__PURE__ */ x('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path d="M 3.25,4 C 1.4495,4 0,5.4495 0,7.25 v 32.5 C 0,41.5505 1.4495,43 3.25,43 H 6.4873048 L 0,49.487305 H 6.5 L 12.987305,43 h 26.02539 L 45.5,49.487305 H 52 L 45.512695,43 H 48.75 C 50.5505,43 52,41.5505 52,39.75 V 7.25 C 52,5.4495 50.5505,4 48.75,4 Z m 1.625,3.2373049 h 42.25 c 0,0 1.625,0 1.625,1.6249999 V 38.112306 c 0,1.625 -1.625,1.625 -1.625,1.625 H 4.875 c -1.625,0 -1.625,-1.625 -1.625,-1.625 V 8.8623048 c 0,0 0,-1.625 1.625,-1.6249999 z"id=path1 style=stroke-width:3.25></svg>', !1, !0);
const Mt = (e) => (() => {
  var t = Nt(), l = t.firstChild, n = l.nextSibling;
  return ee(t, "click", e.onClick), b((i) => {
    var o = `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`, r = e.color;
    return o !== i.e && C(t, "transform", i.e = o), r !== i.t && C(n, "fill", i.t = r), i;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
F(["click"]);
var Xt = /* @__PURE__ */ x('<svg><g><g fill=#1a202c stroke=white stroke-linecap=round stroke-linejoin=round stroke-miterlimit=10 stroke-width=1.5 id=g3 transform=matrix(2.4257541,0,0,2.4257541,-3.1269462,-4.5157475)><path d="m 7.26906,13.0098 c -0.53,-0.27 -1.12,-0.41 -1.72,-0.41 -4.679998,0.33 -4.679998,7.14 0,7.47 H 16.6391 c 1.35,0.01 2.65,-0.49 3.64,-1.4 3.29,-2.87 1.53,-8.64 -2.8,-9.19004 -1.56,-9.370003 -15.09004,-5.81 -11.88004,3.12004"id=path1></path><text x=9 y=15 stroke=none fill=white font-size=3>Internet</svg>', !1, !0);
const Ht = (e) => (() => {
  var t = Xt();
  return ee(t, "click", e.onClick), b(() => C(t, "transform", `translate(${e.x - 50}, ${e.y - 20}) scale(${e.scale})`)), t;
})();
F(["click"]);
var It = /* @__PURE__ */ x('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path style="stroke:#000000;stroke-width:0.0942123;stroke-linejoin:round;paint-order:stroke fill markers"d="m 16.862342,51.997696 c -1.075084,-0.112511 -2.05623,-0.629494 -2.81195,-1.481673 -0.606442,-0.683846 -0.99723,-1.478324 -1.182546,-2.404124 -0.08256,-0.412478 -0.08652,-1.42271 -0.08652,-22.087902 0,-20.7683452 0.0036,-21.6736757 0.08766,-22.0954943 0.180391,-0.9051494 0.561892,-1.6857033 1.155474,-2.3641094 0.788682,-0.9013869 1.740115,-1.3970751 2.911572,-1.51690371 0.68286,-0.06984992 21.106949,-0.06937781 21.839706,5.0492e-4 1.918467,0.18296326 3.419838,1.52073859 4.010516,3.57351399 l 0.110671,0.384613 0.01239,21.8269715 c 0.01204,21.18475 0.0097,21.840978 -0.07786,22.302998 C 42.429956,50.253426 40.799243,51.807018 38.77573,52 38.133884,52.06121 17.448499,52.05903 16.862339,51.9977 Z m 11.793312,-3.290627 c 0.583152,-0.159722 1.234131,-0.620988 1.597899,-1.132223 0.22752,-0.319756 0.484274,-0.890638 0.56959,-1.26646 0.09121,-0.4018 0.07768,-1.248045 -0.02601,-1.626906 -0.240727,-0.879528 -0.856487,-1.688344 -1.571582,-2.064318 -0.931559,-0.489775 -2.043048,-0.449248 -2.919402,0.106451 -1.690193,1.071756 -1.994065,3.625097 -0.608796,5.115506 0.798161,0.858739 1.857352,1.169501 2.958301,0.86795 z m 9.000288,-9.706039 c 0.263827,-0.08398 0.661726,-0.512649 0.739675,-0.79688 0.04531,-0.165215 0.05841,-3.81095 0.05841,-16.254639 0,-14.2190157 -0.0083,-16.0669755 -0.07299,-16.264525 -0.10786,-0.3293604 -0.277898,-0.5391612 -0.559502,-0.690343 l -0.250929,-0.1347142 -9.70489,4.999e-4 -9.704891,4.999e-4 -0.240157,0.1220107 C 17.634484,5.1283348 17.504037,5.2714138 17.372345,5.5843601 17.274393,5.81713 17.274356,5.823202 17.273302,21.964711 l -0.0011,16.147494 0.125043,0.270336 c 0.135947,0.29391 0.349152,0.499086 0.631352,0.607583 0.253156,0.09733 19.322502,0.107919 19.627299,0.01089 z"id=path4></svg>', !1, !0);
const Lt = (e) => (() => {
  var t = It(), l = t.firstChild, n = l.nextSibling;
  return ee(t, "click", e.onClick), b((i) => {
    var o = `translate(${e.x - 20}, ${e.y - 25}) scale(${e.scale})`, r = e.color;
    return o !== i.e && C(t, "transform", i.e = o), r !== i.t && C(n, "fill", i.t = r), i;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
F(["click"]);
const Ot = [{ destinationMac: "b2:77:3a:8c:14:5f", port: "to 255" }], [$e, Be] = Ke(Ot), Ue = [
  { id: 0, color: "red", position: [370, 320], type: "cloud", role: "leaf", mac: "b2:77:3a:8c:14:5f", subnet: "213.3", name: "Swisscom" },
  { id: 1, color: "white", position: [250, 250], type: "Switch", role: "transit", mac: "1c:4f:9b:2d:63:e1", subnet: "192.168.1", name: "WLAN-B", forwarding: "clientIsolation" },
  { id: 4, color: "blue", position: [100, 400], type: "computer", role: "source", mac: "03:aa:66:de:9e:21", subnet: "192.168.1", name: "My Laptop" },
  { id: 13, color: "green", position: [100, 100], type: "printer", role: "destination", mac: "fe:08:d8:75:82:a0", ip: "10.0.0.4", name: "HPP 1000" },
  { id: 61, color: "purple", position: [100, 250], type: "tv", role: "leaf", mac: "7a:10:fe:88:3c:93", subnet: "192.168.1", name: "Samsung HDTV" },
  { id: 76, color: "orange", position: [250, 100], type: "mobile", role: "leaf", mac: "e5:3b:cd:1a:f7:08", subnet: "192.168.1", name: "My Phone" },
  { id: 255, color: "pink", position: [250, 320], type: "router", role: "transit", mac: "b2:77:3a:8c:14:5f", subnet: "192.168.1", name: "WLAN-R" }
], ye = [
  { id: 1, nodes: [13, 1], type: "wireless" },
  { id: 2, nodes: [1, 255], type: "internal" },
  { id: 3, nodes: [1, 4], type: "wireless" },
  { id: 4, nodes: [255, 0], type: "fixed" },
  { id: 5, nodes: [1, 61], type: "wireless" },
  { id: 6, nodes: [1, 76], type: "wireless" }
];
var jt = /* @__PURE__ */ x('<div class="switch-pref absolute top-0 right-0 m-4 bg-gray-900 text-white text-xs p-4 rounded shadow-lg"><h2 class="text-white mb-2">Switch Settings (ID: <!>)</h2><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-6"><div class="flex flex-col"><span class=mb-2>Name:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"title="Enter the name of the switch"></div><div class="flex flex-col"><span class=mb-2>Allowed Ports:</span><div class="grid grid-cols-4 gap-4"></div></div><div class="flex flex-col"><span class=mb-2>Forwarding Table:</span><div class="grid grid-cols-2 gap-2">'), Ft = /* @__PURE__ */ x('<label class="flex items-center space-x-2"><input type=checkbox name=allowedPorts class="form-checkbox text-blue-500"><span>'), Vt = /* @__PURE__ */ x('<div class="flex space-x-2"><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder="Destination MAC"title="Enter the destination MAC address"><input type=text class="bg-gray-700 text-white p-2 rounded w-16"placeholder=Port title="Enter the outgoing port number (1-8)">'), Dt = /* @__PURE__ */ x('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Save'), zt = /* @__PURE__ */ x('<div class="text-red-500 mt-4">');
const Rt = ({
  selectedSwitch: e,
  allowedPorts: t,
  setAllowedPorts: l,
  onClose: n
}) => {
  const [i, o] = $(e?.forwarding || "clientIsolation"), [r, a] = $(e?.name || "no switch selected"), [s, u] = $(""), d = () => {
    if (!r()) {
      u("Name is required.");
      return;
    }
    u("");
  }, f = (v, S) => {
    if (S && !/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(S)) {
      u(`Incomplete MAC address at row ${v + 1}.`);
      return;
    }
    u("");
  }, p = (v, S, L) => {
  };
  return Xe(() => {
    console.log("Allowed ports:", t());
  }), (() => {
    var v = jt(), S = v.firstChild, L = S.firstChild, R = L.nextSibling;
    R.nextSibling;
    var K = S.nextSibling, q = K.firstChild, G = q.firstChild, ie = G.firstChild, V = ie.nextSibling, te = G.nextSibling, U = te.firstChild, le = U.nextSibling, P = te.nextSibling, I = P.firstChild, B = I.nextSibling;
    return v.$$click = (g) => g.stopPropagation(), y(S, () => e.name, R), V.$$input = (g) => {
      a(g.target.value), d();
    }, y(le, T(De, {
      get each() {
        return Ue.filter((g, k) => k !== 0 && k !== 1).map((g) => g.id);
      },
      children: (g) => (() => {
        var k = Ft(), N = k.firstChild, J = N.nextSibling;
        return N.addEventListener("change", (oe) => {
          console.log(`Toggled port: ${g}`), l((z) => {
            if (oe.target.checked) {
              if (!z.includes(g))
                return [...z, g];
            } else
              return z.filter((Pe) => Pe !== g);
            return z;
          });
        }), N.value = g, y(J, `to ${g}`), b(() => N.checked = t().includes(g)), k;
      })()
    })), y(B, T(De, {
      each: $e,
      children: (g, k) => (() => {
        var N = Vt(), J = N.firstChild, oe = J.nextSibling;
        return J.addEventListener("blur", (z) => f(k(), z.target.value)), J.$$input = (z) => p(k(), "destinationMac", z.target.value), oe.$$input = (z) => p(k(), "port", z.target.value), b(() => J.value = g.destinationMac), b(() => oe.value = g.port), N;
      })()
    })), y(q, (() => {
      var g = E(() => !!(r() && !s()));
      return () => g() && (() => {
        var k = Dt();
        return k.$$click = () => {
          console.log("Save computer preferences"), n();
        }, k;
      })();
    })(), null), y(q, (() => {
      var g = E(() => !!s());
      return () => g() && (() => {
        var k = zt();
        return y(k, s), k;
      })();
    })(), null), b(() => V.value = r()), v;
  })();
};
F(["click", "input"]);
var Bt = /* @__PURE__ */ x('<div class="computer-pref absolute m-4 bg-gray-900 text-white"><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-6"><div class="flex flex-col"><span class=mb-2>Name:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"title="Enter the name of the computer"></div><div class="flex flex-col"><span class=mb-2>MAC-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=fe:08:d8:75:82:a0 title="Enter the MAC address of the computer (Format: XX:XX:XX:XX:XX:XX)"></div><div class="flex flex-col"><span class=mb-2>IP-Address (Subnet.Id):</span><label class="flex space-x-2 w-full"><input type=text class="bg-gray-700 text-white p-2 rounded flex-grow"placeholder=Subnet title="Enter the subnet portion of the IP address (Format: XXX.XXX.XXX)"><span>.</span><input type=text class="bg-gray-700 text-white p-2 rounded w-12"placeholder=ID title="Enter the host ID portion of the IP address (Format: XXX)">'), Wt = /* @__PURE__ */ x('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Save'), Zt = /* @__PURE__ */ x('<div class="text-red-500 mt-4">');
const qt = ({
  selectedComputer: e,
  onClose: t
}) => {
  const [l, n] = $(e?.name || ""), [i, o] = $(e?.mac || ""), [r, a] = $(e?.subnet || ""), [s, u] = $(e?.id || ""), [d, f] = $(""), p = () => {
    if (!l()) {
      f("Name is required.");
      return;
    }
    if (!/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(i())) {
      f("Invalid MAC-Address format.");
      return;
    }
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(r())) {
      f("Invalid Subnet format.");
      return;
    }
    if (!/^\d{1,3}$/.test(s())) {
      f("Invalid ID format.");
      return;
    }
    f("");
  };
  return _e(() => {
    console.log("ComputerPref component mounted");
  }), (() => {
    var v = Bt(), S = v.firstChild, L = S.firstChild, R = L.firstChild, K = R.firstChild, q = K.nextSibling, G = R.nextSibling, ie = G.firstChild, V = ie.nextSibling, te = G.nextSibling, U = te.firstChild, le = U.nextSibling, P = le.firstChild, I = P.nextSibling, B = I.nextSibling;
    return v.$$click = (g) => g.stopPropagation(), q.$$input = (g) => {
      n(g.target.value), p();
    }, V.$$input = (g) => {
      o(g.target.value), p();
    }, P.$$input = (g) => {
      a(g.target.value), p();
    }, B.$$input = (g) => {
      u(g.target.value), p();
    }, y(L, (() => {
      var g = E(() => !!(l() && i() && r() && s() && !d()));
      return () => g() && (() => {
        var k = Wt();
        return k.$$click = () => {
          console.log("Save computer preferences"), t();
        }, k;
      })();
    })(), null), y(L, (() => {
      var g = E(() => !!d());
      return () => g() && (() => {
        var k = Zt();
        return y(k, d), k;
      })();
    })(), null), b((g) => {
      var k = `${e.position[1] - 300}px`, N = `${e.position[0] - 100}px`;
      return k !== g.e && ((g.e = k) != null ? v.style.setProperty("top", k) : v.style.removeProperty("top")), N !== g.t && ((g.t = N) != null ? v.style.setProperty("left", N) : v.style.removeProperty("left")), g;
    }, {
      e: void 0,
      t: void 0
    }), b(() => q.value = l()), b(() => V.value = i()), b(() => P.value = r()), b(() => B.value = s()), v;
  })();
};
F(["click", "input"]);
var Gt = /* @__PURE__ */ x('<div class="popup absolute bg-gray-800 text-white text-xs border border-white p-2 rounded shadow-lg"><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Preferences</button><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Select Printer</button><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Print Test Page');
const Jt = ({
  selectedComputer: e,
  onClose: t,
  onPing: l,
  onPrinterSelect: n,
  onPrintTestPage: i,
  onPreferences: o
}) => (console.log(e), (() => {
  var r = Gt(), a = r.firstChild, s = a.nextSibling, u = s.nextSibling;
  return r.$$click = (d) => d.stopPropagation(), a.$$click = () => {
    o(e), t();
  }, s.$$click = () => {
    l(e), n(e), t();
  }, u.$$click = () => {
    i(e), t();
  }, b((d) => {
    var f = `${e.position[1]}px`, p = `${e.position[0]}px`;
    return f !== d.e && ((d.e = f) != null ? r.style.setProperty("top", f) : r.style.removeProperty("top")), p !== d.t && ((d.t = p) != null ? r.style.setProperty("left", p) : r.style.removeProperty("left")), d;
  }, {
    e: void 0,
    t: void 0
  }), r;
})());
F(["click"]);
var Kt = /* @__PURE__ */ x('<div class="printer-pref absolute top-10 left-0 m-4 bg-gray-900 text-white"><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-6"><div class="flex flex-col"><span class=mb-2>Name:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"title="Enter the name of the printer"></div><div class="flex flex-col"><span class=mb-2>MAC-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=fe:08:d8:75:82:a0 title="Enter the MAC address of the computer (Format: XX:XX:XX:XX:XX:XX)"></div><div class="flex flex-col"><span class=mb-2>IP-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=192.168.0.1 title="Enter the IP address of the printer">'), Ut = /* @__PURE__ */ x('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Save'), Yt = /* @__PURE__ */ x('<div class="text-red-500 mt-4">');
const Qt = ({
  selectedPrinter: e,
  onSave: t,
  onClose: l
}) => {
  const [n, i] = $(e?.name || "no printer selected"), [o, r] = $(e?.ip || ""), [a, s] = $(e?.mac || ""), [u, d] = $(""), f = () => {
    e.id;
  };
  Xe(() => {
    f();
  });
  const p = () => {
    if (!n()) {
      d("Name is required.");
      return;
    }
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(o())) {
      d("Invalid IP-Address format.");
      return;
    }
    d("");
  };
  return _e(() => {
    console.log("PrinterPref component mounted");
  }), (() => {
    var v = Kt(), S = v.firstChild, L = S.firstChild, R = L.firstChild, K = R.firstChild, q = K.nextSibling, G = R.nextSibling, ie = G.firstChild, V = ie.nextSibling, te = G.nextSibling, U = te.firstChild, le = U.nextSibling;
    return v.$$click = (P) => P.stopPropagation(), q.$$input = (P) => {
      i(P.target.value), p();
    }, V.$$input = (P) => {
      s(P.target.value), p();
    }, le.$$input = (P) => {
      r(P.target.value), p();
    }, y(L, (() => {
      var P = E(() => !!(n() && o() && !u()));
      return () => P() && (() => {
        var I = Ut();
        return I.$$click = () => {
          console.log("Save printer preferences"), t(e.id, {
            name: n(),
            ip: o()
          }), l();
        }, I;
      })();
    })(), null), y(L, (() => {
      var P = E(() => !!u());
      return () => P() && (() => {
        var I = Yt();
        return y(I, u), I;
      })();
    })(), null), b((P) => {
      var I = `${e.position[1]}px`, B = `${e.position[0] - 100}px`;
      return I !== P.e && ((P.e = I) != null ? v.style.setProperty("top", I) : v.style.removeProperty("top")), B !== P.t && ((P.t = B) != null ? v.style.setProperty("left", B) : v.style.removeProperty("left")), P;
    }, {
      e: void 0,
      t: void 0
    }), b(() => q.value = n()), b(() => V.value = a()), b(() => le.value = o()), v;
  })();
};
F(["click", "input"]);
var el = /* @__PURE__ */ x('<div class="computer-pref absolute m-4 bg-gray-900 text-white"><h2 class="text-lg font-bold mb-4"></h2><div class="flex flex-col space-y-4"><div class=text-bg-300></div><div class="flex justify-end space-x-4 mt-6"><button class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded">Ok');
const tl = ({
  selectedComputer: e,
  title: t,
  message: l,
  onClose: n
}) => (() => {
  var i = el(), o = i.firstChild, r = o.nextSibling, a = r.firstChild, s = a.nextSibling, u = s.firstChild;
  return i.$$click = (d) => d.stopPropagation(), y(o, t), y(a, l), ee(u, "click", n), b((d) => {
    var f = `${e.position[1] - 300}px`, p = `${e.position[0] - 100}px`;
    return f !== d.e && ((d.e = f) != null ? i.style.setProperty("top", f) : i.style.removeProperty("top")), p !== d.t && ((d.t = p) != null ? i.style.setProperty("left", p) : i.style.removeProperty("left")), d;
  }, {
    e: void 0,
    t: void 0
  }), i;
})();
F(["click"]);
var ll = /* @__PURE__ */ x('<div class="select-printer-dialog absolute top-40 left-0 m-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg"><h2 class="text-lg font-bold mb-4">Select a Printer</h2><div class="flex flex-col space-y-4"></div><div class="flex justify-end space-x-4 mt-6"><button class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded">Cancel'), nl = /* @__PURE__ */ x("<div class=text-gray-300>No printers available."), il = /* @__PURE__ */ x('<label><div class="flex items-center space-x-3"><input type=radio name=printer class=accent-blue-500><span class=text-white>'), rl = /* @__PURE__ */ x('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Confirm');
const ol = ({
  selectedComputer: e,
  availablePrinters: t,
  selectedPrinter: l,
  setSelectedPrinter: n,
  onConfirm: i,
  onClose: o
}) => (() => {
  var r = ll(), a = r.firstChild, s = a.nextSibling, u = s.nextSibling, d = u.firstChild;
  return r.$$click = (f) => f.stopPropagation(), y(s, (() => {
    var f = E(() => t.length === 0);
    return () => f() && nl();
  })(), null), y(s, () => t.map((f) => (() => {
    var p = il(), v = p.firstChild, S = v.firstChild, L = S.nextSibling;
    return S.addEventListener("change", () => n(f.id)), y(L, () => f.name), b(() => ht(p, `flex items-center justify-between p-3 mb-2 rounded cursor-pointer border 
                ${l() === f.id ? "bg-blue-700 border-blue-500" : "bg-gray-800 border-gray-600"}`)), b(() => S.value = f.id), b(() => S.checked = l() === f.id), p;
  })()), null), ee(d, "click", o), y(u, (() => {
    var f = E(() => t.length !== 0);
    return () => f() && (() => {
      var p = rl();
      return p.$$click = () => {
        l() && i(l());
      }, b(() => p.disabled = !l()), p;
    })();
  })(), null), b((f) => {
    var p = `${e.position[1] - 300}px`, v = `${e.position[0] - 100}px`;
    return p !== f.e && ((f.e = p) != null ? r.style.setProperty("top", p) : r.style.removeProperty("top")), v !== f.t && ((f.t = v) != null ? r.style.setProperty("left", v) : r.style.removeProperty("left")), f;
  }, {
    e: void 0,
    t: void 0
  }), r;
})();
F(["click"]);
var sl = /* @__PURE__ */ x("<svg><g pointer-events=none><rect x=-27 y=-20 height=35 fill=black stroke=white strokeWidth=1 rx=5></rect><text x=-15 y=3 fill=white fontSize=8></svg>", !1, !0);
function al() {
  return T(ut, {
    get when() {
      return xt();
    },
    children: (e) => {
      const t = e();
      return (() => {
        var l = sl(), n = l.firstChild, i = n.nextSibling;
        return y(i, () => t.text), b((o) => {
          var r = `translate(${t.x}, ${t.y - 10})`, a = t.text.length * 7 + 20;
          return r !== o.e && C(l, "transform", o.e = r), a !== o.t && C(n, "width", o.t = a), o;
        }, {
          e: void 0,
          t: void 0
        }), l;
      })();
    }
  });
}
var cl = /* @__PURE__ */ x('<div class="bg-gray-900 relative border text-sm"><svg width=500 height=500><text x=10 y=30 fill=white fontSize=12 fontWeight=bold>Subnet: 192.168.1</text><defs><linearGradient id=halfRedHalfGreen x1=0% y1=0% x2=100% y2=0%><stop offset=49.9%></stop><stop offset=50%></stop></linearGradient></defs> Always on top'), dl = /* @__PURE__ */ x("<svg><path stroke=white fill=none></svg>", !1, !0), fl = /* @__PURE__ */ x("<svg><text fill=white fontSize=12 fontWeight=bold></svg>", !1, !0), ul = /* @__PURE__ */ x("<svg><g></svg>", !1, !0), gl = /* @__PURE__ */ x("<svg><circle r=8 fill=url(#halfRedHalfGreen)></svg>", !1, !0);
let D = [4, 1, [255]], hl = [4, 1, 255];
function Se(e, t, l) {
  let n = [], i = Array.isArray(e) ? e : [e], o = Array.isArray(t) ? t : [t];
  return i.forEach((r) => {
    o.forEach((a) => {
      ye.some((s) => s.nodes.includes(r) && s.nodes.includes(a)) && n.push({
        threadIndex: l,
        nodeId: r,
        nextNodeId: a
      });
    });
  }), n;
}
let Ae = [];
const wl = () => {
  const [e, t] = $("white"), [l, n] = $("blue"), [i, o] = $(!1), [r, a] = $(null), [s, u] = $(null), [d, f] = $(!1), [p, v] = $(!1), [S, L] = $(!1), [R, K] = $(null), [q, G] = $(!1), [ie, V] = $(!1), [te, U] = $(""), [le, P] = $(!1), [I, B] = $([]), [g, k] = Ke(Ue), N = (h) => g.find((_) => _.id === h), [J, oe] = $([255]), [z, Pe] = $(null), he = (h) => {
    D = JSON.parse(JSON.stringify(hl)), D[0] = h.id;
    let _ = D[D.length - 1];
    _ = Array.isArray(_) ? _ : [_], _.map((X) => N(X)).forEach((X) => {
      let W = $e.find((Z) => Z.destinationMac === X.mac);
      W ? console.log("entry found:", W) : (console.log("entry not found:", X.mac), Be((Z) => [...Z, {
        destinationMac: X.mac,
        port: `to ${X.id === 0 ? 255 : X.id}`
      }]));
    }), console.log("fwding table:", h.id, $e), n(h.color), t("white"), Le();
  }, Ye = (h) => {
    console.log(`Printer ${h.id} clicked!`), K(h);
  }, Qe = (h) => {
    f(!0), a(h);
  }, et = (h) => {
    L(!0), u(h);
  }, tt = (h) => {
    console.debug(`Preferences for Computer ${h.id}`), v(!0), u(h);
  }, lt = (h) => {
    P(!0);
  }, nt = (h, _) => {
    console.log("Printer IP changed:", h, _), k((M) => M.id === h, "ip", _.ip);
  }, it = (h) => {
    let _ = g.find((M) => M.type === "printer");
    console.log("handlePrintTestPage: nodes:", g), console.log("handlePrintTestPage: available:", I()), console.log("handlePrintTestPage: computer:", h), console.log("handlePrintTestPage: printer:", _), I().some((M) => M.id === _.id) ? (console.log("handlePrintTestPage: Printer available"), _ && _.ip.startsWith(h.subnet) && !_.ip.endsWith(h.id) ? (U(`Print test page to ${_.name}`), V(!0)) : (U(`Could not print test page to ${_.name}`), V(!0))) : (console.log("handlePrintTestPage: Printer not available"), U("Printer not available"), V(!0));
  };
  Xe(() => {
    console.log("broadcast has changed:", i()), J().includes(13) ? B([{
      id: 13,
      name: "HPP 1000"
    }]) : B([]);
  });
  const rt = (h) => {
    !h.target.closest(".Switch-pref") && !h.target.closest(".popup") && !h.target.closest(".computer-pref") && !h.target.closest(".printer-pref") && ot();
  }, ot = () => {
    a(null), u(null), K(null), v(!1), f(!1), G(!1), L(!1);
  }, [pl, vl] = $(!1), [$l, yl] = $(0), [bl, ml] = $(0), [st, at] = $([]);
  let Y = Se(D[0], D[1], 1), se = 0, j = null;
  function ke() {
    console.debug(`updatePositions: ${JSON.stringify(Y)}`), at(Y.map((h) => ({
      id: h.nextNodeId,
      pos: {
        x: N(h.nodeId).position[0],
        y: N(h.nodeId).position[1]
      }
    })));
  }
  function Ce() {
    if (console.debug(`movingCircles: ${JSON.stringify(Y)}`), Y.length === 0) {
      cancelAnimationFrame(j), j = null, console.debug("Animation complete!");
      return;
    }
    const h = 30;
    if (Y.forEach(({
      threadIndex: _,
      nodeId: M,
      nextNodeId: X
    }) => {
      console.debug(`current: ${M}`, `next: ${X}`);
      const W = ye.findIndex((H) => H.nodes.includes(M) && H.nodes.includes(X));
      if (W === -1 || !Ae[W]) {
        console.warn("Path not found for:", M, "->", X);
        return;
      }
      const Z = Ae[W], de = ye[W], pe = Z.getTotalLength(), A = de.nodes[0] !== M ? 1 - (se + 1) / h : (se + 1) / h, w = Z.getPointAtLength(pe * A), m = document.getElementById(`circle-${X}`);
      console.debug(`move circle-${X}`), m ? (m.setAttribute("cx", w.x), m.setAttribute("cy", w.y)) : console.warn("Circle not found for:", M);
    }), se + 1 < h)
      se++;
    else {
      se = 0;
      let _ = [];
      Y.forEach(({
        threadIndex: M,
        nodeId: X,
        nextNodeId: W
      }) => {
        let Z = D[M + 1], de = Se(W, Z, M + 1);
        _.push(...de);
      }), Y = _, ke();
    }
    Y.length > 0 ? j = requestAnimationFrame(Ce) : (console.debug("Animation complete!"), cancelAnimationFrame(j), j = null);
  }
  function ct() {
    j || (console.debug("Starting animation..."), ke(), j = requestAnimationFrame(Ce));
  }
  function dt() {
    j && (cancelAnimationFrame(j), j = null, console.debug("Animation stopped."));
  }
  function Le() {
    console.debug("Redoing animation..."), se = 0, cancelAnimationFrame(j), j = null, Y = Se(D[0], D[1], 1), ke(), j = requestAnimationFrame(Ce);
  }
  return Ee(() => dt()), _e(() => {
    ct();
  }), Ee(() => {
    cancelAnimationFrame(j);
  }), (() => {
    var h = cl(), _ = h.firstChild, M = _.firstChild, X = M.nextSibling, W = X.firstChild, Z = W.firstChild, de = Z.nextSibling, pe = X.nextSibling;
    return h.$$click = rt, y(_, () => ye.map((c, A) => {
      const w = N(c.nodes[0]), m = N(c.nodes[1]);
      return (() => {
        var H = dl();
        return pt((O) => Ae[A] = O, H), b((O) => {
          var Oe = `M ${w.position[0]} ${w.position[1]} L ${m.position[0]} ${m.position[1]}`, je = c.type === "internal" ? "8" : "1", Fe = c.type === "wireless" ? "5,5" : "0";
          return Oe !== O.e && C(H, "d", O.e = Oe), je !== O.t && C(H, "stroke-width", O.t = je), Fe !== O.a && C(H, "stroke-dasharray", O.a = Fe), O;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), H;
      })();
    }), M), y(_, () => g.map((c) => (() => {
      var A = ul();
      return y(A, (() => {
        var w = E(() => c.type === "Switch");
        return () => w() ? T(Pt, {
          get x() {
            return c.position[0];
          },
          get y() {
            return c.position[1];
          },
          scale: 1,
          onClick: (m) => {
            m.stopPropagation(), Qe(c);
          }
        }) : E(() => c.type === "router")() ? T(Ct, {
          get x() {
            return c.position[0];
          },
          get y() {
            return c.position[1];
          },
          scale: 1,
          onClick: (m) => {
            m.stopPropagation(), he(c);
          }
        }) : E(() => c.type === "printer")() ? T(Et, {
          get x() {
            return c.position[0];
          },
          get y() {
            return c.position[1];
          },
          scale: 0.7,
          get role() {
            return c.role;
          },
          get color() {
            return c.color;
          },
          onClick: (m) => {
            m.stopPropagation(), Ye(c);
          }
        }) : E(() => c.type === "tv")() ? T(Mt, {
          get x() {
            return c.position[0];
          },
          get y() {
            return c.position[1];
          },
          scale: 0.7,
          get color() {
            return c.color;
          },
          onClick: (m) => {
            m.stopPropagation(), he(c);
          }
        }) : E(() => c.type === "mobile")() ? T(Lt, {
          get x() {
            return c.position[0];
          },
          get y() {
            return c.position[1];
          },
          scale: 0.7,
          get color() {
            return c.color;
          },
          onClick: (m) => {
            m.stopPropagation(), he(c);
          }
        }) : E(() => c.type === "cloud")() ? T(Ht, {
          get x() {
            return c.position[0];
          },
          get y() {
            return c.position[1];
          },
          scale: 3,
          onClick: (m) => {
            m.stopPropagation(), he(c);
          }
        }) : T(At, {
          get x() {
            return c.position[0];
          },
          get y() {
            return c.position[1];
          },
          get role() {
            return c.role;
          },
          get color() {
            return c.color;
          },
          onClick: (m) => {
            m.stopPropagation(), et(c);
          }
        });
      })(), null), y(A, T(Ie, {
        get x() {
          return c.position[0] + 10;
        },
        get y() {
          return c.position[1] - 25;
        },
        get text() {
          return `id=${c.id}`;
        },
        get children() {
          var w = fl();
          return y(w, () => c.id), b((m) => {
            var H = c.position[0] + 30, O = c.position[1] - 25;
            return H !== m.e && C(w, "x", m.e = H), O !== m.t && C(w, "y", m.t = O), m;
          }, {
            e: void 0,
            t: void 0
          }), w;
        }
      }), null), A;
    })()), X), y(_, () => st().map((c) => (() => {
      var A = gl();
      return b((w) => {
        var m = `circle-${c.id}`, H = c.pos.x, O = c.pos.y;
        return m !== w.e && C(A, "id", w.e = m), H !== w.t && C(A, "cx", w.t = H), O !== w.a && C(A, "cy", w.a = O), w;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      }), A;
    })()), pe), y(_, T(al, {}), pe), y(h, (() => {
      var c = E(() => !!(r() && d()));
      return () => c() && T(Rt, {
        get selectedSwitch() {
          return r();
        },
        allowedPorts: J,
        setAllowedPorts: oe,
        onClose: () => f(!1)
      });
    })(), null), y(h, (() => {
      var c = E(() => !!(s() && p()));
      return () => c() && T(qt, {
        get selectedComputer() {
          return s();
        },
        onClose: () => v(!1)
      });
    })(), null), y(h, (() => {
      var c = E(() => !!(s() && le()));
      return () => c() && T(ol, {
        get selectedComputer() {
          return s();
        },
        get availablePrinters() {
          return I();
        },
        selectedPrinter: z,
        setSelectedPrinter: Pe,
        onConfirm: (A) => {
          console.log("Selected printer ID:", A), P(!1);
        },
        onClose: () => P(!1)
      });
    })(), null), y(h, (() => {
      var c = E(() => !!R());
      return () => c() && T(Qt, {
        get selectedPrinter() {
          return R();
        },
        onSave: nt,
        onClose: () => K(null)
      });
    })(), null), y(h, (() => {
      var c = E(() => !!(s() && S()));
      return () => c() && T(Jt, {
        get selectedComputer() {
          return s();
        },
        onClose: () => L(!1),
        onPing: () => {
          console.log("Ping:", s().id), D[0] = s().id;
          let A = J().filter((w) => w !== s().id);
          D[D.length - 1] = A, console.log("thread:", D), A.forEach((w) => {
            let m = $e.find((H) => H.destinationMac === N(w).mac);
            m ? console.log("entry found:", m) : (console.log("entry not found:", w), Be((H) => [...H, {
              destinationMac: N(w).mac,
              port: `to ${w}`
            }]));
          }), n(s().color), t("gray"), Le();
        },
        onPrinterSelect: lt,
        onPrintTestPage: it,
        onPreferences: tt
      });
    })(), null), y(h, (() => {
      var c = E(() => !!ie());
      return () => c() && T(tl, {
        get selectedComputer() {
          return s();
        },
        title: "Print a test page",
        message: te,
        onClose: () => V(!1)
      });
    })(), null), b((c) => {
      var A = l(), w = e();
      return A !== c.e && C(Z, "stop-color", c.e = A), w !== c.t && C(de, "stop-color", c.t = w), c;
    }, {
      e: void 0,
      t: void 0
    }), h;
  })();
};
F(["click"]);
export {
  wl as NetworkSimulator
};
