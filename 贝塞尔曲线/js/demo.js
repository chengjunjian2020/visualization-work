import { createCanvasContext } from "../../utils/index.js";

(function () {
  const ctx = createCanvasContext("canvas");
  //   rect(ctx);
  //   rightTriangle(ctx);
  //   circle(ctx);
  quadraticCurveTo(ctx);
  bezierCurveTo(ctx);
})();

function quadraticCurveTo(ctx) {
  ctx.strokeStyle = "pink";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.moveTo(370, 370);
  ctx.quadraticCurveTo(120, -180, 40, 50);
  ctx.stroke();
}
function bezierCurveTo(ctx) {
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.moveTo(30, 350);
  ctx.bezierCurveTo(120, 100, 80, 90, 300, 10);
  ctx.stroke();
}
function rect(ctx) {
  ctx.beginPath();
  ctx.strokeStyle = "pink";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.moveTo(20, 10);
  ctx.lineTo(180, 10);
  ctx.lineTo(180, 50);
  ctx.lineTo(20, 50);
  ctx.lineTo(20, 10);
  ctx.stroke(); //描边路径
}
function rightTriangle(ctx) {
  ctx.beginPath();
  ctx.moveTo(50, 10);
  ctx.lineTo(50, 100);
  ctx.lineTo(150, 100);
  ctx.closePath();
  ctx.stroke();
}
function circle(ctx) {
  ctx.arc(100, 60, 40, 0, 2 * Math.PI);
  ctx.stroke();
}
