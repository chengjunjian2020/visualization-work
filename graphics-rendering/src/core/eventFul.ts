import { EventName } from "/enum/eventEnum";
import { EventCallback } from "/types/event";

export default class EventFul {
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
