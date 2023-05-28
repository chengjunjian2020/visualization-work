import { createCanvasContext } from "../../utils/index.js";
import { DrawCanvas } from "../../utils/drawCanvas.js";
import { Draw } from "../../拖拽/js/draw.js";
(function () {
  const drawCanvas = new DrawCanvas({ id: "canvas", width: 300, height: 600 });

  const controlPoints = [
    {
      x: 40,
      y: 220,
    },
    {
      x: 200,
      y: 390,
    },
  ];
  let _x = 0;
  let _y = 450;
  let x = 300;
  let y = 150;
  const bezierCurveTo = () => {
    drawCanvas.bezierCurveTo({
      _x,
      _y,
      cp1x: controlPoints[0].x,
      cp1y: controlPoints[0].y,
      cp2x: controlPoints[1].x,
      cp2y: controlPoints[1].y,
      x,
      y,
    });
  };
  const leftLineTo = () => {
    drawCanvas.lineTo({
      x1: _x,
      y1: _y,
      x2: controlPoints[0].x,
      y2: controlPoints[0].y,
    });
  };
  const rightLineTo = () => {
    drawCanvas.lineTo({
      x1: x,
      y1: y,
      x2: controlPoints[1].x,
      y2: controlPoints[1].y,
    });
  };
  bezierCurveTo();
  leftLineTo();
  rightLineTo();
  const draw = new Draw(document.getElementById("bezierContainer"), [
    {
      tagName: "div",
      style: {
        backgroundColor: "#f08",
        width: "20px",
        height: "20px",
      },
      className: "control-point",
      id: "p0",
      position: {
        x: 42,
        y: 210,
      },
      dragCallback: (drawInfo, position) => {
        const { left, top } = position;
        controlPoints[0].x = left;
        controlPoints[0].y = top;
        drawCanvas.clearCanvas();
        drawCanvas.bezierCurveTo({
          _x,
          _y,
          cp1x: controlPoints[0].x,
          cp1y: controlPoints[0].y,
          cp2x: controlPoints[1].x,
          cp2y: controlPoints[1].y,
          x,
          y,
        });
        leftLineTo();
        rightLineTo();
      },
    },
    {
      tagName: "div",
      style: {
        backgroundColor: "#0ab",
      },
      className: "control-point",
      id: "p1",
      position: {
        x: 198,
        y: 400,
      },
      dragCallback: (drawInfo, position) => {
        const { left, top } = position;
        controlPoints[1].x = left;
        controlPoints[1].y = top;
        drawCanvas.clearCanvas();
        drawCanvas.bezierCurveTo({
          _x,
          _y,
          cp1x: controlPoints[0].x,
          cp1y: controlPoints[0].y,
          cp2x: controlPoints[1].x,
          cp2y: controlPoints[1].y,
          x,
          y,
        });
        leftLineTo();
        rightLineTo();
      },
    },
  ]);
})();
