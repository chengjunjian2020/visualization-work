import Chart from "./chart.js";
export default class AxisChart extends Chart {
  constructor(el, options) {
    super(el, options);
    this.initSelfData(options);
    // this.draw();
  }
  initSelfData = (options) => {
    this.top = 20;
    this.left = 50;
    this.right = 50;
    this.bottom = 20;
    const { xData, yData } = options;
    const { height, top, bottom } = this;
    this.xAxis = xData;
    this.yAxis = yData;

    this.yAxisCount = 5; //y轴展示几个

    this.xAxisTextOffset = 20; //x轴文字偏移量

    let max = Math.max(...[].concat(...yData));
    let min = Math.min(...[].concat(...yData));

    max = Math.floor(max + max / 5);
    min = Math.floor(min - min / 5);
    this.dataMax = max;
    this.dataMin = min;
    this.stepSize = (height - top - bottom) / (max - min);
  };
  //   draw = () => {
  //     this.drawAxisLine();
  //     this.drawAxisX();
  //     this.drawAxisY();
  //     this.axisPointer(); //指示线
  //   };
  drawAxisLine = () => {
    const { left, height, width, right, top, bottom, drawCanvas } = this;
    const y = height - top - bottom;
    const x = width - left - right;
    drawCanvas.lineTo({ x1: left, y1: y, x2: x, y2: y });
    drawCanvas.lineTo({ x1: left, y1: top, x2: left, y2: y });
  };
  drawAxisX = () => {
    const { xAxisTextOffset, xAxis, height, width, left, right, drawCanvas } =
      this;
    const stepsX = (width - right) / xAxis.length;
    for (let i in xAxis) {
      const point = {
        x: stepsX * i + left,
        y: height - xAxisTextOffset,
      };
      drawCanvas.drawText(
        {
          text: xAxis[i],
          ...point,
        },
        {
          font: 14,
          fillStyle: "#666",
        }
      );
    }
  };
  drawAxisY() {
    const {
      dataMax,
      dataMin,
      yAxisCount,
      left,
      top,
      height,
      bottom,
      drawCanvas,
    } = this;
    const stepsYaxisDataCount = (dataMax - dataMin) / (yAxisCount - 1);
    const stepsHeight = (height - top - bottom) / (yAxisCount - 1);
    for (let i = 0; i < yAxisCount; i++) {
      drawCanvas.drawText({
        text: Number(dataMax - stepsYaxisDataCount * i).toFixed(0),
        x: left - 40,
        y: i === 0 ? stepsHeight * i + 30 : stepsHeight * i,
      });
    }
  }
  axisPointer() {
    console.log(this);
    const { drawCanvas, draw } = this;
    this.el.onmousemove = function () {
      e.preventDefault();
      drawCanvas.clearCanvas();
      draw();
      //   drawKLine();
    };
  }
}
