import "./chunk-ADIIPX6Q.js";
import {
  copyToClipboard
} from "./chunk-HXUFFIHY.js";
import {
  TAnswerStatus,
  chatContext
} from "./chunk-EWDHTKD6.js";
import {
  O,
  Y,
  n,
  p$3,
  s,
  tt
} from "./chunk-OCFBAW7U.js";
import "./chunk-CNMOQ2TW.js";
import {
  Host,
  createEvent,
  getElement,
  h,
  registerInstance
} from "./chunk-6BI6LT3C.js";
import {
  __privateAdd,
  __privateMethod,
  __publicField
} from "./chunk-KT2WZD7D.js";

// node_modules/@orama/wc-components/dist/esm/orama-chat-assistent-message_6.entry.js
var c$1 = Object.defineProperty;
var f$1 = Object.getOwnPropertyDescriptor;
var o$2 = (a2, s3, p, H) => {
  for (var r = H > 1 ? void 0 : H ? f$1(s3, p) : s3, i = a2.length - 1, h2; i >= 0; i--)
    (h2 = a2[i]) && (r = (H ? h2(s3, p, r) : h2(r)) || r);
  return H && r && c$1(s3, p, r), r;
};
var t$2 = class extends n {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$2.weightsMap.get((a2 = this.weight) != null ? a2 : "regular")}
    </svg>`;
  }
};
t$2.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M216,36H88a4,4,0,0,0-4,4V84H40a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4H168a4,4,0,0,0,4-4V172h44a4,4,0,0,0,4-4V40A4,4,0,0,0,216,36ZM164,212H44V92H164Zm48-48H172V88a4,4,0,0,0-4-4H92V44H212Z"/>`
  ],
  [
    "light",
    tt`<path d="M216,34H88a6,6,0,0,0-6,6V82H40a6,6,0,0,0-6,6V216a6,6,0,0,0,6,6H168a6,6,0,0,0,6-6V174h42a6,6,0,0,0,6-6V40A6,6,0,0,0,216,34ZM162,210H46V94H162Zm48-48H174V88a6,6,0,0,0-6-6H94V46H210Z"/>`
  ],
  [
    "regular",
    tt`<path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/>`
  ],
  [
    "bold",
    tt`<path d="M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"/>`
  ],
  [
    "fill",
    tt`<path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,40V168H168V88H88V40Z" opacity="0.2"/><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/>`
  ]
]);
t$2.styles = p$3`
    :host {
      display: contents;
    }
  `;
o$2([
  O({ type: String, reflect: true })
], t$2.prototype, "size", 2);
o$2([
  O({ type: String, reflect: true })
], t$2.prototype, "weight", 2);
o$2([
  O({ type: String, reflect: true })
], t$2.prototype, "color", 2);
o$2([
  O({ type: Boolean, reflect: true })
], t$2.prototype, "mirrored", 2);
t$2 = o$2([
  s("ph-copy")
], t$2);
var f = Object.defineProperty;
var w = Object.getOwnPropertyDescriptor;
var o$1 = (e, s3, i, h2) => {
  for (var t2 = h2 > 1 ? void 0 : h2 ? w(s3, i) : s3, p = e.length - 1, n2; p >= 0; p--)
    (n2 = e[p]) && (t2 = (h2 ? n2(s3, i, t2) : n2(t2)) || t2);
  return h2 && t2 && f(s3, i, t2), t2;
};
var a$1 = class extends n {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a$1.weightsMap.get((e = this.weight) != null ? e : "regular")}
    </svg>`;
  }
};
a$1.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M220,48V96a4,4,0,0,1-4,4H168a4,4,0,0,1,0-8h38.34L184.89,70.54A84,84,0,0,0,66.8,69.85a4,4,0,1,1-5.6-5.72,92,92,0,0,1,129.34.76L212,86.34V48a4,4,0,0,1,8,0ZM189.2,186.15a83.44,83.44,0,0,1-58.68,23.91h-.47a83.52,83.52,0,0,1-58.94-24.6L49.66,164H88a4,4,0,0,0,0-8H40a4,4,0,0,0-4,4v48a4,4,0,0,0,8,0V169.66l21.46,21.45A91.43,91.43,0,0,0,130,218.06h.51a91.45,91.45,0,0,0,64.28-26.19,4,4,0,1,0-5.6-5.72Z"/>`
  ],
  [
    "light",
    tt`<path d="M222,48V96a6,6,0,0,1-6,6H168a6,6,0,0,1,0-12h33.52L183.47,72a81.51,81.51,0,0,0-57.53-24h-.46A81.5,81.5,0,0,0,68.19,71.28a6,6,0,1,1-8.38-8.58,93.38,93.38,0,0,1,65.67-26.76H126a93.45,93.45,0,0,1,66,27.53l18,18V48a6,6,0,0,1,12,0ZM187.81,184.72a81.5,81.5,0,0,1-57.29,23.34h-.46a81.51,81.51,0,0,1-57.53-24L54.48,166H88a6,6,0,0,0,0-12H40a6,6,0,0,0-6,6v48a6,6,0,0,0,12,0V174.48l18,18.05a93.45,93.45,0,0,0,66,27.53h.52a93.38,93.38,0,0,0,65.67-26.76,6,6,0,1,0-8.38-8.58Z"/>`
  ],
  [
    "regular",
    tt`<path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"/>`
  ],
  [
    "bold",
    tt`<path d="M228,48V96a12,12,0,0,1-12,12H168a12,12,0,0,1,0-24h19l-7.8-7.8a75.55,75.55,0,0,0-53.32-22.26h-.43A75.49,75.49,0,0,0,72.39,75.57,12,12,0,1,1,55.61,58.41a99.38,99.38,0,0,1,69.87-28.47H126A99.42,99.42,0,0,1,196.2,59.23L204,67V48a12,12,0,0,1,24,0ZM183.61,180.43a75.49,75.49,0,0,1-53.09,21.63h-.43A75.55,75.55,0,0,1,76.77,179.8L69,172H88a12,12,0,0,0,0-24H40a12,12,0,0,0-12,12v48a12,12,0,0,0,24,0V189l7.8,7.8A99.42,99.42,0,0,0,130,226.06h.56a99.38,99.38,0,0,0,69.87-28.47,12,12,0,0,0-16.78-17.16Z"/>`
  ],
  [
    "fill",
    tt`<path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L180.65,72a79.48,79.48,0,0,0-54.72-22.09h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27,96,96,0,0,1,192,60.7l18.36-18.36A8,8,0,0,1,224,48ZM186.41,183.29A80,80,0,0,1,75.35,184l18.31-18.31A8,8,0,0,0,88,152H40a8,8,0,0,0-8,8v48a8,8,0,0,0,13.66,5.66L64,195.3a95.42,95.42,0,0,0,66,26.76h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"/><path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"/>`
  ]
]);
a$1.styles = p$3`
    :host {
      display: contents;
    }
  `;
o$1([
  O({ type: String, reflect: true })
], a$1.prototype, "size", 2);
o$1([
  O({ type: String, reflect: true })
], a$1.prototype, "weight", 2);
o$1([
  O({ type: String, reflect: true })
], a$1.prototype, "color", 2);
o$1([
  O({ type: Boolean, reflect: true })
], a$1.prototype, "mirrored", 2);
a$1 = o$1([
  s("ph-arrows-clockwise")
], a$1);
var g = Object.defineProperty;
var u$1 = Object.getOwnPropertyDescriptor;
var l = (e, o2, p, s3) => {
  for (var a2 = s3 > 1 ? void 0 : s3 ? u$1(o2, p) : o2, h2 = e.length - 1, H; h2 >= 0; h2--)
    (H = e[h2]) && (a2 = (s3 ? H(o2, p, a2) : H(a2)) || a2);
  return s3 && a2 && g(o2, p, a2), a2;
};
var t$1 = class extends n {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$1.weightsMap.get((e = this.weight) != null ? e : "regular")}
    </svg>`;
  }
};
t$1.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M235.85,157.52l-12-96A20,20,0,0,0,204,44H32A12,12,0,0,0,20,56v88a12,12,0,0,0,12,12H77.53l38.89,77.79A4,4,0,0,0,120,236a36,36,0,0,0,36-36V180h60a20,20,0,0,0,19.85-22.48ZM76,148H32a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H76Zm149,19.94a12,12,0,0,1-9,4.06H152a4,4,0,0,0-4,4v24a28,28,0,0,1-25.58,27.9L84,151.06V52H204a12,12,0,0,1,11.91,10.51l12,96A12,12,0,0,1,225,167.94Z"/>`
  ],
  [
    "light",
    tt`<path d="M237.83,157.27l-12-96A22,22,0,0,0,204,42H32A14,14,0,0,0,18,56v88a14,14,0,0,0,14,14H76.29l38.34,76.68A6,6,0,0,0,120,238a38,38,0,0,0,38-38V182h58a22,22,0,0,0,21.83-24.73ZM74,146H32a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H74Zm149.5,20.62A9.89,9.89,0,0,1,216,170H152a6,6,0,0,0-6,6v24a26,26,0,0,1-22.42,25.75L86,150.58V54H204a10,10,0,0,1,9.92,8.76l12,96A9.89,9.89,0,0,1,223.5,166.62Z"/>`
  ],
  [
    "regular",
    tt`<path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"/>`
  ],
  [
    "bold",
    tt`<path d="M243.78,156.53l-12-96A28,28,0,0,0,204,36H32A20,20,0,0,0,12,56v88a20,20,0,0,0,20,20H72.58l36.69,73.37A12,12,0,0,0,120,244a44.05,44.05,0,0,0,44-44V188h52a28,28,0,0,0,27.78-31.47ZM68,140H36V60H68Zm151,22.65a4,4,0,0,1-3,1.35H152a12,12,0,0,0-12,12v24a20,20,0,0,1-13.18,18.8L92,149.17V60H204a4,4,0,0,1,4,3.5l12,96A4,4,0,0,1,219,162.65Z"/>`
  ],
  [
    "fill",
    tt`<path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M80,48V152H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" opacity="0.2"/><path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"/>`
  ]
]);
t$1.styles = p$3`
    :host {
      display: contents;
    }
  `;
l([
  O({ type: String, reflect: true })
], t$1.prototype, "size", 2);
l([
  O({ type: String, reflect: true })
], t$1.prototype, "weight", 2);
l([
  O({ type: String, reflect: true })
], t$1.prototype, "color", 2);
l([
  O({ type: Boolean, reflect: true })
], t$1.prototype, "mirrored", 2);
t$1 = l([
  s("ph-thumbs-down")
], t$1);
var M = Object.defineProperty;
var c = Object.getOwnPropertyDescriptor;
var o = (e, s3, p, h2) => {
  for (var t2 = h2 > 1 ? void 0 : h2 ? c(s3, p) : s3, l2 = e.length - 1, m; l2 >= 0; l2--)
    (m = e[l2]) && (t2 = (h2 ? m(s3, p, t2) : m(t2)) || t2);
  return h2 && t2 && M(s3, p, t2), t2;
};
var a = class extends n {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var e;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a.weightsMap.get((e = this.weight) != null ? e : "regular")}
    </svg>`;
  }
};
a.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M233.34,190.09,145.88,38.22h0a20.75,20.75,0,0,0-35.76,0L22.66,190.09a19.52,19.52,0,0,0,0,19.71A20.36,20.36,0,0,0,40.54,220H215.46a20.36,20.36,0,0,0,17.86-10.2A19.52,19.52,0,0,0,233.34,190.09ZM226.4,205.8a12.47,12.47,0,0,1-10.94,6.2H40.54a12.47,12.47,0,0,1-10.94-6.2,11.45,11.45,0,0,1,0-11.72L117.05,42.21a12.76,12.76,0,0,1,21.9,0L226.4,194.08A11.45,11.45,0,0,1,226.4,205.8ZM124,144V104a4,4,0,0,1,8,0v40a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,180Z"/>`
  ],
  [
    "light",
    tt`<path d="M235.07,189.09,147.61,37.22h0a22.75,22.75,0,0,0-39.22,0L20.93,189.09a21.53,21.53,0,0,0,0,21.72A22.35,22.35,0,0,0,40.55,222h174.9a22.35,22.35,0,0,0,19.6-11.19A21.53,21.53,0,0,0,235.07,189.09ZM224.66,204.8a10.46,10.46,0,0,1-9.21,5.2H40.55a10.46,10.46,0,0,1-9.21-5.2,9.51,9.51,0,0,1,0-9.72L118.79,43.21a10.75,10.75,0,0,1,18.42,0l87.46,151.87A9.51,9.51,0,0,1,224.66,204.8ZM122,144V104a6,6,0,0,1,12,0v40a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,180Z"/>`
  ],
  [
    "regular",
    tt`<path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"/>`
  ],
  [
    "bold",
    tt`<path d="M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z"/>`
  ],
  [
    "fill",
    tt`<path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22c6.3-11,22.52-11,28.82,0l87.46,151.87C236,202.79,228.08,216,215.46,216Z" opacity="0.2"/><path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"/>`
  ]
]);
a.styles = p$3`
    :host {
      display: contents;
    }
  `;
o([
  O({ type: String, reflect: true })
], a.prototype, "size", 2);
o([
  O({ type: String, reflect: true })
], a.prototype, "weight", 2);
o([
  O({ type: String, reflect: true })
], a.prototype, "color", 2);
o([
  O({ type: Boolean, reflect: true })
], a.prototype, "mirrored", 2);
a = o([
  s("ph-warning")
], a);
var oramaChatAssistentMessageCss = ".sc-orama-chat-assistent-message-h{color:#838289;color:var(--text-color-secondary,#838289);display:block}.message-wrapper.sc-orama-chat-assistent-message{padding:.75rem;padding:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)))}.message-error.sc-orama-chat-assistent-message,.message-wrapper.sc-orama-chat-assistent-message{background:#fff;background:var(--background-color-secondary,#fff);border-radius:.75rem;border-radius:var(--radius-m,calc(12rem/var(--orama-base-font-size, 16)));margin:0 1rem;margin:0 var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}.message-error.sc-orama-chat-assistent-message{padding:1rem .5rem;padding:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16))) var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));text-align:center}.message-error.sc-orama-chat-assistent-message ph-warning.sc-orama-chat-assistent-message{color:#99989d;color:var(--text-color-inactive,#99989d);display:block}.message-actions.sc-orama-chat-assistent-message{display:flex;gap:.5rem;gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));justify-content:end;margin-top:.75rem;margin-top:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));transition:opacity .2s ease-in-out}.hidden.sc-orama-chat-assistent-message{opacity:0;pointer-events:none}.sr-only.sc-orama-chat-assistent-message{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}@keyframes rotate360{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}";
var OramaChatAssistentMessageStyle0 = oramaChatAssistentMessageCss;
var OramaChatAssistentMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.handleCopyToClipboard = () => {
      this.isCopied = true;
      setTimeout(() => this.isCopied = false, 1e3);
      copyToClipboard(this.interaction.response);
    };
    this.handleDislikeMessage = () => {
      this.isDisliked = !this.isDisliked;
    };
    this.handleRetryMessage = () => {
      var _a;
      (_a = chatContext.chatService) === null || _a === void 0 ? void 0 : _a.regenerateLatest();
    };
    this.interaction = void 0;
    this.chatMarkdownLinkTitle = void 0;
    this.chatMarkdownLinkHref = void 0;
    this.chatMarkdownLinkTarget = void 0;
    this.isCopied = false;
    this.isDisliked = false;
  }
  render() {
    if (this.interaction.status === "loading") {
      return h("div", { class: "message-wrapper" }, h("orama-dots-loader", null));
    }
    if (this.interaction.status === "error") {
      return h("div", { class: "message-error" }, h("ph-warning", { size: 16 }), h("orama-text", { styledAs: "span", inactive: true }, "An error occurred while trying to search. Please try again."));
    }
    return h(Host, null, h("orama-sources", { sources: this.interaction.sources, sourceBaseURL: chatContext.sourceBaseURL, sourcesMap: chatContext.sourcesMap, linksRel: chatContext.linksRel, linksTarget: chatContext.linksTarget }), h("div", { class: "message-wrapper" }, !this.interaction.response ? h("orama-dots-loader", null) : h("orama-markdown", { content: this.interaction.response, chatMarkdownLinkTitle: this.chatMarkdownLinkTitle, chatMarkdownLinkHref: this.chatMarkdownLinkHref }), h("div", { class: { "message-actions": true, hidden: this.interaction.status !== TAnswerStatus.done } }, this.interaction.latest && h("orama-button", { type: "button", variant: "icon", onClick: this.handleRetryMessage, onKeyDown: this.handleRetryMessage, "aria-label": "Retry message" }, h("ph-arrows-clockwise", { size: "16px" })), h("orama-button", { type: "button", variant: "icon", onClick: this.handleCopyToClipboard, onKeyDown: this.handleCopyToClipboard, withTooltip: this.isCopied ? "Copied!" : void 0, "aria-label": "Copy message" }, h("ph-copy", { size: "16px" })), h("orama-button", { type: "button", variant: "icon", onClick: this.handleDislikeMessage, onKeyDown: this.handleDislikeMessage, "aria-label": "Dislike message" }, this.isDisliked ? h("ph-thumbs-down", { weight: "fill", size: "16px" }) : h("ph-thumbs-down", { size: "16px" })))));
  }
};
OramaChatAssistentMessage.style = OramaChatAssistentMessageStyle0;
var oramaChatUserMessageCss = ".sc-orama-chat-user-message-h{color:#151515;color:var(--text-color-primary,#151515);display:flex;justify-content:end;padding:0 1rem;padding:0 var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}@media (min-width:768.02px){.sc-orama-chat-user-message-h{justify-content:start}}.message-wrapper.sc-orama-chat-user-message{border-radius:.5rem;border-radius:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16)));padding:.5rem .75rem;padding:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16))) var(--radius-m,calc(12rem/var(--orama-base-font-size, 16)))}.chat-question.sc-orama-chat-user-message{font-weight:400}@media (min-width:768.02px){.chat-question.sc-orama-chat-user-message{font-size:1.25rem;font-size:calc(20rem/var(--orama-base-font-size, 16));margin-bottom:1rem;margin-bottom:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}}";
var OramaChatUserMessageStyle0 = oramaChatUserMessageCss;
var OramaChatUserMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.interaction = void 0;
  }
  render() {
    return h(Host, { key: "1f885dd4030e1e37fda0c03680bcc0073320519f" }, h("div", { key: "e906a9d55653d6d03b0d5e501e78ea09831c5895", class: "message-wrapper" }, h("orama-text", { key: "787d316b9f8e924c9d9af28388e281c7b1bc37d0", as: "h2", styledAs: "p", class: "chat-question" }, this.interaction.query)));
  }
};
OramaChatUserMessage.style = OramaChatUserMessageStyle0;
var oramaDotsLoaderCss = ".dots-loader.sc-orama-dots-loader{align-items:center;display:inline-flex;justify-content:center;padding:1rem 0;padding:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16))) 0}.dot.sc-orama-dots-loader{animation:dot-slide-up 1.4s infinite both;background-color:#151515;background-color:var(--text-color-primary,#151515);border-radius:50%;height:.25rem;height:calc(4rem/var(--orama-base-font-size, 16));margin:0 .125rem;margin:0 var(--spacing-2xs,calc(2rem/var(--orama-base-font-size, 16)));width:.25rem;width:calc(4rem/var(--orama-base-font-size, 16))}.dot.sc-orama-dots-loader:first-child{animation-delay:-.32s}.dot.sc-orama-dots-loader:nth-child(2){animation-delay:-.16s}@keyframes dot-slide-up{0%,80%,to{opacity:.3;transform:translateZ(0)}40%{opacity:1;transform:translate3d(0,-4px,0)}}";
var OramaDotsLoaderStyle0 = oramaDotsLoaderCss;
var DotsLoader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h("div", { key: "6d3430e0280b1be0beb88269392f197f47ab2da8", class: "dots-loader" }, h("div", { key: "04dc19f9e9b72ccd84257520cbec92e0e88bb2d1", class: "dot" }), h("div", { key: "963c3512e71449f735a5ee9cb92d98a09030f458", class: "dot" }), h("div", { key: "02bc9579179d5e0341d077f77a1d9a893cde9bed", class: "dot" }));
  }
};
DotsLoader.style = OramaDotsLoaderStyle0;
var SUPPORTED_HLJS_LANGUAGES_ARRAY = [
  "1c",
  "abnf",
  "accesslog",
  "ada",
  "arduino",
  "ino",
  "armasm",
  "arm",
  "avrasm",
  "actionscript",
  "as",
  "angelscript",
  "asc",
  "apache",
  "apacheconf",
  "applescript",
  "osascript",
  "arcade",
  "asciidoc",
  "adoc",
  "aspectj",
  "autohotkey",
  "autoit",
  "awk",
  "mawk",
  "nawk",
  "gawk",
  "bash",
  "sh",
  "zsh",
  "basic",
  "bnf",
  "brainfuck",
  "bf",
  "csharp",
  "cs",
  "c",
  "h",
  "cpp",
  "hpp",
  "cc",
  "hh",
  "c++",
  "h++",
  "cxx",
  "hxx",
  "cal",
  "cos",
  "cls",
  "cmake",
  "cmake.in",
  "coq",
  "csp",
  "css",
  "capnproto",
  "capnp",
  "clojure",
  "clj",
  "coffeescript",
  "coffee",
  "cson",
  "iced",
  "crmsh",
  "crm",
  "pcmk",
  "crystal",
  "cr",
  "d",
  "dart",
  "dpr",
  "dfm",
  "pas",
  "pascal",
  "diff",
  "patch",
  "django",
  "jinja",
  "dns",
  "zone",
  "bind",
  "dockerfile",
  "docker",
  "dos",
  "bat",
  "cmd",
  "dsconfig",
  "dts",
  "dust",
  "dst",
  "ebnf",
  "elixir",
  "elm",
  "erlang",
  "erl",
  "excel",
  "xls",
  "xlsx",
  "fsharp",
  "fs",
  "fsx",
  "fsi",
  "fsscript",
  "fix",
  "fortran",
  "f90",
  "f95",
  "gcode",
  "nc",
  "gams",
  "gms",
  "gauss",
  "gss",
  "gherkin",
  "go",
  "golang",
  "golo",
  "gololang",
  "gradle",
  "graphql",
  "gql",
  "groovy",
  "xml",
  "html",
  "xhtml",
  "rss",
  "atom",
  "xjb",
  "xsd",
  "xsl",
  "plist",
  "svg",
  "http",
  "https",
  "haml",
  "handlebars",
  "hbs",
  "html.hbs",
  "html.handlebars",
  "haskell",
  "hs",
  "haxe",
  "hx",
  "hy",
  "hylang",
  "ini",
  "toml",
  "inform7",
  "i7",
  "irpf90",
  "json",
  "jsonc",
  "java",
  "jsp",
  "javascript",
  "js",
  "jsx",
  "julia",
  "jl",
  "julia-repl",
  "kotlin",
  "kt",
  "tex",
  "leaf",
  "lasso",
  "ls",
  "lassoscript",
  "less",
  "ldif",
  "lisp",
  "livecodeserver",
  "livescript",
  "ls",
  "lua",
  "makefile",
  "mk",
  "mak",
  "make",
  "markdown",
  "md",
  "mkdown",
  "mkd",
  "mathematica",
  "mma",
  "wl",
  "matlab",
  "maxima",
  "mel",
  "mercury",
  "mips",
  "mipsasm",
  "mizar",
  "mojolicious",
  "monkey",
  "moonscript",
  "moon",
  "n1ql",
  "nsis",
  "nginx",
  "nginxconf",
  "nim",
  "nimrod",
  "nix",
  "ocaml",
  "ml",
  "objectivec",
  "mm",
  "objc",
  "obj-c",
  "obj-c++",
  "objective-c++",
  "glsl",
  "openscad",
  "scad",
  "ruleslanguage",
  "oxygene",
  "pf",
  "pf.conf",
  "php",
  "parser3",
  "perl",
  "pl",
  "pm",
  "plaintext",
  "txt",
  "text",
  "pony",
  "pgsql",
  "postgres",
  "postgresql",
  "powershell",
  "ps",
  "ps1",
  "processing",
  "prolog",
  "properties",
  "proto",
  "protobuf",
  "puppet",
  "pp",
  "python",
  "py",
  "gyp",
  "profile",
  "python-repl",
  "pycon",
  "k",
  "kdb",
  "qml",
  "r",
  "reasonml",
  "re",
  "rib",
  "rsl",
  "graph",
  "instances",
  "ruby",
  "rb",
  "gemspec",
  "podspec",
  "thor",
  "irb",
  "rust",
  "rs",
  "SAS",
  "sas",
  "scss",
  "sql",
  "p21",
  "step",
  "stp",
  "scala",
  "scheme",
  "scilab",
  "sci",
  "shell",
  "console",
  "smali",
  "smalltalk",
  "st",
  "sml",
  "ml",
  "stan",
  "stanfuncs",
  "stata",
  "stylus",
  "styl",
  "subunit",
  "swift",
  "tcl",
  "tk",
  "tap",
  "thrift",
  "tp",
  "twig",
  "craftcms",
  "typescript",
  "ts",
  "tsx",
  "mts",
  "cts",
  "vbnet",
  "vb",
  "vbscript",
  "vbs",
  "vhdl",
  "vala",
  "verilog",
  "v",
  "vim",
  "axapta",
  "x++",
  "x86asm",
  "xl",
  "tao",
  "xquery",
  "xpath",
  "xq",
  "xqm",
  "yml",
  "yaml",
  "zephir",
  "zep"
];
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var purify = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    const {
      entries,
      setPrototypeOf,
      isFrozen,
      getPrototypeOf,
      getOwnPropertyDescriptor
    } = Object;
    let {
      freeze,
      seal,
      create
    } = Object;
    let {
      apply,
      construct
    } = typeof Reflect !== "undefined" && Reflect;
    if (!freeze) {
      freeze = function freeze2(x) {
        return x;
      };
    }
    if (!seal) {
      seal = function seal2(x) {
        return x;
      };
    }
    if (!apply) {
      apply = function apply2(fun, thisValue, args) {
        return fun.apply(thisValue, args);
      };
    }
    if (!construct) {
      construct = function construct2(Func, args) {
        return new Func(...args);
      };
    }
    const arrayForEach = unapply(Array.prototype.forEach);
    const arrayPop = unapply(Array.prototype.pop);
    const arrayPush = unapply(Array.prototype.push);
    const stringToLowerCase = unapply(String.prototype.toLowerCase);
    const stringToString = unapply(String.prototype.toString);
    const stringMatch = unapply(String.prototype.match);
    const stringReplace = unapply(String.prototype.replace);
    const stringIndexOf = unapply(String.prototype.indexOf);
    const stringTrim = unapply(String.prototype.trim);
    const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
    const regExpTest = unapply(RegExp.prototype.test);
    const typeErrorCreate = unconstruct(TypeError);
    function unapply(func) {
      return function(thisArg) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return apply(func, thisArg, args);
      };
    }
    function unconstruct(func) {
      return function() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return construct(func, args);
      };
    }
    function addToSet(set, array) {
      let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
      if (setPrototypeOf) {
        setPrototypeOf(set, null);
      }
      let l2 = array.length;
      while (l2--) {
        let element = array[l2];
        if (typeof element === "string") {
          const lcElement = transformCaseFunc(element);
          if (lcElement !== element) {
            if (!isFrozen(array)) {
              array[l2] = lcElement;
            }
            element = lcElement;
          }
        }
        set[element] = true;
      }
      return set;
    }
    function cleanArray(array) {
      for (let index = 0; index < array.length; index++) {
        const isPropertyExist = objectHasOwnProperty(array, index);
        if (!isPropertyExist) {
          array[index] = null;
        }
      }
      return array;
    }
    function clone(object) {
      const newObject = create(null);
      for (const [property, value] of entries(object)) {
        const isPropertyExist = objectHasOwnProperty(object, property);
        if (isPropertyExist) {
          if (Array.isArray(value)) {
            newObject[property] = cleanArray(value);
          } else if (value && typeof value === "object" && value.constructor === Object) {
            newObject[property] = clone(value);
          } else {
            newObject[property] = value;
          }
        }
      }
      return newObject;
    }
    function lookupGetter(object, prop) {
      while (object !== null) {
        const desc = getOwnPropertyDescriptor(object, prop);
        if (desc) {
          if (desc.get) {
            return unapply(desc.get);
          }
          if (typeof desc.value === "function") {
            return unapply(desc.value);
          }
        }
        object = getPrototypeOf(object);
      }
      function fallbackValue() {
        return null;
      }
      return fallbackValue;
    }
    const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
    const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
    const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
    const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
    const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
    const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
    const text = freeze(["#text"]);
    const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
    const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
    const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
    const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
    const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
    const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
    const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
    const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
    const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
    const IS_ALLOWED_URI = seal(
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
      // eslint-disable-line no-useless-escape
    );
    const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
    const ATTR_WHITESPACE = seal(
      /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
      // eslint-disable-line no-control-regex
    );
    const DOCTYPE_NAME = seal(/^html$/i);
    const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
    var EXPRESSIONS = Object.freeze({
      __proto__: null,
      MUSTACHE_EXPR,
      ERB_EXPR,
      TMPLIT_EXPR,
      DATA_ATTR,
      ARIA_ATTR,
      IS_ALLOWED_URI,
      IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE,
      DOCTYPE_NAME,
      CUSTOM_ELEMENT
    });
    const NODE_TYPE = {
      element: 1,
      attribute: 2,
      text: 3,
      cdataSection: 4,
      entityReference: 5,
      // Deprecated
      entityNode: 6,
      // Deprecated
      progressingInstruction: 7,
      comment: 8,
      document: 9,
      documentType: 10,
      documentFragment: 11,
      notation: 12
      // Deprecated
    };
    const getGlobal = function getGlobal2() {
      return typeof window === "undefined" ? null : window;
    };
    const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
      if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
        return null;
      }
      let suffix = null;
      const ATTR_NAME = "data-tt-policy-suffix";
      if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
        suffix = purifyHostElement.getAttribute(ATTR_NAME);
      }
      const policyName = "dompurify" + (suffix ? "#" + suffix : "");
      try {
        return trustedTypes.createPolicy(policyName, {
          createHTML(html2) {
            return html2;
          },
          createScriptURL(scriptUrl) {
            return scriptUrl;
          }
        });
      } catch (_) {
        console.warn("TrustedTypes policy " + policyName + " could not be created.");
        return null;
      }
    };
    function createDOMPurify() {
      let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
      const DOMPurify2 = (root) => createDOMPurify(root);
      DOMPurify2.version = "3.1.6";
      DOMPurify2.removed = [];
      if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document) {
        DOMPurify2.isSupported = false;
        return DOMPurify2;
      }
      let {
        document: document2
      } = window2;
      const originalDocument = document2;
      const currentScript = originalDocument.currentScript;
      const {
        DocumentFragment,
        HTMLTemplateElement,
        Node,
        Element,
        NodeFilter,
        NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
        HTMLFormElement,
        DOMParser,
        trustedTypes
      } = window2;
      const ElementPrototype = Element.prototype;
      const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
      const remove = lookupGetter(ElementPrototype, "remove");
      const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
      const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
      const getParentNode = lookupGetter(ElementPrototype, "parentNode");
      if (typeof HTMLTemplateElement === "function") {
        const template = document2.createElement("template");
        if (template.content && template.content.ownerDocument) {
          document2 = template.content.ownerDocument;
        }
      }
      let trustedTypesPolicy;
      let emptyHTML = "";
      const {
        implementation,
        createNodeIterator,
        createDocumentFragment,
        getElementsByTagName
      } = document2;
      const {
        importNode
      } = originalDocument;
      let hooks = {};
      DOMPurify2.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
      const {
        MUSTACHE_EXPR: MUSTACHE_EXPR2,
        ERB_EXPR: ERB_EXPR2,
        TMPLIT_EXPR: TMPLIT_EXPR2,
        DATA_ATTR: DATA_ATTR2,
        ARIA_ATTR: ARIA_ATTR2,
        IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
        ATTR_WHITESPACE: ATTR_WHITESPACE2,
        CUSTOM_ELEMENT: CUSTOM_ELEMENT2
      } = EXPRESSIONS;
      let {
        IS_ALLOWED_URI: IS_ALLOWED_URI$1
      } = EXPRESSIONS;
      let ALLOWED_TAGS = null;
      const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
      let ALLOWED_ATTR = null;
      const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
      let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
        tagNameCheck: {
          writable: true,
          configurable: false,
          enumerable: true,
          value: null
        },
        attributeNameCheck: {
          writable: true,
          configurable: false,
          enumerable: true,
          value: null
        },
        allowCustomizedBuiltInElements: {
          writable: true,
          configurable: false,
          enumerable: true,
          value: false
        }
      }));
      let FORBID_TAGS = null;
      let FORBID_ATTR = null;
      let ALLOW_ARIA_ATTR = true;
      let ALLOW_DATA_ATTR = true;
      let ALLOW_UNKNOWN_PROTOCOLS = false;
      let ALLOW_SELF_CLOSE_IN_ATTR = true;
      let SAFE_FOR_TEMPLATES = false;
      let SAFE_FOR_XML = true;
      let WHOLE_DOCUMENT = false;
      let SET_CONFIG = false;
      let FORCE_BODY = false;
      let RETURN_DOM = false;
      let RETURN_DOM_FRAGMENT = false;
      let RETURN_TRUSTED_TYPE = false;
      let SANITIZE_DOM = true;
      let SANITIZE_NAMED_PROPS = false;
      const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
      let KEEP_CONTENT = true;
      let IN_PLACE = false;
      let USE_PROFILES = {};
      let FORBID_CONTENTS = null;
      const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
      let DATA_URI_TAGS = null;
      const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
      let URI_SAFE_ATTRIBUTES = null;
      const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
      const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
      const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
      const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
      let NAMESPACE = HTML_NAMESPACE;
      let IS_EMPTY_INPUT = false;
      let ALLOWED_NAMESPACES = null;
      const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
      let PARSER_MEDIA_TYPE = null;
      const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
      const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
      let transformCaseFunc = null;
      let CONFIG = null;
      const formElement = document2.createElement("form");
      const isRegexOrFunction = function isRegexOrFunction2(testValue) {
        return testValue instanceof RegExp || testValue instanceof Function;
      };
      const _parseConfig = function _parseConfig2() {
        let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (CONFIG && CONFIG === cfg) {
          return;
        }
        if (!cfg || typeof cfg !== "object") {
          cfg = {};
        }
        cfg = clone(cfg);
        PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
        SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
        transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
        ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
        ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
        ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
        URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(
          clone(DEFAULT_URI_SAFE_ATTRIBUTES),
          // eslint-disable-line indent
          cfg.ADD_URI_SAFE_ATTR,
          // eslint-disable-line indent
          transformCaseFunc
          // eslint-disable-line indent
        ) : DEFAULT_URI_SAFE_ATTRIBUTES;
        DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(
          clone(DEFAULT_DATA_URI_TAGS),
          // eslint-disable-line indent
          cfg.ADD_DATA_URI_TAGS,
          // eslint-disable-line indent
          transformCaseFunc
          // eslint-disable-line indent
        ) : DEFAULT_DATA_URI_TAGS;
        FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
        FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
        FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
        USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
        ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
        ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
        ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
        ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
        SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
        SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
        WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
        RETURN_DOM = cfg.RETURN_DOM || false;
        RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
        RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
        FORCE_BODY = cfg.FORCE_BODY || false;
        SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
        SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
        KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
        IN_PLACE = cfg.IN_PLACE || false;
        IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
        NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
        CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
        if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
          CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
        }
        if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
          CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
        }
        if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
          CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
        }
        if (SAFE_FOR_TEMPLATES) {
          ALLOW_DATA_ATTR = false;
        }
        if (RETURN_DOM_FRAGMENT) {
          RETURN_DOM = true;
        }
        if (USE_PROFILES) {
          ALLOWED_TAGS = addToSet({}, text);
          ALLOWED_ATTR = [];
          if (USE_PROFILES.html === true) {
            addToSet(ALLOWED_TAGS, html$1);
            addToSet(ALLOWED_ATTR, html);
          }
          if (USE_PROFILES.svg === true) {
            addToSet(ALLOWED_TAGS, svg$1);
            addToSet(ALLOWED_ATTR, svg);
            addToSet(ALLOWED_ATTR, xml);
          }
          if (USE_PROFILES.svgFilters === true) {
            addToSet(ALLOWED_TAGS, svgFilters);
            addToSet(ALLOWED_ATTR, svg);
            addToSet(ALLOWED_ATTR, xml);
          }
          if (USE_PROFILES.mathMl === true) {
            addToSet(ALLOWED_TAGS, mathMl$1);
            addToSet(ALLOWED_ATTR, mathMl);
            addToSet(ALLOWED_ATTR, xml);
          }
        }
        if (cfg.ADD_TAGS) {
          if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
            ALLOWED_TAGS = clone(ALLOWED_TAGS);
          }
          addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
        }
        if (cfg.ADD_ATTR) {
          if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
            ALLOWED_ATTR = clone(ALLOWED_ATTR);
          }
          addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
        }
        if (cfg.ADD_URI_SAFE_ATTR) {
          addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
        }
        if (cfg.FORBID_CONTENTS) {
          if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
            FORBID_CONTENTS = clone(FORBID_CONTENTS);
          }
          addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
        }
        if (KEEP_CONTENT) {
          ALLOWED_TAGS["#text"] = true;
        }
        if (WHOLE_DOCUMENT) {
          addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
        }
        if (ALLOWED_TAGS.table) {
          addToSet(ALLOWED_TAGS, ["tbody"]);
          delete FORBID_TAGS.tbody;
        }
        if (cfg.TRUSTED_TYPES_POLICY) {
          if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
            throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
          }
          if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
            throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
          }
          trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
          emptyHTML = trustedTypesPolicy.createHTML("");
        } else {
          if (trustedTypesPolicy === void 0) {
            trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
          }
          if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
            emptyHTML = trustedTypesPolicy.createHTML("");
          }
        }
        if (freeze) {
          freeze(cfg);
        }
        CONFIG = cfg;
      };
      const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
      const HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "annotation-xml"]);
      const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
      const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
      const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
      const _checkValidNamespace = function _checkValidNamespace2(element) {
        let parent = getParentNode(element);
        if (!parent || !parent.tagName) {
          parent = {
            namespaceURI: NAMESPACE,
            tagName: "template"
          };
        }
        const tagName = stringToLowerCase(element.tagName);
        const parentTagName = stringToLowerCase(parent.tagName);
        if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
          return false;
        }
        if (element.namespaceURI === SVG_NAMESPACE) {
          if (parent.namespaceURI === HTML_NAMESPACE) {
            return tagName === "svg";
          }
          if (parent.namespaceURI === MATHML_NAMESPACE) {
            return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
          }
          return Boolean(ALL_SVG_TAGS[tagName]);
        }
        if (element.namespaceURI === MATHML_NAMESPACE) {
          if (parent.namespaceURI === HTML_NAMESPACE) {
            return tagName === "math";
          }
          if (parent.namespaceURI === SVG_NAMESPACE) {
            return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
          }
          return Boolean(ALL_MATHML_TAGS[tagName]);
        }
        if (element.namespaceURI === HTML_NAMESPACE) {
          if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
            return false;
          }
          if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
            return false;
          }
          return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
        }
        if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
          return true;
        }
        return false;
      };
      const _forceRemove = function _forceRemove2(node) {
        arrayPush(DOMPurify2.removed, {
          element: node
        });
        try {
          getParentNode(node).removeChild(node);
        } catch (_) {
          remove(node);
        }
      };
      const _removeAttribute = function _removeAttribute2(name, node) {
        try {
          arrayPush(DOMPurify2.removed, {
            attribute: node.getAttributeNode(name),
            from: node
          });
        } catch (_) {
          arrayPush(DOMPurify2.removed, {
            attribute: null,
            from: node
          });
        }
        node.removeAttribute(name);
        if (name === "is" && !ALLOWED_ATTR[name]) {
          if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
            try {
              _forceRemove(node);
            } catch (_) {
            }
          } else {
            try {
              node.setAttribute(name, "");
            } catch (_) {
            }
          }
        }
      };
      const _initDocument = function _initDocument2(dirty) {
        let doc = null;
        let leadingWhitespace = null;
        if (FORCE_BODY) {
          dirty = "<remove></remove>" + dirty;
        } else {
          const matches = stringMatch(dirty, /^[\r\n\t ]+/);
          leadingWhitespace = matches && matches[0];
        }
        if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
          dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
        }
        const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
        if (NAMESPACE === HTML_NAMESPACE) {
          try {
            doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
          } catch (_) {
          }
        }
        if (!doc || !doc.documentElement) {
          doc = implementation.createDocument(NAMESPACE, "template", null);
          try {
            doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
          } catch (_) {
          }
        }
        const body = doc.body || doc.documentElement;
        if (dirty && leadingWhitespace) {
          body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
        }
        if (NAMESPACE === HTML_NAMESPACE) {
          return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
        }
        return WHOLE_DOCUMENT ? doc.documentElement : body;
      };
      const _createNodeIterator = function _createNodeIterator2(root) {
        return createNodeIterator.call(
          root.ownerDocument || root,
          root,
          // eslint-disable-next-line no-bitwise
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
          null
        );
      };
      const _isClobbered = function _isClobbered2(elm) {
        return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
      };
      const _isNode = function _isNode2(object) {
        return typeof Node === "function" && object instanceof Node;
      };
      const _executeHook = function _executeHook2(entryPoint, currentNode, data) {
        if (!hooks[entryPoint]) {
          return;
        }
        arrayForEach(hooks[entryPoint], (hook) => {
          hook.call(DOMPurify2, currentNode, data, CONFIG);
        });
      };
      const _sanitizeElements = function _sanitizeElements2(currentNode) {
        let content = null;
        _executeHook("beforeSanitizeElements", currentNode, null);
        if (_isClobbered(currentNode)) {
          _forceRemove(currentNode);
          return true;
        }
        const tagName = transformCaseFunc(currentNode.nodeName);
        _executeHook("uponSanitizeElement", currentNode, {
          tagName,
          allowedTags: ALLOWED_TAGS
        });
        if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
          _forceRemove(currentNode);
          return true;
        }
        if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
          _forceRemove(currentNode);
          return true;
        }
        if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
          _forceRemove(currentNode);
          return true;
        }
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
            if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
              return false;
            }
            if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
              return false;
            }
          }
          if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
            const parentNode = getParentNode(currentNode) || currentNode.parentNode;
            const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
            if (childNodes && parentNode) {
              const childCount = childNodes.length;
              for (let i = childCount - 1; i >= 0; --i) {
                const childClone = cloneNode(childNodes[i], true);
                childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
                parentNode.insertBefore(childClone, getNextSibling(currentNode));
              }
            }
          }
          _forceRemove(currentNode);
          return true;
        }
        if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
          _forceRemove(currentNode);
          return true;
        }
        if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
          _forceRemove(currentNode);
          return true;
        }
        if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
          content = currentNode.textContent;
          arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
            content = stringReplace(content, expr, " ");
          });
          if (currentNode.textContent !== content) {
            arrayPush(DOMPurify2.removed, {
              element: currentNode.cloneNode()
            });
            currentNode.textContent = content;
          }
        }
        _executeHook("afterSanitizeElements", currentNode, null);
        return false;
      };
      const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
        if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
          return false;
        }
        if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
        else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
        else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
          ) ;
          else {
            return false;
          }
        } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
        else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
        else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
        else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
        else if (value) {
          return false;
        } else ;
        return true;
      };
      const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
        return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
      };
      const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
        _executeHook("beforeSanitizeAttributes", currentNode, null);
        const {
          attributes
        } = currentNode;
        if (!attributes) {
          return;
        }
        const hookEvent = {
          attrName: "",
          attrValue: "",
          keepAttr: true,
          allowedAttributes: ALLOWED_ATTR
        };
        let l2 = attributes.length;
        while (l2--) {
          const attr = attributes[l2];
          const {
            name,
            namespaceURI,
            value: attrValue
          } = attr;
          const lcName = transformCaseFunc(name);
          let value = name === "value" ? attrValue : stringTrim(attrValue);
          hookEvent.attrName = lcName;
          hookEvent.attrValue = value;
          hookEvent.keepAttr = true;
          hookEvent.forceKeepAttr = void 0;
          _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
          value = hookEvent.attrValue;
          if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
            _removeAttribute(name, currentNode);
            continue;
          }
          if (hookEvent.forceKeepAttr) {
            continue;
          }
          _removeAttribute(name, currentNode);
          if (!hookEvent.keepAttr) {
            continue;
          }
          if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
            _removeAttribute(name, currentNode);
            continue;
          }
          if (SAFE_FOR_TEMPLATES) {
            arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
              value = stringReplace(value, expr, " ");
            });
          }
          const lcTag = transformCaseFunc(currentNode.nodeName);
          if (!_isValidAttribute(lcTag, lcName, value)) {
            continue;
          }
          if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
            _removeAttribute(name, currentNode);
            value = SANITIZE_NAMED_PROPS_PREFIX + value;
          }
          if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
            if (namespaceURI) ;
            else {
              switch (trustedTypes.getAttributeType(lcTag, lcName)) {
                case "TrustedHTML": {
                  value = trustedTypesPolicy.createHTML(value);
                  break;
                }
                case "TrustedScriptURL": {
                  value = trustedTypesPolicy.createScriptURL(value);
                  break;
                }
              }
            }
          }
          try {
            if (namespaceURI) {
              currentNode.setAttributeNS(namespaceURI, name, value);
            } else {
              currentNode.setAttribute(name, value);
            }
            if (_isClobbered(currentNode)) {
              _forceRemove(currentNode);
            } else {
              arrayPop(DOMPurify2.removed);
            }
          } catch (_) {
          }
        }
        _executeHook("afterSanitizeAttributes", currentNode, null);
      };
      const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
        let shadowNode = null;
        const shadowIterator = _createNodeIterator(fragment);
        _executeHook("beforeSanitizeShadowDOM", fragment, null);
        while (shadowNode = shadowIterator.nextNode()) {
          _executeHook("uponSanitizeShadowNode", shadowNode, null);
          if (_sanitizeElements(shadowNode)) {
            continue;
          }
          if (shadowNode.content instanceof DocumentFragment) {
            _sanitizeShadowDOM2(shadowNode.content);
          }
          _sanitizeAttributes(shadowNode);
        }
        _executeHook("afterSanitizeShadowDOM", fragment, null);
      };
      DOMPurify2.sanitize = function(dirty) {
        let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        let body = null;
        let importedNode = null;
        let currentNode = null;
        let returnNode = null;
        IS_EMPTY_INPUT = !dirty;
        if (IS_EMPTY_INPUT) {
          dirty = "<!-->";
        }
        if (typeof dirty !== "string" && !_isNode(dirty)) {
          if (typeof dirty.toString === "function") {
            dirty = dirty.toString();
            if (typeof dirty !== "string") {
              throw typeErrorCreate("dirty is not a string, aborting");
            }
          } else {
            throw typeErrorCreate("toString is not a function");
          }
        }
        if (!DOMPurify2.isSupported) {
          return dirty;
        }
        if (!SET_CONFIG) {
          _parseConfig(cfg);
        }
        DOMPurify2.removed = [];
        if (typeof dirty === "string") {
          IN_PLACE = false;
        }
        if (IN_PLACE) {
          if (dirty.nodeName) {
            const tagName = transformCaseFunc(dirty.nodeName);
            if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
              throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
            }
          }
        } else if (dirty instanceof Node) {
          body = _initDocument("<!---->");
          importedNode = body.ownerDocument.importNode(dirty, true);
          if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
            body = importedNode;
          } else if (importedNode.nodeName === "HTML") {
            body = importedNode;
          } else {
            body.appendChild(importedNode);
          }
        } else {
          if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
          dirty.indexOf("<") === -1) {
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
          }
          body = _initDocument(dirty);
          if (!body) {
            return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
          }
        }
        if (body && FORCE_BODY) {
          _forceRemove(body.firstChild);
        }
        const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
        while (currentNode = nodeIterator.nextNode()) {
          if (_sanitizeElements(currentNode)) {
            continue;
          }
          if (currentNode.content instanceof DocumentFragment) {
            _sanitizeShadowDOM(currentNode.content);
          }
          _sanitizeAttributes(currentNode);
        }
        if (IN_PLACE) {
          return dirty;
        }
        if (RETURN_DOM) {
          if (RETURN_DOM_FRAGMENT) {
            returnNode = createDocumentFragment.call(body.ownerDocument);
            while (body.firstChild) {
              returnNode.appendChild(body.firstChild);
            }
          } else {
            returnNode = body;
          }
          if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
            returnNode = importNode.call(originalDocument, returnNode, true);
          }
          return returnNode;
        }
        let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
        if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
          serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
        }
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
            serializedHTML = stringReplace(serializedHTML, expr, " ");
          });
        }
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
      };
      DOMPurify2.setConfig = function() {
        let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _parseConfig(cfg);
        SET_CONFIG = true;
      };
      DOMPurify2.clearConfig = function() {
        CONFIG = null;
        SET_CONFIG = false;
      };
      DOMPurify2.isValidAttribute = function(tag, attr, value) {
        if (!CONFIG) {
          _parseConfig({});
        }
        const lcTag = transformCaseFunc(tag);
        const lcName = transformCaseFunc(attr);
        return _isValidAttribute(lcTag, lcName, value);
      };
      DOMPurify2.addHook = function(entryPoint, hookFunction) {
        if (typeof hookFunction !== "function") {
          return;
        }
        hooks[entryPoint] = hooks[entryPoint] || [];
        arrayPush(hooks[entryPoint], hookFunction);
      };
      DOMPurify2.removeHook = function(entryPoint) {
        if (hooks[entryPoint]) {
          return arrayPop(hooks[entryPoint]);
        }
      };
      DOMPurify2.removeHooks = function(entryPoint) {
        if (hooks[entryPoint]) {
          hooks[entryPoint] = [];
        }
      };
      DOMPurify2.removeAllHooks = function() {
        hooks = {};
      };
      return DOMPurify2;
    }
    var purify2 = createDOMPurify();
    return purify2;
  });
})(purify);
var DOMPurify = purify.exports;
function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear = obj.delete = obj.set = function() {
      throw new Error("map is read-only");
    };
  } else if (obj instanceof Set) {
    obj.add = obj.clear = obj.delete = function() {
      throw new Error("set is read-only");
    };
  }
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((name) => {
    const prop = obj[name];
    const type = typeof prop;
    if ((type === "object" || type === "function") && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });
  return obj;
}
var Response = class {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    if (mode.data === void 0) mode.data = {};
    this.data = mode.data;
    this.isMatchIgnored = false;
  }
  ignoreMatch() {
    this.isMatchIgnored = true;
  }
};
function escapeHTML(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function inherit$1(original, ...objects) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return (
    /** @type {T} */
    result
  );
}
var SPAN_CLOSE = "</span>";
var emitsWrappingTags = (node) => {
  return !!node.scope;
};
var scopeToCSSClass = (name, { prefix }) => {
  if (name.startsWith("language:")) {
    return name.replace("language:", "language-");
  }
  if (name.includes(".")) {
    const pieces = name.split(".");
    return [
      `${prefix}${pieces.shift()}`,
      ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)
    ].join(" ");
  }
  return `${prefix}${name}`;
};
var HTMLRenderer = class {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }
  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }
  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node)) return;
    const className = scopeToCSSClass(
      node.scope,
      { prefix: this.classPrefix }
    );
    this.span(className);
  }
  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node)) return;
    this.buffer += SPAN_CLOSE;
  }
  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }
  // helpers
  /**
   * Builds a span element
   *
   * @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
};
var newNode = (opts = {}) => {
  const result = { children: [] };
  Object.assign(result, opts);
  return result;
};
var TokenTree = class _TokenTree {
  constructor() {
    this.rootNode = newNode();
    this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  /** @param {Node} node */
  add(node) {
    this.top.children.push(node);
  }
  /** @param {string} scope */
  openNode(scope) {
    const node = newNode({ scope });
    this.add(node);
    this.stack.push(node);
  }
  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    return void 0;
  }
  closeAllNodes() {
    while (this.closeNode()) ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(builder) {
    return this.constructor._walk(builder, this.rootNode);
  }
  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }
  /**
   * @param {Node} node
   */
  static _collapse(node) {
    if (typeof node === "string") return;
    if (!node.children) return;
    if (node.children.every((el) => typeof el === "string")) {
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        _TokenTree._collapse(child);
      });
    }
  }
};
var TokenTreeEmitter = class extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }
  /**
   * @param {string} text
   */
  addText(text) {
    if (text === "") {
      return;
    }
    this.add(text);
  }
  /** @param {string} scope */
  startScope(scope) {
    this.openNode(scope);
  }
  endScope() {
    this.closeNode();
  }
  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  __addSublanguage(emitter, name) {
    const node = emitter.root;
    if (name) node.scope = `language:${name}`;
    this.add(node);
  }
  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }
  finalize() {
    this.closeAllNodes();
    return true;
  }
};
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;
  return re.source;
}
function lookahead(re) {
  return concat("(?=", re, ")");
}
function anyNumberOfTimes(re) {
  return concat("(?:", re, ")*");
}
function optional(re) {
  return concat("(?:", re, ")?");
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function stripOptionsFromArgs(args) {
  const opts = args[args.length - 1];
  if (typeof opts === "object" && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}
function either(...args) {
  const opts = stripOptionsFromArgs(args);
  const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
  return joined;
}
function countMatchGroups(re) {
  return new RegExp(re.toString() + "|").exec("").length - 1;
}
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}
var BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function _rewriteBackreferences(regexps, { joinWith }) {
  let numCaptures = 0;
  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source(regex);
    let out = "";
    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === "\\" && match[1]) {
        out += "\\" + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === "(") {
          numCaptures++;
        }
      }
    }
    return out;
  }).map((re) => `(${re})`).join(joinWith);
}
var MATCH_NOTHING_RE = /\b\B/;
var IDENT_RE = "[a-zA-Z]\\w*";
var UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
var NUMBER_RE = "\\b\\d+(\\.\\d+)?";
var C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
var BINARY_NUMBER_RE = "\\b(0b[01]+)";
var RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
var SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat(
      beginShebang,
      /.*\b/,
      opts.binary,
      /\b.*/
    );
  }
  return inherit$1({
    scope: "meta",
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
};
var BACKSLASH_ESCAPE = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
};
var APOS_STRING_MODE = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [BACKSLASH_ESCAPE]
};
var QUOTE_STRING_MODE = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [BACKSLASH_ESCAPE]
};
var PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
var COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit$1(
    {
      scope: "comment",
      begin,
      end,
      contains: []
    },
    modeOptions
  );
  mode.contains.push({
    scope: "doctag",
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  const ENGLISH_WORD = either(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
    // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/,
    // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/
    // allow capitalized words at beginning of sentences
  );
  mode.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---
      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827
      begin: concat(
        /[ ]+/,
        // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        "(",
        ENGLISH_WORD,
        /[.]?[:]?([.][ ]|[ ])/,
        "){3}"
      )
      // look for 3 words in a row
    }
  );
  return mode;
};
var C_LINE_COMMENT_MODE = COMMENT("//", "$");
var C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
var HASH_COMMENT_MODE = COMMENT("#", "$");
var NUMBER_MODE = {
  scope: "number",
  begin: NUMBER_RE,
  relevance: 0
};
var C_NUMBER_MODE = {
  scope: "number",
  begin: C_NUMBER_RE,
  relevance: 0
};
var BINARY_NUMBER_MODE = {
  scope: "number",
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
var REGEXP_MODE = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    BACKSLASH_ESCAPE,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [BACKSLASH_ESCAPE]
    }
  ]
};
var TITLE_MODE = {
  scope: "title",
  begin: IDENT_RE,
  relevance: 0
};
var UNDERSCORE_TITLE_MODE = {
  scope: "title",
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
var METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
  relevance: 0
};
var END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(
    mode,
    {
      /** @type {ModeCallback} */
      "on:begin": (m, resp) => {
        resp.data._beginMatch = m[1];
      },
      /** @type {ModeCallback} */
      "on:end": (m, resp) => {
        if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
      }
    }
  );
};
var MODES = Object.freeze({
  __proto__: null,
  APOS_STRING_MODE,
  BACKSLASH_ESCAPE,
  BINARY_NUMBER_MODE,
  BINARY_NUMBER_RE,
  COMMENT,
  C_BLOCK_COMMENT_MODE,
  C_LINE_COMMENT_MODE,
  C_NUMBER_MODE,
  C_NUMBER_RE,
  END_SAME_AS_BEGIN,
  HASH_COMMENT_MODE,
  IDENT_RE,
  MATCH_NOTHING_RE,
  METHOD_GUARD,
  NUMBER_MODE,
  NUMBER_RE,
  PHRASAL_WORDS_MODE,
  QUOTE_STRING_MODE,
  REGEXP_MODE,
  RE_STARTERS_RE,
  SHEBANG,
  TITLE_MODE,
  UNDERSCORE_IDENT_RE,
  UNDERSCORE_TITLE_MODE
});
function skipIfHasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}
function scopeClassName(mode, _parent) {
  if (mode.className !== void 0) {
    mode.scope = mode.className;
    delete mode.className;
  }
}
function beginKeywords(mode, parent) {
  if (!parent) return;
  if (!mode.beginKeywords) return;
  mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
  mode.__beforeBegin = skipIfHasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;
  if (mode.relevance === void 0) mode.relevance = 0;
}
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;
  mode.illegal = either(...mode.illegal);
}
function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
  mode.begin = mode.match;
  delete mode.match;
}
function compileRelevance(mode, _parent) {
  if (mode.relevance === void 0) mode.relevance = 1;
}
var beforeMatchExt = (mode, parent) => {
  if (!mode.beforeMatch) return;
  if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
  const originalMode = Object.assign({}, mode);
  Object.keys(mode).forEach((key) => {
    delete mode[key];
  });
  mode.keywords = originalMode.keywords;
  mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
  mode.starts = {
    relevance: 0,
    contains: [
      Object.assign(originalMode, { endsParent: true })
    ]
  };
  mode.relevance = 0;
  delete originalMode.beforeMatch;
};
var COMMON_KEYWORDS = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  // common variable name
  "list",
  // common variable name
  "value"
  // common variable name
];
var DEFAULT_KEYWORD_SCOPE = "keyword";
function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
  const compiledKeywords = /* @__PURE__ */ Object.create(null);
  if (typeof rawKeywords === "string") {
    compileList(scopeName, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(scopeName, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(scopeName2) {
      Object.assign(
        compiledKeywords,
        compileKeywords(rawKeywords[scopeName2], caseInsensitive, scopeName2)
      );
    });
  }
  return compiledKeywords;
  function compileList(scopeName2, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map((x) => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split("|");
      compiledKeywords[pair[0]] = [scopeName2, scoreForKeyword(pair[0], pair[1])];
    });
  }
}
function scoreForKeyword(keyword, providedScore) {
  if (providedScore) {
    return Number(providedScore);
  }
  return commonKeyword(keyword) ? 0 : 1;
}
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}
var seenDeprecations = {};
var error = (message) => {
  console.error(message);
};
var warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};
var deprecated = (version2, message) => {
  if (seenDeprecations[`${version2}/${message}`]) return;
  console.log(`Deprecated as of ${version2}. ${message}`);
  seenDeprecations[`${version2}/${message}`] = true;
};
var MultiClassError = new Error();
function remapScopeNames(mode, regexes, { key }) {
  let offset = 0;
  const scopeNames = mode[key];
  const emit = {};
  const positions = {};
  for (let i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += countMatchGroups(regexes[i - 1]);
  }
  mode[key] = positions;
  mode[key]._emit = emit;
  mode[key]._multi = true;
}
function beginMultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;
  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
    throw MultiClassError;
  }
  if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
    error("beginScope must be object");
    throw MultiClassError;
  }
  remapScopeNames(mode, mode.begin, { key: "beginScope" });
  mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
}
function endMultiClass(mode) {
  if (!Array.isArray(mode.end)) return;
  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
    throw MultiClassError;
  }
  if (typeof mode.endScope !== "object" || mode.endScope === null) {
    error("endScope must be object");
    throw MultiClassError;
  }
  remapScopeNames(mode, mode.end, { key: "endScope" });
  mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
}
function scopeSugar(mode) {
  if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
    mode.beginScope = mode.scope;
    delete mode.scope;
  }
}
function MultiClass(mode) {
  scopeSugar(mode);
  if (typeof mode.beginScope === "string") {
    mode.beginScope = { _wrap: mode.beginScope };
  }
  if (typeof mode.endScope === "string") {
    mode.endScope = { _wrap: mode.endScope };
  }
  beginMultiClass(mode);
  endMultiClass(mode);
}
function compileLanguage(language) {
  function langRe(value, global2) {
    return new RegExp(
      source(value),
      "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global2 ? "g" : "")
    );
  }
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }
    // @ts-ignore
    addRule(re, opts) {
      opts.position = this.position++;
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }
    compile() {
      if (this.regexes.length === 0) {
        this.exec = () => null;
      }
      const terminators = this.regexes.map((el) => el[1]);
      this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: "|" }), true);
      this.lastIndex = 0;
    }
    /** @param {string} s */
    exec(s3) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s3);
      if (!match) {
        return null;
      }
      const i = match.findIndex((el, i2) => i2 > 0 && el !== void 0);
      const matchData = this.matchIndexes[i];
      match.splice(0, i);
      return Object.assign(match, matchData);
    }
  }
  class ResumableMultiRegex {
    constructor() {
      this.rules = [];
      this.multiRegexes = [];
      this.count = 0;
      this.lastIndex = 0;
      this.regexIndex = 0;
    }
    // @ts-ignore
    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];
      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    // @ts-ignore
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin") this.count++;
    }
    /** @param {string} s */
    exec(s3) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s3);
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex) ;
        else {
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s3);
        }
      }
      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          this.considerAll();
        }
      }
      return result;
    }
  }
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();
    mode.contains.forEach((term) => mm.addRule(term.begin, { rule: term, type: "begin" }));
    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }
    return mm;
  }
  function compileMode(mode, parent) {
    const cmode = (
      /** @type CompiledMode */
      mode
    );
    if (mode.isCompiled) return cmode;
    [
      scopeClassName,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      compileMatch,
      MultiClass,
      beforeMatchExt
    ].forEach((ext) => ext(mode, parent));
    language.compilerExtensions.forEach((ext) => ext(mode, parent));
    mode.__beforeBegin = null;
    [
      beginKeywords,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      compileIllegal,
      // default to 1 relevance if not specified
      compileRelevance
    ].forEach((ext) => ext(mode, parent));
    mode.isCompiled = true;
    let keywordPattern = null;
    if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
      mode.keywords = Object.assign({}, mode.keywords);
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    keywordPattern = keywordPattern || /\w+/;
    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }
    cmode.keywordPatternRe = langRe(keywordPattern, true);
    if (parent) {
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(cmode.begin);
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(cmode.end);
      cmode.terminatorEnd = source(cmode.end) || "";
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
      }
    }
    if (mode.illegal) cmode.illegalRe = langRe(
      /** @type {RegExp | string} */
      mode.illegal
    );
    if (!mode.contains) mode.contains = [];
    mode.contains = [].concat(...mode.contains.map(function(c2) {
      return expandOrCloneMode(c2 === "self" ? mode : c2);
    }));
    mode.contains.forEach(function(c2) {
      compileMode(
        /** @type Mode */
        c2,
        cmode
      );
    });
    if (mode.starts) {
      compileMode(mode.starts, parent);
    }
    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }
  if (!language.compilerExtensions) language.compilerExtensions = [];
  if (language.contains && language.contains.includes("self")) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }
  language.classNameAliases = inherit$1(language.classNameAliases || {});
  return compileMode(
    /** @type Mode */
    language
  );
}
function dependencyOnParent(mode) {
  if (!mode) return false;
  return mode.endsWithParent || dependencyOnParent(mode.starts);
}
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit$1(mode, { variants: null }, variant);
    });
  }
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }
  if (dependencyOnParent(mode)) {
    return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
  }
  if (Object.isFrozen(mode)) {
    return inherit$1(mode);
  }
  return mode;
}
var version = "11.10.0";
var HTMLInjectionError = class extends Error {
  constructor(reason, html) {
    super(reason);
    this.name = "HTMLInjectionError";
    this.html = html;
  }
};
var escape = escapeHTML;
var inherit = inherit$1;
var NO_MATCH = Symbol("nomatch");
var MAX_KEYWORD_HITS = 7;
var HLJS = function(hljs2) {
  const languages = /* @__PURE__ */ Object.create(null);
  const aliases = /* @__PURE__ */ Object.create(null);
  const plugins = [];
  let SAFE_MODE = true;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: "Plain text", contains: [] };
  let options = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }
  function blockLanguage(block) {
    let classes = block.className + " ";
    classes += block.parentNode ? block.parentNode.className : "";
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : "no-highlight";
    }
    return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }
  function highlight2(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrLanguageName;
      code = optionsOrCode;
    }
    if (ignoreIllegals === void 0) {
      ignoreIllegals = true;
    }
    const context = {
      code,
      language: languageName
    };
    fire("before:highlight", context);
    const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
    result.code = context.code;
    fire("after:highlight", result);
    return result;
  }
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const keywordHits = /* @__PURE__ */ Object.create(null);
    function keywordData(mode, matchText) {
      return mode.keywords[matchText];
    }
    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }
      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";
      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
        const data = keywordData(top, word);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";
          keywordHits[word] = (keywordHits[word] || 0) + 1;
          if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substring(lastIndex);
      emitter.addText(buf);
    }
    function processSubLanguage() {
      if (modeBuffer === "") return;
      let result2 = null;
      if (typeof top.subLanguage === "string") {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result2 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = /** @type {CompiledMode} */
        result2._top;
      } else {
        result2 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }
      if (top.relevance > 0) {
        relevance += result2.relevance;
      }
      emitter.__addSublanguage(result2._emitter, result2.language);
    }
    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = "";
    }
    function emitKeyword(keyword, scope) {
      if (keyword === "") return;
      emitter.startScope(scope);
      emitter.addText(keyword);
      emitter.endScope();
    }
    function emitMultiClass(scope, match) {
      let i = 1;
      const max = match.length - 1;
      while (i <= max) {
        if (!scope._emit[i]) {
          i++;
          continue;
        }
        const klass = language.classNameAliases[scope[i]] || scope[i];
        const text = match[i];
        if (klass) {
          emitKeyword(text, klass);
        } else {
          modeBuffer = text;
          processKeywords();
          modeBuffer = "";
        }
        i++;
      }
    }
    function startNewMode(mode, match) {
      if (mode.scope && typeof mode.scope === "string") {
        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
      }
      if (mode.beginScope) {
        if (mode.beginScope._wrap) {
          emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
          modeBuffer = "";
        } else if (mode.beginScope._multi) {
          emitMultiClass(mode.beginScope, match);
          modeBuffer = "";
        }
      }
      top = Object.create(mode, { parent: { value: top } });
      return top;
    }
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);
      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored) matched = false;
        }
        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        modeBuffer += lexeme[0];
        return 1;
      } else {
        resumeScanAtSamePosition = true;
        return 0;
      }
    }
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;
      const resp = new Response(newMode);
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb) continue;
        cb(match, resp);
        if (resp.isMatchIgnored) return doIgnore(lexeme);
      }
      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode, match);
      return newMode.returnBegin ? 0 : lexeme.length;
    }
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substring(match.index);
      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) {
        return NO_MATCH;
      }
      const origin = top;
      if (top.endScope && top.endScope._wrap) {
        processBuffer();
        emitKeyword(lexeme, top.endScope._wrap);
      } else if (top.endScope && top.endScope._multi) {
        processBuffer();
        emitMultiClass(top.endScope, match);
      } else if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.scope) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        startNewMode(endMode.starts, match);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }
    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.scope) {
          list.unshift(current.scope);
        }
      }
      list.forEach((item) => emitter.openNode(item));
    }
    let lastMatch = {};
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];
      modeBuffer += textBeforeMatch;
      if (lexeme == null) {
        processBuffer();
        return 0;
      }
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          const err = new Error(`0 width match regex (${languageName})`);
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;
      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || "<unnamed>") + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }
      if (match.type === "illegal" && lexeme === "") {
        return 1;
      }
      if (iterations > 1e5 && iterations > match.index * 3) {
        const err = new Error("potential infinite loop, way more iterations than matches");
        throw err;
      }
      modeBuffer += lexeme;
      return lexeme.length;
    }
    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }
    const md = compileLanguage(language);
    let result = "";
    let top = continuation || md;
    const continuations = {};
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = "";
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;
    try {
      if (!language.__emitTokens) {
        top.matcher.considerAll();
        for (; ; ) {
          iterations++;
          if (resumeScanAtSamePosition) {
            resumeScanAtSamePosition = false;
          } else {
            top.matcher.considerAll();
          }
          top.matcher.lastIndex = index;
          const match = top.matcher.exec(codeToHighlight);
          if (!match) break;
          const beforeMatch = codeToHighlight.substring(index, match.index);
          const processedCount = processLexeme(beforeMatch, match);
          index = match.index + processedCount;
        }
        processLexeme(codeToHighlight.substring(index));
      } else {
        language.__emitTokens(codeToHighlight, emitter);
      }
      emitter.finalize();
      result = emitter.toHTML();
      return {
        language: languageName,
        value: result,
        relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      if (err.message && err.message.includes("Illegal")) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: err.message,
            index,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode,
            resultSoFar: result
          },
          _emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: false,
          relevance: 0,
          errorRaised: err,
          _emitter: emitter,
          _top: top
        };
      } else {
        throw err;
      }
    }
  }
  function justTextHighlightResult(code) {
    const result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };
    result._emitter.addText(code);
    return result;
  }
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);
    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(
      (name) => _highlight(name, code, false)
    );
    results.unshift(plaintext);
    const sorted = results.sort((a2, b) => {
      if (a2.relevance !== b.relevance) return b.relevance - a2.relevance;
      if (a2.language && b.language) {
        if (getLanguage(a2.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a2.language) {
          return -1;
        }
      }
      return 0;
    });
    const [best, secondBest] = sorted;
    const result = best;
    result.secondBest = secondBest;
    return result;
  }
  function updateClassName(element, currentLang, resultLang) {
    const language = currentLang && aliases[currentLang] || resultLang;
    element.classList.add("hljs");
    element.classList.add(`language-${language}`);
  }
  function highlightElement(element) {
    let node = null;
    const language = blockLanguage(element);
    if (shouldNotHighlight(language)) return;
    fire(
      "before:highlightElement",
      { el: element, language }
    );
    if (element.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
      return;
    }
    if (element.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
        console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
        console.warn("The element with unescaped HTML:");
        console.warn(element);
      }
      if (options.throwUnescapedHTML) {
        const err = new HTMLInjectionError(
          "One of your code blocks includes unescaped HTML.",
          element.innerHTML
        );
        throw err;
      }
    }
    node = element;
    const text = node.textContent;
    const result = language ? highlight2(text, { language, ignoreIllegals: true }) : highlightAuto(text);
    element.innerHTML = result.value;
    element.dataset.highlighted = "yes";
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relevance: result.relevance
    };
    if (result.secondBest) {
      element.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }
    fire("after:highlightElement", { el: element, result, text });
  }
  function configure(userOptions) {
    options = inherit(options, userOptions);
  }
  const initHighlighting = () => {
    highlightAll();
    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function initHighlightingOnLoad() {
    highlightAll();
    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let wantsHighlight = false;
  function highlightAll() {
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }
    const blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }
  function boot() {
    if (wantsHighlight) highlightAll();
  }
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("DOMContentLoaded", boot, false);
  }
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs2);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      if (!SAFE_MODE) {
        throw error$1;
      } else {
        error(error$1);
      }
      lang = PLAINTEXT_LANGUAGE;
    }
    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs2);
    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }
  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }
  function listLanguages() {
    return Object.keys(languages);
  }
  function getLanguage(name) {
    name = (name || "").toLowerCase();
    return languages[name] || languages[aliases[name]];
  }
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === "string") {
      aliasList = [aliasList];
    }
    aliasList.forEach((alias) => {
      aliases[alias.toLowerCase()] = languageName;
    });
  }
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }
  function upgradePluginAPI(plugin) {
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
  }
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }
  function removePlugin(plugin) {
    const index = plugins.indexOf(plugin);
    if (index !== -1) {
      plugins.splice(index, 1);
    }
  }
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");
    return highlightElement(el);
  }
  Object.assign(hljs2, {
    highlight: highlight2,
    highlightAuto,
    highlightAll,
    highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    autoDetection,
    inherit,
    addPlugin,
    removePlugin
  });
  hljs2.debugMode = function() {
    SAFE_MODE = false;
  };
  hljs2.safeMode = function() {
    SAFE_MODE = true;
  };
  hljs2.versionString = version;
  hljs2.regex = {
    concat,
    lookahead,
    either,
    optional,
    anyNumberOfTimes
  };
  for (const key in MODES) {
    if (typeof MODES[key] === "object") {
      deepFreeze(MODES[key]);
    }
  }
  Object.assign(hljs2, MODES);
  return hljs2;
};
var highlight = HLJS({});
highlight.newInstance = () => HLJS({});
var core = highlight;
highlight.HighlightJS = highlight;
highlight.default = highlight;
var hljs = core;
var marked_umd = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    var _Marked_instances, convertRendererFunction_fn, parseMarkdown_fn, onError_fn;
    function _getDefaults() {
      return {
        async: false,
        breaks: false,
        extensions: null,
        gfm: true,
        hooks: null,
        pedantic: false,
        renderer: null,
        silent: false,
        tokenizer: null,
        walkTokens: null
      };
    }
    exports2.defaults = _getDefaults();
    function changeDefaults(newDefaults) {
      exports2.defaults = newDefaults;
    }
    const escapeTest = /[&<>"']/;
    const escapeReplace = new RegExp(escapeTest.source, "g");
    const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
    const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
    const escapeReplacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    const getEscapeReplacement = (ch) => escapeReplacements[ch];
    function escape$1(html2, encode) {
      if (encode) {
        if (escapeTest.test(html2)) {
          return html2.replace(escapeReplace, getEscapeReplacement);
        }
      } else {
        if (escapeTestNoEncode.test(html2)) {
          return html2.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
      }
      return html2;
    }
    const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
    function unescape(html2) {
      return html2.replace(unescapeTest, (_, n2) => {
        n2 = n2.toLowerCase();
        if (n2 === "colon")
          return ":";
        if (n2.charAt(0) === "#") {
          return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
        }
        return "";
      });
    }
    const caret = /(^|[^\[])\^/g;
    function edit(regex, opt) {
      let source2 = typeof regex === "string" ? regex : regex.source;
      opt = opt || "";
      const obj = {
        replace: (name, val) => {
          let valSource = typeof val === "string" ? val : val.source;
          valSource = valSource.replace(caret, "$1");
          source2 = source2.replace(name, valSource);
          return obj;
        },
        getRegex: () => {
          return new RegExp(source2, opt);
        }
      };
      return obj;
    }
    function cleanUrl(href) {
      try {
        href = encodeURI(href).replace(/%25/g, "%");
      } catch (e) {
        return null;
      }
      return href;
    }
    const noopTest = { exec: () => null };
    function splitCells(tableRow, count) {
      const row = tableRow.replace(/\|/g, (match, offset, str) => {
        let escaped = false;
        let curr = offset;
        while (--curr >= 0 && str[curr] === "\\")
          escaped = !escaped;
        if (escaped) {
          return "|";
        } else {
          return " |";
        }
      }), cells = row.split(/ \|/);
      let i = 0;
      if (!cells[0].trim()) {
        cells.shift();
      }
      if (cells.length > 0 && !cells[cells.length - 1].trim()) {
        cells.pop();
      }
      if (count) {
        if (cells.length > count) {
          cells.splice(count);
        } else {
          while (cells.length < count)
            cells.push("");
        }
      }
      for (; i < cells.length; i++) {
        cells[i] = cells[i].trim().replace(/\\\|/g, "|");
      }
      return cells;
    }
    function rtrim(str, c2, invert) {
      const l2 = str.length;
      if (l2 === 0) {
        return "";
      }
      let suffLen = 0;
      while (suffLen < l2) {
        const currChar = str.charAt(l2 - suffLen - 1);
        if (currChar === c2 && !invert) {
          suffLen++;
        } else if (currChar !== c2 && invert) {
          suffLen++;
        } else {
          break;
        }
      }
      return str.slice(0, l2 - suffLen);
    }
    function findClosingBracket(str, b) {
      if (str.indexOf(b[1]) === -1) {
        return -1;
      }
      let level = 0;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === "\\") {
          i++;
        } else if (str[i] === b[0]) {
          level++;
        } else if (str[i] === b[1]) {
          level--;
          if (level < 0) {
            return i;
          }
        }
      }
      return -1;
    }
    function outputLink(cap, link2, raw, lexer2) {
      const href = link2.href;
      const title = link2.title ? escape$1(link2.title) : null;
      const text = cap[1].replace(/\\([\[\]])/g, "$1");
      if (cap[0].charAt(0) !== "!") {
        lexer2.state.inLink = true;
        const token = {
          type: "link",
          raw,
          href,
          title,
          text,
          tokens: lexer2.inlineTokens(text)
        };
        lexer2.state.inLink = false;
        return token;
      }
      return {
        type: "image",
        raw,
        href,
        title,
        text: escape$1(text)
      };
    }
    function indentCodeCompensation(raw, text) {
      const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
      if (matchIndentToCode === null) {
        return text;
      }
      const indentToCode = matchIndentToCode[1];
      return text.split("\n").map((node) => {
        const matchIndentInNode = node.match(/^\s+/);
        if (matchIndentInNode === null) {
          return node;
        }
        const [indentInNode] = matchIndentInNode;
        if (indentInNode.length >= indentToCode.length) {
          return node.slice(indentToCode.length);
        }
        return node;
      }).join("\n");
    }
    class _Tokenizer {
      // set by the lexer
      constructor(options2) {
        __publicField(this, "options");
        __publicField(this, "rules");
        // set by the lexer
        __publicField(this, "lexer");
        this.options = options2 || exports2.defaults;
      }
      space(src) {
        const cap = this.rules.block.newline.exec(src);
        if (cap && cap[0].length > 0) {
          return {
            type: "space",
            raw: cap[0]
          };
        }
      }
      code(src) {
        const cap = this.rules.block.code.exec(src);
        if (cap) {
          const text = cap[0].replace(/^ {1,4}/gm, "");
          return {
            type: "code",
            raw: cap[0],
            codeBlockStyle: "indented",
            text: !this.options.pedantic ? rtrim(text, "\n") : text
          };
        }
      }
      fences(src) {
        const cap = this.rules.block.fences.exec(src);
        if (cap) {
          const raw = cap[0];
          const text = indentCodeCompensation(raw, cap[3] || "");
          return {
            type: "code",
            raw,
            lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
            text
          };
        }
      }
      heading(src) {
        const cap = this.rules.block.heading.exec(src);
        if (cap) {
          let text = cap[2].trim();
          if (/#$/.test(text)) {
            const trimmed = rtrim(text, "#");
            if (this.options.pedantic) {
              text = trimmed.trim();
            } else if (!trimmed || / $/.test(trimmed)) {
              text = trimmed.trim();
            }
          }
          return {
            type: "heading",
            raw: cap[0],
            depth: cap[1].length,
            text,
            tokens: this.lexer.inline(text)
          };
        }
      }
      hr(src) {
        const cap = this.rules.block.hr.exec(src);
        if (cap) {
          return {
            type: "hr",
            raw: rtrim(cap[0], "\n")
          };
        }
      }
      blockquote(src) {
        const cap = this.rules.block.blockquote.exec(src);
        if (cap) {
          let lines = rtrim(cap[0], "\n").split("\n");
          let raw = "";
          let text = "";
          const tokens = [];
          while (lines.length > 0) {
            let inBlockquote = false;
            const currentLines = [];
            let i;
            for (i = 0; i < lines.length; i++) {
              if (/^ {0,3}>/.test(lines[i])) {
                currentLines.push(lines[i]);
                inBlockquote = true;
              } else if (!inBlockquote) {
                currentLines.push(lines[i]);
              } else {
                break;
              }
            }
            lines = lines.slice(i);
            const currentRaw = currentLines.join("\n");
            const currentText = currentRaw.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1").replace(/^ {0,3}>[ \t]?/gm, "");
            raw = raw ? `${raw}
${currentRaw}` : currentRaw;
            text = text ? `${text}
${currentText}` : currentText;
            const top = this.lexer.state.top;
            this.lexer.state.top = true;
            this.lexer.blockTokens(currentText, tokens, true);
            this.lexer.state.top = top;
            if (lines.length === 0) {
              break;
            }
            const lastToken = tokens[tokens.length - 1];
            if ((lastToken == null ? void 0 : lastToken.type) === "code") {
              break;
            } else if ((lastToken == null ? void 0 : lastToken.type) === "blockquote") {
              const oldToken = lastToken;
              const newText = oldToken.raw + "\n" + lines.join("\n");
              const newToken = this.blockquote(newText);
              tokens[tokens.length - 1] = newToken;
              raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
              text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
              break;
            } else if ((lastToken == null ? void 0 : lastToken.type) === "list") {
              const oldToken = lastToken;
              const newText = oldToken.raw + "\n" + lines.join("\n");
              const newToken = this.list(newText);
              tokens[tokens.length - 1] = newToken;
              raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
              text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
              lines = newText.substring(tokens[tokens.length - 1].raw.length).split("\n");
              continue;
            }
          }
          return {
            type: "blockquote",
            raw,
            tokens,
            text
          };
        }
      }
      list(src) {
        let cap = this.rules.block.list.exec(src);
        if (cap) {
          let bull = cap[1].trim();
          const isordered = bull.length > 1;
          const list2 = {
            type: "list",
            raw: "",
            ordered: isordered,
            start: isordered ? +bull.slice(0, -1) : "",
            loose: false,
            items: []
          };
          bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
          if (this.options.pedantic) {
            bull = isordered ? bull : "[*+-]";
          }
          const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
          let endsWithBlankLine = false;
          while (src) {
            let endEarly = false;
            let raw = "";
            let itemContents = "";
            if (!(cap = itemRegex.exec(src))) {
              break;
            }
            if (this.rules.block.hr.test(src)) {
              break;
            }
            raw = cap[0];
            src = src.substring(raw.length);
            let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t2) => " ".repeat(3 * t2.length));
            let nextLine = src.split("\n", 1)[0];
            let blankLine = !line.trim();
            let indent = 0;
            if (this.options.pedantic) {
              indent = 2;
              itemContents = line.trimStart();
            } else if (blankLine) {
              indent = cap[1].length + 1;
            } else {
              indent = cap[2].search(/[^ ]/);
              indent = indent > 4 ? 1 : indent;
              itemContents = line.slice(indent);
              indent += cap[1].length;
            }
            if (blankLine && /^ *$/.test(nextLine)) {
              raw += nextLine + "\n";
              src = src.substring(nextLine.length + 1);
              endEarly = true;
            }
            if (!endEarly) {
              const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
              const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
              const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
              const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
              while (src) {
                const rawLine = src.split("\n", 1)[0];
                nextLine = rawLine;
                if (this.options.pedantic) {
                  nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
                }
                if (fencesBeginRegex.test(nextLine)) {
                  break;
                }
                if (headingBeginRegex.test(nextLine)) {
                  break;
                }
                if (nextBulletRegex.test(nextLine)) {
                  break;
                }
                if (hrRegex.test(src)) {
                  break;
                }
                if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                  itemContents += "\n" + nextLine.slice(indent);
                } else {
                  if (blankLine) {
                    break;
                  }
                  if (line.search(/[^ ]/) >= 4) {
                    break;
                  }
                  if (fencesBeginRegex.test(line)) {
                    break;
                  }
                  if (headingBeginRegex.test(line)) {
                    break;
                  }
                  if (hrRegex.test(line)) {
                    break;
                  }
                  itemContents += "\n" + nextLine;
                }
                if (!blankLine && !nextLine.trim()) {
                  blankLine = true;
                }
                raw += rawLine + "\n";
                src = src.substring(rawLine.length + 1);
                line = nextLine.slice(indent);
              }
            }
            if (!list2.loose) {
              if (endsWithBlankLine) {
                list2.loose = true;
              } else if (/\n *\n *$/.test(raw)) {
                endsWithBlankLine = true;
              }
            }
            let istask = null;
            let ischecked;
            if (this.options.gfm) {
              istask = /^\[[ xX]\] /.exec(itemContents);
              if (istask) {
                ischecked = istask[0] !== "[ ] ";
                itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
              }
            }
            list2.items.push({
              type: "list_item",
              raw,
              task: !!istask,
              checked: ischecked,
              loose: false,
              text: itemContents,
              tokens: []
            });
            list2.raw += raw;
          }
          list2.items[list2.items.length - 1].raw = list2.items[list2.items.length - 1].raw.trimEnd();
          list2.items[list2.items.length - 1].text = list2.items[list2.items.length - 1].text.trimEnd();
          list2.raw = list2.raw.trimEnd();
          for (let i = 0; i < list2.items.length; i++) {
            this.lexer.state.top = false;
            list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
            if (!list2.loose) {
              const spacers = list2.items[i].tokens.filter((t2) => t2.type === "space");
              const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => /\n.*\n/.test(t2.raw));
              list2.loose = hasMultipleLineBreaks;
            }
          }
          if (list2.loose) {
            for (let i = 0; i < list2.items.length; i++) {
              list2.items[i].loose = true;
            }
          }
          return list2;
        }
      }
      html(src) {
        const cap = this.rules.block.html.exec(src);
        if (cap) {
          const token = {
            type: "html",
            block: true,
            raw: cap[0],
            pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
            text: cap[0]
          };
          return token;
        }
      }
      def(src) {
        const cap = this.rules.block.def.exec(src);
        if (cap) {
          const tag2 = cap[1].toLowerCase().replace(/\s+/g, " ");
          const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
          const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
          return {
            type: "def",
            tag: tag2,
            raw: cap[0],
            href,
            title
          };
        }
      }
      table(src) {
        const cap = this.rules.block.table.exec(src);
        if (!cap) {
          return;
        }
        if (!/[:|]/.test(cap[2])) {
          return;
        }
        const headers = splitCells(cap[1]);
        const aligns = cap[2].replace(/^\||\| *$/g, "").split("|");
        const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : [];
        const item = {
          type: "table",
          raw: cap[0],
          header: [],
          align: [],
          rows: []
        };
        if (headers.length !== aligns.length) {
          return;
        }
        for (const align of aligns) {
          if (/^ *-+: *$/.test(align)) {
            item.align.push("right");
          } else if (/^ *:-+: *$/.test(align)) {
            item.align.push("center");
          } else if (/^ *:-+ *$/.test(align)) {
            item.align.push("left");
          } else {
            item.align.push(null);
          }
        }
        for (let i = 0; i < headers.length; i++) {
          item.header.push({
            text: headers[i],
            tokens: this.lexer.inline(headers[i]),
            header: true,
            align: item.align[i]
          });
        }
        for (const row of rows) {
          item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
            return {
              text: cell,
              tokens: this.lexer.inline(cell),
              header: false,
              align: item.align[i]
            };
          }));
        }
        return item;
      }
      lheading(src) {
        const cap = this.rules.block.lheading.exec(src);
        if (cap) {
          return {
            type: "heading",
            raw: cap[0],
            depth: cap[2].charAt(0) === "=" ? 1 : 2,
            text: cap[1],
            tokens: this.lexer.inline(cap[1])
          };
        }
      }
      paragraph(src) {
        const cap = this.rules.block.paragraph.exec(src);
        if (cap) {
          const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
          return {
            type: "paragraph",
            raw: cap[0],
            text,
            tokens: this.lexer.inline(text)
          };
        }
      }
      text(src) {
        const cap = this.rules.block.text.exec(src);
        if (cap) {
          return {
            type: "text",
            raw: cap[0],
            text: cap[0],
            tokens: this.lexer.inline(cap[0])
          };
        }
      }
      escape(src) {
        const cap = this.rules.inline.escape.exec(src);
        if (cap) {
          return {
            type: "escape",
            raw: cap[0],
            text: escape$1(cap[1])
          };
        }
      }
      tag(src) {
        const cap = this.rules.inline.tag.exec(src);
        if (cap) {
          if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
            this.lexer.state.inLink = true;
          } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
            this.lexer.state.inLink = false;
          }
          if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            this.lexer.state.inRawBlock = true;
          } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            this.lexer.state.inRawBlock = false;
          }
          return {
            type: "html",
            raw: cap[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: false,
            text: cap[0]
          };
        }
      }
      link(src) {
        const cap = this.rules.inline.link.exec(src);
        if (cap) {
          const trimmedUrl = cap[2].trim();
          if (!this.options.pedantic && /^</.test(trimmedUrl)) {
            if (!/>$/.test(trimmedUrl)) {
              return;
            }
            const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
            if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
              return;
            }
          } else {
            const lastParenIndex = findClosingBracket(cap[2], "()");
            if (lastParenIndex > -1) {
              const start = cap[0].indexOf("!") === 0 ? 5 : 4;
              const linkLen = start + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = "";
            }
          }
          let href = cap[2];
          let title = "";
          if (this.options.pedantic) {
            const link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
            if (link2) {
              href = link2[1];
              title = link2[3];
            }
          } else {
            title = cap[3] ? cap[3].slice(1, -1) : "";
          }
          href = href.trim();
          if (/^</.test(href)) {
            if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
              href = href.slice(1);
            } else {
              href = href.slice(1, -1);
            }
          }
          return outputLink(cap, {
            href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
            title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
          }, cap[0], this.lexer);
        }
      }
      reflink(src, links) {
        let cap;
        if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
          const linkString = (cap[2] || cap[1]).replace(/\s+/g, " ");
          const link2 = links[linkString.toLowerCase()];
          if (!link2) {
            const text = cap[0].charAt(0);
            return {
              type: "text",
              raw: text,
              text
            };
          }
          return outputLink(cap, link2, cap[0], this.lexer);
        }
      }
      emStrong(src, maskedSrc, prevChar = "") {
        let match = this.rules.inline.emStrongLDelim.exec(src);
        if (!match)
          return;
        if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
          return;
        const nextChar = match[1] || match[2] || "";
        if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
          const lLength = [...match[0]].length - 1;
          let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
          const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
          endReg.lastIndex = 0;
          maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
          while ((match = endReg.exec(maskedSrc)) != null) {
            rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
            if (!rDelim)
              continue;
            rLength = [...rDelim].length;
            if (match[3] || match[4]) {
              delimTotal += rLength;
              continue;
            } else if (match[5] || match[6]) {
              if (lLength % 3 && !((lLength + rLength) % 3)) {
                midDelimTotal += rLength;
                continue;
              }
            }
            delimTotal -= rLength;
            if (delimTotal > 0)
              continue;
            rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
            const lastCharLength = [...match[0]][0].length;
            const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
            if (Math.min(lLength, rLength) % 2) {
              const text2 = raw.slice(1, -1);
              return {
                type: "em",
                raw,
                text: text2,
                tokens: this.lexer.inlineTokens(text2)
              };
            }
            const text = raw.slice(2, -2);
            return {
              type: "strong",
              raw,
              text,
              tokens: this.lexer.inlineTokens(text)
            };
          }
        }
      }
      codespan(src) {
        const cap = this.rules.inline.code.exec(src);
        if (cap) {
          let text = cap[2].replace(/\n/g, " ");
          const hasNonSpaceChars = /[^ ]/.test(text);
          const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
          if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
            text = text.substring(1, text.length - 1);
          }
          text = escape$1(text, true);
          return {
            type: "codespan",
            raw: cap[0],
            text
          };
        }
      }
      br(src) {
        const cap = this.rules.inline.br.exec(src);
        if (cap) {
          return {
            type: "br",
            raw: cap[0]
          };
        }
      }
      del(src) {
        const cap = this.rules.inline.del.exec(src);
        if (cap) {
          return {
            type: "del",
            raw: cap[0],
            text: cap[2],
            tokens: this.lexer.inlineTokens(cap[2])
          };
        }
      }
      autolink(src) {
        const cap = this.rules.inline.autolink.exec(src);
        if (cap) {
          let text, href;
          if (cap[2] === "@") {
            text = escape$1(cap[1]);
            href = "mailto:" + text;
          } else {
            text = escape$1(cap[1]);
            href = text;
          }
          return {
            type: "link",
            raw: cap[0],
            text,
            href,
            tokens: [
              {
                type: "text",
                raw: text,
                text
              }
            ]
          };
        }
      }
      url(src) {
        var _a;
        let cap;
        if (cap = this.rules.inline.url.exec(src)) {
          let text, href;
          if (cap[2] === "@") {
            text = escape$1(cap[0]);
            href = "mailto:" + text;
          } else {
            let prevCapZero;
            do {
              prevCapZero = cap[0];
              cap[0] = ((_a = this.rules.inline._backpedal.exec(cap[0])) == null ? void 0 : _a[0]) ?? "";
            } while (prevCapZero !== cap[0]);
            text = escape$1(cap[0]);
            if (cap[1] === "www.") {
              href = "http://" + cap[0];
            } else {
              href = cap[0];
            }
          }
          return {
            type: "link",
            raw: cap[0],
            text,
            href,
            tokens: [
              {
                type: "text",
                raw: text,
                text
              }
            ]
          };
        }
      }
      inlineText(src) {
        const cap = this.rules.inline.text.exec(src);
        if (cap) {
          let text;
          if (this.lexer.state.inRawBlock) {
            text = cap[0];
          } else {
            text = escape$1(cap[0]);
          }
          return {
            type: "text",
            raw: cap[0],
            text
          };
        }
      }
    }
    const newline = /^(?: *(?:\n|$))+/;
    const blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
    const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
    const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
    const heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
    const bullet = /(?:[*+-]|\d{1,9}[.)])/;
    const lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex();
    const _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
    const blockText = /^[^\n]+/;
    const _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
    const def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
    const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
    const _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
    const _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
    const html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
    const paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
    const blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
    const blockNormal = {
      blockquote,
      code: blockCode,
      def,
      fences,
      heading,
      hr,
      html,
      lheading,
      list,
      newline,
      paragraph,
      table: noopTest,
      text: blockText
    };
    const gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
    const blockGfm = {
      ...blockNormal,
      table: gfmTable,
      paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
    };
    const blockPedantic = {
      ...blockNormal,
      html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: noopTest,
      // fences not supported
      lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
      paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
    };
    const escape2 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
    const inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
    const br = /^( {2,}|\\)\n(?!\s*$)/;
    const inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
    const _punctuation = "\\p{P}\\p{S}";
    const punctuation = edit(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _punctuation).getRegex();
    const blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
    const emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _punctuation).getRegex();
    const emStrongRDelimAst = edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _punctuation).getRegex();
    const emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _punctuation).getRegex();
    const anyPunctuation = edit(/\\([punct])/, "gu").replace(/punct/g, _punctuation).getRegex();
    const autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
    const _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
    const tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
    const _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    const link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
    const reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
    const nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
    const reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
    const inlineNormal = {
      _backpedal: noopTest,
      // only used for GFM url
      anyPunctuation,
      autolink,
      blockSkip,
      br,
      code: inlineCode,
      del: noopTest,
      emStrongLDelim,
      emStrongRDelimAst,
      emStrongRDelimUnd,
      escape: escape2,
      link,
      nolink,
      punctuation,
      reflink,
      reflinkSearch,
      tag,
      text: inlineText,
      url: noopTest
    };
    const inlinePedantic = {
      ...inlineNormal,
      link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
      reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
    };
    const inlineGfm = {
      ...inlineNormal,
      escape: edit(escape2).replace("])", "~|])").getRegex(),
      url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
      _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    };
    const inlineBreaks = {
      ...inlineGfm,
      br: edit(br).replace("{2,}", "*").getRegex(),
      text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    };
    const block = {
      normal: blockNormal,
      gfm: blockGfm,
      pedantic: blockPedantic
    };
    const inline = {
      normal: inlineNormal,
      gfm: inlineGfm,
      breaks: inlineBreaks,
      pedantic: inlinePedantic
    };
    class _Lexer {
      constructor(options2) {
        __publicField(this, "tokens");
        __publicField(this, "options");
        __publicField(this, "state");
        __publicField(this, "tokenizer");
        __publicField(this, "inlineQueue");
        this.tokens = [];
        this.tokens.links = /* @__PURE__ */ Object.create(null);
        this.options = options2 || exports2.defaults;
        this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
          inLink: false,
          inRawBlock: false,
          top: true
        };
        const rules = {
          block: block.normal,
          inline: inline.normal
        };
        if (this.options.pedantic) {
          rules.block = block.pedantic;
          rules.inline = inline.pedantic;
        } else if (this.options.gfm) {
          rules.block = block.gfm;
          if (this.options.breaks) {
            rules.inline = inline.breaks;
          } else {
            rules.inline = inline.gfm;
          }
        }
        this.tokenizer.rules = rules;
      }
      /**
       * Expose Rules
       */
      static get rules() {
        return {
          block,
          inline
        };
      }
      /**
       * Static Lex Method
       */
      static lex(src, options2) {
        const lexer2 = new _Lexer(options2);
        return lexer2.lex(src);
      }
      /**
       * Static Lex Inline Method
       */
      static lexInline(src, options2) {
        const lexer2 = new _Lexer(options2);
        return lexer2.inlineTokens(src);
      }
      /**
       * Preprocessing
       */
      lex(src) {
        src = src.replace(/\r\n|\r/g, "\n");
        this.blockTokens(src, this.tokens);
        for (let i = 0; i < this.inlineQueue.length; i++) {
          const next = this.inlineQueue[i];
          this.inlineTokens(next.src, next.tokens);
        }
        this.inlineQueue = [];
        return this.tokens;
      }
      blockTokens(src, tokens = [], lastParagraphClipped = false) {
        if (this.options.pedantic) {
          src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
        } else {
          src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
            return leading + "    ".repeat(tabs.length);
          });
        }
        let token;
        let lastToken;
        let cutSrc;
        while (src) {
          if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
            if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              return true;
            }
            return false;
          })) {
            continue;
          }
          if (token = this.tokenizer.space(src)) {
            src = src.substring(token.raw.length);
            if (token.raw.length === 1 && tokens.length > 0) {
              tokens[tokens.length - 1].raw += "\n";
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.code(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.fences(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.hr(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.blockquote(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.list(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.html(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.def(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.raw;
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else if (!this.tokens.links[token.tag]) {
              this.tokens.links[token.tag] = {
                href: token.href,
                title: token.title
              };
            }
            continue;
          }
          if (token = this.tokenizer.table(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.lheading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startBlock) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startBlock.forEach((getStartIndex) => {
              tempStart = getStartIndex.call({ lexer: this }, tempSrc);
              if (typeof tempStart === "number" && tempStart >= 0) {
                startIndex = Math.min(startIndex, tempStart);
              }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
            lastToken = tokens[tokens.length - 1];
            if (lastParagraphClipped && (lastToken == null ? void 0 : lastToken.type) === "paragraph") {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue.pop();
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            lastParagraphClipped = cutSrc.length !== src.length;
            src = src.substring(token.raw.length);
            continue;
          }
          if (token = this.tokenizer.text(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === "text") {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue.pop();
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (src) {
            const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        this.state.top = true;
        return tokens;
      }
      inline(src, tokens = []) {
        this.inlineQueue.push({ src, tokens });
        return tokens;
      }
      /**
       * Lexing/Compiling
       */
      inlineTokens(src, tokens = []) {
        let token, lastToken, cutSrc;
        let maskedSrc = src;
        let match;
        let keepPrevChar, prevChar;
        if (this.tokens.links) {
          const links = Object.keys(this.tokens.links);
          if (links.length > 0) {
            while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
              if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
                maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
              }
            }
          }
        }
        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }
        while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        }
        while (src) {
          if (!keepPrevChar) {
            prevChar = "";
          }
          keepPrevChar = false;
          if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
            if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              return true;
            }
            return false;
          })) {
            continue;
          }
          if (token = this.tokenizer.escape(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.tag(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === "text" && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.link(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.reflink(src, this.tokens.links)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === "text" && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.codespan(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.br(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.del(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.autolink(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (!this.state.inLink && (token = this.tokenizer.url(src))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startInline) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startInline.forEach((getStartIndex) => {
              tempStart = getStartIndex.call({ lexer: this }, tempSrc);
              if (typeof tempStart === "number" && tempStart >= 0) {
                startIndex = Math.min(startIndex, tempStart);
              }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (token = this.tokenizer.inlineText(cutSrc)) {
            src = src.substring(token.raw.length);
            if (token.raw.slice(-1) !== "_") {
              prevChar = token.raw.slice(-1);
            }
            keepPrevChar = true;
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (src) {
            const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        return tokens;
      }
    }
    class _Renderer {
      // set by the parser
      constructor(options2) {
        __publicField(this, "options");
        __publicField(this, "parser");
        this.options = options2 || exports2.defaults;
      }
      space(token) {
        return "";
      }
      code({ text, lang, escaped }) {
        var _a;
        const langString = (_a = (lang || "").match(/^\S*/)) == null ? void 0 : _a[0];
        const code = text.replace(/\n$/, "") + "\n";
        if (!langString) {
          return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
        }
        return '<pre><code class="language-' + escape$1(langString) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
      }
      blockquote({ tokens }) {
        const body = this.parser.parse(tokens);
        return `<blockquote>
${body}</blockquote>
`;
      }
      html({ text }) {
        return text;
      }
      heading({ tokens, depth }) {
        return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
      }
      hr(token) {
        return "<hr>\n";
      }
      list(token) {
        const ordered = token.ordered;
        const start = token.start;
        let body = "";
        for (let j = 0; j < token.items.length; j++) {
          const item = token.items[j];
          body += this.listitem(item);
        }
        const type = ordered ? "ol" : "ul";
        const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
        return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
      }
      listitem(item) {
        let itemBody = "";
        if (item.task) {
          const checkbox = this.checkbox({ checked: !!item.checked });
          if (item.loose) {
            if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
              item.tokens[0].text = checkbox + " " + item.tokens[0].text;
              if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
              }
            } else {
              item.tokens.unshift({
                type: "text",
                raw: checkbox + " ",
                text: checkbox + " "
              });
            }
          } else {
            itemBody += checkbox + " ";
          }
        }
        itemBody += this.parser.parse(item.tokens, !!item.loose);
        return `<li>${itemBody}</li>
`;
      }
      checkbox({ checked }) {
        return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
      }
      paragraph({ tokens }) {
        return `<p>${this.parser.parseInline(tokens)}</p>
`;
      }
      table(token) {
        let header = "";
        let cell = "";
        for (let j = 0; j < token.header.length; j++) {
          cell += this.tablecell(token.header[j]);
        }
        header += this.tablerow({ text: cell });
        let body = "";
        for (let j = 0; j < token.rows.length; j++) {
          const row = token.rows[j];
          cell = "";
          for (let k = 0; k < row.length; k++) {
            cell += this.tablecell(row[k]);
          }
          body += this.tablerow({ text: cell });
        }
        if (body)
          body = `<tbody>${body}</tbody>`;
        return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
      }
      tablerow({ text }) {
        return `<tr>
${text}</tr>
`;
      }
      tablecell(token) {
        const content = this.parser.parseInline(token.tokens);
        const type = token.header ? "th" : "td";
        const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
        return tag2 + content + `</${type}>
`;
      }
      /**
       * span level renderer
       */
      strong({ tokens }) {
        return `<strong>${this.parser.parseInline(tokens)}</strong>`;
      }
      em({ tokens }) {
        return `<em>${this.parser.parseInline(tokens)}</em>`;
      }
      codespan({ text }) {
        return `<code>${text}</code>`;
      }
      br(token) {
        return "<br>";
      }
      del({ tokens }) {
        return `<del>${this.parser.parseInline(tokens)}</del>`;
      }
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const cleanHref = cleanUrl(href);
        if (cleanHref === null) {
          return text;
        }
        href = cleanHref;
        let out = '<a href="' + href + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ">" + text + "</a>";
        return out;
      }
      image({ href, title, text }) {
        const cleanHref = cleanUrl(href);
        if (cleanHref === null) {
          return text;
        }
        href = cleanHref;
        let out = `<img src="${href}" alt="${text}"`;
        if (title) {
          out += ` title="${title}"`;
        }
        out += ">";
        return out;
      }
      text(token) {
        return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : token.text;
      }
    }
    class _TextRenderer {
      // no need for block level renderers
      strong({ text }) {
        return text;
      }
      em({ text }) {
        return text;
      }
      codespan({ text }) {
        return text;
      }
      del({ text }) {
        return text;
      }
      html({ text }) {
        return text;
      }
      text({ text }) {
        return text;
      }
      link({ text }) {
        return "" + text;
      }
      image({ text }) {
        return "" + text;
      }
      br() {
        return "";
      }
    }
    class _Parser {
      constructor(options2) {
        __publicField(this, "options");
        __publicField(this, "renderer");
        __publicField(this, "textRenderer");
        this.options = options2 || exports2.defaults;
        this.options.renderer = this.options.renderer || new _Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.renderer.parser = this;
        this.textRenderer = new _TextRenderer();
      }
      /**
       * Static Parse Method
       */
      static parse(tokens, options2) {
        const parser2 = new _Parser(options2);
        return parser2.parse(tokens);
      }
      /**
       * Static Parse Inline Method
       */
      static parseInline(tokens, options2) {
        const parser2 = new _Parser(options2);
        return parser2.parseInline(tokens);
      }
      /**
       * Parse Loop
       */
      parse(tokens, top = true) {
        let out = "";
        for (let i = 0; i < tokens.length; i++) {
          const anyToken = tokens[i];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[anyToken.type]) {
            const genericToken = anyToken;
            const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
            if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
              out += ret || "";
              continue;
            }
          }
          const token = anyToken;
          switch (token.type) {
            case "space": {
              out += this.renderer.space(token);
              continue;
            }
            case "hr": {
              out += this.renderer.hr(token);
              continue;
            }
            case "heading": {
              out += this.renderer.heading(token);
              continue;
            }
            case "code": {
              out += this.renderer.code(token);
              continue;
            }
            case "table": {
              out += this.renderer.table(token);
              continue;
            }
            case "blockquote": {
              out += this.renderer.blockquote(token);
              continue;
            }
            case "list": {
              out += this.renderer.list(token);
              continue;
            }
            case "html": {
              out += this.renderer.html(token);
              continue;
            }
            case "paragraph": {
              out += this.renderer.paragraph(token);
              continue;
            }
            case "text": {
              let textToken = token;
              let body = this.renderer.text(textToken);
              while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
                textToken = tokens[++i];
                body += "\n" + this.renderer.text(textToken);
              }
              if (top) {
                out += this.renderer.paragraph({
                  type: "paragraph",
                  raw: body,
                  text: body,
                  tokens: [{ type: "text", raw: body, text: body }]
                });
              } else {
                out += body;
              }
              continue;
            }
            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return "";
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      }
      /**
       * Parse Inline Tokens
       */
      parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = "";
        for (let i = 0; i < tokens.length; i++) {
          const anyToken = tokens[i];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[anyToken.type]) {
            const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
            if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
              out += ret || "";
              continue;
            }
          }
          const token = anyToken;
          switch (token.type) {
            case "escape": {
              out += renderer.text(token);
              break;
            }
            case "html": {
              out += renderer.html(token);
              break;
            }
            case "link": {
              out += renderer.link(token);
              break;
            }
            case "image": {
              out += renderer.image(token);
              break;
            }
            case "strong": {
              out += renderer.strong(token);
              break;
            }
            case "em": {
              out += renderer.em(token);
              break;
            }
            case "codespan": {
              out += renderer.codespan(token);
              break;
            }
            case "br": {
              out += renderer.br(token);
              break;
            }
            case "del": {
              out += renderer.del(token);
              break;
            }
            case "text": {
              out += renderer.text(token);
              break;
            }
            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return "";
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      }
    }
    class _Hooks {
      constructor(options2) {
        __publicField(this, "options");
        this.options = options2 || exports2.defaults;
      }
      /**
       * Process markdown before marked
       */
      preprocess(markdown) {
        return markdown;
      }
      /**
       * Process HTML after marked is finished
       */
      postprocess(html2) {
        return html2;
      }
      /**
       * Process all tokens before walk tokens
       */
      processAllTokens(tokens) {
        return tokens;
      }
    }
    __publicField(_Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
      "preprocess",
      "postprocess",
      "processAllTokens"
    ]));
    class Marked {
      constructor(...args) {
        __privateAdd(this, _Marked_instances);
        __publicField(this, "defaults", _getDefaults());
        __publicField(this, "options", this.setOptions);
        __publicField(this, "parse", __privateMethod(this, _Marked_instances, parseMarkdown_fn).call(this, _Lexer.lex, _Parser.parse));
        __publicField(this, "parseInline", __privateMethod(this, _Marked_instances, parseMarkdown_fn).call(this, _Lexer.lexInline, _Parser.parseInline));
        __publicField(this, "Parser", _Parser);
        __publicField(this, "Renderer", _Renderer);
        __publicField(this, "TextRenderer", _TextRenderer);
        __publicField(this, "Lexer", _Lexer);
        __publicField(this, "Tokenizer", _Tokenizer);
        __publicField(this, "Hooks", _Hooks);
        this.use(...args);
      }
      /**
       * Run callback for every token
       */
      walkTokens(tokens, callback) {
        var _a, _b;
        let values = [];
        for (const token of tokens) {
          values = values.concat(callback.call(this, token));
          switch (token.type) {
            case "table": {
              const tableToken = token;
              for (const cell of tableToken.header) {
                values = values.concat(this.walkTokens(cell.tokens, callback));
              }
              for (const row of tableToken.rows) {
                for (const cell of row) {
                  values = values.concat(this.walkTokens(cell.tokens, callback));
                }
              }
              break;
            }
            case "list": {
              const listToken = token;
              values = values.concat(this.walkTokens(listToken.items, callback));
              break;
            }
            default: {
              const genericToken = token;
              if ((_b = (_a = this.defaults.extensions) == null ? void 0 : _a.childTokens) == null ? void 0 : _b[genericToken.type]) {
                this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                  const tokens2 = genericToken[childTokens].flat(Infinity);
                  values = values.concat(this.walkTokens(tokens2, callback));
                });
              } else if (genericToken.tokens) {
                values = values.concat(this.walkTokens(genericToken.tokens, callback));
              }
            }
          }
        }
        return values;
      }
      use(...args) {
        const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
        args.forEach((pack) => {
          const opts = { ...pack };
          opts.async = this.defaults.async || opts.async || false;
          if (pack.extensions) {
            pack.extensions.forEach((ext) => {
              if (!ext.name) {
                throw new Error("extension name required");
              }
              if ("renderer" in ext) {
                const prevRenderer = extensions.renderers[ext.name];
                if (prevRenderer) {
                  extensions.renderers[ext.name] = function(...args2) {
                    let ret = ext.renderer.apply(this, args2);
                    if (ret === false) {
                      ret = prevRenderer.apply(this, args2);
                    }
                    return ret;
                  };
                } else {
                  extensions.renderers[ext.name] = ext.renderer;
                }
              }
              if ("tokenizer" in ext) {
                if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                  throw new Error("extension level must be 'block' or 'inline'");
                }
                const extLevel = extensions[ext.level];
                if (extLevel) {
                  extLevel.unshift(ext.tokenizer);
                } else {
                  extensions[ext.level] = [ext.tokenizer];
                }
                if (ext.start) {
                  if (ext.level === "block") {
                    if (extensions.startBlock) {
                      extensions.startBlock.push(ext.start);
                    } else {
                      extensions.startBlock = [ext.start];
                    }
                  } else if (ext.level === "inline") {
                    if (extensions.startInline) {
                      extensions.startInline.push(ext.start);
                    } else {
                      extensions.startInline = [ext.start];
                    }
                  }
                }
              }
              if ("childTokens" in ext && ext.childTokens) {
                extensions.childTokens[ext.name] = ext.childTokens;
              }
            });
            opts.extensions = extensions;
          }
          if (pack.renderer) {
            const renderer = this.defaults.renderer || new _Renderer(this.defaults);
            for (const prop in pack.renderer) {
              if (!(prop in renderer)) {
                throw new Error(`renderer '${prop}' does not exist`);
              }
              if (["options", "parser"].includes(prop)) {
                continue;
              }
              const rendererProp = prop;
              let rendererFunc = pack.renderer[rendererProp];
              const prevRenderer = renderer[rendererProp];
              renderer[rendererProp] = (...args2) => {
                if (!pack.useNewRenderer) {
                  rendererFunc = __privateMethod(this, _Marked_instances, convertRendererFunction_fn).call(this, rendererFunc, rendererProp, renderer);
                }
                let ret = rendererFunc.apply(renderer, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(renderer, args2);
                }
                return ret || "";
              };
            }
            opts.renderer = renderer;
          }
          if (pack.tokenizer) {
            const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
            for (const prop in pack.tokenizer) {
              if (!(prop in tokenizer)) {
                throw new Error(`tokenizer '${prop}' does not exist`);
              }
              if (["options", "rules", "lexer"].includes(prop)) {
                continue;
              }
              const tokenizerProp = prop;
              const tokenizerFunc = pack.tokenizer[tokenizerProp];
              const prevTokenizer = tokenizer[tokenizerProp];
              tokenizer[tokenizerProp] = (...args2) => {
                let ret = tokenizerFunc.apply(tokenizer, args2);
                if (ret === false) {
                  ret = prevTokenizer.apply(tokenizer, args2);
                }
                return ret;
              };
            }
            opts.tokenizer = tokenizer;
          }
          if (pack.hooks) {
            const hooks = this.defaults.hooks || new _Hooks();
            for (const prop in pack.hooks) {
              if (!(prop in hooks)) {
                throw new Error(`hook '${prop}' does not exist`);
              }
              if (prop === "options") {
                continue;
              }
              const hooksProp = prop;
              const hooksFunc = pack.hooks[hooksProp];
              const prevHook = hooks[hooksProp];
              if (_Hooks.passThroughHooks.has(prop)) {
                hooks[hooksProp] = (arg) => {
                  if (this.defaults.async) {
                    return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                      return prevHook.call(hooks, ret2);
                    });
                  }
                  const ret = hooksFunc.call(hooks, arg);
                  return prevHook.call(hooks, ret);
                };
              } else {
                hooks[hooksProp] = (...args2) => {
                  let ret = hooksFunc.apply(hooks, args2);
                  if (ret === false) {
                    ret = prevHook.apply(hooks, args2);
                  }
                  return ret;
                };
              }
            }
            opts.hooks = hooks;
          }
          if (pack.walkTokens) {
            const walkTokens2 = this.defaults.walkTokens;
            const packWalktokens = pack.walkTokens;
            opts.walkTokens = function(token) {
              let values = [];
              values.push(packWalktokens.call(this, token));
              if (walkTokens2) {
                values = values.concat(walkTokens2.call(this, token));
              }
              return values;
            };
          }
          this.defaults = { ...this.defaults, ...opts };
        });
        return this;
      }
      setOptions(opt) {
        this.defaults = { ...this.defaults, ...opt };
        return this;
      }
      lexer(src, options2) {
        return _Lexer.lex(src, options2 ?? this.defaults);
      }
      parser(tokens, options2) {
        return _Parser.parse(tokens, options2 ?? this.defaults);
      }
    }
    _Marked_instances = new WeakSet();
    // TODO: Remove this in next major release
    convertRendererFunction_fn = function(func, prop, renderer) {
      switch (prop) {
        case "heading":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, renderer.parser.parseInline(token.tokens), token.depth, unescape(renderer.parser.parseInline(token.tokens, renderer.parser.textRenderer)));
          };
        case "code":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, token.text, token.lang, !!token.escaped);
          };
        case "table":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            let header = "";
            let cell = "";
            for (let j = 0; j < token.header.length; j++) {
              cell += this.tablecell({
                text: token.header[j].text,
                tokens: token.header[j].tokens,
                header: true,
                align: token.align[j]
              });
            }
            header += this.tablerow({ text: cell });
            let body = "";
            for (let j = 0; j < token.rows.length; j++) {
              const row = token.rows[j];
              cell = "";
              for (let k = 0; k < row.length; k++) {
                cell += this.tablecell({
                  text: row[k].text,
                  tokens: row[k].tokens,
                  header: false,
                  align: token.align[k]
                });
              }
              body += this.tablerow({ text: cell });
            }
            return func.call(this, header, body);
          };
        case "blockquote":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            const body = this.parser.parse(token.tokens);
            return func.call(this, body);
          };
        case "list":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            const ordered = token.ordered;
            const start = token.start;
            const loose = token.loose;
            let body = "";
            for (let j = 0; j < token.items.length; j++) {
              const item = token.items[j];
              const checked = item.checked;
              const task = item.task;
              let itemBody = "";
              if (item.task) {
                const checkbox = this.checkbox({ checked: !!checked });
                if (loose) {
                  if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                    item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                      item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                    }
                  } else {
                    item.tokens.unshift({
                      type: "text",
                      text: checkbox + " "
                    });
                  }
                } else {
                  itemBody += checkbox + " ";
                }
              }
              itemBody += this.parser.parse(item.tokens, loose);
              body += this.listitem({
                type: "list_item",
                raw: itemBody,
                text: itemBody,
                task,
                checked: !!checked,
                loose,
                tokens: item.tokens
              });
            }
            return func.call(this, body, ordered, start);
          };
        case "html":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, token.text, token.block);
          };
        case "paragraph":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, this.parser.parseInline(token.tokens));
          };
        case "escape":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, token.text);
          };
        case "link":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, token.href, token.title, this.parser.parseInline(token.tokens));
          };
        case "image":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, token.href, token.title, token.text);
          };
        case "strong":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, this.parser.parseInline(token.tokens));
          };
        case "em":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, this.parser.parseInline(token.tokens));
          };
        case "codespan":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, token.text);
          };
        case "del":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, this.parser.parseInline(token.tokens));
          };
        case "text":
          return function(token) {
            if (!token.type || token.type !== prop) {
              return func.apply(this, arguments);
            }
            return func.call(this, token.text);
          };
      }
      return func;
    };
    parseMarkdown_fn = function(lexer2, parser2) {
      return (src, options2) => {
        const origOpt = { ...options2 };
        const opt = { ...this.defaults, ...origOpt };
        if (this.defaults.async === true && origOpt.async === false) {
          if (!opt.silent) {
            console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
          }
          opt.async = true;
        }
        const throwError = __privateMethod(this, _Marked_instances, onError_fn).call(this, !!opt.silent, !!opt.async);
        if (typeof src === "undefined" || src === null) {
          return throwError(new Error("marked(): input parameter is undefined or null"));
        }
        if (typeof src !== "string") {
          return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
        }
        if (opt.hooks) {
          opt.hooks.options = opt;
        }
        if (opt.async) {
          return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
        }
        try {
          if (opt.hooks) {
            src = opt.hooks.preprocess(src);
          }
          let tokens = lexer2(src, opt);
          if (opt.hooks) {
            tokens = opt.hooks.processAllTokens(tokens);
          }
          if (opt.walkTokens) {
            this.walkTokens(tokens, opt.walkTokens);
          }
          let html2 = parser2(tokens, opt);
          if (opt.hooks) {
            html2 = opt.hooks.postprocess(html2);
          }
          return html2;
        } catch (e) {
          return throwError(e);
        }
      };
    };
    onError_fn = function(silent, async) {
      return (e) => {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (silent) {
          const msg = "<p>An error occurred:</p><pre>" + escape$1(e.message + "", true) + "</pre>";
          if (async) {
            return Promise.resolve(msg);
          }
          return msg;
        }
        if (async) {
          return Promise.reject(e);
        }
        throw e;
      };
    };
    const markedInstance = new Marked();
    function marked(src, opt) {
      return markedInstance.parse(src, opt);
    }
    marked.options = marked.setOptions = function(options2) {
      markedInstance.setOptions(options2);
      marked.defaults = markedInstance.defaults;
      changeDefaults(marked.defaults);
      return marked;
    };
    marked.getDefaults = _getDefaults;
    marked.defaults = exports2.defaults;
    marked.use = function(...args) {
      markedInstance.use(...args);
      marked.defaults = markedInstance.defaults;
      changeDefaults(marked.defaults);
      return marked;
    };
    marked.walkTokens = function(tokens, callback) {
      return markedInstance.walkTokens(tokens, callback);
    };
    marked.parseInline = markedInstance.parseInline;
    marked.Parser = _Parser;
    marked.parser = _Parser.parse;
    marked.Renderer = _Renderer;
    marked.TextRenderer = _TextRenderer;
    marked.Lexer = _Lexer;
    marked.lexer = _Lexer.lex;
    marked.Tokenizer = _Tokenizer;
    marked.Hooks = _Hooks;
    marked.parse = marked;
    const options = marked.options;
    const setOptions = marked.setOptions;
    const use = marked.use;
    const walkTokens = marked.walkTokens;
    const parseInline = marked.parseInline;
    const parse = marked;
    const parser = _Parser.parse;
    const lexer = _Lexer.lex;
    exports2.Hooks = _Hooks;
    exports2.Lexer = _Lexer;
    exports2.Marked = Marked;
    exports2.Parser = _Parser;
    exports2.Renderer = _Renderer;
    exports2.TextRenderer = _TextRenderer;
    exports2.Tokenizer = _Tokenizer;
    exports2.getDefaults = _getDefaults;
    exports2.lexer = lexer;
    exports2.marked = marked;
    exports2.options = options;
    exports2.parse = parse;
    exports2.parseInline = parseInline;
    exports2.parser = parser;
    exports2.setOptions = setOptions;
    exports2.use = use;
    exports2.walkTokens = walkTokens;
  });
})(marked_umd, marked_umd.exports);
var oramaMarkdownCss = ":host{color:#838289;color:var(--text-color-secondary,#838289)}.orama-markdown-wrapper>:first-child{margin-top:0;padding-top:0}a,li,p{font-size:1rem;font-size:var(--font-size-md,calc(16rem/var(--orama-base-font-size, 16)));line-height:1.5;line-height:var(--font-line-height-md,1.5)}blockquote,ol,ul{margin:0 0 .25rem .25rem;margin:0 0 var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16))) var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));padding:0 0 0 .25rem;padding:0 0 0 var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));padding-inline-start:1rem;padding-inline-start:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}blockquote{border-left:.25rem solid #dadada;border-left:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16))) solid var(--border-color-primary,#dadada)}p>code{margin:0 .25rem;margin:0 var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)))}pre>code{position:relative}a{color:#151515;color:var(--text-color-primary,#151515);font-weight:700;opacity:.9;text-decoration:underline}a:hover{opacity:1}.orama-markdown-pre{position:relative}.orama-markdown-code{border-radius:.5rem;border-radius:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16)))}.orama-markdown-code-title{color:#151515;color:var(--text-color-primary,#151515);display:block;font-size:.625rem;font-size:var(--font-size-xxs,calc(10rem/var(--orama-base-font-size, 16)));opacity:.5;padding:.5rem 0;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16))) 0}";
var OramaMarkdownStyle0 = oramaMarkdownCss;
window.hljs = hljs;
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if ("href" in node) {
    node.setAttribute("target", "_parent");
    node.setAttribute("rel", "noopener");
  }
});
var SUPPORTED_HLJS_LANGUAGES = Object.fromEntries(SUPPORTED_HLJS_LANGUAGES_ARRAY.map((language) => [language, { error: false, retries: 0 }]));
var LANGUAGES_MAPPING = {
  html: "xml"
};
async function loadLanguageAndHighlight(language) {
  const localCachedLanguage = SUPPORTED_HLJS_LANGUAGES[language];
  if (!localCachedLanguage) {
    return false;
  }
  if (localCachedLanguage.error && localCachedLanguage.retries >= 5) {
    return false;
  }
  try {
    const response = await fetch(`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/${language}.min.js`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${language} language: ${response.statusText}`);
    }
    const scriptContent = await response.text();
    const loadScript = new Function(scriptContent);
    await loadScript();
    if (!hljs.getLanguage(language)) {
      throw new Error(`Even after executing grammar script, ${language} language was not registered`);
    }
    localCachedLanguage.retries = 0;
    localCachedLanguage.error = false;
    return true;
  } catch (e) {
    localCachedLanguage.error = true;
    localCachedLanguage.retries++;
    return false;
  }
}
var OramaMarkdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.chatMarkdownLinkClicked = createEvent(this, "chatMarkdownLinkClicked", 7);
    this.parseMarkdown = async () => {
      if (!this.content) {
        return;
      }
      const noZeroWidthCharsContent = this.content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "");
      const highlightedCode = await marked_umd.exports.marked.parse(noZeroWidthCharsContent);
      this.divElement.innerHTML = DOMPurify.sanitize(highlightedCode);
      const mk = this.markdownElement.shadowRoot.querySelectorAll(".orama-markdown-code");
      const pedningBlocksByLanguage = {};
      for (let i = 0; i < mk.length; i++) {
        const codeBlockRef = mk[i];
        if (codeBlockRef.hasAttribute("data-highlighted")) {
          continue;
        }
        const languageClassName = codeBlockRef.className.split(" ").find((className) => className.startsWith("language-"));
        const language = languageClassName.substring("language-".length);
        pedningBlocksByLanguage[language] = true;
      }
      for (const pendingLanguage of Object.keys(pedningBlocksByLanguage)) {
        loadLanguageAndHighlight(pendingLanguage).then(() => {
          const parsedContent = marked_umd.exports.marked.parse(noZeroWidthCharsContent);
          this.divElement.innerHTML = DOMPurify.sanitize(parsedContent);
        });
      }
    };
    this.content = void 0;
    this.chatMarkdownLinkTitle = void 0;
    this.chatMarkdownLinkHref = void 0;
    this.chatMarkdownLinkTarget = void 0;
  }
  onContentChange() {
    this.parseMarkdown();
  }
  handleMarkdownLinkClicked(originalOnClickEvent) {
    const htmlElement = originalOnClickEvent.target;
    const chatMarkdownLinkClicked = this.chatMarkdownLinkClicked.emit({
      text: htmlElement.innerText,
      href: htmlElement.href
    });
    if (chatMarkdownLinkClicked.defaultPrevented) {
      originalOnClickEvent.preventDefault();
      return;
    }
  }
  componentDidLoad() {
    marked_umd.exports.marked.use({
      useNewRenderer: true,
      renderer: {
        link: (token) => {
          var _a, _b, _c, _d, _e;
          const link = document.createElement("a");
          link.innerHTML = (_b = (_a = this.chatMarkdownLinkTitle) === null || _a === void 0 ? void 0 : _a.call(this, { href: token.href, text: token.text })) !== null && _b !== void 0 ? _b : token.text;
          link.href = (_d = (_c = this.chatMarkdownLinkHref) === null || _c === void 0 ? void 0 : _c.call(this, { href: token.href, text: token.text })) !== null && _d !== void 0 ? _d : token.href;
          if (this.chatMarkdownLinkTarget) {
            link.target = (_e = this.chatMarkdownLinkTarget) === null || _e === void 0 ? void 0 : _e.call(this, { href: token.href, text: token.text });
          }
          return link.outerHTML;
        },
        code: (token) => {
          const mappedLanguage = LANGUAGES_MAPPING[token.lang] || token.lang;
          const actualLanguage = SUPPORTED_HLJS_LANGUAGES[mappedLanguage] ? mappedLanguage : "plaintext";
          const pre = document.createElement("pre");
          pre.classList.add("orama-markdown-pre");
          const codeTitle = document.createElement("div");
          codeTitle.classList.add("orama-markdown-code-title");
          pre.appendChild(codeTitle);
          const code = document.createElement("code");
          code.classList.add("orama-markdown-code");
          code.classList.add(`language-${actualLanguage}`);
          code.classList.add("hljs");
          pre.appendChild(code);
          const hljsLanguage = hljs.getLanguage(actualLanguage);
          if (hljsLanguage) {
            if (actualLanguage === "plaintext") {
              codeTitle.innerHTML = "";
            } else {
              codeTitle.innerHTML = hljsLanguage.name;
            }
            code.innerHTML = hljs.highlight(token.text, { language: actualLanguage, ignoreIllegals: true }).value;
            code.dataset.highlighted = "yes";
          } else {
            codeTitle.innerHTML = " ";
            code.innerHTML = token.text;
          }
          return pre.outerHTML;
        },
        codespan: (token) => {
          const code = document.createElement("code");
          code.classList.add("orama-markdown-inline-code");
          code.innerHTML = token.text;
          return code.outerHTML;
        }
      }
    });
    this.parseMarkdown();
  }
  render() {
    return h("host", { key: "8feaa85555e4b1eee91ef960ce1f1cf4c2d148d9" }, h("link", { key: "2d3ee4a1a43b2e361eca9a86caceb35cfb510472", rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/styles/atom-one-dark.min.css" }), h("div", { key: "7f42b169b5a7fddd5abd1af1dd7aa07ea30449d0", class: "orama-markdown-wrapper", ref: (ref) => {
      this.divElement = ref;
    }, onClick: (event) => {
      const htmlEvent = event.target;
      if (htmlEvent.tagName === "A") {
        this.handleMarkdownLinkClicked(event);
      }
    } }));
  }
  get markdownElement() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "content": ["onContentChange"]
    };
  }
};
OramaMarkdown.style = OramaMarkdownStyle0;
var u = Object.defineProperty;
var d = Object.getOwnPropertyDescriptor;
var s2 = (o2, l2, a2, i) => {
  for (var r = i > 1 ? void 0 : i ? d(l2, a2) : l2, h2 = o2.length - 1, n2; h2 >= 0; h2--)
    (n2 = o2[h2]) && (r = (i ? n2(l2, a2, r) : n2(r)) || r);
  return i && r && u(l2, a2, r), r;
};
var t = class extends n {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var o2;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"/>`
  ],
  [
    "light",
    tt`<path d="M180.24,132.24l-80,80a6,6,0,0,1-8.48-8.48L167.51,128,91.76,52.24a6,6,0,0,1,8.48-8.48l80,80A6,6,0,0,1,180.24,132.24Z"/>`
  ],
  [
    "regular",
    tt`<path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>`
  ],
  [
    "bold",
    tt`<path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"/>`
  ],
  [
    "fill",
    tt`<path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M176,128,96,208V48Z" opacity="0.2"/><path d="M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34ZM104,188.69V67.31L164.69,128Z"/>`
  ]
]);
t.styles = p$3`
    :host {
      display: contents;
    }
  `;
s2([
  O({ type: String, reflect: true })
], t.prototype, "size", 2);
s2([
  O({ type: String, reflect: true })
], t.prototype, "weight", 2);
s2([
  O({ type: String, reflect: true })
], t.prototype, "color", 2);
s2([
  O({ type: Boolean, reflect: true })
], t.prototype, "mirrored", 2);
t = s2([
  s("ph-caret-right")
], t);
var oramaSourcesCss = ".sources-outer-wrapper{margin:0 .5rem .75rem 1rem;margin:0 var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16))) var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16))) var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)));overflow:hidden;position:relative}.source-next{left:0}.carousel-arrow,.source-next{bottom:0;position:absolute;top:0}.carousel-arrow{align-items:center;border:none;color:#838289;color:var(--text-color-secondary,#838289);cursor:pointer;display:flex;font-size:1.125rem;font-size:calc(18rem/var(--orama-base-font-size, 16));height:-moz-fit-content;height:fit-content;height:100%;justify-content:center;margin-block:auto;opacity:1;padding:0 .75rem;padding:0 var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));transition:color .2s,opacity .2s;z-index:1}.carousel-arrow.hidden{opacity:0;pointer-events:none}.carousel-arrow:focus:not(.hidden),.carousel-arrow:hover:not(.hidden){color:#151515;color:var(--text-color-primary,#151515)}.carousel-arrow--prev{background:linear-gradient(-90deg,transparent,70%,#fbfbfb);background:linear-gradient(-90deg,transparent,70%,var(--background-color-primary,#fbfbfb));left:0}.carousel-arrow--next{background:linear-gradient(90deg,transparent,30%,#fbfbfb);background:linear-gradient(90deg,transparent,30%,var(--background-color-primary,#fbfbfb));right:0}.sources-wrapper{display:flex;overflow-x:auto;overflow-x:scroll;position:relative;scroll-behavior:smooth;scrollbar-width:none}.source{background:#fff;background:var(--background-color-secondary,#fff);border-radius:.5rem;border-radius:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16)));flex-grow:0;flex-shrink:0;overflow:hidden;padding:.75rem;padding:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));position:relative;text-decoration:none;transition:background .2s ease-in-out;width:12.1875rem;width:calc(195rem/var(--orama-base-font-size, 16))}.source .source-subtitle,.source .source-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media (hover:hover){.source:hover{background:#eee9f6;background:var(--background-color-tertiary,#eee9f6)}}.source-inner-wrapper{display:flex;padding-right:.5rem;padding-right:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));position:relative}.source-inner-wrapper:last-of-type{padding-right:1rem;padding-right:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}.sr-only{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}";
var OramaSourcesStyle0 = oramaSourcesCss;
var SOURCE_BOX_OFFSET = 0;
var OramaSources = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.answerSourceClick = createEvent(this, "answerSourceClick", 7);
    this.handleCarouselScroll = () => {
      this.computeCarouselArrowsVisibility();
    };
    this.handleItemClick = (originalOnClickEvent, item) => {
      const answerSourceClick = this.answerSourceClick.emit({ source: item });
      if (answerSourceClick.defaultPrevented) {
        originalOnClickEvent.preventDefault();
        return;
      }
      if (!(item === null || item === void 0 ? void 0 : item.path)) {
        throw new Error("No path found");
      }
    };
    this.resizeObserver = new ResizeObserver(() => {
      this.computeCarouselArrowsVisibility();
    });
    this.sources = void 0;
    this.sourceBaseURL = "";
    this.linksTarget = "_blank";
    this.linksRel = "noopener noreferrer";
    this.sourcesMap = {
      title: "title",
      description: "description",
      path: "path"
    };
    this.isCarouselScrollAtEnd = false;
    this.isCarouselScrollAtStart = false;
  }
  // TODO: Move this to utils
  buildUrl(path) {
    if (!path) {
      return "#";
    }
    if (this.sourceBaseURL) {
      const sanitizedBaseUrl = this.sourceBaseURL.replace(/\/+$/, "");
      const sanitizedPath = path.replace(/^\/+/, "");
      return `${sanitizedBaseUrl}/${sanitizedPath}`;
    }
    return path;
  }
  getNextItemCarousel(container, items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemRect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (itemRect.right - SOURCE_BOX_OFFSET > containerRect.right) {
        return item;
      }
    }
    return null;
  }
  getPreviousItemCarousel(container, items) {
    var _a;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemRect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (itemRect.left + SOURCE_BOX_OFFSET >= containerRect.left && itemRect.right - SOURCE_BOX_OFFSET <= containerRect.right) {
        return (_a = items[i - 1]) !== null && _a !== void 0 ? _a : null;
      } else if (itemRect.left - SOURCE_BOX_OFFSET < containerRect.right && itemRect.right - SOURCE_BOX_OFFSET > containerRect.right) {
        return item;
      }
    }
    return null;
  }
  handleCarouselMove(direction) {
    const carousel = this.carouselSourceRef;
    if (!carousel) {
      return;
    }
    const items = carousel.getElementsByClassName("source-inner-wrapper");
    if (direction === "forward") {
      const nextItemCarousel = this.getNextItemCarousel(carousel, items);
      if (nextItemCarousel) {
        nextItemCarousel.scrollIntoView({
          behavior: "smooth",
          inline: "end",
          block: "nearest"
        });
      }
    } else {
      const previousItemCarousel = this.getPreviousItemCarousel(carousel, items);
      if (previousItemCarousel) {
        previousItemCarousel.scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest"
        });
      }
    }
  }
  computeCarouselArrowsVisibility() {
    const carousel = this.carouselSourceRef;
    if (!carousel) {
      return;
    }
    const items = carousel.getElementsByClassName("source-inner-wrapper");
    this.isCarouselScrollAtEnd = !this.getNextItemCarousel(carousel, items);
    this.isCarouselScrollAtStart = !this.getPreviousItemCarousel(carousel, items);
  }
  componentDidLoad() {
    var _a;
    (_a = this.carouselSourceRef) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", this.handleCarouselScroll);
    this.computeCarouselArrowsVisibility();
    if (this.carouselSourceRef) {
      this.resizeObserver.observe(this.carouselSourceRef);
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.carouselSourceRef) === null || _a === void 0 ? void 0 : _a.removeEventListener("scroll", this.handleCarouselScroll);
    this.resizeObserver.disconnect();
  }
  hasHorizontalOverflow(element) {
    if (!element) {
      return false;
    }
    return element.scrollWidth > element.clientWidth;
  }
  render() {
    var _a;
    if (!((_a = this.sources) === null || _a === void 0 ? void 0 : _a.length)) {
      return;
    }
    return h("host", null, h("div", { class: {
      "sources-outer-wrapper": true,
      "oveflow-decorator": this.hasHorizontalOverflow(this.carouselSourceRef)
    } }, h("h2", { class: "sr-only" }, "Sources"), h("button", { class: { "carousel-arrow carousel-arrow--prev": true, hidden: this.isCarouselScrollAtStart }, onClick: () => this.handleCarouselMove("backwards"), type: "button" }, h("ph-caret-left", null)), h("button", { class: { "carousel-arrow carousel-arrow--next": true, hidden: this.isCarouselScrollAtEnd }, onClick: () => this.handleCarouselMove("forward"), type: "button" }, h("ph-caret-right", null)), h("div", { class: "sources-wrapper", ref: (el) => {
      this.carouselSourceRef = el;
    } }, this.sources.map((source2, index) => {
      const showSources = !!source2[this.sourcesMap.title] && !!source2[this.sourcesMap.path] || !!source2[this.sourcesMap.description] && !!source2[this.sourcesMap.path];
      if (!showSources)
        return;
      return h("div", {
        class: "source-inner-wrapper",
        // biome-ignore lint/suspicious/noArrayIndexKey: we do not have id for sources
        key: `source-${index}`,
        style: {
          position: "relative",
          display: "flex"
        }
      }, h("a", { href: this.buildUrl(source2[this.sourcesMap.path]), class: "source", target: this.linksTarget, rel: this.linksRel, id: `source-${index}`, onClick: (onClickEvent) => this.handleItemClick(onClickEvent, source2) }, h("orama-text", { as: "h3", styledAs: "span", class: "source-title" }, source2[this.sourcesMap.title]), h("orama-text", { as: "p", styledAs: "span", class: "source-subtitle", variant: "tertiary" }, source2[this.sourcesMap.description])));
    }))));
  }
};
OramaSources.style = OramaSourcesStyle0;
var oramaSuggestionsCss = ".suggestions-chips.sc-orama-suggestions{align-items:center;display:flex;gap:.75rem;gap:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));list-style:none;margin:0;overflow-x:auto;padding:.5rem 1rem;padding:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16))) var(--radius-l,calc(16rem/var(--orama-base-font-size, 16)))}.suggestions-chips.sc-orama-suggestions::-webkit-scrollbar{background-color:transparent;height:0}@media (min-width:768.02px){.suggestions-chips.sc-orama-suggestions{flex-wrap:wrap;justify-content:center}}.suggestion-button-chips.sc-orama-suggestions{align-items:center;background-color:#fff;background-color:var(--background-color-secondary,#fff);border:1px solid #dadada;border:1px solid var(--border-color-primary,#dadada);border-radius:1rem;border-radius:var(--radius-l,calc(16rem/var(--orama-base-font-size, 16)));color:#151515;color:var(--text-color-primary,#151515);color:#838289;color:var(--text-color-secondary,#838289);-moz-column-gap:.5rem;column-gap:.5rem;-moz-column-gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));column-gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));cursor:pointer;display:flex;font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.25;line-height:var(--font-line-height-s,1.25);margin:0;padding:.5rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));transition:background-color .2s;width:-moz-max-content;width:max-content}@media (hover:hover){.suggestion-button-chips.sc-orama-suggestions:hover{background-color:#eee9f6;background-color:var(--background-color-tertiary,#eee9f6)}}.suggestion-button-chips.sc-orama-suggestions:focus-visible{border:1px solid #ae8ff7;border:1px solid var(--border-color-accent,#ae8ff7);outline:none}.suggestions-list.sc-orama-suggestions{align-items:center;display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}.suggestion-item-list.sc-orama-suggestions{width:100%}.suggestion-button-list.sc-orama-suggestions{align-items:center;background-color:transparent;background:linear-gradient(90deg,#ae8ff7,#151515);background:linear-gradient(90deg,var(--text-color-accent,#ae8ff7) 0,var(--text-color-primary,#151515) 100%);-webkit-background-clip:text;background-clip:text;color:#838289;color:var(--text-color-secondary,#838289);-moz-column-gap:.5rem;column-gap:.5rem;-moz-column-gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));column-gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));cursor:pointer;display:flex;font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));padding:.5rem .75rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16))) var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));text-align:left;-webkit-text-fill-color:transparent;border:1px solid transparent;font-family:inherit;width:100%}.suggestion-button-list.sc-orama-suggestions:focus-visible{border:1px solid #ae8ff7;border:1px solid var(--border-color-accent,#ae8ff7);border-radius:.5rem;border-radius:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16)));outline:none}";
var OramaSuggestionsStyle0 = oramaSuggestionsCss;
var OramaSuggestions = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.suggestions = void 0;
    this.as = "chips";
    this.icon = void 0;
    this.suggestionClicked = void 0;
  }
  handleClick(suggestion) {
    if (!this.suggestionClicked) {
      return;
    }
    this.suggestionClicked(suggestion);
  }
  render() {
    var _a;
    const isChips = this.as === "chips";
    const isList = this.as === "list";
    const classSuffix = isChips ? "chips" : isList ? "list" : "";
    if (!((_a = this.suggestions) === null || _a === void 0 ? void 0 : _a.length)) {
      return null;
    }
    return h("ul", { class: `suggestions-${classSuffix}` }, this.suggestions.map((suggestion) => {
      return h("li", { key: suggestion.split(" ").join("-").toLowerCase(), class: `suggestion-item-${classSuffix}` }, h("button", { "focus-on-arrow-nav": true, type: "button", class: `suggestion-button-${classSuffix}`, onClick: (e) => {
        e.preventDefault();
        this.handleClick(suggestion);
      } }, this.icon, suggestion));
    }));
  }
};
OramaSuggestions.style = OramaSuggestionsStyle0;
export {
  OramaChatAssistentMessage as orama_chat_assistent_message,
  OramaChatUserMessage as orama_chat_user_message,
  DotsLoader as orama_dots_loader,
  OramaMarkdown as orama_markdown,
  OramaSources as orama_sources,
  OramaSuggestions as orama_suggestions
};
/*! Bundled license information:

@orama/wc-components/dist/esm/orama-chat-assistent-message_6.entry.js:
  (*! @license DOMPurify 3.1.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.6/LICENSE *)
*/
//# sourceMappingURL=orama-chat-assistent-message_6.entry-OCLO2EM5.js.map
