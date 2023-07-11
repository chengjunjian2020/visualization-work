import { Point2d } from "/core/point";
import { ShapeEvent, } from "/types/event";

export function disableUserSelect(dom: HTMLElement) {
	const domStyle = dom.style;
	domStyle.webkitUserSelect = "none";
	domStyle.userSelect = "none";
	// @ts-ignore
	domStyle.webkitTapHighlightColor = "rgba(0,0,0,0)";
	(domStyle as any)["-webkit-touch-callout"] = "none";
}
//包装浏览器原生事件参数
export function normalizeEvent(event: Event) {
	//TODO 后期处理
	return event;
}

export function generateEvent(event: MouseEvent, stopPropagation: () => void):ShapeEvent {
	const { offsetX, offsetY } = event;
	const newsEvent:ShapeEvent = {
		 stopPropagation,
		point: new Point2d(offsetX, offsetY),
		event
	};
	return newsEvent;
}
