import {
  createStore
} from "./chunk-CNMOQ2TW.js";

// node_modules/@orama/wc-components/dist/esm/chatContext-92438e72.js
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
var TAnswerStatus;
(function(TAnswerStatus2) {
  TAnswerStatus2["idle"] = "idle";
  TAnswerStatus2["loading"] = "loading";
  TAnswerStatus2["rendering"] = "rendering";
  TAnswerStatus2["streaming"] = "streaming";
  TAnswerStatus2["error"] = "error";
  TAnswerStatus2["aborted"] = "aborted";
  TAnswerStatus2["done"] = "done";
})(TAnswerStatus || (TAnswerStatus = {}));
var _a = createStore({
  chatService: null,
  interactions: [],
  sourceBaseURL: "",
  linksTarget: "_blank",
  linksRel: "noopener noreferrer",
  sourcesMap: {
    title: "title",
    description: "description",
    path: "path"
  }
});
var { state: chatContext } = _a;
var chatStore = __rest(_a, ["state"]);

export {
  TAnswerStatus,
  chatContext,
  chatStore
};
//# sourceMappingURL=chunk-EWDHTKD6.js.map
