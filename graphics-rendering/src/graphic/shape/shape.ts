import EventFul from "/core/eventFul";
import { Grender } from "/grender";
import { EventCallback, ShapeEvent } from "/types/event";

export interface ShapeProps{
	draggable?:boolean;
	[key:string]:any
}

/**
 * TODO后期扩展
 */
export class Shape extends EventFul {
	bindRender: Grender; //绑定的grender
	draggable:boolean
	constructor({draggable}:ShapeProps) {
		super();
		this.draggable = draggable
	}
	bingContext(render: Grender) {
		this.bindRender = render;
	}
}
