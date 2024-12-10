import {
  bootstrapLazy
} from "./chunk-6BI6LT3C.js";
import {
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  ref,
  withDirectives
} from "./chunk-T2YHX6WC.js";
import "./chunk-KT2WZD7D.js";

// node_modules/@orama/wc-components/dist/esm/app-globals-0f993ce5.js
var globalScripts = () => {
};

// node_modules/@orama/wc-components/dist/esm/loader.js
var defineCustomElements = async (win, options) => {
  if (typeof window === "undefined") return void 0;
  await globalScripts();
  return bootstrapLazy([["orama-search-box", [[1, "orama-search-box", { "themeConfig": [16], "colorScheme": [1, "color-scheme"], "index": [16], "clientInstance": [16], "open": [1028], "facetProperty": [1, "facet-property"], "resultMap": [16], "sourceBaseUrl": [1, "source-base-url"], "linksTarget": [1, "links-target"], "linksRel": [1, "links-rel"], "sourcesMap": [16], "disableChat": [4, "disable-chat"], "layout": [1], "highlightTitle": [4, "highlight-title"], "highlightDescription": [4, "highlight-description"], "placeholder": [1], "chatPlaceholder": [1, "chat-placeholder"], "searchPlaceholder": [1, "search-placeholder"], "suggestions": [16], "searchParams": [16], "chatMarkdownLinkTitle": [16], "chatMarkdownLinkHref": [16], "chatMarkdownLinkTarget": [16], "componentID": [32], "systemScheme": [32], "windowWidth": [32] }, [[0, "modalStatusChanged", "modalStatusChangedHandler"], [4, "keydown", "handleKeyDown"]], { "index": ["indexChanged"], "clientInstance": ["indexChanged"], "themeConfig": ["watchHandler"], "colorScheme": ["watchHandler"], "open": ["handleOpenPropChange"], "facetProperty": ["handleFacetPropertyChange"], "searchParams": ["handleSearchParamsChange"] }]]], ["orama-chat-box", [[1, "orama-chat-box", { "index": [16], "clientInstance": [16], "sourceBaseUrl": [1, "source-base-url"], "linksTarget": [1, "links-target"], "linksRel": [1, "links-rel"], "placeholder": [1], "sourcesMap": [16], "suggestions": [16], "autoFocus": [4, "auto-focus"], "systemPrompts": [16], "chatMarkdownLinkTitle": [16], "chatMarkdownLinkHref": [16], "chatMarkdownLinkTarget": [16], "componentID": [32] }, null, { "index": ["indexChanged"] }]]], ["orama-search-button", [[1, "orama-search-button", { "size": [1], "themeConfig": [16], "colorScheme": [1, "color-scheme"], "systemScheme": [32], "shortcutLabel": [32], "componentID": [32] }, [[16, "searchboxClosed", "handleSearchboxClosed"], [4, "keydown", "handleKeyDown"]], { "themeConfig": ["watchHandler"], "colorScheme": ["watchHandler"] }]]], ["orama-logo-icon", [[2, "orama-logo-icon", { "size": [2] }]]], ["orama-toggler", [[2, "orama-toggler", { "performInitialAnimation": [4, "perform-initial-animation"] }]]], ["orama-text", [[6, "orama-text", { "as": [1], "styledAs": [1, "styled-as"], "bold": [4], "class": [1], "align": [1], "variant": [1], "inactive": [4], "defaultStyle": [32] }]]], ["orama-chat-assistent-message_6", [[2, "orama-chat-assistent-message", { "interaction": [16], "chatMarkdownLinkTitle": [16], "chatMarkdownLinkHref": [16], "chatMarkdownLinkTarget": [16], "isCopied": [32], "isDisliked": [32] }], [2, "orama-chat-user-message", { "interaction": [16] }], [1, "orama-sources", { "sources": [8], "sourceBaseURL": [1, "source-base-u-r-l"], "linksTarget": [1, "links-target"], "linksRel": [1, "links-rel"], "sourcesMap": [16], "isCarouselScrollAtEnd": [32], "isCarouselScrollAtStart": [32] }], [2, "orama-dots-loader"], [1, "orama-markdown", { "content": [1], "chatMarkdownLinkTitle": [16], "chatMarkdownLinkHref": [16], "chatMarkdownLinkTarget": [16] }, null, { "content": ["onContentChange"] }], [2, "orama-suggestions", { "suggestions": [16], "as": [1], "icon": [16], "suggestionClicked": [16] }]]], ["orama-facets_3", [[2, "orama-search-results", { "sourceBaseUrl": [1, "source-base-url"], "linksTarget": [1, "links-target"], "linksRel": [1, "links-rel"], "sections": [16], "suggestions": [16], "searchTerm": [1, "search-term"], "setChatTerm": [16], "loading": [4], "error": [4], "highlightTitle": [4, "highlight-title"], "highlightDescription": [4, "highlight-description"] }], [2, "orama-facets", { "facets": [16], "selectedFacet": [1, "selected-facet"], "facetClicked": [16] }], [2, "orama-input", { "name": [1], "size": [1], "label": [1], "type": [1], "placeholder": [1], "labelForScreenReaders": [1, "label-for-screen-readers"], "defaultValue": [1, "default-value"], "autoFocus": [4, "auto-focus"], "inputRefReady": [32], "value": [32] }, null, { "autoFocus": ["handleAutoFocusChange"] }]]], ["orama-button", [[6, "orama-button", { "as": [1], "class": [1], "variant": [1], "size": [1], "type": [1], "disabled": [4], "withTooltip": [1, "with-tooltip"] }]]], ["orama-chat-button_7", [[6, "orama-search", { "placeholder": [1], "focusInput": [4, "focus-input"], "suggestions": [16], "sourceBaseUrl": [1, "source-base-url"], "linksTarget": [1, "links-target"], "linksRel": [1, "links-rel"], "disableChat": [4, "disable-chat"], "highlightTitle": [4, "highlight-title"], "highlightDescription": [4, "highlight-description"], "searchValue": [32], "selectedFacet": [32] }, [[0, "oramaItemClick", "handleOramaItemClick"]], { "searchValue": ["handleSearchValueChange"], "selectedFacet": ["handleSearchValueChange"] }], [2, "orama-navigation-bar", { "handleClose": [16], "showBackButton": [4, "show-back-button"], "showChatActions": [4, "show-chat-actions"] }], [2, "orama-footer", { "class": [1], "colorScheme": [16] }], [2, "orama-chat-button", { "label": [1], "active": [4], "highlight": [4], "class": [1] }, null, { "active": ["highlightButton"], "highlight": ["highlightButton"] }], [6, "orama-embed"], [6, "orama-modal", { "open": [4], "closeOnEscape": [4, "close-on-escape"], "closeOnOutsideClick": [4, "close-on-outside-click"], "mainTitle": [1, "main-title"], "activeElement": [32], "modalIsOpen": [32] }, [[4, "keydown", "handleKeyDown"]], { "modalIsOpen": ["handleOpenChange"], "open": ["handleOpenPropChange"] }], [6, "orama-sliding-panel", { "backdrop": [4], "open": [4], "closed": [16], "isOpen": [32] }, [[4, "keydown", "handleKeyDown"]], { "open": ["openChanged"] }]]], ["orama-chat_3", [[4, "orama-chat", { "placeholder": [1], "sourceBaseUrl": [1, "source-base-url"], "linksTarget": [1, "links-target"], "linksRel": [1, "links-rel"], "sourcesMap": [16], "showClearChat": [4, "show-clear-chat"], "defaultTerm": [1, "default-term"], "focusInput": [4, "focus-input"], "suggestions": [16], "systemPrompts": [16], "chatMarkdownLinkTitle": [16], "chatMarkdownLinkHref": [16], "chatMarkdownLinkTarget": [16], "inputValue": [32], "showGoToBottomButton": [32] }, [[0, "sourceItemClick", "handleSourceItemClick"]], { "defaultTerm": ["handleDefaultTermChange"], "focusInput": ["focusInputWatcher"] }], [2, "orama-chat-messages-container", { "interactions": [16], "chatMarkdownLinkTitle": [16], "chatMarkdownLinkHref": [16], "chatMarkdownLinkTarget": [16], "latestInteractionMinHeight": [32] }], [6, "orama-textarea", { "value": [1], "maxRows": [8, "max-rows"], "minRows": [8, "min-rows"], "placeholder": [1], "autoFocus": [4, "auto-focus"], "height": [32], "startAdornmentWidth": [32], "endAdornmentWidth": [32] }, null, { "autoFocus": ["handleAutoFocusChange"], "value": ["handlePropsChange"], "maxRows": ["handlePropsChange"], "minRows": ["handlePropsChange"] }]]]], options);
};

// node_modules/@orama/wc-components/loader/index.js
(function() {
  if ("undefined" !== typeof window && void 0 !== window.Reflect && void 0 !== window.customElements) {
    var a = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(a, [], this.constructor);
    };
    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
  }
})();

// node_modules/@orama/vue-components/dist/vue-component-lib/utils.js
var UPDATE_VALUE_EVENT = "update:modelValue";
var MODEL_VALUE = "modelValue";
var ROUTER_LINK_VALUE = "routerLink";
var NAV_MANAGER = "navManager";
var ROUTER_PROP_PREFIX = "router";
var ARIA_PROP_PREFIX = "aria";
var EMPTY_PROP = Symbol();
var DEFAULT_EMPTY_PROP = { default: EMPTY_PROP };
var getComponentClasses = (classes) => {
  return (classes === null || classes === void 0 ? void 0 : classes.split(" ")) || [];
};
var getElementClasses = (ref2, componentClasses, defaultClasses = []) => {
  var _a;
  return [...Array.from(((_a = ref2.value) === null || _a === void 0 ? void 0 : _a.classList) || []), ...defaultClasses].filter((c, i, self) => !componentClasses.has(c) && self.indexOf(c) === i);
};
var defineContainer = (name, defineCustomElement, componentProps = [], modelProp, modelUpdateEvent) => {
  if (defineCustomElement !== void 0) {
    defineCustomElement();
  }
  const Container = defineComponent((props, { attrs, slots, emit }) => {
    var _a;
    let modelPropValue = props[modelProp];
    const containerRef = ref();
    const classes = new Set(getComponentClasses(attrs.class));
    const vModelDirective = {
      created: (el) => {
        const eventsNames = Array.isArray(modelUpdateEvent) ? modelUpdateEvent : [modelUpdateEvent];
        eventsNames.forEach((eventName) => {
          el.addEventListener(eventName.toLowerCase(), (e) => {
            if (e.target.tagName === el.tagName) {
              modelPropValue = (e === null || e === void 0 ? void 0 : e.target)[modelProp];
              emit(UPDATE_VALUE_EVENT, modelPropValue);
            }
          });
        });
      }
    };
    const currentInstance = getCurrentInstance();
    const hasRouter = (_a = currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.appContext) === null || _a === void 0 ? void 0 : _a.provides[NAV_MANAGER];
    const navManager = hasRouter ? inject(NAV_MANAGER) : void 0;
    const handleRouterLink = (ev) => {
      const { routerLink } = props;
      if (routerLink === EMPTY_PROP)
        return;
      if (navManager !== void 0) {
        let navigationPayload = { event: ev };
        for (const key in props) {
          const value = props[key];
          if (props.hasOwnProperty(key) && key.startsWith(ROUTER_PROP_PREFIX) && value !== EMPTY_PROP) {
            navigationPayload[key] = value;
          }
        }
        navManager.navigate(navigationPayload);
      } else {
        console.warn("Tried to navigate, but no router was found. Make sure you have mounted Vue Router.");
      }
    };
    return () => {
      modelPropValue = props[modelProp];
      getComponentClasses(attrs.class).forEach((value) => {
        classes.add(value);
      });
      const oldClick = props.onClick;
      const handleClick = (ev) => {
        if (oldClick !== void 0) {
          oldClick(ev);
        }
        if (!ev.defaultPrevented) {
          handleRouterLink(ev);
        }
      };
      let propsToAdd = {
        ref: containerRef,
        class: getElementClasses(containerRef, classes),
        onClick: handleClick
      };
      for (const key in props) {
        const value = props[key];
        if (props.hasOwnProperty(key) && value !== EMPTY_PROP || key.startsWith(ARIA_PROP_PREFIX)) {
          propsToAdd[key] = value;
        }
      }
      if (modelProp) {
        if (props[MODEL_VALUE] !== EMPTY_PROP) {
          propsToAdd = Object.assign(Object.assign({}, propsToAdd), { [modelProp]: props[MODEL_VALUE] });
        } else if (modelPropValue !== EMPTY_PROP) {
          propsToAdd = Object.assign(Object.assign({}, propsToAdd), { [modelProp]: modelPropValue });
        }
      }
      const node = h(name, propsToAdd, slots.default && slots.default());
      return modelProp === void 0 ? node : withDirectives(node, [[vModelDirective]]);
    };
  });
  if (typeof Container !== "function") {
    Container.name = name;
    Container.props = {
      [ROUTER_LINK_VALUE]: DEFAULT_EMPTY_PROP
    };
    componentProps.forEach((componentProp) => {
      Container.props[componentProp] = DEFAULT_EMPTY_PROP;
    });
    if (modelProp) {
      Container.props[MODEL_VALUE] = DEFAULT_EMPTY_PROP;
      Container.emits = [UPDATE_VALUE_EVENT];
    }
  }
  return Container;
};

// node_modules/@orama/vue-components/dist/plugin.js
var ComponentLibrary = {
  install(app) {
    defineContainer(null, defineCustomElements);
  }
};

// node_modules/@orama/vue-components/dist/components.js
var OramaButton = defineContainer("orama-button", void 0, [
  "as",
  "class",
  "variant",
  "size",
  "type",
  "disabled",
  "withTooltip"
]);
var OramaChat = defineContainer("orama-chat", void 0, [
  "placeholder",
  "sourceBaseUrl",
  "linksTarget",
  "linksRel",
  "sourcesMap",
  "showClearChat",
  "defaultTerm",
  "focusInput",
  "suggestions",
  "systemPrompts",
  "chatMarkdownLinkTitle",
  "chatMarkdownLinkHref",
  "chatMarkdownLinkTarget",
  "answerGenerated"
]);
var OramaChatAssistentMessage = defineContainer("orama-chat-assistent-message", void 0, [
  "interaction",
  "chatMarkdownLinkTitle",
  "chatMarkdownLinkHref",
  "chatMarkdownLinkTarget"
]);
var OramaChatBox = defineContainer("orama-chat-box", void 0, [
  "index",
  "clientInstance",
  "sourceBaseUrl",
  "linksTarget",
  "linksRel",
  "placeholder",
  "sourcesMap",
  "suggestions",
  "autoFocus",
  "systemPrompts",
  "chatMarkdownLinkTitle",
  "chatMarkdownLinkHref",
  "chatMarkdownLinkTarget",
  "answerGenerated",
  "answerSourceClick",
  "chatMarkdownLinkClicked"
]);
var OramaChatButton = defineContainer("orama-chat-button", void 0, [
  "label",
  "active",
  "highlight",
  "class"
]);
var OramaChatMessagesContainer = defineContainer("orama-chat-messages-container", void 0, [
  "interactions",
  "chatMarkdownLinkTitle",
  "chatMarkdownLinkHref",
  "chatMarkdownLinkTarget",
  "answerGenerated"
]);
var OramaChatUserMessage = defineContainer("orama-chat-user-message", void 0, [
  "interaction"
]);
var OramaDotsLoader = defineContainer("orama-dots-loader", void 0);
var OramaEmbed = defineContainer("orama-embed", void 0);
var OramaFacets = defineContainer("orama-facets", void 0, [
  "facets",
  "selectedFacet",
  "facetClicked"
]);
var OramaFooter = defineContainer("orama-footer", void 0, [
  "class",
  "colorScheme"
]);
var OramaInput = defineContainer("orama-input", void 0, [
  "name",
  "size",
  "label",
  "type",
  "placeholder",
  "labelForScreenReaders",
  "defaultValue",
  "autoFocus",
  "resetValue"
]);
var OramaLogoIcon = defineContainer("orama-logo-icon", void 0, [
  "size"
]);
var OramaMarkdown = defineContainer("orama-markdown", void 0, [
  "content",
  "chatMarkdownLinkTitle",
  "chatMarkdownLinkHref",
  "chatMarkdownLinkTarget",
  "chatMarkdownLinkClicked"
]);
var OramaModal = defineContainer("orama-modal", void 0, [
  "open",
  "closeOnEscape",
  "closeOnOutsideClick",
  "mainTitle",
  "modalStatusChanged"
]);
var OramaNavigationBar = defineContainer("orama-navigation-bar", void 0, [
  "handleClose",
  "showBackButton",
  "showChatActions"
]);
var OramaSearch = defineContainer("orama-search", void 0, [
  "placeholder",
  "focusInput",
  "suggestions",
  "sourceBaseUrl",
  "linksTarget",
  "linksRel",
  "disableChat",
  "highlightTitle",
  "highlightDescription",
  "searchCompleted",
  "answerGenerated"
]);
var OramaSearchBox = defineContainer("orama-search-box", void 0, [
  "themeConfig",
  "colorScheme",
  "index",
  "clientInstance",
  "open",
  "facetProperty",
  "resultMap",
  "sourceBaseUrl",
  "linksTarget",
  "linksRel",
  "sourcesMap",
  "disableChat",
  "layout",
  "highlightTitle",
  "highlightDescription",
  "placeholder",
  "chatPlaceholder",
  "searchPlaceholder",
  "suggestions",
  "searchParams",
  "chatMarkdownLinkTitle",
  "chatMarkdownLinkHref",
  "chatMarkdownLinkTarget",
  "searchCompleted",
  "searchResultClick",
  "answerGenerated",
  "answerSourceClick",
  "chatMarkdownLinkClicked"
]);
var OramaSearchButton = defineContainer("orama-search-button", void 0, [
  "size",
  "themeConfig",
  "colorScheme"
]);
var OramaSearchResults = defineContainer("orama-search-results", void 0, [
  "sourceBaseUrl",
  "linksTarget",
  "linksRel",
  "sections",
  "suggestions",
  "searchTerm",
  "setChatTerm",
  "loading",
  "error",
  "highlightTitle",
  "highlightDescription",
  "searchResultClick"
]);
var OramaSlidingPanel = defineContainer("orama-sliding-panel", void 0, [
  "backdrop",
  "open",
  "closed"
]);
var OramaSources = defineContainer("orama-sources", void 0, [
  "sources",
  "sourceBaseURL",
  "linksTarget",
  "linksRel",
  "sourcesMap",
  "answerSourceClick"
]);
var OramaSuggestions = defineContainer("orama-suggestions", void 0, [
  "suggestions",
  "as",
  "icon",
  "suggestionClicked"
]);
var OramaText = defineContainer("orama-text", void 0, [
  "as",
  "styledAs",
  "bold",
  "class",
  "align",
  "variant",
  "inactive"
]);
var OramaTextarea = defineContainer("orama-textarea", void 0, [
  "value",
  "maxRows",
  "minRows",
  "placeholder",
  "autoFocus"
]);
var OramaToggler = defineContainer("orama-toggler", void 0, [
  "performInitialAnimation"
]);

// node_modules/@orama/vue-components/dist/index.js
import "C:/Users/maoxi/AI-inferencecH/worldtravel/node_modules/@orama/wc-components/dist/orama-ui/orama-ui.css";
export {
  ComponentLibrary,
  OramaButton,
  OramaChat,
  OramaChatAssistentMessage,
  OramaChatBox,
  OramaChatButton,
  OramaChatMessagesContainer,
  OramaChatUserMessage,
  OramaDotsLoader,
  OramaEmbed,
  OramaFacets,
  OramaFooter,
  OramaInput,
  OramaLogoIcon,
  OramaMarkdown,
  OramaModal,
  OramaNavigationBar,
  OramaSearch,
  OramaSearchBox,
  OramaSearchButton,
  OramaSearchResults,
  OramaSlidingPanel,
  OramaSources,
  OramaSuggestions,
  OramaText,
  OramaTextarea,
  OramaToggler
};
//# sourceMappingURL=@orama_vue-components.js.map
