import { Point2d } from "/core/point";
import { Seg2d } from "/core/seg2d";
import { Shape } from "/index";
import { setShapeStyle } from "/mixin/shape";
import { ShapeMouseEvent } from "/types/event";

interface IPolygon {
	shape: {
		points: Array<Point2d>;
	};
	style: CanvasRenderingContext2D;
}
export class Polygon extends Shape {
	props: IPolygon;
	constructor(props: IPolygon) {
		super();
		this.initPolygon(props);
	}
	initPolygon(props: IPolygon) {
		props.shape.points = props.shape.points.map(
			point => new Point2d(point.x, point.y)
		);
		this.props = props;
	}
	getDispersed() {
		return this.props.shape.points;
	}
	draw(ctx: CanvasRenderingContext2D, shape = this.props.shape) {
		const { style } = this.props;
		const { points } = shape;
		ctx.save();
		ctx.beginPath();
		setShapeStyle(style, ctx);
		points.forEach((point, index) => {
			const { x, y } = point;
			if (index === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	isPointInClosedRegion(shapeMouseEvent: ShapeMouseEvent) {
		const allSegs = Seg2d.getSegments(this.getDispersed(), true);
		const start = shapeMouseEvent.point;
		const xAxias = new Point2d(1, 0).multiplyScalar(800);
		const end = start.clone().add(xAxias);
		const anyRaySeg = new Seg2d(start, end);
		let total = 0;
		allSegs.forEach(item => {
			const intersetSegs = Seg2d.lineLineIntersect(item, anyRaySeg);
			total += intersetSegs.length;
		});
		// 奇数在内部
		if (total % 2 === 1) {
			return true;
		}
		return false;
	}
}
