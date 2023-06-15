import AxisChart from "./axisChart.js";
const rectColor = ["green", "red"];
class KLineChart extends AxisChart {
  constructor(el, options) {
    super(el, options);
    this.draw();
  }
  draw() {
    this.drawAxisLine();
    this.drawAxisX();
    this.drawAxisY();
    this.drawSeries();
    if (this._listenerEvent) {
      this._listenerEvent();
    } else {
      //指示线
      this._listenerEvent = this.listenerEvent();
      this._listenerEvent();
    }
  }
  drawSeries() {
    const { yAxis, dataMax, stepSize, drawCanvas } = this;
    for (let i = 0; i < yAxis.length; i++) {
      const numList = yAxis[i];
      const { rect, color } = this.gerernateRect(numList, i);
      drawCanvas.fillRect(rect, { fillStyle: color });
      drawCanvas.lineTo(
        {
          x1: rect.x + rect.width / 2,
          y1: (dataMax - numList[3]) * stepSize,
          x2: rect.x + rect.width / 2,
          y2: rect.y,
        },
        { strokeStyle: color }
      );
      const minYAxis = Math.abs(
        rect.y + rect.height - (dataMax - numList[2]) * stepSize
      );
      drawCanvas.lineTo(
        {
          x1: rect.x + rect.width / 2,
          y1: rect.y + rect.height,
          x2: rect.x + rect.width / 2,
          y2: rect.y + rect.height + minYAxis,
        },
        { strokeStyle: color }
      );
    }
  }
  gerernateRect(numList, i) {
    const { width, left, xAxis, dataMax, stepSize } = this;
    const stepsX = (width - left) / xAxis.length;
    const rect = {
      x: (i + 0.5) * stepsX,
      y: (dataMax - numList[0]) * stepSize,
      width: 10,
      height: (dataMax - numList[1]) * stepSize,
    };
    let fillStyle = rectColor[0];
    if (numList[1] > numList[0]) {
      let temp = rect.height;
      rect.height = rect.y;
      rect.y = temp;
      fillStyle = rectColor[1];
    }
    rect.height = rect.height - rect.y;
    return { rect, color: fillStyle };
  }
}

export default KLineChart;
