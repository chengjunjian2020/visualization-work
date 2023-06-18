import { DrawCanvas } from "../utils/drawCanvas.js";

const defaultCtxStyle = {
  font: 14,
  fillStyle: "#666",
  strokeStyle: "#000",
};

export default class Chart {
  drawCanvas;
  ctx;
  constructor(el, options) {
    this.initData(el,options);
    this.initCanvas(el, options);
  }
  initData = (el,{width,height}) => {
    this.width = width || el.clientWidth;
    this.height = height || el.clientHeight;
  };
  initCanvas = (el, options) => {
    const { ctxStyle } = options;
    const { width, height } = this;
    const canvas = document.createElement("canvas");
    const id = `k-chart-${new Date().getTime()}`;
    canvas.id = id;
    this.el = canvas;
    el.appendChild(canvas);
    this.drawCanvas = new DrawCanvas(
      {
        id: `#${id}`,
        width,
        height,
      },
      { ...defaultCtxStyle, ...ctxStyle }
    );
    this.ctx = this.drawCanvas.ctx;
  };
}
