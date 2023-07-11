import { isDom } from "./tool/is";
import { EventName } from "./enum/eventEnum";
import { Point2d } from "./core/point";
import { EventCallback, ShapeMouseEvent } from "./types/event";
import { Shape } from "./graphic/shape/shape";
import { Graphic } from "./graphic/type";
import DataStorage from "./dataStorage";
import { Painter } from "./core/painter";
export const move = "mousemove";
export const click = "mousedown";
//冒泡处理 层级处理 多边形事件 图形拖拽 移除事件 画布拖
export interface IGrenderOps {
	width: number;
	height: number;
}
export class Grender {
	layer: [];
	allShapes: DataStorage;
	ctx: CanvasRenderingContext2D;
	painter: Painter;
	constructor(root: HTMLCanvasElement, optins: IGrenderOps) {
		this.init(root, optins);
	}
	private init(root: HTMLCanvasElement, options: IGrenderOps) {
		if (!root || !isDom(root)) {
			throw new Error("请传入DOM签");
		}
		//存储图形容器
		this.allShapes = new DataStorage();
		this.painter = new Painter(root, options);
		// this.canvas.addEventListener(EventName.click, (event: MouseEvent) => {
		// 	this.handleEvent(event, EventName.click);
		// });
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
