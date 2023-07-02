import { Point2d } from "./point";
import { Graphic } from "/graphic/type";

export class Box2 {
  min: Point2d;
  max: Point2d;
  constructor(min: Point2d, max: Point2d) {
    this.min = min || new Point2d(-Infinity, -Infinity);
    this.max = max || new Point2d(Infinity, Infinity);
  }
  //判断是否相交
  intersectsBox(box: Box2) {
    return box.max.x < this.min.x ||
      box.max.y < this.min.y ||
      box.min.x < this.max.x ||
      box.min.y < this.max.y
      ? false
      : true;
  }
}
