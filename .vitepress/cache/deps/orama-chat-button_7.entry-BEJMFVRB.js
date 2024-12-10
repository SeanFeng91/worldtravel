import {
  Icon
} from "./chunk-M5WWNCVR.js";
import "./chunk-ADIIPX6Q.js";
import {
  searchState
} from "./chunk-DSQPHNU4.js";
import {
  globalContext
} from "./chunk-5XZSI5PN.js";
import {
  getNonExplicitAttributes
} from "./chunk-HXUFFIHY.js";
import {
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
  Fragment,
  Host,
  createEvent,
  getElement,
  h,
  registerInstance
} from "./chunk-6BI6LT3C.js";
import "./chunk-KT2WZD7D.js";

// node_modules/@orama/wc-components/dist/esm/orama-chat-button_7.entry.js
var w = Object.defineProperty;
var d = Object.getOwnPropertyDescriptor;
var a = (o2, l, p, s3) => {
  for (var r = s3 > 1 ? void 0 : s3 ? d(l, p) : l, h2 = o2.length - 1, n2; h2 >= 0; h2--)
    (n2 = o2[h2]) && (r = (s3 ? n2(l, p, r) : n2(r)) || r);
  return s3 && r && w(l, p, r), r;
};
var t$2 = class extends n {
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
      ${t$2.weightsMap.get((o2 = this.weight) != null ? o2 : "regular")}
    </svg>`;
  }
};
t$2.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M228,56A100.11,100.11,0,0,1,128,156H41.66l41.17,41.17a4,4,0,0,1-5.66,5.66l-48-48a4,4,0,0,1,0-5.66l48-48a4,4,0,0,1,5.66,5.66L41.66,148H128a92.1,92.1,0,0,0,92-92,4,4,0,0,1,8,0Z"/>`
  ],
  [
    "light",
    tt`<path d="M230,56A102.12,102.12,0,0,1,128,158H46.49l37.75,37.76a6,6,0,1,1-8.48,8.48l-48-48a6,6,0,0,1,0-8.48l48-48a6,6,0,0,1,8.48,8.48L46.49,146H128a90.1,90.1,0,0,0,90-90,6,6,0,0,1,12,0Z"/>`
  ],
  [
    "regular",
    tt`<path d="M232,56A104.11,104.11,0,0,1,128,160H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48a8,8,0,0,1,11.32,11.32L51.31,144H128a88.1,88.1,0,0,0,88-88,8,8,0,0,1,16,0Z"/>`
  ],
  [
    "bold",
    tt`<path d="M236,56A108.12,108.12,0,0,1,128,164H61l27.52,27.51a12,12,0,0,1-17,17l-48-48a12,12,0,0,1,0-17l48-48a12,12,0,0,1,17,17L61,140h67a84.09,84.09,0,0,0,84-84,12,12,0,0,1,24,0Z"/>`
  ],
  [
    "fill",
    tt`<path d="M232,56A104.11,104.11,0,0,1,128,160H88v40a8,8,0,0,1-13.66,5.66l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,88,104v40h40a88.1,88.1,0,0,0,88-88,8,8,0,0,1,16,0Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M80,104v96L32,152Z" opacity="0.2"/><path d="M224,48a8,8,0,0,0-8,8,88.1,88.1,0,0,1-88,88H88V104a8,8,0,0,0-13.66-5.66l-48,48a8,8,0,0,0,0,11.32l48,48A8,8,0,0,0,88,200V160h40A104.11,104.11,0,0,0,232,56,8,8,0,0,0,224,48ZM72,180.69,43.31,152,72,123.31Z"/>`
  ]
]);
t$2.styles = p$3`
    :host {
      display: contents;
    }
  `;
a([
  O({ type: String, reflect: true })
], t$2.prototype, "size", 2);
a([
  O({ type: String, reflect: true })
], t$2.prototype, "weight", 2);
a([
  O({ type: String, reflect: true })
], t$2.prototype, "color", 2);
a([
  O({ type: Boolean, reflect: true })
], t$2.prototype, "mirrored", 2);
t$2 = a([
  s("ph-arrow-bend-down-left")
], t$2);
var oramaChatButtonCss = '@keyframes shine{0%{background-position:0 50%}to{background-position:150%;opacity:0}}@keyframes animBg{0%{background:#eee9f6;background:var(--background-color-tertiary,#eee9f6)}70%{background:#eee9f6;background:var(--background-color-tertiary,#eee9f6)}to{background:transparent}}@keyframes steam{0%{background-position:0 50%}50%{background-position:75% 50%}to{background-position:0 50%}}.sc-orama-chat-button-h{border-bottom:1px solid #dadada;border-bottom:1px solid var(--border-color-primary,#dadada);padding:.5rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)))}.chat-button.sc-orama-chat-button{align-items:center;background:transparent;border:1px solid transparent;border-radius:.5rem;border-radius:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));color:#151515;color:var(--text-color-primary,#151515);cursor:pointer;display:flex;font-size:1rem;font-size:var(--font-size-md,calc(16rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);gap:.5rem;gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));line-height:1.5;line-height:var(--font-line-height-m,1.5);margin:0;padding:.5rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));position:relative;width:100%}@media (min-width:768.02px){.chat-button.sc-orama-chat-button{font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)))}}@media (hover:hover){.chat-button.sc-orama-chat-button:hover{background:#eee9f6;background:var(--background-color-tertiary,#eee9f6)}}.chat-button.sc-orama-chat-button:focus-visible{border:1px solid #ae8ff7;border:1px solid var(--border-color-accent,#ae8ff7);outline:none}.chat-button.is-active.sc-orama-chat-button{background:#eee9f6;background:var(--background-color-tertiary,#eee9f6)}.chat-button.is-highlighted.sc-orama-chat-button:after,.chat-button.is-highlighted.sc-orama-chat-button:before{animation:shine 1s linear 1 forwards;background:linear-gradient(90deg,#eee9f6 0,#eee9f6 20%,#ae8ff7 40%,#ae8ff7 60%,#eee9f6 80%,#eee9f6);background:linear-gradient(to right,var(--chat-button-border-color-gradientOne,#eee9f6) 0,var(--chat-button-border-color-gradientTwo,#eee9f6) 20%,var(--chat-button-border-color-gradientThree,#ae8ff7) 40%,var(--chat-button-border-color-gradientFour,#ae8ff7) 60%,var(--chat-button-border-color-gradientFive,#eee9f6) 80%,var(--chat-button-border-color-gradientSix,#eee9f6) 100%);background-size:150% auto;border-radius:.5rem;border-radius:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));content:"";display:block;height:calc(100% + 4px);left:-2px;overflow:hidden;position:absolute;top:-2px;width:calc(100% + 4px);z-index:-1}.chat-button.is-highlighted.sc-orama-chat-button:after{filter:blur(3px);height:100%;width:100%}.icon-star.sc-orama-chat-button{align-items:center;background:linear-gradient(79deg,#ae8ff7 -45%,hsla(0,0%,100%,0) 75%);background:linear-gradient(79deg,var(--chat-button-background-color-gradientOne,#ae8ff7) -45%,var(--chat-button-backgroun-color-gradientTwo,hsla(0,0%,100%,0)) 75%);background-size:200% auto;border-radius:.375rem;border-radius:var(--radius-xs,calc(6rem/var(--orama-base-font-size, 16)));display:flex;padding:.5rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)))}.is-highlighted.sc-orama-chat-button .icon-star.sc-orama-chat-button{animation:steam 1.4s linear 1 forwards}.icon-enter.sc-orama-chat-button{align-items:center;border:.7px solid #dadada;border:.7px solid var(--border-color-primary,#dadada);border-radius:.375rem;border-radius:var(--radius-xs,calc(6rem/var(--orama-base-font-size, 16)));display:flex;justify-self:flex-end;padding:.25rem;padding:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)))}.button-label.sc-orama-chat-button{flex-grow:1;text-align:left}';
var OramaChatButtonStyle0 = oramaChatButtonCss;
var OramaChatButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = void 0;
    this.active = false;
    this.highlight = false;
    this.class = void 0;
  }
  highlightButton() {
    if (this.active && !this.highlight) {
      this.highlight = true;
    }
  }
  render() {
    const declaredProps = ["label", "onClick", "class"];
    const buttonProps = getNonExplicitAttributes(this.el, declaredProps);
    return h(Host, { key: "a813bb8501fb65d6015134b9972d06b33a9e4381", class: this.class }, h("button", Object.assign({ key: "27045d6ced4cce54020699e4b6dd7dccade5400a", class: {
      "chat-button": true,
      "is-active": this.active,
      "is-highlighted": this.highlight
    } }, buttonProps, { type: "button" }), h("span", { key: "529c7fc0749efae99eb206d2627b4018b597205d", class: "icon-star" }, h(Icon, { key: "063f1ea186e580a7999a1bb369c22fc6fe4c3a93", name: "star", size: 16 })), h("span", { key: "fe1732d9ec7fc431525aa9948a114f2b0beea881", class: "button-label" }, this.label), h("span", { key: "f5f089f7312ef857935d530dc69c1a4f0e5e89a7", class: "icon-enter" }, h("ph-arrow-bend-down-left", { key: "78d4f06d7d318bdba416054a2707d843d9484de4", size: 12 }))));
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "active": ["highlightButton"],
      "highlight": ["highlightButton"]
    };
  }
};
OramaChatButton.style = OramaChatButtonStyle0;
var oramaEmbedCss = ".embed.sc-orama-embed{background-color:#fbfbfb;background-color:var(--background-color-primary,#fbfbfb);border:1px solid #dadada;border:1px solid var(--border-color-primary,#dadada);border-radius:.75rem;border-radius:var(--radius-m,calc(12rem/var(--orama-base-font-size, 16)));box-sizing:border-box;display:flex;flex-direction:column;height:100%;inset:0;margin:0 auto;max-height:100%;min-height:25rem;min-height:calc(400rem/var(--orama-base-font-size, 16));overflow:hidden;padding:0;width:100%}@media (min-width:1024.02px){.embed.sc-orama-embed{background-color:#fff;background-color:var(--background-color-secondary,#fff)}.embed.sc-orama-embed orama-input.sc-orama-embed{border-radius:0;margin:0;padding:0}.embed.sc-orama-embed input[type=search].sc-orama-embed{border-radius:.75rem .75rem 0 0;border-radius:var(--radius-m,calc(12rem/var(--orama-base-font-size, 16))) var(--radius-m,calc(12rem/var(--orama-base-font-size, 16))) 0 0}}";
var OramaEmbedStyle0 = oramaEmbedCss;
var OramaEmbed = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h("div", { key: "9ad1be4731c06c14e2c7aadbad279b411a09cb3f", class: "embed" }, h("slot", { key: "6e5622137dbb5162381753c99a902fa308410f8a" }));
  }
};
OramaEmbed.style = OramaEmbedStyle0;
var oramaFooterCss = ".sc-orama-footer-h{align-items:center;background-color:#fff;background-color:var(--background-color-secondary,#fff);border-radius:0 0 .75rem .75rem;border-radius:0 0 var(--radius-m,calc(12rem/var(--orama-base-font-size, 16))) var(--radius-m,calc(12rem/var(--orama-base-font-size, 16)));border-top:1px solid #dadada;border-top:1px solid var(--border-color-primary,#dadada);display:flex;justify-content:space-between;padding:.75rem;padding:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)))}.powered-by.sc-orama-footer{align-items:flex-end;display:flex;flex-grow:1;justify-content:right;text-align:right}.logo-link.sc-orama-footer,.powered-by.sc-orama-footer{gap:.5rem;gap:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)))}.logo-link.sc-orama-footer{align-items:center;display:inline-flex;justify-content:center;text-decoration:none}.logo-link.sc-orama-footer:focus-visible{border:1px solid #ae8ff7;border:1px solid var(--border-color-accent,#ae8ff7);outline:none}.logo.sc-orama-footer{max-width:3.875rem;max-width:calc(62rem/var(--orama-base-font-size, 16))}";
var OramaFooterStyle0 = oramaFooterCss;
var OramaFooter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.linkTarget = "_blank";
    this.class = void 0;
    this.colorScheme = "light";
  }
  componentWillLoad() {
    const utmSource = encodeURIComponent(window.location.hostname);
    this.poweredByDestinationUrl = `https://www.orama.com/?utm_source=${utmSource}&utm_medium=powered-by`;
    if (["localhost", "orama.com"].includes(utmSource)) {
      this.linkTarget = "_parent";
    }
  }
  render() {
    const imgName = this.colorScheme === "dark" ? "orama-when-dark.svg" : "orama-when-light.svg";
    return h(Host, { key: "f5f5413ef9045fda55269efc89ba87f8be029891" }, h("div", { key: "03cf01efab6dc47d35c78bec663ed2a7a1e9012a", class: "powered-by" }, h("a", { key: "4f07136500256dba2e0ca4a80a4467f915657b46", href: this.poweredByDestinationUrl, target: this.linkTarget, rel: "noopener noreferrer", class: "logo-link" }, h("orama-text", { key: "f35b60d73aab3e195cab4da78da3fecd11518055", as: "small" }, "Powered by"), h("img", { key: "a0424324168f06ce3f564118f6b47fd8db6ce398", src: `https://website-assets.oramasearch.com/${imgName}`, alt: "Powered by Orama", class: "logo", width: 62 }))));
  }
  get el() {
    return getElement(this);
  }
};
OramaFooter.style = OramaFooterStyle0;
var oramaModalCss = ".modal.sc-orama-modal{background-color:rgba(0,0,0,.7);background-color:var(--backdrop-background-color-primary,rgba(0,0,0,.7));display:none;height:100%;left:0;position:fixed;top:0;width:100%;z-index:9999}.modal.open.sc-orama-modal{display:block}.modal-content.sc-orama-modal{background-color:#fbfbfb;background-color:var(--background-color-primary,#fbfbfb);display:flex;flex-direction:column;inset:0;justify-content:space-between;position:fixed}@media (min-width:1024.02px){.modal-content.sc-orama-modal{background-color:#fff;background-color:var(--background-color-secondary,#fff);border:1px solid #dadada;border:1px solid var(--border-color-primary,#dadada);border-radius:.75rem;border-radius:var(--radius-m,calc(12rem/var(--orama-base-font-size, 16)));bottom:auto;margin:0 auto;max-height:70vh;max-width:45rem;max-width:calc(720rem/var(--orama-base-font-size, 16));min-height:12.5rem;min-height:calc(200rem/var(--orama-base-font-size, 16));padding:0;top:5vh;width:80%}}.modal-close.sc-orama-modal:not(:focus-visible){clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.modal-title.sc-orama-modal{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}";
var OramaModalStyle0 = oramaModalCss;
var OramaModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.modalStatusChanged = createEvent(this, "modalStatusChanged", 7);
    this.originalBodyOverflowState = "scroll";
    this.open = false;
    this.closeOnEscape = true;
    this.closeOnOutsideClick = true;
    this.mainTitle = "";
    this.activeElement = void 0;
    this.modalIsOpen = this.open;
  }
  handleKeyDown(ev) {
    if (this.modalIsOpen) {
      switch (ev.key) {
        case "Tab":
          this.trapFocus(ev);
          break;
        case "Escape":
          if (this.closeOnEscape) {
            ev.preventDefault();
            ev.stopPropagation();
            this.closeModal();
          }
          break;
      }
    }
  }
  handleOpenChange(newValue) {
    this.modalStatusChanged.emit({
      open: newValue,
      id: this.el
    });
    if (newValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = this.originalBodyOverflowState;
    }
  }
  handleOpenPropChange(newValue) {
    this.modalIsOpen = newValue;
  }
  trapFocus(event) {
    const focusableElements = this.el.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const focusableArray = Array.from(focusableElements).filter((element) => element.offsetParent !== null);
    if (focusableArray.length > 0) {
      this.firstFocusableElement = focusableArray[0];
      this.lastFocusableElement = focusableArray[focusableArray.length - 1];
      const focusedElement = this.el.querySelector(":focus");
      if (event.shiftKey && focusedElement === this.firstFocusableElement) {
        event.preventDefault();
        this.lastFocusableElement.focus();
      } else if (!event.shiftKey && focusedElement === this.lastFocusableElement) {
        event.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }
  handleFocus() {
    const focusableElements = this.el.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const focusableArray = Array.from(focusableElements).filter((element) => element.offsetParent !== null);
    if (focusableArray.length > 0) {
      focusableArray[0].focus();
    }
  }
  disconnectedCallback() {
    this.modalIsOpen = false;
  }
  closeModal() {
    this.modalIsOpen = false;
  }
  componentDidLoad() {
    this.originalBodyOverflowState = document.body.style.overflow;
    if (this.modalIsOpen) {
      this.activeElement = document.activeElement;
      this.handleFocus();
      document.body.style.overflow = "hidden";
    }
    this.el.addEventListener("click", (event) => {
      if (this.innerModalRef && !this.innerModalRef.contains(event.target)) {
        event.stopPropagation();
        event.preventDefault();
        this.closeModal();
      }
    });
  }
  componentDidUpdate() {
    if (this.modalIsOpen) {
      this.handleFocus();
    } else if (this.activeElement) {
      this.activeElement.focus();
    }
  }
  render() {
    return h("div", { key: "5a3e77150a28e635a63df2628658bbd20305f1f0", class: `modal ${this.modalIsOpen ? "open" : ""}`, role: "dialog", "aria-modal": "true", "aria-labelledby": "modalTitle", "aria-describedby": "modalContent" }, h("div", { key: "1afd4fc77733456e67a4e1485c5ca827008b87f4", class: "modal-inner", ref: (ref) => this.innerModalRef = ref }, h("h1", { key: "7589f1086c5a28196728fa3fabfebdaf00d3fedb", id: "modalTitle", class: "modal-title" }, this.mainTitle), h("div", { key: "f6e64bfe06b86ca2bcbf742341aafafb7799d8b2", id: "modalContent", class: "modal-content" }, h("slot", { key: "a4426b7f7725263baa7af3668bbdb2a77cf7b96e" })), h("button", { key: "349e7ccfd15ff75f440d55885645c38b50a122c9", onClick: () => this.closeModal(), type: "button", class: "modal-close" }, "Close")));
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "modalIsOpen": ["handleOpenChange"],
      "open": ["handleOpenPropChange"]
    };
  }
};
OramaModal.style = OramaModalStyle0;
var Z = Object.defineProperty;
var u = Object.getOwnPropertyDescriptor;
var o = (a2, s3, h2, i) => {
  for (var r = i > 1 ? void 0 : i ? u(s3, h2) : s3, l = a2.length - 1, m; l >= 0; l--)
    (m = a2[l]) && (r = (i ? m(s3, h2, r) : m(r)) || r);
  return i && r && Z(s3, h2, r), r;
};
var t$1 = class extends n {
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
      ${t$1.weightsMap.get((a2 = this.weight) != null ? a2 : "regular")}
    </svg>`;
  }
};
t$1.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm60-92a4,4,0,0,1-4,4H128a4,4,0,0,1-4-4V72a4,4,0,0,1,8,0v52h52A4,4,0,0,1,188,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm62-90a6,6,0,0,1-6,6H128a6,6,0,0,1-6-6V72a6,6,0,0,1,12,0v50h50A6,6,0,0,1,190,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm68-84a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V72a12,12,0,0,1,24,0v44h44A12,12,0,0,1,196,128Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>`
  ]
]);
t$1.styles = p$3`
    :host {
      display: contents;
    }
  `;
o([
  O({ type: String, reflect: true })
], t$1.prototype, "size", 2);
o([
  O({ type: String, reflect: true })
], t$1.prototype, "weight", 2);
o([
  O({ type: String, reflect: true })
], t$1.prototype, "color", 2);
o([
  O({ type: Boolean, reflect: true })
], t$1.prototype, "mirrored", 2);
t$1 = o([
  s("ph-clock")
], t$1);
var c = Object.defineProperty;
var f = Object.getOwnPropertyDescriptor;
var s2 = (a2, o2, i, h2) => {
  for (var r = h2 > 1 ? void 0 : h2 ? f(o2, i) : o2, l = a2.length - 1, n2; l >= 0; l--)
    (n2 = a2[l]) && (r = (h2 ? n2(o2, i, r) : n2(r)) || r);
  return h2 && r && c(o2, i, r), r;
};
var t = class extends n {
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
      ${t.weightsMap.get((a2 = this.weight) != null ? a2 : "regular")}
    </svg>`;
  }
};
t.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z"/>`
  ],
  [
    "light",
    tt`<path d="M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z"/>`
  ],
  [
    "regular",
    tt`<path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>`
  ],
  [
    "bold",
    tt`<path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"/>`
  ],
  [
    "fill",
    tt`<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z" opacity="0.2"/><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>`
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
  s("ph-plus")
], t);
var oramaNavigationBarCss = ".sc-orama-navigation-bar-h{align-items:center;background-color:#fbfbfb;background-color:var(--background-color-primary,#fbfbfb);display:flex;padding:1rem 1rem .5rem;padding:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16))) var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16))) var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)))}@media (min-width:1024.02px){.sc-orama-navigation-bar-h{display:none}}.spacer.sc-orama-navigation-bar{display:block;height:2.25rem;height:calc(36rem/var(--orama-base-font-size, 16));width:2.25rem;width:calc(36rem/var(--orama-base-font-size, 16))}.corner-section.sc-orama-navigation-bar{display:flex;gap:.25rem;gap:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)))}.corner-section.start.sc-orama-navigation-bar{display:flex;justify-content:flex-start}.corner-section.center.sc-orama-navigation-bar{display:flex;flex:1;justify-content:center}.corner-section.end.sc-orama-navigation-bar{display:flex;justify-content:flex-end}";
var OramaNavigationBarStyle0 = oramaNavigationBarCss;
var OramaNavigationBar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.handleStartNewChat = () => {
      var _a;
      (_a = chatContext.chatService) === null || _a === void 0 ? void 0 : _a.resetChat();
    };
    this.handleClose = void 0;
    this.showBackButton = true;
    this.showChatActions = false;
  }
  render() {
    return h(Host, { key: "7519d14339db63126bd0a3359e1acffd130677bc" }, h("div", { key: "19ebde4f1984d2c16987d6ff4eca51ab10684295", class: "corner-section start" }, this.showBackButton ? h(Fragment, null, h("orama-button", { type: "button", variant: "icon", "aria-label": "Exit", onClick: this.handleClose, onKeyDown: this.handleClose }, h("ph-caret-left", { size: "20px" }))) : h("div", { class: "spacer" })), h("div", { key: "3d5c8d965e313b6e783368421c93b7002e009702", class: "corner-section center" }, h("orama-toggler", { key: "c8d0642278345849882e8844b486e29c543549da" })), h("div", { key: "a4513d17c2f2937dd5d5103eef138651da1b6611", class: "corner-section end" }, this.showChatActions ? h(Fragment, null, h("orama-button", { type: "button", variant: "icon", "aria-label": "Start new chat", onClick: this.handleStartNewChat, onKeyDown: this.handleStartNewChat }, h("ph-plus", { size: "20px" }))) : h("div", { class: "spacer" })));
  }
};
OramaNavigationBar.style = OramaNavigationBarStyle0;
var oramaSearchCss = ".sc-orama-search-h{display:flex;flex-direction:column;overflow:hidden;width:100%}@media (max-width:1024px){.sc-orama-search-h orama-input.sc-orama-search{padding:0 1rem;padding:0 var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}}@media (max-width:1024px){.sc-orama-search-h{padding:.5rem 0;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16))) 0}}.result-wrapper.sc-orama-search{flex-grow:1;overflow-y:auto;padding:0 1rem;padding:0 var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}.result-wrapper.sc-orama-search::-webkit-scrollbar{width:.3em}.result-wrapper.sc-orama-search::-webkit-scrollbar-track{background:transparent}.result-wrapper.sc-orama-search::-webkit-scrollbar-thumb{background-color:hsla(0,0%,70%,.522);border-radius:1rem;border-radius:var(--border-radius-l,calc(16rem/var(--orama-base-font-size, 16)))}@media (min-width:1024.02px){.result-wrapper.sc-orama-search{padding:0 .75rem;padding:0 var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)))}}.search-form.sc-orama-search{display:flex;flex-direction:column}";
var OramaSearchStyle0 = oramaSearchCss;
var OramaSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.searchCompleted = createEvent(this, "searchCompleted", 7);
    this.answerGenerated = createEvent(this, "answerGenerated", 7);
    this.onFacetClickHandler = (facetName) => {
      this.selectedFacet = facetName;
    };
    this.onInputChange = (e) => {
      this.searchValue = e.target.value;
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      if (this.disableChat) {
        return;
      }
      const chatButton = this.el.querySelector("orama-chat-button");
      chatButton === null || chatButton === void 0 ? void 0 : chatButton.click();
    };
    this.placeholder = "Search...";
    this.focusInput = false;
    this.suggestions = [];
    this.sourceBaseUrl = void 0;
    this.linksTarget = void 0;
    this.linksRel = void 0;
    this.disableChat = false;
    this.highlightTitle = false;
    this.highlightDescription = false;
    this.searchValue = "";
    this.selectedFacet = "";
  }
  handleSearchValueChange() {
    searchState.searchService.search(this.searchValue, this.selectedFacet, {
      onSearchCompletedCallback: (onSearchCompletedCallbackProps) => {
        this.searchCompleted.emit(onSearchCompletedCallbackProps);
      }
    });
    globalContext.currentTerm = this.searchValue;
  }
  handleOramaItemClick(event) {
  }
  render() {
    var _a;
    return h(Host, { key: "7cf364bd2080e57a3b90abea8c20c97c30d85f13" }, h("form", { key: "c0ae081f6eff1038566987e3026ae935b0f5fd2a", onSubmit: this.handleSubmit, class: "search-form" }, h("orama-input", { key: "d0874ad2e8acb888c77192b9d26082c5f4f46625", "focus-on-arrow-nav": true, autoFocus: this.focusInput, type: "search", onInput: this.onInputChange, size: "large", labelForScreenReaders: this.placeholder, placeholder: this.placeholder, onResetValue: () => {
      this.searchValue = "";
    } }), h("slot", { key: "32e9a5d562d1ffb2cab994b08938ce0be5b401fd", name: "summary" })), h("div", { key: "4f5fc197b253b1b68c9b3cb294f350a66cc6ead2", class: "result-wrapper" }, h("orama-facets", { key: "2368b33ab882cc3c1f28bfa8f5064383b1710752", facets: searchState.facets, selectedFacet: this.selectedFacet, facetClicked: this.onFacetClickHandler }), h("orama-search-results", { key: "864a5eae83f6ab76bc283389c9d8770974a5102d", suggestions: !((_a = globalContext.currentTerm) === null || _a === void 0 ? void 0 : _a.length) && !this.disableChat ? this.suggestions : [], setChatTerm: (term) => {
      var _a2;
      globalContext.currentTask = "chat";
      (_a2 = chatContext.chatService) === null || _a2 === void 0 ? void 0 : _a2.sendQuestion(term, void 0, {
        onAnswerGeneratedCallback: (onAnswerGeneratedCallbackProps) => this.answerGenerated.emit(onAnswerGeneratedCallbackProps)
      });
    }, sourceBaseUrl: this.sourceBaseUrl, linksTarget: this.linksTarget, linksRel: this.linksRel, sections: searchState.results, searchTerm: this.searchValue, highlightTitle: this.highlightTitle, highlightDescription: this.highlightDescription, loading: searchState.loading, error: searchState.error })));
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "searchValue": ["handleSearchValueChange"],
      "selectedFacet": ["handleSearchValueChange"]
    };
  }
};
OramaSearch.style = OramaSearchStyle0;
var oramaSlidingPanelCss = ".slide-backdrop.visible.sc-orama-sliding-panel{animation:backdropFadeIn .5s ease-in 1;background-color:rgba(0,0,0,.7);background-color:var(--backdrop-background-color-primary,rgba(0,0,0,.7));display:none;display:block;height:100vh;left:0;opacity:0;position:fixed;top:0;width:100vw;z-index:10009}@media (min-width:1024.02px){.slide-backdrop.visible.sc-orama-sliding-panel{display:block;opacity:1}}@keyframes backdropFadeIn{0%{opacity:0}50%{opacity:.2}to{opacity:1}}.slide-container.sc-orama-sliding-panel{background-color:#fbfbfb;background-color:var(--background-color-primary,#fbfbfb);border:1px solid #dadada;border:1px solid var(--border-color-primary,#dadada);border-radius:.75rem .75rem 0 0;border-radius:var(--radius-m,calc(12rem/var(--orama-base-font-size, 16))) var(--radius-m,calc(12rem/var(--orama-base-font-size, 16))) 0 0;bottom:0;box-sizing:border-box;color:#151515;color:var(--text-color-primary,#151515);height:95vh;left:0;position:fixed;transform:translate3d(0,calc(100% + 5vh),0);transition:.4s cubic-bezier(.4,0,.2,1);width:100%;z-index:10019}.slide-container.slide-up.sc-orama-sliding-panel{transform:translateZ(0)}@media (max-width:1024px){.slide-container.sc-orama-sliding-panel{display:none}}.slide-container-inner.sc-orama-sliding-panel{height:95vh;margin:0 auto;max-width:52.5rem;max-width:calc(840rem/var(--orama-base-font-size, 16));width:80%}.slide-container-inner.sc-orama-sliding-panel orama-chat.sc-orama-sliding-panel{height:100%}.slide-container-header.sc-orama-sliding-panel{box-sizing:border-box;display:flex;height:5vh;justify-content:flex-end;padding:0 2.5rem;padding:0 var(--spacing-3xl,calc(40rem/var(--orama-base-font-size, 16)));position:absolute;top:-5vh;width:100%}.close-button.sc-orama-sliding-panel{animation:showIn .3s cubic-bezier(.4,0,.2,1) .1s forwards;background-color:transparent;border:0;color:#fbfbfb;cursor:pointer}";
var OramaSlidingPanelStyle0 = oramaSlidingPanelCss;
var SlideInPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.backdrop = false;
    this.open = false;
    this.closed = void 0;
    this.isOpen = this.open;
  }
  openChanged() {
    this.isOpen = this.open;
  }
  closePanel() {
    if (this.closed) {
      this.closed();
    }
    this.isOpen = false;
  }
  trapFocus(event) {
    var _a;
    const focusableElements = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    let focusableArray = Array.from(focusableElements);
    focusableArray = focusableArray.filter((element) => element.tabIndex !== -1);
    if (focusableArray.length > 0) {
      this.firstFocusableElement = focusableArray[0];
      this.lastFocusableElement = focusableArray[focusableArray.length - 1];
      const focusedElement = this.el.querySelector(":focus");
      if (event.shiftKey && focusedElement === this.firstFocusableElement) {
        event.preventDefault();
        this.lastFocusableElement.focus();
      } else if (!event.shiftKey && focusedElement === this.lastFocusableElement) {
        event.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }
  handleKeyDown(event) {
    event.stopPropagation();
    if (event.key === "Escape") {
      this.closePanel();
    }
    if (event.key === "Tab") {
      this.trapFocus(event);
    }
  }
  componentDidLoad() {
    this.isOpen = this.open;
  }
  render() {
    return h(Fragment, { key: "5388c12cbd96db5c91f423f625a6df249cf92722" }, h("div", { key: "6ad82a163cd3c8372bbb3b21fb10ad8476649f43", class: { "slide-container": true, "slide-up": this.isOpen }, tabIndex: this.isOpen ? 0 : -1 }, h("div", { key: "7a378937b986155af3b3c9f9607948b3e986f353", class: "slide-container-header" }, h("button", { key: "2eec9366832efd521d53303e58543bffea15e873", onClick: () => this.closePanel(), "aria-expanded": this.isOpen ? "true" : "false", "aria-label": "Close panel", "aria-controls": "panel", class: "close-button", type: "button" }, h("ph-x", { key: "21f0eb82501ba32bf0e0a274042b63ae9f763a86", size: "18" }))), h("div", { key: "e35d5461f643cb08c278e4f1c524196bec1ef6a0", id: "panel", role: "region", "aria-hidden": !this.isOpen, tabindex: "-1", class: "slide-container-inner" }, h("slot", { key: "8af0361e7dd297056453b5376feb63c58b8ecbd9" }))), this.backdrop && h("div", { key: "86f76eec3921816613eb44f6e7d8a7237f0c36b5", class: { "slide-backdrop": true, visible: this.isOpen } }));
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "open": ["openChanged"]
    };
  }
};
SlideInPanel.style = OramaSlidingPanelStyle0;
export {
  OramaChatButton as orama_chat_button,
  OramaEmbed as orama_embed,
  OramaFooter as orama_footer,
  OramaModal as orama_modal,
  OramaNavigationBar as orama_navigation_bar,
  OramaSearch as orama_search,
  SlideInPanel as orama_sliding_panel
};
//# sourceMappingURL=orama-chat-button_7.entry-BEJMFVRB.js.map
