import { $ } from "./index.js";
export class DrawCanvas {
  ctx;
  ctxStyle = {};
  canvasObj = {}; //canvas一些关键信息例如width height后面需要用到的一些信息
  //   ctxInfo = {};
  constructor(canvasObj, ctxStyle) {
    const { id } = canvasObj;
    if (!id) {
      throw new Error("请传入canvasid");
    }
    this.canvasObj = this.initCanvasObj(canvasObj);
    this.ctx = this.createCanvasContext(canvasObj.id);
    this.ctxStyle = this.setCtxAttribute(ctxStyle);

    this.setCtxAttribute(ctxStyle);
  }
  initCanvasObj(canvasObj) {
    const { id, width = 100, height = 100 } = canvasObj;
    $(id).width = width;
    $(id).height = height;
    $(id).style.width = width + "px";
    $(id).style.height = height + "px";
    this.$el = $(id);
    return canvasObj;
  }
  createCanvasContext = (id) => {
    let el = typeof id === "string" ? document.querySelector(id) : id;
    const context = el.getContext("2d");
    return context;
  };
  setCtxAttribute = (info = this.ctxStyle) => {
    if (typeof info !== "object") {
      return;
    }
    Object.keys(info).forEach((key) => {
      this.ctx[key] = info[key];
    });
    return info;
  };

  lineTo({ x1, y1, x2, y2 }, styleInfo) {
    const { ctx } = this;
    this.setCtxAttribute(styleInfo);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    this.setCtxAttribute();
    ctx.setLineDash([0, 0]);
  }
  //三次贝塞尔曲线
  bezierCurveTo({ _x, _y, cp1x, cp1y, cp2x, cp2y, x, y }, styleInfo) {
    const { ctx } = this;
    this.setCtxAttribute(styleInfo);

    ctx.beginPath();
    ctx.moveTo(_x, _y);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.stroke();
    this.setCtxAttribute();
  }
  fillText({ text, x, y }, styleInfo) {
    const { ctx } = this;
    this.setCtxAttribute(styleInfo);
    ctx.fillText(text, x, y);
    this.setCtxAttribute();
  }
  fillRect({ x, y, width, height }, styleInfo) {
    const { ctx } = this;
    ctx.beginPath();
    this.setCtxAttribute(styleInfo);
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
    this.setCtxAttribute();
  }
  clearCanvas() {
    const { width, height } = this.canvasObj;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.beginPath();
  }
}
