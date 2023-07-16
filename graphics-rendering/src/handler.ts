import Draggable, { DrddableTarget } from "./core/draggable";
import HandlerProxy from "./core/handlerProxy";
import { Point2d } from "./core/point";
import DataStorage from "./dataStorage";
import { GraphicType } from "./enum/graphicEnum";
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
	handlerShapeLevel(event: MouseEvent) {
		const { shapeList } = this.storage;
		for (let i = shapeList.length - 1; i >= 0; i--) {
			const shape = shapeList[i];
			const newsEvent = generateEvent(event, shape.stopPropagation);
			if (shape.isPointInClosedRegion(newsEvent)) {
				this.curShape = shape;
				shapeList.splice(
					shapeList.length,
					0,
					shapeList.splice(i, 1)[0]
				);
				break;
			}
		}
		return { curShape: this.curShape };
	}
	draggableToMouseDown(event: MouseEvent) {
		console.log("_")
		const { curShape } = this.handlerShapeLevel(event);
		this.grender.refresh();
		if (!curShape || !curShape.draggable) {
			return {
				curShape: null,
				dragStart: null,
			};
		}
		const { type } = curShape;
		if (type !== GraphicType.POLYGON) {
			const { dragStart } = this.draggleConventionGraphic(
				event,
				this.curShape
			);
			return {
				dragStart,
				curShape,
			};
		} else {
			return {
				dragStart: {
					x: event.clientX,
					y: event.clientY,
				},
				curShape,
			};
		}
	}
	dragglePolygon(
		event: MouseEvent,
		drggable: DrddableTarget,
		curShape: Graphic
	) {
		const pointsList: Array<Record<string, number>> =
			curShape.getPosition();
		const _shape = curShape.props.shape;
		const { dragStart } = drggable;
		const dragglePointsList = pointsList.map(points => {
			const moveX = points.x + (event.clientX - dragStart.x);
			const moveY = points.y + (event.clientY - dragStart.y);
			return new Point2d(moveX, moveY);
		});
		drggable.dragStart.x = event.clientX;
		drggable.dragStart.y = event.clientY;
		curShape.change(
			{
				shape: {
					..._shape,
					points: dragglePointsList,
				},
			},
			this.grender
		);
	}

	draggableToMouseMove(event: MouseEvent, drggable: DrddableTarget) {
		const { grender, curShape } = this;
		const { dragStart } = drggable;

		if (!curShape) {
			return;
		}
		// this.dragglePolygon(event, this.curShape);
		if (curShape.type !== GraphicType.POLYGON) {
			const mouseX = event.clientX - dragStart.x;
			const mouseY = event.clientY - dragStart.y;

			const dragMove = {
				x: mouseX,
				y: mouseY,
			};
			const { shape } = curShape.props;
			curShape.change(
				{
					shape: {
						...shape,
						...dragMove,
					},
				},
				grender
			);
		} else {
			//多边形
			this.dragglePolygon(event, drggable, curShape);
		}
	}
	draggleConventionGraphic(event: MouseEvent, curShape: Graphic) {
		const { x, y } = curShape.getPosition();

		const dragStart = {
			x: event.clientX - x,
			y: event.clientY - y,
		};
		return {
			dragStart,
		};
	}
	draggableToMouseOut() {
		this.curShape = null;
	}
}
