import { isObject } from "/tool/is";
import { Shape } from "./shape";
import mixins, { setShapeStyle } from "/mixin/shape";
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
	curCtx: CanvasRenderingContext2D; //绑定的canvas ctx上下文
	constructor(props: ICircle) {
		super();
		this.initCircle(props);
	}
	initCircle(props: ICircle) {
		this.props = props;
	}
	arc(shape: ICircle["shape"]) {
		const { curCtx } = this;
		this.props.shape = shape;
		this.draw(curCtx, shape);
	}
	draw(ctx: CanvasRenderingContext2D, shape = this.props.shape) {
		const { cx, cy, r } = shape;
		const { style } = this.props;
		ctx.save();
		ctx.beginPath();
		setShapeStyle(style, ctx);
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
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
		const { cx, cy, r } = this.props.shape;
		return shapeMouseEvent.point.distance(new Point2d(cx, cy)) <= r * r;
	}
}
mixins(Circle);
