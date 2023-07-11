import { Point2d } from "/core/point";
import { EventName } from "/enum/eventEnum";

export interface ShapeEvent {
	point: Point2d;
	event: Event | MouseEvent;
	stopPropagation: () => void;
}

export type EventCallback = (event: ShapeEvent) => void;
