import Chart from "./chart.js";
export default class AxisChart extends Chart {
  constructor(el, options) {
    super(el, options);
    const { xData, yData } = options;
    this.xAxis = xData;
    this.yAxis = yData;
    this.initSelfData(el);
    this.draw();
  }
  initSelfData(el) {
    this.top = 40;
    this.left = 50;
    this.right = 50;
    this.bottom = 110;

    this.yAxisCount = 5;
  }
  draw() {
    this.drawAxisLine();
  }
  drawAxisLine = () => {
    const { left, height, width, right, top, bottom } = this;
    const y = height - top - bottom;
    const x = width - left - right;
    console.log(this);
    // drawCanvas.lineTo({ x1: left, y1: y, x2: x, y2: y });
  };
}
