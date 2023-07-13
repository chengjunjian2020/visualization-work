import { Shape } from "./shape";
import { GraphicType } from "/enum/graphicEnum";
import { Grender } from "/grender";
import mixins, { setShapeStyle } from "/mixin/shape";
import { ShapeEvent } from "/types/event";

interface IRect {
	shape: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	style: CanvasRenderingContext2D;
}
export class Rect extends Shape {
	props: IRect = {
		shape: {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		},
		style: null,
	};
	type = GraphicType.RECT;
	curCtx: CanvasRenderingContext2D; //绑定的canvas ctx上下文
	constructor(props: IRect) {
		super();
		this.initRect(props);
	}
	initRect(props: IRect) {
		this.props = { ...this.props, ...props };
	}
	fillRect(shape: IRect["shape"]) {
		const { curCtx } = this;
		this.props.shape = shape;
		this.draw(curCtx, "fillRect", shape);
	}
	strokeRect(shape: IRect["shape"]) {
		const { curCtx } = this;
		this.props.shape = shape;
		this.draw(curCtx, "strokeRect", shape);
	}
	draw(
		ctx: CanvasRenderingContext2D,
		type = "fillRect",
		shape: IRect["shape"] = this.props.shape
	) {
		this.curCtx = ctx;
		const { style } = this.props;
		const { x, y, width, height } = shape;
		ctx.save();
		ctx.beginPath();
		setShapeStyle(style, ctx);
		if (type) {
			ctx.fillRect(x, y, width, height);
		} else {
			ctx.strokeRect(x, y, width, height);
		}
		ctx.closePath();
		ctx.restore();
	}
	isPointInClosedRegion(shapeMouseEvent: ShapeEvent) {
		const { x: mouseX, y: mouseY } = shapeMouseEvent.point;
		const { x, y, width, height } = this.props.shape;
		if (
			mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height
		) {
			return true;
		}
		return false;
	}
	changePosition({ x, y }: { x: number; y: number }) {
		const { shape: _shape } = this.props;
		const { bindRender } = this;
		this.props.shape = {
			..._shape,
			x,
			y,
		};
		bindRender.refresh();
	}
	getPosition() {
		const { x, y } = this.props.shape;
		return { x, y };
	}
}
mixins(Rect);
