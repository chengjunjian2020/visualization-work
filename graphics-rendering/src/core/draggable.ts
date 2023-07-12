import Handler from "/handler";

export interface DrddableTarget {
	dragStart: {
		x: number;
		y: number;
	} | null;
	dragMove: {
		x: number;
		y: number;
	} | null;
}
export default class Draggable {
	private drggable: DrddableTarget = {
		dragStart: null,
		dragMove: null,
	};
	private _handler;
	private $el;
	constructor(handler: Handler) {
		const dom = handler.grender.painter.getContainer();
		this._handler = handler;
		this.$el = dom;
		// this.dragBindEvent(dom);
		dom.addEventListener("mousedown", this.dragStart.bind(this));
		dom.addEventListener("mousemove", this.dragMove.bind(this));
		dom.addEventListener("mouseup", this.dragEnd.bind(this));
	}
	private dragBindEvent(el: HTMLElement) {
		el.onmousedown = event => {
			this.dragStart(event);
			window.onmousemove = event => {
				console.log("--->");
				// event.preventDefault();
				this.dragMove(event);
			};
			window.onmouseup = event => {
				event.preventDefault();
				this.dragEnd(event);
			};
		};
	}
	private dragStart(e: MouseEvent) {
		e.preventDefault();
		this.drggable = {
			...this.drggable,
			dragStart: {
				x: e.x,
				y: e.y,
			},
		};
	}
	private dragMove(e: MouseEvent) {
		// e.preventDefault();
		const { dragStart } = this.drggable;
		if (!dragStart) {
			return;
		}
		const rect = this.$el.getBoundingClientRect();
		this.drggable = {
			...this.drggable,
			dragMove: {
				x: e.x - rect.left,
				y: e.y - rect.top,
			},
		};
		this._handler.draggableToMouseMove(e, this.drggable);
	}
	private dragEnd(e: MouseEvent) {
		e.preventDefault();
		this.drggable = {
			dragStart: null,
			dragMove: null,
		};
	}
}
