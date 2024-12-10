import {
  createStore
} from "./chunk-CNMOQ2TW.js";

// node_modules/@orama/wc-components/dist/esm/searchContext-09706a50.js
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
var store = createStore({
  count: 0,
  facets: [],
  facetProperty: "",
  // TODO: consider to move to resultsMap
  results: [],
  resultMap: {},
  highlightedIndex: -1,
  loading: false,
  error: false,
  // TODO: Probable needs to be held in component property.
  // Lets queckly dicudd about this again.
  searchService: null,
  searchParams: null
});
var { state: searchState } = store;
__rest(store, ["state"]);

export {
  searchState
};
//# sourceMappingURL=chunk-DSQPHNU4.js.map
