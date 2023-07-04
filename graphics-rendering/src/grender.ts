import { isDom } from "./tool/is";
import { EventName } from "./enum/eventEnum";
import { Point2d } from "./core/point";
import { EventCallback, ShapeMouseEvent } from "./types/event";
import { Shape } from "./graphic/shape/shape";
import { Graphic } from "./graphic/type";
export const move = "mousemove";
export const click = "mousedown";

interface CanvasOption {
	width: number;
	height: number;
}
export class Grender {
	layer: [];
	allShapes: Array<Graphic>;
	undoStack: [];
	redoStack: [];
	shapePropsDiffMap: Map<Graphic, any>; //图形实例->图形参数 映射容器
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	constructor(dom: HTMLCanvasElement, optins: CanvasOption) {
		this.init(dom, optins);
	}
	init(dom: HTMLCanvasElement, options: CanvasOption) {
		if (!dom || !isDom(dom) || !dom.getContext) {
			throw new Error("请传入canvas标签");
		}
		this.canvas = this.initCanvas(dom, options);
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
	initCanvas(canvas: HTMLCanvasElement, options: CanvasOption) {
		const { width = 400, height = 500 } = options;
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		return canvas;
	}
	handleEvent(event: MouseEvent, type: EventName) {
		const { offsetX, offsetY } = event;
		const newsEvent: ShapeMouseEvent = {
			event,
			point: new Point2d(offsetX, offsetY),
			isStopBubble: false,
			TYPE: type,
		};
		this.allShapes.forEach((shape: Graphic) => {
			const listener: Array<EventCallback> = shape.listenerMap.get(
				event.type
			);
			if (
				listener &&
				shape.isPointInClosedRegion(newsEvent) &&
				!newsEvent.isStopBubble
			) {
				listener.forEach(listener => listener(newsEvent));
			}
		});
	}
	add(shape: Graphic) {
		shape.draw(this.ctx);
		this.allShapes.push(shape);
	}
	clear() {
		const { ctx, canvas } = this;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	reloadDraw() {
		const { allShapes, ctx } = this;
		this.clear();
		allShapes.forEach(shape => {
			shape.draw(ctx);
			// const { allShapes } = this;
			// const curShape = shape.getBounding();
			//相交图形
			// const intersectShaps = allShapes.filter(shapeItem =>
			//    shape !== shapeItem && shapeItem.getBounding().intersectsBox(curShape))
		});
	}
}
