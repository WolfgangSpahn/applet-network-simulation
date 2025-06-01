import { sharedConfig as oe, untrack as st, createRenderEffect as m, $PROXY as ce, batch as Dt, $TRACK as tt, getListener as De, createSignal as $, onMount as Se, onCleanup as ze, createComponent as E, createEffect as We, For as lt, createMemo as M, Show as zt } from "solid-js";
function Bt(e, t, l) {
  let i = l.length, r = t.length, n = i, o = 0, s = 0, a = t[r - 1].nextSibling, u = null;
  for (; o < r || s < n; ) {
    if (t[o] === l[s]) {
      o++, s++;
      continue;
    }
    for (; t[r - 1] === l[n - 1]; )
      r--, n--;
    if (r === o) {
      const p = n < i ? s ? l[s - 1].nextSibling : l[n - s] : a;
      for (; s < n; ) e.insertBefore(l[s++], p);
    } else if (n === s)
      for (; o < r; )
        (!u || !u.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === l[n - 1] && l[s] === t[r - 1]) {
      const p = t[--r].nextSibling;
      e.insertBefore(l[s++], t[o++].nextSibling), e.insertBefore(l[--n], p), t[r] = l[n];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let f = s;
        for (; f < n; ) u.set(l[f], f++);
      }
      const p = u.get(t[o]);
      if (p != null)
        if (s < p && p < n) {
          let f = o, h = 1, b;
          for (; ++f < r && f < n && !((b = u.get(t[f])) == null || b !== p + h); )
            h++;
          if (h > p - s) {
            const T = t[o];
            for (; s < p; ) e.insertBefore(l[s++], T);
          } else e.replaceChild(l[s++], t[o++]);
        } else o++;
      else t[o++].remove();
    }
  }
}
const nt = "_$DX_DELEGATE";
function x(e, t, l) {
  let i;
  const r = () => {
    const o = document.createElement("template");
    return o.innerHTML = e, l ? o.content.firstChild.firstChild : o.content.firstChild;
  }, n = t ? () => st(() => document.importNode(i || (i = r()), !0)) : () => (i || (i = r())).cloneNode(!0);
  return n.cloneNode = n, n;
}
function j(e, t = window.document) {
  const l = t[nt] || (t[nt] = /* @__PURE__ */ new Set());
  for (let i = 0, r = e.length; i < r; i++) {
    const n = e[i];
    l.has(n) || (l.add(n), t.addEventListener(n, Wt));
  }
}
function _(e, t, l) {
  Ze(e) || (l == null ? e.removeAttribute(t) : e.setAttribute(t, l));
}
function at(e, t) {
  Ze(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function K(e, t, l, i) {
  Array.isArray(l) ? (e[`$$${t}`] = l[0], e[`$$${t}Data`] = l[1]) : e[`$$${t}`] = l;
}
function Rt(e, t, l) {
  return st(() => e(t, l));
}
function v(e, t, l, i) {
  if (l !== void 0 && !i && (i = []), typeof t != "function") return we(e, t, i, l);
  m((r) => we(e, t(), r, l), i);
}
function Ze(e) {
  return !!oe.context && !oe.done && (!e || e.isConnected);
}
function Wt(e) {
  if (oe.registry && oe.events && oe.events.find(([a, u]) => u === e))
    return;
  let t = e.target;
  const l = `$$${e.type}`, i = e.target, r = e.currentTarget, n = (a) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: a
  }), o = () => {
    const a = t[l];
    if (a && !t.disabled) {
      const u = t[`${l}Data`];
      if (u !== void 0 ? a.call(t, u, e) : a.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && n(t.host), !0;
  }, s = () => {
    for (; o() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), oe.registry && !oe.done && (oe.done = _$HY.done = !0), e.composedPath) {
    const a = e.composedPath();
    n(a[0]);
    for (let u = 0; u < a.length - 2 && (t = a[u], !!o()); u++) {
      if (t._$host) {
        t = t._$host, s();
        break;
      }
      if (t.parentNode === r)
        break;
    }
  } else s();
  n(i);
}
function we(e, t, l, i, r) {
  const n = Ze(e);
  if (n) {
    !l && (l = [...e.childNodes]);
    let a = [];
    for (let u = 0; u < l.length; u++) {
      const p = l[u];
      p.nodeType === 8 && p.data.slice(0, 2) === "!$" ? p.remove() : a.push(p);
    }
    l = a;
  }
  for (; typeof l == "function"; ) l = l();
  if (t === l) return l;
  const o = typeof t, s = i !== void 0;
  if (e = s && l[0] && l[0].parentNode || e, o === "string" || o === "number") {
    if (n || o === "number" && (t = t.toString(), t === l))
      return l;
    if (s) {
      let a = l[0];
      a && a.nodeType === 3 ? a.data !== t && (a.data = t) : a = document.createTextNode(t), l = fe(e, l, i, a);
    } else
      l !== "" && typeof l == "string" ? l = e.firstChild.data = t : l = e.textContent = t;
  } else if (t == null || o === "boolean") {
    if (n) return l;
    l = fe(e, l, i);
  } else {
    if (o === "function")
      return m(() => {
        let a = t();
        for (; typeof a == "function"; ) a = a();
        l = we(e, a, l, i);
      }), () => l;
    if (Array.isArray(t)) {
      const a = [], u = l && Array.isArray(l);
      if (Be(a, t, l, r))
        return m(() => l = we(e, a, l, i, !0)), () => l;
      if (n) {
        if (!a.length) return l;
        if (i === void 0) return l = [...e.childNodes];
        let p = a[0];
        if (p.parentNode !== e) return l;
        const f = [p];
        for (; (p = p.nextSibling) !== i; ) f.push(p);
        return l = f;
      }
      if (a.length === 0) {
        if (l = fe(e, l, i), s) return l;
      } else u ? l.length === 0 ? it(e, a, i) : Bt(e, l, a) : (l && fe(e), it(e, a));
      l = a;
    } else if (t.nodeType) {
      if (n && t.parentNode) return l = s ? [t] : t;
      if (Array.isArray(l)) {
        if (s) return l = fe(e, l, i, t);
        fe(e, l, null, t);
      } else l == null || l === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      l = t;
    }
  }
  return l;
}
function Be(e, t, l, i) {
  let r = !1;
  for (let n = 0, o = t.length; n < o; n++) {
    let s = t[n], a = l && l[e.length], u;
    if (!(s == null || s === !0 || s === !1)) if ((u = typeof s) == "object" && s.nodeType)
      e.push(s);
    else if (Array.isArray(s))
      r = Be(e, s, a) || r;
    else if (u === "function")
      if (i) {
        for (; typeof s == "function"; ) s = s();
        r = Be(
          e,
          Array.isArray(s) ? s : [s],
          Array.isArray(a) ? a : [a]
        ) || r;
      } else
        e.push(s), r = !0;
    else {
      const p = String(s);
      a && a.nodeType === 3 && a.data === p ? e.push(a) : e.push(document.createTextNode(p));
    }
  }
  return r;
}
function it(e, t, l = null) {
  for (let i = 0, r = t.length; i < r; i++) e.insertBefore(t[i], l);
}
function fe(e, t, l, i) {
  if (l === void 0) return e.textContent = "";
  const r = i || document.createTextNode("");
  if (t.length) {
    let n = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const s = t[o];
      if (r !== s) {
        const a = s.parentNode === e;
        !n && !o ? a ? e.replaceChild(r, s) : e.insertBefore(r, l) : a && s.remove();
      } else n = !0;
    }
  } else e.insertBefore(r, l);
  return [r];
}
const Re = Symbol("store-raw"), ue = Symbol("store-node"), te = Symbol("store-has"), ct = Symbol("store-self");
function dt(e) {
  let t = e[ce];
  if (!t && (Object.defineProperty(e, ce, {
    value: t = new Proxy(e, Gt)
  }), !Array.isArray(e))) {
    const l = Object.keys(e), i = Object.getOwnPropertyDescriptors(e);
    for (let r = 0, n = l.length; r < n; r++) {
      const o = l[r];
      i[o].get && Object.defineProperty(e, o, {
        enumerable: i[o].enumerable,
        get: i[o].get.bind(t)
      });
    }
  }
  return t;
}
function Pe(e) {
  let t;
  return e != null && typeof e == "object" && (e[ce] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function he(e, t = /* @__PURE__ */ new Set()) {
  let l, i, r, n;
  if (l = e != null && e[Re]) return l;
  if (!Pe(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
    for (let o = 0, s = e.length; o < s; o++)
      r = e[o], (i = he(r, t)) !== r && (e[o] = i);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
    const o = Object.keys(e), s = Object.getOwnPropertyDescriptors(e);
    for (let a = 0, u = o.length; a < u; a++)
      n = o[a], !s[n].get && (r = e[n], (i = he(r, t)) !== r && (e[n] = i));
  }
  return e;
}
function ke(e, t) {
  let l = e[t];
  return l || Object.defineProperty(e, t, {
    value: l = /* @__PURE__ */ Object.create(null)
  }), l;
}
function pe(e, t, l) {
  if (e[t]) return e[t];
  const [i, r] = $(l, {
    equals: !1,
    internal: !0
  });
  return i.$ = r, e[t] = i;
}
function Zt(e, t) {
  const l = Reflect.getOwnPropertyDescriptor(e, t);
  return !l || l.get || !l.configurable || t === ce || t === ue || (delete l.value, delete l.writable, l.get = () => e[ce][t]), l;
}
function ft(e) {
  De() && pe(ke(e, ue), ct)();
}
function qt(e) {
  return ft(e), Reflect.ownKeys(e);
}
const Gt = {
  get(e, t, l) {
    if (t === Re) return e;
    if (t === ce) return l;
    if (t === tt)
      return ft(e), l;
    const i = ke(e, ue), r = i[t];
    let n = r ? r() : e[t];
    if (t === ue || t === te || t === "__proto__") return n;
    if (!r) {
      const o = Object.getOwnPropertyDescriptor(e, t);
      De() && (typeof n != "function" || e.hasOwnProperty(t)) && !(o && o.get) && (n = pe(i, t, n)());
    }
    return Pe(n) ? dt(n) : n;
  },
  has(e, t) {
    return t === Re || t === ce || t === tt || t === ue || t === te || t === "__proto__" ? !0 : (De() && pe(ke(e, te), t)(), t in e);
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
function _e(e, t, l, i = !1) {
  if (!i && e[t] === l) return;
  const r = e[t], n = e.length;
  l === void 0 ? (delete e[t], e[te] && e[te][t] && r !== void 0 && e[te][t].$()) : (e[t] = l, e[te] && e[te][t] && r === void 0 && e[te][t].$());
  let o = ke(e, ue), s;
  if ((s = pe(o, t, r)) && s.$(() => l), Array.isArray(e) && e.length !== n) {
    for (let a = e.length; a < n; a++) (s = o[a]) && s.$();
    (s = pe(o, "length", n)) && s.$(e.length);
  }
  (s = o[ct]) && s.$();
}
function ut(e, t) {
  const l = Object.keys(t);
  for (let i = 0; i < l.length; i += 1) {
    const r = l[i];
    _e(e, r, t[r]);
  }
}
function Yt(e, t) {
  if (typeof t == "function" && (t = t(e)), t = he(t), Array.isArray(t)) {
    if (e === t) return;
    let l = 0, i = t.length;
    for (; l < i; l++) {
      const r = t[l];
      e[l] !== r && _e(e, l, r);
    }
    _e(e, "length", i);
  } else ut(e, t);
}
function ge(e, t, l = []) {
  let i, r = e;
  if (t.length > 1) {
    i = t.shift();
    const o = typeof i, s = Array.isArray(e);
    if (Array.isArray(i)) {
      for (let a = 0; a < i.length; a++)
        ge(e, [i[a]].concat(t), l);
      return;
    } else if (s && o === "function") {
      for (let a = 0; a < e.length; a++)
        i(e[a], a) && ge(e, [a].concat(t), l);
      return;
    } else if (s && o === "object") {
      const { from: a = 0, to: u = e.length - 1, by: p = 1 } = i;
      for (let f = a; f <= u; f += p)
        ge(e, [f].concat(t), l);
      return;
    } else if (t.length > 1) {
      ge(e[i], t, [i].concat(l));
      return;
    }
    r = e[i], l = [i].concat(l);
  }
  let n = t[0];
  typeof n == "function" && (n = n(r, l), n === r) || i === void 0 && n == null || (n = he(n), i === void 0 || Pe(r) && Pe(n) && !Array.isArray(n) ? ut(r, n) : _e(e, i, n));
}
function gt(...[e, t]) {
  const l = he(e || {}), i = Array.isArray(l), r = dt(l);
  function n(...o) {
    Dt(() => {
      i && o.length === 1 ? Yt(l, o[0]) : ge(l, o);
    });
  }
  return [r, n];
}
const [Jt, me] = $({ x: 30, y: 40, text: "-" });
var Kt = /* @__PURE__ */ x("<svg><g></svg>", !1, !0);
function qe(e) {
  Se(() => {
    me({
      x: e.x,
      y: e.y,
      text: e.text
    });
  }), ze(() => {
    me(null);
  });
  const t = (i) => {
    i.currentTarget.getBoundingClientRect();
    const r = i.currentTarget.ownerSVGElement.getBoundingClientRect(), n = i.clientX - r.left, o = i.clientY - r.top;
    me({
      x: n,
      y: o,
      text: e.text
    });
  }, l = () => {
    me(null);
  };
  return (() => {
    var i = Kt();
    return i.addEventListener("mouseleave", l), i.addEventListener("mouseenter", t), v(i, () => e.children), i;
  })();
}
var Ut = /* @__PURE__ */ x('<svg><g><path fill=#1a202c stroke=#ffffff stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 27.467192,9.3368497 H 38.081364 V 6.6590449 l 6.078743,5.3556111 -6.078743,5.355609 V 14.692459 H 27.467192 Z"fill-rule=evenodd id=path3></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="m 28.351706,29.007584 h 10.614172 v -2.677807 l 6.078743,5.35561 -6.078743,5.355608 v -2.6778 H 28.351706 Z"fill-rule=evenodd id=path4></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 23.860893,19.267895 H 13.246719 v -2.677807 l -6.07874,5.355612 6.07874,5.355609 v -2.677806 h 10.614174 z"fill-rule=evenodd id=path5></path><path fill=#ffffff stroke=none stroke-width=1.87726 stroke-linejoin=round stroke-linecap=butt d="M 23.860893,36.9079 H 13.246719 v -2.677804 l -6.07874,5.355609 6.07874,5.355609 v -2.677808 h 10.614174 z"fill-rule=evenodd id=path6></path><path fill=lightblue transform=translate(8,5) d="M9.12 8c0 .49-.4.89-.89.89s-.89-.4-.89-.89.4-.89.89-.89.89.4.89.89zm-3.2-2.42.84.84c.38-.38.89-.62 1.46-.62s1.08.24 1.46.62l.84-.84c-.59-.59-1.41-.96-2.3-.96s-1.71.37-2.3.96zm-1.67-1.67.84.84c.81-.81 1.92-1.31 3.16-1.31 1.24 0 2.35.5 3.16 1.31l.84-.84c-1.08-1.08-2.58-1.75-4.25-1.75s-3.17.67-4.25 1.75zm4.25-4.25c-2.62 0-5 1.06-6.72 2.79l.84.84c1.46-1.46 3.48-2.37 5.72-2.37s4.26.91 5.72 2.37l.84-.84c-1.72-1.73-4.1-2.79-6.72-2.79z"fill-rule=evenodd></path><text x=37 y=43.5 fill=white stroke=white stroke-width=0.4 font-size=5 text-anchor=middle>DHCP</svg>', !1, !0);
const Qt = (e) => E(qe, {
  x: 10,
  y: 480,
  text: "Switch Funktion des WLAN-Routers",
  get children() {
    var t = Ut();
    return K(t, "click", e.onClick), m(() => _(t, "transform", `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`)), t;
  }
});
j(["click"]);
var el = /* @__PURE__ */ x('<svg><g><g><circle cx=25 cy=25 r=25 fill=#1a202c></circle><path d="M 27,-0.5 C 4.280346,-0.5 -7.093581,26.967033 8.969693,43.030307 25.032967,59.093581 52.5,47.719654 52.5,25 52.5,10.916739 41.08326,-0.5 27,-0.5 Z m -6.59812,13.14844 c 0.497667,-0.496459 1.303263,-0.496459 1.80093,0 L 25.725,16.13875 V 6.28937 c 6.73e-4,-1.699326 2.550673,-1.699326 2.55,0 v 9.84938 l 3.50625,-3.49031 c 1.211263,-1.204958 3.016518,0.616265 1.80094,1.81687 L 27,20.98375 20.40188,14.44937 c -0.496459,-0.497667 -0.496459,-1.303263 0,-1.80093 z M 14.76,31.48656 c 0.702959,0 -1.303272,0.496465 -1.80094,0 L 6.28125,25 12.95906,18.48156 c 1.210843,-1.310625 3.116852,0.629426 1.785,1.81688 l -3.50625,3.41062 h 9.99282 c 1.699047,9.52e-4 1.699047,2.550952 0,2.55 h -9.99282 l 3.50625,3.42656 c 0.500886,0.493273 -0.687098,1.80094 0.0159,1.80094 z m 18.83813,5.84906 c -0.497668,0.496465 -1.303272,0.496465 -1.80094,0 L 28.275,33.86125 v 9.83344 c -6.73e-4,1.699326 -2.550673,1.699326 -2.55,0 v -9.83344 l -3.50625,3.49031 c -1.211258,1.203503 -3.015063,-0.616257 -1.80094,-1.81687 L 27,29.00031 l 6.59813,6.53438 c 0.496459,0.497667 0.496459,1.303263 0,1.80093 z m 7.44281,-5.83312 c -1.21084,1.310625 -3.116852,-0.629426 -1.785,-1.81688 l 3.50625,-3.42656 h -9.97688 c -1.699047,-9.52e-4 -1.699047,-2.550952 0,-2.55 h 9.99282 l -3.50625,-3.41062 c -1.331852,-1.187454 0.57416,-3.127505 1.785,-1.81688 L 47.71875,25 Z"id=path2 stroke=none fill=white></svg>', !1, !0);
const tl = (e) => E(qe, {
  x: 10,
  y: 480,
  text: "Router Funktion des WLAN-Routers",
  get children() {
    var t = el();
    return K(t, "click", e.onClick), m(() => _(t, "transform", `translate(${e.x - 27}, ${e.y - 25}) scale(${e.scale})`)), t;
  }
});
j(["click"]);
var ll = /* @__PURE__ */ x('<svg><g cursor=pointer><rect x=0 y=0 width=30 height=30 fill=#1a202c></rect><path d="M 3.89,0 C 1.74,0 0,1.74 0,3.89 v 17.5 c 0,2.15 1.74,3.89 3.89,3.89 l 9.074811,-0.06958 -0.302087,1.905209 L 9.73,27.22 c -1.0793167,0.03841 -1.94,0.87 -1.94,1.94 0,1.08 0.8700386,1.949087 1.94,1.94 l 12.289622,-0.104374 c 1.079961,-0.0092 1.835627,-1.183121 1.835627,-2.253121 0,-1.08 -0.871229,-1.819152 -1.94,-1.870418 l -2.901293,-0.139165 -0.197713,-1.782664 9.527097,-0.06958 c 2.149943,-0.0157 3.128292,-1.983543 3.124592,-3.820418 L 31.433141,3.7856262 C 31.41833,1.0789662 29.4,0 27.25,0 Z M 27.25,3.89 V 17.5 H 3.89 V 3.89 Z"></svg>', !1, !0);
const nl = ({
  x: e,
  y: t,
  role: l,
  color: i,
  onClick: r
}) => (() => {
  var n = ll(), o = n.firstChild, s = o.nextSibling;
  return K(n, "click", r), _(n, "transform", `translate(${e - 17}, ${t - 10})`), _(s, "fill", i), n;
})();
j(["click"]);
var il = /* @__PURE__ */ x('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path d="M 44.966127,13.05536 H 41.465515 V 7.9074012 A 4.9420396,4.9420396 0 0 0 36.755134,2.7594433 H 15.288149 A 4.9420396,4.9420396 0 0 0 10.577768,7.9074012 V 13.05536 H 7.0771574 a 6.846784,6.846784 0 0 0 -6.79530499,6.872524 v 17.1427 a 6.846784,6.846784 0 0 0 6.79530499,6.872523 h 2.213621 a 5.1479579,5.1479579 0 0 0 5.1479576,5.147958 h 23.165811 a 5.1479579,5.1479579 0 0 0 5.147958,-5.147958 h 2.213622 a 6.846784,6.846784 0 0 0 6.795304,-6.872523 v -17.1427 A 6.846784,6.846784 0 0 0 44.966127,13.05536 Z M 15.725725,7.9074012 H 36.317557 V 13.05536 H 15.725725 Z M 14.438736,43.943107 V 33.647192 h 23.165811 v 10.295915 z"id=path3 style=stroke-width:2.57398></svg>', !1, !0);
const rl = (e) => (() => {
  var t = il(), l = t.firstChild, i = l.nextSibling;
  return K(t, "click", e.onClick), m((r) => {
    var n = `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`, o = e.color;
    return n !== r.e && _(t, "transform", r.e = n), o !== r.t && _(i, "fill", r.t = o), r;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
j(["click"]);
var ol = /* @__PURE__ */ x('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path d="M 3.25,4 C 1.4495,4 0,5.4495 0,7.25 v 32.5 C 0,41.5505 1.4495,43 3.25,43 H 6.4873048 L 0,49.487305 H 6.5 L 12.987305,43 h 26.02539 L 45.5,49.487305 H 52 L 45.512695,43 H 48.75 C 50.5505,43 52,41.5505 52,39.75 V 7.25 C 52,5.4495 50.5505,4 48.75,4 Z m 1.625,3.2373049 h 42.25 c 0,0 1.625,0 1.625,1.6249999 V 38.112306 c 0,1.625 -1.625,1.625 -1.625,1.625 H 4.875 c -1.625,0 -1.625,-1.625 -1.625,-1.625 V 8.8623048 c 0,0 0,-1.625 1.625,-1.6249999 z"id=path1 style=stroke-width:3.25></svg>', !1, !0);
const sl = (e) => (() => {
  var t = ol(), l = t.firstChild, i = l.nextSibling;
  return K(t, "click", e.onClick), m((r) => {
    var n = `translate(${e.x - 25}, ${e.y - 25}) scale(${e.scale})`, o = e.color;
    return n !== r.e && _(t, "transform", r.e = n), o !== r.t && _(i, "fill", r.t = o), r;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
j(["click"]);
var al = /* @__PURE__ */ x('<svg><g><g fill=#1a202c stroke=white stroke-linecap=round stroke-linejoin=round stroke-miterlimit=10 stroke-width=1.5 id=g3 transform=matrix(2.4257541,0,0,2.4257541,-3.1269462,-4.5157475)><path d="m 7.26906,13.0098 c -0.53,-0.27 -1.12,-0.41 -1.72,-0.41 -4.679998,0.33 -4.679998,7.14 0,7.47 H 16.6391 c 1.35,0.01 2.65,-0.49 3.64,-1.4 3.29,-2.87 1.53,-8.64 -2.8,-9.19004 -1.56,-9.370003 -15.09004,-5.81 -11.88004,3.12004"id=path1></path><text x=9 y=15 stroke=none fill=white font-size=3>Internet</svg>', !1, !0);
const cl = (e) => (() => {
  var t = al();
  return K(t, "click", e.onClick), m(() => _(t, "transform", `translate(${e.x - 50}, ${e.y - 20}) scale(${e.scale})`)), t;
})();
j(["click"]);
var dl = /* @__PURE__ */ x('<svg><g cursor=pointer><path fill=#1a202c stroke=none stroke-width=3 stroke-linejoin=round stroke-linecap=butt d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"fill-rule=evenodd id=path2></path><path style="stroke:#000000;stroke-width:0.0942123;stroke-linejoin:round;paint-order:stroke fill markers"d="m 16.862342,51.997696 c -1.075084,-0.112511 -2.05623,-0.629494 -2.81195,-1.481673 -0.606442,-0.683846 -0.99723,-1.478324 -1.182546,-2.404124 -0.08256,-0.412478 -0.08652,-1.42271 -0.08652,-22.087902 0,-20.7683452 0.0036,-21.6736757 0.08766,-22.0954943 0.180391,-0.9051494 0.561892,-1.6857033 1.155474,-2.3641094 0.788682,-0.9013869 1.740115,-1.3970751 2.911572,-1.51690371 0.68286,-0.06984992 21.106949,-0.06937781 21.839706,5.0492e-4 1.918467,0.18296326 3.419838,1.52073859 4.010516,3.57351399 l 0.110671,0.384613 0.01239,21.8269715 c 0.01204,21.18475 0.0097,21.840978 -0.07786,22.302998 C 42.429956,50.253426 40.799243,51.807018 38.77573,52 38.133884,52.06121 17.448499,52.05903 16.862339,51.9977 Z m 11.793312,-3.290627 c 0.583152,-0.159722 1.234131,-0.620988 1.597899,-1.132223 0.22752,-0.319756 0.484274,-0.890638 0.56959,-1.26646 0.09121,-0.4018 0.07768,-1.248045 -0.02601,-1.626906 -0.240727,-0.879528 -0.856487,-1.688344 -1.571582,-2.064318 -0.931559,-0.489775 -2.043048,-0.449248 -2.919402,0.106451 -1.690193,1.071756 -1.994065,3.625097 -0.608796,5.115506 0.798161,0.858739 1.857352,1.169501 2.958301,0.86795 z m 9.000288,-9.706039 c 0.263827,-0.08398 0.661726,-0.512649 0.739675,-0.79688 0.04531,-0.165215 0.05841,-3.81095 0.05841,-16.254639 0,-14.2190157 -0.0083,-16.0669755 -0.07299,-16.264525 -0.10786,-0.3293604 -0.277898,-0.5391612 -0.559502,-0.690343 l -0.250929,-0.1347142 -9.70489,4.999e-4 -9.704891,4.999e-4 -0.240157,0.1220107 C 17.634484,5.1283348 17.504037,5.2714138 17.372345,5.5843601 17.274393,5.81713 17.274356,5.823202 17.273302,21.964711 l -0.0011,16.147494 0.125043,0.270336 c 0.135947,0.29391 0.349152,0.499086 0.631352,0.607583 0.253156,0.09733 19.322502,0.107919 19.627299,0.01089 z"id=path4></svg>', !1, !0);
const fl = (e) => (() => {
  var t = dl(), l = t.firstChild, i = l.nextSibling;
  return K(t, "click", e.onClick), m((r) => {
    var n = `translate(${e.x - 20}, ${e.y - 25}) scale(${e.scale})`, o = e.color;
    return n !== r.e && _(t, "transform", r.e = n), o !== r.t && _(i, "fill", r.t = o), r;
  }, {
    e: void 0,
    t: void 0
  }), t;
})();
j(["click"]);
const ul = [{ showMobilePopup: "b2:77:3a:8c:14:5f", port: "to 255" }], [ye, rt] = gt(ul), ht = [
  { id: 0, color: "red", position: [370, 320], type: "cloud", role: "leaf", mac: "b2:77:3a:8c:14:5f", subnet: "213.3", name: "Swisscom" },
  { id: 1, color: "white", position: [250, 250], type: "Switch", role: "transit", mac: "1c:4f:9b:2d:63:e1", subnet: "192.168.1", name: "WLAN-B", forwarding: "clientIsolation" },
  { id: 4, color: "blue", position: [100, 400], type: "computer", role: "source", mac: "03:aa:66:de:9e:21", subnet: "192.168.1", name: "My Laptop" },
  { id: 13, color: "green", position: [100, 100], type: "printer", role: "destination", mac: "fe:08:d8:75:82:a0", ip: "10.0.0.4", name: "HPP 1000" },
  { id: 61, color: "purple", position: [100, 250], type: "tv", role: "leaf", mac: "7a:10:fe:88:3c:93", subnet: "192.168.1", name: "Samsung HDTV" },
  { id: 76, color: "orange", position: [250, 100], type: "mobile", role: "leaf", mac: "e5:3b:cd:1a:f7:08", subnet: "192.168.1", name: "My Phone" },
  { id: 255, color: "pink", position: [250, 320], type: "router", role: "transit", mac: "b2:77:3a:8c:14:5f", subnet: "192.168.1", name: "WLAN-R" }
], xe = [
  { id: 1, nodes: [13, 1], type: "wireless" },
  { id: 2, nodes: [1, 255], type: "internal" },
  { id: 3, nodes: [1, 4], type: "wireless" },
  { id: 4, nodes: [255, 0], type: "fixed" },
  { id: 5, nodes: [1, 61], type: "wireless" },
  { id: 6, nodes: [1, 76], type: "wireless" }
];
var gl = /* @__PURE__ */ x('<div class="switch-pref absolute top-0 right-0 m-4 bg-gray-900 text-white text-xs p-4 rounded shadow-lg"><h2 class="text-white mb-2">Switch Settings (ID: <!>)</h2><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-6"><div class="flex flex-col"><span class=mb-2>Name:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"title="Enter the name of the switch"></div><div class="flex flex-col"><span class=mb-2>Allowed Ports:</span><div class="grid grid-cols-4 gap-4"></div></div><div class="flex flex-col"><span class=mb-2>Forwarding Table:</span><div class="grid grid-cols-2 gap-2">'), hl = /* @__PURE__ */ x('<label class="flex items-center space-x-2"><input type=checkbox name=allowedPorts class="form-checkbox text-blue-500"><span>'), pl = /* @__PURE__ */ x('<div class="flex space-x-2"><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder="Destination MAC"title="Enter the destination MAC address"><input type=text class="bg-gray-700 text-white p-2 rounded w-16"placeholder=Port title="Enter the outgoing port number (1-8)">'), $l = /* @__PURE__ */ x('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Save'), vl = /* @__PURE__ */ x('<div class="text-red-500 mt-4">');
const bl = ({
  selectedSwitch: e,
  allowedPorts: t,
  setAllowedPorts: l,
  setShowEmilieNotification: i,
  onClose: r
}) => {
  const [n, o] = $(e?.forwarding || "clientIsolation"), [s, a] = $(e?.name || "no switch selected"), [u, p] = $(""), f = () => {
    if (!s()) {
      p("Name is required.");
      return;
    }
    p("");
  }, h = (T, L) => {
    if (L && !/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(L)) {
      p(`Incomplete MAC address at row ${T + 1}.`);
      return;
    }
    p("");
  }, b = (T, L, G) => {
  };
  return We(() => {
    console.log("Allowed ports:", t());
  }), (() => {
    var T = gl(), L = T.firstChild, G = L.firstChild, le = G.nextSibling;
    le.nextSibling;
    var ne = L.nextSibling, Z = ne.firstChild, U = Z.firstChild, I = U.firstChild, Y = I.nextSibling, Q = U.nextSibling, ie = Q.firstChild, C = ie.nextSibling, z = Q.nextSibling, J = z.firstChild, se = J.nextSibling;
    return T.$$click = (S) => S.stopPropagation(), v(L, () => e.name, le), Y.$$input = (S) => {
      a(S.target.value), f();
    }, v(C, E(lt, {
      get each() {
        return ht.filter((S, H) => H !== 0 && H !== 1).map((S) => S.id);
      },
      children: (S) => (() => {
        var H = hl(), q = H.firstChild, P = q.nextSibling;
        return q.addEventListener("change", (F) => {
          console.log(`Toggled port: ${S}`), l((V) => {
            if (F.target.checked) {
              if (!V.includes(S))
                return [...V, S];
            } else
              return V.filter((Ae) => Ae !== S);
            return V;
          });
        }), q.value = S, v(P, `to ${S}`), m(() => q.checked = t().includes(S)), H;
      })()
    })), v(se, E(lt, {
      each: ye,
      children: (S, H) => (() => {
        var q = pl(), P = q.firstChild, F = P.nextSibling;
        return P.addEventListener("blur", (V) => h(H(), V.target.value)), P.$$input = (V) => b(H(), "destinationMac", V.target.value), F.$$input = (V) => b(H(), "port", V.target.value), m(() => P.value = S.showMobilePopup), m(() => F.value = S.port), q;
      })()
    })), v(Z, (() => {
      var S = M(() => !!(s() && !u()));
      return () => S() && (() => {
        var H = $l();
        return H.$$click = () => {
          console.log("Save computer preferences"), i(!0), r();
        }, H;
      })();
    })(), null), v(Z, (() => {
      var S = M(() => !!u());
      return () => S() && (() => {
        var H = vl();
        return v(H, u), H;
      })();
    })(), null), m(() => Y.value = s()), T;
  })();
};
j(["click", "input"]);
var ml = /* @__PURE__ */ x('<div class="computer-pref absolute m-4 bg-gray-900 text-white"><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-6"><div class="flex flex-col"><span class=mb-2>Name:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"title="Enter the name of the computer"></div><div class="flex flex-col"><span class=mb-2>MAC-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=fe:08:d8:75:82:a0 title="Enter the MAC address of the computer (Format: XX:XX:XX:XX:XX:XX)"></div><div class="flex flex-col"><span class=mb-2>IP-Address:</span><div class="flex items-end space-x-2 w-full"><div class="flex flex-col flex-grow"><span class="text-sm mb-1">Subnet</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=XXX.XXX.XXX title="Enter the subnet portion of the IP address (Format: XXX.XXX.XXX)"></div><span class=pb-2>.</span><div class="flex flex-col"><span class="text-sm mb-1">Id</span><input type=text class="bg-gray-700 text-white p-2 rounded w-12"placeholder=XXX title="Enter the host ID portion of the IP address (Format: XXX)">'), yl = /* @__PURE__ */ x('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Save'), xl = /* @__PURE__ */ x('<div class="text-red-500 mt-4">');
const wl = ({
  selectedComputer: e,
  onClose: t
}) => {
  const [l, i] = $(e?.name || ""), [r, n] = $(e?.mac || ""), [o, s] = $(e?.subnet || ""), [a, u] = $(e?.id || ""), [p, f] = $(""), h = () => {
    if (!l()) {
      f("Name is required.");
      return;
    }
    if (!/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(r())) {
      f("Invalid MAC-Address format.");
      return;
    }
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(o())) {
      f("Invalid Subnet format.");
      return;
    }
    if (!/^\d{1,3}$/.test(a())) {
      f("Invalid ID format.");
      return;
    }
    f("");
  };
  return Se(() => {
    console.log("ComputerPref component mounted");
  }), (() => {
    var b = ml(), T = b.firstChild, L = T.firstChild, G = L.firstChild, le = G.firstChild, ne = le.nextSibling, Z = G.nextSibling, U = Z.firstChild, I = U.nextSibling, Y = Z.nextSibling, Q = Y.firstChild, ie = Q.nextSibling, C = ie.firstChild, z = C.firstChild, J = z.nextSibling, se = C.nextSibling, S = se.nextSibling, H = S.firstChild, q = H.nextSibling;
    return b.$$click = (P) => P.stopPropagation(), ne.$$input = (P) => {
      i(P.target.value), h();
    }, I.$$input = (P) => {
      n(P.target.value), h();
    }, J.$$input = (P) => {
      s(P.target.value), h();
    }, q.$$input = (P) => {
      u(P.target.value), h();
    }, v(L, (() => {
      var P = M(() => !!(l() && r() && o() && a() && !p()));
      return () => P() && (() => {
        var F = yl();
        return F.$$click = () => {
          console.log("Save computer preferences"), t();
        }, F;
      })();
    })(), null), v(L, (() => {
      var P = M(() => !!p());
      return () => P() && (() => {
        var F = xl();
        return v(F, p), F;
      })();
    })(), null), m((P) => {
      var F = `${e.position[1] - 300}px`, V = `${e.position[0] - 100}px`;
      return F !== P.e && ((P.e = F) != null ? b.style.setProperty("top", F) : b.style.removeProperty("top")), V !== P.t && ((P.t = V) != null ? b.style.setProperty("left", V) : b.style.removeProperty("left")), P;
    }, {
      e: void 0,
      t: void 0
    }), m(() => ne.value = l()), m(() => I.value = r()), m(() => J.value = o()), m(() => q.value = a()), b;
  })();
};
j(["click", "input"]);
var Pl = /* @__PURE__ */ x('<div class="popup absolute bg-gray-800 text-white text-xs border border-white p-2 rounded shadow-lg"><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Ping');
const ot = ({
  selectedDevice: e,
  onClose: t,
  onPing: l
}) => (console.log("Selected computer:", e), (() => {
  var i = Pl(), r = i.firstChild;
  return i.$$click = (n) => n.stopPropagation(), r.$$click = () => {
    console.log("DevicePopup clicked"), l(e), t();
  }, m((n) => {
    var o = `${e.position[1]}px`, s = `${e.position[0]}px`;
    return o !== n.e && ((n.e = o) != null ? i.style.setProperty("top", o) : i.style.removeProperty("top")), s !== n.t && ((n.t = s) != null ? i.style.setProperty("left", s) : i.style.removeProperty("left")), n;
  }, {
    e: void 0,
    t: void 0
  }), i;
})());
j(["click"]);
j(["click"]);
var kl = /* @__PURE__ */ x('<div class="popup absolute bg-gray-800 text-white text-xs border border-white p-2 rounded shadow-lg"><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Preferences</button><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Ping</button><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Select Printer</button><button class="block w-full text-left px-2 py-1 hover:bg-gray-700">Print Test Page');
const _l = ({
  selectedComputer: e,
  onClose: t,
  onPing: l,
  onPrinterSelect: i,
  onPrintTestPage: r,
  onPreferences: n
}) => (console.log(e), (() => {
  var o = kl(), s = o.firstChild, a = s.nextSibling, u = a.nextSibling, p = u.nextSibling;
  return o.$$click = (f) => f.stopPropagation(), s.$$click = () => {
    n(e), t();
  }, a.$$click = () => {
    l(e), t();
  }, u.$$click = () => {
    l(e), i(e), t();
  }, p.$$click = () => {
    r(e), t();
  }, m((f) => {
    var h = `${e.position[1]}px`, b = `${e.position[0]}px`;
    return h !== f.e && ((f.e = h) != null ? o.style.setProperty("top", h) : o.style.removeProperty("top")), b !== f.t && ((f.t = b) != null ? o.style.setProperty("left", b) : o.style.removeProperty("left")), f;
  }, {
    e: void 0,
    t: void 0
  }), o;
})());
j(["click"]);
var Cl = /* @__PURE__ */ x('<div class="printer-pref absolute top-10 left-0 m-4 bg-gray-900 text-white"><div class="bg-gray-800 rounded-lg p-6"><div class="flex flex-col space-y-6"><div class="flex flex-col"><span class=mb-2>Name:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"title="Enter the name of the printer"></div><div class="flex flex-col"><span class=mb-2>MAC-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=fe:08:d8:75:82:a0 title="Enter the MAC address of the computer (Format: XX:XX:XX:XX:XX:XX)"></div><div class="flex flex-col"><span class=mb-2>IP-Address:</span><input type=text class="bg-gray-700 text-white p-2 rounded w-full"placeholder=192.168.0.1 title="Enter the IP address of the printer">'), Sl = /* @__PURE__ */ x('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Save'), Al = /* @__PURE__ */ x('<div class="text-red-500 mt-4">');
const Tl = ({
  selectedPrinter: e,
  onSave: t,
  onClose: l
}) => {
  const [i, r] = $(e?.name || "no printer selected"), [n, o] = $(e?.ip || ""), [s, a] = $(e?.mac || ""), [u, p] = $(""), f = () => {
    e.id;
  };
  We(() => {
    f();
  });
  const h = () => {
    if (!i()) {
      p("Name is required.");
      return;
    }
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n())) {
      p("Invalid IP-Address format.");
      return;
    }
    p("");
  };
  return Se(() => {
    console.log("PrinterPref component mounted");
  }), (() => {
    var b = Cl(), T = b.firstChild, L = T.firstChild, G = L.firstChild, le = G.firstChild, ne = le.nextSibling, Z = G.nextSibling, U = Z.firstChild, I = U.nextSibling, Y = Z.nextSibling, Q = Y.firstChild, ie = Q.nextSibling;
    return b.$$click = (C) => C.stopPropagation(), ne.$$input = (C) => {
      r(C.target.value), h();
    }, I.$$input = (C) => {
      a(C.target.value), h();
    }, ie.$$input = (C) => {
      o(C.target.value), h();
    }, v(L, (() => {
      var C = M(() => !!(i() && n() && !u()));
      return () => C() && (() => {
        var z = Sl();
        return z.$$click = () => {
          console.log("Save printer preferences"), t(e.id, {
            name: i(),
            ip: n()
          }), l();
        }, z;
      })();
    })(), null), v(L, (() => {
      var C = M(() => !!u());
      return () => C() && (() => {
        var z = Al();
        return v(z, u), z;
      })();
    })(), null), m((C) => {
      var z = `${e.position[1]}px`, J = `${e.position[0] - 100}px`;
      return z !== C.e && ((C.e = z) != null ? b.style.setProperty("top", z) : b.style.removeProperty("top")), J !== C.t && ((C.t = J) != null ? b.style.setProperty("left", J) : b.style.removeProperty("left")), C;
    }, {
      e: void 0,
      t: void 0
    }), m(() => ne.value = i()), m(() => I.value = s()), m(() => ie.value = n()), b;
  })();
};
j(["click", "input"]);
var Xl = /* @__PURE__ */ x('<div><h2 class="text-lg font-bold mb-4"></h2><div class="flex flex-col space-y-4"><div class=text-bg-300></div><div class="flex justify-end space-x-4 mt-6"><button class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded">Ok');
const El = ({
  selectedComputer: e,
  title: t,
  message: l,
  success: i,
  onClose: r
}) => (() => {
  var n = Xl(), o = n.firstChild, s = o.nextSibling, a = s.firstChild, u = a.nextSibling, p = u.firstChild;
  return n.$$click = (f) => f.stopPropagation(), v(o, t), v(a, l), K(p, "click", r), m((f) => {
    var h = `computer-pref absolute p-4 ${i() ? "bg-green-900" : "bg-red-900"} text-white rounded shadow-lg`, b = `${e.position[1] - 300}px`, T = `${e.position[0]}px`;
    return h !== f.e && at(n, f.e = h), b !== f.t && ((f.t = b) != null ? n.style.setProperty("top", b) : n.style.removeProperty("top")), T !== f.a && ((f.a = T) != null ? n.style.setProperty("left", T) : n.style.removeProperty("left")), f;
  }, {
    e: void 0,
    t: void 0,
    a: void 0
  }), n;
})();
j(["click"]);
var Ml = /* @__PURE__ */ x('<div class="computer-pref p-4 absolute bg-gray-800 rounded text-white"><h2 class="text-lg font-bold mb-4"></h2><div class="flex flex-col space-y-4"><div class=text-bg-300></div><div class="flex justify-end space-x-4 mt-6"><button class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded cursor-pointer">Ok');
const Nl = ({
  selectedComputer: e,
  title: t,
  message: l,
  onClose: i
}) => (() => {
  var r = Ml(), n = r.firstChild, o = n.nextSibling, s = o.firstChild, a = s.nextSibling, u = a.firstChild;
  return r.$$click = (p) => p.stopPropagation(), r.style.setProperty("top", "200px"), r.style.setProperty("left", "200px"), v(n, t), v(s, l), K(u, "click", i), r;
})();
j(["click"]);
var Hl = /* @__PURE__ */ x('<div class="select-printer-dialog absolute top-40 left-0 m-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg"><h2 class="text-lg font-bold mb-4">Select a Printer</h2><div class="flex flex-col space-y-4"></div><div class="flex justify-end space-x-4 mt-6"><button class="bg-gray-700 hover:bg-gray-700 text-white p-2 rounded">Cancel'), Ll = /* @__PURE__ */ x("<div class=text-gray-300>No printers available."), Il = /* @__PURE__ */ x('<label><div class="flex items-center space-x-3"><input type=radio name=printer class=accent-blue-500><span class=text-white>'), Ol = /* @__PURE__ */ x('<button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Confirm');
const Vl = ({
  selectedComputer: e,
  availablePrinters: t,
  selectedPrinter: l,
  setSelectedPrinter: i,
  onConfirm: r,
  onClose: n
}) => (() => {
  var o = Hl(), s = o.firstChild, a = s.nextSibling, u = a.nextSibling, p = u.firstChild;
  return o.$$click = (f) => f.stopPropagation(), v(a, (() => {
    var f = M(() => t.length === 0);
    return () => f() && Ll();
  })(), null), v(a, () => t.map((f) => (() => {
    var h = Il(), b = h.firstChild, T = b.firstChild, L = T.nextSibling;
    return T.addEventListener("change", () => i(f.id)), v(L, () => f.name), m(() => at(h, `flex items-center justify-between p-3 mb-2 rounded cursor-pointer border 
                ${l() === f.id ? "bg-blue-700 border-blue-500" : "bg-gray-800 border-gray-600"}`)), m(() => T.value = f.id), m(() => T.checked = l() === f.id), h;
  })()), null), K(p, "click", n), v(u, (() => {
    var f = M(() => t.length !== 0);
    return () => f() && (() => {
      var h = Ol();
      return h.$$click = () => {
        l() && r(l());
      }, m(() => h.disabled = !l()), h;
    })();
  })(), null), m((f) => {
    var h = `${e.position[1] - 300}px`, b = `${e.position[0] - 100}px`;
    return h !== f.e && ((f.e = h) != null ? o.style.setProperty("top", h) : o.style.removeProperty("top")), b !== f.t && ((f.t = b) != null ? o.style.setProperty("left", b) : o.style.removeProperty("left")), f;
  }, {
    e: void 0,
    t: void 0
  }), o;
})();
j(["click"]);
var jl = /* @__PURE__ */ x("<svg><g pointer-events=none><rect x=-27 y=-20 height=35 fill=black stroke=white strokeWidth=1 rx=5></rect><text x=-15 y=3 fill=white fontSize=8></svg>", !1, !0);
function Fl() {
  return E(zt, {
    get when() {
      return Jt();
    },
    children: (e) => {
      const t = e();
      return (() => {
        var l = jl(), i = l.firstChild, r = i.nextSibling;
        return v(r, () => t.text), m((n) => {
          var o = `translate(${t.x}, ${t.y - 10})`, s = t.text.length * 7 + 20;
          return o !== n.e && _(l, "transform", n.e = o), s !== n.t && _(i, "width", n.t = s), n;
        }, {
          e: void 0,
          t: void 0
        }), l;
      })();
    }
  });
}
const Dl = {
  language: "de"
};
class zl {
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
    let l = Dl.language;
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
const Ce = new zl(), Bl = Ce._.bind(Ce);
Ce.getPhrase.bind(Ce);
var Rl = /* @__PURE__ */ x('<svg><g cursor=pointer><rect x=20 width=100 height=30 fill=#4caf50 rx=5 ry=5></rect><text x=70 fill=white font-size=14 font-family="Arial, sans-serif"text-anchor=middle></svg>', !1, !0), Wl = /* @__PURE__ */ x('<div class="bg-gray-900 relative border text-sm"><svg><text x=10 y=30 fill=white fontSize=16 fontWeight=bold>NetworkSim Version 0.8 -- <tspan style=font-size:18px;font-weight:bold;>Subnet: 192.168.1</tspan></text><defs><linearGradient id=halfRedHalfGreen x1=0% y1=0% x2=100% y2=0%><stop offset=49.9%></stop><stop offset=50%></stop></linearGradient></defs>'), Zl = /* @__PURE__ */ x("<svg><path stroke=white fill=none></svg>", !1, !0), ql = /* @__PURE__ */ x("<svg><text fill=white fontSize=12 fontWeight=bold></svg>", !1, !0), Gl = /* @__PURE__ */ x("<svg><g></svg>", !1, !0), Yl = /* @__PURE__ */ x("<svg><circle r=8 fill=url(#halfRedHalfGreen)></svg>", !1, !0);
let W = [4, 1, [255]], Jl = [4, 1, 255];
function je(e, t, l) {
  let i = [], r = Array.isArray(e) ? e : [e], n = Array.isArray(t) ? t : [t];
  return r.forEach((o) => {
    n.forEach((s) => {
      xe.some((a) => a.nodes.includes(o) && a.nodes.includes(s)) && i.push({
        threadIndex: l,
        nodeId: o,
        nextNodeId: s
      });
    });
  }), i;
}
let Fe = [];
const on = (e) => {
  console.log("NetworkSimulator props:", e.width, e.height);
  const [t, l] = $(e.width || 500), [i, r] = $(e.height || 500), [n, o] = $(e.width / 500), [s, a] = $(e.height / 500), [u, p] = $(e.height / 500), [f, h] = $("Log:"), [b, T] = $("white"), [L, G] = $("blue"), [le, ne] = $(!1), [Z, U] = $(null), [I, Y] = $(null), [Q, ie] = $(null), [C, z] = $(null), [J, se] = $(!1), [S, H] = $(!1), [q, P] = $(!1), [F, V] = $(!1), [Ae, Te] = $(!1), [Xe, Ee] = $(null), [Kl, pt] = $(!1), [$t, $e] = $(!1), [vt, Me] = $(!1), [bt, Ne] = $(""), [mt, Ge] = $(!1), [yt, He] = $(!1), [Le, Ye] = $([]), [ve, xt] = gt(ht), ae = (d) => ve.find((g) => g.id === d), [Ie, wt] = $([255]), [Je, Pt] = $(null), kt = (d) => {
    let g = f();
    e.onSubmit({
      preventDefault: () => {
      },
      target: {
        value: g
      }
    }), h("");
  }, be = (d) => {
    console.log(`Device ${d.id} clicked! Initiate multicast ping.`), h((X) => `${X}[Device ${d.type} ${d.id} clicked!  Initiate multicast ping.]`), W = JSON.parse(JSON.stringify(Jl)), W[0] = d.id;
    let g = W[W.length - 1];
    g = Array.isArray(g) ? g : [g], g.map((X) => ae(X)).forEach((X) => {
      let B = ye.find((D) => D.destinationMac === X.mac);
      B ? console.log("entry found:", B) : (console.log("entry not found:", X.mac), rt((D) => [...D, {
        destinationMac: X.mac,
        port: `to ${X.id === 0 ? 255 : X.id}`
      }]), h((D) => `${D}[Forwarding table entry added for ${X.mac} to ${X.id}]`));
    }), console.log("fwding table:", d.id, ye), G(d.color), T("white"), Ke();
  }, _t = (d) => {
    console.log(`Printer ${d.id} clicked!`), h((g) => `${g}[Printer ${d.id} clicked!]`), Ee(d);
  }, Ct = (d) => {
    console.log(`=> TV ${d.id} clicked!`), h((g) => `${g}[TV ${d.id} clicked!]`), P(!0), ie(d);
  }, St = (d) => {
    console.log(`Mobile ${d.id} clicked!`), h((g) => `${g}[Mobile ${d.id} clicked!]`), V(!0), z(d);
  }, At = (d) => {
    h((g) => `${g}[Switch ${d.id} clicked!]`), se(!0), U(d);
  }, Tt = (d) => {
    h((g) => `${g}[Computer ${d.id} clicked!]`), Te(!0), Y(d);
  }, Xt = (d) => {
    console.log(`Computer ${d.id} preferences clicked!`), h((g) => `${g}[Computer ${d.id} preferences clicked!]`), console.debug(`Preferences for Computer ${d.id}`), H(!0), Y(d);
  }, Et = (d) => {
    He(!0);
  }, Mt = (d, g) => {
    console.log("Printer IP changed:", d, g), h((k) => `${k}[Printer ${d} IP changed to ${g.ip}]`), xt((k) => k.id === d, "ip", g.ip), Me(!0);
  }, Nt = (d) => {
    let g = ve.find((k) => k.type === "printer");
    console.log("handlePrintTestPage: nodes:", ve), console.log("handlePrintTestPage: available:", Le()), console.log("handlePrintTestPage: computer:", d), console.log("handlePrintTestPage: printer:", g), Le().some((k) => k.id === g.id) ? (console.log("handlePrintTestPage: Printer available"), g && g.ip.startsWith(d.subnet) && !g.ip.endsWith(d.id) && Je() === g.id ? (Ne(`Print test page to ${g.name}`), h((k) => `${k}[Print test page to ${g.name}]`), $e(!0), Ge(!0), e.onSubmit({
      preventDefault: () => {
      },
      target: {
        value: "Success!! Test page is printed!!!"
      }
    })) : (Ne(`Could not print test page to ${g.name}`), h((k) => `${k}[Could not print test page to ${g.name}]`), $e(!0), Ge(!1))) : (console.log("handlePrintTestPage: Printer not available"), Ne("Printer not available"), h((k) => `${k}[Printer not available]`), $e(!0));
  };
  We(() => {
    console.log("broadcast has changed:", le()), Ie().includes(13) ? (Ye([{
      id: 13,
      name: "HPP 1000"
    }]), h((d) => `${d}[switch port to Printer 13 is open]`)) : Ye([]);
  });
  const Ht = (d) => {
    !d.target.closest(".Switch-pref") && !d.target.closest(".popup") && !d.target.closest(".computer-pref") && !d.target.closest(".printer-pref") && Lt();
  }, Lt = () => {
    U(null), Y(null), Ee(null), H(!1), se(!1), pt(!1), Te(!1);
  }, [Ul, Ql] = $(!1), [en, tn] = $(0), [ln, nn] = $(0), [It, Ot] = $([]);
  let ee = je(W[0], W[1], 1), de = 0, R = null;
  function Oe() {
    console.debug(`updatePositions: ${JSON.stringify(ee)}`), Ot(ee.map((d) => ({
      id: d.nextNodeId,
      pos: {
        x: ae(d.nodeId).position[0],
        y: ae(d.nodeId).position[1]
      }
    })));
  }
  function Ve() {
    if (console.debug(`movingCircles: ${JSON.stringify(ee)}`), ee.length === 0) {
      cancelAnimationFrame(R), R = null, console.debug("Animation complete!");
      return;
    }
    const d = 50;
    if (ee.forEach(({
      threadIndex: g,
      nodeId: k,
      nextNodeId: X
    }) => {
      console.debug(`current: ${k}`, `next: ${X}`);
      const B = xe.findIndex((O) => O.nodes.includes(k) && O.nodes.includes(X));
      if (B === -1 || !Fe[B]) {
        console.warn("Path not found for:", k, "->", X);
        return;
      }
      const D = Fe[B], re = xe[B], c = D.getTotalLength(), w = re.nodes[0] !== k ? 1 - (de + 1) / d : (de + 1) / d, y = D.getPointAtLength(c * w), N = document.getElementById(`circle-${X}`);
      console.debug(`move circle-${X}`), N ? (N.setAttribute("cx", y.x), N.setAttribute("cy", y.y)) : console.warn("Circle not found for:", k);
    }), de + 1 < d)
      de++;
    else {
      de = 0;
      let g = [];
      ee.forEach(({
        threadIndex: k,
        nodeId: X,
        nextNodeId: B
      }) => {
        let D = W[k + 1], re = je(B, D, k + 1);
        g.push(...re);
      }), ee = g, Oe();
    }
    ee.length > 0 ? R = requestAnimationFrame(Ve) : (console.debug("Animation complete!"), cancelAnimationFrame(R), R = null);
  }
  function Vt() {
    R || (console.debug("Starting animation..."), Oe(), R = requestAnimationFrame(Ve));
  }
  function jt() {
    R && (cancelAnimationFrame(R), R = null, console.debug("Animation stopped."));
  }
  function Ke() {
    console.debug("Redoing animation..."), de = 0, cancelAnimationFrame(R), R = null, ee = je(W[0], W[1], 1), Oe(), R = requestAnimationFrame(Ve);
  }
  ze(() => jt()), Se(() => {
    Vt();
  }), ze(() => {
    cancelAnimationFrame(R);
  });
  const Ft = (d, g) => {
    const X = g - 30 - 20;
    return (() => {
      var B = Rl(), D = B.firstChild, re = D.nextSibling;
      return B.$$click = kt, _(D, "y", X), _(re, "y", X + 30 / 2 + 5), v(re, () => Bl("submit")), B;
    })();
  };
  return (() => {
    var d = Wl(), g = d.firstChild, k = g.firstChild, X = k.nextSibling, B = X.firstChild, D = B.firstChild, re = D.nextSibling;
    return d.$$click = Ht, v(g, () => xe.map((c, A) => {
      const w = ae(c.nodes[0]), y = ae(c.nodes[1]);
      return (() => {
        var N = Zl();
        return Rt((O) => Fe[A] = O, N), m((O) => {
          var Ue = `M ${w.position[0] * n()} ${w.position[1] * s()} L ${y.position[0] * n()} ${y.position[1] * s()}`, Qe = c.type === "internal" ? "8" : "1", et = c.type === "wireless" ? "5,5" : "0";
          return Ue !== O.e && _(N, "d", O.e = Ue), Qe !== O.t && _(N, "stroke-width", O.t = Qe), et !== O.a && _(N, "stroke-dasharray", O.a = et), O;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), N;
      })();
    }), k), v(g, () => ve.map((c) => (() => {
      var A = Gl();
      return v(A, (() => {
        var w = M(() => c.type === "Switch");
        return () => w() ? E(Qt, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * s();
          },
          get scale() {
            return u();
          },
          onClick: (y) => {
            y.stopPropagation(), At(c);
          }
        }) : M(() => c.type === "router")() ? E(tl, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * s();
          },
          get scale() {
            return u();
          },
          onClick: (y) => {
            y.stopPropagation(), be(c);
          }
        }) : M(() => c.type === "printer")() ? E(rl, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * s();
          },
          get scale() {
            return 0.7 * u();
          },
          get role() {
            return c.role;
          },
          get color() {
            return c.color;
          },
          onClick: (y) => {
            y.stopPropagation(), _t(c);
          }
        }) : M(() => c.type === "tv")() ? E(sl, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * s();
          },
          get scale() {
            return 0.7 * u();
          },
          get color() {
            return c.color;
          },
          onClick: (y) => {
            y.stopPropagation(), Ct(c);
          }
        }) : M(() => c.type === "mobile")() ? E(fl, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * s();
          },
          get scale() {
            return 0.7 * u();
          },
          get color() {
            return c.color;
          },
          onClick: (y) => {
            y.stopPropagation(), St(c);
          }
        }) : M(() => c.type === "cloud")() ? E(cl, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * s();
          },
          get scale() {
            return 3 * u();
          },
          onClick: (y) => {
            y.stopPropagation(), be(c);
          }
        }) : E(nl, {
          get x() {
            return c.position[0] * n();
          },
          get y() {
            return c.position[1] * s();
          },
          get role() {
            return c.role;
          },
          get color() {
            return c.color;
          },
          onClick: (y) => {
            y.stopPropagation(), Tt(c);
          }
        });
      })(), null), v(A, () => Ft(t(), i()), null), v(A, E(qe, {
        get x() {
          return c.position[0] * n() + 10;
        },
        get y() {
          return c.position[1] * s() - 25;
        },
        get text() {
          return `id=${c.id}`;
        },
        get children() {
          var w = ql();
          return v(w, () => c.id), m((y) => {
            var N = c.position[0] * n() + 30, O = c.position[1] * s() - 25;
            return N !== y.e && _(w, "x", y.e = N), O !== y.t && _(w, "y", y.t = O), y;
          }, {
            e: void 0,
            t: void 0
          }), w;
        }
      }), null), A;
    })()), X), v(g, () => It().map((c) => (() => {
      var A = Yl();
      return m((w) => {
        var y = `circle-${c.id}`, N = c.pos.x * n(), O = c.pos.y * s();
        return y !== w.e && _(A, "id", w.e = y), N !== w.t && _(A, "cx", w.t = N), O !== w.a && _(A, "cy", w.a = O), w;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      }), A;
    })()), null), v(g, E(Fl, {}), null), v(d, (() => {
      var c = M(() => !!(Z() && J()));
      return () => c() && E(bl, {
        get selectedSwitch() {
          return Z();
        },
        allowedPorts: Ie,
        setAllowedPorts: wt,
        setShowEmilieNotification: Me,
        onClose: () => se(!1)
      });
    })(), null), v(d, (() => {
      var c = M(() => !!(I() && S()));
      return () => c() && E(wl, {
        get selectedComputer() {
          return I();
        },
        onClose: () => H(!1)
      });
    })(), null), v(d, (() => {
      var c = M(() => !!(I() && yt()));
      return () => c() && E(Vl, {
        get selectedComputer() {
          return I();
        },
        get availablePrinters() {
          return Le();
        },
        selectedPrinter: Je,
        setSelectedPrinter: Pt,
        onConfirm: (A) => {
          console.log("Selected printer ID:", A), He(!1), h((w) => `${w}[Printer ${A} selected]`);
        },
        onClose: () => He(!1)
      });
    })(), null), v(d, (() => {
      var c = M(() => !!Xe());
      return () => c() && E(Tl, {
        get selectedPrinter() {
          return Xe();
        },
        onSave: Mt,
        onClose: () => Ee(null)
      });
    })(), null), v(d, (() => {
      var c = M(() => !!(Q() && q()));
      return () => c() && E(ot, {
        get selectedDevice() {
          return Q();
        },
        onClose: () => P(!1),
        onPing: (A) => {
          be(A);
        }
      });
    })(), null), v(d, (() => {
      var c = M(() => !!(C() && F()));
      return () => c() && E(ot, {
        get selectedDevice() {
          return C();
        },
        onClose: () => V(!1),
        onPing: (A) => {
          be(A);
        }
      });
    })(), null), v(d, (() => {
      var c = M(() => !!(I() && Ae()));
      return () => c() && E(_l, {
        get selectedComputer() {
          return I();
        },
        onClose: () => Te(!1),
        onPing: () => {
          console.log("Ping:", I().id), W[0] = I().id;
          let A = Ie().filter((w) => w !== I().id);
          W[W.length - 1] = A, console.log("thread:", W), A.forEach((w) => {
            let y = ye.find((N) => N.destinationMac === ae(w).mac);
            y ? console.log("entry found:", y) : (console.log("entry not found:", w), rt((N) => [...N, {
              destinationMac: ae(w).mac,
              port: `to ${w}`
            }]));
          }), G(I().color), T("gray"), Ke();
        },
        onPrinterSelect: Et,
        onPrintTestPage: Nt,
        onPreferences: Xt
      });
    })(), null), v(d, (() => {
      var c = M(() => !!$t());
      return () => c() && E(El, {
        get selectedComputer() {
          return I();
        },
        title: "Print a test page",
        message: bt,
        success: mt,
        onClose: () => $e(!1)
      });
    })(), null), v(d, (() => {
      var c = M(() => !!vt());
      return () => c() && E(Nl, {
        get selectedComputer() {
          return Xe();
        },
        title: "Alert",
        message: "Please inform Emilie!",
        onClose: () => Me(!1)
      });
    })(), null), m((c) => {
      var A = e.width, w = e.height, y = L(), N = b();
      return A !== c.e && _(g, "width", c.e = A), w !== c.t && _(g, "height", c.t = w), y !== c.a && _(D, "stop-color", c.a = y), N !== c.o && _(re, "stop-color", c.o = N), c;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), d;
  })();
};
j(["click"]);
let sn = "0.1.0";
export {
  on as NetworkSimulator,
  sn as network_simulation_version
};
