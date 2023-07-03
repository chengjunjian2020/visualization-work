import { Graphic } from "/graphic/type";
import { Grender } from "/grender";
import { mixins } from "/tool";
export function change<T>(this: Graphic, props: T, grender: Grender) {
	console.log(grender.shapePropsDiffMap.get(this));
	grender.shapePropsDiffMap.set(this, {
		props: this.props,
		...props,
	});
	grender.reloadDraw();
}

export default (instance: object) => {
	mixins(instance, { change });
};
