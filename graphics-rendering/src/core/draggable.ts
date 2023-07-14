import type { Shape } from "/graphic";
import Handler from "/handler";

export interface DrddableTarget {
	dragStart: {
		x: number;
		y: number;
	} | null;
	target: Shape;
}
export default class Draggable {
	private drggable: DrddableTarget = {
		dragStart: null,
		target: null,
	};
	private _handler;
	private $el;
	constructor(handler: Handler) {
		const dom = handler.grender.painter.getContainer();
		this._handler = handler;
		this.$el = dom;
		this.dragBindEvent(dom);
	}
	private dragBindEvent(el: HTMLElement) {
		el.addEventListener("onmousedown", (event: MouseEvent) => {
			this.dragStart(event);
			window.addEventListener("onmousemove", this.dragMove.bind(this));
			window.addEventListener("onmouseup", this.dragEnd.bind(this));
		});
	}
	private dragStart(e: MouseEvent) {
		e.preventDefault();
		const { curShape: target, dragStart } =
			this._handler.draggableToMouseDown(e);
		this.drggable = {
			...this.drggable,
			dragStart,
			target,
		};
	}
	private dragMove(e: MouseEvent) {
		e.preventDefault();
		const { dragStart } = this.drggable;
		if (!dragStart) {
			return;
		}

		this._handler.draggableToMouseMove(e, this.drggable);
	}
	private dragEnd(e: MouseEvent) {
		e.preventDefault();
		this.drggable = {
			dragStart: null,
			target: null,
		};
		this._handler.draggableToMouseOut();
	}
}
