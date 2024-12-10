import {
  getNonExplicitAttributes
} from "./chunk-HXUFFIHY.js";
import {
  getElement,
  h,
  registerInstance
} from "./chunk-6BI6LT3C.js";
import "./chunk-KT2WZD7D.js";

// node_modules/@orama/wc-components/dist/esm/orama-text.entry.js
var oramaTextCss = ".p.sc-orama-text{color:#151515;color:var(--text-color-primary,#151515);font-size:1rem;font-size:var(--font-size-md,calc(16rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.5;line-height:var(--font-line-height-m,1.5);margin:0;padding:0}@media (min-width:768.02px){.p.sc-orama-text{font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)))}}.p-secondary.sc-orama-text{color:#838289;color:var(--text-color-secondary,#838289);font-size:1rem;font-size:var(--font-size-md,calc(16rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.5;line-height:var(--font-line-height-m,1.5);margin:0;padding:0}@media (min-width:768.02px){.p-secondary.sc-orama-text{font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)))}}.p-tertiary.sc-orama-text{color:#99989d;color:var(--text-color-tertiary,#99989d);font-size:1rem;font-size:var(--font-size-md,calc(16rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.5;line-height:var(--font-line-height-m,1.5);margin:0;padding:0}@media (min-width:768.02px){.p-tertiary.sc-orama-text{font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)))}}.span.sc-orama-text{color:#151515;color:var(--text-color-primary,#151515)}.span.sc-orama-text,.span-secondary.sc-orama-text{font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.25;line-height:var(--font-line-height-s,1.25);margin:0;padding:0}.span-secondary.sc-orama-text{color:#838289;color:var(--text-color-secondary,#838289)}.span-tertiary.sc-orama-text{color:#99989d;color:var(--text-color-tertiary,#99989d);font-size:.875rem;font-size:var(--font-size-sm,calc(14rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.25;line-height:var(--font-line-height-s,1.25);margin:0;padding:0}.small.sc-orama-text{color:#151515;color:var(--text-color-primary,#151515)}.small.sc-orama-text,.small-secondary.sc-orama-text{font-size:.75rem;font-size:var(--font-size-xs,calc(12rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.25;line-height:var(--font-line-height-s,1.25);margin:0;padding:0}.small-secondary.sc-orama-text{color:#838289;color:var(--text-color-secondary,#838289)}.small-tertiary.sc-orama-text{color:#99989d;color:var(--text-color-tertiary,#99989d);font-size:.75rem;font-size:var(--font-size-xs,calc(12rem/var(--orama-base-font-size, 16)));font-weight:400;font-weight:var(--font-weight-normal,400);line-height:1.25;line-height:var(--font-line-height-s,1.25);margin:0;padding:0}.text-bold.sc-orama-text{font-weight:600;font-weight:var(--font-weight-semibold,600)}.text-left.sc-orama-text{text-align:left}.text-right.sc-orama-text{text-align:right}.text-center.sc-orama-text{text-align:center}.text-inactive.sc-orama-text{color:#99989d;color:var(--text-color-inactive,#99989d)}";
var OramaTextStyle0 = oramaTextCss;
var OramaText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.as = "p";
    this.styledAs = void 0;
    this.bold = false;
    this.class = void 0;
    this.align = void 0;
    this.variant = "primary";
    this.inactive = void 0;
    this.defaultStyle = this.styledAs === "span" || this.styledAs === "small" || this.styledAs === "p" ? this.styledAs : this.as;
  }
  render() {
    const Tag = this.as;
    const declaredProps = ["as", "styled-as", "class"];
    const textProps = getNonExplicitAttributes(this.el, declaredProps);
    return h(Tag, Object.assign({ key: "3d0ba730578b4a35d884ab92d0bea8d594cc70a9", class: {
      [this.defaultStyle]: true,
      [`text-${this.align}`]: !!this.align,
      [`${this.defaultStyle}-${this.variant}`]: true,
      "text-inactive": !!this.inactive,
      "text-bold": !!this.bold,
      [this.class]: !!this.class
    } }, textProps), h("slot", { key: "ef745bcdd3e784f6f9c9db7f118e9b092e374f7f" }));
  }
  get el() {
    return getElement(this);
  }
};
OramaText.style = OramaTextStyle0;
export {
  OramaText as orama_text
};
//# sourceMappingURL=orama-text.entry-QO24FIT7.js.map
