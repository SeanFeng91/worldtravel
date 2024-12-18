import {
  FORMAT_DEFAULT
} from "./chunk-QNAROPK2.js";
import "./chunk-HKJ2B2AA.js";

// node_modules/dayjs/esm/plugin/advancedFormat/index.js
var advancedFormat_default = function(o, c) {
  var proto = c.prototype;
  var oldFormat = proto.format;
  proto.format = function(formatStr) {
    var _this = this;
    var locale = this.$locale();
    if (!this.isValid()) {
      return oldFormat.bind(this)(formatStr);
    }
    var utils = this.$utils();
    var str = formatStr || FORMAT_DEFAULT;
    var result = str.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(match) {
      switch (match) {
        case "Q":
          return Math.ceil((_this.$M + 1) / 3);
        case "Do":
          return locale.ordinal(_this.$D);
        case "gggg":
          return _this.weekYear();
        case "GGGG":
          return _this.isoWeekYear();
        case "wo":
          return locale.ordinal(_this.week(), "W");
        case "w":
        case "ww":
          return utils.s(_this.week(), match === "w" ? 1 : 2, "0");
        case "W":
        case "WW":
          return utils.s(_this.isoWeek(), match === "W" ? 1 : 2, "0");
        case "k":
        case "kk":
          return utils.s(String(_this.$H === 0 ? 24 : _this.$H), match === "k" ? 1 : 2, "0");
        case "X":
          return Math.floor(_this.$d.getTime() / 1e3);
        case "x":
          return _this.$d.getTime();
        case "z":
          return "[" + _this.offsetName() + "]";
        case "zzz":
          return "[" + _this.offsetName("long") + "]";
        default:
          return match;
      }
    });
    return oldFormat.bind(this)(result);
  };
};
export {
  advancedFormat_default as default
};
//# sourceMappingURL=dayjs_plugin_advancedFormat__js.js.map
