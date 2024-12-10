import "./chunk-VKA6KFGM.js";
import {
  Icon
} from "./chunk-M5WWNCVR.js";
import {
  getNonExplicitAttributes
} from "./chunk-HXUFFIHY.js";
import {
  O,
  Y,
  n,
  p$3,
  s,
  tt
} from "./chunk-OCFBAW7U.js";
import {
  Host,
  createEvent,
  getElement,
  h,
  registerInstance
} from "./chunk-6BI6LT3C.js";
import {
  __publicField
} from "./chunk-KT2WZD7D.js";

// node_modules/@orama/wc-components/dist/esm/orama-facets_3.entry.js
var oramaFacetsCss = ".facets-list.sc-orama-facets{align-items:center;-moz-column-gap:.5rem;column-gap:.5rem;-moz-column-gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));column-gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));display:flex;list-style:none;margin:0;overflow-x:auto;padding:1rem;padding:var(--radius-l,calc(16rem/var(--orama-base-font-size, 16)));scroll-snap-type:y mandatory}.facets-list.sc-orama-facets::-webkit-scrollbar{background-color:transparent;height:0}@media (min-width:1024.02px){.facets-list.sc-orama-facets{padding:1rem 0 .5rem;padding:var(--radius-l,calc(16rem/var(--orama-base-font-size, 16))) 0 var(--radius-s,calc(8rem/var(--orama-base-font-size, 16)))}}.facet.sc-orama-facets{scroll-snap-align:start}.facet-button.sc-orama-facets{background-color:transparent;border:1px solid #dadada;border:1px solid var(--border-color-primary,#dadada);border-radius:2.5rem;border-radius:var(--radius-3xl,calc(40rem/var(--orama-base-font-size, 16)));color:#151515;color:var(--text-color-primary,#151515);-moz-column-gap:.25rem;column-gap:.25rem;-moz-column-gap:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));column-gap:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));cursor:pointer;display:flex;font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.25;line-height:var(--font-line-height-s,1.25);margin:0;padding:.5rem .75rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16))) var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));width:-moz-max-content;width:max-content}.facet-button--selected.sc-orama-facets{border-color:#151515;border-color:var(--border-color-tertiary,#151515)}@media (min-width:1024.02px){.facet-button.sc-orama-facets{padding:.25rem .75rem;padding:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16))) var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)))}}.facet-button.sc-orama-facets:focus-visible{border-color:#ae8ff7;border-color:var(--border-color-accent,#ae8ff7);outline:none}.facet-count.sc-orama-facets{color:#99989d;color:var(--text-color-tertiary,#99989d)}";
var OramaFacetsStyle0 = oramaFacetsCss;
var OramaFacets = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.facets = void 0;
    this.selectedFacet = void 0;
    this.facetClicked = void 0;
  }
  handleClick(facet) {
    this.facetClicked(facet.name);
  }
  render() {
    var _a;
    if (!this.facets || this.facets.every((facet) => !facet.count)) {
      return null;
    }
    return h("ul", { class: "facets-list" }, (_a = this.facets) === null || _a === void 0 ? void 0 : _a.map((facet) => {
      if ((facet === null || facet === void 0 ? void 0 : facet.count) === 0) {
        return;
      }
      const isSelected = this.selectedFacet === (facet === null || facet === void 0 ? void 0 : facet.name) || !this.selectedFacet && (facet === null || facet === void 0 ? void 0 : facet.name) === "All";
      return h("li", { key: facet.name, class: "facet" }, h("button", { type: "button", class: {
        "facet-button": true,
        "facet-button--selected": isSelected
      }, tabIndex: isSelected ? 0 : -1, onClick: () => this.handleClick(facet) }, facet === null || facet === void 0 ? void 0 : facet.name, h("span", { class: "facet-count" }, facet === null || facet === void 0 ? void 0 : facet.count)));
    }));
  }
};
OramaFacets.style = OramaFacetsStyle0;
var oramaInputCss = ".sc-orama-input-h{margin:.5rem 0;margin:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16))) 0}.input-wrapper.sc-orama-input{position:relative}.input.sc-orama-input{background:#fff;background:var(--background-color-secondary,#fff);border:1px solid #dadada;border:1px solid var(--border-color-primary,#dadada);border-radius:.75rem;border-radius:var(--radius-m,calc(12rem/var(--orama-base-font-size, 16)));color:#151515;color:var(--text-color-primary,#151515);font-size:1rem;font-size:var(--font-size-md,calc(16rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.5;line-height:var(--font-line-height-m,1.5);margin:0;padding:0;width:100%}@media (min-width:768.02px){.input.sc-orama-input{font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)))}}.input.sc-orama-input::-moz-placeholder{color:#99989d;color:var(--text-color-inactive,#99989d)}.input.sc-orama-input::placeholder{color:#99989d;color:var(--text-color-inactive,#99989d)}.input[type=search].sc-orama-input{padding-right:2rem;padding-right:var(--spacing-2xl,calc(32rem/var(--orama-base-font-size, 16)))}@media (min-width:1024.02px){.input[type=search].sc-orama-input{border:0;border-bottom:1px solid #dadada;border-bottom:1px solid var(--border-color-primary,#dadada);padding-left:2.5rem;padding-left:var(--spacing-3xl,calc(40rem/var(--orama-base-font-size, 16)))}}.input[type=search].sc-orama-input::-webkit-search-cancel-button,.input[type=search].sc-orama-input::-webkit-search-decoration{-webkit-appearance:none;appearance:none}.input.sc-orama-input:focus{outline:none}.input.sc-orama-input:focus-visibile{border:1px solid #ae8ff7;border:1px solid var(--border-color-accent,#ae8ff7);outline:none}.input--small.sc-orama-input{padding:.25rem .5rem;padding:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16))) var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)))}.input--medium.sc-orama-input{padding:.5rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)))}.input--large.sc-orama-input{padding:.75rem;padding:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)))}.label.sc-orama-input{color:#151515;color:var(--text-color-primary,#151515);display:block;font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.25;line-height:var(--font-line-height-s,1.25);margin:0 0 .25rem;margin-bottom:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));padding:0}.reset-button.sc-orama-input{background-color:transparent;border:0;color:#99989d;color:var(--icon-color-inactive,#99989d);cursor:pointer;display:inline-flex;position:absolute;right:.5rem;right:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));top:50%;transform:translate3d(0,-50%,0)}.reset-button.sc-orama-input:focus{outline:none}.reset-button.sc-orama-input:focus-visible{border:1px solid #ae8ff7;border:1px solid var(--border-color-accent,#ae8ff7)}.search-icon.sc-orama-input{color:#99989d;color:var(--icon-color-inactive,#99989d);display:none;left:1rem;left:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)));position:absolute;top:50%;transform:translate3d(0,-50%,0);z-index:100}@media (min-width:1024.02px){.search-icon.sc-orama-input{display:inline-flex}}.sr-only.sc-orama-input{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}";
var OramaInputStyle0 = oramaInputCss;
var Input = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.resetValue = createEvent(this, "resetValue", 7);
    this.handleChange = (event) => {
      const target = event.target;
      this.value = target.value;
    };
    this.clearInputValue = () => {
      this.value = "";
      this.inputRef.focus();
      this.resetValue.emit();
    };
    this.name = void 0;
    this.size = "medium";
    this.label = void 0;
    this.type = "text";
    this.placeholder = void 0;
    this.labelForScreenReaders = void 0;
    this.defaultValue = void 0;
    this.autoFocus = false;
    this.inputRefReady = false;
    this.value = void 0;
  }
  handleAutoFocusChange() {
    var _a;
    if (this.autoFocus) {
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  ensureFocus() {
    const checkRefInterval = setInterval(() => {
      if (this.inputRef) {
        this.inputRef.focus();
        clearInterval(checkRefInterval);
      }
    }, 10);
  }
  componentShouldUpdate(newValue, oldValue, property) {
    if (property === "value" && newValue !== oldValue) {
      this.value = newValue;
      return true;
    }
    return false;
  }
  componentDidLoad() {
    if (this.autoFocus) {
      this.ensureFocus();
    }
  }
  render() {
    const inputClass = `input input--${this.size}`;
    const labelClass = `label ${this.labelForScreenReaders ? "sr-only" : ""}`;
    const declaredProps = [
      "id",
      "name",
      "type",
      "class",
      "onInput",
      "value",
      "label-for-screen-readers",
      "default-value",
      "placeholder"
    ];
    const inputProps = getNonExplicitAttributes(this.el, declaredProps);
    const isSearch = this.type === "search";
    return h(Host, { key: "25f1544031346a56461d4743e9543eebe80a4535" }, h("div", { key: "c58f8449947729f54c6acd6ecac048b2263f2bce", class: "wrapper" }, h("label", { key: "ddddded8aab0d18b4abe239d9694b57cb5413877", htmlFor: this.name, class: labelClass }, this.label || this.labelForScreenReaders), h("div", { key: "9bd9692745691e4579bfc7f50344191aefeef470", class: "input-wrapper" }, isSearch && h("span", { key: "2c8062fe4414aaf0b904612a49707a9381f4e55c", class: "search-icon" }, h("ph-magnifying-glass", { key: "7d75bd4d9d1fa0d7169ecf502adc25cda5fd5f2f", size: 16 })), h("input", Object.assign({ key: "0b2925d05367230537182c7c41907fd3bbcdce0f" }, inputProps, { ref: (el) => {
      this.inputRef = el;
      if (this.autoFocus && el) {
        this.inputRefReady = true;
      }
    }, class: inputClass, id: this.name, type: this.type, value: this.value, onInput: (event) => this.handleChange(event), placeholder: this.placeholder })), isSearch && !!this.value && h("button", { key: "14da609033e53e3f13e215496063991d74de6665", type: "button", class: "reset-button", onClick: this.clearInputValue }, h("ph-x", { key: "7d6cfe101f1ce0c86976ef6106d887799c0ff34c", size: 16 })))));
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "autoFocus": ["handleAutoFocusChange"]
    };
  }
};
Input.style = OramaInputStyle0;
var s2 = { caseSensitive: false, wholeWords: false, HTMLTag: "mark", CSSClass: "orama-highlight" };
var x = class {
  constructor(t = s2) {
    __publicField(this, "options");
    __publicField(this, "_positions", []);
    __publicField(this, "_HTML", "");
    __publicField(this, "_searchTerm", "");
    __publicField(this, "_originalText", "");
    this.options = { ...s2, ...t };
  }
  highlight(t, i) {
    this._searchTerm = i ?? "", this._originalText = t ?? "";
    let o = this.options.caseSensitive ?? s2.caseSensitive, e = this.options.wholeWords ?? s2.wholeWords, n3 = this.options.HTMLTag ?? s2.HTMLTag, h3 = this.options.CSSClass ?? s2.CSSClass, d = o ? "g" : "gi", p = e ? "\\b" : "", m = this.escapeRegExp(o ? this._searchTerm : this._searchTerm.toLowerCase()).trim().split(/\s+/).join("|"), g = new RegExp(`${p}${m}${p}`, d), T = [], r = [], a2, l = 0, u = -1;
    for (; (a2 = g.exec(this._originalText)) !== null && g.lastIndex !== u; ) {
      u = g.lastIndex;
      let c2 = a2.index, _ = c2 + a2[0].length - 1;
      T.push({ start: c2, end: _ }), r.push(this._originalText.slice(l, c2)), r.push(`<${n3} class="${h3}">${a2[0]}</${n3}>`), l = _ + 1;
    }
    return r.push(this._originalText.slice(l)), this._positions = T, this._HTML = r.join(""), this;
  }
  trim(t, i = true) {
    if (this._positions.length === 0) return `${this._HTML.substring(0, t)}${i ? "..." : ""}`;
    if (this._originalText.length <= t) return this._HTML;
    let o = this._positions[0].start, e = Math.max(o - Math.floor(t / 2), 0), n3 = Math.min(e + t, this._originalText.length), h3 = `${e === 0 || !i ? "" : "..."}${this._originalText.slice(e, n3)}${n3 < this._originalText.length && i ? "..." : ""}`;
    return this.highlight(h3, this._searchTerm), this._HTML;
  }
  get positions() {
    return this._positions;
  }
  get HTML() {
    return this._HTML;
  }
  escapeRegExp(t) {
    return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
};
var n2 = Object.defineProperty;
var c = Object.getOwnPropertyDescriptor;
var h2 = (r, s3, o, l) => {
  for (var t = l > 1 ? void 0 : l ? c(s3, o) : s3, V = r.length - 1, i; V >= 0; V--)
    (i = r[V]) && (t = (l ? i(s3, o, t) : i(t)) || t);
  return l && t && n2(s3, o, t), t;
};
var a = class extends n {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var r;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${a.weightsMap.get((r = this.weight) != null ? r : "regular")}
    </svg>`;
  }
};
a.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M210.83,69.17l-40-40A4,4,0,0,0,168,28H88A12,12,0,0,0,76,40V60H56A12,12,0,0,0,44,72V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V196h20a12,12,0,0,0,12-12V72A4,4,0,0,0,210.83,69.17ZM172,216a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V72a4,4,0,0,1,4-4h78.34L172,105.66Zm32-32a4,4,0,0,1-4,4H180V104a4,4,0,0,0-1.17-2.83l-40-40A4,4,0,0,0,136,60H84V40a4,4,0,0,1,4-4h78.34L204,73.66Zm-64-32a4,4,0,0,1-4,4H88a4,4,0,0,1,0-8h48A4,4,0,0,1,140,152Zm0,32a4,4,0,0,1-4,4H88a4,4,0,0,1,0-8h48A4,4,0,0,1,140,184Z"/>`
  ],
  [
    "light",
    tt`<path d="M212.24,67.76l-40-40A6,6,0,0,0,168,26H88A14,14,0,0,0,74,40V58H56A14,14,0,0,0,42,72V216a14,14,0,0,0,14,14H168a14,14,0,0,0,14-14V198h18a14,14,0,0,0,14-14V72A6,6,0,0,0,212.24,67.76ZM170,216a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V72a2,2,0,0,1,2-2h77.51L170,106.49Zm32-32a2,2,0,0,1-2,2H182V104a6,6,0,0,0-1.76-4.24l-40-40A6,6,0,0,0,136,58H86V40a2,2,0,0,1,2-2h77.51L202,74.49Zm-60-32a6,6,0,0,1-6,6H88a6,6,0,0,1,0-12h48A6,6,0,0,1,142,152Zm0,32a6,6,0,0,1-6,6H88a6,6,0,0,1,0-12h48A6,6,0,0,1,142,184Z"/>`
  ],
  [
    "regular",
    tt`<path d="M213.66,66.34l-40-40A8,8,0,0,0,168,24H88A16,16,0,0,0,72,40V56H56A16,16,0,0,0,40,72V216a16,16,0,0,0,16,16H168a16,16,0,0,0,16-16V200h16a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM168,216H56V72h76.69L168,107.31v84.53c0,.06,0,.11,0,.16s0,.1,0,.16V216Zm32-32H184V104a8,8,0,0,0-2.34-5.66l-40-40A8,8,0,0,0,136,56H88V40h76.69L200,75.31Zm-56-32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,152Zm0,32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,184Z"/>`
  ],
  [
    "bold",
    tt`<path d="M220.49,59.51l-40-40A12,12,0,0,0,172,16H92A20,20,0,0,0,72,36V56H56A20,20,0,0,0,36,76V216a20,20,0,0,0,20,20H164a20,20,0,0,0,20-20V196h20a20,20,0,0,0,20-20V68A12,12,0,0,0,220.49,59.51ZM160,212H60V80h67l33,33Zm40-40H184V108a12,12,0,0,0-3.51-8.49l-40-40A12,12,0,0,0,132,56H96V40h71l33,33Zm-56-28a12,12,0,0,1-12,12H88a12,12,0,0,1,0-24h44A12,12,0,0,1,144,144Zm0,40a12,12,0,0,1-12,12H88a12,12,0,0,1,0-24h44A12,12,0,0,1,144,184Z"/>`
  ],
  [
    "fill",
    tt`<path d="M213.66,66.34l-40-40A8,8,0,0,0,168,24H88A16,16,0,0,0,72,40V56H56A16,16,0,0,0,40,72V216a16,16,0,0,0,16,16H168a16,16,0,0,0,16-16V200h16a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM136,192H88a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm0-32H88a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm64,24H184V104a8,8,0,0,0-2.34-5.66l-40-40A8,8,0,0,0,136,56H88V40h76.69L200,75.31Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M208,72V184a8,8,0,0,1-8,8H176V104L136,64H80V40a8,8,0,0,1,8-8h80Z" opacity="0.2"/><path d="M213.66,66.34l-40-40A8,8,0,0,0,168,24H88A16,16,0,0,0,72,40V56H56A16,16,0,0,0,40,72V216a16,16,0,0,0,16,16H168a16,16,0,0,0,16-16V200h16a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM168,216H56V72h76.69L168,107.31v84.53c0,.06,0,.11,0,.16s0,.1,0,.16V216Zm32-32H184V104a8,8,0,0,0-2.34-5.66l-40-40A8,8,0,0,0,136,56H88V40h76.69L200,75.31Zm-56-32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,152Zm0,32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,184Z"/>`
  ]
]);
a.styles = p$3`
    :host {
      display: contents;
    }
  `;
h2([
  O({ type: String, reflect: true })
], a.prototype, "size", 2);
h2([
  O({ type: String, reflect: true })
], a.prototype, "weight", 2);
h2([
  O({ type: String, reflect: true })
], a.prototype, "color", 2);
h2([
  O({ type: Boolean, reflect: true })
], a.prototype, "mirrored", 2);
a = h2([
  s("ph-files")
], a);
var oramaSearchResultsCss = ".list.sc-orama-search-results{list-style:none;margin:0;padding:0}.section-list.sc-orama-search-results{gap:.75rem;gap:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));margin-top:.5rem;margin-top:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));padding-bottom:1rem;padding-bottom:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}.section-item-list.sc-orama-search-results,.section-list.sc-orama-search-results{display:flex;flex-direction:column}.section-wrapper.sc-orama-search-results{border-bottom:1px solid #dadada;border-bottom:1px solid var(--border-color-primary,#dadada);padding-bottom:.75rem;padding-bottom:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)))}.section-wrapper.sc-orama-search-results:last-of-type{border-bottom:none}.section-title-wrapper.sc-orama-search-results{padding:.5rem .75rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16))) var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));text-transform:capitalize}.section-title-wrapper.sc-orama-search-results *.sc-orama-search-results{color:#838289;color:var(--text-text-color-secondary,#838289)}.list-item.sc-orama-search-results{cursor:pointer}.list-item-button.sc-orama-search-results{align-items:center;background-color:#fff;background-color:var(--background-color-secondary,#fff);border:1px solid transparent;border-radius:.5rem;border-radius:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16)));cursor:pointer;display:flex;font-family:inherit;gap:.75rem;gap:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));padding:.75rem;padding:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));position:relative;text-align:left;text-decoration:none;transition:background-color .2s}@media (hover:hover){.list-item-button.sc-orama-search-results:hover{background-color:#eee9f6;background-color:var(--background-color-tertiary,#eee9f6)}}.list-item-button.sc-orama-search-results:focus-visible{border:1px solid #ae8ff7;border:1px solid var(--border-color-accent,#ae8ff7);outline:none}.collapsed.sc-orama-search-results{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.result-title.sc-orama-search-results{color:#151515;color:var(--text-color-primary,#151515)}.result-description.sc-orama-search-results{color:#99989d;color:var(--text-color-tertiary,#99989d)}.results-empty.sc-orama-search-results{margin:2rem auto 2.5rem;margin:calc(32rem/var(--orama-base-font-size, 16)) auto calc(40rem/var(--orama-base-font-size, 16));max-width:25rem;max-width:calc(400rem/var(--orama-base-font-size, 16));text-align:center;width:80%}.suggestions-wrapper.sc-orama-search-results{padding:1rem 0 .75rem;padding:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16))) 0 var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16))) 0}.suggestions-title.sc-orama-search-results{margin-bottom:.25rem;margin-bottom:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));padding:0 .5rem;padding:0 var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));text-transform:uppercase}.textWrapper.sc-orama-search-results{display:flex;flex-direction:column;flex-grow:1;overflow:hidden}ph-files.sc-orama-search-results{color:#151515;color:var(--icon-color-primary,#151515)}";
var OramaSearchResultsStyle0 = oramaSearchResultsCss;
var SearchResults = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.searchResultClick = createEvent(this, "searchResultClick", 7);
    this.handleItemClick = (originalOnClickEvent, item) => {
      const searchResultClick = this.searchResultClick.emit({ result: item });
      if (searchResultClick.defaultPrevented) {
        originalOnClickEvent.preventDefault();
        return;
      }
      if (!(item === null || item === void 0 ? void 0 : item.path)) {
        throw new Error("No path found");
      }
    };
    this.getItemLinkUrl = (item) => {
      if (item === null || item === void 0 ? void 0 : item.path) {
        return this.sourceBaseUrl ? `${this.sourceBaseUrl}${item.path}` : item.path;
      }
      return "#";
    };
    this.getHighlightedTitleText = (text) => {
      return this.highlighterTitle.highlight(text, this.searchTerm);
    };
    this.getHighlightedDescriptionText = (text) => {
      return this.highlighterDescription.highlight(text, this.searchTerm);
    };
    this.sourceBaseUrl = void 0;
    this.linksTarget = "_blank";
    this.linksRel = "noopener noreferrer";
    this.sections = [];
    this.suggestions = [];
    this.searchTerm = void 0;
    this.setChatTerm = void 0;
    this.loading = false;
    this.error = false;
    this.highlightTitle = false;
    this.highlightDescription = false;
  }
  buildUrl(path) {
    if (!path) {
      return "#";
    }
    if (this.sourceBaseUrl) {
      const sanitizedBaseUrl = this.sourceBaseUrl.replace(/\/+$/, "");
      const sanitizedPath = path.replace(/^\/+/, "");
      return `${sanitizedBaseUrl}/${sanitizedPath}`;
    }
    return path;
  }
  componentDidLoad() {
    if (this.highlightTitle) {
      this.highlighterTitle = new x(this.highlightTitle);
    }
    if (this.highlightDescription) {
      this.highlighterDescription = new x(this.highlightDescription);
    }
  }
  render() {
    var _a, _b;
    if (!this.searchTerm) {
      return h("div", { class: "suggestions-wrapper" }, !!((_a = this.suggestions) === null || _a === void 0 ? void 0 : _a.length) && h("orama-text", { as: "h2", styledAs: "small", class: "suggestions-title", variant: "secondary" }, "Suggestions"), h("orama-suggestions", { as: "list", suggestions: this.suggestions, icon: h(Icon, { name: "starFour", size: 16, color: "var(--text-color-accent, text-color('accent')" }), suggestionClicked: (term) => {
        this.setChatTerm(term);
      } }));
    }
    if (this.error) {
      return h("div", null, "An error occurred while trying to search. Please try again.");
    }
    if (!this.loading && !((_b = this.sections) === null || _b === void 0 ? void 0 : _b.some((section) => section.items.length > 0))) {
      return h("div", { class: "results-empty" }, h("orama-text", { as: "h3", styledAs: "span" }, `No results found ${this.searchTerm ? `for "${this.searchTerm}"` : ""}`));
    }
    return h(Host, null, h("ul", { class: "list section-list" }, this.sections.map((section) => h("div", { key: section.section, class: "section-wrapper" }, section.section && h("div", { class: "section-title-wrapper" }, h("orama-text", { as: "h2", styledAs: "span" }, section.section)), h("ul", { class: "list section-item-list" }, section.items.map((result) => h("li", { class: "list-item", key: result.id }, h("a", { "focus-on-arrow-nav": true, href: this.buildUrl(result.path), class: "list-item-button", target: this.linksTarget, rel: this.linksRel, id: `search-result-${result.id}`, onClick: (onClickEvent) => this.handleItemClick(onClickEvent, result) }, h("div", { style: { flexShrink: "0" } }, h("ph-files", { size: "20px" })), h("div", { class: "textWrapper" }, h("orama-text", { as: "h3", styledAs: "p", class: "result-title collapsed" }, !this.highlightTitle ? h("span", { innerHTML: result.title }) : result.title.length > 200 ? (
      // Trim exists here to prevent to render too much data to the DOM
      h("span", { innerHTML: this.getHighlightedTitleText(result.title).trim(200) })
    ) : h("span", { innerHTML: this.getHighlightedTitleText(result.title).HTML })), h("orama-text", { as: "p", styledAs: "span", class: "result-description collapsed", variant: "tertiary" }, !this.highlightDescription ? h("span", { innerHTML: result.description }) : h("span", { innerHTML: this.getHighlightedDescriptionText(result.description).HTML })))))))))));
  }
  get el() {
    return getElement(this);
  }
};
SearchResults.style = OramaSearchResultsStyle0;
export {
  OramaFacets as orama_facets,
  Input as orama_input,
  SearchResults as orama_search_results
};
//# sourceMappingURL=orama-facets_3.entry-N3Y4C5SL.js.map
