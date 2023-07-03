import { Shape } from "./shape";

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

	constructor(props: IRect) {
		super();
		this.initRect(props);
	}
	initRect(props: IRect) {
		this.props = { ...this.props, ...props };
	}
}
