import {
  createStore
} from "./chunk-CNMOQ2TW.js";

// node_modules/@orama/wc-components/dist/esm/GlobalContext-0a87b8bd.js
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
var _a = createStore({
  open: false,
  currentTask: "search",
  currentTerm: ""
});
var { state: globalContext } = _a;
var globalStore = __rest(_a, ["state"]);

export {
  globalContext,
  globalStore
};
//# sourceMappingURL=chunk-5XZSI5PN.js.map
