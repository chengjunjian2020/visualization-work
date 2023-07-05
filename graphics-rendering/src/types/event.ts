import { Point2d } from "/core/point";
import { EventName } from "/enum/eventEnum";

export interface ShapeMouseEvent {
	point: Point2d;
	TYPE: EventName;
	event: Event | MouseEvent;
	stopPropagation: () => void;
}

export type EventCallback = (event: ShapeMouseEvent) => void;
