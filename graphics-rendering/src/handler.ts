import Draggable, { DrddableTarget } from "./core/draggable";
import HandlerProxy from "./core/handlerProxy";
import DataStorage from "./dataStorage";
import { Graphic } from "./graphic/type";
import { Grender } from "./grender";
import { generateEvent } from "./tool/dom";
import { EventCallback } from "./types/event";

interface HandlerParamer {
	handlerProxy: HandlerProxy;
	storage: DataStorage;
	grender: Grender;
}
export default class Handler {
	handlerProxy: HandlerProxy;

	storage: DataStorage;

	grender: Grender;

	private _draggable: Draggable;

	curShape: Graphic;

	constructor({ handlerProxy, storage, grender }: HandlerParamer) {
		this.handlerProxy = handlerProxy;
		this.handlerProxy.$handler = this;
		this.grender = grender;
		this.storage = storage;
		this._draggable = new Draggable(this);
	}
	dispatchToElement(eventName: string, event: MouseEvent) {
		let batchStopBubble = false;
		const { storage, grender } = this;
		const allShapes = storage.getData();
		for (let i = allShapes.length - 1; i >= 0; i--) {
			const shape = allShapes[i];
			const newsEvent = generateEvent(event, shape.stopPropagation);
			const listener: Array<EventCallback> =
				shape.listenerMap.get(eventName);
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
				grender.refresh();
				listener.forEach(listener => listener(newsEvent));
			}
			if (shape.isStopBubble) {
				batchStopBubble = true;
			}
		}
	}
	// curDraffableShape(event: MouseEvent) {
	// 	const { shapeList } = this.storage;
	// 	for (let i = shapeList.length - 1; i >= 0; i--) {
	// 		const shape = shapeList[i];
	// 		const newsEvent = generateEvent(event, shape.stopPropagation);
	// 		if (shape.isPointInClosedRegion(newsEvent)) {
	// 			try {
	// 				this.curShape = shape;
	// 			} catch (e) {
	// 				console.warn(shape);
	// 				console.log(this);
	// 				console.log(e);
	// 			}

	// 			shapeList.splice(
	// 				shapeList.length,
	// 				0,
	// 				shapeList.splice(i, 1)[0]
	// 			);
	// 			break;
	// 		}
	// 	}
	// }
	draggableToMouseMove(event: MouseEvent, drggable: DrddableTarget) {
		const { shapeList } = this.storage;
		const { grender } = this;
		const { dragStart, dragMove } = drggable;
		const el = grender.painter.getContainer();
		const bounding = el.getBoundingClientRect();
		let curShapes;
		console.log(event);
		for (let i = shapeList.length - 1; i >= 0; i--) {
			const shape = shapeList[i];
			const newsEvent = generateEvent(event, shape.stopPropagation);
			if (shape.isPointInClosedRegion(newsEvent)) {
				try {
					curShapes = shape;
					// if()
					shape.changePosition({
						x: dragMove.x,
						y: dragMove.y,
					});
				} catch (e) {
					console.warn(shape);
					console.log(this);
					console.log(e);
				}

				shapeList.splice(
					shapeList.length,
					0,
					shapeList.splice(i, 1)[0]
				);
				break;
			}
		}
		if (!curShapes) {
			return;
		}
		const { x, y } = curShapes.getPosition();
		// const startMouseX = dragStart.x - bounding.left - x;
		// const startMouseY = dragStart.y - bounding.top - y;

		// const dragMouseX = dragMove.x - bounding.left - startMouseX;
		// const dragMousey = dragMove.y - bounding.top - startMouseY;
		// curShapes.changePosition({
		// 	x: dragMove.x,
		// 	y: dragMove.y,
		// });
	}
}
