import {
  TAnswerStatus,
  chatContext,
  chatStore
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

// node_modules/@orama/wc-components/dist/esm/orama-chat_3.entry.js
var f$1 = Object.defineProperty;
var u$2 = Object.getOwnPropertyDescriptor;
var a$1 = (l, s2, i, o2) => {
  for (var e = o2 > 1 ? void 0 : o2 ? u$2(s2, i) : s2, h2 = l.length - 1, n2; h2 >= 0; h2--)
    (n2 = l[h2]) && (e = (o2 ? n2(s2, i, e) : n2(e)) || e);
  return o2 && e && f$1(s2, i, e), e;
};
var t$2 = class extends n {
  constructor() {
    super(...arguments), this.size = "1em", this.weight = "regular", this.color = "currentColor", this.mirrored = false;
  }
  render() {
    var l;
    return Y`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      fill="${this.color}"
      viewBox="0 0 256 256"
      transform=${this.mirrored ? "scale(-1, 1)" : null}
    >
      ${t$2.weightsMap.get((l = this.weight) != null ? l : "regular")}
    </svg>`;
  }
};
t$2.weightsMap = /* @__PURE__ */ new Map([
  [
    "thin",
    tt`<path d="M224.47,31.52a11.87,11.87,0,0,0-11.82-3L20.74,86.67a12,12,0,0,0-1.91,22.38L105,151l41.92,86.15A11.88,11.88,0,0,0,157.74,244c.34,0,.69,0,1,0a11.89,11.89,0,0,0,10.52-8.63l58.21-192,0-.08A11.85,11.85,0,0,0,224.47,31.52Zm-4.62,9.54-58.23,192a4,4,0,0,1-7.48.59l-41.3-84.86,50-50a4,4,0,1,0-5.66-5.66l-50,50-84.9-41.31a3.88,3.88,0,0,1-2.27-4,3.93,3.93,0,0,1,3-3.54L214.9,36.16A3.93,3.93,0,0,1,216,36a4,4,0,0,1,2.79,1.19A3.93,3.93,0,0,1,219.85,41.06Z"/>`
  ],
  [
    "light",
    tt`<path d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.85l85.56,41.64L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a2,2,0,0,1-3.76.26l-40.68-83.58,49-49a6,6,0,1,0-8.49-8.49l-49,49L23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"/>`
  ],
  [
    "regular",
    tt`<path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"/>`
  ],
  [
    "bold",
    tt`<path d="M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z"/>`
  ],
  [
    "fill",
    tt`<path d="M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15L107,164.15a4,4,0,0,1,.77-4.58l57.92-57.92a8,8,0,0,0-11.31-11.31L96.43,148.26a4,4,0,0,1-4.58.77L17.08,112.64a16,16,0,0,1,2.49-29.8l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L108,148,20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z" opacity="0.2"/><path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"/>`
  ]
]);
t$2.styles = p$3`
    :host {
      display: contents;
    }
  `;
a$1([
  O({ type: String, reflect: true })
], t$2.prototype, "size", 2);
a$1([
  O({ type: String, reflect: true })
], t$2.prototype, "weight", 2);
a$1([
  O({ type: String, reflect: true })
], t$2.prototype, "color", 2);
a$1([
  O({ type: Boolean, reflect: true })
], t$2.prototype, "mirrored", 2);
t$2 = a$1([
  s("ph-paper-plane-tilt")
], t$2);
var f = Object.defineProperty;
var u$1 = Object.getOwnPropertyDescriptor;
var o = (a2, s2, p, h2) => {
  for (var r = h2 > 1 ? void 0 : h2 ? u$1(s2, p) : s2, l = a2.length - 1, m; l >= 0; l--)
    (m = a2[l]) && (r = (h2 ? m(s2, p, r) : m(r)) || r);
  return h2 && r && f(s2, p, r), r;
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
    tt`<path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220ZM160,92H96a4,4,0,0,0-4,4v64a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V96A4,4,0,0,0,160,92Zm-4,64H100V100h56Z"/>`
  ],
  [
    "light",
    tt`<path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218ZM160,90H96a6,6,0,0,0-6,6v64a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V96A6,6,0,0,0,160,90Zm-6,64H102V102h52Z"/>`
  ],
  [
    "regular",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM160,88H96a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V96A8,8,0,0,0,160,88Zm-8,64H104V104h48Z"/>`
  ],
  [
    "bold",
    tt`<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm40-112v56a12,12,0,0,1-12,12H100a12,12,0,0,1-12-12V100a12,12,0,0,1,12-12h56A12,12,0,0,1,168,100Z"/>`
  ],
  [
    "fill",
    tt`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm32,132a4,4,0,0,1-4,4H100a4,4,0,0,1-4-4V100a4,4,0,0,1,4-4h56a4,4,0,0,1,4,4Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32Zm32,128H96V96h64Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM160,88H96a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V96A8,8,0,0,0,160,88Zm-8,64H104V104h48Z"/>`
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
  s("ph-stop-circle")
], t$1);
var w = Object.defineProperty;
var u = Object.getOwnPropertyDescriptor;
var a = (o2, l, p, s2) => {
  for (var r = s2 > 1 ? void 0 : s2 ? u(l, p) : l, h2 = o2.length - 1, n2; h2 >= 0; h2--)
    (n2 = o2[h2]) && (r = (s2 ? n2(l, p, r) : n2(r)) || r);
  return s2 && r && w(l, p, r), r;
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
    tt`<path d="M202.83,146.83l-72,72a4,4,0,0,1-5.66,0l-72-72a4,4,0,0,1,5.66-5.66L124,206.34V40a4,4,0,0,1,8,0V206.34l65.17-65.17a4,4,0,0,1,5.66,5.66Z"/>`
  ],
  [
    "light",
    tt`<path d="M204.24,148.24l-72,72a6,6,0,0,1-8.48,0l-72-72a6,6,0,0,1,8.48-8.48L122,201.51V40a6,6,0,0,1,12,0V201.51l61.76-61.75a6,6,0,0,1,8.48,8.48Z"/>`
  ],
  [
    "regular",
    tt`<path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"/>`
  ],
  [
    "bold",
    tt`<path d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z"/>`
  ],
  [
    "fill",
    tt`<path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,56,136h64V40a8,8,0,0,1,16,0v96h64a8,8,0,0,1,5.66,13.66Z"/>`
  ],
  [
    "duotone",
    tt`<path d="M200,144l-72,72L56,144Z" opacity="0.2"/><path d="M207.39,140.94A8,8,0,0,0,200,136H136V40a8,8,0,0,0-16,0v96H56a8,8,0,0,0-5.66,13.66l72,72a8,8,0,0,0,11.32,0l72-72A8,8,0,0,0,207.39,140.94ZM128,204.69,75.31,152H180.69Z"/>`
  ]
]);
t.styles = p$3`
    :host {
      display: contents;
    }
  `;
a([
  O({ type: String, reflect: true })
], t.prototype, "size", 2);
a([
  O({ type: String, reflect: true })
], t.prototype, "weight", 2);
a([
  O({ type: String, reflect: true })
], t.prototype, "color", 2);
a([
  O({ type: Boolean, reflect: true })
], t.prototype, "mirrored", 2);
t = a([
  s("ph-arrow-down")
], t);
var oramaChatCss = 'orama-chat{background:#fbfbfb;background:var(--background-color-primary,#fbfbfb);height:100%;overflow:hidden}.messages-container-wrapper,orama-chat{display:flex;flex-direction:column;flex-grow:1;position:relative}.messages-container-wrapper{overflow:auto;z-index:1}.messages-container-wrapper::-webkit-scrollbar{width:.3em}.messages-container-wrapper::-webkit-scrollbar-track{background:transparent}.messages-container-wrapper::-webkit-scrollbar-thumb{background-color:hsla(0,0%,70%,.522);border-radius:1rem;border-radius:var(--border-radius-l,calc(16rem/var(--orama-base-font-size, 16)))}.messages-container-wrapper.isEmpty{justify-content:flex-end}.messages-container-wrapper-non-scrollable{display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;z-index:1}.lock-scroll-on-bottom-button-wrapper{align-items:center;background-color:transparent;background-color:#eee9f6;background-color:var(--background-color-tertiary,#eee9f6);border:none;border-radius:.75rem;border-radius:var(--radius-m,calc(12rem/var(--orama-base-font-size, 16)));bottom:0;color:#99989d;color:var(--icon-color-tertiary,#99989d);cursor:pointer;display:flex;font-family:font("primary");font-family:var(--font-primary,font("primary"));height:-moz-fit-content;height:fit-content;justify-content:center;left:50%;margin:.25rem;margin:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16)));padding:.5rem;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)));position:absolute;transform:translateX(-50%);width:-moz-fit-content;width:fit-content;z-index:2}.chat-form-wrapper{padding:.75rem 1rem;padding:var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16))) var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16)))}.chat-input{margin-bottom:.5rem;margin-bottom:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16)))}.suggestions-wrapper{display:flex;flex-direction:column;flex-grow:1;justify-content:end;overflow-x:auto}orama-logo-icon{position:absolute;right:50%;top:50%;transform:translate(50%,-50%);z-index:-1}';
var OramaChatStyle0 = oramaChatCss;
var BOTTOM_THRESHOLD = 1;
var OramaChat = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.answerGenerated = createEvent(this, "answerGenerated", 7);
    this.isScrolling = false;
    this.prevScrollTop = 0;
    this.scrollTarget = 0;
    this.pendingNewInteractionSideEffects = false;
    this.lockScrollOnBottom = false;
    this.handleFocus = () => {
      if (this.focusInput) {
        const texteareaEl = this.textareaRef.querySelector("textarea");
        if (!texteareaEl)
          return;
        requestAnimationFrame(() => {
          texteareaEl.focus();
        });
      }
    };
    this.calculateIsScrollOnBottom = () => {
      const scrollableHeight = this.messagesContainerRef.scrollHeight - this.messagesContainerRef.clientHeight;
      return this.messagesContainerRef.scrollTop + BOTTOM_THRESHOLD >= scrollableHeight;
    };
    this.scrollToBottom = (options = { animated: true, onScrollDone: () => {
    } }) => {
      if (!this.messagesContainerRef) {
        return;
      }
      if (!options.animated) {
        this.messagesContainerRef.scrollTop = this.messagesContainerRef.scrollHeight;
        options.onScrollDone();
        return;
      }
      this.isScrolling = true;
      const startTime = performance.now();
      const startPosition = this.messagesContainerRef.scrollTop;
      const duration = 300;
      const animateScroll = (currentTime) => {
        if (!this.messagesContainerRef || !this.isScrolling) {
          return;
        }
        const scrollTarget = this.messagesContainerRef.scrollHeight - this.messagesContainerRef.clientHeight;
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(1, elapsedTime / duration);
        const easeFunction = this.easeInOutQuad(scrollProgress);
        const scrollTo = startPosition + (scrollTarget - startPosition) * easeFunction;
        this.messagesContainerRef.scrollTo(0, scrollTo);
        if (elapsedTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          this.isScrolling = false;
          options.onScrollDone();
        }
      };
      requestAnimationFrame(animateScroll);
    };
    this.easeInOutQuad = (t2) => {
      return t2 < 0.5 ? 2 * t2 * t2 : -1 + (4 - 2 * t2) * t2;
    };
    this.recalculateGoBoToBottomButton = () => {
      const isContainerOverflowing = this.calculateIsContainerOverflowing();
      if (!isContainerOverflowing) {
        this.showGoToBottomButton = false;
        return;
      }
      this.showGoToBottomButton = !this.calculateIsScrollOnBottom();
    };
    this.handleWheel = (e) => {
      const isContainerOverflowing = this.calculateIsContainerOverflowing();
      if (!isContainerOverflowing) {
        this.lockScrollOnBottom = false;
        this.showGoToBottomButton = false;
        return;
      }
      const currentScrollTop = this.messagesContainerRef.scrollTop;
      this.showGoToBottomButton = !this.calculateIsScrollOnBottom();
      this.lockScrollOnBottom = !this.showGoToBottomButton;
      if (!this.showGoToBottomButton) {
        this.isScrolling = false;
      }
      this.prevScrollTop = currentScrollTop;
    };
    this.setSources = () => {
      chatContext.sourceBaseURL = this.sourceBaseUrl;
      chatContext.sourcesMap = Object.assign(Object.assign({}, chatContext.sourcesMap), this.sourcesMap);
      chatContext.linksTarget = this.linksTarget;
      chatContext.linksRel = this.linksRel;
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      if (chatContext.chatService === null) {
        throw new Error("Chat Service is not initialized");
      }
      chatContext.chatService.sendQuestion(this.inputValue, this.systemPrompts, {
        onAnswerGeneratedCallback: (params) => this.answerGenerated.emit(params)
      });
      this.inputValue = "";
    };
    this.handleAbortAnswerClick = () => {
      chatContext.chatService.abortAnswer();
    };
    this.handleSuggestionClick = (suggestion) => {
      if (chatContext.chatService === null) {
        throw new Error("Chat Service is not initialized");
      }
      chatContext.chatService.sendQuestion(suggestion, void 0, {
        onAnswerGeneratedCallback: (params) => this.answerGenerated.emit(params)
      });
      this.inputValue = "";
    };
    this.calculateIsContainerOverflowing = () => {
      if (!this.messagesContainerRef) {
        return false;
      }
      return this.messagesContainerRef.scrollHeight > this.messagesContainerRef.clientHeight;
    };
    this.placeholder = "Ask me anything";
    this.sourceBaseUrl = "";
    this.linksTarget = void 0;
    this.linksRel = void 0;
    this.sourcesMap = void 0;
    this.showClearChat = true;
    this.defaultTerm = void 0;
    this.focusInput = false;
    this.suggestions = void 0;
    this.systemPrompts = void 0;
    this.chatMarkdownLinkTitle = void 0;
    this.chatMarkdownLinkHref = void 0;
    this.chatMarkdownLinkTarget = void 0;
    this.inputValue = "";
    this.showGoToBottomButton = false;
  }
  handleSourceItemClick(event) {
  }
  handleDefaultTermChange() {
    var _a;
    if (this.defaultTerm) {
      (_a = chatContext.chatService) === null || _a === void 0 ? void 0 : _a.sendQuestion(this.defaultTerm, this.systemPrompts, {
        onAnswerGeneratedCallback: (params) => this.answerGenerated.emit(params)
      });
    }
  }
  focusInputWatcher() {
    this.handleFocus();
  }
  componentDidLoad() {
    this.messagesContainerRef.addEventListener("wheel", this.handleWheel);
    this.setSources();
    this.handleFocus();
    this.scrollableContainerResizeObserver = new ResizeObserver(() => {
      this.recalculateGoBoToBottomButton();
    });
    this.scrollableContainerResizeObserver.observe(this.messagesContainerRef);
    this.nonScrollableContainerResizeObserver = new ResizeObserver(() => {
      if (this.pendingNewInteractionSideEffects) {
        this.pendingNewInteractionSideEffects = false;
        this.lockScrollOnBottom = false;
        this.scrollToBottom({
          animated: true,
          onScrollDone: () => {
            this.recalculateGoBoToBottomButton();
          }
        });
        return;
      }
      if (this.lockScrollOnBottom && !this.isScrolling) {
        this.scrollToBottom({
          animated: false,
          onScrollDone: () => {
            this.recalculateGoBoToBottomButton();
          }
        });
      }
      this.recalculateGoBoToBottomButton();
    });
    this.nonScrollableContainerResizeObserver.observe(this.nonScrollableMessagesContainerRef);
  }
  connectedCallback() {
    chatStore.on("set", (prop, newInteractions, oldInteractions) => {
      if (prop !== "interactions") {
        return;
      }
      if ((oldInteractions === null || oldInteractions === void 0 ? void 0 : oldInteractions.length) < (newInteractions === null || newInteractions === void 0 ? void 0 : newInteractions.length)) {
        this.lockScrollOnBottom = false;
        this.pendingNewInteractionSideEffects = true;
      }
    });
  }
  disconnectedCallback() {
    this.messagesContainerRef.removeEventListener("wheel", this.handleWheel);
    this.scrollableContainerResizeObserver.disconnect();
    this.nonScrollableContainerResizeObserver.disconnect();
    chatContext.interactions = [];
  }
  render() {
    var _a, _b, _c;
    const lastInteraction = (_a = chatContext.interactions) === null || _a === void 0 ? void 0 : _a[chatContext.interactions.length - 1];
    const lastInteractionStatus = lastInteraction === null || lastInteraction === void 0 ? void 0 : lastInteraction.status;
    const hasInteractions = ((_b = chatContext.interactions) === null || _b === void 0 ? void 0 : _b.length) > 0;
    return h(Host, { key: "74c7afa1eac5c0ce2509af085eafe36e0ea445c0" }, this.showClearChat && hasInteractions && h("div", { key: "f4e3f63a5bb56e3d716f74e24c349871b43fe2aa", class: "header" }, h("button", { key: "55c315f0d728a55c062875ba9bd46c62c4d6da4f", type: "button", onClick: () => chatContext.chatService.resetChat() }, h("ph-arrow-clockwise", { key: "b915ab09bda41758c4a4b8c11358bf7d56cab9a7", weight: "fill", size: "14" }), " Clear chat")), h("div", { key: "cb8b6cfef450886d85765412b1dd5556e460a802", class: "messages-container-wrapper-non-scrollable" }, h("div", { key: "c4398a7368223626f1611d7b22b89b2aa7e6b840", class: `messages-container-wrapper ${!hasInteractions ? "isEmpty" : ""}`, ref: (ref) => this.messagesContainerRef = ref }, h("div", { key: "33550e9bbb8426e86a78627553e3d24ee538024d", ref: (ref) => this.nonScrollableMessagesContainerRef = ref }, hasInteractions ? h("orama-chat-messages-container", { interactions: chatContext.interactions, chatMarkdownLinkTitle: this.chatMarkdownLinkTitle, chatMarkdownLinkHref: this.chatMarkdownLinkHref }) : null, !hasInteractions ? h(Fragment, null, h("slot", { name: "chat-empty-state" }), !!((_c = this.suggestions) === null || _c === void 0 ? void 0 : _c.length) && h("div", { class: "suggestions-wrapper" }, h("orama-suggestions", { suggestions: this.suggestions, suggestionClicked: this.handleSuggestionClick }))) : null)), this.showGoToBottomButton && h("button", { key: "761da0b6c874b5bfedfbd69bdfebf51e88bfb440", class: "lock-scroll-on-bottom-button-wrapper", type: "button", onClick: () => {
      this.lockScrollOnBottom = true;
      this.scrollToBottom({ animated: true, onScrollDone: () => this.recalculateGoBoToBottomButton() });
    } }, h("ph-arrow-down", { key: "22fbc57f07c4f3fbd159b8a3afadb950237a05a5", size: "18px" }))), h("div", { key: "cf693c38543c191a25b3f07d5eb34fd138f963a9", class: "chat-form-wrapper" }, h("form", { key: "7871ce6699d908243839f1db7182ea718f491d5a", onSubmit: this.handleSubmit }, h("div", { key: "d89d0f4f581f1d00ffe479a8624ab3ea686b86d3", class: "chat-input" }, h("orama-textarea", { key: "26606c6980d1611c86c7e854357905f1e2d29772", ref: (ref) => this.textareaRef = ref, autoFocus: this.focusInput, maxRows: 4, value: this.inputValue, onKeyDown: (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        this.handleSubmit(e);
        e.preventDefault();
      }
    }, onInput: (e) => {
      this.inputValue = e.target.value;
    }, placeholder: this.placeholder }, h("div", { key: "59dcb5adb4bf09ac1b964a535a25bc097d8f4796", slot: "adornment-end" }, [TAnswerStatus.streaming, TAnswerStatus.rendering, TAnswerStatus.loading].includes(lastInteractionStatus) ? h("orama-button", { type: "submit", onClick: this.handleAbortAnswerClick, onKeyDown: this.handleAbortAnswerClick, disabled: lastInteractionStatus !== TAnswerStatus.rendering, "aria-label": "Abort answer" }, h("ph-stop-circle", { size: 16 })) : h("orama-button", { type: "submit", onClick: this.handleSubmit, onKeyDown: this.handleSubmit, disabled: !this.inputValue, "aria-label": "Send question" }, h("ph-paper-plane-tilt", { size: 16 })))))), h("orama-text", { key: "e69b210a41f53e5e71377fa7ab826e2adf60626d", as: "p", styledAs: "small", align: "center" }, "Orama can make mistakes. Please verify the information.")));
  }
  static get watchers() {
    return {
      "defaultTerm": ["handleDefaultTermChange"],
      "focusInput": ["focusInputWatcher"]
    };
  }
};
OramaChat.style = OramaChatStyle0;
var oramaChatMessagesContainerCss = "orama-chat-messages-container.sc-orama-chat-messages-container::-webkit-scrollbar{width:.3em}orama-chat-messages-container.sc-orama-chat-messages-container::-webkit-scrollbar-track{background:transparent}orama-chat-messages-container.sc-orama-chat-messages-container::-webkit-scrollbar-thumb{background-color:hsla(0,0%,70%,.522);border-radius:1rem;border-radius:var(--border-radius-l,calc(16rem/var(--orama-base-font-size, 16)))}.messages-container.sc-orama-chat-messages-container{display:flex;flex-direction:column;gap:1.5rem;gap:var(--spacing-xl,calc(24rem/var(--orama-base-font-size, 16)));margin:1rem 0;margin:var(--spacing-l,calc(16rem/var(--orama-base-font-size, 16))) 0;overflow:hidden}.suggestions-wrapper.sc-orama-chat-messages-container{margin-top:1.5rem;margin-top:var(--spacing-xl,calc(24rem/var(--orama-base-font-size, 16)))}";
var OramaChatMessagesContainerStyle0 = oramaChatMessagesContainerCss;
var OramaChatMessagesContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.answerGenerated = createEvent(this, "answerGenerated", 7);
    this.onSuggestionClick = (suggestion) => {
      var _a;
      (_a = chatContext.chatService) === null || _a === void 0 ? void 0 : _a.sendQuestion(suggestion, void 0, {
        onAnswerGeneratedCallback: (onAnswerGeneratedCallbackProps) => this.answerGenerated.emit(onAnswerGeneratedCallbackProps)
      });
    };
    this.resizeObserver = new ResizeObserver((entries) => {
      this.latestInteractionMinHeight = entries[0].target.clientHeight - 32;
    });
    this.interactions = void 0;
    this.chatMarkdownLinkTitle = void 0;
    this.chatMarkdownLinkHref = void 0;
    this.chatMarkdownLinkTarget = void 0;
    this.latestInteractionMinHeight = 0;
  }
  componentDidLoad() {
    const messagesWrapperElement = this.el.parentElement.parentElement;
    this.resizeObserver.observe(messagesWrapperElement);
  }
  render() {
    return h(Host, { key: "2761130794612aa64c273de88ce984f3f2146df9" }, h("div", { key: "2715f40c6720b16d9bc502d535eda88cd1722d14", class: "messages-container" }, this.interactions.map((interaction, interactionIndex) => {
      var _a;
      return h("div", {
        key: interaction.interactionId,
        class: "interaction-wrapper",
        // Hack to put the message on top when auto scrolling
        style: {
          minHeight: this.interactions.length > 1 && interactionIndex === this.interactions.length - 1 ? `${this.latestInteractionMinHeight}px` : "0px"
        }
      }, h("orama-chat-user-message", { interaction: Object.assign({}, interaction) }), h("orama-chat-assistent-message", { interaction: Object.assign({}, interaction), chatMarkdownLinkTitle: this.chatMarkdownLinkTitle, chatMarkdownLinkHref: this.chatMarkdownLinkHref }), interaction.latest && interaction.status === "done" && !!((_a = interaction.relatedQueries) === null || _a === void 0 ? void 0 : _a.length) && h("div", { class: "suggestions-wrapper" }, h("orama-suggestions", { as: "chips", suggestions: interaction.relatedQueries, suggestionClicked: this.onSuggestionClick })));
    })));
  }
  get el() {
    return getElement(this);
  }
};
OramaChatMessagesContainer.style = OramaChatMessagesContainerStyle0;
var oramaTextareaCss = ".sc-orama-textarea-h{align-items:center;background:#fff;background:var(--background-color-secondary,#fff);border:1px solid #dadada;border:1px solid var(--border-color-primary,#dadada);border-radius:1rem;border-radius:var(--radius-l,calc(16rem/var(--orama-base-font-size, 16)));box-shadow:0 4px 24px 0 #fff;box-shadow:0 4px 24px 0 var(--shadow-color-primary,#fff);display:flex;padding:.25rem .25rem .25rem .75rem;padding:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16))) var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16))) var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16))) var(--spacing-m,calc(12rem/var(--orama-base-font-size, 16)));position:relative}.sc-orama-textarea-s>[slot=adornment-end]{align-items:center;display:flex;justify-content:center}.textarea.sc-orama-textarea{background:none;border:none;color:#151515;color:var(--text-color-primary,#151515);font-family:inherit;font-size:1rem;font-size:var(--font-size-md,calc(16rem/var(--orama-base-font-size, 16)));font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);left:0;line-height:1.5;line-height:var(--font-line-height-m,1.5);margin:0;outline:none;padding:0;resize:none;right:0;transition:height .1s;width:100%}@media (min-width:768.02px){.textarea.sc-orama-textarea{font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));padding:.5rem 0;padding:var(--spacing-s,calc(8rem/var(--orama-base-font-size, 16))) 0}}.textarea.sc-orama-textarea::-moz-placeholder{color:#99989d;color:var(--text-color-inactive,#99989d);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:95%}.textarea.sc-orama-textarea::placeholder{color:#99989d;color:var(--text-color-inactive,#99989d);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:95%}.textarea.sc-orama-textarea:focus-visible{border-color:#ae8ff7;border-color:var(--border-color-accent,#ae8ff7);outline:none}.textarea.sc-orama-textarea::-webkit-scrollbar{width:.3em}.textarea.sc-orama-textarea::-webkit-scrollbar-track{background:transparent}.textarea.sc-orama-textarea::-webkit-scrollbar-thumb{background-color:hsla(0,0%,70%,.522);border-radius:1rem;border-radius:var(--border-radius-l,calc(16rem/var(--orama-base-font-size, 16)))}@media (min-width:768.02px){.textarea.sc-orama-textarea{font-size:1rem;font-size:var(--font-size-md,calc(16rem/var(--orama-base-font-size, 16)))}}";
var OramaTextareaStyle0 = oramaTextareaCss;
var OramaTextarea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.handleChange = (event) => {
      const target = event.target;
      if (!this.value) {
        this.syncHeight();
      }
      this.value = target.value;
    };
    this.value = "";
    this.maxRows = void 0;
    this.minRows = 1;
    this.placeholder = void 0;
    this.autoFocus = false;
    this.height = void 0;
    this.startAdornmentWidth = void 0;
    this.endAdornmentWidth = void 0;
  }
  handleAutoFocusChange() {
    if (this.autoFocus) {
      this.textarea.focus();
    }
  }
  componetWillLoad() {
    this.startAdornmentWidth = this.getNamedSlotWidth("adornment-start");
    this.endAdornmentWidth = this.getNamedSlotWidth("adornment-end");
    this.syncHeight();
    if (this.autoFocus) {
      this.textarea.focus();
    }
  }
  getNamedSlotWidth(slotName) {
    const slot = this.el.querySelector(`slot[name="${slotName}"]`);
    if (slot) {
      const assignedElements = slot.assignedElements();
      if (assignedElements.length > 0) {
        const firstAssignedElement = assignedElements[0];
        const width = firstAssignedElement.offsetWidth;
        return width;
      }
    }
    return 0;
  }
  handlePropsChange() {
    this.syncHeight();
  }
  getStyleValue(value) {
    return Number.parseInt(value, 10) || 0;
  }
  calculateTextareaStyles() {
    const input = this.textarea;
    const computedStyle = window.getComputedStyle(input);
    if (computedStyle.width === "0px") {
      return {
        outerHeightStyle: 0,
        overflowing: false
      };
    }
    const inputShallow = this.shadowTextarea;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || this.placeholder || "x";
    if (inputShallow.value.slice(-1) === "\n") {
      inputShallow.value += " ";
    }
    const boxSizing = computedStyle.boxSizing;
    const padding = this.getStyleValue(computedStyle.paddingBottom) + this.getStyleValue(computedStyle.paddingTop);
    const border = this.getStyleValue(computedStyle.borderBottomWidth) + this.getStyleValue(computedStyle.borderTopWidth);
    const innerHeight = inputShallow.scrollHeight;
    inputShallow.value = "x";
    const singleRowHeight = inputShallow.scrollHeight;
    let outerHeight = innerHeight;
    if (this.minRows) {
      outerHeight = Math.max(Number(this.minRows) * singleRowHeight, outerHeight);
    }
    if (this.maxRows) {
      outerHeight = Math.min(Number(this.maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
    const overflowing = Math.abs(outerHeight - innerHeight) <= 1;
    return { outerHeightStyle, overflowing };
  }
  syncHeight() {
    const textareaStyles = this.calculateTextareaStyles();
    if (!textareaStyles) {
      return;
    }
    const outerHeightStyle = textareaStyles.outerHeightStyle;
    if (this.height !== outerHeightStyle) {
      this.height = outerHeightStyle;
      this.textarea.style.height = `${outerHeightStyle}px`;
    }
    this.textarea.style.overflow = textareaStyles.overflowing ? "hidden" : "";
  }
  getAllProps() {
    const props = {};
    for (let i = 0; i < this.el.attributes.length; i++) {
      const attr = this.el.attributes[i];
      props[attr.name] = attr.value;
    }
    return props;
  }
  render() {
    return h(Host, { key: "8eaf1f567b4ef93b25aa1d26013c538e79ab6fd6" }, h("slot", { key: "df9c8005be8b2d4a1fbe9cdadd0050f346f8c7ea", name: "adornment-start" }), h("textarea", Object.assign({ key: "03ae54b593e2d4d6f7aa85082fb2cf75ad8df017" }, this.getAllProps(), { value: this.value, onInput: this.handleChange, ref: (el) => this.textarea = el, rows: Number(this.minRows), style: {
      height: this.height ? `${this.height}px` : void 0,
      paddingLeft: this.startAdornmentWidth ? `${this.startAdornmentWidth}px` : void 0,
      paddingRight: this.endAdornmentWidth ? `${this.endAdornmentWidth}px` : void 0
    }, class: "textarea", placeholder: this.placeholder })), h("slot", { key: "341650a8f01c82345456bc9438f51ceb14146b35", name: "adornment-end" }), h("textarea", { key: "7e2bd4a69f151c043d1bc59176a8baa9ae6f18fc", "aria-hidden": "true", readonly: true, ref: (el) => this.shadowTextarea = el, tabindex: -1, class: "textarea", style: {
      visibility: "hidden",
      position: "absolute",
      overflow: "hidden",
      height: "0",
      top: "0",
      left: "0",
      transform: "translateZ(0)",
      paddingTop: "0",
      paddingBottom: "0",
      paddingLeft: this.startAdornmentWidth ? `${this.startAdornmentWidth}px` : void 0,
      paddingRight: this.endAdornmentWidth ? `${this.endAdornmentWidth}px` : void 0
    } }));
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "autoFocus": ["handleAutoFocusChange"],
      "value": ["handlePropsChange"],
      "maxRows": ["handlePropsChange"],
      "minRows": ["handlePropsChange"]
    };
  }
};
OramaTextarea.style = OramaTextareaStyle0;
export {
  OramaChat as orama_chat,
  OramaChatMessagesContainer as orama_chat_messages_container,
  OramaTextarea as orama_textarea
};
//# sourceMappingURL=orama-chat_3.entry-M4MYUFOI.js.map
