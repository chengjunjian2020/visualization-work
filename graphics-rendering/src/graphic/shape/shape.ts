import EventFul from "/core/eventFul";
import { Grender } from "/grender";
import { EventCallback, ShapeEvent } from "/types/event";

/**
 * TODO后期扩展
 */
export class Shape extends EventFul {
	bindRender: Grender; //绑定的grender

	constructor() {
		super();
	}
	bingContext(render: Grender) {
		this.bindRender = render;
	}
}
