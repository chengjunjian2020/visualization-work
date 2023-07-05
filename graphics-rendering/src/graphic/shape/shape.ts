import { Point2d } from "/core/point";
import { EventName } from "/enum/eventEnum";
import { EventCallback, ShapeMouseEvent } from "/types/event";

export class Shape {
	listenerMap: Map<string, Array<EventCallback>>; //事件容器
	isStopBubble = false; //是否阻止冒泡
	constructor() {
		this.listenerMap = new Map();
	}
	on(names: EventName, listener: EventCallback) {
		const { listenerMap } = this;
		const eventName = Object.keys(EventName).find(name => name === names);
		if (listenerMap.has(eventName)) {
			listenerMap.get(eventName).push(listener);
		} else {
			listenerMap.set(eventName, [listener]);
		}
	}
	stopPropagation = () => {
		this.isStopBubble = true;
		console.log(this.isStopBubble);
	};
}
