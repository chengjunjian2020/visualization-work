import { Point2d } from "/core/point";
import {EventName} from "/enum/eventEnum"
import { EventCallback, ShapeMouseEvent } from "/types/event";

export class Shape {
  listenerMap:Map<string,Array<EventCallback>>; //事件容器
  constructor() {
    this.listenerMap = new Map();
  }
  on(eventName:EventName, listener:EventCallback) {
    const { listenerMap } = this;
    if (listenerMap.has(eventName)) {
      listenerMap.get(eventName).push(listener);
    } else {
      listenerMap.set(eventName, [listener]);
    }
  }
  getMouse(evet:ShapeMouseEvent) {
    return new Point2d(evet.offsetX, evet.offsetY);
  }
  draw(ctx:CanvasRenderingContext2D){}
  isPointInClosedRegion(evet:ShapeMouseEvent){
    return false;
  }
}
