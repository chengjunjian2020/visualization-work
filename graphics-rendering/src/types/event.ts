import { Point2d } from "/core/point";
import { EventName } from "/enum/eventEnum";

export interface ShapeMouseEvent {
	point: Point2d;
	isStopBubble: boolean;
	TYPE: EventName;
	event: MouseEvent;
}

export type EventCallback = (event: ShapeMouseEvent) => void;
