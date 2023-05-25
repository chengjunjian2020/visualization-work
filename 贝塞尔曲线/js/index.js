import { createCanvasContext } from "../../utils/index.js";
(function () {
  const ctx = createCanvasContext("canvas");

  let _x = 0;
  let _y = 450;
  let cp1x = 120;
  let cp1y = 100;
  let cp2x = 80;
  let cp2y = 90;
  let x = 450;
  let y = 200;
  bezierCurveTo(ctx, { _x, _y, cp1x, cp1y, cp2x, cp2y, x, y });
  ctx.beginPath();
  setTimeout(() => {
    bezierCurveTo(ctx, { _x, _y, cp1x: 80, cp1y: 100, cp2x, cp2y, x, y });
    ctx.beginPath();
  }, 3000);
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
