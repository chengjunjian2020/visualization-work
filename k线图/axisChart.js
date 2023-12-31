import Chart from "./chart.js";
import { setStyleList } from "../utils/index.js";
const tooltipAlert = "tooltipalert";
export default class AxisChart extends Chart {
  constructor(el, options) {
    super(el, options);
    this.initSelfData(options);
    this.initTooltip(el);
  }
  initTooltip(el) {
    const tooltip = document.createElement("div");
    tooltip.setAttribute("class", "k-line-tip-alert");
    tooltip.setAttribute(tooltipAlert, 1);
    this.tootip = tooltip;
    el.append(tooltip);

    setStyleList(tooltip, {
      opacity: 0.9,
      background: "#f2f4fa",
      position: "absolute",
      color: "#525252",
      padding: "8px 15px",
      "z-index": 1,
      top: "120px",
      "min-width": "116px",
      cursor: "pointer",
      display: "none",
    });
  }
  initSelfData = (options) => {
    this.top = 20;
    this.left = 50;
    this.right = 50;
    this.bottom = 20;
    const { data, xAxisCount = 7, yAxisCount = 7 } = options;
    const { height, top, bottom } = this;

    const xData = data.map((dataList) => dataList[0]);
    const yData = data.map((dataList) => dataList.slice(1));
    this.xAxis = xData;
    this.yAxis = yData;
    this.xAxisCount = xAxisCount > xData.length ? xData.length : xAxisCount;
    this.yAxisCount = yAxisCount > yData.length ? yData.length : yAxisCount; //y轴展示几个

    this.xAxisTextOffset = 20; //x轴文字偏移量

    let max = Math.max(...[].concat(...yData));
    let min = Math.min(...[].concat(...yData));

    max = Math.floor(max + max / 5);
    min = Math.floor(min - min / 5);
    this.dataMax = max;
    this.dataMin = min;
    this.stepSize = (height - top - bottom) / (max - min);
  };

  drawAxisLine = () => {
    const { left, height, width, right, top, bottom, drawCanvas } = this;
    const y = height - top - bottom;
    const x = width - left - right;
    drawCanvas.lineTo({ x1: left, y1: y, x2: x, y2: y });
    drawCanvas.lineTo({ x1: left, y1: top, x2: left, y2: y });
  };
  drawAxisX = () => {
    const {
      xAxisTextOffset,
      xAxis,
      height,
      xAxisCount,
      width,
      left,
      right,
      drawCanvas,
    } = this;
    const stepsX = (width - right) / xAxis.length;
    // const stepsXLength = Math.ceil(xAxis.length / xAxisCount);
    let steps = 0;
    for (let i = 0; i < xAxis.length; i++) {
      steps++;
      // if(i%stepsXLength===0 || (i+1===xAxis.length &&steps< xAxisCount)){
      const point = {
        x: stepsX * i + left,
        y: height - xAxisTextOffset,
      };
      // if(i%3===0){
      drawCanvas.fillText(
        {
          text: xAxis[i],
          ...point,
        },
        {
          font: 14,
          fillStyle: "red",
        }
      );
      // }

      // }
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
      drawCanvas.fillText({
        text: Number(dataMax - stepsYaxisDataCount * i).toFixed(0),
        x: left - 40,
        y: i === 0 ? stepsHeight * i + 30 : stepsHeight * i,
      });
    }
  }
  listenerEvent() {
    let listenerEvent = true;
    return () => {
      if (listenerEvent) {
        listenerEvent = false;
        this.el.addEventListener("mousemove", (e) => {
          const { left, width, height, top, bottom, xAxis, yAxis, right } =
            this;
          const endY = height - top - bottom;
          const x = e.offsetX - left;
          const endX = width - left;

          const stepsXLength = endX / xAxis.length;
          const everyX = (width - right) / xAxis.length;
          const index = Math.ceil(x / stepsXLength) - 1;
          const xPoint = (index + 0.5) * everyX + 10 / 2;
          if (index > xAxis.length - 1) {
            return;
          }
          this.mouseMoveAxisPointer(e, {
            endY,
            endX,
            x,
            stepsXLength,
            everyX,
            index,
            xPoint,
          });
          this.mouseMoveTooltip(e, {
            endY,
            endX,
            x,
            stepsXLength,
            everyX,
            index,
            xPoint,
          });
        });
        this.el.addEventListener("mouseout", (e) => {
          this.mouseOutAxisPointer(e);
          this.mouseOutTooltip(e);
        });
      }
    };
  }
  mouseOutTooltip(e) {
    this.tootip.style.display = "none";
    e.preventDefault();
  }
  mouseOutAxisPointer(e) {
    e.preventDefault();
    // while (e.relatedTarget) {
    //   if(){}
    // }
    const { drawCanvas } = this;
    drawCanvas.clearCanvas();
    this.draw();
  }
  mouseMoveTooltip(e, { endY, everyX, index }) {
    const { offsetX, offsetY: y } = e;
    const {
      left,
      width,
      height,
      top,
      bottom,
      xAxis,
      yAxis,
      tootip: tipAlert,
    } = this;

    if (left >= offsetX || y > endY || top > y) {
      tipAlert.style.display = "none";
      return;
    }
    tipAlert.style.left = (index + 0.5) * everyX + "px";
    tipAlert.style.display = "block";
    tipAlert.innerHTML = `<ul>
    <li>
      <span class="label">开盘价</span>
      <span class="price">${yAxis[index][0]}</span>
    </li>
    <li>
      <span class="label">收盘价</span>
      <span class="price">${yAxis[index][1]}</span>
    </li>
    <li>
      <span class="label">最小值</span>
      <span class="price">${yAxis[index][2]}</span>
    </li>
    <li>
      <span class="label">最大值</span>
      <span class="price">${yAxis[index][3]}</span>
    </li>
  </ul>`;
  }
  mouseMoveAxisPointer(
    e,
    { endY, endX, x, stepsXLength, everyX, index, xPoint }
  ) {
    const {
      drawCanvas,
      left,
      width,
      height,
      top,
      bottom,
      xAxis,
      dataMax,
      dataMin,
    } = this;
    e.preventDefault();
    drawCanvas.clearCanvas();
    this.draw();

    const { offsetX, offsetY: y } = e;

    if (left >= offsetX || y > endY || top > y) {
      return;
    }
    drawCanvas.ctx.setLineDash([5, 5]);

    drawCanvas.lineTo(
      {
        x1: xPoint,
        y1: top,
        x2: xPoint,
        y2: endY,
      },
      {
        strokeStyle: "#ccc",
      }
    );
    drawCanvas.fillText(
      { text: xAxis[index], x: xPoint - 20, y: endY - 50 },
      {
        fillStyle: "#666",
      }
    );
    drawCanvas.ctx.setLineDash([5, 5]);
    drawCanvas.lineTo(
      {
        x1: left,
        y1: y,
        x2: endX,
        y2: y,
      },
      {
        strokeStyle: "#ccc",
      }
    );
    const yNumber =
      dataMax -
      Math.round(((dataMax - dataMin) / endY) * (top * 2 >= y ? y - 20 : y));
    drawCanvas.fillText(
      { text: yNumber, x: left, y: y },
      {
        fillStyle: "#666",
      }
    );
  }
}
