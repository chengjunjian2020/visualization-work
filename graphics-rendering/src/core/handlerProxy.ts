const localDOMHandlers: Record<string, Function> = {
	click: function (event: Event) {
		console.log(event);
	},
};
function mountLocalDOMEventListeners(painterRoot: HTMLElement) {
	Object.keys;
}
export default class handlerProxy {
	dom: HTMLElement;
	painterRoot: HTMLElement;
	constructor(dom: HTMLElement, painterRoot: HTMLElement) {
		this.dom = dom;
		this.painterRoot = painterRoot;

		mountLocalDOMEventListeners(this.painterRoot);
	}
}
