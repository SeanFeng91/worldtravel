import {
  ChatService,
  OramaClientNotInitializedError
} from "./chunk-LGL2XIKM.js";
import {
  searchState
} from "./chunk-DSQPHNU4.js";
import {
  globalContext,
  globalStore
} from "./chunk-5XZSI5PN.js";
import {
  Switch,
  arrowKeysNavigation,
  generateRandomID,
  initOramaClient,
  validateCloudIndexConfig
} from "./chunk-HXUFFIHY.js";
import {
  chatContext
} from "./chunk-EWDHTKD6.js";
import "./chunk-CNMOQ2TW.js";
import {
  Fragment,
  createEvent,
  getElement,
  h,
  registerInstance
} from "./chunk-6BI6LT3C.js";
import "./chunk-KT2WZD7D.js";

// node_modules/@orama/wc-components/dist/esm/orama-search-box.entry.js
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var LIMIT_RESULTS = 10;
var SearchService = class {
  constructor(oramaClient) {
    this.search = async (term, selectedFacet, callbacks) => {
      var _a;
      if (!this.oramaClient) {
        throw new OramaClientNotInitializedError();
      }
      this.abortSearch();
      if (!term) {
        searchState.results = [];
        searchState.count = 0;
        searchState.facets = [];
        searchState.highlightedIndex = -1;
        return;
      }
      searchState.loading = true;
      const latestAbortController = this.abortController;
      const _b = (_a = searchState.searchParams) !== null && _a !== void 0 ? _a : {}, { limit, offset, where } = _b, restSearchParams = __rest(_b, ["limit", "offset", "where"]);
      const clientSearchParams = Object.assign(Object.assign(Object.assign(Object.assign({}, restSearchParams), { term, limit: limit || LIMIT_RESULTS }), where ? { where } : {}), searchState.facetProperty && Object.assign({ facets: {
        [searchState.facetProperty]: {}
      } }, selectedFacet && selectedFacet !== "All" && {
        where: Object.assign({ [searchState.facetProperty]: {
          eq: selectedFacet
        } }, where)
      }));
      await this.oramaClient.search(clientSearchParams, { abortController: this.abortController }).then((results) => {
        var _a2;
        if (latestAbortController.signal.aborted) {
          return;
        }
        searchState.results = this.parserResults(results === null || results === void 0 ? void 0 : results.hits, searchState.resultMap);
        searchState.count = (results === null || results === void 0 ? void 0 : results.count) || 0;
        searchState.facets = this.parseFacets(results === null || results === void 0 ? void 0 : results.facets, searchState.facetProperty);
        searchState.highlightedIndex = -1;
        searchState.loading = false;
        (_a2 = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onSearchCompletedCallback) === null || _a2 === void 0 ? void 0 : _a2.call(callbacks, {
          clientSearchParams,
          result: {
            results: searchState.results,
            resultsCount: searchState.count,
            facets: searchState.facets
          }
        });
      }).catch((error) => {
        var _a2;
        searchState.loading = false;
        (_a2 = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onSearchErrorCallback) === null || _a2 === void 0 ? void 0 : _a2.call(callbacks, error);
      });
    };
    this.retry = () => {
      throw new Error("Not implemented");
    };
    this.parserResults = (hits, resultMap) => {
      if (!hits) {
        return [];
      }
      const perSectionResults = [];
      const arraySectionMap = {};
      for (const hit of hits) {
        const searchResultWithScore = this.hitToSearchResultParser(hit, resultMap);
        const sectionKey = typeof resultMap.section === "function" ? resultMap.section(hit.document) : resultMap.section;
        const documentSectionValue = hit.document[sectionKey];
        if (arraySectionMap[documentSectionValue] === void 0) {
          perSectionResults.push({
            section: documentSectionValue,
            items: [searchResultWithScore]
          });
          arraySectionMap[documentSectionValue] = perSectionResults.length - 1;
        } else {
          const sectionIndex = arraySectionMap[documentSectionValue];
          perSectionResults[sectionIndex].items.push(searchResultWithScore);
        }
      }
      return perSectionResults;
    };
    this.hitToSearchResultParser = (hit, resultMap) => {
      function getResultMapValue(resultMapKey) {
        const resultMapFunctionOrString = resultMap[resultMapKey];
        if (!resultMapFunctionOrString) {
          return hit.document[resultMapKey];
        }
        if (typeof resultMapFunctionOrString === "function") {
          const resultMapFunction = resultMapFunctionOrString;
          return resultMapFunction(hit.document);
        }
        const resultMapString = resultMap[resultMapKey];
        return hit.document[resultMapString];
      }
      return {
        id: hit.id,
        score: hit.score,
        title: getResultMapValue("title"),
        description: getResultMapValue("description"),
        path: getResultMapValue("path")
      };
    };
    this.parseFacets = (rawFacets, facetProperty) => {
      var _a;
      if (!facetProperty || !rawFacets || !((_a = rawFacets[facetProperty]) === null || _a === void 0 ? void 0 : _a.values)) {
        return [];
      }
      const facetPropertyObject = rawFacets[facetProperty];
      const totalCount = Object.values(facetPropertyObject.values).reduce((acc, count) => acc + count, 0);
      const allFacets = Object.keys(facetPropertyObject.values).map((key) => {
        return {
          name: key,
          count: facetPropertyObject.values[key]
        };
      });
      allFacets.unshift({ name: "All", count: totalCount });
      return allFacets;
    };
    this.oramaClient = new Switch(oramaClient);
    this.abortController = new AbortController();
  }
  abortSearch() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
};
var WindowService = class extends EventTarget {
  constructor() {
    super();
    this._width = window.innerWidth;
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.handleResize);
  }
  handleResize() {
    this._width = window.innerWidth;
    this.dispatchEvent(new CustomEvent("widthChange", { detail: this._width }));
  }
  get width() {
    return this._width;
  }
};
var windowWidthListener = new WindowService();
var oramaSearchBoxCss = "@keyframes showIn{0%{opacity:0;transform:translateY(-25%)}to{opacity:1;transform:translateY(0)}}@media (min-width:1024.02px){.modal orama-input{border-radius:0;margin:0;padding:0}.modal input[type=search]{border-radius:.75rem .75rem 0 0;border-radius:var(--radius-m,calc(12rem/var(--orama-base-font-size, 16))) var(--radius-m,calc(12rem/var(--orama-base-font-size, 16))) 0 0}}.main{flex-direction:column;flex-grow:1}.main,.section-active{display:flex;overflow:hidden}.section-inactive{display:none}";
var OramaSearchBoxStyle0 = oramaSearchBoxCss;
var SearchBox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.searchCompleted = createEvent(this, "searchCompleted", 7);
    this.searchResultClick = createEvent(this, "searchResultClick", 7);
    this.answerGenerated = createEvent(this, "answerGenerated", 7);
    this.answerSourceClick = createEvent(this, "answerSourceClick", 7);
    this.chatMarkdownLinkClicked = createEvent(this, "chatMarkdownLinkClicked", 7);
    this.closeSearchbox = () => {
      globalContext.open = false;
      this.open = false;
    };
    this.onChatButtonClick = () => {
      globalContext.currentTask = "chat";
    };
    this.onPrefersColorSchemeChange = (event) => {
      this.systemScheme = event.matches ? "dark" : "light";
      this.updateTheme();
    };
    this.updateWindowWidth = (event) => {
      this.windowWidth = event.detail;
    };
    this.themeConfig = void 0;
    this.colorScheme = "light";
    this.index = void 0;
    this.clientInstance = void 0;
    this.open = false;
    this.facetProperty = void 0;
    this.resultMap = {};
    this.sourceBaseUrl = void 0;
    this.linksTarget = void 0;
    this.linksRel = void 0;
    this.sourcesMap = void 0;
    this.disableChat = false;
    this.layout = "modal";
    this.highlightTitle = false;
    this.highlightDescription = false;
    this.placeholder = void 0;
    this.chatPlaceholder = void 0;
    this.searchPlaceholder = void 0;
    this.suggestions = void 0;
    this.searchParams = void 0;
    this.chatMarkdownLinkTitle = void 0;
    this.chatMarkdownLinkHref = void 0;
    this.chatMarkdownLinkTarget = void 0;
    this.componentID = generateRandomID("search-box");
    this.systemScheme = "light";
    this.windowWidth = void 0;
  }
  indexChanged() {
    this.startServices();
  }
  watchHandler() {
    this.updateTheme();
  }
  handleOpenPropChange(newValue) {
    globalContext.open = newValue;
  }
  handleFacetPropertyChange(newValue) {
    searchState.facetProperty = newValue;
  }
  handleSearchParamsChange(newValue) {
    searchState.searchParams = newValue;
  }
  modalStatusChangedHandler(event) {
    if (event.detail.id === this.wrapperRef) {
      if (!event.detail.open) {
        globalContext.open = false;
        this.open = false;
      }
    }
  }
  handleKeyDown(ev) {
    if (globalContext.currentTask === "search" && (this.layout === "modal" && this.open || this.layout === "embed") && ["ArrowDown", "ArrowUp"].includes(ev.key)) {
      arrowKeysNavigation(this.wrapperRef, ev);
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
  startServices() {
    validateCloudIndexConfig(this.htmlElement, this.index, this.clientInstance);
    const oramaClient = this.clientInstance ? this.clientInstance : initOramaClient(this.index);
    searchState.searchService = new SearchService(oramaClient);
    chatContext.chatService = new ChatService(oramaClient);
  }
  componentWillLoad() {
    searchState.facetProperty = this.facetProperty;
    searchState.resultMap = this.resultMap;
    searchState.searchParams = this.searchParams;
    this.htmlElement.id = this.componentID;
    this.startServices();
  }
  connectedCallback() {
    this.windowWidth = windowWidthListener.width;
    globalContext.open = this.open;
    globalStore.onChange("open", () => {
      this.open = globalContext.open;
      if (!globalContext.open) {
        globalContext.currentTerm = "";
        searchState.facets = [];
        searchState.count = 0;
        searchState.results = [];
        searchState.highlightedIndex = -1;
        searchState.loading = false;
        searchState.error = false;
        chatContext.interactions = [];
      }
    });
    this.htmlElement.id = this.componentID;
    this.schemaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.systemScheme = this.schemaQuery.matches ? "dark" : "light";
    this.updateTheme();
    this.schemaQuery.addEventListener("change", this.onPrefersColorSchemeChange);
    windowWidthListener.addEventListener("widthChange", this.updateWindowWidth);
  }
  disconnectedCallback() {
    var _a;
    windowWidthListener.removeEventListener("widthChange", this.updateWindowWidth);
    (_a = this.schemaQuery) === null || _a === void 0 ? void 0 : _a.removeEventListener("change", this.onPrefersColorSchemeChange);
  }
  getSearchBox() {
    return h("div", { class: `${this.windowWidth > 1024 ? "section-active" : globalContext.currentTask === "search" ? "section-active" : "section-inactive"}` }, h("orama-search", { placeholder: (this === null || this === void 0 ? void 0 : this.searchPlaceholder) || "Search...", focusInput: globalContext.currentTask === "search", sourceBaseUrl: this.sourceBaseUrl, linksTarget: this.linksTarget, linksRel: this.linksRel, highlightTitle: this.highlightTitle, highlightDescription: this.highlightDescription, disableChat: this.disableChat, suggestions: this.suggestions }, this.windowWidth > 1024 && !this.disableChat && h("orama-chat-button", { slot: "summary", "focus-on-arrow-nav": true, active: !!globalContext.currentTerm, label: `${globalContext.currentTerm ? `${globalContext.currentTerm} - ` : ""}Get a summary`, onClick: this.onChatButtonClick, onKeyPress: this.onChatButtonClick })));
  }
  getChatBox() {
    return h(Fragment, null, h("orama-chat", { class: `${globalContext.currentTask === "chat" ? "section-active" : "section-inactive"}`, defaultTerm: globalContext.currentTask === "chat" ? globalContext.currentTerm : "", showClearChat: false, focusInput: globalContext.currentTask === "chat", placeholder: (this === null || this === void 0 ? void 0 : this.chatPlaceholder) || this.placeholder, sourceBaseUrl: this.sourceBaseUrl, linksTarget: this.linksTarget, linksRel: this.linksRel, sourcesMap: this.sourcesMap, suggestions: this.suggestions, chatMarkdownLinkTitle: this.chatMarkdownLinkTitle, chatMarkdownLinkHref: this.chatMarkdownLinkHref }));
  }
  getInnerContent() {
    return h(Fragment, null, this.disableChat ? null : h("orama-navigation-bar", { handleClose: this.closeSearchbox, showBackButton: this.layout !== "embed", showChatActions: globalContext.currentTask === "chat" }), h("div", { class: "main" }, this.getSearchBox(), this.windowWidth <= 1024 && this.getChatBox()), h("orama-footer", { colorScheme: this.colorScheme === "system" ? this.systemScheme : this.colorScheme }));
  }
  getOuterContent() {
    return this.windowWidth > 1024 ? h("orama-sliding-panel", { open: globalContext.currentTask === "chat", backdrop: this.layout === "embed", closed: () => {
      globalContext.currentTask = "search";
    } }, this.getChatBox()) : null;
  }
  getModalLayout() {
    return h(Fragment, null, h("orama-modal", { ref: (el) => this.wrapperRef = el, open: globalContext.open, class: "modal", mainTitle: "Start your search", closeOnEscape: globalContext.currentTask === "search" || this.windowWidth <= 1024 }, this.getInnerContent()), this.getOuterContent());
  }
  getEmbedLayout() {
    return h(Fragment, null, h("orama-embed", { ref: (el) => this.wrapperRef = el }, this.getInnerContent()), this.getOuterContent());
  }
  render() {
    if (this.layout === "modal" && !globalContext.open) {
      return null;
    }
    if (!searchState.searchService) {
      return h("orama-text", { as: "p" }, "Unable to initialize search service");
    }
    if (!chatContext.chatService) {
      return h("orama-text", { as: "p" }, "Unable to initialize chat service");
    }
    return this.layout === "modal" ? this.getModalLayout() : this.getEmbedLayout();
  }
  get htmlElement() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "index": ["indexChanged"],
      "clientInstance": ["indexChanged"],
      "themeConfig": ["watchHandler"],
      "colorScheme": ["watchHandler"],
      "open": ["handleOpenPropChange"],
      "facetProperty": ["handleFacetPropertyChange"],
      "searchParams": ["handleSearchParamsChange"]
    };
  }
};
SearchBox.style = OramaSearchBoxStyle0;
export {
  SearchBox as orama_search_box
};
//# sourceMappingURL=orama-search-box.entry-TFSV5NWR.js.map
