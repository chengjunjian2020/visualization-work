import { isObject } from "/tool/is";
import { Shape } from "./shape";
import mixins from "/mixin/shape";
import { Grender } from "/grender";
import { Box2 } from "/core/box2";
import { Point2d } from "/core/point";
import type { Graphic } from "../type";
import { ShapeMouseEvent } from "/types/event";

interface ICircle {
	shape: {
		cx: number;
		cy: number;
		r: number;
	};
	style: CanvasRenderingContext2D;
}
export class Circle extends Shape {
	props: ICircle = {
		shape: {
			cx: 0,
			cy: 0,
			r: 0,
		},
		style: null,
	};

	constructor(props: ICircle) {
		super();
		this.initCircle(props);
	}
	initCircle(props: ICircle) {
		this.props = props;
	}
	draw(ctx: CanvasRenderingContext2D) {
		const { cx, cy, r } = this.props.shape;
		const { style } = this.props;
		ctx.save();
		ctx.beginPath();
		this.setShapeStyle(style, ctx);
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		console.log(this);
	}
	//获取边界
	getBounding() {
		const {
			shape: { cx, cy, r },
		} = this.props;
		const min = new Point2d(cx - r, cy - r);
		const max = new Point2d(cx + r, cy + r);
		return new Box2(min, max);
	}
	isPointInClosedRegion(shapeMouseEvent: ShapeMouseEvent) {
		return false;
	}
	change<T>(props: T, grender: Grender) {
		console.log("--", this);
		grender.shapePropsDiffMap.set(this, {
			props: this.props,
			...props,
		});
		grender.reloadDraw();
	}
}
// mixins(Circle);
