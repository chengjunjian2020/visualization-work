import { DrawCanvas } from "../utils/drawCanvas.js";

const defaultCtxStyle = {
  font: 14,
  fillStyle: "#666",
  strokeStyle: "#000",
};

export default class Chart {
  constructor(el, options) {
    console.log();
    this.initData(el);
    this.initCanvas(el, options);
  }
  initData(el) {
    this.width = el.clientWidth;
    this.height = el.clientHeight;
  }
  initCanvas(el, options) {
    const { ctxStyle } = options;
    const { width, height } = this;
    const canvas = document.createElement("canvas");
    const id = `k-chart-${new Date().getTime()}`;
    canvas.id = id;
    el.appendChild(canvas);
    this.instance = new DrawCanvas(
      {
        id: `#${id}`,
        width,
        height,
      },
      { ...defaultCtxStyle, ...ctxStyle }
    );
  }
}
