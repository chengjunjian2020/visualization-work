import { isDom } from "./tool/is.js";
export const move = "mousemove";
export const click = "mousedown";
export class Grender {
  layer = [];
  canvas;
  constructor(dom) {
    this.init(dom);
  }
  init(dom) {
    if (!dom || !isDom(dom) || !dom.getContext) {
      throw new Error("请传入canvas标签");
    }
    this.canvas = dom;
    this.ctx = this.canvas.getContext("2d");
    //存储图形容器
    this.allShapes = [];
    this.undoStack = [];

    this.redoStack = [];
    this.shapePropsDiffMap = new Map();
    this.canvas.addEventListener(click, (event) => {
      event.type = click;
      this.handleEvent(event);
    });
  }
  handleEvent(event) {
    const { offsetX, offsetY } = event;
    event = {
      ...event,
      point: new Point2d(offsetX, offsetY),
      isStopBubble: false,
    };
    this.allShapes.forEach((shape) => {
      const listener = shape.listenerMap.get(event.type);
      if (
        listener &&
        shape.isPointInClosedRegion(event) &&
        !event.isStopBubble
      ) {
        listerns.forEach((listener) => listener(event));
      }
    });
  }
  add(shape) {
    shape.draw(this.ctx);
    this.allShapes.push(shape);
  }
}
