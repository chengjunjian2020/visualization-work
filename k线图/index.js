import AxisChart from "./axisChart.js";

class KLineChart extends AxisChart {
  instance;
  constructor(el, options) {
    super(el, options);
    // this.initCanvas(el, options);
  }
}

export default KLineChart;
