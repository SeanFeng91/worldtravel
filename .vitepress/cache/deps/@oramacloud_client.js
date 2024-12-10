import {
  __publicField
} from "./chunk-KT2WZD7D.js";

// node_modules/@oramacloud/client/dist/index.js
var Pt = Object.create;
var pe = Object.defineProperty;
var vt = Object.getOwnPropertyDescriptor;
var Ct = Object.getOwnPropertyNames;
var _t = Object.getPrototypeOf;
var Nt = Object.prototype.hasOwnProperty;
var A = (t2, e) => () => (e || t2((e = { exports: {} }).exports, e), e.exports);
var Dt = (t2, e, n, r) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s of Ct(e)) !Nt.call(t2, s) && s !== n && pe(t2, s, { get: () => e[s], enumerable: !(r = vt(e, s)) || r.enumerable });
  return t2;
};
var Y = (t2, e, n) => (n = t2 != null ? Pt(_t(t2)) : {}, Dt(e || !t2 || !t2.__esModule ? pe(n, "default", { value: t2, enumerable: true }) : n, t2));
var Q = A((y) => {
  "use strict";
  Object.defineProperty(y, "__esModule", { value: true });
  y.isBytes = ge;
  y.number = R;
  y.bool = me;
  y.bytes = X;
  y.hash = ye;
  y.exists = Se;
  y.output = be;
  function R(t2) {
    if (!Number.isSafeInteger(t2) || t2 < 0) throw new Error(`positive integer expected, not ${t2}`);
  }
  function me(t2) {
    if (typeof t2 != "boolean") throw new Error(`boolean expected, not ${t2}`);
  }
  function ge(t2) {
    return t2 instanceof Uint8Array || t2 != null && typeof t2 == "object" && t2.constructor.name === "Uint8Array";
  }
  function X(t2, ...e) {
    if (!ge(t2)) throw new Error("Uint8Array expected");
    if (e.length > 0 && !e.includes(t2.length)) throw new Error(`Uint8Array expected of length ${e}, not of length=${t2.length}`);
  }
  function ye(t2) {
    if (typeof t2 != "function" || typeof t2.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
    R(t2.outputLen), R(t2.blockLen);
  }
  function Se(t2, e = true) {
    if (t2.destroyed) throw new Error("Hash instance has been destroyed");
    if (e && t2.finished) throw new Error("Hash#digest() has already been called");
  }
  function be(t2, e) {
    X(t2);
    let n = e.outputLen;
    if (t2.length < n) throw new Error(`digestInto() expects output buffer of length at least ${n}`);
  }
  var kt = { number: R, bool: me, bytes: X, hash: ye, exists: Se, output: be };
  y.default = kt;
});
var Fe = A((a) => {
  "use strict";
  Object.defineProperty(a, "__esModule", { value: true });
  a.add5L = a.add5H = a.add4H = a.add4L = a.add3H = a.add3L = a.rotlBL = a.rotlBH = a.rotlSL = a.rotlSH = a.rotr32L = a.rotr32H = a.rotrBL = a.rotrBH = a.rotrSL = a.rotrSH = a.shrSL = a.shrSH = a.toBig = void 0;
  a.fromBig = ee;
  a.split = Ie;
  a.add = Le;
  var M = BigInt(2 ** 32 - 1), Z = BigInt(32);
  function ee(t2, e = false) {
    return e ? { h: Number(t2 & M), l: Number(t2 >> Z & M) } : { h: Number(t2 >> Z & M) | 0, l: Number(t2 & M) | 0 };
  }
  function Ie(t2, e = false) {
    let n = new Uint32Array(t2.length), r = new Uint32Array(t2.length);
    for (let s = 0; s < t2.length; s++) {
      let { h: o, l: i } = ee(t2[s], e);
      [n[s], r[s]] = [o, i];
    }
    return [n, r];
  }
  var Te = (t2, e) => BigInt(t2 >>> 0) << Z | BigInt(e >>> 0);
  a.toBig = Te;
  var we = (t2, e, n) => t2 >>> n;
  a.shrSH = we;
  var xe = (t2, e, n) => t2 << 32 - n | e >>> n;
  a.shrSL = xe;
  var Ae = (t2, e, n) => t2 >>> n | e << 32 - n;
  a.rotrSH = Ae;
  var Oe = (t2, e, n) => t2 << 32 - n | e >>> n;
  a.rotrSL = Oe;
  var Ee = (t2, e, n) => t2 << 64 - n | e >>> n - 32;
  a.rotrBH = Ee;
  var Pe = (t2, e, n) => t2 >>> n - 32 | e << 64 - n;
  a.rotrBL = Pe;
  var ve = (t2, e) => e;
  a.rotr32H = ve;
  var Ce = (t2, e) => t2;
  a.rotr32L = Ce;
  var _e = (t2, e, n) => t2 << n | e >>> 32 - n;
  a.rotlSH = _e;
  var Ne = (t2, e, n) => e << n | t2 >>> 32 - n;
  a.rotlSL = Ne;
  var De = (t2, e, n) => e << n - 32 | t2 >>> 64 - n;
  a.rotlBH = De;
  var ke = (t2, e, n) => t2 << n - 32 | e >>> 64 - n;
  a.rotlBL = ke;
  function Le(t2, e, n, r) {
    let s = (e >>> 0) + (r >>> 0);
    return { h: t2 + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
  }
  var Re = (t2, e, n) => (t2 >>> 0) + (e >>> 0) + (n >>> 0);
  a.add3L = Re;
  var Me = (t2, e, n, r) => e + n + r + (t2 / 2 ** 32 | 0) | 0;
  a.add3H = Me;
  var Be = (t2, e, n, r) => (t2 >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0);
  a.add4L = Be;
  var Ue = (t2, e, n, r, s) => e + n + r + s + (t2 / 2 ** 32 | 0) | 0;
  a.add4H = Ue;
  var ze = (t2, e, n, r, s) => (t2 >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0);
  a.add5L = ze;
  var He = (t2, e, n, r, s, o) => e + n + r + s + o + (t2 / 2 ** 32 | 0) | 0;
  a.add5H = He;
  var Lt = { fromBig: ee, split: Ie, toBig: Te, shrSH: we, shrSL: xe, rotrSH: Ae, rotrSL: Oe, rotrBH: Ee, rotrBL: Pe, rotr32H: ve, rotr32L: Ce, rotlSH: _e, rotlSL: Ne, rotlBH: De, rotlBL: ke, add: Le, add3L: Re, add3H: Me, add4L: Be, add4H: Ue, add5H: He, add5L: ze };
  a.default = Lt;
});
var We = A((B) => {
  "use strict";
  Object.defineProperty(B, "__esModule", { value: true });
  B.crypto = void 0;
  B.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
});
var je = A((c) => {
  "use strict";
  Object.defineProperty(c, "__esModule", { value: true });
  c.Hash = c.nextTick = c.byteSwapIfBE = c.byteSwap = c.isLE = c.rotl = c.rotr = c.createView = c.u32 = c.u8 = void 0;
  c.isBytes = Rt;
  c.byteSwap32 = Wt;
  c.bytesToHex = $t;
  c.hexToBytes = jt;
  c.asyncLoop = Kt;
  c.utf8ToBytes = $e;
  c.toBytes = U;
  c.concatBytes = qt;
  c.checkOpts = Yt;
  c.wrapConstructor = Xt;
  c.wrapConstructorWithOpts = Qt;
  c.wrapXOFConstructorWithOpts = Zt;
  c.randomBytes = en;
  var E = We(), ne = Q();
  function Rt(t2) {
    return t2 instanceof Uint8Array || t2 != null && typeof t2 == "object" && t2.constructor.name === "Uint8Array";
  }
  var Mt = (t2) => new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength);
  c.u8 = Mt;
  var Bt = (t2) => new Uint32Array(t2.buffer, t2.byteOffset, Math.floor(t2.byteLength / 4));
  c.u32 = Bt;
  var Ut = (t2) => new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
  c.createView = Ut;
  var zt = (t2, e) => t2 << 32 - e | t2 >>> e;
  c.rotr = zt;
  var Ht = (t2, e) => t2 << e | t2 >>> 32 - e >>> 0;
  c.rotl = Ht;
  c.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  var Ft = (t2) => t2 << 24 & 4278190080 | t2 << 8 & 16711680 | t2 >>> 8 & 65280 | t2 >>> 24 & 255;
  c.byteSwap = Ft;
  c.byteSwapIfBE = c.isLE ? (t2) => t2 : (t2) => (0, c.byteSwap)(t2);
  function Wt(t2) {
    for (let e = 0; e < t2.length; e++) t2[e] = (0, c.byteSwap)(t2[e]);
  }
  var Vt = Array.from({ length: 256 }, (t2, e) => e.toString(16).padStart(2, "0"));
  function $t(t2) {
    (0, ne.bytes)(t2);
    let e = "";
    for (let n = 0; n < t2.length; n++) e += Vt[t2[n]];
    return e;
  }
  var S = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
  function Ve(t2) {
    if (t2 >= S._0 && t2 <= S._9) return t2 - S._0;
    if (t2 >= S._A && t2 <= S._F) return t2 - (S._A - 10);
    if (t2 >= S._a && t2 <= S._f) return t2 - (S._a - 10);
  }
  function jt(t2) {
    if (typeof t2 != "string") throw new Error("hex string expected, got " + typeof t2);
    let e = t2.length, n = e / 2;
    if (e % 2) throw new Error("padded hex string expected, got unpadded hex of length " + e);
    let r = new Uint8Array(n);
    for (let s = 0, o = 0; s < n; s++, o += 2) {
      let i = Ve(t2.charCodeAt(o)), l = Ve(t2.charCodeAt(o + 1));
      if (i === void 0 || l === void 0) {
        let f = t2[o] + t2[o + 1];
        throw new Error('hex string expected, got non-hex character "' + f + '" at index ' + o);
      }
      r[s] = i * 16 + l;
    }
    return r;
  }
  var Jt = async () => {
  };
  c.nextTick = Jt;
  async function Kt(t2, e, n) {
    let r = Date.now();
    for (let s = 0; s < t2; s++) {
      n(s);
      let o = Date.now() - r;
      o >= 0 && o < e || (await (0, c.nextTick)(), r += o);
    }
  }
  function $e(t2) {
    if (typeof t2 != "string") throw new Error(`utf8ToBytes expected string, got ${typeof t2}`);
    return new Uint8Array(new TextEncoder().encode(t2));
  }
  function U(t2) {
    return typeof t2 == "string" && (t2 = $e(t2)), (0, ne.bytes)(t2), t2;
  }
  function qt(...t2) {
    let e = 0;
    for (let r = 0; r < t2.length; r++) {
      let s = t2[r];
      (0, ne.bytes)(s), e += s.length;
    }
    let n = new Uint8Array(e);
    for (let r = 0, s = 0; r < t2.length; r++) {
      let o = t2[r];
      n.set(o, s), s += o.length;
    }
    return n;
  }
  var te = class {
    clone() {
      return this._cloneInto();
    }
  };
  c.Hash = te;
  var Gt = {}.toString;
  function Yt(t2, e) {
    if (e !== void 0 && Gt.call(e) !== "[object Object]") throw new Error("Options should be object or undefined");
    return Object.assign(t2, e);
  }
  function Xt(t2) {
    let e = (r) => t2().update(U(r)).digest(), n = t2();
    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t2(), e;
  }
  function Qt(t2) {
    let e = (r, s) => t2(s).update(U(r)).digest(), n = t2({});
    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = (r) => t2(r), e;
  }
  function Zt(t2) {
    let e = (r, s) => t2(s).update(U(r)).digest(), n = t2({});
    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = (r) => t2(r), e;
  }
  function en(t2 = 32) {
    if (E.crypto && typeof E.crypto.getRandomValues == "function") return E.crypto.getRandomValues(new Uint8Array(t2));
    if (E.crypto && typeof E.crypto.randomBytes == "function") return E.crypto.randomBytes(t2);
    throw new Error("crypto.getRandomValues must be defined");
  }
});
var Ze = A((d) => {
  "use strict";
  Object.defineProperty(d, "__esModule", { value: true });
  d.shake256 = d.shake128 = d.keccak_512 = d.keccak_384 = d.keccak_256 = d.keccak_224 = d.sha3_512 = d.sha3_384 = d.sha3_256 = d.sha3_224 = d.Keccak = void 0;
  d.keccakP = Xe;
  var P = Q(), C = Fe(), b = je(), qe = [], Ge = [], Ye = [], tn = BigInt(0), v = BigInt(1), nn = BigInt(2), rn = BigInt(7), sn = BigInt(256), on = BigInt(113);
  for (let t2 = 0, e = v, n = 1, r = 0; t2 < 24; t2++) {
    [n, r] = [r, (2 * n + 3 * r) % 5], qe.push(2 * (5 * r + n)), Ge.push((t2 + 1) * (t2 + 2) / 2 % 64);
    let s = tn;
    for (let o = 0; o < 7; o++) e = (e << v ^ (e >> rn) * on) % sn, e & nn && (s ^= v << (v << BigInt(o)) - v);
    Ye.push(s);
  }
  var [an, cn] = (0, C.split)(Ye, true), Je = (t2, e, n) => n > 32 ? (0, C.rotlBH)(t2, e, n) : (0, C.rotlSH)(t2, e, n), Ke = (t2, e, n) => n > 32 ? (0, C.rotlBL)(t2, e, n) : (0, C.rotlSL)(t2, e, n);
  function Xe(t2, e = 24) {
    let n = new Uint32Array(10);
    for (let r = 24 - e; r < 24; r++) {
      for (let i = 0; i < 10; i++) n[i] = t2[i] ^ t2[i + 10] ^ t2[i + 20] ^ t2[i + 30] ^ t2[i + 40];
      for (let i = 0; i < 10; i += 2) {
        let l = (i + 8) % 10, f = (i + 2) % 10, h = n[f], u = n[f + 1], p = Je(h, u, 1) ^ n[l], m = Ke(h, u, 1) ^ n[l + 1];
        for (let I = 0; I < 50; I += 10) t2[i + I] ^= p, t2[i + I + 1] ^= m;
      }
      let s = t2[2], o = t2[3];
      for (let i = 0; i < 24; i++) {
        let l = Ge[i], f = Je(s, o, l), h = Ke(s, o, l), u = qe[i];
        s = t2[u], o = t2[u + 1], t2[u] = f, t2[u + 1] = h;
      }
      for (let i = 0; i < 50; i += 10) {
        for (let l = 0; l < 10; l++) n[l] = t2[i + l];
        for (let l = 0; l < 10; l++) t2[i + l] ^= ~n[(l + 2) % 10] & n[(l + 4) % 10];
      }
      t2[0] ^= an[r], t2[1] ^= cn[r];
    }
    n.fill(0);
  }
  var _ = class t2 extends b.Hash {
    constructor(e, n, r, s = false, o = 24) {
      if (super(), this.blockLen = e, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = o, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, (0, P.number)(r), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200), this.state32 = (0, b.u32)(this.state);
    }
    keccak() {
      b.isLE || (0, b.byteSwap32)(this.state32), Xe(this.state32, this.rounds), b.isLE || (0, b.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(e) {
      (0, P.exists)(this);
      let { blockLen: n, state: r } = this;
      e = (0, b.toBytes)(e);
      let s = e.length;
      for (let o = 0; o < s; ) {
        let i = Math.min(n - this.pos, s - o);
        for (let l = 0; l < i; l++) r[this.pos++] ^= e[o++];
        this.pos === n && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = true;
      let { state: e, suffix: n, pos: r, blockLen: s } = this;
      e[r] ^= n, n & 128 && r === s - 1 && this.keccak(), e[s - 1] ^= 128, this.keccak();
    }
    writeInto(e) {
      (0, P.exists)(this, false), (0, P.bytes)(e), this.finish();
      let n = this.state, { blockLen: r } = this;
      for (let s = 0, o = e.length; s < o; ) {
        this.posOut >= r && this.keccak();
        let i = Math.min(r - this.posOut, o - s);
        e.set(n.subarray(this.posOut, this.posOut + i), s), this.posOut += i, s += i;
      }
      return e;
    }
    xofInto(e) {
      if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
      return this.writeInto(e);
    }
    xof(e) {
      return (0, P.number)(e), this.xofInto(new Uint8Array(e));
    }
    digestInto(e) {
      if ((0, P.output)(e, this), this.finished) throw new Error("digest() was already called");
      return this.writeInto(e), this.destroy(), e;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true, this.state.fill(0);
    }
    _cloneInto(e) {
      let { blockLen: n, suffix: r, outputLen: s, rounds: o, enableXOF: i } = this;
      return e || (e = new t2(n, r, s, i, o)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = o, e.suffix = r, e.outputLen = s, e.enableXOF = i, e.destroyed = this.destroyed, e;
    }
  };
  d.Keccak = _;
  var T = (t2, e, n) => (0, b.wrapConstructor)(() => new _(e, t2, n));
  d.sha3_224 = T(6, 144, 224 / 8);
  d.sha3_256 = T(6, 136, 256 / 8);
  d.sha3_384 = T(6, 104, 384 / 8);
  d.sha3_512 = T(6, 72, 512 / 8);
  d.keccak_224 = T(1, 144, 224 / 8);
  d.keccak_256 = T(1, 136, 256 / 8);
  d.keccak_384 = T(1, 104, 384 / 8);
  d.keccak_512 = T(1, 72, 512 / 8);
  var Qe = (t2, e, n) => (0, b.wrapXOFConstructorWithOpts)((r = {}) => new _(e, t2, r.dkLen === void 0 ? n : r.dkLen, true));
  d.shake128 = Qe(31, 168, 128 / 8);
  d.shake256 = Qe(31, 136, 256 / 8);
});
var at = A((Bn, w) => {
  "use strict";
  var { sha3_512: ln } = Ze(), tt = 24, N = 32, re = (t2 = 4, e = Math.random) => {
    let n = "";
    for (; n.length < t2; ) n = n + Math.floor(e() * 36).toString(36);
    return n;
  };
  function nt(t2) {
    let e = BigInt(8), n = BigInt(0);
    for (let r of t2.values()) {
      let s = BigInt(r);
      n = (n << e) + s;
    }
    return n;
  }
  var rt = (t2 = "") => nt(ln(t2)).toString(36).slice(1), et = Array.from({ length: 26 }, (t2, e) => String.fromCharCode(e + 97)), un = (t2) => et[Math.floor(t2() * et.length)], st = ({ globalObj: t2 = typeof global < "u" ? global : typeof window < "u" ? window : {}, random: e = Math.random } = {}) => {
    let n = Object.keys(t2).toString(), r = n.length ? n + re(N, e) : re(N, e);
    return rt(r).substring(0, N);
  }, ot = (t2) => () => t2++, dn = 476782367, it = ({ random: t2 = Math.random, counter: e = ot(Math.floor(t2() * dn)), length: n = tt, fingerprint: r = st({ random: t2 }) } = {}) => function() {
    let o = un(t2), i = Date.now().toString(36), l = e().toString(36), f = re(n, t2), h = `${i + f + l + r}`;
    return `${o + rt(h).substring(1, n)}`;
  }, hn = it(), fn = (t2, { minLength: e = 2, maxLength: n = N } = {}) => {
    let r = t2.length, s = /^[a-z][0-9a-z]+$/;
    try {
      if (typeof t2 == "string" && r >= e && r <= n && s.test(t2)) return true;
    } finally {
    }
    return false;
  };
  w.exports.getConstants = () => ({ defaultLength: tt, bigLength: N });
  w.exports.init = it;
  w.exports.createId = hn;
  w.exports.bufToBigInt = nt;
  w.exports.createCounter = ot;
  w.exports.createFingerprint = st;
  w.exports.isCuid = fn;
});
var z = A((Un, D) => {
  "use strict";
  var { createId: pn, init: mn, getConstants: gn, isCuid: yn } = at();
  D.exports.createId = pn;
  D.exports.init = mn;
  D.exports.getConstants = gn;
  D.exports.isCuid = yn;
});
var Tt = Y(z(), 1);
var Sn = { arabic: "ar", armenian: "am", bulgarian: "bg", danish: "dk", dutch: "nl", english: "en", finnish: "fi", french: "fr", german: "de", greek: "gr", hungarian: "hu", indian: "in", indonesian: "id", irish: "ie", italian: "it", lithuanian: "lt", nepali: "np", norwegian: "no", portuguese: "pt", romanian: "ro", russian: "ru", serbian: "rs", slovenian: "ru", spanish: "es", swedish: "se", tamil: "ta", turkish: "tr", ukrainian: "uk", sanskrit: "sk" };
var se = Object.keys(Sn);
var Fn = Date.now().toString().slice(5);
var ct = BigInt(1e3);
var lt = BigInt(1e6);
var ut = BigInt(1e9);
function dt(t2) {
  return typeof t2 == "number" && (t2 = BigInt(t2)), t2 < ct ? `${t2}ns` : t2 < lt ? `${t2 / ct}μs` : t2 < ut ? `${t2 / lt}ms` : `${t2 / ut}s`;
}
var Wn = "intersection" in /* @__PURE__ */ new Set();
var Vn = "union" in /* @__PURE__ */ new Set();
var bn = se.join(`
 - `);
var qn = { NO_LANGUAGE_WITH_CUSTOM_TOKENIZER: "Do not pass the language option to create when using a custom tokenizer.", LANGUAGE_NOT_SUPPORTED: `Language "%s" is not supported.
Supported languages are:
 - ${bn}`, INVALID_STEMMER_FUNCTION_TYPE: "config.stemmer property must be a function.", MISSING_STEMMER: 'As of version 1.0.0 @orama/orama does not ship non English stemmers by default. To solve this, please explicitly import and specify the "%s" stemmer from the package @orama/stemmers. See https://docs.oramasearch.com/open-source/text-analysis/stemming for more information.', CUSTOM_STOP_WORDS_MUST_BE_FUNCTION_OR_ARRAY: "Custom stop words array must only contain strings.", UNSUPPORTED_COMPONENT: 'Unsupported component "%s".', COMPONENT_MUST_BE_FUNCTION: 'The component "%s" must be a function.', COMPONENT_MUST_BE_FUNCTION_OR_ARRAY_FUNCTIONS: 'The component "%s" must be a function or an array of functions.', INVALID_SCHEMA_TYPE: 'Unsupported schema type "%s" at "%s". Expected "string", "boolean" or "number" or array of them.', DOCUMENT_ID_MUST_BE_STRING: 'Document id must be of type "string". Got "%s" instead.', DOCUMENT_ALREADY_EXISTS: 'A document with id "%s" already exists.', DOCUMENT_DOES_NOT_EXIST: 'A document with id "%s" does not exists.', MISSING_DOCUMENT_PROPERTY: 'Missing searchable property "%s".', INVALID_DOCUMENT_PROPERTY: 'Invalid document property "%s": expected "%s", got "%s"', UNKNOWN_INDEX: 'Invalid property name "%s". Expected a wildcard string ("*") or array containing one of the following properties: %s', INVALID_BOOST_VALUE: "Boost value must be a number greater than, or less than 0.", INVALID_FILTER_OPERATION: "You can only use one operation per filter, you requested %d.", SCHEMA_VALIDATION_FAILURE: 'Cannot insert document due schema validation failure on "%s" property.', INVALID_SORT_SCHEMA_TYPE: 'Unsupported sort schema type "%s" at "%s". Expected "string" or "number".', CANNOT_SORT_BY_ARRAY: 'Cannot configure sort for "%s" because it is an array (%s).', UNABLE_TO_SORT_ON_UNKNOWN_FIELD: 'Unable to sort on unknown field "%s". Allowed fields: %s', SORT_DISABLED: "Sort is disabled. Please read the documentation at https://docs.oramasearch for more information.", UNKNOWN_GROUP_BY_PROPERTY: 'Unknown groupBy property "%s".', INVALID_GROUP_BY_PROPERTY: 'Invalid groupBy property "%s". Allowed types: "%s", but given "%s".', UNKNOWN_FILTER_PROPERTY: 'Unknown filter property "%s".', INVALID_VECTOR_SIZE: 'Vector size must be a number greater than 0. Got "%s" instead.', INVALID_VECTOR_VALUE: 'Vector value must be a number greater than 0. Got "%s" instead.', INVALID_INPUT_VECTOR: `Property "%s" was declared as a %s-dimensional vector, but got a %s-dimensional vector instead.
Input vectors must be of the size declared in the schema, as calculating similarity between vectors of different sizes can lead to unexpected results.`, WRONG_SEARCH_PROPERTY_TYPE: 'Property "%s" is not searchable. Only "string" properties are searchable.', FACET_NOT_SUPPORTED: `Facet doens't support the type "%s".`, INVALID_DISTANCE_SUFFIX: 'Invalid distance suffix "%s". Valid suffixes are: cm, m, km, mi, yd, ft.', INVALID_SEARCH_MODE: 'Invalid search mode "%s". Valid modes are: "fulltext", "vector", "hybrid".', MISSING_VECTOR_AND_SECURE_PROXY: "No vector was provided and no secure proxy was configured. Please provide a vector or configure an Orama Secure Proxy to perform hybrid search.", MISSING_TERM: '"term" is a required parameter when performing hybrid search. Please provide a search term.', INVALID_VECTOR_INPUT: 'Invalid "vector" property. Expected an object with "value" and "property" properties, but got "%s" instead.', PLUGIN_CRASHED: "A plugin crashed during initialization. Please check the error message for more information:", PLUGIN_SECURE_PROXY_NOT_FOUND: `Could not find '@orama/secure-proxy-plugin' installed in your Orama instance.
Please install it before proceeding with creating an answer session.
Read more at https://docs.orama.com/open-source/plugins/plugin-secure-proxy
`, PLUGIN_SECURE_PROXY_MISSING_CHAT_MODEL: `Could not find a chat model defined in the secure proxy plugin configuration.
Please provide a chat model before proceeding with creating an answer session.
Read more at https://docs.orama.com/open-source/plugins/plugin-secure-proxy
`, ANSWER_SESSION_LAST_MESSAGE_IS_NOT_ASSISTANT: "The last message in the session is not an assistant message. Cannot regenerate non-assistant messages.", PLUGIN_COMPONENT_CONFLICT: 'The component "%s" is already defined. The plugin "%s" is trying to redefine it.' };
function oe(t2) {
  return { raw: Number(t2), formatted: dt(t2) };
}
var On = "[^aeiou]";
var ft = "[aeiouy]";
var x = On + "[^aeiouy]*";
var L = ft + "[aeiou]*";
var Fr = "^(" + x + ")?" + L + x;
var Wr = "^(" + x + ")?" + L + x + "(" + L + ")?$";
var Vr = "^(" + x + ")?" + L + x + L + x;
var $r = "^(" + x + ")?" + ft;
var mt = "2.1.4";
var gt = { name: "@oramacloud/client", version: mt, description: "Orama SDK client for Node.js, Deno, and Browsers", type: "module", sideEffects: false, main: "./dist/index.js", module: "./dist/index.js", types: "./dist/index.d.ts", runkitExampleFilename: "./example/runkit.js", exports: { types: "./dist/index.d.ts", browser: { import: "./dist/index.js", require: "./dist/index.global.js" }, import: "./dist/index.js", require: "./dist/index.cjs", default: "./dist/index.js" }, scripts: { watch: "tsup --config tsup.lib.js --watch src", build: "tsup --config tsup.lib.js", test: 'glob -c "node --import tsx --no-warnings --test" "./tests/**/*.test.ts"', "serve:example": "esbuild src/index.ts --bundle --outfile=example/out.js --format=esm --watch --servedir=example" }, keywords: ["orama", "search engine", "sdk"], files: ["dist", "example/runkit.js"], author: { name: "Michele Riva", email: "michele.riva@oramasearch.com", url: "https://github.com/MicheleRiva" }, license: "ISC", dependencies: { "@orama/cuid2": "^2.2.3", "@orama/orama": "^3.0.0", lodash: "^4.17.21" }, devDependencies: { "@fastify/formbody": "^7.4.0", "@types/lodash": "^4.14.202", "@types/node": "^20.3.1", dotenv: "^16.3.1", esbuild: "0.18.5", fastify: "^4.19.2", glob: "^11.0.0", husky: "^8.0.3", "npm-run-all": "^4.1.5", "ts-standard": "^12.0.2", tsup: "^8.3.0", tsx: "^4.7.0", typescript: "^5.1.3" }, publishConfig: { access: "public" }, "ts-standard": { ignore: ["dist", "node_modules"] } };
var ce = Y(z(), 1);
var yt = "https://answer.api.orama.com";
var St = "/v1/indexes";
var ie = "orama_user_id";
function bt(t2) {
  let [e, ...n] = t2.split(`
`), r = n.join(`
`).replace("data: ", "");
  return { event: e.replace("event: ", ""), data: r };
}
function ae(t2) {
  return typeof t2 == "object" ? JSON.stringify(t2) : `${t2}`;
}
var H = class {
  constructor(e) {
    __publicField(this, "messages");
    __publicField(this, "inferenceType");
    __publicField(this, "oramaClient");
    __publicField(this, "endpoint");
    __publicField(this, "abortController");
    __publicField(this, "events");
    __publicField(this, "userContext");
    __publicField(this, "conversationID");
    __publicField(this, "lastInteractionParams");
    __publicField(this, "state", []);
    __publicField(this, "systemPrompts");
    let n = e.oramaClient.answersApiBaseURL || yt;
    this.messages = e.initialMessages || [], this.inferenceType = e.inferenceType, this.oramaClient = e.oramaClient, this.endpoint = `${n}/v1/answer?api-key=${this.oramaClient.api_key}`, this.events = e.events, this.conversationID = (0, ce.createId)(), this.userContext = e.userContext;
  }
  async askStream(e) {
    return this.messages.push({ role: "user", content: e.term ?? "" }), this.fetchAnswer(e);
  }
  async ask(e) {
    var _a;
    let n = await this.askStream(e), r = "";
    for await (let s of n) r = s;
    return ((_a = this.events) == null ? void 0 : _a.onMessageChange) && this.events.onMessageChange(this.messages), r;
  }
  getMessages() {
    return this.messages;
  }
  clearSession() {
    var _a, _b;
    this.messages = [], this.state = [], ((_a = this.events) == null ? void 0 : _a.onMessageChange) && this.events.onMessageChange(this.messages), ((_b = this.events) == null ? void 0 : _b.onStateChange) && this.events.onStateChange(this.state);
  }
  abortAnswer() {
    if (!this.abortController) throw new Error("AbortController is not ready");
    this.abortController.abort(), this.abortController = void 0, this.state[this.state.length - 1].aborted = true;
  }
  async regenerateLast({ stream: e = true } = {}) {
    var _a;
    if (this.state.length === 0 || this.messages.length === 0) throw new Error("No messages to regenerate");
    if (!(((_a = this.messages.at(-1)) == null ? void 0 : _a.role) === "assistant")) throw new Error("Last message is not an assistant message");
    return this.messages.pop(), this.state.pop(), e ? this.askStream(this.lastInteractionParams) : this.ask(this.lastInteractionParams);
  }
  addNewEmptyAssistantMessage() {
    this.messages.push({ role: "assistant", content: "" });
  }
  async *fetchAnswer(e) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    this.abortController = new AbortController(), this.lastInteractionParams = e;
    let n = (0, ce.createId)(), r = null, s = this.state.length;
    this.state.push({ interactionId: n, query: e.term ?? "", response: "", relatedQueries: null, sources: null, translatedQuery: null, segment: null, trigger: null, aborted: false, loading: true, error: false, errorMessage: null });
    try {
      ((_a = this.events) == null ? void 0 : _a.onNewInteractionStarted) && this.events.onNewInteractionStarted(n), ((_b = this.events) == null ? void 0 : _b.onStateChange) && this.events.onStateChange(this.state);
      let o = new URLSearchParams();
      o.append("type", this.inferenceType), o.append("messages", JSON.stringify(this.messages)), o.append("query", e.term ?? ""), o.append("conversationId", this.conversationID), o.append("userId", this.oramaClient.getUserId()), o.append("endpoint", this.oramaClient.endpoint), o.append("searchParams", JSON.stringify(e)), o.append("identity", this.oramaClient.getIdentity() ?? ""), o.append("interactionId", n), o.append("alias", this.oramaClient.getAlias() ?? "");
      let i = this.getSystemPromptConfiguration();
      if (i && o.append("systemPrompts", JSON.stringify(i)), this.userContext && o.append("userContext", ae(this.userContext)), e.userData && o.append("userData", ae(e.userData)), e.related) {
        if (((_c = e.related) == null ? void 0 : _c.howMany) && ((_d = e.related) == null ? void 0 : _d.howMany) > 5) throw new Error("Can generate at most 5 related queries");
        o.append("related", JSON.stringify({ enabled: true, howMany: e.related.howMany ?? 3, format: e.related.format ?? "question" }));
      }
      let l = await fetch(this.endpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: o.toString(), signal: this.abortController.signal });
      if (!l.ok || !l.body) throw new Error(l.statusText);
      r = l.body.getReader();
      let f = new TextDecoder(), h = [], u = "";
      ((_e = this.events) == null ? void 0 : _e.onMessageLoading) && this.events.onMessageLoading(true), this.addNewEmptyAssistantMessage();
      let p = this.messages.at(-1);
      for (; ; ) {
        let { value: m, done: I } = await r.read();
        if (I) break;
        u += f.decode(m, { stream: true });
        let q;
        for (; (q = u.indexOf(`

`)) !== -1; ) {
          let de = u.slice(0, q);
          u = u.slice(q + 2);
          try {
            let G = bt(de), g = JSON.parse(G.data);
            if (g.type === "sources") this.state[s].sources = g.message, ((_f = this.events) == null ? void 0 : _f.onSourceChange) && this.events.onSourceChange(g.message), ((_g = this.events) == null ? void 0 : _g.onStateChange) && this.events.onStateChange(this.state);
            else if (g.type === "query-translated") this.state[s].translatedQuery = g.message, ((_h = this.events) == null ? void 0 : _h.onQueryTranslated) && this.events.onQueryTranslated(g.message), ((_i = this.events) == null ? void 0 : _i.onStateChange) && this.events.onStateChange(this.state);
            else if (g.type === "conversation-metadata") {
              let { segment: he, trigger: fe } = g.message;
              he && (this.state[s].segment = he), fe && (this.state[s].trigger = fe), ((_j = this.events) == null ? void 0 : _j.onStateChange) && this.events.onStateChange(this.state);
            } else if (g.type === "related-queries") this.state[s].relatedQueries = g.message, ((_k = this.events) == null ? void 0 : _k.onRelatedQueries) && this.events.onRelatedQueries(g.message), ((_l = this.events) == null ? void 0 : _l.onStateChange) && this.events.onStateChange(this.state);
            else if (g.type === "text") for (h.push(g.message); h.length > 0; ) p.content += h.shift(), this.state[s].response = p.content, ((_m = this.events) == null ? void 0 : _m.onStateChange) && this.events.onStateChange(this.state), ((_n = this.events) == null ? void 0 : _n.onMessageChange) && this.events.onMessageChange(this.messages), yield p.content;
          } catch (G) {
            console.error("Error parsing SSE event:", G), console.error("Raw message:", de);
          }
        }
      }
    } catch (o) {
      if (o.name === "AbortError") this.state[s].aborted = true, ((_o = this.events) == null ? void 0 : _o.onAnswerAborted) && this.events.onAnswerAborted(true);
      else throw this.state[s].error = true, this.state[s].errorMessage = o.message ?? "Unknown error", o;
    } finally {
      r == null ? void 0 : r.releaseLock(), this.state[s].loading = false, ((_p = this.events) == null ? void 0 : _p.onStateChange) && this.events.onStateChange(this.state), ((_q = this.events) == null ? void 0 : _q.onInteractionDone) && this.events.onInteractionDone(this.state[s]), ((_r = this.events) == null ? void 0 : _r.onMessageLoading) && this.events.onMessageLoading(false);
    }
  }
  setSystemPromptConfiguration(e) {
    if (Array.isArray(e.systemPrompts)) {
      if (!e.systemPrompts.every((n) => typeof n == "string")) throw new Error("Invalid system prompt configuration");
      this.systemPrompts = e.systemPrompts;
    }
    return this;
  }
  getSystemPromptConfiguration() {
    return this.systemPrompts;
  }
};
var F = class {
  constructor(e) {
    __publicField(this, "cache");
    __publicField(this, "config");
    this.cache = /* @__PURE__ */ new Map(), this.config = e;
  }
  set(e, n) {
    this.cache.set(e, n);
  }
  get(e) {
    return this.cache.get(e);
  }
  has(e) {
    return this.cache.has(e);
  }
  delete(e) {
    return this.cache.delete(e);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
};
function O(t2, e) {
  if (typeof navigator < "u") {
    typeof navigator.sendBeacon < "u" && navigator.sendBeacon(t2, e);
    return;
  }
  fetch(t2, { method: "POST", body: e, headers: { "Content-Type": "application/json" } }).then(() => {
  }, (n) => console.log(n));
}
var W = class t {
  constructor(e, n) {
    __publicField(this, "data");
    __publicField(this, "params");
    __publicField(this, "config");
    __publicField(this, "profile");
    this.data = [], this.config = e, this.profile = n;
  }
  setParams(e) {
    this.params = e;
  }
  static create(e, n) {
    let r = new t(e, n);
    return r.start(), r;
  }
  add(e) {
    this.data.push({ rawSearchString: e.rawSearchString, query: e.query, resultsCount: e.resultsCount, roundTripTime: e.roundTripTime, searchedAt: e.searchedAt, userId: this.profile.getUserId(), identity: this.profile.getIdentity(), alias: this.profile.getAlias(), referer: typeof location < "u" ? location.toString() : void 0 }), this.params != null && this.data.length >= this.config.flushSize && this.flush();
  }
  flush() {
    var _a;
    if (this.params == null || this.data.length === 0) return;
    let e = this.data;
    this.data = [];
    let n = { source: "fe", deploymentID: this.params.deploymentID, index: this.params.index, oramaId: this.config.id, oramaVersion: gt.version, userAgent: typeof navigator < "u" ? navigator.userAgent : void 0, events: e };
    (_a = O(`${this.params.endpoint}?api-key=${this.config.api_key}`, JSON.stringify(n))) == null ? void 0 : _a.catch((r) => console.log(r));
  }
  start() {
    let e = setInterval(this.flush.bind(this), this.config.flushInterval);
    e.unref != null && e.unref();
  }
};
var V = class {
  constructor(e) {
    __publicField(this, "intervalId");
    this.params = e;
  }
  start() {
    this.stop(), this.intervalId = setInterval(this.beat.bind(this), this.params.frequency);
  }
  stop() {
    this.intervalId !== void 0 && clearInterval(this.intervalId);
  }
  beat() {
    var _a;
    (_a = O(this.params.endpoint)) == null ? void 0 : _a.catch((e) => console.log(e));
  }
};
var $ = Y(z(), 1);
var j = class {
  constructor({ endpoint: e, apiKey: n }) {
    __publicField(this, "endpoint");
    __publicField(this, "apiKey");
    __publicField(this, "userId");
    __publicField(this, "identity");
    __publicField(this, "userAlias");
    __publicField(this, "params");
    if (!e || !n) throw new Error("Endpoint and API Key are required to create a Profile");
    if (typeof e != "string" || typeof n != "string") throw new Error("Endpoint and API Key must be strings");
    if (typeof localStorage < "u") {
      let r = localStorage.getItem(ie);
      r ? this.userId = r : (this.userId = (0, $.createId)(), localStorage.setItem(ie, this.userId));
    } else this.userId = (0, $.createId)();
    this.endpoint = e, this.apiKey = n;
  }
  setParams(e) {
    let { protocol: n, host: r } = new URL(e.identifyUrl), s = `${n}//${r}/identify`;
    this.params = { identifyUrl: s, index: e.index };
  }
  getIdentity() {
    return this.identity;
  }
  getUserId() {
    return this.userId;
  }
  getAlias() {
    return this.userAlias;
  }
  async sendProfileData(e) {
    var _a;
    if (!this.params) throw new Error("Orama Profile is not initialized");
    let n = JSON.stringify({ ...e, visitorId: this.getUserId(), index: this.params.index });
    await O(`${(_a = this.params) == null ? void 0 : _a.identifyUrl}?api-key=${this.apiKey}`, n);
  }
  async identify(e, n) {
    if (typeof n != "string") throw new Error("Identity must be a string");
    await e, await this.sendProfileData({ entity: "identity", id: n }), this.identity = n;
  }
  async alias(e, n) {
    if (typeof n != "string") throw new Error("Identity must be a string");
    await e, await this.sendProfileData({ entity: "alias", id: n }), this.userAlias = n;
  }
  reset() {
    this.userId = (0, $.createId)(), this.identity = void 0, this.userAlias = void 0;
  }
};
function vn(t2) {
  return t2 !== void 0 && (t2 == null ? void 0 : t2.signal) !== void 0;
}
var It = class {
  constructor(e) {
    __publicField(this, "id", (0, Tt.createId)());
    __publicField(this, "api_key");
    __publicField(this, "endpoint");
    __publicField(this, "multiIndexSearch");
    __publicField(this, "mergeResults");
    __publicField(this, "multiIndexIndexes");
    __publicField(this, "answersApiBaseURL");
    __publicField(this, "collector");
    __publicField(this, "cache");
    __publicField(this, "profile");
    __publicField(this, "searchDebounceTimer");
    __publicField(this, "searchRequestCounter", 0);
    __publicField(this, "blockSearchTillAuth", false);
    __publicField(this, "heartbeat");
    __publicField(this, "initPromise");
    __publicField(this, "customerUserToken");
    __publicField(this, "searchToken");
    __publicField(this, "onAuthTokenExpired");
    __publicField(this, "expirationTimer");
    var _a, _b;
    if ("indexes" in e) {
      this.api_key = e.indexes[0].api_key, this.multiIndexIndexes = e.indexes;
      let n = new URL(e.indexes[0].endpoint).origin;
      if (e.indexes.some((r) => new URL(r.endpoint).origin !== n)) throw new Error("All indexes must have the same endpoint origin");
      this.endpoint = n + St, this.multiIndexSearch = true, this.mergeResults = e.mergeResults ?? true;
    } else this.api_key = e.api_key, this.endpoint = e.endpoint, this.multiIndexSearch = false, this.mergeResults = true;
    if (this.answersApiBaseURL = e.answersApiBaseURL, this.profile = new j({ endpoint: this.endpoint, apiKey: this.api_key }), e.telemetry !== false) {
      let n = { id: this.id, api_key: this.api_key, flushInterval: ((_a = e.telemetry) == null ? void 0 : _a.flushInterval) ?? 5e3, flushSize: ((_b = e.telemetry) == null ? void 0 : _b.flushSize) ?? 25 };
      this.collector = W.create(n, this.profile);
    }
    if (e.cache !== false) {
      let n = {};
      this.cache = new F(n);
    }
    this.init();
  }
  setAuthToken(e) {
    e === null ? (this.customerUserToken = void 0, this.searchToken = void 0) : (this.customerUserToken = e, this.searchToken = void 0), this.init();
  }
  setOnAuthTokenExpired(e) {
    this.onAuthTokenExpired = e;
  }
  addSearchResultsToCollector(e, n, r, s) {
    var _a, _b;
    if (this.collector) if (Array.isArray(e)) for (let o of e) this.collector.add({ rawSearchString: r.term, resultsCount: ((_a = o.hits) == null ? void 0 : _a.length) ?? 0, roundTripTime: n, query: r, cached: s, searchedAt: /* @__PURE__ */ new Date(), userId: this.profile.getUserId() });
    else this.collector.add({ rawSearchString: r.term, resultsCount: ((_b = e == null ? void 0 : e.hits) == null ? void 0 : _b.length) ?? 0, roundTripTime: n, query: r, cached: s, searchedAt: /* @__PURE__ */ new Date(), userId: this.profile.getUserId() });
  }
  async search(e, n) {
    var _a;
    if (await this.initPromise, this.blockSearchTillAuth) return console.warn("Search request blocked until user is authenticated"), null;
    let r = ++this.searchRequestCounter, s = `search-${JSON.stringify(e)}`, o = null, i, l = false, f = (n == null ? void 0 : n.fresh) !== true && ((_a = this.cache) == null ? void 0 : _a.has(s)), h = async () => {
      var _a2;
      try {
        let u = Date.now();
        this.multiIndexSearch ? o = await this.fetch("multi_search", "POST", { q: { ...e, mergeResults: this.mergeResults }, sst: this.searchToken, indexes: this.multiIndexIndexes }, n == null ? void 0 : n.abortController) : o = await this.fetch("search", "POST", { q: e, sst: this.searchToken }, n == null ? void 0 : n.abortController);
        let p = Date.now();
        i = p - u;
        let m = await oe(BigInt(p * 1e6 - u * 1e6));
        if (!Array.isArray(o)) o.elapsed = m;
        else for (let I of o) I.elapsed = m;
        (_a2 = this.cache) == null ? void 0 : _a2.set(s, o);
      } catch (u) {
        if (u.name !== "AbortError") throw console.error("Search request failed", u), u;
      }
      return this.addSearchResultsToCollector(o, i, e, l), o;
    };
    if (f && this.cache) i = 0, o = this.cache.get(s), l = true, this.addSearchResultsToCollector(o, i, e, l);
    else return (n == null ? void 0 : n.debounce) ? new Promise((u, p) => {
      clearTimeout(this.searchDebounceTimer), this.searchDebounceTimer = setTimeout(async () => {
        try {
          await h(), u(o);
        } catch (m) {
          m.name !== "AbortError" && (console.error("Search request failed", m), p(m));
        }
      }, (n == null ? void 0 : n.debounce) || 300), "unref" in this.searchDebounceTimer && this.searchDebounceTimer.unref();
    }) : h();
    return r === this.searchRequestCounter ? o : null;
  }
  async vectorSearch(e, n) {
    var _a, _b, _c;
    await this.initPromise;
    let r = `vectorSearch-${JSON.stringify(e)}`, s, o, i = false;
    if (((n == null ? void 0 : n.fresh) !== true && ((_a = this.cache) == null ? void 0 : _a.has(r))) === true && this.cache != null) s = 0, o = this.cache.get(r), i = true;
    else {
      let f = Date.now();
      o = await this.fetch("vector-search2", "POST", { q: e }, (n == null ? void 0 : n.abortSignal) ?? (n == null ? void 0 : n.abortController));
      let h = Date.now();
      o.elapsed = await oe(BigInt(h * 1e6 - f * 1e6)), s = h - f, (_b = this.cache) == null ? void 0 : _b.set(r, o);
    }
    return this.collector != null && this.collector.add({ rawSearchString: e.term, resultsCount: ((_c = o.hits) == null ? void 0 : _c.length) ?? 0, roundTripTime: s, query: e, cached: i, searchedAt: /* @__PURE__ */ new Date(), userId: this.profile.getUserId() }), o;
  }
  createAnswerSession(e) {
    return new H({ inferenceType: (e == null ? void 0 : e.inferenceType) || "documentation", initialMessages: (e == null ? void 0 : e.initialMessages) || [], oramaClient: this, events: e == null ? void 0 : e.events, userContext: e == null ? void 0 : e.userContext, systemPrompts: (e == null ? void 0 : e.systemPrompts) ?? [] });
  }
  startHeartBeat(e) {
    var _a;
    (_a = this.heartbeat) == null ? void 0 : _a.stop(), this.heartbeat = new V({ ...e, endpoint: `${this.endpoint}/health?api-key=${this.api_key}` }), this.heartbeat.start();
  }
  stopHeartBeat() {
    var _a;
    (_a = this.heartbeat) == null ? void 0 : _a.stop();
  }
  async getPop() {
    var _a;
    return ((_a = await this.initPromise) == null ? void 0 : _a.pop) ?? "";
  }
  init() {
    let e = ["init", "GET", void 0, void 0, { token: this.customerUserToken }];
    this.multiIndexSearch && (e = ["init_multi_search", "POST", { indexes: this.multiIndexIndexes }, void 0, { token: this.customerUserToken }]), this.initPromise = this.fetch(...e).then((n) => {
      var _a, _b;
      if ((_a = this.collector) == null ? void 0 : _a.setParams({ endpoint: n.collectUrl, deploymentID: n.deploymentID, index: n.index }), (_b = this.profile) == null ? void 0 : _b.setParams({ identifyUrl: n.collectUrl, index: n.index }), n.searchSession) {
        if ("required" in n.searchSession && n.searchSession.required === true) this.blockSearchTillAuth = true;
        else if ("token" in n.searchSession) {
          let r = n.searchSession.token;
          this.searchToken = r;
          let s = n.searchSession.maxAge;
          this.blockSearchTillAuth = false, this.expirationTimer && clearTimeout(this.expirationTimer), this.expirationTimer = setTimeout(() => {
            var _a2;
            this.searchToken === r && (this.searchToken = void 0, this.blockSearchTillAuth = true, (_a2 = this.onAuthTokenExpired) == null ? void 0 : _a2.call(this, r));
          }, s * 1e3), "unref" in this.expirationTimer && this.expirationTimer.unref();
        }
      }
      return n;
    }).catch((n) => (console.log(n), null));
  }
  async fetch(e, n, r, s, o) {
    let i = vn(s) ? s == null ? void 0 : s.signal : s;
    if ((i == null ? void 0 : i.aborted) === true) throw new Error("Request aborted");
    let l = { method: n, headers: { "Content-Type": "application/x-www-form-urlencoded" }, signal: i };
    if (n === "POST" && r !== void 0) {
      let u = r;
      u.version = mt, u.id = this.id, u.visitorId = this.profile.getUserId(), l.body = Object.entries(u).filter(([p, m]) => !!m).map(([p, m]) => `${p}=${encodeURIComponent(JSON.stringify(m))}`).join("&");
    }
    let f = new URL(`${this.endpoint}/${e}`);
    if (this.multiIndexSearch || f.searchParams.append("api-key", this.api_key), o) for (let [u, p] of Object.entries(o)) p && f.searchParams.append(u, p);
    let h = await fetch(f, l);
    if (!h.ok) {
      let u = new Error();
      throw u.httpResponse = h, u;
    }
    return await h.json();
  }
  getIdentity() {
    return this.profile.getIdentity();
  }
  getUserId() {
    return this.profile.getUserId();
  }
  getAlias() {
    return this.profile.getAlias();
  }
  async identify(e) {
    if (this.initPromise === void 0) throw new Error("OramaClient not initialized");
    await this.profile.identify(this.initPromise, e);
  }
  async alias(e) {
    if (this.initPromise === void 0) throw new Error("OramaClient not initialized");
    await this.profile.alias(this.initPromise, e);
  }
  reset() {
    this.profile.reset();
  }
};
var ue = "snapshot";
var J = "notify";
var wt = "deploy";
var xt = "has-data";
var At = "update-schema";
var Cn = "https://api.askorama.ai";
var Ot = `${Cn}/api/v1`;
var K = class {
  constructor(e) {
    __publicField(this, "manager");
    __publicField(this, "indexId", null);
    this.manager = e.manager, this.indexId = e.indexID, this.manager.setIndexID(e.indexID);
  }
  async empty() {
    return (await this.callIndexWebhook(ue, [])).success;
  }
  async snapshot(e) {
    return (await this.callIndexWebhook(ue, e)).success;
  }
  async insert(e) {
    return (await this.callIndexWebhook(J, { upsert: e })).success;
  }
  async update(e) {
    return (await this.callIndexWebhook(J, { upsert: e })).success;
  }
  async delete(e) {
    try {
      await this.callIndexWebhook(J, { remove: e });
    } catch (n) {
      return console.error(n), false;
    }
    return true;
  }
  async updateSchema(e) {
    try {
      await this.callIndexWebhook(At, e);
    } catch (n) {
      return console.error(n), false;
    }
    return true;
  }
  async deploy() {
    try {
      let e = await this.callIndexWebhook(wt);
    } catch (e) {
      return console.error(e), false;
    }
    return true;
  }
  async hasPendingOperations() {
    return (await this.callIndexWebhook(xt)).hasData;
  }
  checkIndexID() {
    if (!this.indexId) throw new Error("Index ID is not set");
  }
  callIndexWebhook(e, n) {
    return this.checkIndexID(), this.manager.callIndexWebhook(e, n);
  }
};
var Et = class {
  constructor(e) {
    __publicField(this, "indexId", null);
    __publicField(this, "apiKey");
    __publicField(this, "baseURL");
    this.apiKey = e.api_key, this.baseURL = (e == null ? void 0 : e.baseURL) || Ot;
  }
  index(e) {
    return new K({ manager: this, indexID: e });
  }
  setIndexID(e) {
    this.indexId = e;
  }
  async callIndexWebhook(e, n) {
    let r = { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` } };
    return n && (r.body = JSON.stringify(n)), (await fetch(`${this.baseURL}/webhooks/${this.indexId}/${e}`, r)).json();
  }
};
export {
  H as AnswerSession,
  Et as CloudManager,
  It as OramaClient
};
/*! Bundled license information:

@oramacloud/client/dist/index.js:
  (*! Bundled license information:
  
  @noble/hashes/utils.js:
    (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
  *)
*/
//# sourceMappingURL=@oramacloud_client.js.map
