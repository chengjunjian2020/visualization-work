import { isObject } from "/tool/is";
import { Shape } from "./shape";
import mixins, { setShapeStyle, change as changeCircle } from "/mixin/shape";
import { Grender } from "/grender";
import { Box2 } from "/core/box2";
import { Point2d } from "/core/point";
import type { Graphic } from "../type";
import { ShapeEvent } from "/types/event";
interface ICircle {
	shape: {
		x: number;
		y: number;
		r: number;
	};
	style: CanvasRenderingContext2D;
}
export class Circle extends Shape {
	props: ICircle = {
		shape: {
			x: 0,
			y: 0,
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
	arc(shape: ICircle["shape"]) {
		const { ctx } = this.bindRender.painter;
		this.props.shape = shape;
		this.draw(ctx, shape);
	}
	draw(ctx: CanvasRenderingContext2D, shape = this.props.shape) {
		const { x, y, r } = shape;
		const { style } = this.props;
		ctx.save();
		ctx.beginPath();
		setShapeStyle(style, ctx);
		ctx.arc(x, y, r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

	//获取边界
	getBounding() {
		const {
			shape: { x, y, r },
		} = this.props;
		const min = new Point2d(x - r, y - r);
		const max = new Point2d(x + r, y + r);
		return new Box2(min, max);
	}
	isPointInClosedRegion(shapeEvent: ShapeEvent) {
		const { x, y, r } = this.props.shape;
		return shapeEvent.point.distance(new Point2d(x, y)) <= r * r;
	}
	changePosition({ x, y }: { x: number; y: number }) {
		const { shape: _shape } = this.props;
		const { bindRender } = this;
		this.props.shape = {
			..._shape,
			x: x,
			y: y,
		};
		bindRender.refresh();
	}
	getPosition() {
		const { x, y } = this.props.shape;
		return { x, y };
	}
}
mixins(Circle);
