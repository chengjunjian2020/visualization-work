import { isObject } from "../../tool/is";
import { Shape } from "./shape.js";
export class Circle extends Shape {
  shape = {
    cx: 0,
    cy: 0,
    r: 0,
  };
  style;

  constructor(shape, style) {
    super();
    initCircle(shape, style);
  }
  initCircle(shape, style) {
    if (shape) {
      this.shape = { ...this.shape, shape };
    }
    if (isObject(style)) {
      this.style = style;
    }
  }
  draw(ctx) {
    const { cx, cy, r } = this.shape;
    const { fillColor = "black" } = this.style;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
