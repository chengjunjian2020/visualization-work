import { createCanvasContext } from "../../utils/index.js";
(function () {
  const ctx = createCanvasContext("canvas");
  const controlPoints = [
    {
      x: 120,
      y: 100,
    },
    {
      x: 80,
      y: 90,
    },
  ];
  let _x = 0;
  let _y = 450;
  let x = 450;
  let y = 200;
  bezierCurveTo(ctx, {
    _x,
    _y,
    cp1x: controlPoints[0].x,
    cp1y: controlPoints[0].y,
    cp2x: controlPoints[1].x,
    cp2y: controlPoints[1].y,
    x,
    y,
  });
})();

function bezierCurveTo(ctx, { _x, _y, cp1x, cp1y, cp2x, cp2y, x, y }) {
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();

  ctx.moveTo(_x, _y);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  ctx.stroke();
}
