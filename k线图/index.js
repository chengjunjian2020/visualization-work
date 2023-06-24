import AxisChart from "./axisChart.js";
const rectColor = ["green", "red"];
class KLineChart extends AxisChart {
  constructor(el, options) {
    super(el, options);
    this.initKLine(el);
    this.draw();
  }
  initKLine(el) {
    this.container = el;
    el.style.position = "relative";
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
  drawLines(){
    // const {yAxis} = this;
    // for(){}
  }
  drawSeries() {
    const { yAxis, dataMax, stepSize, drawCanvas } = this;
    const lines=[];
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
      lines.push({
        x:rect.x + rect.width / 2,
        y:(dataMax - numList[3]) * stepSize
      })
      
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
    console.log(lines)
    for(let i=0;i<lines.length;i++){
      if(i===0){
        continue;
      }
      const cur = lines[i];
      const prev = lines[i-1];
      console.log({
        x1:(prev.x),
        y1:(prev.y),
        x2:(cur.x),
        y2:(cur.y)
      })
      // drawCanvas.ctx.lineJoin = 'round'; 
      // drawCanvas.ctx.lineCap = 'round';
      drawCanvas.lineTo({
        x1:(prev.x),
        y1:Math.floor(prev.y),
        x2:(cur.x),
        y2:Math.floor(cur.y)
      },{
        strokeStyle:"red"
      });
    }
    // lines.reduce((prev,next)=>{
    //   if(prev && prev.x && prev.y){
    //     console.log(prev);
    //     console.log(next);
    //   }
    // },[])
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
