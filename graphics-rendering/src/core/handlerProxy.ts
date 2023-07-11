import DataStorage from "/dataStorage";
import Handler from "/handler";
import { normalizeEvent } from "/tool/dom";
type Dictionary<T> = {
	[key: string]: T;
};

const localDOMHandlers: any = {
	click: function (event: PointerEvent) {
		console.log(event);
		const _event = normalizeEvent(event);
		console.log(this);
		this.trigger("click", _event);
	},
};
function mountLocalDOMEventListeners(
	painterRoot: HTMLElement,
	that:HandlerProxy,
	opts?: boolean | AddEventListenerOptions
) {
	Object.keys(localDOMHandlers).forEach(eventName => {
		painterRoot.addEventListener(
			eventName,
			localDOMHandlers[eventName].bind(that),
			opts
		);
	});
}
//事件代理 接收浏览器事件参数 事件转发
export default class HandlerProxy {
	dom: HTMLElement;
	painterRoot: HTMLElement;
	storage: DataStorage;
	$handler: Handler; //存储元素相关的事件处理器
	constructor(
		dom: HTMLElement,
		painterRoot: HTMLElement,
		storage: DataStorage
	) {
		this.dom = dom;
		this.painterRoot = painterRoot;
		this.storage = storage;
		//初始化监听时间
		mountLocalDOMEventListeners(this.painterRoot,this);
	}
	trigger(eventName: string, event: any) {
		const h = this.$handler;
		console.log(h)
		h.dispatchToElement(eventName, event);
	}
}
