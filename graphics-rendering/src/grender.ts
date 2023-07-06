import { isDom } from "./tool/is";
import { EventName } from "./enum/eventEnum";
import { Point2d } from "./core/point";
import { EventCallback, ShapeMouseEvent } from "./types/event";
import { Shape } from "./graphic/shape/shape";
import { Graphic } from "./graphic/type";
export const move = "mousemove";
export const click = "mousedown";
//冒泡处理 层级处理 多边形事件 图形拖拽 移除事件 画布拖
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
	private init(dom: HTMLCanvasElement, options: CanvasOption) {
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
	private initCanvas(canvas: HTMLCanvasElement, options: CanvasOption) {
		const { width = 400, height = 500 } = options;
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		return canvas;
	}
	private generateEvent(
		event: MouseEvent,
		type: EventName,
		stopPropagation: ShapeMouseEvent["stopPropagation"]
	) {
		const { offsetX, offsetY } = event;
		let evnetParam: Omit<ShapeMouseEvent, "stopPropagation"> = {
			event,
			point: new Point2d(offsetX, offsetY),
			TYPE: type,
		};
		const newsEvent = { ...evnetParam, stopPropagation };
		return newsEvent;
	}
	private handleEvent(event: MouseEvent, type: EventName) {
		let batchStopBubble = false;
		const { allShapes } = this;
		for (let i = allShapes.length - 1; i >= 0; i--) {
			const shape = allShapes[i];
			const newsEvent = this.generateEvent(
				event,
				type,
				shape.stopPropagation
			);
			const listener: Array<EventCallback> = shape.listenerMap.get(
				event.type
			);
			const isPointRegion = shape.isPointInClosedRegion(newsEvent);
			/**
			 * 冒泡原理是从右到左循环如果阻止了事件冒泡左边元素其他就不需要执行
			 * 1.没放在下面一起判断原因是因为阻止事件，但是如果两个元素相交呢再次点击没有被覆盖的区域也不执行，故没有触发到的事件下面就不需要走了
			 */
			if (!isPointRegion) {
				continue;
			}
			//如果两个图形相交，当命中元素后如果listener不存在不应该产生穿透
			if (isPointRegion && !listener) {
				break;
			}
			if (!batchStopBubble && listener) {
				allShapes.splice(
					allShapes.length,
					0,
					allShapes.splice(i, 1)[0]
				);
				this.reloadDraw();
				listener.forEach(listener => listener(newsEvent));
			}
			if (shape.isStopBubble) {
				batchStopBubble = true;
			}
		}
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
