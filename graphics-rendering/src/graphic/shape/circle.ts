import { isObject } from "/tool/is";
import { Shape } from "./shape";
import { Grender } from "/grender";
import { Box2 } from "/core/box2";
import { Point2d } from "/core/point";
import type { Graphic } from "../type";

interface ICircle{
  shape:{
    cx:number,
    cy:number,
    r:number
  },
  style:Record<string,string>
}
export class Circle extends Shape {
  props:ICircle={
    shape:{
      cx: 0,
      cy: 0,
      r: 0,
    },
    style:{}
  }
  
  constructor(props:ICircle) {
    super();
    this.initCircle(props);
  }
  initCircle(props:ICircle) {
    this.props=props;
  }
  draw(ctx:CanvasRenderingContext2D) {
    const { cx, cy, r } = this.props.shape;
    const { fillColor = "black" } = this.props.style;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  change(props:ICircle,grender:Grender){
    grender.shapePropsDiffMap.set(this as any,{props:this.props,...props});
    grender.reloadDraw();
  }
  //获取边界
  getBounding(){
    const {shape:{cx,cy,r}} = this.props;
    const min = new Point2d(cx-r,cy-r);
    const max = new Point2d(cx+r,cy+r);
    return new Box2(min,max)
  }
}
