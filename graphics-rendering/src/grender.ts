import { isDom } from "./tool/is";
import { EventName } from "./enum/eventEnum";
import { Point2d } from "./core/point";
import { EventCallback, ShapeEvent } from "./types/event";
import { Shape } from "./graphic/shape/shape";
import { Graphic } from "./graphic/type";
import DataStorage from "./dataStorage";
import { Painter } from "./core/painter";
import HandlerProxy from "./core/handlerProxy";
import Handler from "./handler";
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
	dataStorage: DataStorage;
	// ctx: CanvasRenderingContext2D;
	painter: Painter;
	handler: Handler;
	constructor(root: HTMLCanvasElement, optins: IGrenderOps) {
		this.init(root, optins);
	}
	private init(root: HTMLCanvasElement, options: IGrenderOps) {
		if (!root || !isDom(root)) {
			throw new Error("请传入DOM签");
		}
		//存储图形容器
		this.dataStorage = new DataStorage();
		this.painter = new Painter(root, options, this.dataStorage);
		const handlerProxy = new HandlerProxy(
			root,
			this.painter.getContainer(),
			this.dataStorage
		);

		this.handler = new Handler({
			handlerProxy,
			grender: this,
			storage: this.dataStorage,
		});
	}
	add(shape: Graphic) {
		shape.bingContext(this);
		this.dataStorage.addShape(shape);
		this.refresh();
	}

	refresh() {
		this.painter.clear();
		this.painter.refresh();
	}
}
