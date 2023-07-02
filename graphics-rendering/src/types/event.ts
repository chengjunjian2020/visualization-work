import { Point2d } from "/core/point";
import { EventName } from "/enum/eventEnum";

export interface ShapeMouseEvent extends MouseEvent{
    point: Point2d
    isStopBubble:boolean,
    TYPE:EventName
}

export type EventCallback=(event:ShapeMouseEvent)=>void
 