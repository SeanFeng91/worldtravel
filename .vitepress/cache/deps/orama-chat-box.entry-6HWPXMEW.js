import {
  ChatService
} from "./chunk-LGL2XIKM.js";
import {
  generateRandomID,
  initOramaClient,
  validateCloudIndexConfig
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
  Host,
  createEvent,
  getElement,
  h,
  registerInstance
} from "./chunk-6BI6LT3C.js";
import "./chunk-KT2WZD7D.js";

// node_modules/@orama/wc-components/dist/esm/orama-chat-box.entry.js
var w = Object.defineProperty;
var u = Object.getOwnPropertyDescriptor;
var o = (a, s2, h2, i) => {
  for (var r = i > 1 ? void 0 : i ? u(s2, h2) : s2, p = a.length - 1, c; p >= 0; p--)
    (c = a[p]) && (r = (i ? c(s2, h2, r) : c(r)) || r);
  return i && r && w(s2, h2, r), r;
};
var t = class extends n {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var a;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t.weightsMap.get((a = this.weight) != null ? a : "regular")}
    </svg>`;
  }
};
t.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M236,56v48a4,4,0,0,1-4,4H184a4,4,0,0,1,0-8h37.7L187.53,68.69l-.13-.12a84,84,0,1,0-1.75,120.51,4,4,0,0,1,5.5,5.82A91.43,91.43,0,0,1,128,220h-1.26A92,92,0,1,1,193,62.84l35,32.05V56a4,4,0,1,1,8,0Z"/>`
  ],
  [
    "light",
    tt`<path d="M238,56v48a6,6,0,0,1-6,6H184a6,6,0,0,1,0-12h32.55l-30.38-27.8c-.06-.06-.12-.13-.19-.19a82,82,0,1,0-1.7,117.65,6,6,0,0,1,8.24,8.73A93.46,93.46,0,0,1,128,222h-1.28A94,94,0,1,1,194.37,61.4L226,90.35V56a6,6,0,1,1,12,0Z"/>`
  ],
  [
    "regular",
    tt`<path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"/>`
  ],
  [
    "bold",
    tt`<path d="M244,56v48a12,12,0,0,1-12,12H184a12,12,0,1,1,0-24H201.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76,76,0,1,0,127,204h1a75.53,75.53,0,0,0,52.15-20.72,12,12,0,0,1,16.49,17.45A99.45,99.45,0,0,1,128,228h-1.37A100,100,0,1,1,198.51,57.06L220,76.72V56a12,12,0,0,1,24,0Z"/>`
  ],
  [
    "fill",
    tt`<path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1-5.66-13.66l17-17-10.55-9.65-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,1,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60l10.93,10L226.34,50.3A8,8,0,0,1,240,56Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"/><path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"/>`
  ]
]);
t.styles = p$3`
    :host {
      display: contents;
    }
  `;
o([
  O({ type: String, reflect: true })
], t.prototype, "size", 2);
o([
  O({ type: String, reflect: true })
], t.prototype, "weight", 2);
o([
  O({ type: String, reflect: true })
], t.prototype, "color", 2);
o([
  O({ type: Boolean, reflect: true })
], t.prototype, "mirrored", 2);
t = o([
  s("ph-arrow-clockwise")
], t);
var oramaChatBoxCss = ":host{display:flex;flex-grow:1}.header{background:#fbfbfb;background:var(--background-color-primary,#fbfbfb);padding:.75rem 1rem;padding:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16))) var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)));text-align:end;transition:opacity .2s}.header.hidden button{opacity:0;pointer-events:none}.header button{align-items:center;background-color:transparent;border:none;border-radius:.5rem;border-radius:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16)));cursor:pointer;display:inline-flex;font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));gap:.25rem;gap:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));padding:.125rem .25rem;padding:var(--spacing-2xs,calc(2rem/var(--orama-base-font-size, 16))) var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));transition:color .2s;transition:background-color .2s}.header button,.header button:hover{color:#99989d;color:var(--text-color-tertiary,#99989d)}.header button:hover{background-color:#eee9f6;background-color:var(--background-color-tertiary,#eee9f6)}";
var OramaChatBoxStyle0 = oramaChatBoxCss;
var ChatBox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.answerGenerated = createEvent(this, "answerGenerated", 7);
    this.answerSourceClick = createEvent(this, "answerSourceClick", 7);
    this.chatMarkdownLinkClicked = createEvent(this, "chatMarkdownLinkClicked", 7);
    this.index = void 0;
    this.clientInstance = void 0;
    this.sourceBaseUrl = void 0;
    this.linksTarget = void 0;
    this.linksRel = void 0;
    this.placeholder = void 0;
    this.sourcesMap = void 0;
    this.suggestions = void 0;
    this.autoFocus = true;
    this.systemPrompts = void 0;
    this.chatMarkdownLinkTitle = void 0;
    this.chatMarkdownLinkHref = void 0;
    this.chatMarkdownLinkTarget = void 0;
    this.componentID = generateRandomID("chat-box");
  }
  indexChanged() {
    this.startChatService();
  }
  componentWillLoad() {
    this.el.id = this.componentID;
    this.startChatService();
  }
  startChatService() {
    validateCloudIndexConfig(this.el, this.index, this.clientInstance);
    const oramaClient = this.clientInstance || initOramaClient(this.index);
    chatContext.chatService = new ChatService(oramaClient);
  }
  render() {
    if (!chatContext.chatService) {
      return h("orama-text", { as: "p" }, "Unable to initialize chat service");
    }
    return (
      // * Note: only dark theme supported at the moment
      h(Host, { class: "theme-dark" }, h("orama-chat", { placeholder: this.placeholder, sourceBaseUrl: this.sourceBaseUrl, sourcesMap: this.sourcesMap, suggestions: this.suggestions, focusInput: this.autoFocus, systemPrompts: this.systemPrompts, chatMarkdownLinkTitle: this.chatMarkdownLinkTitle, chatMarkdownLinkHref: this.chatMarkdownLinkHref }, h("div", { slot: "chat-empty-state" }, h("slot", { name: "empty-state" }))))
    );
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "index": ["indexChanged"]
    };
  }
};
ChatBox.style = OramaChatBoxStyle0;
export {
  ChatBox as orama_chat_box
};
//# sourceMappingURL=orama-chat-box.entry-6HWPXMEW.js.map
