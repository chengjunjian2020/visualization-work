import { isObject } from "../../tool/is";
export class Circle {
  shape = {
    cx: 0,
    cy: 0,
    r: 0,
  };
  style;

  constructor(shape, style) {
    init(shape, style);
  }
  init(shape, style) {
    if (shape) {
      this.shape = { ...this.shape, shape };
    }
    if (isObject(style)) {
      this.style = style;
    }
  }
}
