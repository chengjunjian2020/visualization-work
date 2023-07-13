import { Shape } from "./shape/shape";
import { Box2 } from "/core/box2";
import { Point2d } from "/core/point";
import { GraphicType } from "/enum/graphicEnum";
import { Grender } from "/grender";
import { ShapeEvent } from "/types/event";

export declare class Graphic extends Shape {
	props: Record<string, any>;
	type: GraphicType;
	constructor(props: Record<string, any>);
	draw(ctx: CanvasRenderingContext2D): void;
	getBounding(): Box2;
	change(props: Record<string, any>, grender: Grender): void;
	isPointInClosedRegion(ShapeMouseEvent: ShapeEvent): boolean;
	changePosition({ x, y }: { x: number; y: number }): void;
	getPosition(): { x: number; y: number; width?: number } | any;
}
