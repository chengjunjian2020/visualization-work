import { isDom } from "./tool/is";
import { EventName } from "./enum/eventEnum"
import { Point2d } from "./core/point";
import { EventCallback, ShapeMouseEvent } from "./types/event";
import { Shape } from "./graphic/shape/shape";
import { Graphic } from "./graphic/type";
export const move = "mousemove";
export const click = "mousedown";

export class Grender {
  layer: [];
  allShapes: Array<Graphic>;
  undoStack: [];
  redoStack: [];
  shapePropsDiffMap: Map<Graphic, any>;//图形实例->图形参数 映射容器
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | undefined;
  constructor(dom: HTMLCanvasElement) {
    this.init(dom);
  }
  init(dom: HTMLCanvasElement) {
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
    this.canvas.addEventListener(EventName.click, (event: MouseEvent) => {
      this.handleEvent(event, EventName.click);
    });
  }
  handleEvent(event: MouseEvent, type: EventName) {
    const { offsetX, offsetY } = event;
    const newsEvent: ShapeMouseEvent = {
      ...event,
      point: new Point2d(offsetX, offsetY),
      isStopBubble: false,
      TYPE: type
    };
    this.allShapes.forEach((shape: Graphic) => {
      const listener: Array<EventCallback> = shape.listenerMap.get(event.type);
      if (
        listener &&
        shape.isPointInClosedRegion(newsEvent) &&
        !newsEvent.isStopBubble
      ) {
        listener.forEach((listener) => listener(newsEvent));
      }
    });
  }
  add(shape: Graphic) {
    shape.draw(this.ctx);
    this.allShapes.push(shape);
  }
  clear(){
    const {ctx,canvas} = this;
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  reloadDraw() {
    const { shapePropsDiffMap,allShapes,ctx } = this;
    this.clear();
    shapePropsDiffMap.forEach((props, shape) => {
      shape.props = { ...shape.props, ...props };
      shape.draw(ctx);
      // const { allShapes } = this;
      // const curShape = shape.getBounding();
      //相交图形
      // const intersectShaps = allShapes.filter(shapeItem =>
      //    shape !== shapeItem && shapeItem.getBounding().intersectsBox(curShape))
    })
    
  }
}
