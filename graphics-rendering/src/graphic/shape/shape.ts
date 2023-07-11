import { Point2d } from "/core/point";
import { EventName } from "/enum/eventEnum";
import { EventCallback, ShapeEvent } from "/types/event";

let id = 0;
export class Shape {
	listenerMap: Map<string, Array<EventCallback>>; //事件容器
	isStopBubble = false; //是否阻止冒泡
	id: number;
	constructor() {
		this.listenerMap = new Map();
		this.id = ++id;
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
	off(names?: EventName) {
		const { listenerMap } = this;
		if (names === undefined) {
			listenerMap.clear();
		} else if (listenerMap.has(names)) {
			listenerMap.delete(names);
		}
	}
	stopPropagation = () => {
		this.isStopBubble = true;
	};
}
