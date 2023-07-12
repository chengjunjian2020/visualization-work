import { Graphic } from "/graphic/type";
import { Grender } from "/grender";
import { mixins } from "/tool";
import { isObject } from "/tool/is";
export function change<T>(this: Graphic, props: T) {
	const grender = this.bindRender;
	const { shapeList } = grender.dataStorage;
	const shape = shapeList.find(shapes => shapes === this);
	if (!shape) {
		throw new Error("传入的【graphic】不存在");
	}
	shape.props = { ...shape.props, ...props };
	grender.refresh();
}
export function setShapeStyle<S>(
	style: CanvasRenderingContext2D,
	ctx: CanvasRenderingContext2D
) {
	if (!style || !isObject(style)) {
		return;
	}
	Object.keys(style).forEach((key: keyof CanvasRenderingContext2D) => {
		// @ts-ignore
		ctx[key] = style[key as keyof CanvasRenderingContext2D];
	});
}
export default (instance: object) => {
	mixins(instance, { change, setShapeStyle });
};
