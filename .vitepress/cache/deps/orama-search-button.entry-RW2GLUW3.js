import "./chunk-VKA6KFGM.js";
import {
  globalContext
} from "./chunk-5XZSI5PN.js";
import {
  generateRandomID
} from "./chunk-HXUFFIHY.js";
import "./chunk-OCFBAW7U.js";
import "./chunk-CNMOQ2TW.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-6BI6LT3C.js";
import "./chunk-KT2WZD7D.js";

// node_modules/@orama/wc-components/dist/esm/orama-search-button.entry.js
var oramaSearchButtonCss = ":host{display:block}.kyb-shortcut{background-color:#eee9f6;background-color:var(--background-color-tertiary,#eee9f6);border-radius:.5rem;border-radius:var(--radius-s,calc(8rem/var(--orama-base-font-size, 16)));padding:.25rem;padding:var(--spacing-xs,calc(4rem/var(--orama-base-font-size, 16))) var(--spacing-s,calc(4rem/var(--orama-base-font-size, 16)))}";
var OramaSearchButtonStyle0 = oramaSearchButtonCss;
var OramaSearchButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onPrefersColorSchemeChange = (event) => {
      this.systemScheme = event.matches ? "dark" : "light";
      this.updateTheme();
    };
    this.size = "medium";
    this.themeConfig = void 0;
    this.colorScheme = "light";
    this.systemScheme = "light";
    this.shortcutLabel = "";
    this.componentID = generateRandomID("search-button");
  }
  watchHandler() {
    this.updateTheme();
  }
  handleSearchboxClosed(event) {
    this.buttonRef.querySelector("button").focus();
  }
  // trigger click when entering  '⌘ K' o Mac or 'Ctrl + K'
  handleKeyDown(event) {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      this.buttonRef.click();
    }
  }
  updateTheme() {
    const scheme = this.colorScheme === "system" ? this.systemScheme : this.colorScheme;
    const uiElement = this.htmlElement;
    if (uiElement && scheme) {
      uiElement.classList.remove("theme-light", "theme-dark");
      uiElement.classList.add(`theme-${scheme}`);
    }
    this.updateCssVariables(scheme);
  }
  updateCssVariables(scheme) {
    var _a;
    const config = this.themeConfig;
    const root = this.htmlElement;
    if (root && config && scheme) {
      if ((_a = config.colors) === null || _a === void 0 ? void 0 : _a[scheme]) {
        for (const key of Object.keys(config.colors[scheme])) {
          root.style.setProperty(`${key}`, config.colors[scheme][key]);
        }
      }
      if (config.typography) {
        for (const key of Object.keys(config.typography)) {
          root.style.setProperty(`${key}`, config.typography[key]);
        }
      }
    }
  }
  handleShortcutLabel() {
    const userAgent = navigator.userAgent;
    const isMac = userAgent.includes("Mac");
    return isMac ? "⌘ K" : "Ctrl + K";
  }
  connectedCallback() {
    this.htmlElement.id = this.componentID;
    this.shortcutLabel = this.handleShortcutLabel();
    this.schemaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.systemScheme = this.schemaQuery.matches ? "dark" : "light";
    this.updateTheme();
    this.schemaQuery.addEventListener("change", this.onPrefersColorSchemeChange);
  }
  disconnectedCallback() {
    this.schemaQuery.removeEventListener("change", this.onPrefersColorSchemeChange);
  }
  render() {
    return h(Host, { key: "36a6d128e60fb5a7f8d22aeaeb445ca66f5a0597" }, h("orama-button", { key: "12230e02534090022f32389fde6f860a0f8f85c3", type: "button", variant: "secondary", ref: (el) => this.buttonRef = el, size: this.size, onClick: () => {
      globalContext.open = true;
    } }, h("span", { key: "560eb4d67be3aa1bc80dd70fc81e25454aa28ba2", slot: "adorment-start" }, h("ph-magnifying-glass", { key: "91524e87b228891ba7f34b5bc8e94a24adb4d410" })), h("slot", { key: "d14ba966d4fbea87bb7f338f553ce3f410d1bd51" }), h("span", { key: "55ba1bf3440c2893c7e389c195ce4cd18e474841", slot: "adorment-end", class: "kyb-shortcut" }, this.shortcutLabel)));
  }
  get htmlElement() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "themeConfig": ["watchHandler"],
      "colorScheme": ["watchHandler"]
    };
  }
};
OramaSearchButton.style = OramaSearchButtonStyle0;
export {
  OramaSearchButton as orama_search_button
};
//# sourceMappingURL=orama-search-button.entry-RW2GLUW3.js.map
